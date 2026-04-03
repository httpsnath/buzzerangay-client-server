import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationType = {
    latitude: number;
    longitude: number;
} | null;

const LocationContext = createContext<{
    location: LocationType;
    loading: boolean;
    errorMsg: string | null;
}>({
    location: null,
    loading: true,
    errorMsg: null,
});

export const LocationProvider = ({ children }: any) => {
    const [location, setLocation] = useState<LocationType>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        const startWatching = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                setLoading(false);
                return;
            }

            // WatchPositionAsync returns a subscription object
            subscription = await Location.watchPositionAsync(
                {
                    // High accuracy is better for navigation, balanced for battery
                    accuracy: Location.Accuracy.High, 
                    // Minimum distance (in meters) to wait before updating
                    distanceInterval: 5, 
                    // Minimum time (in ms) to wait before updating
                    timeInterval: 1000, 
                },
                (newLocation) => {
                    // This callback runs every time the location changes
                    setLocation({
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                    });
                    setLoading(false);
                }
            );
        };

        startWatching();

        // CLEANUP: Important to stop the subscription when the component unmounts
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <LocationContext.Provider value={{ location, loading, errorMsg }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);