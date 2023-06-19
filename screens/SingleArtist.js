import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

export default function SingleArtist({ route }) {
  const [artist, setArtist] = useState(null);
  const [artistImage, setArtistImage] = useState(null);
  const [artistBio, setArtistBio] = useState('');
  const [songPreview, setSongPreview] = useState('');

  useEffect(() => {
    if (route && route.params && route.params.artist) {
      const { artist } = route.params;
      setArtist(artist);
      fetchArtistImage(artist);
      fetchArtistDetails(artist);
    }
  }, [route]);

  const fetchArtistDetails = (artist) => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artist.name)}&api_key=374a714c7bfd22d920627a094682d88d&format=json`)
      .then((res) => res.json())
      .then(({ artist: artistInfo }) => {
        const artistBio = artistInfo.bio.content;
        setArtistBio(artistBio);
      })
      .catch((error) => {
        console.log("Error while fetching artist details:", error);
      })
  }

  const fetchArtistImage = (artist) => {
    fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(artist.name)}`)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.length > 0) {
          const imageUrl = data[0].picture_big;
          console.log("Image URL:", imageUrl);
          setArtistImage(imageUrl);
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const fetchSongPreview = (artist) => {
    fetch(`https://api.deezer.com/search/track?q=${encodeURIComponent(artist.name)}`)
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.length > 0) {
          const songPreviewUrl = data[0].preview;
          console.log("Song Preview URL:", songPreviewUrl);
          setSongPreview(songPreviewUrl);
        } else {
          setSongPreview(null);
        }
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  const handleFavoriteArtist = () => {
    const apiUrl = 'https://api.example.com/favorite-artist';
    const payload = {
      favoriteArtist: artist.id
    };

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (res.ok) {
          console.log('Added to favorite');
        } else {
          console.log('Failed to add to favorite');
        }
      })
      .catch(error => {
        console.error('Error while favoriting the artist:', error);
      })
  }

  useEffect(() => {
    if (artist) {
      fetchSongPreview(artist);
    }
  }, [artist]);


  return (
    <ScrollView>
      <View>
        {artist && (
          <View>
            <Text>{artist.name}</Text>
            {artistImage ? (
              <Image
                source={{ uri: artistImage }}
                style={{ width: 200, height: 200 }}
              />
            ) : (
              <Text>Image not available</Text>
            )}
            {songPreview ? (
              <Video
                source={{ uri: songPreview }}
                style={{ width: 200, height: 40 }}
                useNativeControls
              />
            ) : (
              <Text>Song preview not available</Text>
            )}
            <TouchableOpacity onPress={handleFavoriteArtist}>
              <Text>Favorite Artist</Text>
            </TouchableOpacity>
            <Text>{artistBio}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );  
}