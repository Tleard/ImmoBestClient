import AsyncStorage from 'react-native';


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
            //AsyncStorage.setItem('token',responseText.token);
            //alert(AsyncStorage.getItem('token'));
            console.log(responseText)
        })
        .catch((error) => {
            console.error(error)
        })
}

/*export function loginAttempt(username, password) {
    return fetch('127.0.0.1:8000/api/login_check', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: 'admin',
            password: 'admin1',
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            storeToken(responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
}*/

export function storeToken(token) {
    let storeData = async () => {
        try {
            await AsyncStorage.setItem('token',token);
            //alert(AsyncStorage.getItem('token'))
        } catch (error) {
            console.error(error);
        }
    }
}


