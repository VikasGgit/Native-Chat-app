import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { blurhash } from '../utils/common.js';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from 'expo-image';

const ChatItem = ({noBorder, item, router}) => {
  
  const openChatRoom=()=>{
    router.push({pathname:"/chatroom", params: item})
  }
    
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row items-center justify-between pb-2 mx-4 mb-2 ${noBorder ? "": "border-b border-neutral-400"} `}>
        {/* <Image 
          className="rounded-full"
          style={{
            height: hp(5),
            width: hp(5)
          }}
          source={{uri: item?.profileUrl}}
        /> */}
         <Image
        style={{ height:hp(5), aspectRatio:1, borderRadius:100 ,borderColor:"blue", borderWidth:1}}
        source={item.profileUrl}
        placeholder={{ blurhash }}
        transition={500}
      />
        
        {/* Name and time */}
        <View className="flex-1 pl-3">
            <View className="flex-row justify-between">
                <Text className="text-base font-semibold text-neutral-800">{item.username}</Text>
                <Text className="text-sm font-medium text-neutral-500">10:30 AM</Text>
            </View>
            <Text className="text-xs text-neutral-500">Last message here...</Text>
        </View>
    </TouchableOpacity>
  );
}

export default ChatItem;
