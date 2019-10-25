import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import firebase from 'firebase';
import {Header, Button} from "react-native-elements";

import { logout } from "../config/firebase";
import { emails, password } from "../config/firebase";



const user_list = ["神大生1","神大生2","神大生3","神大生4","神大生5","渋谷JK1","渋谷JK2","渋谷JK3","渋谷JK4","渋谷JK5","ナビタイムジャパン"];

export default class UserList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const login_as_X = (id) => {
            logout()
            firebase.auth().signInWithEmailAndPassword(emails[id], password[id])
                .then(response => {
                    alert("Login success!");
                    this.props.navigation.navigate('AfterLogin', {user_info: {uid: response.user.uid, email: response.user.email, phoneNumber: response.user.phoneNumber, name: response.user.displayName}})
                })
                .catch(error => {
                    alert(error);
                });
        };

        let list = [];
        for (let i=0, len=user_list.length; i<len; i++){
            list.push(
                <View style={{padding:5}}>
                    <Button onPress={() => login_as_X(i)} title={user_list[i]} />
                </View>
            )
        }


        return (
            <View style={{backgroundColor: '#EEEEEE'}}>
                <Header
                    centerComponent={{text: 'User List', style: {color: '#fff', fontSize: 20}}}
                />
                <ScrollView style={{backgroundColor:'#EEEEEE', marginBottom:80}}>
                    {list}
                </ScrollView>
            </View>
        )
    }
}