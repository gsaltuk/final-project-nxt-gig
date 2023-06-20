import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";

const GetTickets = () => {
  const route = useRoute();
  const { gig } = route.params || {};
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await fetch(gig.ticket);
        const data = await response.json();
        setTicketData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
        setLoading(false);
      }
    };

    if (gig.ticket) {
      fetchTicketData();
    } else {
      setLoading(false);
    }
  }, [gig.ticket]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text>Get Tickets</Text>
      <Text>Ticket URL: {gig.url}</Text>
      {/* Display ticket information */}
      {ticketData && (
        <Text>Ticket Data: {JSON.stringify(ticketData, null, 2)}</Text>
      )}
    </View>
  );
};

export default GetTickets;
