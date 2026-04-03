import { ACTIVE_COLOR, INACTIVE_COLOR } from "@/constants";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition, SlideInLeft, SlideOutLeft } from "react-native-reanimated";

export default function LocationButton({
  title,
  iconName,
  IconFrom,
  active,
  onPress,
}: any) {

  
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        layout={LinearTransition.springify().damping(80)}
        className={`flex-row 
                    items-center 
                    mx-1
                    justify-center 
                    rounded-full 
                    h-12 
                    overflow-hidden 
                    
                    ${
                      active ? "px-4" : "w-12"
                    }`}

        style={{backgroundColor: active ? ACTIVE_COLOR : INACTIVE_COLOR }}
      >
        <IconFrom name={iconName} size={20} color="white" />

        {active && (
          <Animated.View>
            <Text className="text-white ml-2 font-medium">
              {title}
            </Text>
          </Animated.View>

        )}
      </Animated.View>
    </Pressable>
  );
}