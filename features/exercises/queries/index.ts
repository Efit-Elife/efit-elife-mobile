import { queryOptions } from "@tanstack/react-query";
import { ExerciseQueryKey } from "./key";
import { getAllExercise, getExerciseByName, getExerciseById } from "../apis";

export const getExercisesQuery = () => {
  return queryOptions({
    queryKey: [ExerciseQueryKey.GetExercisesQuery],
    queryFn: async () => {
      return await getAllExercise();
    },
  });
};

export const getExerciseQuery = (id: string) => {
  return queryOptions({
    queryKey: [ExerciseQueryKey.GetExerciseQuery, id],
    queryFn: async () => {
      const exercise = await getExerciseById(id);
      return exercise;
    },
  });
};

export const getExercisesByNameQuery = (name: string) => {
  return queryOptions({
    queryKey: [ExerciseQueryKey.GetExerciseQuery, name],
    queryFn: async () => {
      const exercises = await getExerciseByName(name);
      return exercises;
    },
  });
};
