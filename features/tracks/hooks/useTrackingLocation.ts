import { useCallback, useRef, useState } from "react";
import { LocationObject } from "expo-location";
import { RouteCoords, saveRouteToFirestore } from "../apis";
import { useUser } from "@clerk/clerk-expo";

export default function useTrackingLocation() {
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
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

  // Save route
  const saveRoute = async (routeName: string) => {
    const currentRoute = [...routeCoords];
    setIsSaving(true);
    try {
      const saved = await saveRouteToFirestore(
        currentRoute,
        user?.id || "unknown",
        routeName
      );

      if (saved) {
        setRouteCoords([]);
      }
    } catch (err) {
      console.error("Failed to save route", err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    location,
    routeCoords,
    locationCallback,
    saveRoute,
    isSaving,
  };
}
