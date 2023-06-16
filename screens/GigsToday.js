import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const GigsToday = ({ onGigsToday }) => {
  return (
    <TouchableOpacity onPress={onGigsToday}>
      <Text>Gigs Today</Text>
    </TouchableOpacity>
  );
};

export default GigsToday;