import { useState } from "react";
import { motion } from "framer-motion";
import stack from "@/lib/content/stack.json";

const SLUG_OVERRIDES: Record<string, string> = {
  "TanStack Start": "tanstack",
  "Framer Motion": "framer",
  "Shadcn UI": "shadcnui",
  "Next.js": "nextdotjs",
  Wordpress: "wordpress",
  PostgreSQL: "postgresql",
  Tailwind: "tailwindcss",
  Landbot: "https://api.iconify.design/logos:landbot.svg",
  Freshchat: "https://api.iconify.design/logos:freshchat.svg",
  Wati: "whatsapp",
  SendPulse: "https://api.iconify.design/logos:sendpulse-icon.svg",
};

const items: { label: string; slug: string; abbr: string }[] = [
  ...stack.languages,
  ...stack.frameworks,
  ...stack.data,
  ...stack.infra,
  ...stack.ui,
  ...stack.others,
].map((l) => ({
  label: l,
  slug: SLUG_OVERRIDES[l] || l.toLowerCase().replace(/\s+/g, "").replace(/\./g, "dot"),
  abbr: l.slice(0, 2).toUpperCase(),
}));

function IconWithFallback({ i }: { i: { label: string; slug: string; abbr: string } }) {
  const [error, setError] = useState(false);
  const src = i.slug.startsWith("http") ? i.slug : `https://cdn.simpleicons.org/${i.slug}/white`;

  return (
    <div className="grid h-5 w-5 place-items-center rounded-full bg-white/10 p-1">
      {error ? (
        <span className="text-[8px] font-bold text-muted-foreground">{i.abbr}</span>
      ) : (
        <img
          src={src}
          alt=""
          className="h-full w-full object-contain"
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export function StackCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="glass flex flex-col rounded-2xl p-6"
      style={{ gridArea: "stack" }}
    >
      <h3 className="text-base font-semibold">Current Stack</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        What I reach for when building production software.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((i) => (
          <span
            key={i.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] text-zinc-200"
          >
            <IconWithFallback i={i} />
            {i.label}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
