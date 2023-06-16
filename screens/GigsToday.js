import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { stylesHome } from '../styles/styleHomePage';

const GigsToday = ({ onGigsToday }) => {
  return (
    <TouchableOpacity onPress={onGigsToday} style={stylesHome.todayButton}>
      <Text style={stylesHome.todayButtonText}>Gigs Today</Text>
    </TouchableOpacity>
  );
};

export default GigsToday;