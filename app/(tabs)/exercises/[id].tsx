import { useLocalSearchParams } from "expo-router";
import ExerciseDetails from "@/features/exercises/components/ExerciseDetails";
import Notfound from "@/components/List/Notfound";
import { getExerciseQuery } from "@/features/exercises/queries/index";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { View } from "react-native";
const ExerciseDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const { data: exercise, isLoading } = useQuery(
    getExerciseQuery(id as string)
  );

  if (isLoading) {
    return (
      <View className="items-center justify-center">
        <Spinner />
      </View>
    );
  }

  if (!exercise) {
    return <Notfound />;
  }

  return <ExerciseDetails exercise={exercise} id={id as string} />;
};

export default ExerciseDetailsScreen;
