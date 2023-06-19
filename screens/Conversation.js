
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  
} from "react-native";

import React, { useState, useEffect, useRef } from "react";

import styles from "../styles/styles";
import { getAuth } from "firebase/auth";
import {firebase} from '../backend/firebase-config'
import { collection, getFirestore, onSnapshot, query , orderBy} from "@firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";


const Conversation = () => {

  const [messages, setMessages]=useState([]);
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  const scroll = useRef()
  
  useEffect (()=>{

    const q= query( collection(db, "messages"),orderBy('created_at'))
    const unsybscribe = onSnapshot (q, (querySnapshot)=>{
        let messages=[]
        querySnapshot.forEach((doc)=>{
          messages.push({...doc.data(), id: doc.id})
        })
        setMessages(messages)
    })
    return ()=> unsybscribe()
  },[])
return ( 
  <View styles={styles.container}>

    {
    messages &&  messages.map((message)=> <Message key={message.id} message={message}/>)
    }
    
    <SendMessage />
    

  </View>
)
}

export default Conversation;
