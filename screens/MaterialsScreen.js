import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout } from '../components/Firebase/firebase';


export default function MaterialsScreen({navigation}) {
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Materiały dodatkowe</Text>
 
       
    </SafeView>
    
    );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {

    width: '30%',
  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:30,
    color:Colors.lightGrey,
    padding:100
},

});
