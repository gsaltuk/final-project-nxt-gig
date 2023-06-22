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
import Icon from "react-native-vector-icons/FontAwesome"; // Import the Icon component

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 10,
    marginTop: 50,
    marginLeft: 10
  },
  inputContainer: {
    marginTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
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
    color: "white",
    fontWeight: "bold",
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
