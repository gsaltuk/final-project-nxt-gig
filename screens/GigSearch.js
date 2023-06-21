import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
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

const stylesHome = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    paddingHorizontal: 8,
    color: 'white',
    marginLeft: 8,
    borderRadius: 4,
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  todayButton: {
    backgroundColor: "black",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  todayButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tomorrowButton: {
    backgroundColor: "black",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  tomorrowButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default GigSearch;
