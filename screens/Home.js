import React from 'react';
import { View } from 'react-native';
import GigSearch from './GigSearch'
import GigList from './GigList';

const Home= () => {
  return (
    <View>
      <GigSearch />
      <GigList />
    </View>
  );
};

export default Home;

