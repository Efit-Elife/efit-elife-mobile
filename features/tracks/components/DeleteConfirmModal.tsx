import { Heading } from "@/components/ui/heading";
import { Icon, CloseIcon, AlertCircleIcon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
type TrackFormModalProps = {
  showModal: boolean;
  handleClose: () => void;
  onSubmit: () => void;
};

export default function ChangeNameModal({
  showModal,
  handleClose,
  onSubmit,
}: TrackFormModalProps) {
  const handleSubmit = async () => {
    onSubmit();
    handleClose();
  };
  return (
    <Center>
      <Modal isOpen={showModal} onClose={handleClose} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Delete Modal
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
            <Text>Are you sure you want to delete this route?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" action="secondary" onPress={handleClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button onPress={() => handleSubmit()}>
              <ButtonText>Confirm</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
