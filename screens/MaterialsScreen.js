import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity } from 'react-native';
import useStatusBar from '../hooks/useStatusBar';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { logout } from '../components/Firebase/firebase';
import { getDays, getAvaiability } from '../components/Firebase/firebase';

export default function MaterialsScreen({navigation}) {

  const [days, setDays] = useState([])
  const [buttonData, getButtonData] = useState([])
  
   
useEffect(() => {
  const get = async () => {
      let data = await getAvaiability(0)
      getButtonData(data)
  }
  get()
}, [])

let i=0

useEffect(() => {
  const getDaystoDisplay = async () => {
      let newDay = await getDays(JSON.stringify(0))
      console.log("Day: " + newDay)
      setDays(newDay)
  }
  getDaystoDisplay()
}, [])


  
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Twoje wykonane zadania:</Text>
        {   

          days.map((data) => {
    
          if(buttonData[i].done == true){
          i=i+1
              return(    
              <TouchableOpacity disabled={true}style={styles.appButtonContainer}>   
              {data.cat ? <Text style={styles.title}> {data.cat} </Text> : <></>}
              <Text style={styles.subtitleDone}> Dzień {data.name}</Text>
              </TouchableOpacity>    
              )
          }
          else{
            i=i+1
          }
        
          }

          )

          }
          <Text style={styles.header}>Materiały do odblokowania:</Text>     
       
    </SafeView>
    
    );
}

const styles = StyleSheet.create({
  subtitleDone: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginHorizontal:30,
    fontFamily:'sans-serif-light',


  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {

    width: '30%',
  },
  menuButton:{
    margin:30,
    padding:20
  },
  buttons:{
    fontSize:12,
  },
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,
    color:Colors.lightGrey,
    marginVertical:10
},
title:{

  fontSize:18,
  textAlign:'center',
  color: '#369e40',
},

});
