import MapView, { Marker, Polyline } from "react-native-maps";
import { LocationObject } from "expo-location";
import { RefObject } from "react";
import { RouteCoords } from "@/types/common";

interface Props {
  location: LocationObject;
  routeCoords: RouteCoords[];
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
        <>
          <Polyline
            coordinates={routeCoords}
            strokeColor="#1E90FF"
            strokeWidth={4}
          />
          <Marker
            coordinate={routeCoords[routeCoords.length - 1]}
            title="Điểm kết thúc"
            pinColor="red"
          />
        </>
      )}
    </MapView>
  );
};

export default Map;
