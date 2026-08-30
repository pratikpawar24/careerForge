import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Container } from "../../../components/common/Container";
import { login } from "../../../api/auth.api";
import {
  loginSchema,
  type LoginFormData,
} from "../auth.schemas";
import { setAccessToken } from "../auth.storage";

interface LocationState {
  email?: string;
  verified?: boolean;
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: state?.email ?? "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);

      setAccessToken(response.accessToken);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to log in. Please check your credentials.";

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
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Sign in to continue to your workspace.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

            {state?.verified && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Email verified successfully. You can now log in.
                </span>
              </div>
            )}

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
                placeholder="Your password"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register("password")}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign in"}

                {!isSubmitting && (
                  <ArrowRight size={17} />
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-zinc-900 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}