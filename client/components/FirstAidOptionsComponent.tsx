import { Image, LayoutChangeEvent, Pressable, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ReactNode, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export default function FirstAidOptionComponent({
    icon,
    title,
    children,
    isOpen,
    onPress
}: { icon: any, title: string, children: ReactNode, isOpen: boolean, onPress: () => void }) {
    
    const height = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const rotate = useSharedValue(0);

    useEffect(() => {
        rotate.value = withTiming(isOpen ? 90 : 0, { duration: 300 });
        if (contentHeight.value > 0) {
            height.value = withTiming(isOpen ? contentHeight.value : 0, { duration: 300 });
        }
    }, [isOpen]);

    const onLayout = (event: LayoutChangeEvent) => {
        const measuredHeight = event.nativeEvent.layout.height;
        if (measuredHeight === contentHeight.value) return;

        contentHeight.value = measuredHeight;

        if (isOpen) {
            height.value = withTiming(measuredHeight);
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        opacity: height.value === 0 ? 0 : 1, 
        overflow: "hidden"
    }));

    const iconAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }],
    }));

    return (
        <View className="border-b border-gray-300 bg-white rounded-lg overflow-hidden">
            <Pressable 
                onPress={onPress} 
                className="p-4 flex-row items-center justify-between"
            >
                <View className="flex-row items-center">
                    <Image resizeMode="contain" className="w-14 h-14" source={icon} />
                    <Text className="text-xl ml-4 font-semibold">{title}</Text>
                </View>
                
                <Animated.View style={iconAnimatedStyle}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </Animated.View>
            </Pressable>

            <Animated.View style={animatedStyle}>
                <View 
                    onLayout={onLayout} 
                    style={{ position: 'absolute', width: '100%' }}
                    className="p-4 bg-gray-100"
                >
                    {children}
                </View>
            </Animated.View>
        </View>
    );
}