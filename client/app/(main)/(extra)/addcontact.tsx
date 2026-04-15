import { API_URL, INACTIVE_COLOR } from "@/constants";
import { useEngine } from "@/context/EngineContext";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";

export default function AddContactScreen() {
  const { authenticated } = useEngine()
  const [uid, setUid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddContact = async () => {
    if (!uid.trim()) {
      Alert.alert("Error", "Please enter a UID");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL + "addContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 

            uid: authenticated,
            add_user: `USR-${uid}`
        
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add contact");
      }

      setUid("");
      Alert.alert("Success", "Contact added successfully!");
    } catch (err) {
      Alert.alert("Error", "Could not add contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-20">
      
      <Text className="text-2xl font-bold mb-6">
        Add Contact
      </Text>

      <Text className="text-gray-500 mb-2">
        Enter User ID
      </Text>

      <TextInput
        value={uid}
        onChangeText={setUid}
        placeholder="USR-.."
        className="border border-gray-300 rounded-xl px-4 py-3 mb-5"
      />

      <Pressable
        onPress={handleAddContact}
        disabled={loading}
        className=" py-3 rounded-xl items-center"
        style={{
            backgroundColor: INACTIVE_COLOR
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">
            Add Contact
          </Text>
        )}
      </Pressable>

    </View>
  );
}