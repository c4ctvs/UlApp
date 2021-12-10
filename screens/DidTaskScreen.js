import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, FlatList } from 'react-native';
import { sendZasobki } from '../components/Firebase/firebase';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function DidTaskScreen({ route, navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });
const screen = route.params;

const [isLoading, setIsLoading] = useState(true);
const { width, height } = Dimensions.get('window');

let handleOnSend = async () =>{
    console.log(screen.week, screen.day)
    sendZasobki(screen.week, screen.day, 3).then( () => {
    navigation.navigate('Home')
  })
 
}   



return(
    <SafeAreaView style={{   justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
       <View style={{ width, height, justifyContent: 'center',alignItems: 'center',flex: 1, backgroundColor: ColorsB.background }} >
            <Text style={styles.greenTitle}> Świetnie! </Text>
            <Text style={styles.subtitle}> Zyskałeś trzy dodatkowe zasobki!</Text>
            <NextBackButton  title={"   POWRÓT NA STRONĘ GŁÓWNĄ   "} style={styles.buttons} onPress={()=>handleOnSend()}/>
            
      </View>
    </SafeAreaView>
    )
} 


const styles = EStyleSheet.create({
  buttons:{
    position:'absolute',
    bottom:20,

    flexDirection:'row',
    justifyContent:'space-between',
    
  },
    subtitle: {
      fontSize: '1rem',
      color: 'white',
      textAlign: 'center',
      marginHorizontal:'2%',
      fontFamily:'sans-serif-light',
      padding:'10%',

    },
  });