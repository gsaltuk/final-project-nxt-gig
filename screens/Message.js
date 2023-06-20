import { View, Text } from "react-native";
import { useContext, useState, useEffect } from "react";
import styles from "../styles/messagingStyle";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import UserContext from "../context/user-context";
import { db } from "./SetupProfile";

const Message = ({ message }) => {
  return (
    <View>
      <Text>{message.senderId}</Text>
      <Text>{message.content}</Text>
    </View>
  );
};

export default Message;
