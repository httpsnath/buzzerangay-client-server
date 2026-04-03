import { Image, Pressable, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function FamilyContact({
    name,
    contact_no,
    avatar,
    favorite
}: any) {
    const router = useRouter();

    return (
        <View className="m-3 mt-4 border my-1 rounded-3xl p-2" style={{
                backgroundColor: "#fff",

                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
            
            }} >


            <View className="flex-row items-center">
                <View className="p-1">
                <Image className=" w-16 h-16 rounded-full" source={require("@/assets/images/icon.png")}/>

                </View>

                <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-xl flex-1">{name}</Text>

                        <View className="flex-row gap-2 mb-2 mr-2">
                            <Pressable className="border rounded-full h-8 w-8 justify-center items-center">
                                <AntDesign name="star" size={16} color="black" />
                            </Pressable>

                            <Pressable className="border rounded-full h-8 w-8 justify-center items-center">
                                <Feather name="phone-call" size={16} color="black" />
                            </Pressable>

                            <Pressable
                                className="border rounded-full h-8 w-8 justify-center items-center"
                                onPress={() => {
                                    router.push({
                                    pathname: "/(main)/(chat)/chat",
                                    params: {
                                        to: contact_no,
                                        name: name,
                                    },
                                    });
                                }}
                                >
                                <MaterialIcons name="sms" size={16} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <View className="h-[1px] bg-black w-full rounded-lg" />
                    <Text className="text-sm">{contact_no}</Text>
                </View>


            </View>

        </View>
    )
}