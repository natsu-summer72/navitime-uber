import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', shop_name: '', shop_address: '', order: ''};
    }

    requiredMessage = input => {
        return input === '' ? <FormValidationMessage>入力して下さい</FormValidationMessage> : <View/>
    };

    render() {
        const {name, shop_name, shop_address, order} = this.state;

        return (
            <View style={styles.container}>
                <Text style={{fontSize: 30, flex:1, justifyContent:'center'}}>注文</Text>
                <View style={{flex:10, justifyContent:'center'}}>
                    <FormLabel>名前</FormLabel>
                    <FormInput
                        onChangeText={name => this.setState({name})}
                        value={name}/>
                    {this.requiredMessage(name)}

                    <FormLabel>店名</FormLabel>
                    <FormInput
                        onChangeText={shop_name => this.setState({shop_name})}
                        value={shop_name}/>
                    {this.requiredMessage(shop_name)}

                    <FormLabel>店住所</FormLabel>
                    <FormInput
                        onChangeText={shop_address => this.setState({shop_address})}
                        value={shop_address}/>
                    {this.requiredMessage(shop_address)}

                    <FormLabel>オーダー</FormLabel>
                    <FormInput
                        onChangeText={order => this.setState({order})}
                        value={order}/>
                    {this.requiredMessage(order)}
                </View>
                <Button backgroundColor="#00bfff" title="注文送信" style={{flex:1, justifyContent: 'center'}}/>
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