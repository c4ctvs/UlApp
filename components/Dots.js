import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { absoluteFill } from 'react-native-extended-stylesheet';


export default function Dots({howMany, current}) {
let dots = []


let j = 0;
    for(let i = 0; i<howMany; i++){
        j+=10;
        if(i == current){
            dots.push(<Text style={{color:'white', marginLeft:1+j}}>{'\u2B24'}</Text>)
        }
        else{
            dots.push(<Text style={{color:'black',marginLeft:1+j}}>{'\u2B24'}</Text>)

        
        }       
    }   
    return  (<FlatList
    data={dots}
    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
  />)
}
        
const styles = StyleSheet.create({

      text:{
        fontSize:16,
        color:'black',
      },
});
