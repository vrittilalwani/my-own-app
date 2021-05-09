import * as React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

export default class AppHeader extends React.Component {
  render(){
    return(
      <View style={{width:'100%',alignSelf:'center',justifyContent:'center'}}>
        <Text style={styles.textHeader}> 
        Employee Hobby Management
        </Text>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  textHeader:{
    fontSize: 20,
    fontWeight:'bold',
    textAlign:'center',
    backgroundColor:'red',
    width:'100%',
    height:35,
    alignSelf:'center',
    justifyContent:'center',
    marginTop:0
  }
})