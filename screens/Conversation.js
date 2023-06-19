import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState, useEffect, useRef, useContext } from "react";
import {} from "@react-navigation/native";
import styles from "../styles/styles";
import { getAuth } from "firebase/auth";
import { firebase } from "../backend/firebase-config";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
  where,
} from "@firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";
import UserContext from "../context/user-context";
import { useRoute } from "@react-navigation/native";

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { currentUid } = useContext(UserContext);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);
  const route = useRoute();
  const recipient = String(route.params.recipient);
  const user = String(route.params.user.username);

  console.log("USERRRR", user.username, "RECIPPPP", recipient);

  useEffect(() => {
    if (!user || !recipient) return;
    const colRef = collection(db, "conversations");
    const q = query(
      colRef,
      where("participants", "array-contains", user),
      where("participants", "array-contains", recipient)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        console.log("IN CHAT", doc.data);
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
