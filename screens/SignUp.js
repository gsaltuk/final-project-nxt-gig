import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "../styles/styles";
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
    <KeyboardAvoidingView style={styles.container}>
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
          <Text style={styles.button}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
