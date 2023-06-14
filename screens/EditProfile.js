import { Text, View, KeyboardAvoidingView, TextInput, Button } from "react-native";
import { useState, useContext, useEffect } from "react";
import { db } from "./SetupProfile";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import UserContext from "../context/user-context";
import styles from "../styles/styles";

export default function EditProfile({navigation}) {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [userInput, setUserInput] = useState({});
  const { user } = useContext(UserContext);
  const testuid = "1jGxMQ2QypAGOdcryibr";

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("UID", "==", testuid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setUserProfileInfo(userData);
        setUserInput(userData)
      });
    });

    return () => unsubscribe();
  }, []);
  console.log(userInput)

  const handleInputChange = (field, value) => {
    setUserInput(prevState => ({
        ...prevState,
        [field]: value
    }))
}

const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", userProfileInfo.id);
      await updateDoc(docRef, {
        bio: userInput.bio,
        city: userInput.city,
      });
      navigation.navigate("Profile")

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <View style={styles.container}>
    <Text style={styles.text}>Edit Profile</Text>
        <TextInput
        style={styles.input}
        placeholder="City"
        value={userInput.city}
        onChangeText={value => handleInputChange('city', value)}
        />
        <TextInput
        style={styles.input}
        placeholder="Bio"
        value={userInput.bio}
        onChangeText={value => handleInputChange('bio', value)}
        />
        <Button title="Submit" onPress={handleEditSubmit} />
    </View>
    </KeyboardAvoidingView>
  );
}
