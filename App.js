import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import * as firebase from 'firebase';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Order from './components/Order';
import ShopList from "./components/ShopList";
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
    ShopList: ShopList,
    MyPage: MyPage,
},{initialRouteName:'Home'})

const OrderNavigator = createStackNavigator(
    {
        Order: Order
    }
);

const RootStack = createStackNavigator(
    {
        Login: Login,
        AfterLogin: TabNavigator,
        Order: OrderNavigator,
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
    return (
        <View style={{flex:1, marginTop: StatusBar.currentHeight}}>
            <AppContainer/>
        </View>
    )
  }
}
