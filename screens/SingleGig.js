import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SingleGig = () => {
  const route = useRoute();
  const { gig } = route.params || {};
  console.log(gig, "gig");
  const navigation = useNavigation();

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
          <Text style={styles.buttonText}>Get Tickets</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: "bold",
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
