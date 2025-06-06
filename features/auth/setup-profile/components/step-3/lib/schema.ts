import { z } from "zod";

export const nutritionInfoSchema = z.object({
  dailyFoodPortion: z
    .string()
    .min(1, { message: "Daily food portion is required" }),

  favoriteTypeOfFood: z
    .string()
    .min(1, { message: "Favorite type of food is required" }),

  favoriteDrink: z.string().min(1, { message: "Favorite drink is required" }),

  dailyWaterIntake: z.coerce
    .number({
      required_error: "Daily water intake is required",
      invalid_type_error: "Daily water intake must be a number",
    })
    .min(0, { message: "Daily water intake cannot be negative" })
    .max(10, { message: "Daily water intake cannot exceed 10 liters" }),
});

export type NutritionInfoSchemaType = z.infer<typeof nutritionInfoSchema>;
