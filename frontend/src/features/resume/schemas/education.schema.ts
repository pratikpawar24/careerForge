import { z } from "zod";

export const educationSchema = z
  .object({
    institutionName: z
      .string()
      .trim()
      .min(1, "Institution name is required")
      .max(
        255,
        "Institution name must not exceed 255 characters"
      ),

    degree: z
      .string()
      .trim()
      .min(1, "Degree is required")
      .max(
        255,
        "Degree must not exceed 255 characters"
      ),

    fieldOfStudy: z
      .string()
      .trim()
      .max(
        255,
        "Field of study must not exceed 255 characters"
      )
      .optional()
      .or(z.literal("")),

    location: z
      .string()
      .trim()
      .max(
        255,
        "Location must not exceed 255 characters"
      )
      .optional()
      .or(z.literal("")),

    startDate: z
      .string()
      .optional()
      .or(z.literal("")),

    endDate: z
      .string()
      .optional()
      .or(z.literal("")),

    currentlyStudying: z.boolean(),

    grade: z
      .string()
      .trim()
      .max(
        100,
        "Grade must not exceed 100 characters"
      )
      .optional()
      .or(z.literal("")),

    description: z
      .string()
      .optional()
      .or(z.literal("")),

    displayOrder: z
      .number()
      .int()
      .min(0),
  })
  .refine(
    (data) => {
      if (
        data.startDate &&
        data.endDate &&
        !data.currentlyStudying
      ) {
        return data.endDate >= data.startDate;
      }

      return true;
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export type EducationFormData = z.infer<
  typeof educationSchema
>;