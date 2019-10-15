import React from 'react';
import { StatusBar, Text, View } from 'react-native';

import * as firebase from 'firebase';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'

import OrderComp from "./components/OrderComp";
import Order from './components/Order';
import ShopList from "./components/ShopList";
import Login from './components/Login';
import firebaseConfig from './config/firebase'
import UserList from "./components/UserList";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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
    ShopList: ShopList,
    MyPage: MyPage,
},{initialRouteName:'ShopList'})

const OrderNavigator = createStackNavigator(
    {
        Order: Order
    },
    {
        mode: 'modal',
        headerMode:'none',
    }
);

const OrderCompNavigator = createStackNavigator(
    {
        OrderComp: OrderComp
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const RootStack = createStackNavigator(
    {
        UserList: UserList,
        //Login: Login,
        AfterLogin: TabNavigator,
        Order: OrderNavigator,
        OrderComp: OrderCompNavigator,
    },
    {
        mode: 'modal',
        headerMode:'none',
        initialRouteName: 'UserList',
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
