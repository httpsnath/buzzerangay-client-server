import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Chat() {
  const { to, name } = useLocalSearchParams();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [input, setInput] = useState("");

  // --- MOCK DATA FOR DESIGN ---
  const myId = "user1";
  const [messages, setMessages] = useState<any[]>([
    { sender: "other", message: "Musta pre?", timestamp: "9:02 AM" },
    { sender: "user1", message: "K lang.", timestamp: "9:03 AM" },
  ]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: myId,
      message: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.sender === myId;

    return (
      <View className={`flex-row ${isMe ? "justify-end" : "justify-start"} mb-3 px-4`}>
        <View 
          className={`max-w-[80%] p-3 px-4 rounded-2xl ${
            isMe 
              ? "bg-blue-600 rounded-tr-none" 
              : "bg-gray-200 rounded-tl-none"
          }`}
          style={{
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}
        >
          <Text className={`${isMe ? "text-white" : "text-black"} text-[16px]`}>
            {item.message}
          </Text>
          <Text className={`text-[10px] mt-1 self-end ${isMe ? "text-blue-100" : "text-gray-500"}`}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f8f9fa" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View className="bg-white pt-12 pb-4 px-4 flex-row items-center border-b border-gray-200 shadow-sm">
        <Pressable onPress={() => router.back()} className="p-2 mr-2">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        
        <View className="w-10 h-10 rounded-full bg-gray-300 mr-3 overflow-hidden">
             <Image 
                className="w-full h-full" 
                source={require("@/assets/images/icon.png")} 
            />
        </View>

        <View>
          <Text className="text-lg font-bold text-gray-800">{name || to}</Text>
          <Text className="text-xs text-green-500 font-medium">Online</Text>
        </View>
      </View>

      {/* CHAT LIST */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* INPUT AREA */}
      <View className="p-4 bg-white border-t border-gray-200 flex-row items-center">
        <Pressable className="mr-3">
          <Feather name="plus-circle" size={24} color="#666" />
        </Pressable>
        
        <View className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-3 border border-gray-200">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Write a message..."
            multiline
            className="text-gray-800 max-h-24"
          />
        </View>

        <Pressable 
          onPress={sendMessage}
          disabled={!input.trim()}
          className={`w-10 h-10 rounded-full items-center justify-center ${
            input.trim() ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <Ionicons name="send" size={18} color="white" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}