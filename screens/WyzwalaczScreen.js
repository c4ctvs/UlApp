import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, StyleSheet, Button, Alert, Text, Dimensions, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../utils/colors';
import Draggable from 'react-native-draggable';
export default function StartActivity({ route, navigation}) {

const screen = route.params;
const { width, height } = Dimensions.get('window');
return (
    <View style={styles.container}>
    <View style={{ width, height}}>
        <Text style={{position:'absolute', top:'25%'}}>Osobiste</Text>
        <Draggable x={200} y={300} renderColor='red' renderText='B'/>
        <Draggable/>
       <Text style={{ borderBottomColor: '#3d7849',
                                   borderBottomWidth: 6,
                                   justifyContent:'center',
                                    marginTop:'100%'
                                   
                                   }}></Text> 
       <Text style={{position:'absolute', top:'75%'}}>Te drugie</Text>
    <Draggable x={50} y={50}>
        <Text>AAAAAA</Text>
    </Draggable>
    </View>
    </View>
);
    
}

const styles = StyleSheet.create({
    container: {
 
        backgroundColor: Colors.background
        
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
  