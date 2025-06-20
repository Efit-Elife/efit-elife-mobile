import { useCallback, useState } from "react";
import { LocationObject } from "expo-location";
import { RouteCoords } from "@/types/common";
import { useUser } from "@clerk/clerk-expo";
import { useSaveRouteMutation } from "../mutations";
export default function useTrackingLocation() {
  const { user } = useUser();
  const { mutate, isPending } = useSaveRouteMutation();
  const [location, setLocation] = useState<LocationObject>({
    coords: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      altitude: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: Date.now(),
  });
  const [routeCoords, setRouteCoords] = useState<RouteCoords[]>([]);

  const locationCallback = useCallback((loc: LocationObject) => {
    setLocation(loc);
    setRouteCoords((prev) => [
      ...prev,
      { latitude: loc.coords.latitude, longitude: loc.coords.longitude },
    ]);
  }, []);

  const saveRoute = async (routeName: string) => {
    const currentRoute = [...routeCoords];
    mutate(
      {
        currentRoute,
        userId: user?.id || "unknown",
        routeName,
      },
      {
        onSuccess: () => {
          setRouteCoords([]);
        },
      }
    );
  };

  const clearRoute = () => {
    setRouteCoords([]);
  };

  return {
    location,
    routeCoords,
    locationCallback,
    saveRoute,
    isPending,
    clearRoute,
  };
}
