//import AsyncStorage from 'react-native';
import React from 'react'
import {AsyncStorage} from 'react-native';

export class TokenHandler extends React.Component {

    /*constructor(props) {
        super(props);
        this.state = {
            token: null
        }
    }*/

    async getToken() {
        try {
            AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    console.log("responseJSON" +responseJson);
                    return responseJson;
                })
            //return await JSON.stringify(response.json());
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    async storeToken(token) {
        try {
            await AsyncStorage.setItem("userToken", JSON.stringify(token));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
}