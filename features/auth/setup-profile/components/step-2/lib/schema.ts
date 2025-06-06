import { z } from "zod";

export const trainingInfoSchema = z.object({
  trainingGoal: z.string().min(1, { message: "Training goal is required" }),

  exerciseIntensity: z.enum(["Low", "Moderate", "High"], {
    required_error: "Exercise intensity is required",
  }),

  tdee: z
    .number({
      required_error: "TDEE is required",
      invalid_type_error: "TDEE must be a number",
    })
    .min(1000, { message: "TDEE must be at least 1000 calories" })
    .max(10000, { message: "TDEE cannot exceed 10,000 calories" }),

  favoriteSport: z.string().min(1, { message: "Favorite sport is required" }),

  weeklyTrainingFrequency: z
    .number({
      required_error: "Weekly training frequency is required",
      invalid_type_error: "Weekly training frequency must be a number",
    })
    .int({ message: "Weekly training frequency must be a whole number" })
    .min(0, { message: "Weekly training frequency cannot be negative" })
    .max(21, { message: "Weekly training frequency cannot exceed 21" }),

  currentDiet: z.string().min(1, { message: "Current diet is required" }),
});

export type TrainingInfoSchemaType = z.infer<typeof trainingInfoSchema>;
