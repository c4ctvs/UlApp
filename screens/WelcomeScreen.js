import React from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';
import { checkIfUserIsLoggedIn } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
export default function WelcomeScreen({ navigation }) {
  
  console.ignoredYellowBox = ['Setting a timer']
checkIfUserIsLoggedIn()
  useStatusBar('light-content');

  console.log("hello")
  return (

    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Text style={styles.subtitle}>UpApp</Text>
        <Image source={require('../assets/flame.png')} style={styles.logo} />
        
      </View>
      <View style={styles.buttonContainer}>
      <AppButton title="First time"color="lightGrey" onPress={() => navigation.navigate('FirstTimeLogin')} />
      
        <AppButton title="Login"color="lightGrey" onPress={() => navigation.navigate('Login')} />
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
    width: 125,
    height: 125
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
