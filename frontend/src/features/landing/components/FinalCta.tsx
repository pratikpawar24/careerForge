import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";

export function FinalCta() {
  return (
    <section className="border-t border-zinc-200 py-24 sm:py-32">
      <Container>
        <div className="rounded-3xl bg-zinc-950 px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to build what comes next?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            Create your CareerForge account and start building
            a stronger career workflow today.
          </p>

          <div className="mt-8">
            <Link to="/register">
              <Button className="bg-white text-zinc-950 hover:bg-zinc-100">
                Get started
                <ArrowRight size={17} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}