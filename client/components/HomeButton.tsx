import { ACTIVE_COLOR, INACTIVE_COLOR } from "@/constants"
import { Pressable, View } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated"
import { useEffect } from "react"

export default function HomeButton({
  iconName,
  IconFrom,
  onPress,
  active
}: any) {

  const width = useSharedValue(48) // default size

  useEffect(() => {
    width.value = withTiming(active ? 100 : 48, { duration: 250 })
  }, [active])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value
    }
  })

  return (
    <View className="items-center z-30 mt-2 " style={{
      shadowColor: "#000" ,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: active ? 0.32 : 0,
      shadowRadius: 12.46,

      elevation: 9,
    }}>
      <Pressable onPress={onPress}>

          <Animated.View
            style={[
              animatedStyle,
              {
                height: 30,
                borderRadius: 999,
                backgroundColor: active ? ACTIVE_COLOR : INACTIVE_COLOR,
                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >

            <IconFrom name={iconName} size={17} color="white" />

          </Animated.View>

        </Pressable>
    </View>
    
  )
}