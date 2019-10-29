import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Card, Header } from 'react-native-elements';
import firebase from "firebase";
import UserList from "./UserList";


export default class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shop_list: [], user_info: props.navigation.state.params.user_info}
    }

    componentDidMount() {
        let ShopRef = firebase.firestore().collection("shops");
        let shops = [];
        ShopRef.get().then((query) => {
            query.forEach((doc) => {
                let data = doc.data();
                shops.push({name:data.name, brand_id:data.brand_id, address:data.address, geopoint:data.geopoint});
            });
            this.setState({shop_list:shops});
        }).catch((error)=>{
                console.log(`データの取得に失敗しました (${error})`);
        });
    }

    render() {
        let list = []
        for (let i=0, len=this.state.shop_list.length; i<len; i++){
            let brand_id = this.state.shop_list[i].brand_id

            // require の引数には変数が使えないため、if文
            if (brand_id === 'マクドナルド'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/fast_food.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );

            }
            if (brand_id === 'ドミノピザ'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/pizza.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === 'ガスト'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/restaurant.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === '松屋' || brand_id === 'すき家'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/gyudon.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === 'おむすび権兵衛'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/omusubi.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === 'スターバックス'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/starbacks.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === '餃子の王将'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/gyoza.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
            if (brand_id === 'ミスタードーナツ'){
                list.push(
                    <Card
                        key={i}
                        title={this.state.shop_list[i].name}
                        image={require('../img/donut.jpg')}>
                        <Button
                            color={'#00BB00'}
                            onPress= {() => this.props.navigation.navigate('Order', {shop_info:this.state.shop_list[i], user_info:this.state.user_info})}
                            title='注文する' />
                    </Card>
                );
            }
        }

        return (
            <View style={{backgroundColor:'#EEEEEE'}}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=>{this.props.navigation.navigate('UserList')} }}
                    centerComponent={{ text: 'Shop List', style: { color: '#fff' , fontSize: 20} }}
                />
                <ScrollView style={{backgroundColor:'#EEEEEE', marginBottom:80}}>
                    {list}
                </ScrollView>
            </View>
        );
    }
}

