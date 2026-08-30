import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98]",

    secondary:
      "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 active:scale-[0.98]",

    ghost:
      "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",

    danger:
      "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}