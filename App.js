import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { API_KEY, AuthDomain, DatabaseURL, ProjectId, StorageBucket, MessagingSenderId, AppId, MeasurementId } from 'react-native-dotenv'

import * as firebase from 'firebase';
import Order from './components/order';
import firebaseConfig from './config/firebase'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
            <Order/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
