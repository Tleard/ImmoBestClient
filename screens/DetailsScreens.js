import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, AsyncStorage} from 'react-native';
import ProfileScreen from "./ProfileScreen";
import bgImage from '../assets/PhoneWallpaperModified.png';
import Logo from "../assets/ImmoBestLogoRound2.png";


const {width: WIDTH} = Dimensions.get('window');
class DetailsScreens extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postData : '',
            image : ''
        }
    }

    UNSAFE_componentWillMount() {
        this._fetchData();
    }


    _fetchData = async() => {
        try {
            await AsyncStorage.getItem("userToken")
                .then((responseJson) => {
                    try{
                        let url = "http://192.168.1.11:8000/api/advertisements/" + this.props.route.params.PostId;
                        return fetch(url, {
                            method: 'GET',
                            headers: new Headers({
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'Authorization': 'Bearer '+ responseJson,
                            }),
                        })
                            .then((response) => response.json())
                            .then((responseText) => {
                                this.setState({postData: responseText})
                                return fetch("http://192.168.1.11:8000" + responseText.images, {
                                    method: 'GET',
                                    headers: new Headers({
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'Authorization':'Bearer ' + responseJson
                                    })
                                })
                                    .then((response) => response.json() )
                                    .then(data => {
                                        let image_uri = "http://192.168.1.11:8000/images/" + data.url;
                                        this.setState({image: image_uri})
                                    })
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    } catch (e) {
                        console.error("Something went wrong" + e)
                    }
                })
        }
        catch (e) {
            console.error("Something went wrong" + e)
        }
    }

    render() {
        const post = this.state.postData
        const image = this.state.image
        return(
            <View>
                <View style={{alignItems: 'center', paddingTop: 80}}>
                    <Image
                        style={{ width: WIDTH - 10, height: WIDTH }}
                        source={{ uri: image }}
                    />
                </View>
                <Text style={styles.title_text}>{image}</Text>
                <Text style={styles.title_text}>{post.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        paddingTop: 20,
        flex : 1,
        borderColor : '#000000',
        width : WIDTH - 15,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        paddingRight: WIDTH -20,
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    content_container: {
        flex: 1,
    },
    header_container: {
        flex: 3,
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 25,
        alignItems: 'center',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        fontSize: 15
    },
    content_text: {
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default DetailsScreens;