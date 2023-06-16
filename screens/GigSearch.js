import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { stylesHome } from "../styles/styleHomePage";
import GigsTodayAndTomorrow from "./GigsTodayAndTomorrow";

const GigSearch = ({
  onSearch,
  onGigsToday,
  onGigsTomorrow,
  setSearchTerm,
  searchTerm,
}) => {
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
      <GigsTodayAndTomorrow
        onGigsToday={onGigsToday}
        onGigsTomorrow={onGigsTomorrow}
      />
    </View>
  );
};

export default GigSearch;
