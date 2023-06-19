import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import React, { useState, useEffect, useRef, useContext } from "react";

import styles from "../styles/styles";
import { getAuth } from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "@firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";
import UserContext from "../context/user-context";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { currentUid } = useContext(UserContext)
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("created_at"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <ScrollView styles={styles.container}>
      {messages.map((message) => (
        <Message key={message.id} messageUid={message.uid} message={message} />
      ))}
      <SendMessage />
    </ScrollView>
  );
};

export default Conversation;
