import { View, Text, StatusBar, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../context/authContext.js";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../componets/ChatRoomHeader.js";
import MessageList from "../../componets/MessageList.js";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../../componets/CustomKeyboardView.js";
import { getRoomId } from "../../utils/common.js";
import { Timestamp, addDoc,orderBy, collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { Alert } from "react-native";

const chatroom = () => {
  const item = useLocalSearchParams(); // second user
  const router = useRouter();
  const { user } = useAuth();
  console.log("second User", item);
  console.log("first User", user);
  const [message, setMessage] = useState([]);
  const textRef = useRef("");
  const inputRef=useRef("")

  useEffect(() => {
    createRoomIfNotExist();
    
    let roomId= getRoomId(user?.userId, item?.userId);
    const docRef= doc(db, "rooms", roomId);
    const messageRef=collection(docRef, "messages");
    const q= query(messageRef, orderBy('createdAt'));
    let unsub= onSnapshot(q, (snapshot)=>{
      let allMessages=snapshot.docs.map(doc => {
        return doc.data();
      })
      setMessage([...allMessages]);
      
    })
    return unsub;
    
  }, []);
  const createRoomIfNotExist = async () => {
    let roomId = getRoomId(item?.userId, user?.userId);
    console.log(roomId);
    const docc = await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
    console.log("docc", docc);
  };

  const handleSendMsg = async () => {
    let msg = textRef.current.trim();
    textRef.current="";
    if(!msg) return;
    try{
      let roomId = getRoomId(item?.userId, user?.userId);
      const docRef= doc(db, "rooms", roomId);
      const msgRef=collection(docRef, "messages");
      
      const newDoc= await addDoc(msgRef, {
        userId:user?.userId,
        text:msg,
        profileurl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
       
      })
      inputRef.current.clear();
      console.log('new msg id', newDoc.id)
    }
    catch(e){
      Alert.alert("Msg ", e.message)
    }
  }

  console.log( "Message kya kya hai",  message)

  return (
    <CustomKeyboardView>
      <View className="flex-1 bg-white">
        <StatusBar style="light" />
        <ChatRoomHeader item={item} router={router} />
        <View className="h-2 border-b border-b-blue-400" />

        <View className="justify-between flex-1 p-3 overflow-visible bg-neutral-100">
          <View className="flex-1">
            <MessageList message={message} currentUser={user.userId}/>
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row justify-between p-2 mx-2 bg-white border rounded-full border-neutral-300">
              <TextInput
              ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type messages..."
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity
                onPress={handleSendMsg}
                className="p-2 mr-[1px] bg-neutral-300 rounded-full "
              >
                <Feather name="send" size={hp(3)} color={"#737373"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default chatroom;
