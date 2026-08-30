import { Outlet } from "react-router-dom";
import { FileText, LayoutDashboard, BriefcaseBusiness, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Logo } from "../components/common/Logo";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Resumes",
    path: "/resumes",
    icon: FileText,
  },
  {
    label: "Applications",
    path: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">

          <Logo />

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Notifications"
            >
              <span className="text-sm">●</span>
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white"
              aria-label="Account menu"
            >
              U
            </button>
          </div>

        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">

        <aside className="hidden w-60 shrink-0 border-r border-zinc-200 bg-white md:block">
          <nav className="flex h-full flex-col p-4">

            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;

                const isActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(`${item.path}/`);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm
                      transition-colors
                      ${
                        isActive
                          ? "bg-zinc-100 font-medium text-zinc-950"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      }
                    `}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto border-t border-zinc-100 pt-4">
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              >
                Log out
              </button>
            </div>

          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}