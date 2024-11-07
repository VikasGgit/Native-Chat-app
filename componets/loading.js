import React from 'react';
import Lottie from 'lottie-react-native';
import { View } from 'react-native';

export default function Loading({ size }) {
  return (
    <View style={{ height: size, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Lottie 
        source={require('../assets/images/loading.json')} 
        autoPlay 
        loop 
        style={{ width: '100%', height: '100%' }} 
      />
    </View>
  );
}
