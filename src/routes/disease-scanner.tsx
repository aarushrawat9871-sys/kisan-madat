// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Loader2, ScanLine, Upload } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DISEASE_CARDS, type DiseaseCard } from "@/data/diseases";

export const Route = createFileRoute("/disease-scanner")({
  head: () => ({
    meta: [
      { title: "Disease Scanner — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Compare a leaf photo with common crop disease patterns and see severity, treatment and spray timing.",
      },
      { property: "og:title", content: "Disease Scanner — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Symptom matching for late blight, pink bollworm and bacterial leaf blight.",
      },
    ],
  }),
  component: Scanner,
});

const SEVERITY_TONE: Record<DiseaseCard["severity"], string> = {
  Low: "bg-surface-emerald text-primary",
  Moderate: "bg-surface-amber text-accent-foreground",
  High: "bg-surface-rose text-danger",
};

function Scanner() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<DiseaseCard | null>(null);

  function runSimulation(card: DiseaseCard) {
    setScanning(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(card);
      setScanning(false);
    }, 1200);
  }

  function onFile(file: File | undefined) {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    runSimulation(DISEASE_CARDS[0] as DiseaseCard);
  }

  return (
    <>
      <PageHeader
        icon={ScanLine}
        title="Disease Scanner"
        subtitle="Photo matching runs in simulation mode until a vision service is connected."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="card-base space-y-4 p-5">
          <div className="rounded-3xl border-2 border-dashed border-primary/40 bg-surface-emerald p-6 text-center">
            {preview ? (
              <img
                src={preview}
                alt="Uploaded leaf"
                className="mx-auto max-h-56 rounded-2xl object-cover"
              />
            ) : (
              <>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-card text-3xl">
                  🌿
                </span>
                <p className="mt-3 text-sm font-semibold">
                  Take a clear photo of the affected leaf in daylight
                </p>
                <p className="text-xs text-muted-foreground">
                  Hold the camera 20-30 cm away and keep the leaf in focus.
                </p>
              </>
            )}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
              >
                <Upload className="h-4 w-4" /> Upload photo
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
              >
                <Camera className="h-4 w-4" /> Use camera
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
          </div>

          <p className="rounded-2xl bg-surface-amber px-4 py-3 text-xs font-medium text-accent-foreground">
            No real image analysis is running. The app shows a reference match so you can compare
            symptoms yourself — it does not confirm the disease.
          </p>

          <div>
            <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wide text-muted-foreground">
              Common problems — tap to compare
            </h3>
            <div className="grid gap-2">
              {DISEASE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => runSimulation(card)}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left transition-shadow hover:shadow-card"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-emerald text-xl">
                    {card.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold">
                      {card.name} · <span className="font-medium">{card.hindi}</span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{card.crop}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {scanning && (
            <div className="card-base flex items-center gap-3 p-6">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="font-semibold">Comparing symptoms with reference patterns…</p>
            </div>
          )}

          {!scanning && !result && (
            <div className="card-base p-6 text-sm text-muted-foreground">
              Pick a problem card or upload a photo to see symptoms, treatment options and spray
              timing side by side.
            </div>
          )}

          {result && !scanning && (
            <article className="card-base space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-emerald text-2xl">
                    {result.emoji}
                  </span>
                  <div>
                    <h3 className="text-xl font-extrabold">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {result.hindi} · {result.crop}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 text-xs font-bold">
                  <span className="rounded-full bg-surface-indigo px-3 py-1">
                    Pattern match {result.confidence}%
                  </span>
                  <span className={`rounded-full px-3 py-1 ${SEVERITY_TONE[result.severity]}`}>
                    {result.severity} severity
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-extrabold uppercase tracking-wide text-primary">
                  Symptoms to check
                </h4>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                  {result.symptoms.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface-amber p-4 text-sm">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Chemical option</p>
                  <p className="mt-1">{result.chemical}</p>
                </div>
                <div className="rounded-2xl bg-surface-emerald p-4 text-sm">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Organic option</p>
                  <p className="mt-1">{result.organic}</p>
                </div>
                <div className="rounded-2xl bg-surface-indigo p-4 text-sm">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Spray timing</p>
                  <p className="mt-1">{result.sprayTiming}</p>
                </div>
                <div className="rounded-2xl bg-muted p-4 text-sm">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Cost & savings</p>
                  <p className="mt-1 font-semibold">{result.cost}</p>
                  <p className="text-muted-foreground">{result.savings}</p>
                </div>
              </div>

              <p className="rounded-2xl bg-surface-rose px-4 py-3 text-xs font-semibold text-danger">
                Confirm the diagnosis with your agriculture officer or KVK before buying any
                chemical, and follow the product label exactly.
              </p>
            </article>
          )}
        </div>
      </div>
    </>
  );
}
