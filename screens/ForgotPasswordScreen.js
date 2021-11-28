import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { passwordReset } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Wprowadź poprawny adres email.')
    .required('Podany email nie istnieje')
});

export default function ForgotPasswordScreen({ navigation }) {
  useStatusBar('light-content');

  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      await passwordReset(email);
      navigation.navigate('Welcome');
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <Form
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handlePasswordReset(values)}
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
        <FormButton title="Wyślij link resetujący" color="white"/>
        {<FormErrorMessage error={customError} visible={true} />}
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
  
});
