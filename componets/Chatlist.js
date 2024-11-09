import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { useRouter } from 'expo-router'

const Chatlist = ({users}) => {
  const router= useRouter();
  
  return (
    <View className="flex-1" >  
        <FlatList
        data={users}
        contentContainerStyle={{flex:1, paddingVertical:25, width:widthPercentageToDP(100)}}
        keyExtractor={item=>Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index})=> <ChatItem item={item} index={index} router={router}  noBorder={index + 1 === users.length}   /> }
        />
    </View>
  )
}

export default Chatlist