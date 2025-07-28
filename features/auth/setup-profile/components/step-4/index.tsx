import React, { useState } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { AlertTriangle, CheckIcon, PlusIcon } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

import { medicalInfoSchema, type MedicalInfoSchemaType } from "./lib/schema";
import useSetupProfile from "@/features/auth/setup-profile/store/useSetupProfile";
import useCustomToast from "@/hooks/useCustomToast";
import { useSetupProfileMutation } from "@/services/auth/mutations";

const SMARTWATCH_OPTIONS = [
  "Apple Watch",
  "Fitbit",
  "Garmin",
  "Samsung Galaxy Watch",
  "Huawei Watch",
  "Other",
] as const;

const MEDICAL_CONDITIONS = [
  "None",
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Arthritis",
  "Allergies",
  "Other",
];

const SetupProfileStep4 = () => {
  const router = useRouter();
  const { mutate: setupProfile, isPending } = useSetupProfileMutation();
  const { toastError, toastSuccess } = useCustomToast();
  const {
    basicInfo,
    trainingInfo,
    nutritionInfo,
    medicalInfo,
    setMedicalInfo,
    markStepComplete,
  } = useSetupProfile();
  const [otherCondition, setOtherCondition] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MedicalInfoSchemaType>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      medicalConditions: medicalInfo.medicalConditions || [],
      usesSmartWatch: medicalInfo.usesSmartWatch || false,
      smartWatchType: medicalInfo.smartWatchType || "",
    },
  });

  const usesSmartWatch = watch("usesSmartWatch");
  const medicalConditions = watch("medicalConditions") || [];

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  const handlePrevious = () => {
    router.push("/(auth)/setup-profile/step-3");
  };

  const toggleMedicalCondition = (condition: string) => {
    const currentConditions = [...(medicalConditions || [])];

    // Special handling for "None" to clear other selections
    if (condition === "None") {
      if (currentConditions.includes("None")) {
        setValue("medicalConditions", []);
      } else {
        setValue("medicalConditions", ["None"]);
      }
      return;
    }

    // If selecting another condition, remove "None" from the list
    const updatedConditions = currentConditions.filter((c) => c !== "None");

    if (updatedConditions.includes(condition)) {
      setValue(
        "medicalConditions",
        updatedConditions.filter((c) => c !== condition)
      );
    } else {
      setValue("medicalConditions", [...updatedConditions, condition]);
    }
  };

  const addOtherCondition = () => {
    if (otherCondition.trim() && !medicalConditions.includes(otherCondition)) {
      MEDICAL_CONDITIONS.push(otherCondition.trim());
      setValue("medicalConditions", [
        ...medicalConditions.filter((c) => c !== "None"),
        otherCondition,
      ]);
      setOtherCondition("");
    }
  };

  const onSubmit = async (data: MedicalInfoSchemaType) => {
    setMedicalInfo(data);
    markStepComplete(4);

    setupProfile(
      {
        data: {
          ...basicInfo,
          ...trainingInfo,
          ...nutritionInfo,
          ...medicalInfo,
        },
      },
      {
        onSuccess: () => {
          toastSuccess("Profile setup completed successfully!");
        },
        onError: (error) => {
          toastError("Failed to complete profile setup");
          console.error(error);
        },
      }
    );
  };

  return (
    <AuthLayout>
      <VStack className="max-w-[440px] w-full h-full" space="4xl">
        <VStack className="items-center">
          <Heading className="text-center" size="3xl">
            Medical Information
          </Heading>
          <Text className="text-center">
            Please share any relevant health information
          </Text>
        </VStack>

        <VStack className="items-center" space="lg">
          <VStack space="xl" className="w-full">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>
                  Medical Conditions (select all that apply)
                </FormControlLabelText>
              </FormControlLabel>
              <VStack className="space-y-2 mt-2">
                {MEDICAL_CONDITIONS.map((condition) => (
                  <Checkbox
                    key={condition}
                    value={condition}
                    isChecked={medicalConditions.includes(condition)}
                    onChange={() => toggleMedicalCondition(condition)}
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>{condition}</CheckboxLabel>
                  </Checkbox>
                ))}

                {/* Custom medical condition input */}
                {!medicalConditions.includes("None") && (
                  <HStack className="items-center mt-2">
                    <Input className="flex-1 mr-2">
                      <InputField
                        placeholder="Add other condition"
                        value={otherCondition}
                        onChangeText={setOtherCondition}
                        onSubmitEditing={addOtherCondition}
                        returnKeyType="done"
                      />
                    </Input>
                    <Button size="sm" onPress={addOtherCondition}>
                      <PlusIcon size={16} color="white" />
                    </Button>
                  </HStack>
                )}
              </VStack>
            </FormControl>

            <FormControl>
              <Controller
                name="usesSmartWatch"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    value="usesSmartWatch"
                    isChecked={value}
                    onChange={onChange}
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      I use a smart watch for fitness tracking
                    </CheckboxLabel>
                  </Checkbox>
                )}
              />
            </FormControl>

            {usesSmartWatch && (
              <FormControl isInvalid={!!errors.smartWatchType}>
                <FormControlLabel>
                  <FormControlLabelText>Smart Watch Type</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  name="smartWatchType"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <VStack className="space-y-2">
                      {SMARTWATCH_OPTIONS.map((option) => (
                        <Button
                          key={option}
                          variant={value === option ? "solid" : "outline"}
                          size="sm"
                          className="w-full"
                          onPress={() => onChange(option)}
                        >
                          <ButtonText>{option}</ButtonText>
                        </Button>
                      ))}
                    </VStack>
                  )}
                />
                <FormControlError>
                  <FormControlErrorIcon as={AlertTriangle} size="md" />
                  <FormControlErrorText>
                    {errors.smartWatchType?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          </VStack>

          <HStack className="w-full justify-between mt-4">
            <Button
              variant="outline"
              className="flex-1 mr-2"
              onPress={handlePrevious}
              isDisabled={isPending}
            >
              <ButtonText>Back</ButtonText>
            </Button>
            <Button
              className="flex-1 ml-2"
              onPress={handleSubmit(onSubmit)}
              isDisabled={isPending}
            >
              {isPending ? (
                <Spinner color="white" />
              ) : (
                <ButtonText>Complete Setup</ButtonText>
              )}
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </AuthLayout>
  );
};

export default SetupProfileStep4;
