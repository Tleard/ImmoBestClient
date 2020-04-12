import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity,
    View, TextInput, Button, ImageBackground, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import {LoginAttempt} from '../API/LoginAttempt';
import {TokenHandler} from "../API/TokenHandler";
import {UserHandler} from "../API/UserHandler";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

import { MonoText } from '../components/StyledText';
import { FontAwesome, FontAwesome5, Foundation } from '@expo/vector-icons';
import bgImage from '../assets/images/BackgroundTest.png';

const {width: WIDTH} = Dimensions.get('window');
class CreateScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username : '',
            password : '',
            password_confirm :'',
            email :'',
            name : '',
            token :'',
            id:'',
            error_message:'',
        }
    }

    _login = async() => {

        let error = "";
        if (this.state.username < 2 || this.state.password < 2 || this.state.password_confirm < 2 || this.state.email < 2 || this.state.name < 2) {
            const regExp = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            let error = "Veuillez renseigner les champ suivants : \n";
            if (this.state.username < 2) {
                error += "- Pseudo \n"
            }
            if (this.state.password < 2) {
                error += "- Mot de passe \n"
            }
            if (this.state.password_confirm < 2) {
                error += "- Confirmation du mot de passe \n"
            }
            if (this.state.email < 2) {
                error += "- Adresse Mail \n"
            }
            if (regExp.test(this.state.email) === false)
            {
                error += "- Une Adresse Mail valide \n"
            }
            if (this.state.name < 2) {
                error += "- Nom & Prénom \n"
            }

            console.log(regExp.test(this.state.email));
            alert(error);
        }
    };






        /*if  (this.state.username.length > 2 && this.state.password.length > 2 &&)
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
        }*/
        //Store Token
        /*await TokenHandler.storeToken(this.state.token, this.state.id);
        const parent = this.props.navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false
        });
        this.props.navigation.navigate('Profile');*/

    render() {
        return (
            <ImageBackground source={bgImage} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <View style={{alignItems: 'center', paddingTop: 25}}>
                    <Text style={{fontSize : 25}}>Créer un Compte ImmoBest</Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 25}}>
                    <FontAwesome5 name="user-alt" size={28} color="white" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pseudo'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(username) =>this.setState({username})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <Foundation name="at-sign" size={32} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Adresse email'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({email})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <FontAwesome5 name="user-check" size={26} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Prénom & Nom'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(name) => this.setState({name})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <FontAwesome name="lock" size={32} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Mot de passe'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        secureTextEntry ={true}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <View style={{alignItems: 'center', paddingTop: 20}}>
                        <FontAwesome name="unlock-alt" size={32} color="white" style={styles.inputIconPassword}/>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Confirmer le mot de passe'
                            placeholderTextColor={'rgba(255,255,255,0.85)'}
                            underLineColorAndroid='transparent'
                            secureTextEntry ={true}
                            onChangeText={(password_confirm) => this.setState({password_confirm})}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.logButton}
                        title='Créer le compte'
                        onPress={this._login}>
                        <Text style={styles.text}>Créer le compte</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
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
        top: 40,
        left: 37,
        zIndex: 1
    },
    inputIconPassword : {
        position : 'absolute',
        top: 30,
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
    createButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        marginTop: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(7,50,75,0.8)'
    },
    text: {
        color: 'rgba(255, 255, 255, 07)',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default CreateScreen;