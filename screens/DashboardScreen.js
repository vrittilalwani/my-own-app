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
    };
  }
  dashboard = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.status == 'dashboard'}>
        <View>
          <View style={styles.dashboardBtnDiv}>
            <TouchableOpacity
              style={styles.createRecordBtn}
              onPress={() =>
                this.props.navigation.navigate('CreateRecordScreen', {
                  userUid: this.props.navigation.getParam(
                    'userUid',
                    'default value'
                  ),
                  allRecords: this.props.navigation.getParam(
                    'allRecords',
                    'default value'
                  ),
                })
              }>
              <Text style={{ fontSize: 30 }}>Create New Record</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newsBtn}
              onPress={() =>
                this.props.navigation.navigate('NewsScreen')
              }>
              <Text style={{ fontSize: 30 }}> Today's News </Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity
              style={styles.viewRecordBtn}
              onPress={() =>
                this.props.navigation.navigate('ViewRecordsScreen', {
                  userUid: this.props.navigation.getParam(
                    'userUid',
                    'default value'
                  ),
                  allRecords: this.props.navigation.getParam(
                    'allRecords',
                    'default value'
                  ),
                })
              }>
              <Text style={{ fontSize: 30 }}>View Records</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ position: 'fixed', bottom: 0 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  render() {
    return this.dashboard();
  }
}
const styles = StyleSheet.create({
  dashboardBtnDiv: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createRecordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 25,
    height: 50,
    backgroundColor: 'yellow',
    marginBottom: 70,
  },
  newsBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    borderRadius: 25,
    height: 50,
    backgroundColor: 'red',
    marginBottom: 70,
  },
  viewRecordBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1298',
    shadowColor: '#000',
    alignSelf:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
