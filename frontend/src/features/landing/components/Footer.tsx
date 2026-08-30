import { Logo } from "../../../components/common/Logo";
import { Container } from "../../../components/common/Container";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />

          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} CareerForge. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}