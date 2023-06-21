import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../backend/firebase-config";

const SendMessage = ({ user, convRef, recipient, setMessages }) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage === "") {
      alert("Please enter a correct message!");
      return;
    }

    try {
      const newMessage = {
        content: inputMessage,
        senderId: user.username,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(convRef, "messages"), newMessage);
      setInputMessage("");

      setMessages((prevMessages) => [...prevMessages, newMessage]); // Update the messages state with the new message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type your message..."
        onChangeText={(text) => setInputMessage(text)}
        value={inputMessage}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default SendMessage;
