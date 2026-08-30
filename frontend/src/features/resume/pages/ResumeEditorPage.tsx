import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ExperienceSection } from "../components/ExperienceSection";
import { getResume } from "../../../api/resume.api";
import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { useState } from "react";

export function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [activeSection, setActiveSection] = useState("overview");

  const resumeQuery = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => getResume(resumeId!),
    enabled: Boolean(resumeId),
  });

  if (!resumeId) {
    return (
      <Container className="py-10">
        <Card className="p-8">
          <h1 className="text-lg font-semibold">
            Resume not found
          </h1>

          <Link
            to="/resumes"
            className="mt-4 inline-block text-sm font-medium hover:underline"
          >
            Back to resumes
          </Link>
        </Card>
      </Container>
    );
  }

  if (resumeQuery.isLoading) {
    return (
      <Container className="py-8">
        <div className="space-y-6">
          <div className="h-8 w-64 animate-pulse rounded bg-zinc-200" />

          <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
            <Card className="h-96 animate-pulse bg-zinc-100" />
            <Card className="h-[700px] animate-pulse bg-zinc-100" />
          </div>
        </div>
      </Container>
    );
  }

  if (resumeQuery.isError || !resumeQuery.data) {
    return (
      <Container className="py-10">
        <Card className="p-8 text-center">
          <h1 className="text-lg font-semibold">
            Couldn't load this resume
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            The resume may no longer exist.
          </p>

          <div className="mt-5">
            <Link to="/resumes">
              <Button variant="secondary">
                <ArrowLeft size={16} />
                Back to resumes
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  const resume = resumeQuery.data;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50">

      {/* Editor header */}
      <div className="sticky top-16 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-4">
            <Link
              to="/resumes"
              className="shrink-0 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Back to resumes"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-zinc-950">
                {resume.name}
              </h1>

              <p className="text-xs text-zinc-400">
                {resume.template}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="secondary"
              type="button"
            >
              <Eye size={16} />
              Preview
            </Button>

            <Button
              type="button"
            >
              <Save size={16} />
              Save
            </Button>
          </div>

        </Container>
      </div>

      {/* Editor */}
      <Container className="py-6">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside>
            <Card className="p-3">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Resume sections
              </p>

              <nav className="mt-1 space-y-1">
                <button
                    type="button"
                    onClick={() => setActiveSection("overview")}
                    className={
                        activeSection === "overview"
                        ? "w-full rounded-lg bg-zinc-100 px-3 py-2.5 text-left text-sm font-medium text-zinc-950"
                        : "w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }
                    >
                    Overview
                </button>

                <button
                    type="button"
                    onClick={() => setActiveSection("experience")}
                    className={
                        activeSection === "experience"
                        ? "w-full rounded-lg bg-zinc-100 px-3 py-2.5 text-left text-sm font-medium text-zinc-950"
                        : "w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                    }
                    >
                    Experience
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  Education
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  Skills
                </button>

                <button
                  type="button"
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  Projects
                </button>
              </nav>
            </Card>
          </aside>

          {/* Main editor area */}
          <section className="min-w-0">
                {activeSection === "overview" && (
                    <Card className="p-6 sm:p-8">
                    <div>
                        <p className="text-sm text-zinc-500">
                        Resume
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                        Overview
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                        Your resume is ready to be built. Add your
                        professional experience, education, skills,
                        and projects.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-zinc-200 p-5">
                        <p className="text-sm font-medium">
                            Template
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                            {resume.template}
                        </p>
                        </div>

                        <div className="rounded-xl border border-zinc-200 p-5">
                        <p className="text-sm font-medium">
                            Status
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                            {resume.isDefault
                            ? "Default resume"
                            : "Resume"}
                        </p>
                        </div>
                    </div>
                    </Card>
                )}

                {activeSection === "experience" && (
                    <ExperienceSection
                    resumeId={resume.id}
                    />
                )}

            </section>
        </div>
      </Container>
    </div>
  );
}