import React from 'react';
import {Button, Text, TextInput, View} from "react-native";
import { firebase } from 'firebase'

export default class UserEdit extends React.Component {
    constructor(props){
        super(props);
        let user_info = props.navigation.state.params.user_info;
        this.state = {name: user_info.name, email: user_info.email, phoneNumber:user_info.phoneNumber};
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{paddingLeft:20, paddingRight:20}}>
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        placeholder="名前を入力してください"
                        placeholderTextColor="#777"
                    />
                </View>
                <View style={{paddingLeft:20, paddingRight:20}}>
                    <Text>Email</Text>
                    <TextInput
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        placeholder="メールアドレスを入力してください"
                        placeholderTextColor="#777"
                    />
                </View>
                <View style={{paddingLeft:20, paddingRight:20}}>
                    <Text>パスワード</Text>
                    <TextInput
                        onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                        value={this.state.phoneNumber}
                        placeholder="電話番号を入力してください"
                        placeholderTextColor="#777"
                    />
                </View>
                <Button
                    title="ユーザー情報を編集する"
                    onPress={async () => {
                        let user = await firebase.auth().currentUser;
                        await user.updateProfile({displayName:this.state.name, phoneNumber:this.state.phoneNumber})
                            .then(resoonse => {
                                alert("Update successfully!");
                            }).catch(error => {
                                alert(error);
                            }
                        )
                    }}
                />
            </View>
        );
    }
}
