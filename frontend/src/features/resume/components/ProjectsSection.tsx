import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
    createResumeProject,
    deleteResumeProject,
    getResumeProjects,
    updateResumeProject,
    type ResumeProjectResponse,
} from "../../../api/resumeProject.api";

import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import {
    type ProjectFormData,
} from "../schemas/project.schema";

import { ProjectForm } from "./ProjectForm";

interface ProjectsSectionProps {
    resumeId: string;
}

function getErrorMessage(error: any): string {
    return (
        error?.response?.data?.message ??
        "Unable to save the project. Please try again."
    );
}

export function ProjectsSection({
                                    resumeId,
                                }: ProjectsSectionProps) {
    const queryClient = useQueryClient();

    const [editingProject, setEditingProject] =
        useState<ResumeProjectResponse | null>(null);

    const [isAdding, setIsAdding] = useState(false);

    const [serverError, setServerError] =
        useState<string | null>(null);

    const projectsQuery = useQuery({
        queryKey: ["resume", resumeId, "projects"],
        queryFn: () => getResumeProjects(resumeId),
    });

    const createMutation = useMutation({
        mutationFn: (data: ProjectFormData) =>
            createResumeProject(resumeId, {
                name: data.name,
                description:
                    data.description || undefined,
                technologies:
                    data.technologies || undefined,
                projectUrl:
                    data.projectUrl || undefined,
                repositoryUrl:
                    data.repositoryUrl || undefined,
                startDate:
                    data.startDate || undefined,
                endDate: data.currentlyWorking
                    ? undefined
                    : data.endDate || undefined,
                currentlyWorking:
                data.currentlyWorking,
                displayOrder:
                data.displayOrder,
            }),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "resume",
                    resumeId,
                    "projects",
                ],
            });

            setServerError(null);
            setIsAdding(false);
        },

        onError: (error) => {
            setServerError(getErrorMessage(error));
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({
                         projectId,
                         data,
                     }: {
            projectId: string;
            data: ProjectFormData;
        }) =>
            updateResumeProject(
                resumeId,
                projectId,
                {
                    name: data.name,
                    description:
                        data.description || undefined,
                    technologies:
                        data.technologies || undefined,
                    projectUrl:
                        data.projectUrl || undefined,
                    repositoryUrl:
                        data.repositoryUrl || undefined,
                    startDate:
                        data.startDate || undefined,
                    endDate: data.currentlyWorking
                        ? undefined
                        : data.endDate || undefined,
                    currentlyWorking:
                    data.currentlyWorking,
                    displayOrder:
                    data.displayOrder,
                }
            ),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "resume",
                    resumeId,
                    "projects",
                ],
            });

            setServerError(null);
            setEditingProject(null);
        },

        onError: (error) => {
            setServerError(getErrorMessage(error));
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (projectId: string) =>
            deleteResumeProject(
                resumeId,
                projectId
            ),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "resume",
                    resumeId,
                    "projects",
                ],
            });
        },
    });

    if (projectsQuery.isLoading) {
        return (
            <Card className="p-6">
                <div className="h-6 w-24 animate-pulse rounded bg-zinc-200" />

                <div className="mt-6 h-32 animate-pulse rounded bg-zinc-100" />
            </Card>
        );
    }

    if (projectsQuery.isError) {
        return (
            <Card className="p-6">
                <p className="text-sm text-red-600">
                    Couldn't load your projects.
                </p>

                <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() =>
                        projectsQuery.refetch()
                    }
                >
                    Try again
                </Button>
            </Card>
        );
    }

    const projects =
        projectsQuery.data ?? [];

    if (isAdding) {
        return (
            <Card className="p-6 sm:p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">
                        Add project
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Add a project to your resume.
                    </p>
                </div>

                <ProjectForm
                    onSubmit={async (data) => {
                        setServerError(null);
                        await createMutation.mutateAsync(data);
                    }}
                    onCancel={() => {
                        setServerError(null);
                        setIsAdding(false);
                    }}
                    isSubmitting={
                        createMutation.isPending
                    }
                    serverError={serverError}
                />
            </Card>
        );
    }

    if (editingProject) {
        return (
            <Card className="p-6 sm:p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold">
                        Edit project
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Update this project.
                    </p>
                </div>

                <ProjectForm
                    initialData={{
                        name: editingProject.name,
                        description:
                            editingProject.description ?? "",
                        technologies:
                            editingProject.technologies ?? "",
                        projectUrl:
                            editingProject.projectUrl ?? "",
                        repositoryUrl:
                            editingProject.repositoryUrl ?? "",
                        startDate:
                            editingProject.startDate ?? "",
                        endDate:
                            editingProject.endDate ?? "",
                        currentlyWorking:
                        editingProject.currentlyWorking,
                        displayOrder:
                        editingProject.displayOrder,
                    }}
                    onSubmit={async (data) => {
                        setServerError(null);

                        await updateMutation.mutateAsync({
                            projectId:
                            editingProject.id,
                            data,
                        });
                    }}
                    onCancel={() => {
                        setServerError(null);
                        setEditingProject(null);
                    }}
                    isSubmitting={
                        updateMutation.isPending
                    }
                    serverError={serverError}
                />
            </Card>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-semibold">
                        Projects
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Showcase projects that demonstrate your skills.
                    </p>
                </div>

                <Button
                    type="button"
                    onClick={() => {
                        setServerError(null);
                        setIsAdding(true);
                    }}
                >
                    <Plus size={16} />
                    Add project
                </Button>
            </div>

            {projects.length === 0 ? (
                <Card className="mt-6 p-8 text-center">
                    <p className="text-sm text-zinc-500">
                        No projects added yet.
                    </p>

                    <Button
                        type="button"
                        variant="secondary"
                        className="mt-4"
                        onClick={() => {
                            setServerError(null);
                            setIsAdding(true);
                        }}
                    >
                        Add your first project
                    </Button>
                </Card>
            ) : (
                <div className="mt-6 space-y-4">
                    {projects.map((project) => (
                        <Card
                            key={project.id}
                            className="p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                <div className="min-w-0">
                                    <h4 className="font-semibold text-zinc-950">
                                        {project.name}
                                    </h4>

                                    {project.description && (
                                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                                            {project.description}
                                        </p>
                                    )}

                                    {project.technologies && (
                                        <div className="mt-3">
                      <span className="text-xs font-medium text-zinc-400">
                        Technologies
                      </span>

                                            <p className="mt-1 text-sm text-zinc-600">
                                                {project.technologies}
                                            </p>
                                        </div>
                                    )}

                                    {(project.startDate ||
                                        project.endDate ||
                                        project.currentlyWorking) && (
                                        <p className="mt-3 text-xs text-zinc-400">
                                            {project.startDate ?? ""}
                                            {" — "}
                                            {project.currentlyWorking
                                                ? "Present"
                                                : project.endDate ?? ""}
                                        </p>
                                    )}

                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {project.projectUrl && (
                                            <a
                                                href={project.projectUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-medium text-zinc-900 hover:underline"
                                            >
                                                Project
                                            </a>
                                        )}

                                        {project.repositoryUrl && (
                                            <a
                                                href={project.repositoryUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-medium text-zinc-900 hover:underline"
                                            >
                                                Repository
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="flex shrink-0 gap-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setServerError(null);
                                            setEditingProject(project);
                                        }}
                                        className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                        aria-label="Edit project"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        type="button"
                                        disabled={
                                            deleteMutation.isPending
                                        }
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Delete this project?"
                                                )
                                            ) {
                                                deleteMutation.mutate(
                                                    project.id
                                                );
                                            }
                                        }}
                                        className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                        aria-label="Delete project"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}