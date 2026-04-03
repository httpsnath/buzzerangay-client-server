import EngineProvider from "@/context/EngineContext";
import { LocationProvider } from "@/context/LocationContext";
import { Stack } from "expo-router";



export default function RootLayout() {
    return (
        <EngineProvider>
            <LocationProvider>
                    <Stack screenOptions={{headerShown: false}} >
                        <Stack.Screen name="(main)/(tabs)" />
                    </Stack>
            </LocationProvider>
        </EngineProvider>

    )

}