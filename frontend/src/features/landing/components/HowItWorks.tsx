import { ArrowRight, FilePlus2, PencilLine, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../components/common/Container";

const steps = [
  {
    number: "01",
    icon: FilePlus2,
    title: "Create your profile",
    description:
      "Start with the information that represents your professional identity.",
  },
  {
    number: "02",
    icon: PencilLine,
    title: "Build your resume",
    description:
      "Add your experience, education, skills, and projects in a structured workspace.",
  },
  {
    number: "03",
    icon: Send,
    title: "Move your career forward",
    description:
      "Export your resume and organize the applications you're pursuing.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-zinc-200 bg-zinc-950 py-24 text-white sm:py-32"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-400">
            Simple by design
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From profile to application.
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-400">
            CareerForge keeps the workflow straightforward so you
            can spend more time preparing for the opportunities that matter.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                className="relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Icon size={20} />
                  </div>

                  <span className="text-sm font-medium text-zinc-600">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight
                    size={18}
                    className="absolute right-0 top-5 hidden text-zinc-700 lg:block"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}