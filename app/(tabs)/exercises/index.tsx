import React from "react";
import { useRouter } from "expo-router";

import useExerciseStore from "@/features/exercises/store/useExerciseStore";
import ExerciseList from "@/features/exercises/components/ExerciseList";

const ExerciseScreen = () => {
  const { exercises, getExerciseById } = useExerciseStore();
  const router = useRouter();

  const handleOnPress = (id: string) => {
    const exercise = getExerciseById(id);
    if (exercise?.isPremium) {
      return;
    }
    router.push({
      pathname: "/exercises/[id]",
      params: { id },
    });
  };

  return <ExerciseList exercises={exercises} onPress={handleOnPress} />;
};

export default ExerciseScreen;
