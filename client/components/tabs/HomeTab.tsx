import { INACTIVE_COLOR, firstAidOptions, homeTabs } from "@/constants"
import { View , Text, Pressable} from "react-native"
import HomeButton from "../HomeButton"
import { useState } from "react"
import NotificationComponent from "../NotificationComponent"
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet"
import FirstAidOptionComponent from "../FirstAidOptionsComponent";
import Paragraph from "../Paragraph";
import SosButton from "../SosButton"

export default function HomeTab() {

  const [activeTab, setActiveTab] = useState("notifications-outline")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    critical: true,
    from: { name: "Relative 2" },
    location: {
      time: "2 mins ago",
      location: "Dela Paz, San Simon, 2015 Pampanga, Philippines",
      latitude: 15.024048, // 
      longitude: 120.733153,
    }
  },
  {
    id: "2",
    critical: false,
    from: { name: "Relative 1" },
    location: {
      time: "1 hour ago",
      location: "2PHQ+PP3, San Simon, Pampanga, Philippines",
      latitude: 15.027314,
      longitude: 120.736920,
    }
  }
];

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


        <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 185 }}>
          <View className="mx-3 gap-2">

            {MOCK_NOTIFICATIONS.map(item => (
              <NotificationComponent key={item.id} critical={item.critical} from={{name: item.from.name}}  location={{time: item.location.time, location: item.location.location}} />
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