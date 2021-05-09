import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import ViewRecordsScreen from './screens/ViewRecordsScreen';
import CreateRecordScreen from './screens/CreateRecordScreen';
import NewsScreen from './screens/NewsScreen';

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const switchNavigator = createSwitchNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    SignupScreen: { screen: SignupScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    DashboardScreen: { screen: DashboardScreen },
    CreateRecordScreen: { screen: CreateRecordScreen },
    ViewRecordsScreen: { screen: ViewRecordsScreen },
    //NewsScreen:{screen:NewsScreen}
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

const AppContainer = createAppContainer(switchNavigator);
