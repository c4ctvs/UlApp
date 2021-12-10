import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import {firstLogin, isFirstLoginToday } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
import AppButton from '../components/AppButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from '../components/Spinner';
import EStyleSheet from 'react-native-extended-stylesheet';
const win = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });

  useStatusBar('dark-content');

 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [loginToday, setDidLoginToday] = useState(false)
  const [checkFirstLogin, set] = useState()

  useEffect(()=>{
    const getData = async () => {
      let new_data = await isFirstLoginToday(0)
      setDidLoginToday(new_data)
    }
    getData()
    console.log(loginToday)
   
    
  }, [])

  useEffect(() => {
    console.log(loginToday); //check the result here
    if(loginToday!=[99,99] && loginToday[0]!= undefined && loginToday[1]!= undefined){
      console.log(loginToday)
      navigation.navigate("FLoginToday", {'week':loginToday[0], 'day':loginToday[1]})
    }
  }, [loginToday])

  useEffect(() =>{
    let fl
    let check = async () => {
      fl = await firstLogin()
      set(fl)
    }
    check()
    if(checkFirstLogin == true){
      navigation.navigate("FirstTime")
    }
  })


  useEffect(() => {
    const getData = async () => {
      let new_data = await getNamesOfCategories()
      setIsLoading(false)
      setData(new_data)
    }
    getData()

  }, [])

  
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeView style={styles.container}>
   
      <View style={styles.menuButton}>
 
        {data.map((elem) => {
          return <AppButton title={elem.name} key={elem.id} disabled={elem.disabled} color="lightGrey" onPress={() => { navigation.navigate('Description', {
            screen: 'ChooseDayScreen',
            id:elem.id,
            })}}/>
        })}
      </View>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />
    </SafeView>
    
    );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  logoutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  },  
  logo: {
    padding:0,
    alignSelf:'center',
    position:'absolute',
    bottom:'2%',
    right:'2%',
    opacity:0.5,
    width: win.width/4,
    height: win.height/8,
  },

});


