import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";
import DefaultUser from "../assets/images/default_user.png";
import PostItem from "../components/PostItem";



const {width: WIDTH} = Dimensions.get('window');
class ProfileScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            postData : [],
            userId : '',
            Posts: ''
        }
    }

    UNSAFE_componentWillMount(){
        this._fetchData();
    }

    _fetchData = async() => {
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = "http://192.168.1.11:8000/api/advertisements/";
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson,
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.setState({postData: responseText})
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }
    }

    _DisplayDetails = (PostId) => {
        console.log("Display post with id" + PostId);
    }

    render() {
        return (
            <View style={{alignItems: 'center', paddingTop: 20}}>
                <Text style={styles.username}>Annonces</Text>
                <FlatList
                    data={this.state.postData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <PostItem postData={item} DisplayDetails={this._DisplayDetails}/>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header : {
        backgroundColor : '#605fcd'
    },
    username: {
        fontSize: 18,
        paddingTop: 10
    },
    email: {
        fontSize: 15,
        color: '#828282'
    },
    image_logo: {
        height: 150,
        resizeMode: 'contain',
        borderRadius: 100
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
    },
});

export default ProfileScreen;