import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import Root from './src/main';
 
export default class MainProject extends Component {
  render() {
    return ( 
      <View style={styles.MainContainer}>
        <Root {...this.props} />
      </View>            
    );
  }
}
 
const styles = StyleSheet.create({ 
  MainContainer: {  
    flex:1,
  },
});
 