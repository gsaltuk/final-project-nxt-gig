import { View, Text } from 'react-native';
import { useContext, useState, useEffect } from "react";
import styles from '../styles/styles';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import UserContext from '../context/user-context';
import { db } from './SetupProfile';

const Message = ({ message, messageUid }) => {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("uid", "==", messageUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        console.log(userData.firstName, "IN MESSAGE");
        setFirstName(userData.firstName);
      });
    });

    return () => unsubscribe();
  }, [messageUid]);

  return (
    <View>
      <Text>{firstName}</Text>
      <Text styles={styles.messagesText}>{message.text}</Text>
    </View>
  );
}

export default Message;

  