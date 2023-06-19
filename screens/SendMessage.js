import {TouchableOpacity, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/styles'
import { getAuth } from "firebase/auth";
import {firebase} from '../backend/firebase-config'
import { collection, getFirestore, onSnapshot, query , orderBy, addDoc, serverTimestamp} from "@firebase/firestore";

const SendMessage = () => {

    

    const auth = getAuth(firebase);
  const db = getFirestore(firebase);
    const [inputMessage, setInputMessage]= useState (' ')
console.log("in the sendMessage",auth)

    const handleSendMessage = ()=>{
        if(inputMessage===''){
            alert("please enter a correct message!")
            return
        }
        const {uid, displayName}= auth.currentUser;
        addDoc(collection(db, 'messages'),{
            text: inputMessage,
            name: displayName,
            uid,
            created_at: serverTimestamp()
        })
        
        
    }

  return (
    <>
    <View style={styles.buttonContainer}>
    <TextInput
      placeholder="type your msg..."
      onChangeText={(text) => setInputMessage(text)}
      style={styles.input}
    />
    
  </View>

  <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
      <Text style={styles.button}>Send</Text>
    </TouchableOpacity>
  </View> 
    </>
    
  )
}

export default SendMessage