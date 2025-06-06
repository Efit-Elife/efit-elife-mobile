import { z } from "zod";

export const medicalInfoSchema = z.object({
  medicalConditions: z.array(z.string().nonempty()).optional(),

  usesSmartWatch: z.boolean(),

  smartWatchType: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: "If you use a smart watch, please specify the type",
    }),
});

export type MedicalInfoSchemaType = z.infer<typeof medicalInfoSchema>;
