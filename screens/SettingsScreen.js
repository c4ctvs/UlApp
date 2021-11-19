import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout, getEmail } from '../components/Firebase/firebase';
import settingsButton from  '../components/settingsButton';



export default function SettingsScreen({navigation}) {
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  const [email, setEmail] = useState()

  useEffect(() => {
      const email = async () => {
          let newDoc = await getEmail()
          setEmail(newDoc)
      }
      email()
  })
  
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Zalogowany jako: {email}</Text> 
        <settingsButton title="Wyloguj się" style={styles.logoutButton} onPress={handleSignOut} />
        <settingsButton title="Zmień haslo" style={styles.logoutButton} />
        <settingsButton title="Zmień wyzwalacze" style={styles.logoutButton} />
        
       
       
    </SafeView>
    
    );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  logoutButton: {
    padding:20,

  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  },
  header:{
    alignItems: 'center',
    fontSize:20,
    color:Colors.lightGrey,
    marginTop:100
},

});
