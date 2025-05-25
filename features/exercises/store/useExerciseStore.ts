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
    instruction:
      "Start in a high plank position with your hands shoulder-width apart. Keep your body in a straight line from head to heels. Lower yourself until your chest nearly touches the floor, then push back up to the starting position while engaging your core and glutes.",
    tags: ["chest", "triceps", "shoulders", "core"],
  },
  {
    id: "2",
    name: "Pull-ups",
    difficulty: "Intermediate",
    description: "An advanced upper body exercise.",
    isPremium: false,
    instruction:
      "Hang from a bar with your palms facing away and your hands slightly wider than shoulder-width. Pull your body up until your chin passes the bar, keeping your chest lifted and shoulders down. Lower yourself with control to the starting position.",
    tags: ["back", "biceps", "shoulders"],
  },
  {
    id: "3",
    name: "Squats",
    difficulty: "Beginner",
    description: "A fundamental lower body exercise.",
    isPremium: false,
    instruction:
      "Stand with your feet shoulder-width apart. Keeping your chest up and back straight, lower your hips as if sitting into a chair. Go down until your thighs are parallel to the ground, then push through your heels to return to standing.",
    tags: ["quads", "glutes", "hamstrings", "core"],
  },
  {
    id: "4",
    name: "Deadlifts",
    difficulty: "Advanced",
    description: "A complex lower body exercise.",
    isPremium: true,
    instruction:
      "Stand with your feet under the barbell, bend at your hips and knees to grip the bar, and keep your back flat. As you lift, extend your hips and knees together, pulling the bar close to your body. Once standing upright, lower the bar in a controlled motion.",
    tags: ["glutes", "hamstrings", "lower back", "core"],
  },
  {
    id: "5",
    name: "Lunges",
    difficulty: "Beginner",
    description: "A great exercise for leg strength.",
    isPremium: false,
    instruction:
      "Step forward with one foot and lower your body until both knees are bent at 90 degrees. Keep your upper body upright and your core engaged. Push through the front heel to return to the starting position and repeat on the other side.",
    tags: ["quads", "glutes", "hamstrings"],
  },
  {
    id: "6",
    name: "Planks",
    difficulty: "Intermediate",
    description: "A core stability exercise.",
    isPremium: false,
    instruction:
      "Start in a forearm plank position with your elbows directly under your shoulders and your body in a straight line. Keep your core tight, glutes engaged, and avoid sagging your hips. Hold the position while maintaining steady breathing.",
    tags: ["core", "shoulders", "glutes"],
  },
  {
    id: "7",
    name: "Burpees",
    difficulty: "Advanced",
    description: "A full body exercise that combines strength and cardio.",
    isPremium: true,
    instruction:
      "From a standing position, drop into a squat and place your hands on the floor. Kick your feet back into a plank, do a push-up, then jump your feet forward and explode upward into a jump. Land softly and repeat.",
    tags: ["full body", "chest", "legs", "core"],
  },
  {
    id: "8",
    name: "Mountain Climbers",
    difficulty: "Intermediate",
    description: "A dynamic exercise for core and cardio.",
    isPremium: false,
    instruction:
      "Start in a high plank position and alternate driving your knees toward your chest in a running motion. Keep your hips low and your core engaged throughout the movement for maximum effectiveness.",
    tags: ["core", "shoulders", "cardio"],
  },
  {
    id: "9",
    name: "Bicep Curls",
    difficulty: "Beginner",
    description: "An isolation exercise for the biceps.",
    isPremium: false,
    instruction:
      "Hold a dumbbell in each hand with your arms at your sides and palms facing forward. Keeping your elbows close to your torso, curl the weights toward your shoulders. Squeeze your biceps at the top, then lower slowly.",
    tags: ["biceps"],
  },
  {
    id: "10",
    name: "Tricep Dips",
    difficulty: "Intermediate",
    description: "An effective exercise for tricep strength.",
    isPremium: false,
    instruction:
      "Sit on the edge of a bench or chair with your hands beside your hips. Slide forward and lower your body by bending your elbows until your upper arms are parallel to the ground. Push through your palms to return to the top.",
    tags: ["triceps", "shoulders", "chest"],
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
