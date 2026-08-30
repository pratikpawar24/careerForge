import apiClient from "./client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendOtpRequest,
  VerifyOtpRequest,
} from "../features/auth/types";
export async function register(
  request: RegisterRequest
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    request
  );

  return response.data;
}

export async function verifyEmail(
  request: VerifyOtpRequest
): Promise<void> {
  await apiClient.post(
    "/auth/verify-email",
    request
  );
}

export async function login(
  request: LoginRequest
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    request
  );

  return response.data;
}

export async function resendOtp(
  request: ResendOtpRequest
): Promise<void> {
  await apiClient.post(
    "/auth/resend-otp",
    request
  );
}