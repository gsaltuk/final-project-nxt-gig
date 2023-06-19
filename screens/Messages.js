import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";
import useLoggedInUser from "../backend/firebase-auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  getFirestore,
} from "@firebase/firestore";
import { firebase } from "../backend/firebase-config";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const user = useLoggedInUser();
  const db = getFirestore(firebase);

  useEffect(() => {
    if (!user) return;

    const colRef = collection(db, "conversations");
    const q = query(
      colRef,
      where("participants", "array-contains", user.username)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedConversations = [];
      snapshot.forEach((doc) => {
        const conversationData = { id: doc.id, ...doc.data() };
        updatedConversations.push(conversationData);
      });
      setConversations(updatedConversations);
    });

    return () => unsubscribe();
  }, [db, user]);

  if (!user) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      {conversations.map((conversation) => {
        const otherUser = conversation.participants.find(
          (participant) => participant !== user.username
        );
        return (
          <Link
            to={{ screen: "Conversation", params: { recipient: otherUser, user: user } }}
            key={conversation.id}
          >
            <Text>{otherUser}</Text>
          </Link>
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({});
