import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Header, Button } from "react-native-elements";

export default class OrderComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {order: props.navigation.state.params.order, shop_info: props.navigation.state.params.shop_info}
    }

    render() {
        return (
            <View>
                <Header
                    centerComponent={{ text: this.state.shop_info.name, style: { color: '#fff' , fontSize: 20} }}
                />
                <Text style={{padding: 10, fontSize:24, height: 50}}>注文が完了しました</Text>

                <Button title={"ホームへ戻る"}
                        onPress={() => {
                            this.props.navigation.navigate('AfterLogin');
                        }}
                />

                <Text style={{padding:10, fontSize:20, height:50}}>注文内容</Text>
                <View>
                    <FlatList
                        data = {this.state.order}
                        renderItem={({item}) =>
                                <Text style={{padding: 10, fontSize: 18, height: 50, textAlign:'center'}}>{item}</Text>
                        }
                    />
                </View>
            </View>
        );
    }
}