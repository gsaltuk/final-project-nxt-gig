import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user-context";
import { db } from "./SetupProfile";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Profile({ navigation }) {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const { user, currentUid } = useContext(UserContext);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("uid", "==", currentUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setUserProfileInfo(userData);
      });
    });

    return () => unsubscribe();
  }, []);

  function handleEdit() {
    navigation.navigate("EditProfile");
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://media.gq-magazine.co.uk/photos/5f3ce952c796369abd4bf877/16:9/pass/20200819-monet-01.jpg/" }}
        style={styles.profileImage}
      />
      <View >
        <Text style={styles.usernameText}>{userProfileInfo.username}</Text>
        <Text style={styles.text}>{userProfileInfo["firstName"]} {userProfileInfo["lastName"]}</Text>
        <Text style={styles.cityText}>{userProfileInfo.city}</Text>
        <Text style={styles.bioText}>{userProfileInfo.bio}</Text>
      </View>
      <TouchableOpacity onPress={handleEdit} style={styles.button}>
        <Text style={styles.button}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white", 
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  buttonContainer: {
    width: "%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#eee",
    width: 330,
    height: 40,
  },
  text: {
    textAlign: "center",
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: "uppercase",
    
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  artistImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  songPreview: {
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  songPreviewText: {
    marginBottom: 10,
  },
  addToFavoritesButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToFavoritesButtonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  artistBio: {
    marginBottom: 20,
  },
  artistContainer: {
    marginTop: 75,
  },
  usernameText: {
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: "uppercase",
    color: "#fc038c",
    textAlign: 'center'
  },
  bioText: {
    color: 'white',
    textAlign: "center",
    fontSize: 20,
  
  },
  cityText: {
    textTransform: "uppercase",
    color: 'white',
    textAlign: "center",
    fontSize: 25
  }
});
