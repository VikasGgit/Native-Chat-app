import { Slot, useRouter, useSegments } from "expo-router";
import {useEffect} from 'react'
import {View} from 'react-native'
import {AuthContextProvider, useAuth} from '../context/authContext.js'
// Import your global CSS file
import "../global.css";


const MainLayout = ()=>{
    const {isAuthenticated}= useAuth();
    const segments= useSegments()
    const router= useRouter();
    
    useEffect(()=>{
        if(typeof isAuthenticated === undefined) return ;
        const inApp=segments[0]=='(app)';

        if(isAuthenticated && !inApp) {
            router.replace('home');
        }
        else if(isAuthenticated==false){
            router.replace('signin');
        }
    }, [isAuthenticated])

    return <Slot/>

}

export default function RootLayout(){
    return(
        <AuthContextProvider>
            <MainLayout></MainLayout>
        </AuthContextProvider>
    )
}


