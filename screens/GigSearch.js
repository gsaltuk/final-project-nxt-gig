import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { stylesHome } from "../styles/styleHomePage";

const GigSearch = () => {
  return (
    <View style={stylesHome.container}>
      <View style={stylesHome.searchContainer}>
        <TextInput placeholder="Enter city" style={stylesHome.input} />
        <TouchableOpacity style={stylesHome.searchButton}>
          <Text style={stylesHome.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={stylesHome.todayButton}>
        <Text style={stylesHome.todayButtonText}>Gigs Today</Text>
      </TouchableOpacity>
      <TouchableOpacity style={stylesHome.tomorrowButton}>
        <Text style={stylesHome.tomorrowButtonText}>Gigs Tomorrow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GigSearch;
