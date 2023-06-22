import React, { useState, useContext } from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import UserContext from "../context/user-context";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUpForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setCurrentUid } = useContext(UserContext);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignup = async () => {
    try {
      const authInstance = getAuth(firebase);
      await createUserWithEmailAndPassword(authInstance, email, password).then(
        (userSignedUp) => {
          setUser(userSignedUp);
          setCurrentUid(userSignedUp.user.uid);
          navigation.navigate("SetupProfile");
        }
      );
    } catch (error) {
      console.log("Signup Error:", error);
    }
  };

  return (
    <View style={styles.signupContainer}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  signupContainer: {
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
    marginLeft: 10,
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
