import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const GigCard = ({ gig }) => {
  const navigation = useNavigation();

  const handleGigPress = () => {
    navigation.navigate('SingleGig', { gig: gig });
  };

  return (
    <TouchableOpacity onPress={handleGigPress}>
    <View style={gigCardStyles.container}>
      <Image source={{ uri: gig.imageURL }} style={gigCardStyles.image} />
      <View style={gigCardStyles.textContainer}>
        <Text style={gigCardStyles.artistText}>{gig.artist}</Text>
        <Text style={gigCardStyles.venueText}>{gig.venue}</Text>
        <Text style={gigCardStyles.timeText}>{gig.time}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const gigCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 16,
    marginTop: 12, 
    width: '90.5%',
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  artistText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: 'white'
  },
  venueText: {
    fontSize: 14,
    marginBottom: 4,
    color: 'white'
  },
  timeText: {
    fontSize: 14,
    color: 'white'
  },
});


export default GigCard;