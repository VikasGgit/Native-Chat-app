import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth, db} from '../firebaseConfig.js'
import { setDoc, doc } from "firebase/firestore";
export const authContext =createContext();

export const AuthContextProvider= ({children})=>{
    const [user, setUser]=useState(null);
    const [isAuthenticated, setIsAuthenticated]=useState(false);

    useEffect(()=>{
        const unsub= onAuthStateChanged(auth, (u)=>{
            if(u){
                setIsAuthenticated(true);
                setUser(u);
            }
            else{
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        return unsub;
       

    }, [])

    const login= async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('response.login.user', response?.user);

            return {success: true}
        }
        catch(e){
            let msg= e.message;
            if(msg.includes('auth/invalid-email')) msg="Invalid email";
            if(msg.includes('auth/invalid-cred')) msg="Invalid credentials";
                return {success: false, msg}
            
        }
    }
    const logout= async ()=>{
        try{
            await signOut(auth)
            console.log('logged out')
            return {success: true}
        }
        catch(e){
            return {success: false, message: e.message, error: e};
        }
    }
    const register= async (email, password, username, profileUrl)=>{
        try{
            const response= await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user' , response?.user)

            await setDoc( doc( db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId:response?.user?.uid
            } )
            return {success: true, data: response?.user}

        }
        catch(e){
            let msg= e.message;
            if(msg.includes('auth/invalid-email')) msg="Invalid email";
            if(msg.includes('auth/email-already')) msg="This email already exists";
                return {success: false, msg}
        }
    }

    return(
        <authContext.Provider  value={{user, isAuthenticated, login, logout, register}}>
                {children}
        </authContext.Provider> 
    )
}

export const useAuth= ()=>{
    const value=useContext(authContext);
    
    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider')
    }
    return value;
}