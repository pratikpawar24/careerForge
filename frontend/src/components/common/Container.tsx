import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`
        mx-auto w-full max-w-7xl
        px-5 sm:px-6 lg:px-8
        ${className}
      `}
      {...props}
    />
  );
}