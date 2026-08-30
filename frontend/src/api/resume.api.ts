import apiClient from "./client";

export interface ResumeResponse {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  template: string;
}

export interface CreateResumeRequest {
  name: string;
}

export interface UpdateResumeRequest {
  name: string;
}

export async function getResumes(): Promise<ResumeResponse[]> {
  const response = await apiClient.get<ResumeResponse[]>("/resumes");

  return response.data;
}

export async function getResume(
  resumeId: string
): Promise<ResumeResponse> {
  const response = await apiClient.get<ResumeResponse>(
    `/resumes/${resumeId}`
  );

  return response.data;
}

export async function createResume(
  request: CreateResumeRequest
): Promise<ResumeResponse> {
  const response = await apiClient.post<ResumeResponse>(
    "/resumes",
    request
  );

  return response.data;
}

export async function updateResume(
  resumeId: string,
  request: UpdateResumeRequest
): Promise<ResumeResponse> {
  const response = await apiClient.put<ResumeResponse>(
    `/resumes/${resumeId}`,
    request
  );

  return response.data;
}

export async function setDefaultResume(
  resumeId: string
): Promise<ResumeResponse> {
  const response = await apiClient.patch<ResumeResponse>(
    `/resumes/${resumeId}/default`
  );

  return response.data;
}

export async function deleteResume(
  resumeId: string
): Promise<void> {
  await apiClient.delete(`/resumes/${resumeId}`);
}