import React from 'react'
//import AsyncStorage from '@react-native-community/async-storage';
import { View, TextInput, Button, StyleSheet} from 'react-native'
import AsyncStorage from "react-native";
import {LoginAttempt} from '../API/LoginAttempt'
import {TokenHandler} from "../API/TokenHandler";
import {UserHandler} from "../API/UserHandler";




const userInfo ={username: 'admin', password: 'admin1'};

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