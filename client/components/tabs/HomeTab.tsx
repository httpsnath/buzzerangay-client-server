import { API_URL, INACTIVE_COLOR, firstAidOptions, homeTabs } from "@/constants"
import { View , Text, Pressable} from "react-native"
import HomeButton from "../HomeButton"
import { useCallback, useEffect, useRef, useState } from "react"
import NotificationComponent from "../NotificationComponent"
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import FirstAidOptionComponent from "../FirstAidOptionsComponent";
import Paragraph from "../Paragraph";
import SosButton from "../SosButton"
import { useEngine } from "@/context/EngineContext"
import { useFocusEffect } from "expo-router"

export default function HomeTab() {
  const { authenticated } = useEngine()
  const [activeTab, setActiveTab] = useState("notifications-outline")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [notifications, setNotifications] = useState<any[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);




  const fetchNotifs = async () => {
    try {

      const res = await fetch(`${API_URL}notifications/${authenticated}`);
      const data = await res.json();

      setNotifications(data.notifications || []);
    } catch (err) {
      console.log("Failed to fetch notifications", err);
    } finally {
    }
  };



  useFocusEffect(
    useCallback(() => {
      fetchNotifs();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        fetchNotifs();
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [])
  );

  const handleOptionClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index))
  }



    return (
    <View>
      <View className="flex-row justify-center m-3 rounded-xl gap-3 px-4 items-center">
        {homeTabs.map((item) => (
          <View key={item.iconName} className="justify-center items-center">
            <HomeButton 
              iconName={item.iconName}
              IconFrom={item.IconFrom}
              onPress={() => setActiveTab(item.iconName)}
              active={activeTab === item.iconName}
            />
          </View>
        ))}
      </View>




      {activeTab === "notifications-outline" && (


        <BottomSheetScrollView contentContainerStyle={{ paddingBottom:   185 }}>
          <View className="mx-3 gap-2">

            {notifications.map((item, index)=> (
              <NotificationComponent 
              key={index} 
              critical={item.critical} 
              from={{name: item.from.name}}  
              location={{time: item.location.time, lat: item.location.lat, lon: item.location.lon}} />
            ))}



          </View>
        </BottomSheetScrollView>
      )}

      {activeTab === "first-aid" && (
        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 185 }}>
          <View className="mx-3 gap-2">
            {
                firstAidOptions.map((item, index) => (
                  <FirstAidOptionComponent
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    isOpen={activeIndex === index}
                    onPress={() => handleOptionClick(index)}
                    
                  >

                    {
                      item.content.map((pItem, pIndex) => (
                        <Paragraph 
                          key={pIndex}
                          title={pItem.title}
                          subtitle={pItem.subtitle + "."}
                          content={pItem.content}
                        />
                      ))
                    }
                  </FirstAidOptionComponent>
                ))
              }
          </View>
        </BottomSheetScrollView>
      )}

      {activeTab === "sos" && (
        
        <BottomSheetView className="pt-28 pb-4 mx-3">
          <SosButton />
          <Text className="text-base font-medium mt-14 mx-3" >SOS will be sent to your favorite contacts. If the button is held down, it will also be sent to nearest responders.</Text>

        </BottomSheetView>



      )}
    </View>
  )

}