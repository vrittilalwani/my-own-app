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
  Image,
  ImagePicker,
  Avatar
} from 'react-native';
import { Card } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

import firebase from 'firebase';
import firestore from '../config';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
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
      image:'#'
    };
  }
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then((cred) => {
          firestore().doc(`users/${cred.user.uid}`).set({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            email_id: this.state.emailId,
          });
          return alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.props.navigation.navigate('LoginScreen'),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };
  

  

  showModal = () => {
    return (
      <Modal animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'First Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Last Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    contact: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Confrim Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />

              

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }>
                  <Image style={styles.registerButton}
                  source={require('../assets/registerB.jpeg')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.props.navigation.navigate('LoginScreen')}>
                  <Image style={styles.cancelButton}
                  source={require('../assets/cancel.jpeg')}/>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={styles.container}>
     <AppHeader/>
      {this.showModal()}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12BE85',
    alignItems: 'center',
  },
  
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#125722',
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: '75%',
    height: 45,
    alignSelf: 'center',
    borderColor: '#12ab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  
  cancelButton: {
    width: 200,
    marginTop:10,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    

    borderRadius: 10,
  },
});
