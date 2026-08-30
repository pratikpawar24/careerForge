import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

import {
  educationSchema,
  type EducationFormData,
} from "../schemas/education.schema";

interface EducationFormProps {
  initialData?: Partial<EducationFormData>;
  onSubmit: (
    data: EducationFormData
  ) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const defaultValues: EducationFormData = {
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  grade: "",
  description: "",
  displayOrder: 0,
};

export function EducationForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: EducationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
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

  const currentlyStudying =
    watch("currentlyStudying");

  useEffect(() => {
    if (currentlyStudying) {
      setValue("endDate", "");
    }
  }, [currentlyStudying, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="institutionName"
          label="Institution"
          placeholder="e.g. University of Mumbai"
          error={errors.institutionName?.message}
          {...register("institutionName")}
        />

        <Input
          id="degree"
          label="Degree"
          placeholder="e.g. Bachelor of Engineering"
          error={errors.degree?.message}
          {...register("degree")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="fieldOfStudy"
          label="Field of study"
          placeholder="e.g. Computer Science"
          error={errors.fieldOfStudy?.message}
          {...register("fieldOfStudy")}
        />

        <Input
          id="location"
          label="Location"
          placeholder="e.g. Mumbai, India"
          error={errors.location?.message}
          {...register("location")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="startDate"
          type="date"
          label="Start date"
          error={errors.startDate?.message}
          {...register("startDate")}
        />

        <Input
          id="endDate"
          type="date"
          label="End date"
          disabled={currentlyStudying}
          error={errors.endDate?.message}
          {...register("endDate")}
        />
      </div>

      <label className="flex items-center gap-3 rounded-lg border border-zinc-200 px-4 py-3">
        <input
          type="checkbox"
          {...register("currentlyStudying")}
          className="h-4 w-4 rounded border-zinc-300"
        />

        <span className="text-sm text-zinc-700">
          I currently study here
        </span>
      </label>

      <Input
        id="grade"
        label="Grade"
        placeholder="e.g. 8.7 CGPA"
        error={errors.grade?.message}
        {...register("grade")}
      />

      <div>
        <label
          htmlFor="education-description"
          className="mb-2 block text-sm font-medium text-zinc-900"
        >
          Description
        </label>

        <textarea
          id="education-description"
          rows={5}
          placeholder="Add relevant coursework, achievements, activities, or other details..."
          {...register("description")}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
        />

        {errors.description?.message && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
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
            : "Save education"}
        </Button>
      </div>
    </form>
  );
}