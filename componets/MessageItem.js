import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { View, Text } from 'react-native';
import React from 'react';

export default function MessageItem({ message, currentUser }) {
  const isCurrentUser = currentUser === message?.userId;
  
  return (
    <View
      style={{
        
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
        marginBottom: 2,
        marginLeft: isCurrentUser ? 50 : 0,
        marginRight: isCurrentUser ? 0 : 50,
      }}
      className={`flex-row p-3 rounded-md border ${
        isCurrentUser ? 'bg-white border-neutral-200' : 'bg-indigo-100 border-indigo-300'
      }`}
    >
        
      <Text style={{ fontSize: hp(1.9) }}>{message?.text}</Text>
    </View>
  );
}
