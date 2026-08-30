import apiClient from "./client";

export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP"
  | "CONTRACT"
  | "FREELANCE";

export interface ResumeExperienceResponse {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string | null;
  employmentType: EmploymentType | null;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string | null;
  displayOrder: number;
}

export interface CreateResumeExperienceRequest {
  companyName: string;
  jobTitle: string;
  location?: string;
  employmentType?: EmploymentType;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description?: string;
  displayOrder: number;
}

export type UpdateResumeExperienceRequest =
  CreateResumeExperienceRequest;

export async function getResumeExperiences(
  resumeId: string
): Promise<ResumeExperienceResponse[]> {
  const response = await apiClient.get<
    ResumeExperienceResponse[]
  >(`/resumes/${resumeId}/experiences`);

  return response.data;
}

export async function createResumeExperience(
  resumeId: string,
  request: CreateResumeExperienceRequest
): Promise<ResumeExperienceResponse> {
  const response =
    await apiClient.post<ResumeExperienceResponse>(
      `/resumes/${resumeId}/experiences`,
      request
    );

  return response.data;
}

export async function updateResumeExperience(
  resumeId: string,
  experienceId: string,
  request: UpdateResumeExperienceRequest
): Promise<ResumeExperienceResponse> {
  const response =
    await apiClient.put<ResumeExperienceResponse>(
      `/resumes/${resumeId}/experiences/${experienceId}`,
      request
    );

  return response.data;
}

export async function deleteResumeExperience(
  resumeId: string,
  experienceId: string
): Promise<void> {
  await apiClient.delete(
    `/resumes/${resumeId}/experiences/${experienceId}`
  );
}