import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../../../api/profile.api";
import { getResumes } from "../../../api/resume.api";
import { getJobApplications } from "../../../api/jobApplication.api";

export function useDashboardData() {
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 60_000,
  });

  const resumesQuery = useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    staleTime: 30_000,
  });

  const applicationsQuery = useQuery({
    queryKey: ["job-applications"],
    queryFn: getJobApplications,
    staleTime: 30_000,
  });

  return {
    profileQuery,
    resumesQuery,
    applicationsQuery,
  };
}