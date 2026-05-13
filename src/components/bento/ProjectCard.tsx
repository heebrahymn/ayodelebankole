import { useState } from "react";
import { motion } from "framer-motion";

export type Project = {
  id: string;
  name: string;
  description: string;
  metric: string;
  stack: string[];
  problem: string;
  tradeoffs: string[];
  decisions: string[];
  outcomes?: string[];
  link?: string;
};

export function ProjectCard({
  project,
  onOpen,
  delay = 0,
  area,
}: {
  project: Project;
  onOpen: () => void;
  delay?: number;
  area: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="glass group relative flex flex-col overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(124,58,237,0.3)]"
      style={{ gridArea: area }}
    >
      <div className="flex items-center gap-2 text-[11px] font-medium">
        <span className="dot-pulse" />
        <span className="ml-1 font-mono text-muted-foreground">{project.metric}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold tracking-tight">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {/* SVG connection lines */}
        <svg
          className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        >
          <defs>
            <linearGradient id={`grad-${project.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
          <path
            d="M 30 18 Q 90 -10 160 18 T 290 18"
            fill="none"
            stroke={`url(#grad-${project.id})`}
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </svg>
        {project.stack.map((t) => (
          <span
            key={t}
            className="relative rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-violet-300">
        Read case study →
      </div>
    </motion.button>
  );
}
