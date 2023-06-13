import { Text, TouchableOpacity, View } from "react-native"
import React from "react"

export default function Welcome({ navigation }) {
return (
    <View>
    <Text>Welcome Page</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>LOGIN</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Signup Form')}>
        <Text>SIGNUP</Text>
    </TouchableOpacity>
    </View>
)
}