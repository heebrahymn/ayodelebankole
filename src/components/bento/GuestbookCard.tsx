import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

type Note = { id: string; name: string; message: string; ts: string; color: string };

const SEED: Note[] = [
  {
    id: "1",
    name: "Maya R.",
    message: "Loved the API sandbox — that's such a portfolio flex.",
    ts: "2h ago",
    color: "#7c3aed",
  },
  {
    id: "2",
    name: "Diego A.",
    message: "Reaching out about a contract role next week.",
    ts: "5h ago",
    color: "#4f46e5",
  },
  {
    id: "3",
    name: "Priya K.",
    message: "The case-study slideovers are super clean.",
    ts: "yesterday",
    color: "#c026d3",
  },
];

const palette = ["#7c3aed", "#4f46e5", "#c026d3", "#22c55e", "#0ea5e9"];

export function GuestbookCard() {
  const [notes, setNotes] = useState<Note[]>(SEED);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    const n: Note = {
      id: crypto.randomUUID(),
      name: name.trim() || "Anonymous",
      message: msg.trim(),
      ts: "just now",
      color: palette[Math.floor(Math.random() * palette.length)],
    };
    setNotes((p) => [n, ...p]);
    setMsg("");
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass flex flex-col rounded-2xl p-6"
      style={{ gridArea: "guestbook" }}
    >
      <h3 className="text-base font-semibold">Leave a note</h3>
      <p className="mt-1 text-xs text-muted-foreground">A live, optimistic guestbook.</p>

      <ul className="mt-4 max-h-[220px] space-y-3 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {notes.map((n) => (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-3"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: n.color }}
              >
                {n.name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[12px] font-medium text-zinc-200">{n.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{n.ts}</span>
                </div>
                <p className="text-[13px] leading-snug text-muted-foreground">{n.message}</p>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <form onSubmit={send} className="mt-4 flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60 focus:border-violet-400/40"
        />
        <div className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Say hi…"
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60 focus:border-violet-400/40"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-white"
            style={{ background: "var(--gradient-accent)" }}
          >
            <Send className="h-3.5 w-3.5" />
            Send
          </button>
        </div>
      </form>
    </motion.section>
  );
}
