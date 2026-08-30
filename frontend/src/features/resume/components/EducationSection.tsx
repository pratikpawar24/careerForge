import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  createResumeEducation,
  deleteResumeEducation,
  getResumeEducations,
  updateResumeEducation,
  type ResumeEducationResponse,
} from "../../../api/resumeEducation.api";

import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import {
  type EducationFormData,
} from "../schemas/education.schema";

import { EducationForm } from "./EducationForm";

interface EducationSectionProps {
  resumeId: string;
}

export function EducationSection({
  resumeId,
}: EducationSectionProps) {
  const queryClient = useQueryClient();

  const [editingEducation, setEditingEducation] =
    useState<ResumeEducationResponse | null>(null);

  const [isAdding, setIsAdding] = useState(false);

  const educationQuery = useQuery({
    queryKey: ["resume", resumeId, "educations"],
    queryFn: () => getResumeEducations(resumeId),
  });

  const createMutation = useMutation({
    mutationFn: (data: EducationFormData) =>
      createResumeEducation(resumeId, {
        ...data,
        fieldOfStudy:
          data.fieldOfStudy || undefined,
        location:
          data.location || undefined,
        startDate:
          data.startDate || undefined,
        endDate:
          data.currentlyStudying
            ? undefined
            : data.endDate || undefined,
        grade:
          data.grade || undefined,
        description:
          data.description || undefined,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "educations",
        ],
      });

      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      educationId,
      data,
    }: {
      educationId: string;
      data: EducationFormData;
    }) =>
      updateResumeEducation(
        resumeId,
        educationId,
        {
          ...data,
          fieldOfStudy:
            data.fieldOfStudy || undefined,
          location:
            data.location || undefined,
          startDate:
            data.startDate || undefined,
          endDate:
            data.currentlyStudying
              ? undefined
              : data.endDate || undefined,
          grade:
            data.grade || undefined,
          description:
            data.description || undefined,
        }
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "educations",
        ],
      });

      setEditingEducation(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (educationId: string) =>
      deleteResumeEducation(
        resumeId,
        educationId
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "educations",
        ],
      });
    },
  });

  if (educationQuery.isLoading) {
    return (
      <Card className="p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-zinc-200" />

        <div className="mt-6 h-32 animate-pulse rounded bg-zinc-100" />
      </Card>
    );
  }

  if (educationQuery.isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-red-600">
          Couldn't load your education.
        </p>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() =>
            educationQuery.refetch()
          }
        >
          Try again
        </Button>
      </Card>
    );
  }

  const educations =
    educationQuery.data ?? [];

  if (isAdding) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Add education
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Add an educational qualification.
          </p>
        </div>

        <EducationForm
          onSubmit={async (data) => {
            await createMutation.mutateAsync(data);
          }}
          onCancel={() =>
            setIsAdding(false)
          }
          isSubmitting={
            createMutation.isPending
          }
        />
      </Card>
    );
  }

  if (editingEducation) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Edit education
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Update this educational qualification.
          </p>
        </div>

        <EducationForm
          initialData={{
            institutionName:
              editingEducation.institutionName,
            degree:
              editingEducation.degree,
            fieldOfStudy:
              editingEducation.fieldOfStudy ?? "",
            location:
              editingEducation.location ?? "",
            startDate:
              editingEducation.startDate ?? "",
            endDate:
              editingEducation.endDate ?? "",
            currentlyStudying:
              editingEducation.currentlyStudying,
            grade:
              editingEducation.grade ?? "",
            description:
              editingEducation.description ?? "",
            displayOrder:
              editingEducation.displayOrder,
          }}
          onSubmit={async (data) => {
                await updateMutation.mutateAsync({
                    educationId: editingEducation.id,
                    data,
                });
            }}
          onCancel={() =>
            setEditingEducation(null)
          }
          isSubmitting={
            updateMutation.isPending
          }
        />
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Education
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your academic background.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          Add education
        </Button>
      </div>

      {educations.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <p className="text-sm text-zinc-500">
            No education added yet.
          </p>

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => setIsAdding(true)}
          >
            Add your first education
          </Button>
        </Card>
      ) : (
        <div className="mt-6 space-y-4">
          {educations.map((education) => (
            <Card
              key={education.id}
              className="p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0">
                  <h4 className="font-semibold text-zinc-950">
                    {education.degree}
                  </h4>

                  <p className="mt-1 text-sm text-zinc-700">
                    {education.institutionName}
                  </p>

                  {education.fieldOfStudy && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {education.fieldOfStudy}
                    </p>
                  )}

                  {(education.startDate ||
                    education.endDate ||
                    education.currentlyStudying) && (
                    <p className="mt-1 text-xs text-zinc-400">
                      {education.startDate ?? ""}
                      {" — "}
                      {education.currentlyStudying
                        ? "Present"
                        : education.endDate ?? ""}
                    </p>
                  )}

                  {education.location && (
                    <p className="mt-2 text-sm text-zinc-500">
                      {education.location}
                    </p>
                  )}

                  {education.grade && (
                    <p className="mt-2 text-sm text-zinc-500">
                      Grade: {education.grade}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingEducation(
                        education
                      )
                    }
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label="Edit education"
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
                          "Delete this education?"
                        )
                      ) {
                        deleteMutation.mutate(
                          education.id
                        );
                      }
                    }}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete education"
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