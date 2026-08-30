import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Container } from "../../../components/common/Container";
import { register as registerUser } from "../../../api/auth.api";
import {
  registerSchema,
  type RegisterFormData,
} from "../auth.schemas";

export function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data);

      navigate("/verify-email", {
        state: {
          email: response.email,
        },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to create your account. Please try again.";

      setError("root", {
        message,
      });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <Container className="flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <Link
              to="/"
              className="text-sm font-semibold tracking-tight text-zinc-950"
            >
              CareerForge
            </Link>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Start building your career workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

            {errors.root && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errors.root.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting
                  ? "Creating account..."
                  : "Create account"}

                {!isSubmitting && <ArrowRight size={17} />}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-zinc-900 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-zinc-400">
            By creating an account, you agree to use CareerForge
            responsibly.
          </p>
        </div>
      </Container>
    </main>
  );
}