import React, { useState } from "react";
import { Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import { firebase } from "../backend/firebase-config";
import styles from "../styles/styles";
import { getFirestore, collection, addDoc } from "firebase/firestore";



export default function SetupProfile({navigation}) {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        dob: '',
        city: '',
        bio: ''
    });



    // Init services
    const db = getFirestore();
    

    // collection ref
    const colRef = collection(db, 'users');


    // real-time collection data
    const handleSubmit = (e) => {
        e.preventDefault()
        addDoc(colRef, formData)
        .then(() => {
            setFormData({
                username: '',
                firstName: '',
                lastName: '',
                dob: '',
                city: '',
                bio: ''
            })
            navigation.navigate("Home")
        })
    }


     // setup new profile
  
        const handleInputChange = (field, value) => {
            setFormData(prevState => ({
                ...prevState,
                [field]: value
            }))
        }


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
                onChangeText={value => handleInputChange('username', value)}
                required
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