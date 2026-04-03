import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import FamilyContact from "@/components/FamilyContactTemplate";
import { contactsTabs } from "@/constants";
import LocationButton from "@/components/LocationButton";
import ResponderContact from "@/components/ResponderContactComponent";
import SettingsButton from "@/components/SettingsButton";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("Family");

  const handleMainScreenClick = (tab: string) => {
    setActiveTab(tab);
  };

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
      </View>

      <ScrollView className="flex-1  ">
        {activeTab === "Family" && (
          <>
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
            <FamilyContact name="Nathan Pogi" contact_no="+63123456789" />
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
