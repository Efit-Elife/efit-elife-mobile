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
import {
  useRef,
  useEffect,
  useState,
  useOptimistic,
  startTransition,
} from "react";
import { Center } from "@/components/ui/center";
import { RouteItem } from "@/types/common";
import { LocationObject } from "expo-location";
import MapView from "react-native-maps";
import Map from "@/features/tracks/components/Map";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import { useDeleteRouteMutation, useEditNameMutation } from "../mutations";
import { useUser } from "@clerk/clerk-expo";
import ChangeNameModal from "./ChangeNameModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
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
  const { user } = useUser();
  const editNameMutation = useEditNameMutation(user?.id || "");
  const deleteMutation = useDeleteRouteMutation(user?.id || "");
  const [openChangeNameModal, setOpenChangeNameModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [optimisticName, setOptimisticName] = useOptimistic(item.routeName);

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

  const handleEditSubmit = (newName: string) => {
    if (newName.trim() === "") {
      return;
    }
    startTransition(() => {
      setOptimisticName(newName);
    });

    editNameMutation.mutate({
      newName,
      routeId: item.id,
    });
  };

  const handleDeleteSubmit = () => {
    deleteMutation.mutate(item.id);
    setOpenDeleteModal(false);
    handleClose();
  };

  return (
    <Center>
      <ChangeNameModal
        handleClose={() => setOpenEditModal(false)}
        showModal={openEditModal}
        onSubmit={handleEditSubmit}
      />
      <DeleteConfirmModal
        handleClose={() => setOpenDeleteModal(false)}
        showModal={openDeleteModal}
        onSubmit={handleDeleteSubmit}
      />
      <Modal isOpen={showModal} onClose={handleClose} size="lg">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {optimisticName}
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400"
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
            <View className="flex-row justify-center items-center gap-2 mt-4">
              <Button
                className="bg-yellow-500 border-0"
                onPress={() => setOpenEditModal(true)}
              >
                <Icon as={EditIcon} size="lg" />
              </Button>
              <Button
                className="bg-red-500 border-0"
                onPress={() => setOpenDeleteModal(true)}
              >
                <Icon as={TrashIcon} size="lg" />
              </Button>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
