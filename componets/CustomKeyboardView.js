import { View, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ios=Platform.OS === 'ios';
const CustomKeyboardView = ({children}) => {
  return (
    <KeyboardAvoidingView
    behavior={ios ? 'padding' : 'height'}
    keyboardVerticalOffset={90}
    style={{flex:1}}
    >
        <ScrollView
        contentContainerStyle={{
          flex:1
        }}
        style={{flex:1}}
        showsVerticalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView