import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { blurhash } from '../utils/common.js';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  
import { useAuth } from '../context/authContext';
import { MenuItem } from './CustomMenuItems.js';

const HomeHeader = () => {
    const ios = Platform.OS === 'ios';
    const { top } = useSafeAreaInsets();
    const {user, userData, logout} =useAuth();
    console.log('userses', user);
    console.log('userData', userData);

    const handleProfile=()=>{
        console.log('handleProfile called');
    }

    const handleLogout=async()=>{
        await logout();
    }
  
    return (
        <View
            style={{ paddingTop: ios ? top : top + 10 }}
            className="flex-row justify-between px-5 pb-6 bg-indigo-400 shadow-lg rounded-b-3xl"
        >
           <View>
            <Text  style={{fontSize:hp(3)}} className="font-medium text-white" >
                Chats
            </Text>
           </View>
    <Menu>
      <MenuTrigger>
      <View>
           <Image
        style={{ height:hp(4.2), aspectRatio:1, borderRadius:100}}
        source={user?.data?.profileUrl}
        placeholder={{ blurhash }}
        transition={500}
      />
      
           </View>
           </MenuTrigger>
        <MenuOptions
        customStyles={{
            optionsContainer:{
                borderRadius:10,
                borderCurve:'continuous',
                marginTop:30,
                marginLeft:-10
            }
        }}
        
        >
            <MenuItem
            text='Profile'
            icon={<MaterialIcons
                name="person"
                size={hp(3.5)}
                color="#888"
            
           
              />}
              action={handleProfile}
              value={null}
            />
            <Divider/>

<MenuItem
            text='Sign Out'
            icon={<MaterialIcons name="logout"   size={hp(3.5)}
            color="#888"
            
            />}
              action={handleLogout}
            value={null}
            />
        </MenuOptions>
       
</Menu>
    
          
        </View>
    );
}

export default HomeHeader;

const Divider=()=>{
    return <View className="p-[1px] w-full bg-neutral-300"  ></View>
}
