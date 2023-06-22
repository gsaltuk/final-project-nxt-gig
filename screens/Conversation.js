import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../styles/styles";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../backend/firebase-config";

const Conversation = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { recipient, user } = route.params;
  const [conversationRef, setConversationRef] = useState(null); //
console.log(messages)
console.log(user)
console.log(recipient)
  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const conversationsRef = collection(db, "conversations");
        const q = query(
          conversationsRef,
          where("participants", "array-contains", user.username?user.username:user)
        );

        const conversationsSnapshot = await getDocs(q);
        const allMessages = [];

        for (const conversationDoc of conversationsSnapshot.docs) {
          const participants = conversationDoc.data().participants;

          if (participants.includes(recipient)) {
            // Save the conversation reference
            setConversationRef(conversationDoc.ref);

            const messagesRef = collection(conversationDoc.ref, "messages");
            const messagesSnapshot = await getDocs(messagesRef);
            const conversationMessages = messagesSnapshot.docs.map((doc) =>
              doc.data()
            );

            allMessages.push(...conversationMessages);
          }
        }

        const sortedMessages = allMessages.sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error retrieving messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <View key={recipient} style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((message) => (
          <Message
            key={message.messageId}
            message={message}
            user={user}
            recipient={recipient}
          />
        ))}
      </ScrollView>
      <SendMessage user={user} convRef={conversationRef} recipient={recipient} setMessages={setMessages} />
    </View>
  );
};

export default Conversation;