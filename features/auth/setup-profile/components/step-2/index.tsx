import React from "react";
import { Keyboard } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

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

import { trainingInfoSchema, type TrainingInfoSchemaType } from "./lib/schema";
import useSetupProfile from "@/features/auth/setup-profile/store/useSetupProfile";

const INTENSITY_OPTIONS = ["Low", "Moderate", "High"] as const;

const TRAINING_GOAL_OPTIONS = [
  "Weight Loss",
  "Muscle Gain",
  "Improve Fitness",
  "Maintain Health",
  "Sport Performance",
] as const;

const DIET_OPTIONS = [
  "Regular",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Keto",
  "Low Carb",
  "Paleo",
  "Intermittent Fasting",
] as const;

const SetupProfileStep2 = () => {
  const router = useRouter();
  const { trainingInfo, setTrainingInfo, markStepComplete } = useSetupProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingInfoSchemaType>({
    resolver: zodResolver(trainingInfoSchema),
    defaultValues: {
      trainingGoal: trainingInfo.trainingGoal || "",
      exerciseIntensity: trainingInfo.exerciseIntensity || "Moderate",
      tdee: trainingInfo.tdee || undefined,
      favoriteSport: trainingInfo.favoriteSport || "",
      weeklyTrainingFrequency:
        trainingInfo.weeklyTrainingFrequency || undefined,
      currentDiet: trainingInfo.currentDiet || "",
    },
  });

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  const handlePrevious = () => {
    router.push("/(auth)/setup-profile/step-1");
  };

  const onSubmit = (data: TrainingInfoSchemaType) => {
    setTrainingInfo(data);
    markStepComplete(2);
    router.push("/(auth)/setup-profile/step-3");
  };

  return (
    <AuthLayout>
      <VStack className="max-w-[440px] w-full h-full" space="4xl">
        <VStack className="items-center">
          <Heading className="text-center" size="3xl">
            Training Information
          </Heading>
          <Text className="text-center">
            Tell us about your fitness journey
          </Text>
        </VStack>

        <VStack className="items-center" space="lg">
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors.trainingGoal}>
              <FormControlLabel>
                <FormControlLabelText>Training Goal</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="trainingGoal"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <VStack className="space-y-2">
                    {TRAINING_GOAL_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        variant={value === option ? "solid" : "outline"}
                        size="sm"
                        className={
                          value === option
                            ? "w-full bg-primary-600"
                            : "w-full border-gray-400"
                        }
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
                  {errors.trainingGoal?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.exerciseIntensity}>
              <FormControlLabel>
                <FormControlLabelText>Exercise Intensity</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="exerciseIntensity"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <HStack className="space-x-2">
                    {INTENSITY_OPTIONS.map((option) => (
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
                  {errors.exerciseIntensity?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.tdee}>
              <FormControlLabel>
                <FormControlLabelText>
                  TDEE (Total Daily Energy Expenditure)
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="tdee"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="Enter your TDEE in calories"
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
                  {errors.tdee?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.favoriteSport}>
              <FormControlLabel>
                <FormControlLabelText>Favorite Sport</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="favoriteSport"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      placeholder="Enter your favorite sport"
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
                  {errors.favoriteSport?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.weeklyTrainingFrequency}>
              <FormControlLabel>
                <FormControlLabelText>
                  Weekly Training Frequency
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="weeklyTrainingFrequency"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      placeholder="How many times per week?"
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
                  {errors.weeklyTrainingFrequency?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.currentDiet}>
              <FormControlLabel>
                <FormControlLabelText>Current Diet</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="currentDiet"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <VStack className="space-y-2">
                    {DIET_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        variant={value === option ? "solid" : "outline"}
                        size="sm"
                        className={
                          value === option
                            ? "w-full bg-primary-600"
                            : "w-full border-gray-400"
                        }
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
                  {errors.currentDiet?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          <HStack className="w-full justify-between mt-4">
            <Button
              variant="outline"
              className="flex-1 mr-2"
              onPress={handlePrevious}
            >
              <ButtonText>Back</ButtonText>
            </Button>
            <Button className="flex-1 ml-2" onPress={handleSubmit(onSubmit)}>
              <ButtonText>Continue</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </AuthLayout>
  );
};

export default SetupProfileStep2;
