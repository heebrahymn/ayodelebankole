import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Copy, Check } from "lucide-react";

type Endpoint = "projects" | "stack" | "experience";

const endpoints: { key: Endpoint; label: string }[] = [
  { key: "projects", label: "GET /projects" },
  { key: "stack", label: "GET /stack" },
  { key: "experience", label: "GET /experience" },
];

function syntaxHighlight(json: string) {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "text-amber-300"; // number
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? "text-violet-300" : "text-emerald-300";
        } else if (/true|false/.test(match)) {
          cls = "text-pink-300";
        } else if (/null/.test(match)) {
          cls = "text-zinc-400";
        }
        return `<span class="${cls}">${match}</span>`;
      },
    );
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setM(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return m;
}

export function TerminalCard() {
  const [active, setActive] = useState<Endpoint>("projects");
  const [body, setBody] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyCurl() {
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/api/portfolio/${active}`;
    const cmd = `curl -s ${url} | jq`;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }
  const isMobile = useIsMobile();

  async function run(ep: Endpoint) {
    setActive(ep);
    setLoading(true);
    setBody("");
    try {
      const res = await fetch(`/api/portfolio/${ep}`);
      const json = await res.json();
      const text = JSON.stringify(json, null, 2);
      // typewriter reveal
      let i = 0;
      const step = Math.max(8, Math.floor(text.length / 80));
      const tick = () => {
        i += step;
        setBody(text.slice(0, i));
        if (i < text.length) requestAnimationFrame(tick);
        else setBody(text);
      };
      requestAnimationFrame(tick);
    } catch {
      setBody(`{ "error": "Request failed" }`);
    } finally {
      setLoading(false);
    }
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (!isMobile || mobileOpen) run("projects");

  }, [isMobile, mobileOpen]);

  if (isMobile && !mobileOpen) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass rounded-2xl p-6"
        style={{ gridArea: "terminal" }}
      >
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <Terminal className="h-4 w-4" /> api.ayodele.bankole
        </div>
        <h3 className="mt-3 text-lg font-semibold">Live API Sandbox</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Real fetch calls to a live route handler returning DRF-style JSON.
        </p>
        <button
          onClick={() => setMobileOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--gradient-accent)" }}
        >
          Explore API <ArrowRight className="h-4 w-4" />
        </button>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass overflow-hidden rounded-2xl"
      style={{ gridArea: "terminal" }}
    >
      {/* header bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="font-mono text-xs text-muted-foreground">api.ayodele.bankole</div>
        <div className="w-12" />
      </div>

      {/* pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-4 py-3">
        {endpoints.map((e) => (
          <button
            key={e.key}
            onClick={() => run(e.key)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition ${
              active === e.key
                ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* response */}
      <div
        ref={scrollContainerRef}
        className="relative h-[360px] lg:h-[520px] overflow-auto px-5 py-6 font-mono text-[12.5px] leading-relaxed"
      >
        <pre
          className="whitespace-pre-wrap pb-8 text-zinc-200"
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(body || "") }}
        />
        {loading && <span className="cursor-blink text-violet-400" />}
        {!body && !loading && (
          <span className="text-muted-foreground">// pick an endpoint above…</span>
        )}
      </div>
    </motion.section>
  );
}
