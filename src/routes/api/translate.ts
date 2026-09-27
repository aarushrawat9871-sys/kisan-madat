// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/translate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { text?: string; target?: string };
        const text = (body.text ?? "").slice(0, 4000);
        const target = body.target ?? "en";

        if (!text || target === "en") {
          return Response.json({ translatedText: text, engine: "none" });
        }

        // 1. Self-hosted LibreTranslate, if the operator configured one.
        const libreUrl = process.env["LIBRETRANSLATE_URL"];
        if (libreUrl) {
          try {
            const res = await fetch(`${libreUrl.replace(/\/$/, "")}/translate`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: text,
                source: "auto",
                target,
                format: "text",
                ...(process.env["LIBRETRANSLATE_API_KEY"]
                  ? { api_key: process.env["LIBRETRANSLATE_API_KEY"] }
                  : {}),
              }),
            });
            if (res.ok) {
              const data = (await res.json()) as { translatedText?: string };
              if (data.translatedText) {
                return Response.json({
                  translatedText: data.translatedText,
                  engine: "libretranslate",
                });
              }
            }
          } catch {
            // fall through to the AI fallback below
          }
        }

        // 2. Fallback translation so the app stays usable without LibreTranslate.
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ translatedText: text, engine: "unavailable" });

        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              reasoning_effort: "low",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a translation engine for farm advisory text. Reply with the translation only, no notes, no quotes. Keep numbers, chemical names and units unchanged.",
                },
                { role: "user", content: `Translate to language code "${target}":\n\n${text}` },
              ],
            }),
          });
          if (!res.ok) return Response.json({ translatedText: text, engine: "unavailable" });
          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const out = data.choices?.[0]?.message?.content?.trim();
          return Response.json({ translatedText: out || text, engine: "ai-fallback" });
        } catch {
          return Response.json({ translatedText: text, engine: "unavailable" });
        }
      },
    },
  },
});
