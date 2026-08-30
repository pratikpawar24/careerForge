import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createResume,
} from "../../../api/resume.api";

import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";

import {
  createResumeSchema,
  type CreateResumeFormData,
} from "../resume.schemas";

export function CreateResumePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createResume,

    onSuccess: async (resume) => {
      await queryClient.invalidateQueries({
        queryKey: ["resumes"],
      });

      navigate(`/resumes/${resume.id}`);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateResumeFormData>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (
    data: CreateResumeFormData
  ) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to create your resume.";

      setError("root", {
        message,
      });
    }
  };

  const submitting =
    isSubmitting || mutation.isPending;

  return (
    <Container className="py-8 sm:py-10">
      <div className="mx-auto max-w-xl">

        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/resumes")}
            className="text-sm text-zinc-500 hover:text-zinc-900"
          >
            ← Back to resumes
          </button>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Create a resume
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Give your resume a name. You can change it later.
          </p>
        </div>

        <Card className="p-6 sm:p-8">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100">
            <FileText size={20} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-5"
          >
            {errors.root && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errors.root.message}
              </div>
            )}

            <Input
              id="name"
              label="Resume name"
              placeholder="e.g. Software Engineer Resume"
              autoComplete="off"
              error={errors.name?.message}
              {...register("name")}
            />

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              {submitting
                ? "Creating..."
                : "Create resume"}

              {!submitting && (
                <ArrowRight size={17} />
              )}
            </Button>
          </form>

        </Card>
      </div>
    </Container>
  );
}