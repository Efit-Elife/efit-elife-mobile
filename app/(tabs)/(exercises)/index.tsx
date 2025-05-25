import React from "react";
import { useRouter } from "expo-router";

import useExerciseStore from "@/features/exercises/store/useExerciseStore";
import ExerciseList from "@/features/exercises/components/ExerciseList";

const ExerciseScreen = () => {
  const { exercises } = useExerciseStore();
  const router = useRouter();

  const handleOnPress = (id: string) => {
    router.push(`/(tabs)/(exercises)/details/${id}`);
  };

  return <ExerciseList exercises={exercises} onPress={handleOnPress} />;
};

export default ExerciseScreen;
