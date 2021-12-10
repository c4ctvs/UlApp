import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, FlatList } from 'react-native';
import { getQuestions, findQuestion, changePassword } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import * as Yup from 'yup';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import Spinner from '../components/Spinner';

export default function ChangePasswordScreen({ route, navigation}) {

const screen = route.params;
const [error, setError] = useState('');
const { width, height } = Dimensions.get('window');
const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
  true
);  
const [passwordVisibility, setPasswordVisibility] = useState(true);
const [oldpasswordVisibility, setOldPasswordVisibility] = useState(true);
const [rightIcon, setRightIcon] = useState('eye');
const [isLoading, setIsLoading] = useState(false)
const [message, setMessage] = useState([])

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
    .required("Pole wymagane")
    .label('oldPassword'),
    newPassword: Yup.string()
      .required("Pole wymagane")
      .min(6, 'Hasło musi mieć conajmniej 6 znaków')
      .label('newPassword'),
    confirmPassword: Yup.string()
      .required("Pole wymagane")
      .oneOf([Yup.ref('newPassword')], 'Hasła muszą się zgadzać')
      .required('Potwierdź hasło')
  });
4  
const handleOnPress = async (values) =>{
  //  setIsLoading(true)
    setMessage(await changePassword(values))
    console.log(message)
}

if (isLoading) {
    return <Spinner />;
  }

function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }
  function handleOldPasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setOldPasswordVisibility(!oldpasswordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setOldPasswordVisibility(!oldpasswordVisibility);
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


return(
    <SafeAreaView style={{   justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
      <Form
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnPress(values)}
   
      >
    
       <Text style={styles.title}>Wprowadź swoje poprzednie hasło</Text>
       <View style={{width: width*3/4}}><FormField
          name="oldPassword"
          leftIcon="lock"
          placeholder="Wprowadź stare hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={oldpasswordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handleOldPasswordVisibility}
      
        /></View>
       <Text style={styles.title}>Wprowadź nowe hasło</Text>
       <View style={{width: width*3/4}}><FormField
          name="newPassword"
          leftIcon="lock"
          placeholder="Wprowadź nowe hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
      
        /></View>
       <Text style={styles.title}>Powtórz nowe hasło</Text>
       <View style={{width: width*3/4}}><FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Potwierdź hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
      
        /></View>
       {<FormErrorMessage error={error} visible={true} />}
        <View style={{top:100,width: width*2/4}}><FormButton title={'Zmień hasło'} color="white"/></View>
        </Form>
    </SafeAreaView>
    )
} 


const styles = StyleSheet.create({
  parent:{
    flexDirection:'row',
    justifyContent:'center',
    margin:100,
    padding:20,
    marginTop:50
  },
  sliderView:{
    marginTop:40,
    width:'75%',
    marginHorizontal:"15%"
  },
  buttons:{
    position:'absolute',
    bottom:20,

    flexDirection:'row',
    justifyContent:'space-between',
    
  },
    input: {
      height: 300,
      margin: 12,
      marginVertical:30,
      borderWidth: 1,
      padding: 10,
      backgroundColor: ColorsB.lightGrey
    },
    
    wyzwalaczbuttons:{
      width:'30%',

  },
  flatlist:{
    top:'10%',
    padding:0,
  },
  list:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center',

    fontFamily:'sans-serif-light',
    padding:10,

  },
    image: {
      width: 320,
      height: 100,
      marginVertical:140,
    },
    text: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 12
  
    },
    title: {
      fontSize: 18,
      padding:22,
      color: 'white',
      textAlign: 'center',
      fontFamily:'sans-serif-light'
  
    },
   
   greenTitle: {
      fontSize: 30,
      alignSelf:'center',
      color: '#369e40',
      textAlign: 'center',
      fontFamily:'sans-serif-medium',
      
 
    },
    subtitle: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:10,
      fontFamily:'sans-serif-light',
      padding:30,

    },
    subtitleIt: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginHorizontal:10,
      fontFamily:'sans-serif-light',
 
      fontStyle:'italic'
    },
    greenSubtitle: {
   
      fontSize: 16,
      color: '#369e40',
      textAlign: 'center',
      marginVertical:40,
      fontFamily:'sans-serif-medium',
      padding:30,
      backgroundColor: '#c2c2c2',
  
    },
    greenSubtitleIt: {
      fontSize: 16,
      color: '#369e40',
      textAlign: 'center',
      marginHorizontal:40,
      fontFamily:'sans-serif-medium',
      fontStyle:'italic'
  
    },
    summary: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginHorizontal:30,
        fontFamily:'sans-serif-light',
        marginTop:100,
         
      },
      hint: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
       
        fontFamily:'sans-serif-light',
        marginTop:20,
        padding:30,
        width:'75%',
        backgroundColor: '#3d7849',

         
      }
  });
