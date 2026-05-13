import { motion } from "framer-motion";
import { ProjectCard, type Project } from "@/components/bento/ProjectCard";
import projects from "@/lib/content/projects.json";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function WorkSection({ onOpen }: { onOpen: (p: Project) => void }) {
  // Show first 4 projects on homepage
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="mt-24 md:mt-32">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">My Recent Projects</h2>
          <p className="text-sm text-muted-foreground">
            A selection of products I've shipped recently.
          </p>
        </div>

        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition hover:text-violet-300"
        >
          View all projects
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {featured.map((p, idx) => (
          <ProjectCard
            key={p.id}
            project={p as Project}
            onOpen={() => onOpen(p as Project)}
            delay={0.1 * idx}
            area=""
          />
        ))}
      </div>
    </section>
  );
}
