import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity, Dimensions } from 'react-native';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { getUserData } from '../components/Firebase/firebase';
import Spinner from '../components/Spinner';
const win = Dimensions.get('window');
const categories = ['KONTRAKTOWANIE', 'POCZUCIE WŁASNEJ SKUTECZNOŚCI', 'EMOCJE', 'SYTUACJE TRUDNE']
export default function MaterialsScreen({navigation, route}) {
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    const get = async () => {
        let data = await getUserData(route.params.topic, route.params.id)
        setData(data)   
        console.log(data)
        setIsLoading(false)
    }
    get()
  }, [])

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <SafeView style={styles.container}>
       <Text style={styles.weekTitle}>DZIEŃ {route.params.id}</Text> 
        <Text style={styles.weekSubtitle}>{categories[route.params.topic]}</Text> 
  

        <View style={{height:win.height*0.75, alignContent:'center', top:'13%'}}>
            <Text style={styles.subtitle}>Twoje notatki:</Text>
            <Text style={styles.text}>{data[route.params.id].data}</Text>
            <Text style={styles.subtitle2}>Twoje napięcie:</Text>
            <Text style={styles.text}>{data[route.params.id].value}</Text>
            </View> 

  
   
   
    </SafeView>
    
    );
}

const styles = StyleSheet.create({
  subtitleDone: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily:'sans-serif-light',


  },
  container: {
    backgroundColor: Colors.background,

  },
  weekTitle: {
    position:'absolute',
     top: 40,
     left: 20,
     fontSize: 16,
     color: '#369e40',
     textAlign: 'left',
     fontFamily:'sans-serif'
 
   },
   weekSubtitle: {
     position:'absolute',
     top: '7%',
     left: 20,
     fontSize: 18,
 
     color: '#369e40',
     textAlign: 'left',
     fontFamily:'sans-serif-medium'
 
   },
   subtitle: {
    marginTop:20,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
  subtitle2: {
    marginTop:80,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
});
