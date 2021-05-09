import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Picker,
  Platform
} from 'react-native';
import { Card } from 'react-native-elements';
import AppHeader from '../components/AppHeader';

import firebase from 'firebase';
import firestore from '../config';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0,
      buttonDisabled:false,
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
  userLogin = (emailId, password) => {
    var count =this.state.count;
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(async (cred) => {
        let user = await firestore().doc(`users/${cred.user.uid}`).get();
        user = user.data();
        this.setState({ userUid: cred.user.uid });
        this.setState({ userCreds: user });
        if (user.hobbies) {
          this.setState({ allRecords: user.hobbies });
        }
        this.props.navigation.navigate('DashboardScreen',{userUid: this.state.userUid, allRecords: this.state.allRecords}); 
        return alert(`Welcome ${user.first_name} ${user.last_name}`);

      })
      .catch((error) => {
        this.setState({count : this.state.count +1})
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
      if(count == 2){
        alert( "Too many attempts, plz signUp again ")
        this.setState({buttonDisabled:true})
      }
  };

  
  getTodaysDate(){
    var today = new Date();
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
    return today;
  }

  login = () => {
   
    return (
    
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.status == 'login'}>
        

        <View style={Platform.OS==="android"?styles.loginContainer1:
        styles.loginContainer2}>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="enter Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.forgetPassBtn}
            onPress={() =>
              this.props.navigation.navigate('ForgotPasswordScreen')
            }>
            <Text style={styles.forgetPassBtn}>Forget Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          disabled={this.state.buttonDisabled}
            style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Image style={styles.button}
            source={require('../assets/loginB.jpeg')}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SignupScreen')}>
            
          <Image style={styles.button}
          source={require('../assets/signupB.jpeg')}/>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <Image style={{height:200, width:200}} 
        source={require('../assets/image1.jpeg')}/>
        {this.login()}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  loginContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
    loginContainer1 : {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    marginTop:190
  },
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
    marginTop:10,
    
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'green',
    maxHeight:200
  },
  
  button: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    
    
  },
  
  forgetPassBtn: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    textDecoration: 'underline',
    color: 'blue',
  },
});
