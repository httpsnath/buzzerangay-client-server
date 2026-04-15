import { API_URL } from "@/constants";
import { useEngine } from "@/context/EngineContext";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const ACTIVE_COLOR = "#074979";
const INACTIVE_COLOR = "#0078cf";

export default function OfficialsTab() {
  const { name , authenticated} = useEngine()

  const [requests, setRequests] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_URL}getBackup`);
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRequests();
    setRefreshing(false);
  };

  const postAnnouncement = async () => {
    if (!announcement.trim() || !announcementTitle.trim() ) return;
    const date = new Date()
    try {
      await fetch(`${API_URL}postAnnouncements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_user: name,
          uid: authenticated,
          time: date.toISOString(),
          title: announcementTitle,
          message: announcement,
        }),
      });

      setAnnouncement("");
      alert("Announcement sent!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

const renderItem = ({ item }: any) => {
  const isCritical =
    item.need?.toLowerCase().includes("pnp") ||
    item.need?.toLowerCase().includes("hospital") ||
    item.need?.toLowerCase().includes("bfp");

  return (
    <View
      className="bg-white p-4 rounded-2xl mb-3 shadow border-l-4"
      style={{
        borderLeftColor: isCritical ? "#d90429" : ACTIVE_COLOR,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-2">
        <Text
          className="text-base font-bold"
          style={{ color: ACTIVE_COLOR }}
        >
          {item.name}
        </Text>

        {/* Badge */}
        <View
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor: isCritical ? "#ffe5e5" : "#e6f0ff",
          }}
        >
          <Text
            className="text-xs font-bold"
            style={{
              color: isCritical ? "#d90429" : ACTIVE_COLOR,
            }}
          >
            {isCritical ? "CRITICAL" : "NORMAL"}
          </Text>
        </View>
      </View>

      {/* Need */}
      <Text className="text-sm font-semibold text-gray-800">
        Need: <Text className="font-bold">{item.need}</Text>
      </Text>

      {/* Extra */}
      {item.extra ? (
        <Text className="text-gray-600 mt-1 text-sm">
          {item.extra}
        </Text>
      ) : null}

      {/* Location */}
      {item.location && (
        <MapView style={{ height: 150, width: "100%", borderRadius: 10 }}
                initialRegion={{
                    latitude: Number(item.location.lat),
                    longitude: Number(item.location.lon),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                >
                <Marker 
                        coordinate={{
                            latitude: Number(item.location.lat),
                            longitude: Number(item.location.lon)
                        }}
                        title={item.name}
                        description="Emergency Location"
                        // 3. Dynamic color based on critical prop
                        pinColor={isCritical ? "red" : "black"} 
                    />      
                </MapView>
      )}

      {/* Time */}
      {item.location?.time && (
        <Text className="text-xs text-gray-400 mt-2">
          {new Date(item.location.time).toLocaleString()}
        </Text>
      )}
    </View>
  );
};

  return (
    <View className="flex-1 bg-gray-100 p-4">
      
      {/* 📢 Announcement */}
      <View className="bg-white p-4 mt-7 rounded-2xl mb-5 shadow">
        <Text className="text-lg font-bold mb-2" style={{ color: ACTIVE_COLOR }}>
          Post Announcement
        </Text>


        <TextInput
          value={announcementTitle}
          onChangeText={setAnnouncementTitle}
          placeholder="Title"
          placeholderTextColor="#aaa"
          className="bg-gray-100 rounded-xl p-3 min-h-[30px] mb-3"
        />

        <TextInput
          value={announcement}
          onChangeText={setAnnouncement}
          placeholder="Type your announcement..."
          placeholderTextColor="#aaa"
          multiline
          className="bg-gray-100 rounded-xl p-3 min-h-[70px] mb-3"
        />

        <TouchableOpacity
          onPress={postAnnouncement}
          className="py-3 rounded-xl items-center"
          style={{ backgroundColor: INACTIVE_COLOR }}
        >
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>

      {/* 📥 Requests */}
      <Text className="text-lg font-bold mb-2" style={{ color: ACTIVE_COLOR }}>
        Backup Requests
      </Text>

      <FlatList
        data={requests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}