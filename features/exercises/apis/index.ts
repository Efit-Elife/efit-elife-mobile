import { firebaseFirestore, firebaseStorage } from "@/config/firebase";
import { Exercise } from "@/types/common";
import {
  collection,
  getDocs,
  getDoc,
  query,
  limit,
  doc,
  writeBatch,
  where,
  orderBy,
} from "firebase/firestore";

const EXERCISE_COLLECTION = "exercises";

export const getAllExercise = async (): Promise<Exercise[]> => {
  try {
    const exerciseCollectionRef = collection(
      firebaseFirestore,
      EXERCISE_COLLECTION
    );
    const q = query(exerciseCollectionRef, orderBy("nameLowercase", "asc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Exercise, "id">),
    }));
  } catch (error) {
    console.error("Error fetching exercise:", error);
    return [];
  }
};

export const seedInitialExercises = async (): Promise<void> => {
  try {
    const exerciseCollectionRef = collection(
      firebaseFirestore,
      EXERCISE_COLLECTION
    );
    const q = query(exerciseCollectionRef, limit(1));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("Exercise collection already has data, skipping seed");
      return;
    }

    const initialExercises: Omit<Exercise, "id">[] = [
      {
        name: "Push-ups",
        difficulty: "Beginner",
        description: "Basic push-ups exercise",
        isPremium: false,
        instruction:
          "Begin in a high plank position with your hands placed shoulder-width apart and your body in a straight line from head to heels. Engage your core and slowly lower your body by bending your elbows until your chest nearly touches the floor. Push through your palms to return to the starting position, keeping your body aligned throughout the movement.",
        tags: ["strength", "upper body"],
      },
      {
        name: "Squats",
        difficulty: "Beginner",
        description: "Basic squats exercise",
        isPremium: false,
        instruction:
          "Stand with your feet shoulder-width apart, toes slightly turned out. Keep your chest up and engage your core as you bend your knees and lower your hips back and down, as if you're sitting into a chair. Go down until your thighs are parallel to the ground, then press through your heels to return to the standing position.",
        tags: ["strength", "lower body"],
      },
      {
        name: "Plank",
        difficulty: "Intermediate",
        description: "Core stability exercise",
        isPremium: false,
        instruction:
          "Start in a forearm plank position with your elbows directly beneath your shoulders and your body forming a straight line from head to heels. Engage your core, squeeze your glutes, and avoid letting your hips drop or rise too high. Hold this position for the desired duration while maintaining steady breathing.",
        tags: ["core", "stability"],
      },
      {
        name: "Burpees",
        difficulty: "Advanced",
        description: "Full body exercise",
        isPremium: false,
        instruction:
          "Stand with your feet shoulder-width apart. Lower into a squat and place your hands on the ground in front of you. Kick your feet back into a plank position, perform a push-up, then jump your feet back toward your hands. Explosively jump into the air with your arms overhead, then repeat the movement.",
        tags: ["cardio", "strength"],
      },
      {
        name: "Lunges",
        difficulty: "Beginner",
        description: "Lower body exercise targeting legs",
        isPremium: false,
        instruction:
          "Stand tall with feet hip-width apart. Step forward with one leg and lower your hips until both knees are bent at about 90-degree angles. Ensure your front knee is directly above your ankle and your back knee is just above the floor. Push off the front foot to return to the starting position and repeat on the other leg.",
        tags: ["strength", "lower body"],
      },
      {
        name: "Mountain Climbers",
        difficulty: "Intermediate",
        description: "Cardio and core exercise",
        isPremium: false,
        instruction:
          "Start in a high plank position with your hands under your shoulders and body in a straight line. Drive one knee toward your chest, then quickly switch legs, extending the first leg back as you bring the other knee forward. Continue alternating legs at a brisk pace, keeping your hips low and core tight.",
        tags: ["cardio", "core"],
      },
      {
        name: "Jumping Jacks",
        difficulty: "Beginner",
        description: "Full body warm-up exercise",
        isPremium: false,
        instruction:
          "Begin by standing upright with your feet together and arms at your sides. Jump while spreading your legs shoulder-width apart and raising your arms overhead. Quickly reverse the movement by jumping again to bring your legs together and arms back to your sides. Repeat this movement rhythmically.",
        tags: ["cardio", "warm-up"],
      },
      {
        name: "Deadlifts",
        difficulty: "Advanced",
        description: "Strength training for lower back and legs",
        isPremium: true,
        instruction:
          "Stand with your feet hip-width apart and a barbell over your midfoot. Bend at the hips and knees to grip the bar with your hands just outside your knees. Keep your back straight, chest up, and core tight. Push through your heels to lift the bar, extending your hips and knees until you're standing upright. Lower the bar by hinging at the hips and bending your knees.",
        tags: ["strength", "lower body"],
      },
      {
        name: "Bench Press",
        difficulty: "Advanced",
        description: "Upper body strength exercise",
        isPremium: true,
        instruction:
          "Lie flat on a bench with your feet firmly planted on the ground. Grip the barbell slightly wider than shoulder-width and lift it off the rack. Lower the bar slowly to your chest while keeping your elbows at about a 45-degree angle. Press the bar back up to the starting position by extending your arms fully.",
        tags: ["strength", "upper body"],
      },
      {
        name: "Pull-ups",
        difficulty: "Advanced",
        description: "Upper body strength exercise",
        isPremium: true,
        instruction:
          "Grab a pull-up bar with your palms facing away from you and hands shoulder-width apart. Hang with your arms fully extended and legs off the ground. Engage your back and arm muscles to pull your body up until your chin is above the bar. Lower yourself back down in a controlled manner and repeat.",
        tags: ["strength", "upper body"],
      },
      {
        name: "Bicycle Crunches",
        difficulty: "Intermediate",
        description: "Core exercise targeting abs",
        isPremium: false,
        instruction:
          "Lie flat on your back with your hands behind your head and legs raised with knees bent at 90 degrees. Bring your right elbow and left knee toward each other while straightening your right leg. Then alternate sides by bringing your left elbow to your right knee. Continue alternating in a pedaling motion while keeping your core engaged.",
        tags: ["core", "abs"],
      },
      {
        name: "Leg Raises",
        difficulty: "Intermediate",
        description: "Lower abdominal exercise",
        isPremium: false,
        instruction:
          "Lie flat on your back with your legs extended and your arms at your sides for support. Slowly lift your legs upward while keeping them straight until they form a 90-degree angle with your torso. Lower your legs back down slowly without touching the ground, maintaining tension in your lower abs throughout the movement.",
        tags: ["core", "lower body"],
      },
      {
        name: "Tricep Dips",
        difficulty: "Intermediate",
        description: "Upper body exercise for triceps",
        isPremium: false,
        instruction:
          "Sit on the edge of a bench or chair with your hands gripping the edge beside your hips. Slide your hips forward off the bench and lower your body by bending your elbows until they reach about 90 degrees. Push through your palms to straighten your arms and raise your body back up to the starting position.",
        tags: ["strength", "upper body"],
      },
      {
        name: "Shoulder Press",
        difficulty: "Advanced",
        description: "Upper body strength exercise",
        isPremium: true,
        instruction:
          "Stand or sit with your back straight and hold dumbbells or a barbell at shoulder height with palms facing forward. Press the weights overhead by fully extending your arms while keeping your core engaged and back straight. Lower the weights back down slowly to shoulder level and repeat.",
        tags: ["strength", "upper body"],
      },
      {
        name: "Russian Twists",
        difficulty: "Intermediate",
        description: "Core exercise for obliques",
        isPremium: false,
        instruction:
          "Sit on the floor with your knees bent and feet lifted slightly off the ground. Lean back slightly, engage your core, and clasp your hands together. Twist your torso to the right, then to the left, moving your hands from side to side while keeping your core tight and your back straight throughout the exercise.",
        tags: ["core", "abs"],
      },
      {
        name: "Glute Bridges",
        difficulty: "Beginner",
        description: "Lower body exercise targeting glutes",
        isPremium: false,
        instruction:
          "Lie on your back with your knees bent and feet flat on the floor, hip-width apart. Press through your heels to lift your hips off the ground, squeezing your glutes at the top. Hold the position briefly before lowering your hips back down to the floor with control.",
        tags: ["strength", "lower body"],
      },
      {
        name: "High Knees",
        difficulty: "Beginner",
        description: "Cardio exercise for warm-up",
        isPremium: false,
        instruction:
          "Run in place by lifting your knees as high as possible toward your chest while pumping your arms. Maintain a quick pace to elevate your heart rate and warm up your body effectively.",
        tags: ["cardio", "warm-up"],
      },
      {
        name: "Side Plank",
        difficulty: "Intermediate",
        description: "Core stability exercise targeting obliques",
        isPremium: false,
        instruction:
          "Lie on your side with your legs extended and feet stacked on top of each other. Prop yourself up on your forearm with your elbow directly under your shoulder. Lift your hips off the ground, forming a straight line from your head to your feet. Hold this position while engaging your core and avoiding sagging hips.",
        tags: ["core", "stability"],
      },
      {
        name: "Box Jumps",
        difficulty: "Advanced",
        description: "Plyometric exercise for lower body",
        isPremium: true,
        instruction:
          "Stand facing a sturdy box or platform with feet shoulder-width apart. Bend your knees and swing your arms to generate momentum, then explosively jump onto the box, landing softly with both feet flat. Step or jump back down carefully and repeat the movement.",
        tags: ["cardio", "strength"],
      },
      {
        name: "Yoga Sun Salutation",
        difficulty: "Beginner",
        description: "Yoga sequence for flexibility and strength",
        isPremium: false,
        instruction:
          "Begin standing with your feet together and arms at your sides. Flow through a series of yoga poses including reaching overhead, forward fold, plank, cobra, and downward dog. Move smoothly between poses while focusing on deep, controlled breathing to improve flexibility and build strength.",
        tags: ["flexibility", "yoga"],
      },
      {
        name: "Kettlebell Swings",
        difficulty: "Intermediate",
        description: "Full body exercise using a kettlebell",
        isPremium: true,
        instruction:
          "Stand with feet shoulder-width apart holding a kettlebell with both hands. Hinge at the hips to swing the kettlebell backward between your legs, then thrust your hips forward to swing it up to shoulder height. Keep your core tight and arms straight throughout the movement.",
        tags: ["strength", "cardio"],
      },
      {
        name: "Battle Ropes",
        difficulty: "Advanced",
        description: "High-intensity cardio exercise using ropes",
        isPremium: true,
        instruction:
          "Hold the ends of heavy battle ropes with both hands, standing with feet shoulder-width apart. Create waves by alternately moving your arms up and down rapidly, maintaining a strong core and steady breathing. Continue for the desired time to improve cardio endurance and upper body strength.",
        tags: ["cardio", "strength"],
      },
      {
        name: "Jump Rope",
        difficulty: "Beginner",
        description: "Cardio exercise using a jump rope",
        isPremium: false,
        instruction:
          "Hold the handles of a jump rope in each hand and swing the rope over your head and under your feet in a continuous motion. Jump lightly on the balls of your feet, maintaining a steady rhythm and keeping your elbows close to your body.",
        tags: ["cardio", "warm-up"],
      },
      {
        name: "Pilates Roll-Up",
        difficulty: "Intermediate",
        description: "Pilates exercise for core strength",
        isPremium: false,
        instruction:
          "Lie flat on your back with your arms extended overhead. Slowly roll your spine up one vertebra at a time into a sitting position while reaching forward. Then, slowly roll back down to the starting position with control, engaging your abdominal muscles throughout.",
        tags: ["core", "flexibility"],
      },
      {
        name: "Wall Sit",
        difficulty: "Beginner",
        description: "Isometric exercise for lower body strength",
        isPremium: false,
        instruction:
          "Stand with your back against a wall and slide down until your thighs are parallel to the ground, as if sitting in an invisible chair. Keep your knees directly above your ankles and hold this position, engaging your leg muscles and core.",
        tags: ["strength", "lower body"],
      },
      {
        name: "Tire Flips",
        difficulty: "Advanced",
        description: "Full body strength exercise using a tire",
        isPremium: true,
        instruction:
          "Approach a large tire and squat down to grip the bottom edge. Using your legs and back muscles, lift and flip the tire forward explosively. Maintain a straight back and engage your core to protect your spine during the movement.",
        tags: ["strength", "cardio"],
      },
      {
        name: "Sledgehammer Slams",
        difficulty: "Advanced",
        description: "Full body exercise using a sledgehammer",
        isPremium: true,
        instruction:
          "Hold a sledgehammer with both hands and stand with feet shoulder-width apart facing a tire or similar sturdy surface. Swing the sledgehammer overhead and bring it down forcefully onto the tire, engaging your core and using your whole body to generate power. Repeat the movement rhythmically.",
        tags: ["strength", "cardio"],
      },
      {
        name: "Agility Ladder Drills",
        difficulty: "Intermediate",
        description: "Agility training using a ladder on the ground",
        isPremium: false,
        instruction:
          "Place an agility ladder flat on the ground. Perform various footwork patterns by stepping quickly in and out of the ladder’s squares with both feet. Maintain a quick pace, light feet, and controlled movements to improve coordination and agility.",
        tags: ["agility", "cardio"],
      },
      {
        name: "Medicine Ball Slams",
        difficulty: "Advanced",
        description: "Full body exercise using a medicine ball",
        isPremium: true,
        instruction:
          "Hold a medicine ball overhead with both hands, stand with feet shoulder-width apart. Engage your core and explosively slam the ball down onto the ground as hard as possible. Catch the ball on the bounce or pick it up and repeat the motion continuously.",
        tags: ["strength", "cardio"],
      },
    ];

    const batch = writeBatch(firebaseFirestore);
    const now = new Date().toISOString();

    initialExercises.forEach((exercise) => {
      const newDocRef = doc(collection(firebaseFirestore, EXERCISE_COLLECTION));
      batch.set(newDocRef, {
        ...exercise,
        nameLowercase: exercise.name.toLowerCase(),
        createdAt: now,
        updatedAt: now,
      });
    });

    await batch.commit();
    console.log("Successfully seeded initial exercises");
  } catch (error) {
    console.error("Error seeding exercises:", error);
    throw error;
  }
};

export const getExerciseByName = async (name: string): Promise<Exercise[]> => {
  const search = name.trim();
  if (!search) return [];
  try {
    const exerciseCollectionRef = collection(
      firebaseFirestore,
      EXERCISE_COLLECTION
    );

    const q = query(
      exerciseCollectionRef,
      where("nameLowercase", ">=", search),
      where("nameLowercase", "<", search + "\uf8ff")
    );

    const snapshot = await getDocs(q);

    const exercises = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Exercise, "id">),
    }));

    return exercises;
  } catch (error) {
    console.error("❌ Error fetching exercises by name:", error);
    return [];
  }
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    const exerciseDocRef = doc(firebaseFirestore, EXERCISE_COLLECTION, id);
    const snapshot = await getDoc(exerciseDocRef);

    if (!snapshot.exists()) {
      console.error(`Exercise with ID ${id} not found`);
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<Exercise, "id">),
    };
  } catch (error) {
    console.error("❌ Error fetching exercise by ID:", error);
    return null;
  }
};
