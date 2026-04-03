import { View, Text, Pressable } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";



export default function SettingsButton({
    visible
}: {
    visible: boolean
}) {
    const router = useRouter()





    return (
        <Pressable 
            className="bg-white bordder rounded-3xl mt-16 ml-3 z-20 absolute flex-row justify-center items-center gap-2 p-2" 
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
                display: visible ? "flex" : "none"
            }}
            disabled={!visible}
            onPress={() => {
                router.push({
                    pathname: "/(main)/(settings)/settings"
                })
            }}>



            <Feather name="settings" size={28} color="black" />
            <Text className="text-lg font-bold" >Buzzerangay</Text>
        </Pressable>


    )
}