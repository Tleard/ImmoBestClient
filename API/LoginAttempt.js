import {AsyncStorage} from 'react-native';
import {storeToken, getToken} from './TokenHandler';

export function LoginAttempt(username, password) {
    fetch("http://192.168.1.15:8000/api/login_check", {
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
                //Todo: Replace by Swal equivalent
                console.log(responseText.message)
            } else {
                //Success!
                storeToken(responseText.token);
                //console.log(getToken());
            }
        })
        .catch((error) => {
            console.error(error.message)
        })
}


