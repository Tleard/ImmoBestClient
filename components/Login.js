import React from 'react'
//import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Button, StyleSheet} from 'react-native'
import AsyncStorage from "react-native";
import {LoginAttempt} from '../API/LoginAttempt'
import * as SecureStore from 'expo-secure-store';


const userInfo ={username: 'admin', password: 'admin1'};

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            token :''
        }
    }

    _login = async() => {

        if  (this.state.username.length > 2 && this.state.password.length > 2)
        {
            new LoginAttempt(this.state.username, this.state.password);

        } else {
            alert('Please enter a correct username and password')
        }
    };

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textinput}
                    placeholder='Username'
                    onChangeText={(username) =>this.setState({username})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    style={styles.loginbutton}
                    title='Connexion'
                    onPress={this._login}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        width: 200,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginTop: 40
    },
    loginbutton: {
        marginTop: 50,
        marginRight: 40
    }
})

export default Login