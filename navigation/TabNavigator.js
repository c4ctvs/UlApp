
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppStack from "./AppStack";
import SettingsScreen from "../screens/SettingsScreen";
import MaterialsScreen from "../screens/MaterialsScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }}>

      <Tab.Screen name="Główna" component={AppStack} options={{
          tabBarLabel: 'Główna',
          tabBarInactiveTintColor:"#2b2b2b",
          tabBarActiveTintColor:"#106e0b",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={"#2b2b2b"} size={size} />
          ),
        }}/>
      <Tab.Screen name="Materiały" component={MaterialsScreen}  options={{
          tabBarLabel: 'Materiały',
          tabBarInactiveTintColor:"#2b2b2b",
          tabBarActiveTintColor:"#106e0b",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open" color={"#2b2b2b"} size={size} />
          ),
        }}/>   
      <Tab.Screen name="Ustawienia" component={SettingsScreen}  options={{
          tabBarLabel: 'Ustawienia',
          tabBarInactiveTintColor:"#2b2b2b",
          tabBarActiveTintColor:"#106e0b",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={"#2b2b2b"} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;