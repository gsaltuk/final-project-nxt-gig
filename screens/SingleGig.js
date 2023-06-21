import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

const SingleGig = () => {
  const route = useRoute();
  const { gig } = route.params || {};
  console.log(gig,'gig')
  const navigation = useNavigation();

  const handleGetTickets = () => {
    navigation.navigate("GetTickets", { gig });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: gig.imageURL }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Interested</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingTop: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
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
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
    marginBottom: 10,
  },
  venueText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "white",
  },
});

export default SingleGig;
