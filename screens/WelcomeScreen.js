import React from 'react';
import { View, StyleSheet, Text, Image, Alert, Dimensions } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';
import { checkIfUserIsLoggedIn } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
import EStyleSheet from 'react-native-extended-stylesheet';


const win = Dimensions.get('window');


export default function WelcomeScreen({ navigation }) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });

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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  logoContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center'
  },
  logo: {
    padding:0,
    marginTop:'15%',
    alignSelf:'center',
    position:'absolute',
    width: win.width,
    height: win.height/2,
  },
  
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    paddingVertical: '5%',
    color: Colors.lightGrey
  },
  buttonContainer: {
    padding: '5%',
    paddingBottom: '10%',
    width: '100%'
  }
});
