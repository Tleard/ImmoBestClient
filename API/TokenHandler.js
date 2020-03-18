//import AsyncStorage from 'react-native';
import { AsyncStorage } from 'react-native';

export async function storeToken(token) {
    try {
        //console.log(token);
        await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


export function getToken() {
    let data;
    try {
        data = AsyncStorage.getItem("userToken");
        if (data == null) {
            console.log("Data was not found")
        }
    } catch (error) {
        console.log("Something went wrong", error);
    }
    console.log("Token retrieved! : \n" + data);
    return data
}