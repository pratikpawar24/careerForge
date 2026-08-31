import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  createResumeSkill,
  deleteResumeSkill,
  getResumeSkills,
  updateResumeSkill,
  type ResumeSkillResponse,
} from "../../../api/resumeSkill.api";

import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";

import {
  type SkillFormData,
} from "../schemas/skill.schema";

import { SkillForm } from "./SkillForm";

interface SkillsSectionProps {
  resumeId: string;
}

function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ??
    "Unable to save the skill. Please try again."
  );
}

export function SkillsSection({
  resumeId,
}: SkillsSectionProps) {
  const queryClient = useQueryClient();

  const [editingSkill, setEditingSkill] =
    useState<ResumeSkillResponse | null>(null);

  const [isAdding, setIsAdding] = useState(false);

  const [serverError, setServerError] =
    useState<string | null>(null);

  const skillsQuery = useQuery({
    queryKey: ["resume", resumeId, "skills"],
    queryFn: () => getResumeSkills(resumeId),
  });

  const createMutation = useMutation({
    mutationFn: (data: SkillFormData) =>
      createResumeSkill(resumeId, {
        name: data.name,
        category: data.category || undefined,
        proficiencyLevel:
          data.proficiencyLevel || undefined,
        displayOrder: data.displayOrder,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "skills",
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
      skillId,
      data,
    }: {
      skillId: string;
      data: SkillFormData;
    }) =>
      updateResumeSkill(
        resumeId,
        skillId,
        {
          name: data.name,
          category:
            data.category || undefined,
          proficiencyLevel:
            data.proficiencyLevel || undefined,
          displayOrder:
            data.displayOrder,
        }
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "skills",
        ],
      });

      setServerError(null);
      setEditingSkill(null);
    },

    onError: (error) => {
      setServerError(getErrorMessage(error));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (skillId: string) =>
      deleteResumeSkill(
        resumeId,
        skillId
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "resume",
          resumeId,
          "skills",
        ],
      });
    },
  });

  if (skillsQuery.isLoading) {
    return (
      <Card className="p-6">
        <div className="h-6 w-24 animate-pulse rounded bg-zinc-200" />

        <div className="mt-6 h-32 animate-pulse rounded bg-zinc-100" />
      </Card>
    );
  }

  if (skillsQuery.isError) {
    return (
      <Card className="p-6">
        <p className="text-sm text-red-600">
          Couldn't load your skills.
        </p>

        <Button
          variant="secondary"
          className="mt-4"
          onClick={() =>
            skillsQuery.refetch()
          }
        >
          Try again
        </Button>
      </Card>
    );
  }

  const skills = skillsQuery.data ?? [];

  if (isAdding) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Add skill
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Add a skill to your resume.
          </p>
        </div>

        <SkillForm
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

  if (editingSkill) {
    return (
      <Card className="p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Edit skill
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Update this skill.
          </p>
        </div>

        <SkillForm
          initialData={{
            name: editingSkill.name,
            category:
              editingSkill.category ?? "",
            proficiencyLevel:
              editingSkill.proficiencyLevel ?? "",
            displayOrder:
              editingSkill.displayOrder,
          }}
          onSubmit={async (data) => {
            setServerError(null);

            await updateMutation.mutateAsync({
              skillId: editingSkill.id,
              data,
            });
          }}
          onCancel={() => {
            setServerError(null);
            setEditingSkill(null);
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
            Skills
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Highlight the skills that represent your
            expertise.
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
          Add skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card className="mt-6 p-8 text-center">
          <p className="text-sm text-zinc-500">
            No skills added yet.
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
            Add your first skill
          </Button>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className="p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-zinc-950">
                    {skill.name}
                  </h4>

                  {skill.category && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {skill.category}
                    </p>
                  )}

                  {skill.proficiencyLevel && (
                    <span className="mt-3 inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      {skill.proficiencyLevel}
                    </span>
                  )}
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setServerError(null);
                      setEditingSkill(skill);
                    }}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label="Edit skill"
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
                          "Delete this skill?"
                        )
                      ) {
                        deleteMutation.mutate(
                          skill.id
                        );
                      }
                    }}
                    className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete skill"
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