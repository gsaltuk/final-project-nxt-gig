import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../backend/firebase-config";

export default function LoginForm({ navigation }) {
  const { setUser, setCurrentUid } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authInstance = getAuth(firebase);

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
        setCurrentUid(result.user.uid);
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
    <KeyboardAvoidingView style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          //value=''
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          //value=''

          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
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
    backgroundColor: "#EDEDED",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "#000000",
    width: 270,
    height: 40,
  },
});
