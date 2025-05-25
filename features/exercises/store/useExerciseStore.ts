import { create } from "zustand";
import { Exercise } from "@/types/common";

type ExerciseStore = {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  clearExercises: () => void;
  getExerciseById: (id: string) => Exercise | undefined;
};

// mock data for exercises
const exerciseData: Exercise[] = [
  {
    id: "1",
    name: "Push-ups",
    difficulty: "Beginner",
    description: "A basic upper body exercise.",
    isPremium: false,
  },
  {
    id: "2",
    name: "Pull-ups",
    difficulty: "Intermediate",
    description: "An advanced upper body exercise.",
    isPremium: false,
  },
  {
    id: "3",
    name: "Squats",
    difficulty: "Beginner",
    description: "A fundamental lower body exercise.",
    isPremium: false,
  },
  {
    id: "4",
    name: "Deadlifts",
    difficulty: "Advanced",
    description: "A complex lower body exercise.",
    isPremium: true,
  },
  {
    id: "5",
    name: "Lunges",
    difficulty: "Beginner",
    description: "A great exercise for leg strength.",
    isPremium: false,
  },
  {
    id: "6",
    name: "Planks",
    difficulty: "Intermediate",
    description: "A core stability exercise.",
    isPremium: false,
  },
  {
    id: "7",
    name: "Burpees",
    difficulty: "Advanced",
    description: "A full body exercise that combines strength and cardio.",
    isPremium: true,
  },
  {
    id: "8",
    name: "Mountain Climbers",
    difficulty: "Intermediate",
    description: "A dynamic exercise for core and cardio.",
    isPremium: false,
  },
  {
    id: "9",
    name: "Bicep Curls",
    difficulty: "Beginner",
    description: "An isolation exercise for the biceps.",
    isPremium: false,
  },
  {
    id: "10",
    name: "Tricep Dips",
    difficulty: "Intermediate",
    description: "An effective exercise for tricep strength.",
    isPremium: false,
  },
];

const useExerciseStore = create<ExerciseStore>()((set, get) => {
  return {
    exercises: [...exerciseData],
    addExercise: (exercise) =>
      set((state) => ({
        exercises: [...state.exercises, exercise],
      })),
    removeExercise: (exerciseId) =>
      set((state) => ({
        exercises: state.exercises.filter(
          (exercise) => exercise.id !== exerciseId
        ),
      })),

    clearExercises: () => set({ exercises: [] }),

    getExerciseById: (id) =>
      get().exercises.find((exercise) => exercise.id === id),
  };
});

export default useExerciseStore;
