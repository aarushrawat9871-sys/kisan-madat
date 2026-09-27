// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const RequestSchema = z.object({
  crop: z.string().min(1).max(60),
  soil: z.string().max(60).default(""),
  stage: z.string().max(60).default(""),
  acres: z.string().max(20).default("1"),
  symptoms: z.string().max(1500).default(""),
  language: z.string().max(10).default("hi"),
  country: z.string().max(40).default("India"),
  area: z.string().max(60).default(""),
});

const SYSTEM_PROMPT = `You are an agriculture extension assistant for small farmers.
Answer in the requested language, in short, simple sentences a farmer can read aloud.
Never claim to be an official prescription. Always tell the farmer to verify the product
label and confirm with the local agriculture officer or KVK before buying or spraying.
Never invent a government approval, a guaranteed cure, or a fake price.
Return STRICT JSON only, with exactly these keys:
{"diagnosis":"", "chemical":"", "organic":"", "spraySafety":"", "estimatedCost":"", "estimatedSavings":"", "nextSteps":""}`;

export const Route = createFileRoute("/api/crop-advice")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = RequestSchema.safeParse(await request.json());
        if (!parsed.success) {
          return Response.json({ error: "Invalid request" }, { status: 400 });
        }
        const input = parsed.data;

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json(
            { error: "Advisory service is not configured yet." },
            { status: 503 },
          );
        }

        const userPrompt = `Farmer request.
Country/region: ${input.country} ${input.area}
Crop: ${input.crop}
Soil: ${input.soil}
Growth stage: ${input.stage}
Farm size: ${input.acres} acres
Symptoms described: ${input.symptoms || "not described"}
Reply language code: ${input.language}
Give practical guidance sized for ${input.acres} acres, with approximate local-currency cost ranges clearly marked as estimates.`;

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
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt },
              ],
            }),
          });

          if (res.status === 429) {
            return Response.json(
              { error: "Too many requests right now. Please try again in a minute." },
              { status: 429 },
            );
          }
          if (res.status === 402) {
            return Response.json(
              { error: "Advisory credits are exhausted. Please top up to continue." },
              { status: 402 },
            );
          }
          if (!res.ok) {
            return Response.json({ error: "Advisory service is unavailable." }, { status: 502 });
          }

          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const raw = data.choices?.[0]?.message?.content ?? "";
          const cleaned = raw.replace(/```json|```/g, "").trim();

          try {
            return Response.json({ advice: JSON.parse(cleaned) });
          } catch {
            return Response.json({
              advice: {
                diagnosis: cleaned,
                chemical: "",
                organic: "",
                spraySafety: "",
                estimatedCost: "",
                estimatedSavings: "",
                nextSteps: "",
              },
            });
          }
        } catch {
          return Response.json({ error: "Advisory service is unavailable." }, { status: 502 });
        }
      },
    },
  },
});
