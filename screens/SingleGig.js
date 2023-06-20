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
        <Image source={{ uri: gig.imageURL }} style={styles.image} />
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
      <Text style={styles.text}>Artist: {gig.artist}</Text>
      <Text style={styles.text}>Venue: {gig.venue}</Text>
      <Text style={styles.text}>City: {gig.city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SingleGig;
