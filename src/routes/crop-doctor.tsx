// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Printer, RotateCcw, Share2, Stethoscope, Volume2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useProfile } from "@/lib/profile";
import { useSpeech } from "@/lib/speech";

export const Route = createFileRoute("/crop-doctor")({
  head: () => ({
    meta: [
      { title: "AI Crop Doctor — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Describe crop symptoms and get chemical, organic and spray-safety guidance sized for your acreage.",
      },
      { property: "og:title", content: "AI Crop Doctor — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Crop-wise advisory with organic options, spray safety and cost estimates.",
      },
    ],
  }),
  component: CropDoctor;
});

interface Advice {
  diagnosis: string;
  chemical: string;
  organic: string;
  spraySafety: string;
  estimatedCost: string;
  estimatedSavings: string;
  nextSteps: string;
}

const CROPS = ["Wheat", "Paddy", "Cotton", "Maize", "Potato", "Soybean", "Mustard", "Sugarcane", "Vegetables"];
const SOILS = ["Alluvial", "Black (cotton)", "Red", "Sandy loam", "Clay", "Laterite"];
const STAGES = ["Nursery / germination", "Vegetative", "Tillering / branching", "Flowering", "Fruiting / boll", "Maturity"];

const CHIPS = [
  { label: "Wheat: yellow rust patches", crop: "Wheat", text: "Yellow powdery stripes on lower leaves, spreading after foggy nights." },
  { label: "Cotton: rosette flowers", crop: "Cotton", text: "Twisted rosette flowers and small holes on green bolls." },
  { label: "Paddy: leaf tips drying", crop: "Paddy", text: "Leaf tips drying with wavy yellow streaks from the margins." },
  { label: "Potato: dark wet patches", crop: "Potato", text: "Dark water-soaked patches on leaves with white growth underneath after rain." },
];

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function CropDoctor() {
  const { profile, country, locale } = useProfile();
  const { speak } = useSpeech();
  const [crop, setCrop] = useState(CROPS[0] as string);
  const [soil, setSoil] = useState(SOILS[0] as string);
  const [stage, setStage] = useState(STAGES[1] as string);
  const [acres, setAcres] = useState("2");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [advice, setAdvice] = useState<Advice | null>(null);

  function reset() {
    setCrop(CROPS[0] as string);
    setSoil(SOILS[0] as string);
    setStage(STAGES[1] as string);
    setAcres("2");
    setSymptoms("");
    setAdvice(null);
    setError("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAdvice(null);
    try {
      const res = await fetch("/api/crop-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop,
          soil,
          stage,
          acres,
          symptoms,
          language: profile.language,
          country: country.name,
          area: profile.area,
        }),
      });
      const data = (await res.json()) as { advice?: Advice; error?: string };
      if (!res.ok || !data.advice) {
        setError(data.error || "Advisory could not be generated. Please try again.");
      } else {
        setAdvice(data.advice);
      }
    } catch {
      setError("Network problem. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const plainText = advice
    ? [
        `${crop} · ${acres} acre · ${soil} · ${stage}`,
        advice.diagnosis,
        advice.chemical,
        advice.organic,
        advice.spraySafety,
        advice.nextSteps,
      ]
        .filter(Boolean)
        .join(". ")
    : "";

  return (
    <>
      <PageHeader
        icon={Stethoscope}
        title="AI Crop Doctor"
        subtitle="Guidance only — always confirm with the product label and your local KVK."
        action={
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-2xl bg-secondary px-4 py-2.5 text-sm font-bold"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        }
      />

      <form className="card-base space-y-4 p-5" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="crop">Crop</label>
            <select id="crop" className={field} value={crop} onChange={(e) => setCrop(e.target.value)}>
              {CROPS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="soil">Soil type</label>
            <select id="soil" className={field} value={soil} onChange={(e) => setSoil(e.target.value)}>
              {SOILS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="stage">Growth stage</label>
            <select id="stage" className={field} value={stage} onChange={(e) => setStage(e.target.value)}>
              {STAGES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="acres">Farm size (acres)</label>
            <input
              id="acres"
              className={field}
              inputMode="decimal"
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold" htmlFor="symptoms">
            What do you see in the field?
          </label>
          <textarea
            id="symptoms"
            rows={4}
            className={field}
            placeholder="Describe leaf colour, spots, insects, smell, how many days it has been spreading…"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                setCrop(chip.crop);
                setSymptoms(chip.text);
              }}
              className="rounded-full bg-surface-emerald px-3 py-1.5 text-xs font-semibold text-primary"
            >
              {chip.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Stethoscope className="h-5 w-5" />}
          {loading ? "Preparing advisory…" : "Generate crop advisory"}
        </button>

        {error && (
          <p className="rounded-2xl bg-surface-rose px-4 py-3 text-sm font-semibold text-danger">{error}</p>
        )}
      </form>

      {advice && (
        <article className="rounded-3xl border-2 border-accent bg-paper p-5 shadow-card sm:p-7">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-accent/50 pb-4">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-primary">Crop Advisory Note</h3>
              <p className="text-xs font-semibold text-muted-foreground">
                {crop} · {acres} acre · {soil} soil · {stage}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => speak(plainText, locale)}
                className="flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(plainText)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-success px-3 py-2 text-xs font-bold text-primary-foreground"
              >
                <Share2 className="h-4 w-4" /> WhatsApp
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs font-bold"
              >
                <Printer className="h-4 w-4" /> Print
              </button>
            </div>
          </header>

          <div className="mt-4 space-y-4 text-sm leading-relaxed">
            <Block title="What it looks like" body={advice.diagnosis} />
            <Block title="Chemical guidance" body={advice.chemical} />
            <Block title="Organic / low-cost option" body={advice.organic} />
            <Block title="Spray safety" body={advice.spraySafety} />
            <Block title="Next steps" body={advice.nextSteps} />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface-emerald p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Estimated savings</p>
                <p className="mt-1 font-bold">{advice.estimatedSavings || "Not estimated"}</p>
              </div>
              <div className="rounded-2xl bg-surface-amber p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Estimated cost</p>
                <p className="mt-1 font-bold">{advice.estimatedCost || "Not estimated"}</p>
              </div>
            </div>
          </div>

          <p className="mt-5 rounded-2xl bg-surface-rose px-4 py-3 text-xs font-semibold text-danger">
            This is computer-generated guidance, not an official prescription. Match every product
            and dose with the printed label and confirm with your agriculture officer or KVK before
            buying or spraying.
          </p>
        </article>
      )}
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  if (!body) return null;
  return (
    <section>
      <h4 className="text-sm font-extrabold uppercase tracking-wide text-primary">{title}</h4>
      <p className="mt-1">{body}</p>
    </section>
  );
}
