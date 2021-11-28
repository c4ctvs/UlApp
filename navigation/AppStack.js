import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DescriptionScreen from '../screens/DescriptionScreen';
import FirstTime from '../screens/FirstTime';
import ChooseDayScreen from '../screens/ChooseDayScreen';
import StartActivityScreen from '../screens/StartActivityScreen';
import WyzwalaczScreen from '../screens/WyzwalaczScreen';
import Pretest from '../screens/PretestScreen'

const Stack = createStackNavigator();



export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="User" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Description" component={DescriptionScreen} />
      <Stack.Screen name="ChooseDayScreen" component={ChooseDayScreen} />
      <Stack.Screen name="StartActivity" component={StartActivityScreen} /> 
      <Stack.Screen name="Wyzwalacz" component={WyzwalaczScreen} />
      <Stack.Screen name="Pretest" component={Pretest} />
      <Stack.Screen name="FirstTime" component={FirstTime} />
    </Stack.Navigator>

  );
}


