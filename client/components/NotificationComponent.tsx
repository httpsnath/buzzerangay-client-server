import { View, Text, Image } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MapView, { Marker } from "react-native-maps";



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
                    <Text className="text-xs">{new Date(location.time).toLocaleString()}</Text>
                </View>

                <View className="absolute top-0 right-0 z-10">
                    <MaterialIcons name="emergency" size={24} color={critical ? "red" : "black"} />
                </View>

            </View>
            <View className="rounded-2xl overflow-hidden">
                <MapView style={{ height: 150, width: "100%", borderRadius: 10 }}
                initialRegion={{
                    latitude: Number(location.lat),
                    longitude: Number(location.lon),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                >

                    <Marker 
                        coordinate={{
                            latitude: Number(location.lat),
                            longitude: Number(location.lon)
                        }}
                        title={from.name}
                        description="Emergency Location"
                        pinColor={critical ? "red" : "black"} 
                    />      


                </MapView>

            </View>

        </View>
    )
}