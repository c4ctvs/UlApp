import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import {firstLogin, isFirstLogin } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
import AppButton from '../components/AppButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Spinner from '../components/Spinner';

const win = Dimensions.get('window');

export default function HomeScreen({navigation}) {
  useStatusBar('dark-content');

 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [didLoginToday, setDidLoginToday] = useState(false)
  const [checkFirstLogin, set] = useState()

  useEffect(()=>{
    const getData = async () => {
      let new_data = await isFirstLogin()
      setDidLoginToday(new_data)
    }
    getData()
    console.log(didLoginToday)
    if(!didLoginToday){
      navigation.navigate("FLoginToday")
    }
  
  })

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

const styles = StyleSheet.create({
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


