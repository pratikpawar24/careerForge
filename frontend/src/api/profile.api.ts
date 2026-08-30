import apiClient from "./client";

export interface ProfileResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  headline?: string;
  summary?: string;
}

export async function getProfile(): Promise<ProfileResponse> {
  const response =
    await apiClient.get<ProfileResponse>("/profile");

  return response.data;
}