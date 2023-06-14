import * as React from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from './screens/Welcome';
import LoginForm from './screens/Login';
import SignUpForm from './screens/SignUp';
import SetupProfile from './screens/SetupProfile';

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = React.useState("")

  return (
    <NavigationContainer>
   <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
    <Stack.Screen name="Login" component={LoginForm}></Stack.Screen>
    <Stack.Screen name="Signup Form" component={SignUpForm} user={user} setUser={setUser}></Stack.Screen>
    <Stack.Screen name="SetupProfile" component={SetupProfile}></Stack.Screen>
   </Stack.Navigator>
    </NavigationContainer>
  );
}
