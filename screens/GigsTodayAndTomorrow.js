import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { stylesHome } from '../styles/styleHomePage';

const GigsTodayAndTomorrow = ({ onGigsToday, onGigsTomorrow }) => {
  return (
    <View style={stylesHome.buttonContainer}>
      <TouchableOpacity onPress={onGigsToday} style={stylesHome.todayButton}>
        <Text style={stylesHome.todayButtonText}>Gigs Today</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGigsTomorrow} style={stylesHome.tomorrowButton}>
        <Text style={stylesHome.tomorrowButtonText}>Gigs Tomorrow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GigsTodayAndTomorrow;