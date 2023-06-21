import React from "react";
import { Text, ScrollView } from "react-native";
import GigCard from "./GigCard";
import { StyleSheet } from "react-native";

const GigList = ({ gigs }) => {
  return (
    <ScrollView style={styles.giglistContainer}>
      {gigs && gigs.length > 0 ? (
        gigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
      ) : (
        <Text>No gigs found</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  giglistContainer: {
    marginLeft: 8
    
  },
})

export default GigList;
