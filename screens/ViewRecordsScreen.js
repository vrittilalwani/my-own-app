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
export default class ViewRecordsScreen extends Component {
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
  viewRecords = () => {
    let records = this.state.allRecords;
    if (records[0]) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.status == 'viewRecords'}
          style={{ flex: 1 }}>
          <ScrollView style={{ width: '100%' }}>
            {records.map((u, i) => {
              return (
                <Card>
                  <Card.Title>{u.name}</Card.Title>
                  <View key={i}>
                    <Text>Age: {u.age}</Text>
                    <Text>Hobby: {u.hobby}</Text>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
          <View style={{ position: 'fixed', bottom: 0 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('DashboardScreen', {
                  allRecords: this.state.allRecords,
                  userUid: this.state.userUid
                })
              }>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    } else {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.status == 'viewRecords'}>
          <View>
            <Text>No Records Found</Text>
          </View>
                    <View style={{ position: 'fixed', bottom: 0 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('DashboardScreen', {
                  allRecords: this.state.allRecords,
                  userUid: this.state.userUid
                })
              }>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  };
  render() {
    return this.viewRecords();
  }
}
const styles = StyleSheet.create({
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
