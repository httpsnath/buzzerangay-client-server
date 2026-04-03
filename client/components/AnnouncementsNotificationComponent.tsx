import { Image, Text, View, StyleSheet } from "react-native";

export default function AnnouncementNotification({
    from,
    time,
    avatar,
    title,
    content,
    image
}: {
    from: string,
    time: string,
    avatar: any,
    title: string,
    content: string,
    image?: any
}) {

    return (
        <View className="m-3 mt-4 border my-1 rounded-3xl flex-1 p-6" style={{
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
                    <Text className="text-xl">{from}</Text>
                    <View className="h-[1px] bg-black w-full rounded-lg" />
                    <Text className="text-s">{time}</Text>
                </View>
            </View>

            <View>
                <View className="flex-1">
                    <Text className=" font-semibold text-2xl">{title}</Text>
                    <View className=" my-1 h-[1px] bg-black w-full rounded-lg" />
                    <Text className="text-s text-justify ">{content}</Text>
                </View>
            </View>
        </View>
    )
}