import React from 'react';
import { View, Text } from 'react-native';

export default class OrderComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {order: props.navigation.state.params.order, shop_info: props.navigation.state.params.shop_info}
    }

    render() {
        return (
            <View>
                <Text>注文が完了しました</Text>
                <Text>{this.state.shop_info.name}</Text>
                <Text>{this.state.order}</Text>
            </View>
        );
    }
}