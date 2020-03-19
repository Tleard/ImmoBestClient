import {AsyncStorage} from 'react-native';
import {storeToken, getToken} from './TokenHandler';

export function LoginAttempt(username, password) {
    fetch("http://192.168.1.15:6000/api/login_check", {
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
        .then((responseText) => {
            if (!responseText.token)
            {
                console.log(responseText.message)
            } else {
                storeToken(responseText.token);
            }
        })
        .catch((error) => {
            console.error(error.message)
        })
}


