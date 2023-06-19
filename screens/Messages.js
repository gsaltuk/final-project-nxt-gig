import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from '@react-navigation/native';

const Messages = () => {
  return (
    <View>
      
      <Link to={{screen: "Conversation"}}>conversation1</Link>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({})