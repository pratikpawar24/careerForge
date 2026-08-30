import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Container } from "../../../components/common/Container";
import {
  resendOtp,
  verifyEmail,
} from "../../../api/auth.api";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../auth.schemas";

interface LocationState {
  email?: string;
}

export function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  const email = state?.email ?? "";

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      await verifyEmail(data);

      navigate("/login", {
        state: {
          email: data.email,
          verified: true,
        },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to verify your email. Please check the OTP and try again.";

      setError("root", {
        message,
      });
    }
  };

  const handleResend = async () => {
    if (!email || resendCooldown > 0 || resendLoading) {
      return;
    }

    setResendLoading(true);
    setResendMessage("");

    try {
      await resendOtp({ email });

      setResendCooldown(60);
      setResendMessage(
        "A new verification code has been sent."
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to resend the verification code.";

      setResendMessage(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50">
      <Container className="flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
              <Mail size={21} />
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950">
              Verify your email
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
              Enter the 6-digit verification code we sent to your email.
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

            {resendMessage && (
              <div
                role="status"
                className="mb-5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
              >
                {resendMessage}
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
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                label="Verification code"
                placeholder="123456"
                error={errors.otp?.message}
                {...register("otp")}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting
                  ? "Verifying..."
                  : "Verify email"}

                {!isSubmitting && (
                  <ArrowRight size={17} />
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-500">
                Didn't receive the code?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={
                  !email ||
                  resendCooldown > 0 ||
                  resendLoading
                }
                className="mt-2 text-sm font-medium text-zinc-900 disabled:cursor-not-allowed disabled:text-zinc-400"
              >
                {resendLoading
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend code in ${resendCooldown}s`
                    : "Resend verification code"}
              </button>
            </div>

          </div>
        </div>
      </Container>
    </main>
  );
}