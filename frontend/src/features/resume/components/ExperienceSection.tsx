import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  createResumeExperience,
  deleteResumeExperience,
  getResumeExperiences,
  updateResumeExperience,
  type ResumeExperienceResponse,
} from "../../../api/resumeExperience.api";

import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import {
  type ExperienceFormData,
} from "../schemas/experience.schema";

import { ExperienceForm } from "./ExperienceForm";

interface ExperienceSectionProps {
  resumeId: string;
}

export function ExperienceSection({
  resumeId,
}: ExperienceSectionProps) {
  const queryClient = useQueryClient();

  const [editingExperience, setEditingExperience] =
    useState<ResumeExperienceResponse | null>(null);

  const [isAdding, setIsAdding] = useState(false);

  const experiencesQuery = useQuery({
    queryKey: ["resume", resumeId, "experiences"],
    queryFn: () => getResumeExperiences(resumeId),
  });

  const createMutation = useMutation({
    mutationFn: (data: ExperienceFormData) =>
      createResumeExperience(resumeId, {
        ...data,
        location: data.location || undefined,
        employmentType:
          data.employmentType || undefined,
        endDate: data.currentlyWorking
          ? undefined
          : data.endDate || undefined,
        description: data.description || undefined,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resume", resumeId, "experiences"],
      });

      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      experienceId,
      data,
    }: {
      experienceId: string;
      data: ExperienceFormData;
    }) =>
      updateResumeExperience(
        resumeId,
        experienceId,
        {
          ...data,
          location: data.location || undefined,
          employmentType:
            data.employmentType || undefined,
          endDate: data.currentlyWorking
            ? undefined
            : data.endDate || undefined,
          description: data.description || undefined,
        }
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resume", resumeId, "experiences"],
      });

      setEditingExperience(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (experienceId: string) =>
      deleteResumeExperience(resumeId, experienceId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["resume", resumeId, "experiences"],
      });
    },
  });

  const handleCreate = async (
    data: ExperienceFormData
  ) => {
    await createMutation.mutateAsync(data);
  };

  const handleUpdate = async (
    data: ExperienceFormData
  ) => {
    if (!editingExperience) {
      return;
    }

    await updateMutation.mutateAsync({
      experienceId: editingExperience.id,
      data,
    });
  };

  if (experiencesQuery.isLoading) {
    return (
      <Card className="p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-zinc-200" />

        <div className="mt-6 h-32 animate-pulse rounded bg-zinc-100" />
      </Card>
    );
  }

  if (experiencesQuery.isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-red-600">
          Couldn't load your experience.
        </p>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => experiencesQuery.refetch()}
        >
          Try again
        </Button>
      </Card>
    );
  }

  const experiences =
    experiencesQuery.data ?? [];

  if (isAdding) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Add experience
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Add a role to your professional history.
          </p>
        </div>

        <ExperienceForm
          onSubmit={handleCreate}
          onCancel={() => setIsAdding(false)}
          isSubmitting={createMutation.isPending}
        />
      </Card>
    );
  }

  if (editingExperience) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Edit experience
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Update your professional experience.
          </p>
        </div>

        <ExperienceForm
          initialData={{
            companyName:
              editingExperience.companyName,
            jobTitle:
              editingExperience.jobTitle,
            location:
              editingExperience.location ?? "",
            employmentType:
              editingExperience.employmentType ??
              undefined,
            startDate:
              editingExperience.startDate,
            endDate:
              editingExperience.endDate ?? "",
            currentlyWorking:
              editingExperience.currentlyWorking,
            description:
              editingExperience.description ?? "",
            displayOrder:
              editingExperience.displayOrder,
          }}
          onSubmit={handleUpdate}
          onCancel={() =>
            setEditingExperience(null)
          }
          isSubmitting={updateMutation.isPending}
        />
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Experience
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your professional work history.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          Add experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <p className="text-sm text-zinc-500">
            No experience added yet.
          </p>

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => setIsAdding(true)}
          >
            Add your first experience
          </Button>
        </Card>
      ) : (
        <div className="mt-6 space-y-4">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className="p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">
                  <h4 className="font-semibold text-zinc-950">
                    {experience.jobTitle}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-700">
                    {experience.companyName}
                  </p>

                  <p className="mt-1 text-xs text-zinc-400">
                    {experience.startDate}
                    {" — "}
                    {experience.currentlyWorking
                      ? "Present"
                      : experience.endDate ?? ""}
                  </p>

                  {experience.location && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {experience.location}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingExperience(
                        experience
                      )
                    }
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label="Edit experience"
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
                          "Delete this experience?"
                        )
                      ) {
                        deleteMutation.mutate(
                          experience.id
                        );
                      }
                    }}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete experience"
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