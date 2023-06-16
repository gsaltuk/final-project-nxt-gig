import React from "react";
import { View, Image, Text } from "react-native";

const GigCard = ({ gig }) => {
  return (
    <View>
      <Image src={gig.imageURL} style={{ width: 150, height: 150 }} />
      <Text>{gig.artist}</Text>
      <Text>{gig.venue}</Text>
      <Text>{gig.time}</Text>
    </View>
  );
};

export default GigCard;