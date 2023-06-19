import { View, Text } from 'react-native'
import { useContext, useState, useEffect } from "react";
import styles from '../styles/styles'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import UserContext from '../context/user-context';
import { db } from './SetupProfile';


const Message = ({message}) => {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const { currentUid } = useContext(UserContext);


  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, where("uid", "==", currentUid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        setUserProfileInfo(userData);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <View >
      <Text>{userProfileInfo.firstName}</Text>
      <Text styles={styles.messagesText}>{message.text}</Text>
    </View>
  )
}

export default Message


  