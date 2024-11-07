// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import {collection, getFirestore} from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5OT1Gf-auNCVybe4POXgZ0_C_8E1m2bs",
  authDomain: "native-chat-app-cdb4d.firebaseapp.com",
  projectId: "native-chat-app-cdb4d",
  storageBucket: "native-chat-app-cdb4d.firebasestorage.app",
  messagingSenderId: "1076246004379",
  appId: "1:1076246004379:web:56b4d9228b2d304854fc3e",
  measurementId: "G-1G8L6X84XJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth= initializeAuth(app, 
    {
        persistence: getReactNativePersistence(AsyncStorage),
    })

export const db= getFirestore(app);

export const usersRef= collection(db, "users");
export const roomRef= collection(db, "rooms");