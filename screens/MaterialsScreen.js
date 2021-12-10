import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { getDays, getAvaiability, getZasobki } from '../components/Firebase/firebase';
import Spinner from '../components/Spinner';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function MaterialsScreen({navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });

  const [days, setDays] = useState([])
  const [buttonData, getButtonData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [zasobki, setZasobki] = useState(0);
   
useEffect(() => {
  const get = async () => {
      let data = await getAvaiability(0)
      getButtonData(data)
      setIsLoading(false)
   
  }
  get()
}, [])

let i=0

useEffect(() => {
  const getDaystoDisplay = async () => {
      let newDay = await getDays(JSON.stringify(0))
      setDays(newDay)
  }
  getDaystoDisplay()
}, [])

useEffect(() => {
  const updateZasobki = async () => {
    let zas = await getZasobki()
    setZasobki(zas)
}
updateZasobki()
})

const handleOnPress = (topic, id) => {

  navigation.navigate("TaskDetails", {topic:topic, id:id})
}
 
if (isLoading) {
  return <Spinner />;
} 
  return (
    <SafeView style={styles.container}>
        <Text style={styles.header}>Twoje wykonane zadania:</Text>
        {   

          days.map((data) => {
            console.log(data)
          if(buttonData[i].done == true){
          i=i+1
        
              return(    
             <View>
                 {data.cat ?<Text style={styles.title}>{data.cat}</Text> : <></>}
              <TouchableOpacity disabled={false}style={styles.appButtonContainer} onPress={()=>handleOnPress(data.topicId, data.name)}>   
              
              <Text style={styles.subtitleDone}> Dzień {data.name}</Text>
              </TouchableOpacity>   
              </View> 
              )
          }
          else{
            i=i+1
          }
        
          }

          )

          }
          <Text style={styles.header}>Ilość zasobków: {zasobki}</Text>
          <Text style={styles.header}>Materiały do odblokowania:</Text>     
       
    </SafeView>
    
    );
}

const styles = EStyleSheet.create({
  subtitleDone: {
    fontSize: '1.1rem',
    color: 'white',
    textAlign: 'center',
    marginHorizontal:'5%',
    padding:'1%',
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
  header:{
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:'1.1rem',
    color:Colors.lightGrey,
    marginVertical:'2%'
},
title:{
  fontSize:'1rem',
  textAlign:'center',
  color: '#369e40',
},

});
