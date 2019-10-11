import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Card, Header } from 'react-native-elements';
import firebase from "firebase";


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
            console.log(shops);
            this.setState({shop_list:shops});
        }).catch((error)=>{
                console.log(`データの取得に失敗しました (${error})`);
        });
    }

    render() {
        let list = []
        for (let i=0, len=this.state.shop_list.length; i<len; i++){
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

            )
        }

        return (
            <View style={{backgroundColor:'#EEEEEE'}}>
                <Header
                    centerComponent={{ text: 'Shop List', style: { color: '#fff' , fontSize: 20} }}
                />
                <ScrollView style={{backgroundColor:'#EEEEEE', marginBottom:80}}>
                    {list}
                </ScrollView>
            </View>
        );
    }
}

