import { ACTIVE_COLOR, API_URL } from "@/constants";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEngine } from "@/context/EngineContext";
import { Redirect } from "expo-router";
import { fetch } from "expo/fetch"

export default function AuthScreen() {
  const { authenticated, login, applyPhone, applyName } = useEngine();
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"resident" | "official">("resident");

  const [response, setResponse] = useState("")

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animateSwitch = () => {
    opacity.value = withTiming(0, { duration: 150 });
    translateY.value = withTiming(10, { duration: 150 });

    setTimeout(() => {
      setMode(mode === "login" ? "signup" : "login");

      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
    }, 150);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleSubmit = async () => {

    /* LOGIN */
    if (mode === "login") {
      console.log("LOGIN", { phone, password });

      try {
      console.log("SIGN UP", { phone, password, role });
      const response = await fetch(API_URL + "login", {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({"phone": phone, "password": password})
      })

       const data = await response.json()

       if (!response.ok) {
        setResponse(data.detail)
       } else {
        setResponse(data.message)
        applyPhone(data.user_info.phone)
        applyName(data.user_info.name)
        login(data.user_info.user_id)


       }
      } catch {
        setResponse("Network error.")
       }








    /* SIGN UP */
    } else {
      try {
      console.log("SIGN UP", { phone, password, role });
      const response = await fetch(API_URL + "signup", {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({"name": name, "phone": phone, "password": password, "role": role })
      })

       const data = await response.json()

       if (!response.ok) {
        setResponse(data.detail)
       } else {
        setResponse(data.message)

       }
      } catch {
        setResponse("Network error.")
       }


    }
  };

  if (authenticated) {
    return <Redirect href={"/(main)/(tabs)"} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
      style={{ backgroundColor: ACTIVE_COLOR }}
    >
      <View className="flex-1 items-center">
        {/* Logo */}
        <Image
          source={require("@/assets/images/buzzerangay_logo.png")}
          className="mt-28 rounded-3xl"
          style={{ width: 100, height: 100 }}
        />

        {/* Card */}
        <Animated.View
          style={animatedStyle}
          className="w-[90%] bg-white mt-10 p-6 rounded-3xl shadow-lg"
        >
          <Text className="text-2xl font-bold mb-6 text-center">
            {mode === "login" ? "Login" : "Sign Up"}
          </Text>

          {/* LOGIN */}
          {mode === "login" && (
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={"#6b7280"}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              className="border border-gray-300 rounded-xl p-3 mb-4"
            />
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <TextInput
                placeholder="Name"
                placeholderTextColor={"#6b7280"}
                value={name}
                onChangeText={setName}
                keyboardType="default"
                className="border border-gray-300 rounded-xl p-3 mb-4"
              />

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={"#6b7280"}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                className="border border-gray-300 rounded-xl p-3 mb-4"
              />



              {/* Role */}
              <View className="flex-row mb-4">
                <Pressable
                  onPress={() => setRole("resident")}
                  className={`flex-1 p-3 rounded-xl mr-2 ${
                    role === "resident" ? "bg-[#074979]" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      role === "resident" ? "text-white" : "text-black"
                    }`}
                  >
                    Resident
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setRole("official")}
                  className={`flex-1 p-3 rounded-xl ml-2 ${
                    role === "official" ? "bg-[#074979]" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-center ${
                      role === "official" ? "text-white" : "text-black"
                    }`}
                  >
                    Official
                  </Text>
                </Pressable>
              </View>
            </>
          )}

          {/* PASSWORD */}
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#6b7280"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-xl p-3 mb-6"
          />

          {/* SUBMIT */}
          <Pressable
            onPress={handleSubmit}
            className="bg-blue-500 p-4 rounded-xl active:opacity-80"
          >
            <Text className="text-white text-center font-semibold">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Text>
          </Pressable>

          {
            response && (
            <Text className="text-center mt-3" >
              {response}
            </Text>
            )
          }


          {/* SWITCH */}
          <Pressable onPress={animateSwitch} className="mt-4">
            <Text className="text-center text-blue-500">
              {mode === "login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
