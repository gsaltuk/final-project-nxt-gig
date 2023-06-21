import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import UserContext from "../context/user-context";
import { TouchableOpacity, KeyboardAvoidingView } from "react-native";

export default function SignUpForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser, setCurrentUid } = useContext(UserContext);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignup = async () => {
    try {
      const authInstance = getAuth();
      await createUserWithEmailAndPassword(authInstance, email, password).then(
        (userSignedUp) => {
          setUser(userSignedUp);
          setCurrentUid(userSignedUp.user.uid)
          navigation.navigate("SetupProfile");
        }
      );
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.signupContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
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
    backgroundColor: "#fc038c",
    paddingHorizontal: 75,
    paddingVertical: 7,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    width: 120,
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#EDEDED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#000000',
    width: 270, 
    height: 40, 
  }
});
