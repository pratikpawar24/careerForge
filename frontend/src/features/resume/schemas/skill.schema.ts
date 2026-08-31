import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Skill name is required")
    .max(
      100,
      "Skill name must not exceed 100 characters"
    ),

  category: z
    .string()
    .trim()
    .max(
      100,
      "Category must not exceed 100 characters"
    )
    .optional()
    .or(z.literal("")),

  proficiencyLevel: z
    .string()
    .trim()
    .max(
      50,
      "Proficiency level must not exceed 50 characters"
    )
    .optional()
    .or(z.literal("")),

  displayOrder: z
    .number()
    .int()
    .min(0),
});

export type SkillFormData = z.infer<
  typeof skillSchema
>;