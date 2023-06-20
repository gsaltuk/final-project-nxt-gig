import React, { useState, useContext } from "react";
import { View } from "react-native";
import GigSearch from "./GigSearch";
import GigList from "./GigList";
import UserContext from "../context/user-context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gigs, setGigs] = useState([]);
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const handleSearch = (searchTerm) => {
    const apiKey = "miJUGIkkQU6QXFaNLCD4rFk2Q0ZaGxVA";
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&locale=*&startDateTime=2023-05-24T00:01:00Z&endDateTime=2023-05-24T23:59:00Z&city=${searchTerm}&countryCode=GB`;
    setSearchTerm(searchTerm);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        const fetchedGigs = data._embedded?.events || [];
        const formattedGigs = fetchedGigs.map((gig) => {
          return {
            artist: gig.name,
            venue: gig._embedded.venues[0].name,
            time: gig.dates.start.localTime,
            imageURL: gig.images[0].url,
            id: gig.id,
            ticket: gig.url,
          };
        });
        setGigs(formattedGigs);
      })
      .catch((error) => {
        console.error("Error fetching gigs:", error);
        setGigs([]);
      });
  };

  const handleGigsToday = () => {
    const apiKey = "miJUGIkkQU6QXFaNLCD4rFk2Q0ZaGxVA";
    const currentDate = new Date().toISOString().split("T")[0];
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&locale=*&startDateTime=${currentDate}T00:01:00Z&endDateTime=${currentDate}T23:59:00Z&city=${searchTerm}&countryCode=GB`;
    console.log(url, "url");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const fetchedGigs = data._embedded.events || [];
        const formattedGigs = fetchedGigs.map((gig) => {
          return {
            artist: gig.name,
            venue: gig._embedded.venues[0].name,
            time: gig.dates.start.localTime,
            imageURL: gig.images[0].url,
            id: gig.id,
            ticket: gig.url,
          };
        });
        setGigs(formattedGigs);
      })
      .catch((error) => {
        console.error("Error fetching gigs:", error);
        setGigs([]);
      });
  };

  const handleGigsTomorrow = () => {
    const apiKey = "miJUGIkkQU6QXFaNLCD4rFk2Q0ZaGxVA";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}&locale=*&startDateTime=${tomorrowDate}T00:01:00Z&endDateTime=${tomorrowDate}T23:59:00Z&city=${searchTerm}&countryCode=GB`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const fetchedGigs = data._embedded.events || [];
        const formattedGigs = fetchedGigs.map((gig) => {
          return {
            artist: gig.name,
            venue: gig._embedded.venues[0].name,
            time: gig.dates.start.localTime,
            imageURL: gig.images[0].url,
            id: gig.id,
            ticket: gig.url,
          };
        });
        setGigs(formattedGigs);
      })
      .catch((error) => {
        console.error("Error fetching gigs:", error);
        setGigs([]);
      });
  };

  const handleGetTickets = (gig) => {
    if (!gig.ticket) {
      console.log("No ticket information available for this gig");
      return;
    }

    navigation.navigate("GetTickets", { gig });
  };

  return (
    <View>
      <GigSearch
        onSearch={handleSearch}
        onGigsToday={handleGigsToday}
        onGigsTomorrow={handleGigsTomorrow}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      <GigList gigs={gigs} onGetTickets={handleGetTickets} />
    </View>
  );
};

export default Home;
