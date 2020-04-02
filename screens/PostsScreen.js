import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";
import DefaultUser from "../assets/images/default_user.png";



const {width: WIDTH} = Dimensions.get('window');
class ProfileScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            userData : '',
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
                                console.log("Posts : "+ JSON.stringify(responseText));
                                this.setState({userData: responseText})
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

    render() {
        return (
            <View>
                <View style={{alignItems: 'center', paddingTop: 80}}>
                    <View style={styles.header}>
                        <Image source={DefaultUser} style={styles.image_logo} />
                        <Text style={styles.username}>{this.state.userData.userName}</Text>
                        <Text style={styles.email}>{this.state.userData.userMail}</Text>
                    </View>

                </View>

                <View style={{paddingTop: 80, paddingLeft: 30}}>
                    <Text style={{fontSize : 15}}> <FontAwesome name="comments" size={50} color="black"/> Nombre de messages envoyés : {this.state.userData.comments}</Text>
                    <Text style={{fontSize : 15, paddingTop: 15}}> <FontAwesome name="users" size={50} color="black"/> Rôle de l'utilisateur : {this.state.userData.userRole}</Text>
                    <Text style={{fontSize : 15, paddingTop: 15}}> <FontAwesome name="pencil-square-o" size={50} color="black"/> Nombre d'annonces postés : {this.state.userData.posts}</Text>
                </View>
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
        paddingTop: 20
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