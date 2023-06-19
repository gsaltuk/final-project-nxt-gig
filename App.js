import * as React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserContext from "./context/user-context";

import Conversation from "./screens/Conversation";
import Welcome from "./screens/Welcome";
import LoginForm from "./screens/Login";
import SignUpForm from "./screens/SignUp";
import SetupProfile from "./screens/SetupProfile";
import NavBar from "./screens/NavBar";
import Artists from "./screens/Artists";
import Messages from "./screens/Messages";
import Profile from "./screens/Profile";
import SingleGig from "./screens/SingleGig";
import EditProfile from "./screens/EditProfile";


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("");
  const [currentUid, setCurrentUid] = useState("")


  return (

    <UserContext.Provider value={{ user, setUser, currentUid, setCurrentUid }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
          <Stack.Screen name="Login" component={LoginForm}></Stack.Screen>
          <Stack.Screen
            name="Signup-Form"
            component={SignUpForm}
          ></Stack.Screen>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={NavBar}
          ></Stack.Screen>
          <Stack.Screen name="SingleGig" component={SingleGig}></Stack.Screen>
          <Stack.Screen
            name="SetupProfile"
            component={SetupProfile}
          ></Stack.Screen>
        <Stack.Screen name="Conversation" component={Conversation}></Stack.Screen>
          <Stack.Screen name="Artists" component={Artists}></Stack.Screen>
          <Stack.Screen name="Messages" component={Messages}></Stack.Screen>
          <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
          <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>

    </UserContext.Provider>
  );
}
