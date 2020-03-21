import React from 'react'
import { AsyncStorage } from 'react-native';
import {getToken} from "./TokenHandler";

export class UserHandler extends React.Component {

        static async getUserData(id, token) {
            let url = "http://192.168.1.6:8000/api/users/" + id;
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
                    function PersistUserData(responseText) {
                        let Data = JSON.stringify(responseText);
                        AsyncStorage.multiSet([
                           ["username", Data.username],
                           ["email", Data.email],
                           ["name", Data.name],
                           ["id", Data.id],
                           ["role", Data.roles]
                        ]);
                        console.log(Data);
                    }
                    PersistUserData(responseText)
                })
                .catch((error) => {
                    console.error(error.message)
                })
        }
}

