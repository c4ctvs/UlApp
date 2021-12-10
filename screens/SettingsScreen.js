import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, Image, Dimensions, Alert } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout, getEmail, passwordReset } from '../components/Firebase/firebase';
import MenuAppButton from '../components/MenuAppButton';
import Spinner from '../components/Spinner';
import Dialog from "react-native-dialog";
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import EStyleSheet from 'react-native-extended-stylesheet';
const win = Dimensions.get('window');

export default function SettingsScreen({navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });


  const [isLoading, setIsLoading] = useState(true)
  const [customError, setCustomError] = useState('');
  const [email, setEmail] = useState()
  const [dialogVisible, setDialogVisible] = useState(false)


  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const handlePasswordChange = () =>{
   setDialogVisible(true)
  }

  async function sendLink(email) {
   console.log(email)

    try {
      await passwordReset(email);
      Alert.alert("Link resetujący hasło został wysłany na twój adres e-mail")
      navigation.navigate('Home');
    } catch (error) {
      setCustomError(error.message);
    }
  }
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
        <MenuAppButton title="Zresetuj haslo" style={styles.logoutButton} onPress={() =>handlePasswordChange()}/>
        <MenuAppButton title="Zmień wyzwalacze" style={styles.logoutButton} onPress={()=> navigation.navigate("Wyzwalacz")}/>
        

        <View>
          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Reset hasła</Dialog.Title>
            <Dialog.Description>
              Czy na pewno chcesz zresetować hasło?
            </Dialog.Description>
            <Dialog.Button label="Nie" onPress={()=>setDialogVisible(false)}/>
            <Dialog.Button label="Tak" onPress={()=>{setDialogVisible(false), sendLink(email)}}/>
          </Dialog.Container>
          {<FormErrorMessage error={customError} visible={true} />}
       </View>
    </SafeView>
    
    );
}

const styles = EStyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  header:{
    alignItems: 'center',
    fontSize:'1.1rem',
    color:Colors.lightGrey,
    marginTop:'7%',
    maxWidth:win.width*3/4
},
logo: {
  alignSelf:'center',
  width: win.width/1.2,
  height: win.height/2.4,
},

});
