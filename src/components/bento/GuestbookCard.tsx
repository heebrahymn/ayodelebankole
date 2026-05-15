import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

type Note = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  color: string;
};

const palette = ["#7c3aed", "#4f46e5", "#c026d3", "#22c55e", "#0ea5e9"];

export function GuestbookCard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!supabase) {
      console.warn("Guestbook: Supabase client not initialized. Check environment variables.");
      setLoading(false);
      return;
    }
    fetchNotes();

    // Subscribe to real-time changes
    const channel = supabase
      .channel("guestbook_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setNotes((prev) => [payload.new as Note, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchNotes() {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotes(data || []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    console.log("Send button clicked!", { msg, hasSupabase: !!supabase });
    if (!msg.trim() || sending) return;

    if (!supabase) {
      toast.error("Guestbook is currently offline (Configuration missing)");
      return;
    }

    setSending(true);
    const newNote = {
      name: name.trim() || "Anonymous",
      message: msg.trim(),
      color: palette[Math.floor(Math.random() * palette.length)],
    };

    try {
      const { error } = await supabase.from("guestbook").insert([newNote]);
      if (error) throw error;
      
      setMsg("");
      toast.success("Note left successfully!");
    } catch (err: any) {
      console.error("Error sending note:", err);
      toast.error(err.message || "Failed to send note. Check console for details.");
    } finally {
      setSending(false);
    }
  }

  const formatTs = (ts: string) => {
    try {
      return formatDistanceToNow(new Date(ts), { addSuffix: true }).replace("about ", "");
    } catch {
      return "just now";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass flex flex-col rounded-2xl p-6"
      style={{ gridArea: "guestbook" }}
    >
      <h3 className="text-base font-semibold">Leave a note</h3>
      <p className="mt-1 text-xs text-muted-foreground">A live, real-time guestbook.</p>

      <ul className="mt-4 max-h-[220px] min-h-[100px] space-y-3 overflow-y-auto pr-1">
        {loading ? (
          <div className="flex h-20 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground/40" />
          </div>
        ) : notes.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted-foreground/60 italic">No notes yet. Be the first!</p>
        ) : (
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
                    <span className="text-[12px] font-medium text-zinc-200 truncate">{n.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">{formatTs(n.created_at)}</span>
                  </div>
                  <p className="text-[13px] leading-snug text-muted-foreground break-words">{n.message}</p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </ul>

      <form onSubmit={send} className="mt-4 flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          disabled={sending}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60 focus:border-violet-400/40 disabled:opacity-50"
        />
        <div className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Say hi…"
            disabled={sending}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs outline-none placeholder:text-muted-foreground/60 focus:border-violet-400/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sending || !msg.trim()}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-white disabled:opacity-50 transition-opacity"
            style={{ background: "var(--gradient-accent)" }}
          >
            {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            {sending ? "..." : "Send"}
          </button>
        </div>
      </form>
    </motion.section>
  );
}
