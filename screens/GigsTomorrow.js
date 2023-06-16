import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const GigsTomorrow = ({ onGigsTomorrow }) => {
  return (
    <TouchableOpacity onPress={onGigsTomorrow}>
      <Text>Gigs Tomorrow</Text>
    </TouchableOpacity>
  );
};

export default GigsTomorrow;