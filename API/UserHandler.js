import React from 'react'
import { AsyncStorage } from 'react-native';
import {getToken, TokenHandler} from "./TokenHandler";

export function UserHandler (id, token) {

    let url = "http://192.168.1.11:8000/api/users/" + id;
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
            return JSON.stringify(responseText);
        })
        .catch((error) => {
            console.error(error.message)
        })
}

