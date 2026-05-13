import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard, type Project } from "@/components/bento/ProjectCard";
import { SlideOver } from "@/components/slideOver/SlideOver";
import projects from "@/lib/content/projects.json";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "All Projects — Ayodele Bankole" },
      {
        name: "description",
        content: "A complete list of products and platforms built by Ayodele Bankole.",
      },
    ],
  }),
});

function ProjectsPage() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen">
      {/* fluid background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blob blob-1 opacity-20" />
        <div className="blob blob-2 opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <nav className="mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </nav>

        <header className="mb-16 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Selected <span className="gradient-text">Work</span>
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            A comprehensive archive of products, platforms, and open-source projects I've developed.
            Focused on performance, scalability, and user-centric design.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((p, idx) => (
            <ProjectCard
              key={p.id}
              project={p as Project}
              onOpen={() => setOpen(p as Project)}
              delay={0.05 * idx}
              area=""
            />
          ))}
        </div>

        <footer className="mt-32 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>© {new Date().getFullYear()} — ayodele.bankole</span>
          <span>End of Archive</span>
        </footer>
      </div>

      <SlideOver project={open} onClose={() => setOpen(null)} />
    </main>
  );
}
