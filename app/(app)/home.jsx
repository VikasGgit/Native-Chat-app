import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/authContext';
import Chatlist from '../../componets/Chatlist.js';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';


const Home = () => {
  const {user} = useAuth();
  const [users, setUsers] = useState(null); // Initialize with null for loading state

  useEffect(() => {
    if (user?.userId) {
      fetchUsers(); // Corrected function name
    }
  }, [user?.userId]); // Ensuring dependency on userId to re-run when it changes

  const fetchUsers = async () => { // Corrected function name here
    try {
      const q = query(usersRef, where('userId', '!=', user.userId));
      const querySnapshot = await getDocs(q);
      
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setUsers(data);
      console.log("Fetched users:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <View className="items-center justify-center flex-1">
      {users ? (
        <Chatlist users={users} />
      ) : (
        <ActivityIndicator size="large" color="red" />
      )}
    </View>
  );
};

export default Home;
