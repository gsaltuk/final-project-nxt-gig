import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { stylesHome } from '../styles/styleHomePage';

const GigsTomorrow = ({ onGigsTomorrow }) => {
  return (
    <TouchableOpacity onPress={onGigsTomorrow} style={stylesHome.tomorrowButton}>
      <Text style={stylesHome.tomorrowButtonText}>Gigs Tomorrow</Text>
    </TouchableOpacity>
  );
};

export default GigsTomorrow;