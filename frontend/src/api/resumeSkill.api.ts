import apiClient from "./client";

export interface ResumeSkillResponse {
  id: string;
  name: string;
  category: string | null;
  proficiencyLevel: string | null;
  displayOrder: number;
}

export interface CreateResumeSkillRequest {
  name: string;
  category?: string;
  proficiencyLevel?: string;
  displayOrder: number;
}

export type UpdateResumeSkillRequest =
  CreateResumeSkillRequest;

export async function getResumeSkills(
  resumeId: string
): Promise<ResumeSkillResponse[]> {
  const response =
    await apiClient.get<ResumeSkillResponse[]>(
      `/resumes/${resumeId}/skills`
    );

  return response.data;
}

export async function createResumeSkill(
  resumeId: string,
  request: CreateResumeSkillRequest
): Promise<ResumeSkillResponse> {
  const response =
    await apiClient.post<ResumeSkillResponse>(
      `/resumes/${resumeId}/skills`,
      request
    );

  return response.data;
}

export async function updateResumeSkill(
  resumeId: string,
  skillId: string,
  request: UpdateResumeSkillRequest
): Promise<ResumeSkillResponse> {
  const response =
    await apiClient.put<ResumeSkillResponse>(
      `/resumes/${resumeId}/skills/${skillId}`,
      request
    );

  return response.data;
}

export async function deleteResumeSkill(
  resumeId: string,
  skillId: string
): Promise<void> {
  await apiClient.delete(
    `/resumes/${resumeId}/skills/${skillId}`
  );
}