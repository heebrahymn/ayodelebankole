import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeroCard } from "@/components/bento/HeroCard";
import { TerminalCard } from "@/components/terminal/TerminalCard";
import { ProjectCard, type Project } from "@/components/bento/ProjectCard";
import { GuestbookCard } from "@/components/bento/GuestbookCard";
import { StackCard } from "@/components/bento/StackCard";
import { SlideOver } from "@/components/slideOver/SlideOver";
import { WorkSection } from "@/components/work/WorkSection";
import { ContactSection } from "@/components/contact/ContactSection";
import projects from "@/lib/content/projects.json";
import logo from "@/assets/ayodele-dark.webp";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Full-Stack Product Engineer — Portfolio" },
      {
        name: "description",
        content:
          "Premium portfolio of a Full-Stack Product Engineer shipping Python, Django, Next.js and React products end-to-end.",
      },
    ],
  }),
});

function Index() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* fluid background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(124,58,237,0.12), transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        {/* top nav */}
        <nav className="mb-10 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Ayodele Bankole" className="h-10 w-auto" />
          </div>
          <div className="hidden items-center gap-6 font-mono text-xs text-muted-foreground md:flex">
            <a href="#work" className="hover:text-foreground">
              work
            </a>
            <a href="#stack" className="hover:text-foreground">
              stack
            </a>
            <a href="#contact" className="hover:text-foreground">
              contact
            </a>
          </div>
        </nav>

        {/* bento grid */}
        <div className="bento">
          <HeroCard />
          <TerminalCard />
          <StackCard />
          <GuestbookCard />
        </div>

        {/* work section */}
        <WorkSection onOpen={setOpen} />

        {/* contact section */}
        <ContactSection />

        <footer className="mt-16 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>© {new Date().getFullYear()} — built with care.</span>
          <span>v1.0 · uptime 99.9%</span>
        </footer>
      </div>

      <SlideOver project={open} onClose={() => setOpen(null)} />
    </main>
  );
}
