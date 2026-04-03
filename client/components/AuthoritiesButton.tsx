import { View, Text, TouchableOpacity, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ACTIVE_COLOR } from "@/constants";

export default function AuthoritiesButton({
    Icon, // This is now being used dynamically
    title,
    active,
    onPress,
    isSubmitted
}: any) {

    return (
        <Pressable 
            onPress={onPress}
            disabled={isSubmitted}
            className="border border-black h-28 items-center justify-center rounded-xl w-[31.5%]"
            style={{
                backgroundColor: active ? ACTIVE_COLOR : "#e5e7eb",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
            }}
        >
            <Icon.iconFrom 
                name={Icon.iconName || "question"} // Fallback icon if none provided
                size={40} 
                color={active ? "white" : "black"}
            />
            <Text className="mt-2 text-center font-bold text-base px-1"
            style={{
                color: active ? "white" : "black"
            }}
            >
                {title}
            </Text>
        </Pressable>
    )
}