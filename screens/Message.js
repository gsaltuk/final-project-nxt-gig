import { View, Text, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/user-context";
import styles from '../styles/messagingStyle';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./SetupProfile";

const Message = ({ message, user, recipient }) => {
  const isSender = message.senderId === user.username;
  const isRecipient = message.senderId === recipient;

  const containerStyle = isSender
    ? [styles.messageContainer, styles.senderContainer]
    : styles.messageContainer;

  const textContainerStyle = isSender
    ? styles.senderTextContainer
    : [styles.recipientTextContainer, isRecipient && styles.recipientTextContainerWithMargin];

  const textStyle = isSender ? styles.senderText : styles.recipientText;

  return (
    <View style={containerStyle} key={message.messageId}>
      <View style={textContainerStyle}>
        <Text style={textStyle}>{message.senderId.toUpperCase()}</Text>
        <Text style={styles.messageContent}>{message.content}</Text>
      </View>

  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  senderContainer: {
    alignSelf: "flex-end",
  },
  senderTextContainer: {
    alignItems: "flex-end",
  },
  recipientTextContainer: {
    alignItems: "flex-start",
  },
  recipientTextContainerWithMargin: {
    marginLeft: -22, // Adjust the value as needed
  },
  senderText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  recipientText: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  messageContent: {
    marginTop: 5,
  },
});

export default Message;
