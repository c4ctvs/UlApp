import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Image, Dimensions, Alert } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout, getEmail } from '../components/Firebase/firebase';
import MenuAppButton from '../components/MenuAppButton';
import Spinner from '../components/Spinner';
import { NavigationContainer } from '@react-navigation/native';
const win = Dimensions.get('window');

export default function SettingsScreen({navigation}) {
  const [isLoading, setIsLoading] = useState(true)
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const handlePasswordChange = () =>{
    const currentPass = Alert.alert('Please enter current password');
  }
  const [email, setEmail] = useState()

  useEffect(() => {
      const email = async () => {
          let newDoc = await getEmail()
          setEmail(newDoc)
          setIsLoading(false)
      }
      email()
  })
  
if (isLoading) {
  return <Spinner />;
}
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Zalogowany jako: {email}</Text> 
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <MenuAppButton title="Wyloguj się" style={styles.logoutButton} onPress={handleSignOut} />
        <MenuAppButton title="Zmień haslo" style={styles.logoutButton} onPress={() =>handlePasswordChange()}/>
        <MenuAppButton title="Zmień wyzwalacze" style={styles.logoutButton} onPress={()=> navigation.navigate("Wyzwalacz")}/>
        

       
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
    marginTop:40
},
logo: {
  alignSelf:'center',
  width: win.width/1.2,
  height: win.height/2.4,
},

});
