import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout, firstLogin } from '../components/Firebase/firebase';
import { getNamesOfCategories } from '../components/Firebase/firebase';
import AppButton from '../components/AppButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  useStatusBar('dark-content');
  let categories = [];
 

  const [data, setData] = useState([])

  const [checkFirstLogin, set] = useState()
  useEffect(() =>{
    let fl
    let check = async () => {
      fl = await firstLogin()
      set(fl)
    }
    check()
    if(checkFirstLogin == true){
      navigation.navigate("Pretest")
    }
  })

  useEffect(() => {
    const getData = async () => {
      let new_data = await getNamesOfCategories()
      setData(new_data)
  
      
    }
    getData()

  }, [])


  const Tab = createBottomTabNavigator();
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
  }

});


