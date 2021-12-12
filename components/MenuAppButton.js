import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../utils/colors';

const win = Dimensions.get('window');
export default function MenuAppButton({ title, onPress, color = 'white' }) {
  EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!

  });

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  button: {
    marginVertical: '3%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    width:win.width*3/4
   
  },
  buttonText: {
    color: Colors.black,
    fontSize: '0.7rem',
    fontWeight: '600',
   
  }

});
