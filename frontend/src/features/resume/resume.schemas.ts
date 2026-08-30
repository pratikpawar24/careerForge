import { z } from "zod";

export const createResumeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Resume name is required")
    .max(255, "Resume name must not exceed 255 characters"),
});

export type CreateResumeFormData = z.infer<
  typeof createResumeSchema
>;