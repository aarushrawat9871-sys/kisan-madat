// Project direction and ownership: Aarush & Project Team.
// Prototype chat uses local React state. Swap `sendMessage` for a Firebase or
// Lovable Cloud realtime channel to make conversations persistent and live.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Send, Users, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { COMMUNITY, type CommunityFarmer } from "@/data/community";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Farmer Community — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Message experienced farmers about crop practices, pest control and irrigation in your region.",
      },
      { property: "og:title", content: "Farmer Community — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "A directory of experienced farmers with direct messaging.",
      },
    ],
  }),
  component: CommunityPage,
});

interface Message {
  from: "me" | "them";
  text: string;
}

function CommunityPage() {
  const [active, setActive] = useState<CommunityFarmer | null>(null);

  return (
    <>
      <PageHeader
        icon={Users}
        title="Farmer Community"
        subtitle="Prototype directory — chats stay on this screen and are not saved yet."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COMMUNITY.map((f) => (
          <article key={f.id} className="card-base space-y-3 p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-emerald text-2xl">
                {f.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold">{f.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{f.location}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  f.online ? "bg-surface-emerald text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {f.online ? "Online" : "Offline"}
              </span>
            </div>
            <p className="text-sm font-semibold">{f.expertise}</p>
            <p className="text-xs text-muted-foreground">{f.years} years of farming experience</p>
            <button
              type="button"
              onClick={() => setActive(f)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Message
            </button>
          </article>
        ))}
      </div>

      {active && <ChatModal farmer={active} onClose={() => setActive(null)} />}
    </>
  );
}

function ChatModal({ farmer, onClose }: { farmer: CommunityFarmer; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { from: "them", text: `Namaste! I am ${farmer.name}. Ask me anything about ${farmer.expertise}.` },
  ]);
  const [draft, setDraft] = useState("");

  function sendMessage(text: string) {
    setMessages((prev) => [...prev, { from: "me", text }]);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: "them", text: farmer.reply }]);
    }, 800);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-nav/60 p-4">
      <div className="flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-card shadow-lift">
        <header className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-accent text-xl">
            {farmer.avatar}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{farmer.name}</p>
            <p className="truncate text-xs opacity-90">
              {farmer.online ? "Online now" : "Will reply later"}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close chat" className="rounded-xl bg-primary-deep p-2">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
          {messages.map((m, i) => (
            <p
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.from === "me"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-card shadow-card"
              }`}
            >
              {m.text}
            </p>
          ))}
        </div>

        <form
          className="flex gap-2 border-t border-border p-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim()) return;
            sendMessage(draft.trim());
            setDraft("");
          }}
        >
          <input
            className="flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary"
            placeholder="Type your question…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
