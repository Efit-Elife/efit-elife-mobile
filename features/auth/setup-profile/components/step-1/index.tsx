import React, { useEffect } from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

import { basicInfoSchema, type BasicInfoSchemaType } from "./lib/schema";
import useSetupProfile from "@/features/auth/setup-profile/store/useSetupProfile";

const GENDER_OPTIONS = ["Male", "Female", "Other"] as const;

const SetupProfileStep1 = () => {
  const router = useRouter();
  const { user } = useUser();
  const { basicInfo, setBasicInfo, markStepComplete } = useSetupProfile();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<BasicInfoSchemaType>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: basicInfo.firstName || "",
      lastName: basicInfo.lastName || "",
      weight: basicInfo.weight || undefined,
      height: basicInfo.height || undefined,
      age: basicInfo.age || undefined,
      gender: basicInfo.gender || "Male",
    },
  });

  // Pre-fill with Clerk user data if available
  useEffect(() => {
    if (user?.firstName) {
      setValue("firstName", user.firstName);
    }
    if (user?.lastName) {
      setValue("lastName", user.lastName);
    }
  }, [user, setValue]);

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (data: BasicInfoSchemaType) => {
    setBasicInfo(data);
    markStepComplete(1);
    router.push("/(auth)/setup-profile/step-2");
  };

  return (
    <AuthLayout>
      <VStack className="max-w-[440px] w-full h-full" space="4xl">
        <VStack className="items-center">
          <Heading className="text-center" size="3xl">
            Basic Information
          </Heading>
          <Text className="text-center">Let's get to know you better</Text>
        </VStack>

        <VStack className="items-center" space="lg">
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors.firstName}>
              <FormControlLabel>
                <FormControlLabelText>First Name</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      placeholder="Enter your first name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.firstName?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.lastName}>
              <FormControlLabel>
                <FormControlLabelText>Last Name</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      placeholder="Enter your last name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.lastName?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.weight}>
              <FormControlLabel>
                <FormControlLabelText>Weight (kg)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="weight"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Enter your weight in kg"
                      value={value?.toString() || ""}
                      onChangeText={(text) => onChange(Number(text))}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.weight?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.height}>
              <FormControlLabel>
                <FormControlLabelText>Height (cm)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="height"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Enter your height in cm"
                      value={value?.toString() || ""}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.height?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.age}>
              <FormControlLabel>
                <FormControlLabelText>Age</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="age"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Enter your age"
                      value={value?.toString() || ""}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.age?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.gender}>
              <FormControlLabel>
                <FormControlLabelText>Gender</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="gender"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <HStack className="space-x-2">
                    {GENDER_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        variant={value === option ? "solid" : "outline"}
                        size="sm"
                        className={
                          value === option
                            ? "flex-1 bg-primary-600"
                            : "flex-1 border-gray-400"
                        }
                        onPress={() => onChange(option)}
                      >
                        <ButtonText>{option}</ButtonText>
                      </Button>
                    ))}
                  </HStack>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.gender?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          <Button className="w-full mt-4" onPress={handleSubmit(onSubmit)}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </AuthLayout>
  );
};

export default SetupProfileStep1;
