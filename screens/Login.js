import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user-context";
import styles from "../styles/styles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm({ navigation }) {
  const { user, setUser, setCurrentUid } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authInstance = getAuth();

  useEffect(() => {
    authInstance.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        navigation.navigate("Home");
      }
    });
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(authInstance, email, password)
      .then((result) => {
        // If we need user information such as email, photo url or number ... we can use result.user.
        setUser(result.user);
        setCurrentUid(result.user.uid)
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage) {
          alert("invalid email or password");
        }
      });
    //navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email..."
          //value=''
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password..."
          //value=''

          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
