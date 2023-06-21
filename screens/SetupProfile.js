import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import UserContext from "../context/user-context";
import { firebase, storage, auth } from "../backend/firebase-config";
import styles from "../styles/styles";

export const db = getFirestore();



export default function SetupProfile({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: null,
    city: "",
    bio: "",
  });

  const { user } = useContext(UserContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dob;
    setFormData((prevState) => ({
      ...prevState,
      dob: currentDate ? currentDate.getTime() : null,
    }));
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const handlePhotoUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission denied",
          "You need to grant camera roll permission to upload a photo."
        );
        return;
      }
  
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log("pickerResult:", pickerResult);
  
      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const selectedAssetUri = pickerResult.assets[0].uri;
        console.log("selectedAssetUri:", selectedAssetUri);
  
        const imageBlob = await getBlobFroUri(selectedAssetUri);
        console.log("imageBlob:", imageBlob);
  
        if (imageBlob) {
          const fileRef = ref(storage, `profilePictures/${Date.now()}`);
          console.log("fileRef:", fileRef);
  
          await uploadBytes(fileRef, imageBlob);
          console.log("File uploaded successfully");
  
          const fileUrl = await getDownloadURL(fileRef);
          console.log("fileUrl:", fileUrl);
  
          await updateDoc(doc(db, "users", user.user.uid), {
            avatarIMG: fileUrl,
          });
          console.log("User document updated successfully");
        }
      }
    } catch (error) {
      console.log("Error in handlePhotoUpload:", error.message);
    }
  };
  


  // Collection reference
  const colRef = collection(db, "users");

  // Real-time collection data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(colRef, {
        ...formData,
        created_at: serverTimestamp(),
        "fav-artists": [],
        uid: user.user.uid,
      });

      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        dob: new Date(),
        city: "",
        bio: "",
      });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Setup Form Here</Text>
        <Button title="Upload Photo" onPress={handlePhotoUpload} />
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
        <View>
          <Button title="Select Date of Birth" onPress={showDatepicker} />
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={formData.dob ? new Date(formData.dob) : new Date()} // Convert timestamp to Date object
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}
