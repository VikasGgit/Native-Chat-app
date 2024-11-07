import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext';

const Home = () => {
  const router=useRouter();
  const {logout}= useAuth()
  return (
    <View  style={{gap:10, padding:54}} >
      <Text>Home</Text>
      <Button title="Signup" onPress={()=>{
        console.log('button');
      return  router.replace('signup')
      }}  ></Button>

<Button title="Sign Out" onPress={ async ()=>{
        await logout();
      }}  ></Button>
    </View>
  )
}

export default Home