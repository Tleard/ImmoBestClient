import React from 'react'
import { AsyncStorage } from 'react-native';
import {getToken} from "./TokenHandler";

export class UserHandler extends React.Component {
    state = {data: []};

        async getUserData(id) {
            let url = "http://192.168.1.6:6000/api/users/" + id;
            console.log(url)

            /*fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: 'Bearer'+ ,
                },
            })
                .then((response) => response.json())
                .then((responseText) => {
                    console.log(responseText)
                })
                .catch((error) => {
                    console.error(error.message)
                })*/
        }
}

