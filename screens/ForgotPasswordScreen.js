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
import 'firebase/firestore';
// import {firestore} from '../config';

const initalHobbies = ['hobby 0', 'hobby 1', 'hobby 2'];

const firebaseConfig = {
  apiKey: 'AIzaSyDWZXQumv8kUhBwnkuvhJWXv3pq-TkPpgk',
  authDomain: 'school-app-8675e.firebaseapp.com',
  projectId: 'school-app-8675e',
  storageBucket: 'school-app-8675e.appspot.com',
  messagingSenderId: '141812727105',
  appId: '1:141812727105:web:d49d65894380581b07f5c0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class ForgotPasswordScreen extends Component {
  constructor() {
    super();
    this.state = {
      userUid: 'wY10QqCEGIZ25ngeMtHzN4BAwBd2',
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      contact: '',
      confirmPassword: '',
      status: 'login',
      userCreds: '',
      recordName: '',
      recordAge: '',
      pickerValue: '1',
      allRecords: [],
    };
  }
  handleForgetPass = (emailId) => {
    firebase
      .auth()
      .sendPasswordResetEmail(emailId)
      .then(() => {
        return alert('Password reset link sent on email');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  forgetPass = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.status == 'forgetPass'}>
        <View style={styles.forgetPassContainer}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Enter Your Registered Email ID
          </Text>
          <TextInput
            style={styles.loginBox}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.forgetPassBtn}
            onPress={() => this.handleForgetPass(this.state.emailId)}>
            <Text style={styles.forgetPassBtn}>Send Link</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'fixed', bottom: 0 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        {this.forgetPass()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12BE85',
    alignItems: 'center',
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'green',
  },
  forgetPassBtn: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    textDecoration: 'underline',
    color: 'blue',
  },
  forgetPassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1298',
    shadowColor: '#000',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
