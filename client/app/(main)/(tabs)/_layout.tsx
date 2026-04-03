import "../../../global.css";
import { Redirect, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEngine } from "@/context/EngineContext";

export default function TabsLayout() {

  const { authenticated } = useEngine()

  if (!authenticated) {
    return <Redirect href={"/(auth)/login"} />
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#0078cf",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            overflow: "hidden",
            position: "absolute",
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Location",
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarIcon: () => (
              <MaterialIcons name="public" size={20} color="white" />
            ),
          }}
        />

        <Tabs.Screen
          name="contacts"
          options={{
            title: "Contacts",
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarIcon: () => (
              <FontAwesome6 name="contact-book" size={20} color="white" />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
    //
  );
}
