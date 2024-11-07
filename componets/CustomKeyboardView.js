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
    keyboardVerticalOffset={hp(2)}
    style={{flex:1}}
    >
        <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: hp(4),
          paddingBottom: hp(4),
        }}
        keyboardShouldPersistTaps="handled"
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView