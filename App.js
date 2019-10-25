import React from 'react';
import { StatusBar, Text, View, Platform } from 'react-native';

import * as firebase from 'firebase';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs'

import OrderComp from "./components/OrderComp";
import Order from './components/Order';
import ShopList from "./components/ShopList";
import Login from './components/Login';
import MyPage from './components/MyPage';
import UserEdit from './components/UserEdit';
import firebaseConfig from './config/firebase'
import UserList from "./components/UserList";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
    return (
        <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: '#3D6DCC'
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    );
}


const MyPageNavigator = createStackNavigator(
    {
        MyPage: MyPage,
        Edit: UserEdit
    },
    {
        mode: 'push',
        headerMode:'none',
        initialRouteName:'MyPage',
    }
    );


const TabNavigator = createBottomTabNavigator({
    ShopList: ShopList,
    MyPage: MyPageNavigator,
    },
    {initialRouteName:'ShopList'}
    );

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
        <View style={{flex:1}}>
            <StatusBarPlaceHolder/>
            <AppContainer/>
        </View>
    )
  }
}
