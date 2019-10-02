import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { API_KEY, AuthDomain, DatabaseURL, ProjectId, StorageBucket, MessagingSenderId, AppId, MeasurementId } from 'react-native-dotenv'

import * as firebase from 'firebase';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Order from './components/order';
import Login from './components/Login';
import firebaseConfig from './config/firebase'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Home extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}


class MyPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MyPage!</Text>
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: Home,
    Order: Order,
    MyPage: MyPage,

})


const RootStack = createStackNavigator(
    {
        Login: Login,
        AfterLogin: TabNavigator,
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
