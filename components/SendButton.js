import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../utils/colors';

export default function SendButton({ title, onPress, disabled, color}) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });

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

const styles = EStyleSheet.create({
  button: {
    marginVertical: '4%',
    borderRadius: '2rem',
    marginTop:'10%',
    justifyContent: 'center',
    textAlign:'center',
    alignItems: 'center',
    padding: '10%',
    width: '100%'
  
  },
  disabled: {
    color: Colors.mediumGrey,
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign:'center',
  },
  buttonText: {
    color: Colors.black,
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign:'center',
  },
});
