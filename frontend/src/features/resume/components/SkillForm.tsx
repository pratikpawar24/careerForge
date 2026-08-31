import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

import {
  skillSchema,
  type SkillFormData,
} from "../schemas/skill.schema";

interface SkillFormProps {
  initialData?: Partial<SkillFormData>;
  onSubmit: (data: SkillFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  serverError?: string | null;
}

const defaultValues: SkillFormData = {
  name: "",
  category: "",
  proficiencyLevel: "",
  displayOrder: 0,
};

export function SkillForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  serverError = null,
}: SkillFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
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
        id="skill-name"
        label="Skill"
        placeholder="e.g. Java"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="skill-category"
          label="Category"
          placeholder="e.g. Programming Languages"
          error={errors.category?.message}
          {...register("category")}
        />

        <Input
          id="skill-proficiency"
          label="Proficiency"
          placeholder="e.g. Advanced"
          error={errors.proficiencyLevel?.message}
          {...register("proficiencyLevel")}
        />
      </div>

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
            : "Save skill"}
        </Button>
      </div>
    </form>
  );
}