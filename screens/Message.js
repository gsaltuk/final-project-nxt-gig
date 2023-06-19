import { View, Text, useContext  } from 'react-native'
import React from 'react'
import styles from '../styles/styles'
import UserContext from "../context/user-context";

const Message = ({message}) => {
  // const { user } = useContext(UserContext);
  // console.log("in message", user)
  return (
    <View >
      <Text>{message.name}</Text>
      <Text styles={styles.messagesText}>{message.text}</Text>
    </View>
  )
}

export default Message


  