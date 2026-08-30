import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  Plus,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getResumes,
  type ResumeResponse,
} from "../../../api/resume.api";

import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

function ResumeCard({
  resume,
}: {
  resume: ResumeResponse;
}) {
  return (
    <Card className="group overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="aspect-[8.5/11] bg-zinc-100 p-5">
        <div className="h-full bg-white p-5 shadow-sm">
          <div className="border-b border-zinc-200 pb-4">
            <div className="h-3 w-28 rounded bg-zinc-200" />
            <div className="mt-2 h-2 w-20 rounded bg-zinc-100" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-2 w-16 rounded bg-zinc-200" />
            <div className="h-2 w-full rounded bg-zinc-100" />
            <div className="h-2 w-5/6 rounded bg-zinc-100" />
            <div className="h-2 w-4/6 rounded bg-zinc-100" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-2 w-20 rounded bg-zinc-200" />
            <div className="h-2 w-full rounded bg-zinc-100" />
            <div className="h-2 w-4/5 rounded bg-zinc-100" />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-zinc-950">
              {resume.name}
            </h2>

            <p className="mt-1 text-xs text-zinc-400">
              {resume.template}
            </p>
          </div>

          {resume.isDefault && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-medium text-zinc-600">
              <Star size={12} />
              Default
            </span>
          )}
        </div>

        <Link
          to={`/resumes/${resume.id}`}
          className="mt-4 flex items-center justify-between text-sm font-medium text-zinc-900"
        >
          Open resume
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </Card>
  );
}

export function ResumeListPage() {
  const resumesQuery = useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    staleTime: 30_000,
  });

  if (resumesQuery.isLoading) {
    return (
      <Container className="py-8 sm:py-10">
        <div className="space-y-8">
          <div className="h-8 w-40 animate-pulse rounded bg-zinc-200" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="aspect-[8.5/11] animate-pulse bg-zinc-100"
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  if (resumesQuery.isError) {
    return (
      <Container className="py-8 sm:py-10">
        <Card className="p-8 text-center">
          <h1 className="text-lg font-semibold">
            Couldn't load your resumes
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Please try again.
          </p>

          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => resumesQuery.refetch()}
          >
            Try again
          </Button>
        </Card>
      </Container>
    );
  }

  const resumes = resumesQuery.data ?? [];

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-zinc-500">
            Your workspace
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Resumes
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Create and manage your professional resumes.
          </p>
        </div>

        <Link to="/resumes/new">
          <Button>
            <Plus size={17} />
            Create resume
          </Button>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="mt-8 p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
            <FileText size={21} />
          </div>

          <h2 className="mt-5 text-lg font-semibold">
            Create your first resume
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Build a structured resume with your experience,
            education, skills, and projects.
          </p>

          <Link to="/resumes/new">
            <Button className="mt-6">
              <Plus size={17} />
              Create resume
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
            />
          ))}
        </div>
      )}
    </Container>
  );
}