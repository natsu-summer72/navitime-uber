import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { API_KEY, AuthDomain, DatabaseURL, ProjectId, StorageBucket, MessagingSenderId, AppId, MeasurementId } from 'react-native-dotenv'

import * as firebase from 'firebase';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Order from './components/order';
import Login from './components/Login';
import firebaseConfig from './config/firebase'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const RootStack = createStackNavigator(
    {
        Login: Login,
        Order: Order,
    },
    {
        mode: 'modal',
        headerMode:'none',
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(RootStack)

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
