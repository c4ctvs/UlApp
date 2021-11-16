import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../utils/colors';

export default function AppButton({ title, onPress, disabled, color}) {
  if(disabled){
    return(
      <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
      disabled = {disabled}
    >
      <Text style={styles.disabled}>{title}</Text>
    </TouchableOpacity>
  )}
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
      disabled = {disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    borderRadius: 25,
    marginTop:30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  
  },
  disabled: {
    color: Colors.mediumGrey,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    
  },
  menuButton: {
    marginVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    padding: 15,
    width: '70%',
    margin:70,
    backgroundColor:Colors.lightGrey
  }
});
