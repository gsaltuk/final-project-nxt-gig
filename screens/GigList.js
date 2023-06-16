import React from "react";
import { Text, ScrollView } from "react-native";
import GigCard from "./GigCard";

const GigList = ({ gigs }) => {
  return (
    <ScrollView>
      {gigs && gigs.length > 0 ? (
        gigs.map((gig) => <GigCard key={gig.id} gig={gig} />)
      ) : (
        <Text>No gigs found</Text>
      )}
    </ScrollView>
  );
};

export default GigList;
