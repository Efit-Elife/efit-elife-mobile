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
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
type TrackFormModalProps = {
  showModal: boolean;
  handleClose: () => void;
  onSubmit: (routeName: string) => void;
};

export default function ChangeNameModal({
  showModal,
  handleClose,
  onSubmit,
}: TrackFormModalProps) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      setIsInvalid(true);
      return;
    }
    onSubmit(inputValue.trim());
    setInputValue("");
    setIsInvalid(false);
    handleClose();
  };
  return (
    <Center>
      <Modal isOpen={showModal} onClose={handleClose} size="sm">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Edit Modal
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
            <FormControl size="md" isInvalid={isInvalid}>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="text"
                  placeholder="Route Name"
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  Please enter a track name.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              className="border-2 border-gray-300"
            >
              <ButtonText className="text-gray-300">Cancel</ButtonText>
            </Button>
            <Button onPress={() => handleSubmit()}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
