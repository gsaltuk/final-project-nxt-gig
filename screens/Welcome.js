import { Text, TouchableOpacity, Button, View } from "react-native";
import React from "react";
import styles from "../styles/styles";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.text}>Welcome Page</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
        <Text style={styles.button}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup-Form")} style={styles.button}>
        <Text style={styles.button}>SIGNUP</Text>
      </TouchableOpacity>
    </View>
  );
}
