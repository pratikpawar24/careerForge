import {
  FileText,
  LayoutDashboard,
  BriefcaseBusiness,
  Sparkles,
  Download,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../components/common/Container";

const features = [
  {
    icon: FileText,
    title: "Professional resumes",
    description:
      "Build structured resumes with experience, education, skills, and projects organized in one place.",
  },
  {
    icon: LayoutDashboard,
    title: "One focused workspace",
    description:
      "Keep your career information organized instead of managing scattered documents and spreadsheets.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Application tracking",
    description:
      "Track where you've applied, monitor application status, and keep your job search organized.",
  },
  {
    icon: Sparkles,
    title: "Multiple templates",
    description:
      "Choose a resume presentation that fits your experience and the role you're targeting.",
  },
  {
    icon: Download,
    title: "Export to PDF",
    description:
      "Turn your completed resume into a professional PDF ready to send to employers.",
  },
  {
    icon: ShieldCheck,
    title: "Your data, your account",
    description:
      "Your career information stays associated with your account and protected behind authentication.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-zinc-500">
            Everything in one place
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Tools for the entire job search.
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-600">
            CareerForge brings the most important parts of your
            career workflow into a single workspace.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                className="bg-white p-7 sm:p-8"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-800">
                  <Icon size={19} />
                </div>

                <h3 className="mt-5 text-base font-semibold text-zinc-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}