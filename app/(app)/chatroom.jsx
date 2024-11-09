import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const chatroom = () => {
    const param= useLocalSearchParams();
    console.log('param' , param);
  return (
    <View className="flex-1 bg-white" >
      <StatusBar style="light" />
      <Text>chatroom</Text>
    <Text>{param.username}</Text>
    </View>
  )
}

export default chatroom