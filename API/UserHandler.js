import React from 'react'
import { AsyncStorage } from 'react-native';
import {getToken} from "./TokenHandler";

export class UserHandler extends React.Component {

        static async getUserData(id, token) {
            let url = "http://192.168.1.6:8000/api/users/" + id;
            let token_dump = 'Bearer';
            let dump = token_dump.concat(' ', token);
            console.log(JSON.stringify(token));
            console.log(JSON.stringify(dump));
            return fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+ token,
                }),
            })
                .then((response) => response.json())
                .then((responseText) => {
                    console.log(responseText)
                })
                .catch((error) => {
                    console.error(error.message)
                })
        }
}

