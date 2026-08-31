import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

import {
    projectSchema,
    type ProjectFormData,
} from "../schemas/project.schema";

interface ProjectFormProps {
    initialData?: Partial<ProjectFormData>;
    onSubmit: (
        data: ProjectFormData
    ) => Promise<void>;
    onCancel: () => void;
    isSubmitting?: boolean;
    serverError?: string | null;
}

const defaultValues: ProjectFormData = {
    name: "",
    description: "",
    technologies: "",
    projectUrl: "",
    repositoryUrl: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    displayOrder: 0,
};

export function ProjectForm({
                                initialData,
                                onSubmit,
                                onCancel,
                                isSubmitting = false,
                                serverError = null,
                            }: ProjectFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            ...defaultValues,
            ...initialData,
        },
    });

    useEffect(() => {
        reset({
            ...defaultValues,
            ...initialData,
        });
    }, [initialData, reset]);

    const currentlyWorking =
        watch("currentlyWorking");

    useEffect(() => {
        if (currentlyWorking) {
            setValue("endDate", "");
        }
    }, [currentlyWorking, setValue]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            {serverError && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {serverError}
                </div>
            )}

            <Input
                id="project-name"
                label="Project name"
                placeholder="e.g. CareerForge"
                error={errors.name?.message}
                {...register("name")}
            />

            <div>
                <label
                    htmlFor="project-description"
                    className="mb-2 block text-sm font-medium text-zinc-900"
                >
                    Description
                </label>

                <textarea
                    id="project-description"
                    rows={6}
                    placeholder="Describe what you built, your role, and the impact..."
                    {...register("description")}
                    className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                />

                {errors.description?.message && (
                    <p className="mt-1.5 text-xs text-red-600">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <Input
                id="project-technologies"
                label="Technologies"
                placeholder="e.g. Java, Spring Boot, PostgreSQL, React"
                error={errors.technologies?.message}
                {...register("technologies")}
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    id="project-url"
                    label="Project URL"
                    placeholder="https://example.com"
                    error={errors.projectUrl?.message}
                    {...register("projectUrl")}
                />

                <Input
                    id="repository-url"
                    label="Repository URL"
                    placeholder="https://github.com/..."
                    error={errors.repositoryUrl?.message}
                    {...register("repositoryUrl")}
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    id="project-start-date"
                    type="date"
                    label="Start date"
                    error={errors.startDate?.message}
                    {...register("startDate")}
                />

                <Input
                    id="project-end-date"
                    type="date"
                    label="End date"
                    disabled={currentlyWorking}
                    error={errors.endDate?.message}
                    {...register("endDate")}
                />
            </div>

            <label className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3">
                <input
                    type="checkbox"
                    {...register("currentlyWorking")}
                    className="h-4 w-4 rounded border-zinc-300"
                />

                <span className="text-sm text-zinc-700">
          I am currently working on this project
        </span>
            </label>

            <div className="flex justify-end gap-3 border-t border-zinc-100 pt-5">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : "Save project"}
                </Button>
            </div>
        </form>
    );
}