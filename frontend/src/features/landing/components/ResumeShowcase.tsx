import { Check, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../components/common/Container";

const sections = [
  "Experience",
  "Education",
  "Skills",
  "Projects",
];

export function ResumeShowcase() {
  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          {/* Left side */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
              <Sparkles size={14} />
              Resume builder
            </div>

            <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Create a resume that feels like you.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
              Organize your experience, education, skills, and projects
              in one focused workspace. See every change reflected in
              your resume instantly.
            </p>

            <div className="mt-8 space-y-3">
              {sections.map((section, index) => (
                <motion.div
                  key={section}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-3 text-sm text-zinc-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check size={13} />
                  </span>

                  {section}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-zinc-200/50 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">

              {/* Fake application header */}
              <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <FileText size={17} className="text-zinc-500" />

                  <span className="text-sm font-medium text-zinc-800">
                    My Resume
                  </span>
                </div>

                <span className="text-xs text-zinc-400">
                  Saved
                </span>
              </div>

              <div className="grid grid-cols-[150px_1fr] bg-zinc-100">

                {/* Sidebar */}
                <div className="hidden border-r border-zinc-200 bg-white p-4 sm:block">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Sections
                  </p>

                  <div className="space-y-1">
                    {sections.map((section, index) => (
                      <div
                        key={section}
                        className={`
                          rounded-md px-3 py-2 text-xs
                          ${
                            index === 0
                              ? "bg-zinc-100 font-medium text-zinc-900"
                              : "text-zinc-500"
                          }
                        `}
                      >
                        {section}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div className="p-5 sm:p-8">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mx-auto max-w-[470px] bg-white p-6 shadow-md sm:p-8"
                  >

                    <div className="border-b border-zinc-200 pb-5">
                      <div className="text-xl font-bold tracking-tight text-zinc-950">
                        Alex Johnson
                      </div>

                      <div className="mt-1 text-xs text-zinc-500">
                        Software Engineer
                      </div>

                      <div className="mt-3 text-[10px] text-zinc-400">
                        alex@example.com · Bengaluru, India
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800">
                        Experience
                      </h3>

                      <div className="mt-3 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-zinc-900">
                            Software Engineer
                          </div>

                          <div className="mt-1 text-[10px] text-zinc-500">
                            Technology Company · 2023 — Present
                          </div>

                          <div className="mt-2 h-2 w-full rounded bg-zinc-100" />
                          <div className="mt-1 h-2 w-5/6 rounded bg-zinc-100" />
                          <div className="mt-1 h-2 w-4/6 rounded bg-zinc-100" />
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-zinc-900">
                            Junior Developer
                          </div>

                          <div className="mt-1 text-[10px] text-zinc-500">
                            Startup · 2021 — 2023
                          </div>

                          <div className="mt-2 h-2 w-11/12 rounded bg-zinc-100" />
                          <div className="mt-1 h-2 w-4/5 rounded bg-zinc-100" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800">
                        Skills
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {[
                          "Java",
                          "Spring Boot",
                          "React",
                          "PostgreSQL",
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="rounded border border-zinc-200 px-2 py-1 text-[9px] text-zinc-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-800">
                        Projects
                      </h3>

                      <div className="mt-3">
                        <div className="text-xs font-semibold text-zinc-900">
                          Career Platform
                        </div>

                        <div className="mt-2 h-2 w-full rounded bg-zinc-100" />
                        <div className="mt-1 h-2 w-4/5 rounded bg-zinc-100" />
                      </div>
                    </div>

                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}