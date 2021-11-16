import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../utils/colors';

export default function NextBackButton({ title, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    borderColor:Colors.lightGrey,
    borderWidth:1,
    marginTop:30,
    alignItems: 'center',
    padding: 15,
   
  },
  buttonText: {
    color: "#0cb300",
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    
  }
});
