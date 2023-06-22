
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRoute, Link, useNavigation } from "@react-navigation/native";
import { Linking, Alert } from "react-native";

import { firebase } from "../backend/firebase-config";
import {
  collection,
  query,
  doc,
  where,
  addDoc,
  onSnapshot,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import useLoggedInUser from "../backend/firebase-auth";
import Icon from "react-native-vector-icons/FontAwesome";
const db = getFirestore(firebase);


const SingleGig = () => {
  const [isFavouriteGig, setisFavouriteGig] = useState(false);
  const [interestedListId, setInterestedListId] = useState("");
  const [interestedUsers, setInterestedUsers] = useState([]);
  const loggedUser = useLoggedInUser();
  const loggedUserName = loggedUser?.username;

  const route = useRoute();
  const { gig } = route.params || {};
    console.log(gig, "gig");
  const navigation = useNavigation();


  useEffect(() => {
    if (!loggedUserName) return;

    const colRef = collection(db, "interested");
    const q = query(colRef, where("GIG_ID", "==", gig.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let hasData = false;
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data) {
          hasData = true;
          setInterestedListId(data.id);
          setInterestedUsers(data.USERS);
        }
      });

      if (!hasData) {
        addDoc(collection(db, "interested"), {
          GIG_ID: gig.id,
          USERS: [],
        });
      }
    });

    return () => unsubscribe();
  }, [gig.id, loggedUserName]);

  const handleFavouriteGig = async () => {
    try {
      const isAlreadyInterested = interestedUsers.includes(loggedUserName);
      if (isAlreadyInterested) {
        const updatedInterestedUsers = interestedUsers.filter(
          (interestedUser) => interestedUser !== loggedUserName
        );
        const interestedDocRef = doc(db, "interested", interestedListId);
        await updateDoc(interestedDocRef, {
          USERS: updatedInterestedUsers,
        });
        setisFavouriteGig(false);
        Alert.alert("Deleted from your favourites");
      } else {
        const interestedDocRef = doc(db, "interested", interestedListId);
        await updateDoc(interestedDocRef, {
          USERS: [...interestedUsers, loggedUserName],
        });
        setisFavouriteGig(true);
        Alert.alert("Added to your favourites");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: gig.imageURL }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleFavouriteGig}
            style={[
              styles.addFavouriteGig,
              isFavouriteGig
                ? { backgroundColor: "red" }
                : { backgroundColor: "#fc038c" },
            ]}
          >
            <Text style={styles.addFavouriteGig}>
              {isFavouriteGig ? "Remove from favourites" : "Add to favourites"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(`${gig.ticket}`);
            }}
          >
            <Text style={styles.buttonText}>Get Tickets</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.artistText}>{gig.artist}</Text>
        <Text style={styles.venueText}>{gig.venue}</Text>
      </View>
      <View>
        {interestedUsers.map((interestedUser) => (
          <Link
          to={{ screen: "Conversation", params: { recipient: interestedUser, user: loggedUserName } }}
          key={gig.id}



  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: gig.imageURL }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.artistText}>{gig.artist}</Text>
        <Text style={styles.venueText}>{gig.venue}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(`${gig.ticket}`);
          }}
        >
          <Text>{interestedUser}</Text>
        </Link>
          
        ))}
      </View>

    </>

    </View>

  );
};

const { height, width } = Dimensions.get("window");
const imageHeight = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 20,
  },
  imageContainer: {
    width: width,
    height: imageHeight,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1.78,
    marginTop: -20
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1.78,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    maxWidth: '90%'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fc038c",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  addFavouriteGig: {
    backgroundColor: "#fc038c",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  artistText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fc038c",
    marginBottom: 10,
    maxWidth: "80%",
    textAlign: "center",
  },
  venueText: {
    fontSize: 25,
    textTransform: "uppercase",
    color: "white",
    textAlign: "center",
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

export default SingleGig;
