import React, { Component } from 'react';
import { Text, View } from 'react-native';
import  Bananas  from './components/Bananas';

export default class App extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Here's your Banana.</Text>
            <Bananas/>
        </View>
    );
  }
}
