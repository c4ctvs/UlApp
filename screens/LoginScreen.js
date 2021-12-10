import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, Dimensions } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';
import Spinner from '../components/Spinner';

const win = Dimensions.get('window');
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Wprowadź adres email')
    .email('Wprowadź prawidłowy adres email')
    .label('Email'),
  password: Yup.string()
    .required('Wprowadź hasło')
    .min(6, 'Hasło musi mieć conajmniej 6 znaków')
    .label('Password')
});

export default function LoginScreen({ navigation }) {
  useStatusBar('light-content');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;
    try {

      await loginWithEmail(email, password);
      setIsLoading(true)
      console.log('zaloogowano')

      } catch (error) {
      setLoginError(error.message);
    }
  }

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <SafeView style={styles.container}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
       <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        
        color="#fff"
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Form
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnLogin(values)}
      >
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Wprowadź email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
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
        <FormButton title={'Zaloguj'} color={'white'} />
        {<FormErrorMessage error={loginError} visible={true} />}
      </Form>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordButtonText}>Przypomnij hasło</Text>
        </TouchableOpacity>
      </View>
     
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.background
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center'
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
