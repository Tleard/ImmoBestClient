import React from 'react'
//import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Button, StyleSheet, AsyncStorage} from 'react-native'
import {LoginAttempt, storeToken} from '../API/LoginAttempt'
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
        if (userInfo.username === this.state.username && userInfo.password === this.state.password) {
            new LoginAttempt(this.state.username, this.state.password);
            //Call AsyncStorage & Next Page
        } else {
            alert('Something went wrong')
        }
    }

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