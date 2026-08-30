import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export const verifyOtpSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  otp: z
    .string()
    .regex(/^\d{6}$/, "OTP must contain exactly 6 digits"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type RegisterFormData = z.infer<
  typeof registerSchema
>;

export type VerifyOtpFormData = z.infer<
  typeof verifyOtpSchema
>;

export type LoginFormData = z.infer<
  typeof loginSchema
>;