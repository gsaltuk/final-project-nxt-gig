import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { firebase } from "../backend/firebase-config";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import UserContext from "../context/user-context";

export const db = getFirestore();

export default function SetupProfile({ navigation }) {
  const [response, setResponse] = useState(null); // Store the selected image
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    city: "",
    bio: "",
  });

  const { user } = useContext(UserContext);

  // collection ref
  const colRef = collection(db, "users");

  // real-time collection data
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      ...formData,
      created_at: serverTimestamp(),
      "fav-artists": [],
      uid: user.user.uid,
    }).then(() => {
      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        dob: "",
        city: "",
        bio: "",
      });
      navigation.navigate("Home");
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.setupContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formData.username}
          onChangeText={(value) => handleInputChange("username", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={formData.dob}
          onChangeText={(value) => handleInputChange("dob", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(value) => handleInputChange("city", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Bio"
          value={formData.bio}
          onChangeText={(value) => handleInputChange("bio", value)}
        />
      </View>
      <View style={styles.button}>
      <TouchableOpacity  title="Submit" onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
    
        </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  setupContainer: {
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