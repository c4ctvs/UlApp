import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import Draggable from 'react-native-draggable';

export default function myDraggable({text, onPress, colorid}) {
let x_;
let y_;
let colors=["#76c3cf", "#7c8fbf", "#aa7cbf", "#7cbf7c"]
return(
    <Draggable x={50} y={50}>
    <View style={{backgroundColor:colors[colorid],  borderColor:"white", borderRadius:10,padding:12,fontSize:10, maxWidth:'90%'}} >
    <Text style={styles.text}>{text} <TouchableOpacity onPress={onPress}><MaterialCommunityIcons name="close" size={12}></MaterialCommunityIcons></TouchableOpacity></Text>
    </View>
    </Draggable>
    )
}

const styles = StyleSheet.create({
  
      text:{
        fontSize:16,
        color:'black',
      },
});
