import { useRouter } from "expo-router";
import ExerciseList from "@/features/exercises/components/ExerciseList";
import { useQuery } from "@tanstack/react-query";
import { getExercisesQuery } from "@/features/exercises/queries/index";

const ExerciseScreen = () => {
  const router = useRouter();

  const { data = [], isLoading } = useQuery(getExercisesQuery());

  const handleOnPress = (id: string) => {
    router.push({
      pathname: "/exercises/[id]",
      params: { id },
    });
  };

  return (
    <ExerciseList
      exercises={data}
      onPress={handleOnPress}
      isLoading={isLoading}
    />
  );
};

export default ExerciseScreen;
