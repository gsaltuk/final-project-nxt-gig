import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
    color: 'white'
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
    marginLeft: 8
  },
  todayButton: {
    backgroundColor: "#fc038c",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
    marginLeft: -1,
  },
  todayButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tomorrowButton: {
    backgroundColor: "#fc038c",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    
  },
  tomorrowButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default GigsTodayAndTomorrow;