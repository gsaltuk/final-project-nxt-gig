import * as React from 'react'
import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserContext from './context/user-context';

import Welcome from './screens/Welcome';
import LoginForm from './screens/Login';
import SignUpForm from './screens/SignUp';
import SetupProfile from './screens/SetupProfile';
import Home from './screens/Home';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';


const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState("")

  return (
    <UserContext.Provider value={{user, setUser}}>
    <NavigationContainer>
   <Stack.Navigator>
    <Stack.Screen name="SetupProfile" component={SetupProfile}></Stack.Screen>
    <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
    <Stack.Screen name="Signup Form" component={SignUpForm}></Stack.Screen>
   <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
    <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
    <Stack.Screen name="Signup Form" component={SignUpForm}></Stack.Screen>
    <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
    <Stack.Screen name="Login" component={LoginForm}></Stack.Screen>
   <Stack.Screen name="Home" component={Home}></Stack.Screen>
   </Stack.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  );
}
