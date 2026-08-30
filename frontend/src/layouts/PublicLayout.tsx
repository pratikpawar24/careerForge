import { Outlet } from "react-router-dom";
import { Navbar } from "../features/landing/components/Navbar";

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}