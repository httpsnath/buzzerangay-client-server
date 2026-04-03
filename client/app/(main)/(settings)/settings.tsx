import { useRouter } from "expo-router";
import { Image, Pressable, Switch, Text, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useState } from "react";
import { ACTIVE_COLOR } from "@/constants";
import { useEngine } from "@/context/EngineContext";


export default function Settings() {
    const router = useRouter()
    const [locationEnabled, setLocationEnabled] = useState(true)
    const { authenticated, phone_number, name, logout } = useEngine()


    return (
        <View className="pt-16 flex-1 bg-white" >
            <View className="z-10 ml-3 mb-10  items-center" >
                <Text className="font-black text-2xl text-gray-950 " > SETTINGS </Text>
                <View className="border-b  bg-gray-500  mt-2 w-96"/>
            </View>



            <Text className="font-extrabold text-xl text-gray-400 z-10 ml-3" > PROFILE </Text>

            <Pressable className="mx-3 "
            onPress={() => {
                router.push({
                    pathname: "/(main)/(settings)/profile"
                })
            }} 
            >
                <View className=" rounded-2xl p-2 flex-row  bg-white items-center z-20" style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,}}>
                    <Image className=" w-14 h-14 rounded-full" source={require("@/assets/images/icon.png")}/>
                    <Text className="font-extrabold text-xl ml-1 flex-1" > {name} </Text>
                </View>
            </Pressable>


            <Text className="font-extrabold text-xl text-gray-400 z-10 ml-3 mt-3" > ACCOUNT DETAILS </Text>
            <Pressable className="mx-3 "
            onPress={() => {
                router.push({
                    pathname: "/(main)/(settings)/contactnumber"
                })
            }} 
            >
                <View className=" rounded-2xl p-2 flex-row  bg-white items-center z-20" style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,}}>
                    <View className=" p-3 items-center justify-center" >
                        <Feather name="phone" size={17} color="black" />

                    </View>
                    <View className="flex-1 flex-col justify " >
                        <Text className="font-normal text-base ml-1 " > Contact Number </Text>
                        <Text className="font-bold text-xl ml-1 " > {phone_number} </Text>

                    </View>
                </View>
            </Pressable>

            <View className="mx-3 mt-3 "
            >
                <View className=" rounded-2xl p-2 flex-row  bg-white items-center z-20" style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,}}>
                    <View className="  items-center justify-center" >
                        <EvilIcons name="user" size={35} color="black" />

                    </View>
                    <View className="flex-1 flex-col justify " >
                        <Text className="font-normal text-base ml-1 " > User ID </Text>
                        <Text className="font-bold text-l ml-1 " > {authenticated} </Text>

                    </View>
                </View>
            </View>

            <View className="mx-3 "
            >
            <Text className="font-extrabold text-xl text-gray-400 z-10 mt-3" > GENERAL </Text>

                <View className=" rounded-2xl p-2 flex-row  bg-white items-center z-20" style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,}}>
                    <Text className="font-extrabold text-xl ml-1 flex-1" > Enable location tracking </Text>
                    <Switch 
                    trackColor={{false: '#767577', true: ACTIVE_COLOR}}
                    onValueChange={setLocationEnabled}
                    value={locationEnabled}
                    />
                </View>

                
                
                <Pressable className=" rounded-2xl p-2 flex-row mt-3 bg-red-500 border items-center z-20" style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,

                    elevation: 9,}}
                    
                    onPress={() => logout()}

                    >
                    <Text className="font-extrabold text-center text-xl flex-1" > Log out </Text>
                    
                </Pressable>
            </View>
                


        </View>
    )
}