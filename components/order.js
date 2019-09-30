import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'

import * as firebase from 'firebase'

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shop_name: '', shop_address: '', order: ''};
    }

    render() {
        const {shop_name, shop_address, order} = this.state;
        let rootRef = firebase.database().ref();
        let orderRef = rootRef.child('orders');

        let moment = require('moment')
        let datetime = moment().format("YYYY-MM-DD HH:mm:ssZ")

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30, flex:1, justifyContent:'center'}}>注文</Text>
                <View style={{flex:5}}>
                    <FormLabel>店名</FormLabel>
                    <FormInput
                        onChangeText={shop_name => this.setState({shop_name})}
                        value={shop_name}/>

                    <FormLabel>店住所</FormLabel>
                    <FormInput
                        onChangeText={shop_address => this.setState({shop_address})}
                        value={shop_address}/>

                    <FormLabel>オーダー</FormLabel>
                    <FormInput
                        onChangeText={order => this.setState({order})}
                        value={order}/>
                </View>
                <Button backgroundColor="#00bfff" title="注文送信" style={{flex:1, justifyContent: 'center'}}
                        onPress = {() => orderRef.push({'shop-name': this.state.shop_name, 'shop-address': this.state.shop_address,
                            'order': this.state.order, datetime: datetime,'uid': '0'}) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50

    }
});