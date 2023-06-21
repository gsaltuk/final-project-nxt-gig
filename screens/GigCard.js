import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import gigCardStyles from "../styles/gigCardStyles";

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

export default GigCard;