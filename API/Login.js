import AsyncStorage from '@react-native-community/async-storage';

export function login() {
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
}

export function storeToken(token) {
    let storeData = async () => {
        try {
            await AsyncStorage.setItem(token, 'jwt')
        } catch (error) {
            console.error(error);
        }
    }
}


