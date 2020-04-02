import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity,
  View, TextInput, Button, ImageBackground, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import {LoginAttempt} from '../API/LoginAttempt';
import {TokenHandler} from "../API/TokenHandler";
import {UserHandler} from "../API/UserHandler";
import BottomTabNavigator from "../navigation/BottomTabNavigator";

import { MonoText } from '../components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import bgImage from '../assets/PhoneWallpaperModified.png';
import Logo from '../assets/ImmoBestLogoRound2.png';

const {width: WIDTH} = Dimensions.get('window');
class HomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password : '',
      token :'',
      id:'',
      error_message:'',
    }
  }

  _login = async() => {
    if  (this.state.username.length > 2 && this.state.password.length > 2)
    {
      //Get all data from connexion and register them as state
      await LoginAttempt(this.state.username, this.state.password).then(data =>
          this.setState({
              token: data.token,
            id : JSON.stringify(data.id),
            error_message: JSON.stringify(data.message)
          })
      );
    } else if (typeof this.state.error_message !== 'undefined') {
      alert(this.state.error_message)
    }
    //Store Token
    await TokenHandler.storeToken(this.state.token, this.state.id);
    const parent = this.props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false
    });
    this.props.navigation.navigate('Profile');
  };

  render() {
    return (
        <ImageBackground source={bgImage} style={{width: '100%', height: '100%'}}>
          <View style={{alignItems: 'center', paddingTop: 80}}>
            <Image source={Logo} style={{alignItems: 'center'}} />
          </View>

          <View style={{alignItems: 'center', paddingTop: 50}}>
            <FontAwesome name="user" size={32} color="white" style={styles.inputIcon}/>
            <TextInput
                style={styles.textInput}
                placeholder='Username'
                placeholderTextColor={'rgba(255,255,255,0.85)'}
                underLineColorAndroid='transparent'
                onChangeText={(username) =>this.setState({username})}
            />
          </View>

          <View style={{alignItems: 'center', paddingTop: 50}}>
            <FontAwesome name="lock" size={32} color="white" style={styles.inputIconPassword}/>
            <TextInput
                style={styles.textInput}
                placeholder='Password'
                placeholderTextColor={'rgba(255,255,255,0.85)'}
                underLineColorAndroid='transparent'
                secureTextEntry ={true}
                onChangeText={(password) => this.setState({password})}
            />

            <TouchableOpacity
                style={styles.logButton}
                title='Connexion'
                onPress={this._login}>
              <Text style={styles.text}>Connexion</Text>
            </TouchableOpacity>

          </View>

        </ImageBackground>
    );
  }
}

HomeScreen.navigationOptions = {
  headerShown: false,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
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
    top: 60,
    left: 37,
    zIndex: 1
  },
  inputIconPassword : {
    position : 'absolute',
    top: 60,
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
  text: {
    color: 'rgba(255, 255, 255, 07)',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default HomeScreen;