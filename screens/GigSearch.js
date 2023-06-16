import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { stylesHome } from '../styles/styleHomePage';
import GigsToday from './GigsToday';
import GigsTomorrow from './GigsTomorrow';

const GigSearch = ({ onSearch, onGigsToday, onGigsTomorrow, setSearchTerm, searchTerm }) => {
  
  return (
    <View style={stylesHome.container}>
      <View style={stylesHome.searchContainer}>
        <TextInput
          placeholder="Enter city"
          style={stylesHome.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

      </View>
      <GigsToday onGigsToday={onGigsToday} />
      <GigsTomorrow onGigsTomorrow={onGigsTomorrow} />
    </View>
  );
};

export default GigSearch;
