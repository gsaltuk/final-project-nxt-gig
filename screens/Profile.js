import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/user-context";
import { db } from "./SetupProfile";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function Profile({ navigation }) {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const { user } = useContext(UserContext);
  const testuid = "1jGxMQ2QypAGOdcryibr";

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("UID", "==", testuid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setUserProfileInfo(userData);
      });
    });

    return () => unsubscribe();
  }, []);

function handleEdit() {
    navigation.navigate("EditProfile")
}

return (
    <View style={styles.container}>
      
        <Image
          source={{uri: "https://pluralsight.imgix.net/author/default.jpg"}}
          style={styles.profileImage}
        />
      
      <Text>{userProfileInfo.username}</Text>
      <Text>First Name: {userProfileInfo["first-name"]}</Text>
      <Text>Last Name: {userProfileInfo["last-name"]}</Text>
      <Text>City: {userProfileInfo.city}</Text>
      <Text>Bio: {userProfileInfo.bio}</Text>
      <TouchableOpacity onPress={handleEdit} style={styles.button}>
        <Text style={styles.button}>EDIT PROFILE</Text>
      </TouchableOpacity>
    </View>
  );
  
}
