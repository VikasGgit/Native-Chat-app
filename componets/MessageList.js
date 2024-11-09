import { View, ScrollView,Text} from 'react-native';
import React from 'react';
import MessageItem from './MessageItem';

export default function MessageList({ message, currentUser }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 10 }}  stickyHeaderIndices={[0]}>
      <View className="items-center justify-center py-3 bg-gray-100 border-b border-gray-300" >
        <Text className="text-lg font-semibold" >Welcome to Chat App Developed by Vikas Gupta </Text>
      </View>
      {message.map((message, index) => (
        
        <MessageItem
          message={message}
          key={message.id || index} // Use a unique `id` if available, otherwise fallback to `index`
          currentUser={currentUser}
        />
      ))}
    </ScrollView>
  );
}
