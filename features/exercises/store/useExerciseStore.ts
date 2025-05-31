import { create } from "zustand";
import { Exercise } from "@/types/common";

// mock data for exercises
// const exerciseData: Exercise[] = [
//   {
//     id: "1",
//     name: "Push-ups",
//     difficulty: "Beginner",
//     description: "A basic upper body exercise.",
//     isPremium: false,
//     instruction:
//       "Start in a high plank position with your hands shoulder-width apart. Keep your body in a straight line from head to heels. Lower yourself until your chest nearly touches the floor, then push back up to the starting position while engaging your core and glutes.",
//     tags: ["chest", "triceps", "shoulders", "core"],
//   },
//   {
//     id: "2",
//     name: "Pull-ups",
//     difficulty: "Intermediate",
//     description: "An advanced upper body exercise.",
//     isPremium: false,
//     instruction:
//       "Hang from a bar with your palms facing away and your hands slightly wider than shoulder-width. Pull your body up until your chin passes the bar, keeping your chest lifted and shoulders down. Lower yourself with control to the starting position.",
//     tags: ["back", "biceps", "shoulders"],
//   },
//   {
//     id: "3",
//     name: "Squats",
//     difficulty: "Beginner",
//     description: "A fundamental lower body exercise.",
//     isPremium: false,
//     instruction:
//       "Stand with your feet shoulder-width apart. Keeping your chest up and back straight, lower your hips as if sitting into a chair. Go down until your thighs are parallel to the ground, then push through your heels to return to standing.",
//     tags: ["quads", "glutes", "hamstrings", "core"],
//   },
//   {
//     id: "4",
//     name: "Deadlifts",
//     difficulty: "Advanced",
//     description: "A complex lower body exercise.",
//     isPremium: true,
//     instruction:
//       "Stand with your feet under the barbell, bend at your hips and knees to grip the bar, and keep your back flat. As you lift, extend your hips and knees together, pulling the bar close to your body. Once standing upright, lower the bar in a controlled motion.",
//     tags: ["glutes", "hamstrings", "lower back", "core"],
//   },
//   {
//     id: "5",
//     name: "Lunges",
//     difficulty: "Beginner",
//     description: "A great exercise for leg strength.",
//     isPremium: false,
//     instruction:
//       "Step forward with one foot and lower your body until both knees are bent at 90 degrees. Keep your upper body upright and your core engaged. Push through the front heel to return to the starting position and repeat on the other side.",
//     tags: ["quads", "glutes", "hamstrings"],
//   },
//   {
//     id: "6",
//     name: "Planks",
//     difficulty: "Intermediate",
//     description: "A core stability exercise.",
//     isPremium: false,
//     instruction:
//       "Start in a forearm plank position with your elbows directly under your shoulders and your body in a straight line. Keep your core tight, glutes engaged, and avoid sagging your hips. Hold the position while maintaining steady breathing.",
//     tags: ["core", "shoulders", "glutes"],
//   },
//   {
//     id: "7",
//     name: "Burpees",
//     difficulty: "Advanced",
//     description: "A full body exercise that combines strength and cardio.",
//     isPremium: true,
//     instruction:
//       "From a standing position, drop into a squat and place your hands on the floor. Kick your feet back into a plank, do a push-up, then jump your feet forward and explode upward into a jump. Land softly and repeat.",
//     tags: ["full body", "chest", "legs", "core"],
//   },
//   {
//     id: "8",
//     name: "Mountain Climbers",
//     difficulty: "Intermediate",
//     description: "A dynamic exercise for core and cardio.",
//     isPremium: false,
//     instruction:
//       "Start in a high plank position and alternate driving your knees toward your chest in a running motion. Keep your hips low and your core engaged throughout the movement for maximum effectiveness.",
//     tags: ["core", "shoulders", "cardio"],
//   },
//   {
//     id: "9",
//     name: "Bicep Curls",
//     difficulty: "Beginner",
//     description: "An isolation exercise for the biceps.",
//     isPremium: false,
//     instruction:
//       "Hold a dumbbell in each hand with your arms at your sides and palms facing forward. Keeping your elbows close to your torso, curl the weights toward your shoulders. Squeeze your biceps at the top, then lower slowly.",
//     tags: ["biceps"],
//   },
//   {
//     id: "10",
//     name: "Tricep Dips",
//     difficulty: "Intermediate",
//     description: "An effective exercise for tricep strength.",
//     isPremium: false,
//     instruction:
//       "Sit on the edge of a bench or chair with your hands beside your hips. Slide forward and lower your body by bending your elbows until your upper arms are parallel to the ground. Push through your palms to return to the top.",
//     tags: ["triceps", "shoulders", "chest"],
//   },
//   {
//     id: "11",
//     name: "Leg Raises",
//     difficulty: "Beginner",
//     description: "A core exercise that targets the lower abs.",
//     isPremium: false,
//     instruction:
//       "Lie on your back with your legs straight. Keeping your lower back pressed into the floor, lift your legs toward the ceiling until they are perpendicular to the ground. Slowly lower them back down without touching the floor.",
//     tags: ["core", "hip flexors"],
//   },
//   {
//     id: "12",
//     name: "Russian Twists",
//     difficulty: "Intermediate",
//     description: "A rotational core exercise.",
//     isPremium: false,
//     instruction:
//       "Sit on the floor with your knees bent and lean back slightly. Hold a weight or medicine ball with both hands and twist your torso to one side, then to the other, while keeping your feet off the ground for added difficulty.",
//     tags: ["core", "obliques"],
//   },
//   {
//     id: "13",
//     name: "Jumping Jacks",
//     difficulty: "Beginner",
//     description: "A classic cardio exercise.",
//     isPremium: false,
//     instruction:
//       "Stand with your feet together and arms at your sides. Jump up, spreading your legs shoulder-width apart while raising your arms overhead. Jump back to the starting position and repeat.",
//     tags: ["cardio", "full body"],
//   },
//   {
//     id: "14",
//     name: "High Knees",
//     difficulty: "Intermediate",
//     description: "A high-intensity cardio exercise.",
//     isPremium: false,
//     instruction:
//       "Run in place while driving your knees up toward your chest as high as possible. Keep a quick pace and engage your core throughout the movement.",
//     tags: ["cardio", "legs", "core"],
//   },
//   {
//     id: "15",
//     name: "Glute Bridges",
//     difficulty: "Beginner",
//     description: "An exercise that targets the glutes and hamstrings.",
//     isPremium: false,
//     instruction:
//       "Lie on your back with your knees bent and feet flat on the floor. Push through your heels to lift your hips toward the ceiling, squeezing your glutes at the top. Lower back down and repeat.",
//     tags: ["glutes", "hamstrings", "core"],
//   },
//   {
//     id: "16",
//     name: "Shoulder Press",
//     difficulty: "Intermediate",
//     description: "An upper body exercise that targets the shoulders.",
//     isPremium: false,
//     instruction:
//       "Stand or sit with a dumbbell in each hand at shoulder height. Press the weights overhead until your arms are fully extended, then lower them back to the starting position.",
//     tags: ["shoulders", "triceps"],
//   },
//   {
//     id: "17",
//     name: "Lateral Raises",
//     difficulty: "Beginner",
//     description: "An isolation exercise for the shoulders.",
//     isPremium: false,
//     instruction:
//       "Stand with a dumbbell in each hand at your sides. Raise your arms out to the sides until they are parallel to the ground, keeping a slight bend in your elbows. Lower back down and repeat.",
//     tags: ["shoulders"],
//   },
//   {
//     id: "18",
//     name: "Chest Press",
//     difficulty: "Intermediate",
//     description: "A compound exercise for the chest and triceps.",
//     isPremium: true,
//     instruction:
//       "Lie on a bench with a dumbbell in each hand at chest level. Press the weights up until your arms are fully extended, then lower them back down to the starting position.",
//     tags: ["chest", "triceps"],
//   },
//   {
//     id: "19",
//     name: "Seated Rows",
//     difficulty: "Intermediate",
//     description: "An exercise that targets the back muscles.",
//     isPremium: false,
//     instruction:
//       "Sit at a cable machine or use resistance bands. Pull the handle or band towards your torso while keeping your back straight and elbows close to your body. Squeeze your shoulder blades together at the end of the movement.",
//     tags: ["back", "biceps"],
//   },
//   {
//     id: "20",
//     name: "Calf Raises",
//     difficulty: "Beginner",
//     description: "An exercise that targets the calf muscles.",
//     isPremium: false,
//     instruction:
//       "Stand with your feet hip-width apart. Raise your heels off the ground as high as possible, then lower them back down. You can do this on flat ground or on an elevated surface for added range of motion.",
//     tags: ["calves"],
//   },
//   {
//     id: "21",
//     name: "Box Jumps",
//     difficulty: "Advanced",
//     description: "A plyometric exercise that builds explosive power.",
//     isPremium: true,
//     instruction:
//       "Stand in front of a sturdy box or platform. Bend your knees and swing your arms back, then jump onto the box, landing softly with your knees slightly bent. Step back down and repeat.",
//     tags: ["legs", "cardio", "explosive"],
//   },
//   {
//     id: "22",
//     name: "Yoga Sun Salutation",
//     difficulty: "Beginner",
//     description: "A series of yoga poses that flow together.",
//     isPremium: false,
//     instruction:
//       "Start in Mountain Pose, then move through a sequence of poses including Forward Bend, Plank, Cobra, and Downward Dog. Repeat the sequence several times to warm up the body.",
//     tags: ["flexibility", "core", "full body"],
//   },
//   {
//     id: "23",
//     name: "Pilates Hundred",
//     difficulty: "Intermediate",
//     description: "A Pilates exercise that strengthens the core.",
//     isPremium: false,
//     instruction:
//       "Lie on your back with your legs in a tabletop position. Lift your head, neck, and shoulders off the ground and pump your arms up and down while breathing in for five counts and out for five counts, repeating for 100 counts.",
//     tags: ["core", "stability"],
//   },
//   {
//     id: "24",
//     name: "Kettlebell Swings",
//     difficulty: "Advanced",
//     description: "A dynamic exercise that works the entire body.",
//     isPremium: true,
//     instruction:
//       "Stand with your feet shoulder-width apart, holding a kettlebell with both hands. Hinge at your hips to swing the kettlebell between your legs, then explosively extend your hips to swing it up to shoulder height. Control the descent and repeat.",
//     tags: ["full body", "glutes", "hamstrings", "core"],
//   },
//   {
//     id: "25",
//     name: "Battle Ropes",
//     difficulty: "Advanced",
//     description:
//       "A high-intensity exercise that builds strength and endurance.",
//     isPremium: true,
//     instruction:
//       "Hold the ends of a battle rope in each hand. Stand with your feet shoulder-width apart and alternate whipping the ropes up and down or side to side for a set duration, engaging your core and maintaining a strong stance.",
//     tags: ["full body", "cardio", "strength"],
//   },
//   {
//     id: "26",
//     name: "Medicine Ball Slams",
//     difficulty: "Advanced",
//     description: "A powerful exercise that targets the entire body.",
//     isPremium: true,
//     instruction:
//       "Stand with your feet shoulder-width apart, holding a medicine ball overhead. Slam the ball down to the ground as hard as you can, engaging your core and legs. Catch the ball on the bounce and repeat.",
//     tags: ["full body", "core", "explosive"],
//   },
//   {
//     id: "27",
//     name: "TRX Rows",
//     difficulty: "Intermediate",
//     description: "A suspension training exercise for the back and arms.",
//     isPremium: false,
//     instruction:
//       "Using TRX straps, lean back with your body straight and pull yourself up by bending your elbows, keeping your body in a straight line. Lower yourself back down with control.",
//     tags: ["back", "biceps", "core"],
//   },
//   {
//     id: "28",
//     name: "Sprints",
//     difficulty: "Advanced",
//     description:
//       "A high-intensity cardio exercise that builds speed and endurance.",
//     isPremium: false,
//     instruction:
//       "Find a flat, open space and sprint at maximum effort for a short distance (e.g., 20-50 meters). Walk back to the starting point to recover and repeat for several intervals.",
//     tags: ["cardio", "legs", "explosive"],
//   },
//   {
//     id: "29",
//     name: "Wall Sit",
//     difficulty: "Beginner",
//     description: "An isometric exercise that targets the legs.",
//     isPremium: false,
//     instruction:
//       "Stand with your back against a wall and slide down until your thighs are parallel to the ground. Hold this position for as long as possible while keeping your back flat against the wall.",
//     tags: ["quads", "glutes", "core"],
//   },
//   {
//     id: "30",
//     name: "Side Plank",
//     difficulty: "Intermediate",
//     description: "A core stability exercise that targets the obliques.",
//     isPremium: false,
//     instruction:
//       "Lie on your side with your legs straight and prop yourself up on one elbow. Lift your hips off the ground, keeping your body in a straight line from head to heels. Hold the position while engaging your core.",
//     tags: ["core", "obliques", "shoulders"],
//   },
//   {
//     id: "31",
//     name: "Hip Thrusts",
//     difficulty: "Intermediate",
//     description: "An exercise that targets the glutes and hamstrings.",
//     isPremium: false,
//     instruction:
//       "Sit on the ground with your upper back against a bench or elevated surface. Roll a barbell over your hips, then push through your heels to lift your hips toward the ceiling, squeezing your glutes at the top. Lower back down and repeat.",
//     tags: ["glutes", "hamstrings", "core"],
//   },
//   {
//     id: "32",
//     name: "Box Step-Ups",
//     difficulty: "Beginner",
//     description: "A lower body exercise that targets the legs and glutes.",
//     isPremium: false,
//     instruction:
//       "Stand in front of a sturdy box or platform. Step up with one foot, driving through your heel, and bring the other foot up to meet it. Step back down and repeat on the other side.",
//     tags: ["quads", "glutes", "hamstrings"],
//   },
//   {
//     id: "33",
//     name: "Dumbbell Flyes",
//     difficulty: "Intermediate",
//     description: "An isolation exercise for the chest.",
//     isPremium: false,
//     instruction:
//       "Lie on a bench with a dumbbell in each hand, arms extended above your chest. Lower the weights out to the sides in a wide arc, keeping a slight bend in your elbows. Bring the weights back together over your chest.",
//     tags: ["chest", "shoulders"],
//   },
//   {
//     id: "34",
//     name: "Cable Tricep Pushdowns",
//     difficulty: "Beginner",
//     description: "An isolation exercise for the triceps.",
//     isPremium: false,
//     instruction:
//       "Stand facing a cable machine with a rope or bar attachment at shoulder height. Grip the attachment and push it down until your arms are fully extended, keeping your elbows close to your body. Slowly return to the starting position.",
//     tags: ["triceps"],
//   },
//   {
//     id: "35",
//     name: "Barbell Squats",
//     difficulty: "Advanced",
//     description: "A compound exercise that targets the lower body.",
//     isPremium: true,
//     instruction:
//       "Stand with your feet shoulder-width apart and a barbell across your upper back. Lower your body by bending at the hips and knees, keeping your chest up and back straight. Go down until your thighs are parallel to the ground, then push through your heels to return to standing.",
//     tags: ["quads", "glutes", "hamstrings", "core"],
//   },
// ];

type ExerciseStore = {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  clearExercises: () => void;
  setExercises: (exercises: Exercise[]) => void;
  getExerciseById: (id: string) => Exercise | undefined;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getFilteredExercises: () => Exercise[];
};

const useExerciseStore = create<ExerciseStore>()((set, get) => {
  return {
    exercises: [],
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

    setExercises: (exercises) => set({ exercises }),

    getExerciseById: (id) =>
      get().exercises.find((exercise) => exercise.id === id),

    searchQuery: "",

    setSearchQuery: (query) => set({ searchQuery: query }),

    getFilteredExercises: () => {
      const { exercises, searchQuery } = get();

      if (!searchQuery.trim()) {
        return exercises;
      }

      const normalizedQuery = searchQuery.toLowerCase().trim();

      return exercises.filter((exercise) => {
        return exercise.name.toLowerCase().startsWith(normalizedQuery);
      });
    },
  };
});

export default useExerciseStore;
