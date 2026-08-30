import { z } from "zod";

export const experienceSchema = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(1, "Company name is required")
      .max(255, "Company name must not exceed 255 characters"),

    jobTitle: z
      .string()
      .trim()
      .min(1, "Job title is required")
      .max(255, "Job title must not exceed 255 characters"),

    location: z
      .string()
      .trim()
      .max(255, "Location must not exceed 255 characters")
      .optional()
      .or(z.literal("")),

    employmentType: z
      .enum([
        "FULL_TIME",
        "PART_TIME",
        "INTERNSHIP",
        "CONTRACT",
        "FREELANCE",
        ])
      .optional(),

    startDate: z
      .string()
      .min(1, "Start date is required"),

    endDate: z
      .string()
      .optional()
      .or(z.literal("")),

    currentlyWorking: z.boolean(),

    description: z
      .string()
      .optional()
      .or(z.literal("")),

    displayOrder: z.number().int().min(0),
  })
  .refine(
    (data) => {
      if (!data.currentlyWorking && !data.endDate) {
        return false;
      }

      return true;
    },
    {
      message:
        "End date is required when you are not currently working",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (
        data.startDate &&
        data.endDate &&
        !data.currentlyWorking
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

export type ExperienceFormData = z.infer<
  typeof experienceSchema
>;