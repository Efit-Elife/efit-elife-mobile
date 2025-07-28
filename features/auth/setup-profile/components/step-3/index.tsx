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

import {
  nutritionInfoSchema,
  type NutritionInfoSchemaType,
} from "./lib/schema";
import useSetupProfile from "@/features/auth/setup-profile/store/useSetupProfile";

const FOOD_PORTION_OPTIONS = [
  "Small",
  "Medium",
  "Large",
  "Extra Large",
] as const;

const FOOD_TYPE_OPTIONS = [
  "Fast Food",
  "Home Cooked",
  "Restaurant",
  "Processed Foods",
  "Whole Foods",
  "Organic",
] as const;

const DRINK_OPTIONS = [
  "Water",
  "Coffee",
  "Tea",
  "Juice",
  "Soda",
  "Sports Drinks",
  "Alcoholic Beverages",
] as const;

const SetupProfileStep3 = () => {
  const router = useRouter();
  const { nutritionInfo, setNutritionInfo, markStepComplete } =
    useSetupProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NutritionInfoSchemaType>({
    resolver: zodResolver(nutritionInfoSchema),
    defaultValues: {
      dailyFoodPortion: nutritionInfo.dailyFoodPortion || "",
      favoriteTypeOfFood: nutritionInfo.favoriteTypeOfFood || "",
      favoriteDrink: nutritionInfo.favoriteDrink || "",
      dailyWaterIntake: nutritionInfo.dailyWaterIntake || undefined,
    },
  });

  const handleKeyPress = () => {
    Keyboard.dismiss();
  };

  const handlePrevious = () => {
    router.push("/(auth)/setup-profile/step-2");
  };

  const onSubmit = (data: NutritionInfoSchemaType) => {
    setNutritionInfo(data);
    markStepComplete(3);
    router.push("/(auth)/setup-profile/step-4");
  };

  return (
    <AuthLayout>
      <VStack className="max-w-[440px] w-full h-full" space="4xl">
        <VStack className="items-center">
          <Heading className="text-center" size="3xl">
            Nutrition Information
          </Heading>
          <Text className="text-center">
            Tell us about your nutrition habits
          </Text>
        </VStack>

        <VStack className="items-center" space="lg">
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!!errors.dailyFoodPortion}>
              <FormControlLabel>
                <FormControlLabelText>Daily Food Portion</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="dailyFoodPortion"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <HStack className="flex-wrap">
                    {FOOD_PORTION_OPTIONS.map((option) => (
                      <Button
                        key={option}
                        variant={value === option ? "solid" : "outline"}
                        size="sm"
                        className="mr-2 mb-2 flex-1"
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
                  {errors.dailyFoodPortion?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.favoriteTypeOfFood}>
              <FormControlLabel>
                <FormControlLabelText>
                  Favorite Type of Food
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="favoriteTypeOfFood"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <VStack className="space-y-2">
                    {FOOD_TYPE_OPTIONS.map((option) => (
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
                  {errors.favoriteTypeOfFood?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.favoriteDrink}>
              <FormControlLabel>
                <FormControlLabelText>Favorite Drink</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="favoriteDrink"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <VStack className="space-y-2">
                    {DRINK_OPTIONS.map((option) => (
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
                  {errors.favoriteDrink?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.dailyWaterIntake}>
              <FormControlLabel>
                <FormControlLabelText>
                  Daily Water Intake (liters)
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="dailyWaterIntake"
                control={control}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input>
                    <InputField
                      value={value?.toString()}
                      placeholder="Enter your daily water intake in liters"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertTriangle} size="md" />
                <FormControlErrorText>
                  {errors.dailyWaterIntake?.message}
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

export default SetupProfileStep3;
