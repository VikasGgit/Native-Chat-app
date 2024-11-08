import { View, Text, Button, ActivityIndicator } from 'react-native'
import React ,{useEffect, useState} from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext';
import Chatlist from '../../componets/Chatlist';

const Home = () => {
  const [users, setUsers]=useState([3])

  useEffect(()=>{
    if(users?.uid)
      fetUsers();
  }, [])

  const fetUsers=async()=>{
    // Fetch users
  }

  return (
    <View>
    {users.length>0 ? (
      <View>
        <Text><Chatlist/></Text>
      </View>
    ):(
      <View>
      <ActivityIndicator  size='large' color="red"  />
      </View>
    )}
    </View>
  )
}

export default Home