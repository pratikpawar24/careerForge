import { z } from "zod";

export const projectSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Project name is required")
            .max(
                255,
                "Project name must not exceed 255 characters"
            ),

        description: z
            .string()
            .optional()
            .or(z.literal("")),

        technologies: z
            .string()
            .trim()
            .max(
                1000,
                "Technologies must not exceed 1000 characters"
            )
            .optional()
            .or(z.literal("")),

        projectUrl: z
            .string()
            .trim()
            .url("Project URL must be valid")
            .max(
                500,
                "Project URL must not exceed 500 characters"
            )
            .optional()
            .or(z.literal("")),

        repositoryUrl: z
            .string()
            .trim()
            .url("Repository URL must be valid")
            .max(
                500,
                "Repository URL must not exceed 500 characters"
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

        currentlyWorking: z.boolean(),

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

export type ProjectFormData = z.infer<
    typeof projectSchema
>;