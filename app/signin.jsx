import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons, MaterialIcons } from "@expo/vector-icons";
import Loading from "../componets/loading";
import CustomKeyboardView from "../componets/CustomKeyboardView";
import { useAuth } from "../context/authContext";

const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const {login} = useAuth();
  const passRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailRef.current || !passRef.current) {
      Alert.alert("Please enter All Fields");
      return;
    }
    console.log(emailRef.current, passRef.current, passRef, emailRef);

    setLoading(true);
    let response= await login(emailRef.current, passRef.current);
    setLoading(false);
    if(response.success){
      Alert.alert("login", "Login Successfull")
    }
    if(!response.success){
      Alert.alert("login", response.msg)
    }
    


  };

  return (
    <CustomKeyboardView>
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />

      <Text
        style={{
          fontSize: hp(5),
          marginBottom: hp(4),
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Sign In
      </Text>

      <View style={{ width: "85%", gap: hp(3) }}>
        {/* Email Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: hp(1.5),
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <Octicons
            name="mail"
            size={hp(3.5)}
            color="#888"
            style={{ marginRight: wp(2) }}
          />
          <TextInput
            onChangeText={(value) => (emailRef.current = value)}
            style={{ fontSize: hp(2.5), flex: 1, color: "#333" }}
            placeholder="Enter your Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: hp(1.5),
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}
        >
          <MaterialIcons
            name="lock"
            size={hp(3.5)}
            color="#888"
            style={{ marginRight: wp(2) }}
          />
          <TextInput
            onChangeText={(value) => (passRef.current = value)}
            style={{ fontSize: hp(2.5), flex: 1, color: "#333" }}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={true}
          />
        </View>

        {/* Forget Password */}
        <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: hp(1) }}>
          <Text style={{ fontSize: hp(2), color: "#0066CC" }}>
            Forget Password?
          </Text>
        </TouchableOpacity>

        {/* Sign In Button / loading animation*/}
        <View>
         { loading ? (
          <View style={{
            alignSelf: "center",
          }} >
            <Loading style={{
                fontSize: hp(2.5),
                color: "#FFFFFF",
                fontWeight: "bold",
              }} size={hp(7)} />
          </View>
          ):(
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              alignSelf: "center",
              backgroundColor: "#0066CC",
              paddingVertical: hp(1.5),
              paddingHorizontal: wp(10),
              borderRadius: 10,
              marginTop: hp(3),
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: hp(2.5),
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: hp(2), color: "#333" }}>
            Don't have an account?{" "}
          </Text>
          <Pressable
            onPress={() => {
              router.push("signup");
            }}
          >
            <Text
              style={{ fontSize: hp(2), color: "#0066CC", fontWeight: "bold" }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
