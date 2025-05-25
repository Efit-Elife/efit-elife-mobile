import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Stack } from "expo-router";
import { Exercise } from "@/types/common";

type ExerciseDetailsProps = {
  id: string;
  exercise: Exercise;
};

const ExerciseDetails = ({ exercise, id }: ExerciseDetailsProps) => {
  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ title: exercise.name }} />
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2 text-black">
            {exercise.name}
          </Text>
          <Text className="text-md mb-4">
            Difficulty: {exercise.difficulty}
          </Text>
          <Text className="mb-6">{exercise.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetails;
