import React, { useState } from 'react';
import { StyleSheet, Modal, View, Image, Alert, Dimensions } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';
import Spinner from '../components/Spinner';



const win = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Wprowadź poprawny email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Hasło musi mieć conajmniej 6 znaków')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Hasła muszą się zgadzać')
    .required('Potwierdź hasło')
});

export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { email, password } = values;
    try {
      setIsLoading(true)
      await registerWithEmail(email, password);
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  
  if (isLoading) {
    return <Spinner />;
  }

  return (

   
    <SafeView style={styles.container}>
           <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <View style={{width:'90%', left:'5%', marginTop:30}}>
      <Form
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
      >
    
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Wprowadż email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Wprowadź hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
      
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Potwierdź hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
      
        />
        <FormButton title={'Zarejestruj'} color="white"/>
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>

      </View>
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
    padding:0,
    marginTop:160,
    alignSelf:'center',
    opacity:0.5,
    position:'absolute',
    width: win.width,
    height: win.height/2,
  },
  
});
