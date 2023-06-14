import React, { useState } from "react";
import { Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import { firebase } from "../backend/firebase-config";
import styles from "../styles/styles";
import ImagePicker from "react-native-image-picker";



export default function SetupProfile() {
    const [formData, setFormData] = useState({
        profilePhoto: '',
        username: '',
        firstName: '',
        lastName: '',
        dob: '',
        city: '',
        bio: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);

const handleInputChange = (field, value) => {
    setFormData(prevState => ({
        ...prevState,
        [field]: value
    }))
}

const handleImageUpload = () => {
    const options = {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        storageOptions: {
            path: 'images',
            cameraRoll: true,
            waitUntilSaved: true,
        }
    }
    ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
            console.log("User cancelled image picker");
        } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
        } else {
            setSelectedImage(response.uri);
        }
    });
}

const getCurrentDateTime = () => {
    const now = new Date();
    return now.toUTCString();
}

const handleSubmit = async () => {
    try {
        const UID = "1jGxMQ2QypAGOdcryibr";
        const userRef = firebase.database().ref("users");
        const newUserRef = userRef.push();
        await newUserRef.set({
            UID,
            bio: formData.bio,
            city: formData.city,
            created_at: getCurrentDateTime(),
            dob: "November 8, 1985 at 12:00:00 AM UTC",
            "first-name": formData.firstName,
            "last-name": formData.lastName,
            username: formData.username,
        })
    } catch (error) {
        console,log('Error submitting form:', error)
    }
};


return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <View style={styles.container}>
    <Text style={styles.text}>Setup Form Here</Text>
    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
    <Button title="Upload Photo" onPress={handleImageUpload} />
        <TextInput
        style={styles.input}
        placeholder="username"
        value={formData.username}
        onChangeText={value => handleInputChange('username', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={value => handleInputChange('firstName', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={value => handleInputChange('lastName', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={formData.dob}
        onChangeText={value => handleInputChange('dob', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={value => handleInputChange('city', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="Bio"
        value={formData.bio}
        onChangeText={value => handleInputChange('bio', value)}
        />
        <Button title="Submit" onPress={handleSubmit} />
    </View>
    </KeyboardAvoidingView>
)
}