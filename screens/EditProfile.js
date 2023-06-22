import {
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { db } from "./SetupProfile";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import UserContext from "../context/user-context";

import Icon from "react-native-vector-icons/FontAwesome";

export default function EditProfile({ navigation }) {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const [userInput, setUserInput] = useState({});
  const { user, currentUid } = useContext(UserContext);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("uid", "==", currentUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setUserProfileInfo(userData);
        setUserInput(userData);
      });
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (field, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", userProfileInfo.id);
      await updateDoc(docRef, {
        bio: userInput.bio,
        city: userInput.city,
      });
      navigation.goBack();

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.text}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={userInput.city}
            onChangeText={(value) => handleInputChange("city", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Bio"
            value={userInput.bio}
            onChangeText={(value) => handleInputChange("bio", value)}
          />
        
        <TouchableOpacity onPress={handleEditSubmit} style={styles.button}>
        <Text style={styles.button}>SUBMIT</Text>
      </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fc038c",
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white'
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 10,
    marginTop: 50,
    marginLeft: 10,
  },
});
