import { motion } from "framer-motion";
import { Download, Calendar } from "lucide-react";
import avatar from "@/assets/ayodele.webp";

export function HeroCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass relative overflow-hidden rounded-2xl p-8 md:p-12 lg:col-span-2 lg:row-span-1"
      style={{ gridArea: "hero" }}
    >
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <span className="dot-pulse" />
        <span className="ml-1">Open to opportunities</span>
      </div>

      <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-[1.1]">
        <span className="font-mono font-medium text-2xl md:text-3xl flex items-center gap-3 mb-6">
          <motion.img
            src={avatar}
            alt="Ayodele Bankole"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-violet-500/20"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
            className="overflow-hidden whitespace-nowrap border-r-2 border-violet-500 pr-1 animate-pulse-cursor"
          >
            Hi I'm Ayodele Bankole 👋
          </motion.span>
        </span>
        I build <span className="gradient-text tracking-tighter">full-stack products</span> that
        ship.
      </h1>

      <p className="mt-5 max-w-xl font-mono text-sm text-muted-foreground md:text-base">
        A highly skilled fullstack web developer and SEO specialist creating seamless digital
        experiences that enhance brand loyalty and customer engagement.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-white/10"
        >
          <Download className="h-4 w-4" />
          Download CV
        </a>
        <a
          href="https://wa.me/2347033446142"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          style={{ background: "var(--gradient-accent)" }}
        >
          <Calendar className="h-4 w-4" />
          Chat with me on WhatsApp
        </a>
      </div>
    </motion.section>
  );
}
