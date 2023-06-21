import { Text, TouchableOpacity, Button, View, StyleSheet, Image } from "react-native";
import React from "react";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.welcomeContainer}>
      <Image
          source={require('../assets/nxt-gig-logo.png')}
          style={styles.image}
        />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup-Form")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 75,
    paddingVertical: 7,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    width: 120,
    textAlign: 'center'
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
  }
});
