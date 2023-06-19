import React from "react";
import { View, Image, Text } from "react-native";
import gigCardStyles from "../styles/gigCardStyles";


const GigCard = ({ gig }) => {
  return (
    <View style={gigCardStyles.container}>
      <Image source={{ uri: gig.imageURL }} style={gigCardStyles.image} />
      <View style={gigCardStyles.textContainer}>
        <Text style={gigCardStyles.artistText}>{gig.artist}</Text>
        <Text style={gigCardStyles.venueText}>{gig.venue}</Text>
        <Text style={gigCardStyles.timeText}>{gig.time}</Text>
      </View>
    </View>
  );
};

export default GigCard;