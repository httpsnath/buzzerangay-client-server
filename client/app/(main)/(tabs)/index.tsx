import { View, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';  
import LocationButton from "@/components/LocationButton";
import { useEffect, useMemo, useRef, useState } from "react";
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { tabs } from "@/constants";
import HomeTab from "@/components/tabs/HomeTab";
import AuthoritiesTab from "@/components/tabs/AuthoritiesTab";
import AnnouncementsTab from "@/components/tabs/AnnouncementsTabs";
import SettingsButton from "@/components/SettingsButton";
import { useLocation } from "@/context/LocationContext";


export default function Index() {

  const {location, loading} = useLocation()
  const mapRef = useRef<MapView>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedPosition = useSharedValue(0);
  const snapPoints = useMemo(() => ['30%', '50%', '85%'], []);
  



  const [activeTab, setActiveTab] = useState("Home")


  const [loadedTabs, setLoadedTabs] = useState<{ [key: string]: boolean }>({
    Home: true
  })
  const { height } = useWindowDimensions();

  const topSnapPointY = height * (1 - 0.85); 

  const animatedSettingsStyle = useAnimatedStyle(() => {
    const inputShowRange = [topSnapPointY, topSnapPointY + 100];

    const opacity = interpolate(
      animatedPosition.value,
      inputShowRange,
      [0, 1], 
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      animatedPosition.value,
      inputShowRange,
      [0.8, 1], // Subtle shrink effect as it fades
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
      pointerEvents: opacity < 0.1 ? 'none' : 'auto',
    };
  });


  const handleMainScreenClick = (tab: string) => {
    setActiveTab(tab)
    setLoadedTabs(prev => ({ ...prev, [tab]: true }))
  }

  const animatedWrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animatedPosition.value - 60 } 
      ],
    };
  });

  
  useEffect(() => {
    console.log(activeTab)
  }, [activeTab])






  return (
    <View className="flex-1 bg-white">
    <Animated.View 
          style={[
            { position: 'absolute', zIndex: 50 }, 
            animatedSettingsStyle
          ]}
        >
          <SettingsButton visible={true} />
        </Animated.View>
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        followsUserLocation={true}
        style={{ flex: 1 }}
        >



        </MapView>

      <Animated.View 
        style={[animatedWrapperStyle]} 
        className="absolute flex-row left-4 right-4 z-10"
      >

    
        {tabs.map((item) => (
          <LocationButton
            key={item.title}
            title={item.title}
            iconName={item.iconName}
            IconFrom={item.IconFrom}
            active={activeTab === item.title}
            onPress={() => { handleMainScreenClick(item.title) }}
          />


        ))}


        
      </Animated.View>
      
      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing={false}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        handleIndicatorStyle={{width: 150, height: 2}}
        index={0}
        

      >

      {loadedTabs["Home"] && (
        <View style={{ display: activeTab === "Home" ? "flex" : "none" }}>
          <HomeTab />
        </View>
      )}

      {loadedTabs["Authorities"] && (
        <View style={{ display: activeTab === "Authorities" ? "flex" : "none" }}>
          <AuthoritiesTab />
        </View>
      )}

      {loadedTabs["Announcements"] && (
        <View style={{ display: activeTab === "Announcements" ? "flex" : "none" }}>
          <AnnouncementsTab />
        </View>
      )}




      </BottomSheet>
    </View> 
  );
}