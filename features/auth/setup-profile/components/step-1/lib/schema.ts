import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot exceed 50 characters" }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot exceed 50 characters" }),

  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(20, { message: "Weight must be at least 20kg" })
    .max(300, { message: "Weight cannot exceed 300kg" }),

  height: z
    .number({
      required_error: "Height is required",
      invalid_type_error: "Height must be a number",
    })
    .min(100, { message: "Height must be at least 100cm" })
    .max(250, { message: "Height cannot exceed 250cm" }),

  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int({ message: "Age must be a whole number" })
    .min(13, { message: "You must be at least 13 years old" })
    .max(120, { message: "Age cannot exceed 120 years" }),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender selected",
  }),
});

export type BasicInfoSchemaType = z.infer<typeof basicInfoSchema>;
