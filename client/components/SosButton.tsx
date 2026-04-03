import { ACTIVE_COLOR, API_URL, INACTIVE_COLOR } from "@/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useEngine } from "@/context/EngineContext";
import { useLocation } from "@/context/LocationContext";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SosButton() {
  const { authenticated, name } = useEngine();
  const { location } = useLocation();


  const scale = useSharedValue(1);
  const progress = useSharedValue(0);
  const colorProgress = useSharedValue(0); // 0 = Inactive, 1 = Active

  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLongPress, setIsLongPress] = useState(false);

  const size = 280;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: 1.5 - scale.value,
      backgroundColor: INACTIVE_COLOR,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [INACTIVE_COLOR, ACTIVE_COLOR],
    );
    return { backgroundColor };
  });

  const startHold = () => {
    setIsLongPress(false);

    colorProgress.value = withTiming(1, { duration: 200 });
    progress.value = withTiming(1, { duration: 2000 });

    holdTimeout.current = setTimeout(() => {
      setIsLongPress(true);
      handleLongPressComplete();
    }, 2000);
  };

  const cancelHold = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }

    colorProgress.value = withTiming(0, { duration: 300 });
    progress.value = withTiming(0, { duration: 300 });

    if (!isLongPress) {
      handlePress();
    }
  };


  const handleFetch = async (crit: boolean) => {

    const date = new Date(Date.now())
    date.toLocaleTimeString([], 
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )

    try {
      const response = await fetch(`${API_URL}postNotification`, {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          uid: authenticated,
          name: name,
          critical: crit,
          location: {
            lat: location?.latitude,
            lon: location?.longitude,
            time: date
          }

        })
      })


    return response.json()

    } catch {

    }

  }


  const handleLongPressComplete = () => {
    console.log("SOS Triggered");
    handleFetch(true)



    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handlePress = () => {
    console.log("Standard Press");
    handleFetch(false)


    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };





  
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.6, { duration: 1600 }), -1, false);
  }, []);

  return (
    <View className="items-center justify-center">
      <Animated.View
        style={pulseStyle}
        className="absolute w-60 h-60 rounded-full"
      />

      <Animated.View
        style={[animatedButtonStyle]}
        className="w-72 h-72 rounded-full items-center justify-center overflow-hidden"
      >
        <View className="absolute">
          <Svg width={size} height={size}>
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="white"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              animatedProps={animatedCircleProps}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
        </View>

        <Pressable
          onPressIn={startHold}
          onPressOut={cancelHold}
          className="flex-1 w-full items-center justify-center"
        >
          <MaterialIcons name="sos" size={90} color="white" />
        </Pressable>
      </Animated.View>
    </View>
  );
}
