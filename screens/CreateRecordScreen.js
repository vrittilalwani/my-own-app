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
import firestore from '../config';
const initalHobbies = ['Reading', 'Coding', 'Driving'];
export default class CreateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userUid: this.props.navigation.getParam('userUid', 'default value'),
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
      allRecords: this.props.navigation.getParam('allRecords', 'default value'),
    };
  }
  handleNewRecord = async (uid, name, age, hobby) => {
    //here hobby is indexed from already hobbies created above
    hobby = initalHobbies[hobby];
    let user = await firebase.firestore().doc(`users/${uid}`).get();
    let hobbies = user.data().hobbies;
    if (hobbies) {
      hobbies.push({ name, age, hobby });
    } else {
      hobbies = [{ name, age, hobby }];
    }
    this.setState({ allRecords: hobbies });
    firebase
      .firestore()
      .doc(`users/${uid}`)
      .update({
        hobbies: hobbies,
      })
      .then(() => {
        return alert('New Record Created');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };
  createRecord = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.status == 'createRecord'}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Create New Record</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    recordName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Age'}
                keyboardType={'numeric'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    recordAge: text,
                  });
                }}
              />
              <Picker
                selectedValue={this.state.pickerValue}
                style={styles.formTextInput}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ pickerValue: itemValue })
                }>
                <Picker.Item label=" Reading " value="0" />
                <Picker.Item label=" Coding " value="1" />
                <Picker.Item label=" Driving " value="2" />
              </Picker>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.handleNewRecord(
                      this.state.userUid,
                      this.state.recordName,
                      this.state.recordAge,
                      this.state.pickerValue
                    )
                  }>
                  <Text style={styles.registerButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    this.props.navigation.navigate('DashboardScreen', {
                      allRecords: this.state.allRecords,
                      userUid: this.state.userUid
                    })
                  }>
                  <Text style={{ color: '#125722', fontWeight: 'bold' }}>
                    Cancel
                  </Text>
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
      <View>
      <AppHeader/>
      {this.createRecord()}
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: '#125722',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
  },
});
