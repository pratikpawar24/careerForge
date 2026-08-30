import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../../../components/common/Container";

const applications = [
  {
    company: "Acme Technologies",
    role: "Software Engineer",
    status: "Interview",
  },
  {
    company: "Northstar Labs",
    role: "Backend Engineer",
    status: "Applied",
  },
  {
    company: "Vertex Systems",
    role: "Full Stack Developer",
    status: "Offer",
  },
];

export function ApplicationTracking() {
  return (
    <section
      id="applications"
      className="py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">

          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
              <BriefcaseBusiness
                size={19}
                className="text-zinc-800"
              />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Your job search deserves a system.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600">
              Keep applications, companies, roles, and statuses
              organized so you always know where every opportunity stands.
            </p>

            <div className="mt-8 space-y-3 text-sm text-zinc-600">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={17} />
                Track application status
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={17} />
                Keep your opportunities organized
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={17} />
                See your progress at a glance
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6"
          >
            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-950">
                    Applications
                  </p>

                  <p className="mt-0.5 text-xs text-zinc-400">
                    Your current opportunities
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800"
                  aria-label="Open applications"
                >
                  <ArrowUpRight size={17} />
                </button>
              </div>

              <div className="divide-y divide-zinc-100">
                {applications.map((application) => (
                  <div
                    key={`${application.company}-${application.role}`}
                    className="px-5 py-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-zinc-950">
                          {application.role}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          {application.company}
                        </p>
                      </div>

                      <span
                        className={`
                          rounded-full px-2.5 py-1 text-[11px] font-medium
                          ${
                            application.status === "Offer"
                              ? "bg-zinc-900 text-white"
                              : "bg-zinc-100 text-zinc-600"
                          }
                        `}
                      >
                        {application.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <CalendarDays size={13} />
                      Updated recently
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}