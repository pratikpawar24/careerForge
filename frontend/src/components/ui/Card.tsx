import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border border-zinc-200
        bg-white
        shadow-sm
        ${className}
      `}
      {...props}
    />
  );
}