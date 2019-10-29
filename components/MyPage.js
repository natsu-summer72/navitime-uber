import React from 'react';
import {Button, Text, View} from "react-native";

export default class MyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {user_info: props.navigation.dangerouslyGetParent().getParam('user_info')};
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>UserName: {this.state.user_info.name}</Text>
                <Text>Email: {this.state.user_info.email}</Text>
                <Text>PhoneNumber: {this.state.user_info.phoneNumber}</Text>
                <View style={{paddingTop: 20, paddingLeft:40, paddingRight:40}}>
                    <Button
                        title="ユーザー情報を編集する"
                        onPress={() => {
                            this.props.navigation.navigate('Edit',{user_info:this.state.user_info})
                        }}
                    />
                </View>
            </View>
        );
    }
}
