import { Link } from "react-router-dom";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2"
      aria-label="CareerForge home"
    >
      <span
        className={`
          flex h-8 w-8 items-center justify-center
          rounded-lg text-sm font-bold
          ${light
            ? "bg-white text-zinc-950"
            : "bg-zinc-900 text-white"}
        `}
      >
        C
      </span>

      <span
        className={`
          text-base font-semibold tracking-tight
          ${light ? "text-white" : "text-zinc-950"}
        `}
      >
        CareerForge
      </span>
    </Link>
  );
}