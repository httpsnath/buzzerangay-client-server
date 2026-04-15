

import { Pressable, Text, View } from "react-native"
import AuthoritiesButton from "../AuthoritiesButton"
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet"
import { useEffect, useState } from "react"
import { ACTIVE_COLOR, API_URL, authoritiesOption, INACTIVE_COLOR } from "@/constants"
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useLocation } from "@/context/LocationContext"
import { useEngine } from "@/context/EngineContext"


export default function AuthoritiesTab() {
    const SUBMIT_COOLDOWN = 5 // seconds
    const { location} = useLocation()
    const { authenticated, name } = useEngine()
    const [selected, setSelected] = useState("PNP")
    const [submitted, setSubmitted] = useState(false)
    const [extra, setExtra] = useState("")


    const handleChooseOption = (self: string) => {
        setSelected(self)
    }


    const handleSubmit = async () => {
        const date = new Date();

        try {
            const response = await fetch(`${API_URL}postBackup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: authenticated,
                    name: name,
                    need: selected,
                    extra: extra,
                    location: {
                        lat: location?.latitude,
                        lon: location?.longitude,
                        time: date.toISOString()
                    }
                })
            });

            const data = await response.json();

            await Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Heavy
            );

            console.log("submitted");
            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
            }, SUBMIT_COOLDOWN * 1000);

            return data;

        } catch (err) {
            console.error("Submit failed:", err);
        }
    };



    useEffect(() => {
        console.log("pressed: ", selected)

    }, [selected])



    return (
        <BottomSheetView className="p-3 flex-1"> 
            <View className="flex-row flex-wrap gap-2 justify-start">

                {
                    authoritiesOption.map((item, index) => (
                        <AuthoritiesButton 
                            key={index}
                            title={item.title} 
                            Icon={{iconName: item.iconName, iconFrom: item.iconFrom}} 
                            onPress={() => handleChooseOption(item.title)}
                            active={selected === item.title}
                            isSubmitted={submitted} />
                    ))
                }


    
            </View>

            <View className=" h-20 mt-9 flex-row bg-[#e5e7eb] border rounded-2xl justify-center" style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
            }}>
                <View className="m-3 mt-4">
                    <Ionicons name="location-outline" size={35} color="black" />
                </View>
                <Text className="flex-1 self-center text-lg font-bold " >Dela Paz, San Simon, Pampanga</Text>

            </View>

            <BottomSheetTextInput 
                onChangeText={setExtra}
                placeholder="Input extra details here..."
                placeholderTextColor={"black"}
                multiline={true}
                className="p-4 mt-4 h-24 bg-[#e5e7eb]  rounded-2xl border " style={{shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
                }} />

            <View className=" h-20 mt-9 bg-[#e5e7eb] rounded-2xl justify-center" style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
            }} >

                <Pressable 
                    className="flex-1 border rounded-2xl justify-center items-center"
                    style={{
                        backgroundColor: submitted ? ACTIVE_COLOR : INACTIVE_COLOR
                    }}
                    onPress={() => handleSubmit()}
                    disabled={submitted}
                >
                    <Text className="text-white text-3xl font-bold" > Request Assistance </Text>
                </Pressable>
            </View>

        </BottomSheetView>
    )
}