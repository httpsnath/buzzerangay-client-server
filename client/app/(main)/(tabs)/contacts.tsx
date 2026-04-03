import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import FamilyContact from "@/components/FamilyContactTemplate";
import { API_URL, contactsTabs, INACTIVE_COLOR } from "@/constants";
import LocationButton from "@/components/LocationButton";
import ResponderContact from "@/components/ResponderContactComponent";
import SettingsButton from "@/components/SettingsButton";
import { useFocusEffect, useRouter } from "expo-router";
import { useEngine } from "@/context/EngineContext";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("Family");
  const router = useRouter()

  const { authenticated } = useEngine()
 
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);  


  const handleMainScreenClick = (tab: string) => {
    setActiveTab(tab);
  };



  const fetchContacts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}contacts/${authenticated}`);
      const data = await res.json();

      setContacts(data.contacts); 
    } catch (err) {
      console.log("Failed to fetch contacts", err);
    } finally {
      setLoading(false);
    }
  };




  useFocusEffect(
    useCallback(() => {
      fetchContacts();
    }, [])
  )
  return (
    <View className=" flex-1 pb-24 bg-white">
      <SettingsButton visible={true} />

      <View className="flex-row mt-36 ml-3 pb-3 ">
        {contactsTabs.map((item) => (
          <LocationButton
            key={item.title}
            title={item.title}
            iconName={item.iconName}
            IconFrom={item.IconFrom}
            active={activeTab === item.title}
            onPress={() => {
              handleMainScreenClick(item.title);
            }}
          />
        ))}


    <View className="ml-auto mr-3">
      <Pressable
        className="flex-row items-center justify-center px-4 h-12 rounded-full"
        style={{ backgroundColor: INACTIVE_COLOR }}
        onPress={() => router.push("/(main)/(extra)/addcontact")}
      >
        <Text className="text-white">Add Contact</Text>
      </Pressable>
    </View>
      </View>

      <ScrollView className="flex-1  ">
        {activeTab === "Family" && (
          <>
          {
            contacts.map((item) => (
              <FamilyContact 
                key={item.uid}
                name={item.name}
                contact_no={item.phone}
              />
            ))
          }
          </>
        )}

        {activeTab === "Responders" && (
          <>
            <ResponderContact name="Nathan Pogi" contact_no="+63123456789" />
          </>
        )}
      </ScrollView>
    </View>
  );
}
