import apiClient from "./client";

export interface JobApplicationResponse {
  id: string;
  companyName: string;
  jobTitle: string;
  status: string;
}

export async function getJobApplications(): Promise<
  JobApplicationResponse[]
> {
  const response =
    await apiClient.get<JobApplicationResponse[]>(
      "/job-applications"
    );

  return response.data;
}