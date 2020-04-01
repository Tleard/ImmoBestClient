import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {TokenHandler} from "../API/TokenHandler";
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";
import DefaultUser from "../assets/images/default_user.png";



const {width: WIDTH} = Dimensions.get('window');
class LinksScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            userData : '',
            userId : '',
            userToken: ''
        }
    }

    UNSAFE_componentWillMount(){
        this._fetchData();
    }


    _fetchUserInfo = async() => {
        try{
            let url = "http://192.168.1.11:8000/api/users/" + this.state.userId;
            return fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ this.state.userToken,
                }),
            })
                .then((response) => response.json())
                .then((responseText) => {
                    console.log(responseText)
                })
                .catch((error) => {
                    console.error(error.message)
                })

        } catch (e) {
            console.error("Somenting went wrong" + e)
        }
    }

    _fetchData = async() => {
        try {
            await AsyncStorage.multiGet(["userId", "userToken"])
                .then((responseJson) => {
                    try{
                        let url = "http://192.168.1.11:8000/api/users/" + responseJson[0][1];
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson[1][1],
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                AsyncStorage.multiSet([['userName', responseText.name], ['userMail', responseText.email], ['userRole', responseText.roles]]);
                                let DataUser = {"userName" : responseText.name, "userMail" : responseText.email, "userRole" : responseText.roles};
                                this.setState({userData: DataUser})
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
            <View style={{alignItems: 'center', paddingTop: 80}}>
                <Image source={DefaultUser} style={styles.image_logo} />
                <Text style={styles.username}>{this.state.userData.userName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 18,
        paddingTop: 20
    },
    image_logo: {
        height: 150,
        resizeMode: 'contain',
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

export default LinksScreen;