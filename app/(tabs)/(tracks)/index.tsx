import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import useLocation from "@/hooks/useLocation";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Map from "@/features/tracks/components/Map";
import { startMockLocation, stopMockLocation } from "@/utils/mock-locations";
import useTrackingLocation from "@/features/tracks/hooks/useTrackingLocation";
import MapView from "react-native-maps";

const Tracks = () => {
  const { location, locationCallback, routeCoords, isSaving, saveRoute } =
    useTrackingLocation();

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);
  const [error] = useLocation(true, locationCallback);

  useEffect(() => {
    if (mapRef && mapRef.current && location?.coords.latitude !== 0) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const handleToggleMock = () => {
    if (isTracking) {
      stopMockLocation();
      setIsTracking(false);
    } else {
      const { latitude, longitude } = location.coords;
      startMockLocation(latitude, longitude);
      setIsTracking(true);
    }
  };

  return (
    <View className="flex-1">
      {error && (
        <Text className="text-red-500 p-2">Error: {error.message}</Text>
      )}
      <Map location={location} routeCoords={routeCoords} mapRef={mapRef} />
      <View className="absolute bottom-[10%] left-0 right-0 items-center">
        <View className="flex-row gap-4">
          <Button
            className="bg-blue-500 px-6 py-2 min-w-[130px]"
            onPress={handleToggleMock}
          >
            <ButtonText>
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </ButtonText>
          </Button>

          <Button
            className="bg-green-500 px-6 py-2 min-w-[130px]"
            onPress={saveRoute}
            disabled={isSaving || isTracking || routeCoords.length < 2}
          >
            <ButtonText>Save Route</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Tracks;
