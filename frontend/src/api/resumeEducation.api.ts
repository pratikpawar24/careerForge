import apiClient from "./client";

export interface ResumeEducationResponse {
  id: string;
  institutionName: string;
  degree: string;
  fieldOfStudy: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  currentlyStudying: boolean;
  grade: string | null;
  description: string | null;
  displayOrder: number;
}

export interface CreateResumeEducationRequest {
  institutionName: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyStudying: boolean;
  grade?: string;
  description?: string;
  displayOrder: number;
}

export type UpdateResumeEducationRequest =
  CreateResumeEducationRequest;

export async function getResumeEducations(
  resumeId: string
): Promise<ResumeEducationResponse[]> {
  const response =
    await apiClient.get<ResumeEducationResponse[]>(
      `/resumes/${resumeId}/educations`
    );

  return response.data;
}

export async function createResumeEducation(
  resumeId: string,
  request: CreateResumeEducationRequest
): Promise<ResumeEducationResponse> {
  const response =
    await apiClient.post<ResumeEducationResponse>(
      `/resumes/${resumeId}/educations`,
      request
    );

  return response.data;
}

export async function updateResumeEducation(
  resumeId: string,
  educationId: string,
  request: UpdateResumeEducationRequest
): Promise<ResumeEducationResponse> {
  const response =
    await apiClient.put<ResumeEducationResponse>(
      `/resumes/${resumeId}/educations/${educationId}`,
      request
    );

  return response.data;
}

export async function deleteResumeEducation(
  resumeId: string,
  educationId: string
): Promise<void> {
  await apiClient.delete(
    `/resumes/${resumeId}/educations/${educationId}`
  );
}