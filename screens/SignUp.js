import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button } from "react-native";
import styles from "../styles/styles";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import UserContext from "../context/user-context";


export default function SignUpForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useContext(UserContext)

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
          navigation.navigate("SetupProfile");
        }
      );
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  return (
    <View>
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
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
