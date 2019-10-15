import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import {Header, Button} from "react-native-elements";

import { logout } from "../config/firebase";
import { emails, password } from "../config/firebase";


export default class UserList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const login_as_X = (id) => {
            logout()
            firebase.auth().signInWithEmailAndPassword(emails[id], password)
                .then(response => {
                    alert("Login success!");
                    console.log(response.user.uid);
                    this.props.navigation.navigate('AfterLogin', {user_info: {uid: response.user.uid, email: response.user.email, phoneNumber: response.user.phoneNumber, name: response.user.displayName}})
                })
                .catch(error => {
                    alert(error);
                });
        }


        return (
            <View style={{backgroundColor: '#EEEEEE'}}>
                <Header
                    centerComponent={{text: 'User List', style: {color: '#fff', fontSize: 20}}}
                />
                <View style={{padding:5}}>
                    <Button onPress={() => login_as_X(0)} title={"ユーザー1"} />
                </View>
                <View style={{padding:5}}>
                    <Button onPress={() => login_as_X(1)} title={"ユーザー2"} />
                </View>
            </View>
        )
    }
}