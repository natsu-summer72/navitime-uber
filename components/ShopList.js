import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Tile, Header } from 'react-native-elements';
import {StatusBar} from "react-native-web";
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
                <Tile
                    key={i}
                    imageSrc={require('../img/fast_food.jpg')}
                    title={this.state.list[i]}
                    titleStyle={{fontSize:20}}
                    contentContainerStyle={{ height: 70 }}
                />
            )
        }

        return (
            <View>
                <Header
                    centerComponent={{ text: 'Shop List', style: { color: '#fff' , fontSize: 20} }}
                />
                <ScrollView>
                    {list}
                </ScrollView>
            </View>
        );
    }
}