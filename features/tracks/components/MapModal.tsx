import { Heading } from "@/components/ui/heading";
import { Icon, CloseIcon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { useRef, useEffect } from "react";
import { Center } from "@/components/ui/center";
import { RouteItem } from "@/types/common";
import { LocationObject } from "expo-location";
import MapView from "react-native-maps";
import Map from "@/features/tracks/components/Map";
import { View } from "react-native";

type MapModalProps = {
  showModal: boolean;
  handleClose: () => void;
  item: RouteItem;
};

export default function MapModal({
  showModal,
  handleClose,
  item,
}: MapModalProps) {
  const mapRef = useRef<MapView>(null);

  const location: LocationObject = {
    coords: {
      latitude: item.route?.[0]?.latitude ?? 0,
      longitude: item.route?.[0]?.longitude ?? 0,
      accuracy: 1,
      altitude: 0,
      altitudeAccuracy: 1,
      heading: 0,
      speed: 0,
    },
    timestamp: (item.createdAt?.seconds ?? Date.now() / 1000) * 1000,
  };

  useEffect(() => {
    if (showModal && mapRef.current && item.route?.length > 1) {
      setTimeout(() => {
        mapRef.current?.fitToCoordinates(item.route, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      }, 300);
    }
  }, [showModal, item.route]);

  return (
    <Center>
      <Modal isOpen={showModal} onClose={handleClose} size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {item.routeName || "Route Map"}
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View className="w-full h-[50vh] rounded-xl overflow-hidden">
              <Map
                location={location}
                routeCoords={item.route ?? []}
                mapRef={mapRef}
              />
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
