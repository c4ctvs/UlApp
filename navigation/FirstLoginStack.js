import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();



export default function FirstLoginStack() {
  return (
    <Stack.Navigator initialRouteName="first" headerMode="none">
      

    </Stack.Navigator>

  );
}


