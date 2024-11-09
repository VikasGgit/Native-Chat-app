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
import { useAuth} from '../context/authContext.js'
import CustomKeyboardView from "../componets/CustomKeyboardView";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const {register}= useAuth();
  const userNameRef = useRef("");
  const profileRef = useRef("");
  const passRef = useRef("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!emailRef.current || !passRef.current || !userNameRef.current || !profileRef.current) {
      Alert.alert("Please enter All Fields");
      return;
    }
    console.log(emailRef.current, passRef.current, profileRef.current, userNameRef.current);
    setLoading(true);
    let response= await register(emailRef.current, passRef.current,userNameRef.current, profileRef.current);
    setLoading(false);

    console.log('got result', response);
    if(!response.success) {
      Alert.alert('signup', response.msg);
    }
    if(response.success) {
      Alert.alert('signup', "Account successfully registered");
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
          Sign Up
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

          {/* Username Input */}
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
              name="person"
              size={hp(3.5)}
              color="#888"
              style={{ marginRight: wp(2) }}
            />
            <TextInput
              onChangeText={(value) => (userNameRef.current = value)}
              style={{ fontSize: hp(2.5), flex: 1, color: "#333" }}
              placeholder="Username"
              placeholderTextColor="#888"
            />
          </View>

          {/* Profile Name Input */}
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
              name="person-outline"
              size={hp(3.5)}
              color="#888"
              style={{ marginRight: wp(2) }}
            />
            <TextInput
              onChangeText={(value) => (profileRef.current = value)}
              style={{ fontSize: hp(2.5), flex: 1, color: "#333" }}
              placeholder="Profile Url"
              placeholderTextColor="#888"
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
              placeholder="Password >=6 character"
              placeholderTextColor="#888"
              secureTextEntry={true}
            />
          </View>

          {/* Sign In Button / loading animation */}
          <View>
            {loading ? (
              <View style={{ alignSelf: "center" }}>
                <Loading
                  style={{
                    fontSize: hp(2.5),
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                  size={hp(7)}
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
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
                  Register
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
              Already have an account?{" "}
            </Text>
            <Pressable
              onPress={() => {
                router.push("signin");
              }}
            >
              <Text
                style={{ fontSize: hp(2), color: "#0066CC", fontWeight: "bold" }}
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
