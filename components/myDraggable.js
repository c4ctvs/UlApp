import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';
import Draggable from 'react-native-draggable';

export default function myDraggable({text, onPress}) {
return(
    <Draggable x={50} y={50}>
    <View style={styles.draggable} >
    <Text style={styles.text}>{text} <TouchableOpacity onPress={onPress}><MaterialCommunityIcons name="close" size={12}></MaterialCommunityIcons></TouchableOpacity></Text>
    </View>
    </Draggable>
    )
}

const styles = StyleSheet.create({
    draggable:{
        borderColor:"white",
        borderRadius:10,
        padding:7,
        backgroundColor:'white'
      },
      text:{
        fontSize:16,
        color:'black',
      },
});
