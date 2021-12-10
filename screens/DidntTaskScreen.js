import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput, FlatList } from 'react-native';
import ColorsB from '../utils/colors.js'
import NextBackButton from '../components/NextBackButton';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function DidntTaskScreen({ route, navigation}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });
const screen = route.params;
const { width, height } = Dimensions.get('window');


let handleOnSend = async () =>{
    sendZasobki(screen.week, screen.day, 0).then( () => {
    navigation.navigate('Home')
  })
 




return(
    <SafeAreaView style={{   justifyContent: 'center',alignItems: 'center',flex: 1,  backgroundColor: ColorsB.background}}>
       <View style={{ width, height, justifyContent: 'center',alignItems: 'center',flex: 1, backgroundColor: ColorsB.background }} >
       <Text style={styles.subtitle}> Powróć do zagadnień o których czytałeś wczoraj.</Text>
            <Text style={styles.subtitle}> Spróbuj przeanalizować te kwestie.</Text>
            <NextBackButton  title={"   POWRÓT NA STRONĘ GŁÓWNĄ   "} style={styles.buttons} onPress={()=>handleOnSend()}/>
            
      </View>
    </SafeAreaView>
    )
} 
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
