import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import {
  getFirestore,
  query,
  where,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SingleArtist({ route, navigation }) {
  const [artist, setArtist] = useState(null);
  const [artistImage, setArtistImage] = useState(null);
  const [artistBio, setArtistBio] = useState("");
  const [songPreview, setSongPreview] = useState("");
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
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
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid === user.currentUser.uid) {
            setUserProfileInfo({ id: doc.id, ...userData });
          }
        });
      },
      (error) => {
        console.error("Error getting user profile:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (artist) {
      fetchSongPreview(artist);
    }
  }, [artist]);

  const fetchArtistDetails = (artist) => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artist.name
      )}&api_key=374a714c7bfd22d920627a094682d88d&format=json`
    )
      .then((res) => res.json())
      .then(({ artist: artistInfo }) => {
        if (artistInfo && artistInfo.bio && artistInfo.bio.content) {
          const artistBio = artistInfo.bio.content;
          const paragraphs = artistBio.split("\n\n");
          const firstTwoParagraphs = paragraphs.slice(0, 2);
          const result = firstTwoParagraphs.join("\n\n");
          console.log(result);
          setArtistBio(result);
        } else {
          console.log("No artist bio available");
          setArtistBio("");
        }
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
        if (data && data.length > 0) {
          const imageUrl = data[0].picture_big;
          console.log("Image URL:", imageUrl);
          setArtistImage(imageUrl);
        } else {
          console.log("No artist image available");
          setArtistImage(null);
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

  const handleFavoriteArtist = async () => {
    try {
      if (userProfileInfo) {
        const favoriteArtists = userProfileInfo["fav-artists"];
        const isAlreadyFavorite = favoriteArtists.includes(artist.name);

        if (isAlreadyFavorite) {
          const updatedFavoriteArtists = favoriteArtists.filter(
            (favArtist) => favArtist !== artist.name
          );

          const docRef = doc(db, "users", userProfileInfo.id);
          await updateDoc(docRef, {
            "fav-artists": updatedFavoriteArtists,
          });

          setIsFavorite(false);
    
        } else {
          const docRef = doc(db, "users", userProfileInfo.id);
          await updateDoc(docRef, {
            "fav-artists": [...favoriteArtists, artist.name],
          });

          setIsFavorite(true);
    
        }
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
    const fetchUserProfile = async () => {
      if (user.currentUser) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", user.currentUser.uid)
        );
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserProfileInfo({ id: querySnapshot.docs[0].id, ...userData });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user, db]);

  useEffect(() => {
    setIsFavorite(
      userProfileInfo &&
        userProfileInfo["fav-artists"] &&
        userProfileInfo["fav-artists"].includes(artist.name)
    );
  }, [userProfileInfo, artist]);

  return (
    <>
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-left" size={30} color="white" />
      </TouchableOpacity>
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
                  shouldPlay={isPlaying}
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
                    color="white"
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
              style={[
                styles.addToFavoritesButton,
                isFavorite
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#fc038c" },
              ]}
            >
              <Text
                style={[
                  styles.addToFavoritesButtonText,
                  isFavorite ? { color: "black" } : { color: "white" },
                ]}
              >
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Text>
            </TouchableOpacity>
            <ScrollView>
            <Text style={styles.artistBio}>{artistBio}</Text>
            </ScrollView>
          </View>
        )}
      </View>
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", 
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  buttonContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#eee",
    width: 330,
    height: 40,
  },
  text: {
    textAlign: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fc038c",
    textAlign: 'center',
    zIndex: 100,
    maxWidth: '100%',
    alignSelf: 'center',
    marginTop: 450,
    position: 'absolute'
  },
  artistImage: {
    width: "130%",
    height: undefined,
    aspectRatio: 1, 
    marginBottom: 10,
    marginTop: 20
  },
  songPreview: {
    width: 500,
    height: 40,
    marginBottom: 5,
    marginTop: -5,
  },
  songPreviewText: {
    marginBottom: 10,
  },
  addToFavoritesButton: {
    backgroundColor: "#fc038c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: -80,
  },
  addToFavoritesButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  artistBio: {
    marginBottom: 20,
    color: 'white',
    maxWidth: 400,
    textAlign: 'center',
    alignSelf: 'center' ,
    marginTop: 10
  },
  artistContainer: {
    marginTop: 60,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    padding: 10,
    marginTop: 50,
    marginLeft: 10,
  },
});

