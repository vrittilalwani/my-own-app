import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Picker,
} from 'react-native';
import { Card } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

import firebase from 'firebase';
import db from '../config';

export default class NewsScreen extends React.Component{
  constructor(){
    super()
    this.state={
      info : '',
    }
  }

componentDidMount(){
  /*var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    */
    var inform="";
   /* this.setState({ info:inform });
    firebase
      .firestore()
      .doc(`users/${uid}`)
      .update({
        info: info,
      })
      .then(() => {
        return alert('New Record Created');
      })*/
    
}

  render(){
    return(
      <View>
        <AppHeader/>
      
        <Text>
          {this.state.info}
        </Text>
      </View>
    )
  }
}