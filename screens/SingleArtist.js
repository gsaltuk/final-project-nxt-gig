import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import styles from "../styles/styles";


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
    const userId = 'uid';

    const documentUrl = `https://console.firebase.google.com/project/nxt-gig/firestore/data/users/${userId}`;
    const payload = {
      artistId: artist.id
    };

    fetch(documentUrl, {
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
      <View style={styles.container}>
        {artist && (
          <View>
            <Text style={styles.artistName}>{artist.name}</Text>
            {artistImage ? (
              <Image
                source={{ uri: artistImage }}
                style={styles.artistImage}
                useNativeControls
              />
            ) : (
              <Text style={styles.songPreviewText}>Song preview not available</Text>
            )}
            {songPreview ? (
              <Video
                source={{ uri: songPreview }}
                shouldPlay
                isLooping
                style={styles.songPreview}
              />
            ) : (
              <Text style={styles.songPreviewText}>No song preview available</Text>
            )}
            <TouchableOpacity onPress={handleFavoriteArtist} style={styles.addToFavoritesButton}>
              <Text style={styles.addToFavoritesButtonText}>Add to favorites</Text>
            </TouchableOpacity>
            <Text style={styles.artistBio}>{artistBio}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );    
}
