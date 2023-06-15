import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Artists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [searchedArtists, setSearchedArtists] = useState([]);
  const apiKey = '374a714c7bfd22d920627a094682d88d';

  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json&limit=9`)
      .then((res) => res.json())
      .then((response) => {
        const { artist } = response.artists;
        setArtists(artist);
      })
      .catch((error) => {
        console.log('Error occurred:', error);
      });
  }, []);

  const searchArtist = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchQuery}&api_key=${apiKey}&format=json&limit=3`)
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
          console.log('Error occurred:', error);
        });
    } else {
      setSearchedArtists([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json&limit=9`)
        .then((res) => res.json())
        .then((response) => {
          const { artist } = response.artists;
          setArtists(artist);
        })
        .catch((error) => {
          console.log('Error occurred:', error);
        });
    } else {
      setArtists([]);
    }
  }, [searchQuery]);

  return (
    <View>
      <TextInput
        placeholder="Search artist"
        value={searchQuery}
        onChangeText={(text) => searchArtist(text)}
      />
      {searchQuery.length === 0 && artists.map((artist) => (
        <Text key={artist.mbid}>{artist.name}</Text>
      ))}
      {searchQuery.length > 0 && searchedArtists.map((artist) => (
        <Text key={artist.mbid}>{artist.name}</Text>
      ))}
      {searchedArtists.length === 0 && artists.length === 0 && searchQuery.length === 0 && (
        <Text>No artists found</Text>
      )}
    </View>
  );
}
