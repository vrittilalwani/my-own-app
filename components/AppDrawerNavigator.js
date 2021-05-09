import {createDrawerNavigator} from 'react-navigation-drawer';
//import { AppTabNavigator } from './AppTabNavigator'
//import CustomSidebarMenu  from './CustomSidebarMenu';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import NewsScreen from '../screens/NewsScreen'
import DashboardScreen from '../screens/DashboardScreen';
import CustomSideBarMenu from './CustomSideBarMenu'

export const AppDrawerNavigator = createDrawerNavigator({
 
  LoginScreen:{
      screen : LoginScreen,
    },
  DashboardScreen :{
    screen : DashboardScreen
  },
    ForgotPasswordScreen : {
      screen : ForgotPasswordScreen
    },
    NewsScreen : {
      screen : NewsScreen
    },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })