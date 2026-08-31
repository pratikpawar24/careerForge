import apiClient from "./client";

export interface ResumeProjectResponse {
    id: string;
    name: string;
    description: string | null;
    technologies: string | null;
    projectUrl: string | null;
    repositoryUrl: string | null;
    startDate: string | null;
    endDate: string | null;
    currentlyWorking: boolean;
    displayOrder: number;
}

export interface CreateResumeProjectRequest {
    name: string;
    description?: string;
    technologies?: string;
    projectUrl?: string;
    repositoryUrl?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking: boolean;
    displayOrder: number;
}

export type UpdateResumeProjectRequest =
    CreateResumeProjectRequest;

export async function getResumeProjects(
    resumeId: string
): Promise<ResumeProjectResponse[]> {
    const response =
        await apiClient.get<ResumeProjectResponse[]>(
            `/resumes/${resumeId}/projects`
        );

    return response.data;
}

export async function createResumeProject(
    resumeId: string,
    request: CreateResumeProjectRequest
): Promise<ResumeProjectResponse> {
    const response =
        await apiClient.post<ResumeProjectResponse>(
            `/resumes/${resumeId}/projects`,
            request
        );

    return response.data;
}

export async function updateResumeProject(
    resumeId: string,
    projectId: string,
    request: UpdateResumeProjectRequest
): Promise<ResumeProjectResponse> {
    const response =
        await apiClient.put<ResumeProjectResponse>(
            `/resumes/${resumeId}/projects/${projectId}`,
            request
        );

    return response.data;
}

export async function deleteResumeProject(
    resumeId: string,
    projectId: string
): Promise<void> {
    await apiClient.delete(
        `/resumes/${resumeId}/projects/${projectId}`
    );
}