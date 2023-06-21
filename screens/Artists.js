import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import defaultImage from "../assets/artwork-unavailable.png";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/styles";
import { stylesHome } from "../styles/styleHomePage";

export default function Artists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [artists, setArtists] = useState([]);
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [artistImages, setArtistImages] = useState({});
  const apiKey = "374a714c7bfd22d920627a094682d88d";
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json&limit=9`
    )
      .then((res) => res.json())
      .then((response) => {
        const { artist } = response.artists;
        setArtists(artist);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  }, []);

  const searchArtist = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchQuery}&api_key=${apiKey}&format=json&limit=3`
      )
        .then((res) => res.json())
        .then((response) => {
          const { artistmatches } = response.results;
          if (artistmatches.artist.length > 0) {
            setSearchedArtists(artistmatches.artist);
          } else {
            setSearchedArtists([]);
          }
        })
        .catch((error) => {
          console.log("Error occurred:", error);
        });
    } else {
      setSearchedArtists([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json&limit=9`
      )
        .then((res) => res.json())
        .then((response) => {
          const { artist } = response.artists;
          setArtists(artist);
        })
        .catch((error) => {
          console.log("Error occurred:", error);
        });
    } else {
      setArtists([]);
    }
  }, [searchQuery]);

  const getImage = (artist) => {
    if (artistImages[artist.name]) {
      return artistImages[artist.name];
    }

    fetch(`https://api.deezer.com/search/artist?q=${artist.name}`)
      .then((res) => res.json())
      .then(({ data }) => {
        const imageUrl = data[0].picture_big;
        setArtistImages((prevImages) => ({
          ...prevImages,
          [artist.name]: imageUrl,
        }));
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const renderArtistItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToSingleArtist(item)}>
      <View style={{ flex: 1, alignItems: "center", margin: 10 }}>
        <Text>{item.name}</Text>
        {/* <Link to={{screen: "SingleArtist"}}>Browse Artist</Link> */}
        <Image
          source={{ uri: getImage(item) }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
    </TouchableOpacity>
  );

  const navigateToSingleArtist = (artist) => {
    navigation.navigate("SingleArtist", { artist });
  };

  return (
    <View style={stylesHome.container}>
      <View style={stylesHome.searchContainer}>
      <TextInput
        placeholder="Search artist"
        value={searchQuery}
        style={stylesHome.input}
        onChangeText={(text) => searchArtist(text)}
      /></View>
      {searchQuery.length === 0 && (
        <FlatList
          data={artists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.mbid}
          numColumns={3}
        />
      )}
      {searchQuery.length > 0 && (
        <FlatList
          data={searchedArtists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.mbid}
          numColumns={3}
        />
      )}
      {searchedArtists.length === 0 &&
        artists.length === 0 &&
        searchQuery.length === 0 && <Text>No artists found</Text>}
    </View>
  );
}
