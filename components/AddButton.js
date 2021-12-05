import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/colors';

export default function AddButton({onPress}) {

    return(
      <TouchableOpacity
      style={[styles.button, { backgroundColor: 'white' }]}
      onPress={onPress}

    >
      <Text style={styles.text}><MaterialCommunityIcons name="plus" size={25}/></Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,  
    padding:15,
    color:'black',  
    position:'absolute',
    left:'4%',
    bottom:'5%'
  },
  text:{
    fontSize:40,

  }
});
