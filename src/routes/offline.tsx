// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpenCheck, Calculator, Camera, Phone, ShieldAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { HELPLINE } from "@/components/AppShell";

export const Route = createFileRoute("/offline")({
  head: () => ({
    meta: [
      { title: "Offline Emergency Defense Guide — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Spray tank dose calculator, five safety checks before spraying, damage record steps and low-cost natural remedies.",
      },
      { property: "og:title", content: "Offline Emergency Defense Guide — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Tank dose calculator and spray safety checklist that work without internet.",
      },
    ],
  }),
  component: OfflinePage,
});

const CHECKS = [
  { title: "Match the label", text: "Confirm the product label names your crop and your pest before opening the bottle." },
  { title: "Wear protection", text: "Mask, gloves, full sleeves, covered feet and eye protection — every single time." },
  { title: "Avoid wind, rain and midday heat", text: "Spray in calm early morning or evening hours only." },
  { title: "Protect children, animals and water", text: "Keep them away from the field and never wash equipment near a canal, pond or well." },
  { title: "Do not mix chemicals on your own", text: "Tank mixes can be unsafe or useless. Ask your KVK or agriculture officer first." },
];

const REMEDIES = [
  {
    emoji: "🥛",
    title: "Sour buttermilk + turmeric",
    text: "A traditional preventive foliar spray used for mild leaf problems in vegetables. Dilute well and test on a few plants first.",
  },
  {
    emoji: "🌿",
    title: "Neem / cow-urine extract",
    text: "Commonly used as a repellent against soft-bodied insects. Works best as an early preventive, not as a cure for heavy infestation.",
  },
  {
    emoji: "🔥",
    title: "Wood ash / asafoetida",
    text: "Sometimes dusted for crawling pests and stored grain. Keep away from young seedlings and never apply on wet leaves in strong sun.",
  },
];

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function OfflinePage() {
  const [dose, setDose] = useState("30");
  const [unit, setUnit] = useState<"ml" | "g">("ml");
  const [tank, setTank] = useState<"15" | "16">("15");

  const adjusted = ((Number(dose) || 0) * (Number(tank) / 15)).toFixed(1);

  return (
    <>
      <PageHeader
        icon={BookOpenCheck}
        title="Offline Emergency Defense Guide"
        subtitle="Keep this page open — the calculator and checklists work without internet."
      />

      <a
        href={`tel:${HELPLINE}`}
        className="flex items-center justify-center gap-3 rounded-3xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground"
      >
        <Phone className="h-5 w-5" /> Kisan Call Centre — {HELPLINE}
      </a>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card-base space-y-4 p-5">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Spray tank dose calculator</h3>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="dose">
              Label dose for a 15 litre tank
            </label>
            <input id="dose" inputMode="decimal" className={field} value={dose} onChange={(e) => setDose(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-bold" htmlFor="unit">Unit</label>
              <select id="unit" className={field} value={unit} onChange={(e) => setUnit(e.target.value as "ml" | "g")}>
                <option value="ml">ml (liquid)</option>
                <option value="g">g (powder)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold" htmlFor="tank">Your tank size</label>
              <select id="tank" className={field} value={tank} onChange={(e) => setTank(e.target.value as "15" | "16")}>
                <option value="15">15 litre</option>
                <option value="16">16 litre</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-surface-emerald p-5 text-center">
            <p className="text-xs font-bold uppercase text-muted-foreground">Dose for your tank</p>
            <p className="text-4xl font-extrabold text-primary">
              {adjusted} {unit}
            </p>
            <p className="text-xs text-muted-foreground">per {tank} litre tank of water</p>
          </div>

          <p className="rounded-2xl bg-surface-rose px-4 py-3 text-xs font-semibold text-danger">
            Never increase the dose to "make it work faster". Overdosing damages the crop, wastes
            money and is dangerous for you and your animals.
          </p>
        </section>

        <section className="card-base space-y-3 p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">5 checks before spraying</h3>
          </div>
          <ol className="space-y-2">
            {CHECKS.map((c, i) => (
              <li key={c.title} className="flex gap-3 rounded-2xl bg-muted p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-sm font-extrabold text-accent-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold">{c.title}</p>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="card-base space-y-3 p-5">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold">Offline damage record</h3>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Take clear photos of the damaged area from close up and from a distance.</li>
            <li>Write down the date, time of damage and the crop growth stage.</li>
            <li>Keep seed packets, fertilizer bills and your spray record together in one bag.</li>
            <li>
              Once you have network, inform the bank, insurance company or agriculture officer —
              within 72 hours for insured crops.
            </li>
          </ul>
        </section>

        <section className="card-base space-y-3 p-5">
          <h3 className="text-lg font-bold">Low-cost natural remedies</h3>
          {REMEDIES.map((r) => (
            <div key={r.title} className="flex gap-3 rounded-2xl bg-surface-emerald p-4">
              <span className="text-2xl">{r.emoji}</span>
              <div>
                <p className="font-bold">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            </div>
          ))}
          <p className="rounded-2xl bg-surface-amber px-4 py-3 text-xs font-semibold text-accent-foreground">
            These are traditional practices, not guaranteed cures. They are not 100% safe or
            effective for every crop — always test on a small area and ask your KVK for serious
            infestations.
          </p>
        </section>
      </div>
    </>
  );
}
