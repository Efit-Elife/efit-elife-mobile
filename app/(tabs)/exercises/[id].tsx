import { useLocalSearchParams } from "expo-router";
import useExerciseStore from "@/features/exercises/store/useExerciseStore";
import ExerciseDetails from "@/features/exercises/components/ExerciseDetails";
import Notfound from "@/components/List/Notfound";
const ExerciseDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { getExerciseById } = useExerciseStore();

  const exercise = getExerciseById(id as string);
  if (!exercise) {
    return <Notfound />;
  }

  return <ExerciseDetails exercise={exercise} id={id as string} />;
};

export default ExerciseDetailsScreen;
