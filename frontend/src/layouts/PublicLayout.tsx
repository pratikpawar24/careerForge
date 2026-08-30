import type { ReactNode } from "react";
import { Navbar } from "../features/landing/components/Navbar";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <main>
        {children}
      </main>
    </div>
  );
}