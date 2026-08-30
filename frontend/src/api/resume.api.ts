import apiClient from "./client";

export interface ResumeResponse {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  template: string;
}

export async function getResumes(): Promise<ResumeResponse[]> {
  const response =
    await apiClient.get<ResumeResponse[]>("/resumes");

  return response.data;
}