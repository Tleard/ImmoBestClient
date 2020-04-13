import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TextInput,
    Platform
} from 'react-native';
import {FontAwesome5, Foundation, Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";
import DefaultUser from "../assets/images/default_user.png";
import bgImage from "../assets/images/BackgroundTest.png";




const {width: WIDTH} = Dimensions.get('window');
class createAdvertisementScreen extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            title : '',
            content : '',
            slug :'',
            rooms : 0,
            square_meter : 0,
            price : 0,
            address : '',
            city : '',
            token :'',
            id:'',
            error_message:'',
        }
    }

    _login = async() => {

        let error = "";
        if (this.state.title < 2 || this.state.content < 2 || this.state.rooms < 2 || this.state.square_meter < 2 || this.state.price < 2 || this.state.address < 2 || this.state.city < 2) {
            let error = "Veuillez renseigner les champ suivants : \n";
            if (this.state.title < 2) {
                error += "- Titre \n"
            }
            if (this.state.content < 2) {
                error += "- Contenue \n"
            }
            if (this.state.square_meter < 2) {
                error += "- Métres carrées \n"
            }
            if (this.state.price < 2) {
                error += "- Prix \n"
            }
            if (this.state.rooms < 2) {
                error += "- Piéces \n"
            }
            if (this.state.address < 2) {
                error += "- Adresse \n"
            }
            if (this.state.city < 2) {
                error += "- Ville \n"
            }
            alert(error);
        } else {
            this._fetchData();
        }
    };

    _fetchData = async() => {
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try {
                        let url = "http://192.168.1.11:8000/api/advertisements";
                        return fetch(url, {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer ' + responseJson,
                            }),
                            body: JSON.stringify({
                                title: this.state.title,
                                content: this.state.content,
                                rooms: parseInt(this.state.rooms),
                                squareMeter: parseInt(this.state.square_meter),
                                price: parseInt(this.state.price),
                                address: this.state.address,
                                city: this.state.city
                            })
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                console.log(responseText)
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })

                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        } catch (e) {
            console.error("Something went wrong" + e)
        }
    }

    render() {
        return (
            <ImageBackground source={bgImage} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <Text style={{fontSize : 25}}>Créer une annonce ImmoBest</Text>
                </View>
                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <MaterialIcons name="title" size={28} color="white" style={styles.inputIconTitle}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Titre de l'annonce"
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(title) =>this.setState({title})}
                    />
                </View>
                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <MaterialIcons name="title" size={28} color="white" style={styles.inputIconContent}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Contenue de l'annonce"
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(content) =>this.setState({content})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <FontAwesome5 name="street-view" size={32} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Numéro et Rue'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(address) => this.setState({address})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <FontAwesome5 name="city" size={22} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Ville'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(city) => this.setState({city})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <MaterialCommunityIcons name="door" size={30} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Nombre de piéces du bien'
                        keyboardType='number-pad'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(rooms) => this.setState({rooms})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <FontAwesome5 name="euro-sign" size={26} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Prix'
                        keyboardType='number-pad'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(price) => this.setState({price})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 15}}>
                    <FontAwesome5 name="ruler-combined" size={26} color="white" style={styles.inputIconPassword}/>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Métres carées'
                        keyboardType='number-pad'
                        placeholderTextColor={'rgba(255,255,255,0.85)'}
                        underLineColorAndroid='transparent'
                        onChangeText={(square_meter) => this.setState({square_meter})}
                    />
                </View>

                <View style={{alignItems: 'center', paddingTop: 5}}>
                    <TouchableOpacity
                        title='Créer le compte'
                        onPress={this._login}>
                        <View style={{alignItems: 'center'}}>
                            <FontAwesome5 name="camera-retro" size={60} color="black"/>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <Text style={{alignItems: 'center'}}> Ajouter une Photo </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.logButton}
                        title='Créer le compte'
                        onPress={this._login}>
                        <Text style={styles.text}>Créer l'annonce</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width : WIDTH - 55,
        height: 50,
        borderRadius: 45,
        borderColor: '#111111',
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(57,62,70,0.7)',
        color: 'rgba(232,243,255,0.85)',
        marginHorizontal: 25,
    },
    inputIcon : {
        position : 'absolute',
        top: 40,
        left: 37,
        zIndex: 1
    },
    inputIconTitle : {
        position : 'absolute',
        top: 30,
        left: 37,
        zIndex: 1
    },
    inputIconContent : {
        position : 'absolute',
        top: 30,
        left: 37,
        zIndex: 1
    },
    inputIconPassword : {
        position : 'absolute',
        top: 30,
        left: 37,
        zIndex: 1
    },
    logButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        marginTop: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(15,114,172,0.8)'
    },
    createButton: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        marginTop: 30,
        justifyContent: 'center',
        backgroundColor: 'rgba(7,50,75,0.8)'
    },
    text: {
        color: 'rgba(255, 255, 255, 07)',
        fontSize: 16,
        textAlign: 'center'
    }
});
export default createAdvertisementScreen;