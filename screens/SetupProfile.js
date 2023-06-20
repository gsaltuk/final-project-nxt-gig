import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { firebase } from "../backend/firebase-config";
import styles from "../styles/styles";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import UserContext from "../context/user-context";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadString, getDownloadURL } from "@firebase/storage";

export const db = getFirestore();
const storage = getStorage();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload the photo to Firebase Storage
    if (response) {
      const storageRef = ref(storage, `profilePhotos/${user.user.uid}`);
      await uploadString(storageRef, response.uri, "data_url");
      const downloadURL = await getDownloadURL(storageRef);

      // Add the download URL to the user's profile data in Firestore
      addDoc(colRef, {
        ...formData,
        created_at: serverTimestamp(),
        "fav-artists": [],
        uid: user.user.uid,
        photoURL: downloadURL, // Add the photo URL to the document
      })
        .then(() => {
          setFormData({
            username: "",
            firstName: "",
            lastName: "",
            dob: "",
            city: "",
            bio: "",
          });
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      // Handle case where no photo was selected
      console.log("No photo selected");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handlePhotoUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setResponse(result);
      }
    } catch (error) {
      console.log('Error selecting photo:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Setup Form Here</Text>
        <Button title="Choose Photo" onPress={handlePhotoUpload} />
        {response && <Image source={{ uri: response.uri }} style={styles.image} />}
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
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}
