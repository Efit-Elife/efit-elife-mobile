import MapView, { Marker, Polyline } from "react-native-maps";
import { LocationObject } from "expo-location";
import { RefObject } from "react";

interface Props {
  location: LocationObject;
  routeCoords: { latitude: number; longitude: number }[];
  mapRef: RefObject<MapView | null>;
}

const Map = ({ location, routeCoords, mapRef }: Props) => {
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      showsUserLocation
      followsUserLocation
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Vị trí của bạn"
      />

      {routeCoords.length > 1 && (
        <Polyline
          coordinates={routeCoords}
          strokeColor="#1E90FF"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};

export default Map;
