import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import { Card, Header } from 'react-native-elements';
import firebase from "firebase";


export default class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'list': NaN}
    }

    componentWillMount() {
        let ShopRef = firebase.firestore().collection("shops");
        let buff = []
        ShopRef.get().then((query) => {
            query.forEach((doc) => {
                buff.push(doc.id);
            });
            console.log(buff);
            this.setState({'list':buff})
            console.log("rendering...")
        }).catch((error)=>{
                console.log(`データの取得に失敗しました (${error})`);
        });
    }

    render() {
        let list = []
        for (let i=0, len=this.state.list.length; i<len; i++){
            list.push(
                <Card
                    title={this.state.list[i]}
                    image={require('../img/fast_food.jpg')}>
                    <Button
                        color={'#00BB00'}
                        onPress={()=>this.props.navigation.navigate('Order', {shop_name:this.state.list[i]})}
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

