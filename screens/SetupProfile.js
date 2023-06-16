import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
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
import DateTimePicker from "@react-native-community/datetimepicker";

export const db = getFirestore();

export default function SetupProfile({ navigation }) {
  const [formData, setFormData] = useState({
    username: "",
    "first-name": "",
    "last-name": "",
    dob: "",
    city: "",
    bio: "",
  });
  console.log(formData);
  const { user } = useContext(UserContext);
  const testuid = "1jGxMQ2QypAGOdcryibr";

  //Date Time Picker
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
    setFormData((prevState) => ({
      ...prevState,
      dob: currentDate,
    }));
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  // const hideDateTimePicker = () => {
  //     setShowPicker(false);
  // };

  // Init services

  // collection ref
  const colRef = collection(db, "users");

  // real-time collection data
  const handleSubmit = (e) => {
    e.preventDefault();

    // // Check if required fields are filled
    // const requiredFields = [
    //   "username",
    //   "first-name",
    //   "last-name",
    //   "dob",
    //   "city",
    //   "bio",
    // ];
    // const isFormValid = requiredFields.every(
    //   (field) => formData[field].trim() !== ""
    // );

    // if (!isFormValid) {
    //   alert("Please fill in all required fields");
    //   return;
    // }
    addDoc(colRef, {
      ...formData,
      created_at: serverTimestamp(),
      "fav-artists": [],
      uid: user.user.uid,
      dob: date,
    }).then(() => {
      setFormData({
        username: "",
        "first-name": "",
        "last-name": "",
        dob: "",
        city: "",
        bio: "",
      });
      navigation.navigate("Home");
    });
  };

  // setup new profile

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Setup Form Here</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={formData.username}
          onChangeText={(value) => handleInputChange("username", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={formData["first-name"]}
          onChangeText={(value) => handleInputChange("first-name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={formData["last-name"]}
          onChangeText={(value) => handleInputChange("last-name", value)}
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
        <Button title="Select Date of Birth" onPress={showDateTimePicker} />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            is24Hour="default"
            onChange={handleChange}
          />
        )}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
}
