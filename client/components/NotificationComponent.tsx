import { View, Text, Image } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView from "react-native-maps";



export default function NotificationComponent({
    critical,
    from,
    location,
}: any) {

    return (
        <View className="border-2 my-1 rounded-3xl flex-1 p-6 relative" style={{
            borderColor: critical ? "red" : "black",
            backgroundColor: "#fff",

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
        }}>

            <View className="flex-row items-center">
                <View className="p-1">
                <Image className=" w-16 h-16 rounded-full" source={require("@/assets/images/icon.png")}/>

                </View>

                <View className="flex-1">
                    <Text className="text-xl">{from.name}</Text>
                    <View className="h-[1px] bg-black w-full rounded-lg" />
                    <Text className="text-xs">{location.time}</Text>
                    <Text className="text-sm">{location.location}</Text>
                </View>

                <View className="absolute top-0 right-0 z-10">
                    <MaterialIcons name="emergency" size={24} color={critical ? "red" : "black"} />
                </View>

            </View>
            <View >
                <MapView style={{flex: 1, height: 150, width: "100%", borderRadius: 10 }}/>

            </View>

        </View>
    )
}