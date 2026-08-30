import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Plus,
  User,
} from "lucide-react";

import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import { useDashboardData } from "../hooks/useDashboardData";

export function DashboardPage() {
  const {
    profileQuery,
    resumesQuery,
    applicationsQuery,
  } = useDashboardData();

  const isLoading =
    profileQuery.isLoading ||
    resumesQuery.isLoading ||
    applicationsQuery.isLoading;

  if (isLoading) {
    return (
      <Container className="py-10">
        <div className="space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-zinc-200" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="h-32 animate-pulse bg-zinc-100"
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  const resumes = resumesQuery.data ?? [];
  const applications =
    applicationsQuery.data ?? [];

  const profile = profileQuery.data;

  return (
    <Container className="py-8 sm:py-10">

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-zinc-500">
            Your workspace
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {profile?.firstName
              ? `Welcome back, ${profile.firstName}`
              : "Dashboard"}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Keep your career workflow moving.
          </p>
        </div>

        <Link to="/resumes/new">
          <Button>
            <Plus size={17} />
            Create resume
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Resumes
            </span>

            <FileText
              size={18}
              className="text-zinc-400"
            />
          </div>

          <p className="mt-4 text-3xl font-semibold">
            {resumes.length}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            {resumes.length === 1
              ? "1 resume in your workspace"
              : `${resumes.length} resumes in your workspace`}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Applications
            </span>

            <BriefcaseBusiness
              size={18}
              className="text-zinc-400"
            />
          </div>

          <p className="mt-4 text-3xl font-semibold">
            {applications.length}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            {applications.length === 1
              ? "1 tracked application"
              : `${applications.length} tracked applications`}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              Profile
            </span>

            <User
              size={18}
              className="text-zinc-400"
            />
          </div>

          <p className="mt-4 text-3xl font-semibold">
            {profile ? "Ready" : "—"}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            {profile
              ? "Profile information available"
              : "Complete your profile"}
          </p>
        </Card>

      </div>

      {resumes.length === 0 && (
        <Card className="mt-6 p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-semibold">
                Start with your resume
              </h2>

              <p className="mt-1 max-w-lg text-sm leading-6 text-zinc-500">
                Create your first resume and organize your
                professional experience in one place.
              </p>
            </div>

            <Link to="/resumes/new">
              <Button variant="secondary">
                Create resume
                <ArrowRight size={16} />
              </Button>
            </Link>

          </div>
        </Card>
      )}

    </Container>
  );
}