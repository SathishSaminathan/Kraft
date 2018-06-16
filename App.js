/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { YellowBox } from 'react-native';
import { StackNavigator } from "react-navigation";

import SideMenu from "./app/components/SideMenu";
import Home from "./app/screens/Home";
import SignUp from "./app/screens/SignUp";
import Login from "./app/screens/Login";
import Loader from "./app/components/Loader";
import UploadProducts from "./app/screens/UploadProducts";

const KraftAppStatckNavigation = StackNavigator({
  Login:{
    screen:Login
  },
  Loader:{
    screen:Loader
  },
  SignUp:{
    screen: SignUp
  },
  Home:{
    screen: SideMenu
  },
  UploadProducts:{
    screen:UploadProducts
  }
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  componentWillMount(){
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }
  render() {
    return (
      // <AppDrawer/>
      <KraftAppStatckNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
