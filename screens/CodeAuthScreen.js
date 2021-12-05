import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Alert, Image, Dimensions } from 'react-native';
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

const win = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');



  async function checkCode(values, actions) {
    const { code } = values;
    let isValidated = await validateCode(code)
 
     if(isValidated){
        navigation.navigate("Register")
     }
     else
     Alert.alert("Wprowadzony kod jest niepoprawny.")
  }



  return (

   
    <SafeView style={styles.container}>
       <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <Form
        initialValues={{
          code :''
         
        }}
        onSubmit={values => checkCode(values)}
      >
      <View style={styles.field}>
        <FormField
          name="code"
          leftIcon="lock"
          placeholder="Wprowadź kod"
          autoCapitalize="none"
          autoCorrect={false}
          color={Colors.black}
          textContentType="name"
        />
        </View>
        <View style={{width:"90%", left:'5%'}}><FormButton title={'Sprawdź'} color="white"/></View>

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
    backgroundColor: Colors.background
    
  },
  emptyContainer:{
    display: 'none'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  logo: {

    marginTop:160,
    width: 400,
    height: 400,
    opacity:0.5,
    position:'absolute'
  },
  
  field:{
    marginTop:30,
    marginHorizontal:20
  }

});
