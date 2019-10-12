import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Badge, Button, Card, Header} from 'react-native-elements';

import firebase from 'firebase';
import 'firebase/firestore';


export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {shop_info: props.navigation.state.params.shop_info,  order: null,  items: [],
            order_count: [], user_info: props.navigation.state.params.user_info};
    }

    componentDidMount() {
        let MenuRef = firebase.firestore().collection("menus");
        let items = [];
        MenuRef.doc(this.state.shop_info.brand_id).get().then((doc) => {
            items = doc.data().items;
            let temp = [];
            for (let i=0; i<items.length;i++) {
                temp.push(0);
            }
            this.setState({items: items, order_count:temp});
        }).catch((error)=>{
            console.log(`データの取得に失敗しました (${error})`);
        });
    }

    render() {
        let list = [];
        list.push(
            <View style={{backgroundColor: '#EEEEEE'}}>
                {
                    this.state.items.map((m,j) => {
                        return (
                                <Card key={j}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{flex:2, textAlign:'center'}}>
                                            {m}
                                        </Text>
                                        <View style={{flex:1,flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                            <Badge value={"+"} onPress={() => {
                                                let temp = this.state.order_count;
                                                temp[j] += 1;
                                                this.setState({order_count:temp})
                                            }}/>
                                            <Badge value={this.state.order_count[j]}/>
                                            <Badge value={"-"} onPress={() => {
                                                let temp = this.state.order_count;
                                                if (temp[j]>0){
                                                    temp[j] -= 1;
                                                    this.setState({order_count:temp})
                                                }
                                            }}/>
                                        </View>
                                    </View>
                                </Card>
                        )
                    })
                }
            </View>
        );

        return (
            <View style={{backgroundColor: '#EEEEEE'}}>
                <Header
                    centerComponent={{ text: this.state.shop_info.name, style: { color: '#fff' , fontSize: 20} }}
                />
                <ScrollView style={{backgroundColor:'#EEEEEE'}}>
                    {list}
                </ScrollView>
                <View style={{marginTop:20, marginBottom:20}}>
                    <Button backgroundColor="#00bfff" title="注文送信"
                            onPress ={async () => {
                                let orderRef = firebase.firestore().collection("orders");
                                let moment = await require('moment');
                                let datetime = await moment().format("YYYY年MM月DD日 HH:mm:ssZ")

                                let items = [];
                                for (let i=0; i<this.state.items.length; i++){
                                    for (let j=0; j<this.state.order_count[i]; j++){
                                        items.push(this.state.items[i])
                                    }
                                }

                                if (items.length !== 0) {
                                    let UserRef = firebase.firestore().collection("users");
                                    let user_info = {};
                                    console.log(this.state.user_info.uid)
                                    await UserRef.doc(this.state.user_info.uid).get().then((doc) => {
                                        user_info = {address: doc.data().address, geopoint: doc.data().geopoint};
                                    }).catch((error) => {
                                        console.log(`データの取得に失敗しました (${error})`);
                                    });

                                    await orderRef.add({
                                        crated_at: datetime,
                                        items:items,
                                        shop:this.state.shop_info,
                                        status:0,
                                        user_info:{address:user_info.address, email: this.state.user_info.email, geopoint:user_info.geopoint,
                                                    name: this.state.user_info.name, phoneNumber: this.state.user_info.phoneNumber, uid: this.state.user_info.uid},
                                    });

                                    await this.props.navigation.navigate('OrderComp', {
                                        order: items,
                                        shop_info: this.state.shop_info
                                    })
                                }
                            }}
                    />
                </View>
            </View>
        );
    }
}

