import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/styles";
import {
  getFirestore,
  query,
  where,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebase } from "../backend/firebase-config";

export default function SingleArtist({ route }) {
  const [artist, setArtist] = useState(null);
  const [artistImage, setArtistImage] = useState(null);
  const [artistBio, setArtistBio] = useState("");
  const [songPreview, setSongPreview] = useState("");
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const db = getFirestore();

  const user = getAuth(firebase);

  useEffect(() => {
    if (route && route.params && route.params.artist) {
      const { artist } = route.params;
      setArtist(artist);
      fetchArtistImage(artist);
      fetchArtistDetails(artist);
    }
  }, [route]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.uid === user.currentUser.uid) {
          setUserProfileInfo({ id: doc.id, ...userData });
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const fetchArtistDetails = (artist) => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artist.name
      )}&api_key=374a714c7bfd22d920627a094682d88d&format=json`
    )
      .then((res) => res.json())
      .then(({ artist: artistInfo }) => {
        const artistBio = artistInfo.bio.content;
        const paragraphs = artistBio.split("\n\n");
        const firstTwoParagraphs = paragraphs.slice(0, 2);
        const result = firstTwoParagraphs.join("\n\n");
        console.log(result);
        setArtistBio(result);
      })
      .catch((error) => {
        console.log("Error while fetching artist details:", error);
      });
  };

  const fetchArtistImage = (artist) => {
    fetch(
      `https://api.deezer.com/search/artist?q=${encodeURIComponent(
        artist.name
      )}`
    )
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
    fetch(
      `https://api.deezer.com/search/track?q=${encodeURIComponent(artist.name)}`
    )
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

  const handleFavoriteArtist = async (e) => {
    e.preventDefault();

    try {
      if (userProfileInfo) {
        const docRef = doc(db, "users", userProfileInfo.id);
        const userSnapshot = await updateDoc(docRef, {
          "fav-artists": [...userProfileInfo["fav-artists"], artist.name],
        });

        Alert.alert("Added to favorites!");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying((prev) => !prev);
  };

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
              <Text style={styles.songPreviewText}>
                Song preview not available
              </Text>
            )}
            {songPreview ? (
              <View>
                <Video
                  ref={videoRef}
                  source={{ uri: songPreview }}
                  shouldPlay={true}
                  isLooping
                  style={styles.songPreview}
                />
                <TouchableOpacity
                  onPress={handlePlayPause}
                  style={[
                    styles.playPauseButton,
                    { backgroundColor: "#000000" },
                  ]}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="#ffffff"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.songPreviewText}>
                No song preview available
              </Text>
            )}
            <TouchableOpacity
              onPress={handleFavoriteArtist}
              style={styles.addToFavoritesButton}
            >
              <Text style={styles.addToFavoritesButtonText}>
                Add to favorites
              </Text>
            </TouchableOpacity>
            <Text style={styles.artistBio}>{artistBio}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
