import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DescriptionScreen from '../screens/DescriptionScreen';

import ChooseDayScreen from '../screens/ChooseDayScreen';
import StartActivityScreen from '../screens/StartActivityScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();



export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="User" headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Description" component={DescriptionScreen} />

      <Stack.Screen name="ChooseDayScreen" component={ChooseDayScreen} />
      <Stack.Screen name="StartActivity" component={StartActivityScreen} />
          
    
    </Stack.Navigator>

  );
}


