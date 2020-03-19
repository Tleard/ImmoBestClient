//import AsyncStorage from 'react-native';
import { AsyncStorage } from 'react-native';




export async function storeToken(token) {
    try {
        // console.log(token);
         await AsyncStorage.setItem("userToken", JSON.stringify(token));
    } catch (error) {
        console.log("Something went wrong", error);
    }
}


export function getToken() {

    try {
        let data = AsyncStorage.getItem('userToken').then((value) => {
            if (value !== null) {
                return value
            } else {
                console.error("Cannot Get Token value");
            }
        });
    } catch (error) {
        console.log("Something went wrong", error);
    }
    //console.log("2dn = " + data);

    return "token";
}