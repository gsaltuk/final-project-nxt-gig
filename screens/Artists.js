import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image } from "react-native";
import { firebase } from "../backend/firebase-config";
import styles from "../styles/styles";
import axios from 'axios';




export default function Artists() {
    const [searchQuery, setSearchQuery] = useState('');
    const [artists, setArtists] = useState([]);


        useEffect(() => {
            fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=374a714c7bfd22d920627a094682d88d&format=json&limit=9`)
            .then((res) => res.json())
            .then((artists) => {
                console.log(artists.artists.artist[1].image[0])
            })
            .catch((error) => {
                console.log('Error occured', error);
            })
        }, [])

        useEffect(() => {
            fetch(`https://coverartarchive.org/release/b6e035f4-3ce9-331c-97df-83397230b0df/front`)
            .then(res => {
                return res.json()
            }).then((artist) => {
                console.log(artist)
            })
            .catch((error) => {
                console.log('Error occured', error);
            })
        }, [])
   

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <FlatList
            data={artists}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
};