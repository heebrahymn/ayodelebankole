import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/xaqvzqrz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="mt-24 pb-20 md:mt-32">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Get in touch</h2>
        <p className="text-sm text-muted-foreground">
          Have a project in mind or just want to say hi? I'm always open to new opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* contact form */}
        <div className="lg:col-span-3">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-12 text-center"
            >
              <CheckCircle2 className="mb-4 h-12 w-12 text-green-400" />
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs font-semibold uppercase tracking-widest text-violet-400 hover:text-violet-300"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm transition-all focus:border-violet-500/30 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-violet-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm transition-all focus:border-violet-500/30 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-violet-500/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="How can I help you?"
                  className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4 text-sm transition-all focus:border-violet-500/30 focus:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-violet-500/20"
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 sm:w-auto"
                style={{ background: "var(--gradient-accent)" }}
              >
                {status === "submitting" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>

        {/* side info */}
        <div className="lg:col-span-2">
          <div className="space-y-8 rounded-2xl border border-white/5 bg-white/[0.02] p-8">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Socials
              </h4>
              <div className="grid grid-cols-1 gap-3">
                <a
                  href="https://github.com/heebrahymn/"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-500/10">
                    <img
                      src="https://cdn.simpleicons.org/github/white"
                      alt="GitHub"
                      className="h-4 w-4"
                    />
                  </div>
                  <span className="text-sm font-medium">GitHub</span>
                  <span className="ml-auto text-xs text-muted-foreground">heebrahymn</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/ayodelebankole/"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">LinkedIn</span>
                  <span className="ml-auto text-xs text-muted-foreground">ayodelebankole</span>
                </a>
                <a
                  href="https://wa.me/2347033446142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-green-500/10">
                    <img
                      src="https://cdn.simpleicons.org/whatsapp/25D366"
                      alt="WhatsApp"
                      className="h-4 w-4"
                    />
                  </div>
                  <span className="text-sm font-medium">WhatsApp</span>
                  <span className="ml-auto text-xs text-muted-foreground">Chat now</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Email
              </h4>
              <a
                href="mailto:ayodeleheebrahymn@outlook.com"
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">ayodeleheebrahymn@outlook.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
