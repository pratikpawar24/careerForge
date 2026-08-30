import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import {
  experienceSchema,
  type ExperienceFormData,
} from "../schemas/experience.schema";

interface ExperienceFormProps {
  initialData?: Partial<ExperienceFormData>;
  onSubmit: (data: ExperienceFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const defaultValues: ExperienceFormData = {
  companyName: "",
  jobTitle: "",
  location: "",
  employmentType: undefined,
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  displayOrder: 0,
};

export function ExperienceForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ExperienceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
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

  const currentlyWorking = watch("currentlyWorking");

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
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="companyName"
          label="Company"
          placeholder="e.g. Google"
          error={errors.companyName?.message}
          {...register("companyName")}
        />

        <Input
          id="jobTitle"
          label="Job title"
          placeholder="e.g. Software Engineer"
          error={errors.jobTitle?.message}
          {...register("jobTitle")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="location"
          label="Location"
          placeholder="e.g. Bengaluru, India"
          error={errors.location?.message}
          {...register("location")}
        />

        <div>
          <label
            htmlFor="employmentType"
            className="mb-2 block text-sm font-medium text-zinc-900"
          >
            Employment type
          </label>

          <select
            id="employmentType"
            {...register("employmentType")}
            className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          >
            <option value="">
              Select employment type
            </option>
            <option value="FULL_TIME">
              Full time
            </option>
            <option value="PART_TIME">
              Part time
            </option>
            <option value="CONTRACT">
              Contract
            </option>
            <option value="INTERNSHIP">
              Internship
            </option>
            <option value="FREELANCE">
              Freelance
            </option>
            <option value="OTHER">
              Other
            </option>
          </select>
        </div>
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
          I currently work here
        </span>
      </label>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-zinc-900"
        >
          Description
        </label>

        <textarea
          id="description"
          rows={6}
          placeholder="Describe your responsibilities, achievements, and impact..."
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
            : "Save experience"}
        </Button>
      </div>
    </form>
  );
}