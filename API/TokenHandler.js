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

    static async getToken() {
        try {
            AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    console.log("responseJSON" +responseJson);
                    return responseJson;
                })
        } catch (error) {
            console.log("Something went wrong : ", error);
        }
    }

    static async storeToken(token, id) {
        try {
            await AsyncStorage.setItem("userToken", JSON.stringify(token));
            await AsyncStorage.setItem("userId", JSON.stringify(id));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

}