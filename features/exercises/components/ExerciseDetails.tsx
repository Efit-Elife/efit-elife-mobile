import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Exercise } from "@/types/common";
import FocusArea from "./FocusArea";
type ExerciseDetailsProps = {
  id: string;
  exercise: Exercise;
};

const ExerciseDetails = ({ exercise, id }: ExerciseDetailsProps) => {
  return (
    <ScrollView className="p-4">
      <View>
        <Text className="text-3xl font-bold mb-2 text-black text-center">
          {exercise.name}
        </Text>
      </View>
      <View>
        <Image
          source={{
            uri: exercise.imageUrl || "https://picsum.photos/400/300",
          }}
          alt={exercise.name}
          className="rounded-md h-64 w-full bg-gray-200 mb-4"
        />
        <Text className="text-md mb-4 text-typography-400 text-right">
          Difficulty: {exercise.difficulty}
        </Text>
        <View className="mb-4">
          <Text className="text-2xl font-bold mb-2 text-black">
            Instructions
          </Text>
          <Text className="text-lg text-typography-100 text-justify">
            {exercise.instruction}
          </Text>
        </View>
        <Text className="text-2xl font-bold mb-3 text-black">Focus Area</Text>
        <View className="flex-row flex-wrap gap-4">
          {exercise.tags.map((area) => {
            return <FocusArea key={area} tag={area} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetails;
