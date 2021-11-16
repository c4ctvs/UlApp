import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Alert } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { validateCode } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';


export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');



  async function checkCode(values, actions) {
    const { code } = values;
    let isValidated = await validateCode(code)
    console.error("Is validated: " + isValidated)
     if(isValidated){
        navigation.navigate("Register")
     }
     Alert.alert("Bad code!😢")
  }



  return (

   
    <SafeView style={styles.container}>
   
      <Form
        initialValues={{
          code :''
         
        }}
        onSubmit={values => checkCode(values)}
      >
    
        <FormField
          name="code"
          leftIcon="lock"
          placeholder="Wprowadź kod"
          autoCapitalize="none"
          autoCorrect={false}
     
          textContentType="name"
        />
        <FormButton title={'Sprawdź'} />

      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
  
    </SafeView>
    
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.background
    
  },
  emptyContainer:{
    display: 'none'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  }
  
  

});
