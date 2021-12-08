import React from 'react';
import { ActivityIndicator, ColorPropType, StyleSheet, Text } from 'react-native';

import SafeView from './SafeView';
import Colors from '../utils/colors';

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
      <Text style={{color:Colors.ghostWhite, fontSize:20, marginTop:20}}>Ładowanie...</Text>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.background
  }
});
