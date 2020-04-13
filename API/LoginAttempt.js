import {AsyncStorage} from 'react-native';
//import {storeToken, getToken} from './TokenHandler';
import {TokenHandler} from "./TokenHandler";
import Component from 'react-native';
//import {TokenHandler} from './TokenHandler';
import {UserHandler} from "./UserHandler";


export function LoginAttempt(username, password) {
    return fetch("http://192.168.1.11:8000/api/login_check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error.message)
        })
}


