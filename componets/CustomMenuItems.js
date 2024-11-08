    import { View, Text } from 'react-native'
    import React from 'react'
    import {
      widthPercentageToDP as wp,
      heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
    import {MenuOption} from 'react-native-popup-menu';
    
    const MenuItem = ({text, action, value, icon}) => {
      return (
       
            <MenuOption onSelect={()=> action(value) } >
                 <View className="flex-row items-center justify-between px-4 py-1" >
                    <Text style={{fontSize:hp(1.7)}}  className="font-semibold text-neutral-600" >{text}</Text>
                    <Text>{icon}</Text>
                 </View>
            </MenuOption>
       
      )
    }
    
    export  {MenuItem}