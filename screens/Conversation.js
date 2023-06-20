import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../styles/styles";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../backend/firebase-config";

const Conversation = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { recipient, user } = route.params;
  console.log(messages)

  useEffect(() => {
    if(!user) return
    const fetchMessages = async () => {
      try {
        const conversationsRef = collection(db, "conversations");
        const q = query(
          conversationsRef,
          where("participants", "array-contains", user.username),

        );

        const conversationsSnapshot = await getDocs(q);

        for (const conversationDoc of conversationsSnapshot.docs) {
          const messagesRef = collection(conversationDoc.ref, "messages");
          const messagesSnapshot = await getDocs(messagesRef);

          const conversationMessages = messagesSnapshot.docs.map((doc) =>
            doc.data()
          );

          setMessages((prevMessages) => [
            ...prevMessages,
            ...conversationMessages,
          ]);
          
        }
      } catch (error) {
        console.error("Error retrieving messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <View>
      
      <SendMessage />
    </View>
  );
};

export default Conversation;
