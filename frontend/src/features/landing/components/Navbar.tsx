import { Menu } from "lucide-react";
import { Logo } from "../../../components/common/Logo";
import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              How it works
            </a>

            <a
              href="#applications"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-950"
            >
              Applications
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost">
              Log in
            </Button>

            <Button>
              Get started
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </Container>
    </header>
  );
}