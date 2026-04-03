import { View , Text} from "react-native"


export default function Paragraph({title, subtitle, content}: {
    title?: string,
    subtitle: string,
    content: string
}) {


    return (
        <View className="my-1">
            {
            
                title ? <Text className="text-xl font-extrabold" >{title}</Text> : null
            }
            <View className="flex-row">
                <Text className="text-lg font-semibold" >{subtitle}</Text>
                <Text className="text-base mx-3 text-justify mt-[2]" >{content}</Text>
            </View>

        </View>
    )

    
}