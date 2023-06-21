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
import * as FileSystem from 'expo-file-system';
import DateTimePicker from "@react-native-community/datetimepicker";

export const db = getFirestore();
const storage = getStorage();

export default function SetupProfile({ navigation }) {
  const [response, setResponse] = useState(null); // Store the selected image
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: null, // Initialize as null
    city: "",
    bio: "",
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { user } = useContext(UserContext);

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
    setShowDatePicker(true); // Show the date picker
  };

  // collection ref
  const colRef = collection(db, "users");

  // real-time collection data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (response) {
      try {
        const storageRef = ref(storage, `profilePhotos/${user.user.uid}`);
        await uploadString(storageRef, response, "base64"); // Upload the base64 string
  
        const downloadURL = await getDownloadURL(storageRef);
  
        await addDoc(colRef, {
          ...formData,
          created_at: serverTimestamp(),
          "fav-artists": [],
          uid: user.user.uid,
          photoURL: downloadURL,
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
    } else {
      console.log("No photo selected");
    }
  };
  


  const handlePhotoUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      console.log(result);

      
      if (!result.canceled) {
        const base64Image = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        setResponse(base64Image); // Store the selected photo as a base64 string
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
