import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { Project } from "@/components/bento/ProjectCard";

export function SlideOver({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-[#090014]/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Case study
                </div>
                <h2 className="mt-1 text-xl font-bold">{project.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-8 px-6 py-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 font-mono text-[11px] text-violet-200">
                  {project.metric}
                </span>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Section title="The Problem">
                <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
              </Section>
              <Section title="Architecture Trade-offs">
                <ul className="space-y-2">
                  {project.tradeoffs.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section title="Stack Decisioning">
                <ul className="space-y-2 font-mono text-[13px] text-muted-foreground">
                  {project.decisions.map((d) => (
                    <li
                      key={d}
                      className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </Section>
              {project.outcomes && project.outcomes.length > 0 && (
                <Section title="Outcomes">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.outcomes.map((o) => (
                      <div
                        key={o}
                        className="rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] px-4 py-3 text-sm text-zinc-200"
                      >
                        {o}
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              {project.link && (
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    Visit Website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-violet-300">
        {title}
      </h3>
      {children}
    </section>
  );
}
