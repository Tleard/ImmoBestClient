import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {TokenHandler} from "../API/TokenHandler";
import {AsyncStorage} from 'react-native';
import {UserHandler} from "../API/UserHandler";


class LinksScreen extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      userData : '',
      userId : '',
      userToken: ''
    }
  }

  UNSAFE_componentWillMount(){
    this._fetchData();
    this._getUserInfo();
  }

  _getUserInfo = async() => {
    console.log("sss" +this.state.userId);
    console.log("ttt" +this.state.userToken);
  };

  _fetchData = async() => {
    try {
      await AsyncStorage.getItem("userId")
          .then((responseJson) => {
            this.setState({userId: responseJson})
            console.log("Id : " +responseJson);
          })
      await AsyncStorage.getItem("userToken")
          .then((responseJson) => {
            this.setState({userToken: responseJson})
            console.log("Token : " +responseJson);
          })
    }
    catch (e) {
      console.error("Something went wrong" + e)
    }
  }

  render() {
    return (
        <View style={{alignItems: 'center', paddingTop: 50}}>
          <Text>Hello Mate {this.state.userId}</Text>
          <Text>Token {this.state.userToken}</Text>
          <TouchableOpacity
              title='Connexion'
              onPress={() => this._getUserInfo()}>
            <Text>Connexion</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default LinksScreen;