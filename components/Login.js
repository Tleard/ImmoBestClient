import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const userInfo ={username: 'admin', password: 'pass12345'};
class Login extends React.Component {

    _login = async() => {
        if (userInfo.username === this.state.username && userInfo.password === this.state.password) {
            //Call AsyncStorage & Next Page
            alert('Logged in')
        } else {
            alert('Something went wrong')
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : ''
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={styles.textinput}
                    placeholder='Username'
                    onChangeText={(username) =>this.setState({username})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='Password'
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    style={styles.loginbutton}
                    title='Connexion'
                    onPress={this._login}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        width: 200,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
        marginTop: 40
    },
    loginbutton: {
        marginTop: 50,
        marginRight: 40
    }
})

export default Login