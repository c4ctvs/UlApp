import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Text, TouchableOpacity, Dimensions } from 'react-native';
import SafeView from '../components/SafeView';
import Colors from '../utils/colors';
import { getUserData } from '../components/Firebase/firebase';
import Spinner from '../components/Spinner';
import EStyleSheet from 'react-native-extended-stylesheet';



const win = Dimensions.get('window');
const categories = ['KONTRAKTOWANIE', 'POCZUCIE WŁASNEJ SKUTECZNOŚCI', 'EMOCJE', 'SYTUACJE TRUDNE']
export default function MaterialsScreen({navigation, route}) {

  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });


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
            {data[route.params.id]?<Text style={styles.text}>{data[route.params.id].data}</Text>:data[route.params.id].data== ""? <Text style={styles.text}>Tego dnia nie wykonałeś żadnych notatek</Text>:<></>}
            <Text style={styles.subtitle2}>Twoje napięcie:</Text>
            {data[route.params.id]?<Text style={styles.text}>{data[route.params.id].value}</Text>:<></>}
            </View> 

  
   
   
    </SafeView>
    
    );
}

const styles = EStyleSheet.create({
  subtitleDone: {
    fontSize: '0.8rem',
    color: 'white',
    textAlign: 'center',
    fontFamily:'sans-serif-light',


  },
  container: {
    backgroundColor: Colors.background,

  },
  weekTitle: {
    position:'absolute',
    top: '5%',
     left: '5%',
     fontSize: '0.9rem',
          color: '#369e40',
     textAlign: 'left',
     fontFamily:'sans-serif'
 
   },
   weekSubtitle: {
     position:'absolute',
     top: '7%',
     left: '5%',
     fontSize: '1rem',

 
     color: '#369e40',
     textAlign: 'left',
     fontFamily:'sans-serif-medium'
 
   },
   subtitle: {
    marginTop:'5%',
    fontSize: '0.9rem',
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
  text: {
    fontSize: '0.8rem',
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
  subtitle2: {
    marginTop:'15%',
    fontSize: '0.9rem',
    color: 'white',
    textAlign: 'center',
    marginHorizontal:10,
    fontFamily:'sans-serif-light',

  },
});
