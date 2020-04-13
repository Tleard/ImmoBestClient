import React from 'react'
import { View, TextInput, Button, StyleSheet,
    ImageBackground, Image, Dimensions, TouchableOpacity, Text} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import bgImage from '../assets/PhoneWallpaperModified.png';
import Logo from '../assets/ImmoBestLogoRound2.png';
import {LoginAttempt} from '../API/LoginAttempt';
import {TokenHandler} from "../API/TokenHandler";
import {UserHandler} from "../API/UserHandler";

const {width: WIDTH} = Dimensions.get('window');
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            token :'',
            id:'',
            error_message:''
        }
    }

    _login = async() => {
        if  (this.state.username.length > 2 && this.state.password.length > 2)
        {
            //Get all data from connexion and register them as state
            await LoginAttempt(this.state.username, this.state.password).then(data =>
                this.setState({
                    token: data.token,
                    id : JSON.stringify(data.id),
                    error_message: JSON.stringify(data.message)
                })
            );
        } else if (typeof this.state.error_message !== 'undefined') {
            alert(this.state.error_message)
        }
        //Store Token
        await TokenHandler.storeToken(this.state.token);
        await UserHandler.getUserData(this.state.id, this.state.token);
    };

    render() {
        return (
            <ImageBackground source={bgImage} style=style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <View style={{alignItems: 'center', paddingTop: 80}}>
                    <Image source={Logo} style={{alignItems: 'center'}} />
                </View>

                <View style={{alignItems: 'center', paddingTop: 50}}>
                    <FontAwesome name="user" size={32} color="white" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Username'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(username) =>this.setState({username})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 50}}>
                    <FontAwesome name="lock" size={32} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Password'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        secureTextEntry ={true}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <TouchableOpacity
                        style={styles.logButton}
                        title='Connexion'
                        onPress={this._login}>
                        <Text style={styles.text}>Connexion</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    textInput: {
        width : WIDTH - 55,
        height: 50,
        borderRadius: 45,
        borderColor: '#111111',
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(57,62,70,0.7)',
        color: 'rgba(232,243,255,0.85)',
        marginHorizontal: 25,
    },
    inputIcon : {
        position : 'absolute',
        top: 60,
        left: 37,
        zIndex: 1
    },
    inputIconPassword : {
        position : 'absolute',
        top: 60,
        left: 37,
        zIndex: 1
    },
    logButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        marginTop: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(15,114,172,0.8)'
    },
    text: {
        color: 'rgba(255, 255, 255, 07)',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default Login