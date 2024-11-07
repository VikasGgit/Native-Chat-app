import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const StartUpPage= () => {
  return (
    <View  className=" flex-1 justify-center items-center" >
      <ActivityIndicator size='large' color="red"></ActivityIndicator>
    </View>
  )
}

export default StartUpPage