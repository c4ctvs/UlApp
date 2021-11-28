import React from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';
import { checkIfUserIsLoggedIn } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
export default function WelcomeScreen({ navigation }) {
  
  checkIfUserIsLoggedIn()
  useStatusBar('light-content');

  console.log("hello")
  return (

    <View style={styles.container}>
      <View style={styles.logoContainer}>
    
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        
      </View>
      <View style={styles.buttonContainer}>

      
        <AppButton title="Zaloguj"color="lightGrey" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Zarejestruj"
          color="lightGrey"
          onPress={() => navigation.navigate('CodeAuth')}
        />
   
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    justifyContent:'space-evenly',
    marginTop:120,
    width: 400,
    height: 400
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.lightGrey
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 90,
    width: '100%'
  }
});
