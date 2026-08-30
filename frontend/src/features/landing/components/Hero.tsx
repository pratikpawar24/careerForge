import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(24,24,27,0.06),transparent_55%)]" />

      <Container>
        <div className="mx-auto max-w-4xl py-24 text-center sm:py-32 lg:py-40">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-sm text-zinc-600"
          >
            <Sparkles size={15} />

            Build your career with intention.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-5xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl"
          >
            Your career.
            <br />

            <span className="text-zinc-500">
              Built better.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-600"
          >
            Create standout resumes, organize your job search,
            and keep your career moving forward — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/register">
              <Button className="h-11 px-5">
                Create your resume
                <ArrowRight size={17} />
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="secondary"
                className="h-11 px-5"
              >
                I already have an account
              </Button>
            </Link>
          </motion.div>

          <p className="mt-5 text-xs text-zinc-400">
            Free to get started · No credit card required
          </p>
        </div>
      </Container>
    </section>
  );
}