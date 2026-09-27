// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Droplets, FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/soil")({
  head: () => ({
    meta: [
      { title: "Soil & Fertilizer Planner — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Work out urea, DAP and MOP bags for your acreage from soil-test NPK values, plus an irrigation estimate.",
      },
      { property: "og:title", content: "Soil & Fertilizer Planner — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "NPK gap calculation, fertilizer bags and irrigation guidance by crop and acreage.",
      },
    ],
  }),
  component: SoilPage,
});

interface CropNeed {
  n: number;
  p: number;
  k: number;
  water: number; // mm per season
}

const CROP_NEEDS: Record<string, CropNeed> = {
  Wheat: { n: 120, p: 60, k: 40, water: 450 },
  Paddy: { n: 100, p: 50, k: 50, water: 1200 },
  Maize: { n: 120, p: 60, k: 40, water: 550 },
  Cotton: { n: 100, p: 50, k: 50, water: 700 },
  Potato: { n: 150, p: 80, k: 100, water: 500 },
  Mustard: { n: 80, p: 40, k: 40, water: 350 },
};

const IRRIGATION = {
  Flood: 0.55,
  Sprinkler: 0.75,
  Drip: 0.9,
} as const;

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function SoilPage() {
  const [crop, setCrop] = useState("Wheat");
  const [acres, setAcres] = useState("2");
  const [irrigation, setIrrigation] = useState<keyof typeof IRRIGATION>("Flood");
  const [n, setN] = useState("30");
  const [p, setP] = useState("18");
  const [k, setK] = useState("140");

  const result = useMemo(() => {
    const need = CROP_NEEDS[crop] ?? CROP_NEEDS["Wheat"]!;
    const acreNum = Math.max(Number(acres) || 0, 0);
    const ha = acreNum * 0.4047;

    // Soil-test values are kg/ha available nutrient; deficit drives the dose.
    const availN = Number(n) || 0;
    const availP = Number(p) || 0;
    const availK = Number(k) || 0;

    const gapN = Math.max(need.n - availN * 0.3, need.n * 0.4);
    const gapP = Math.max(need.p - availP * 0.8, need.p * 0.3);
    const gapK = Math.max(need.k - availK * 0.15, 0);

    const dapKg = (gapP / 0.46) * ha;
    const mopKg = (gapK / 0.6) * ha;
    const ureaKg = ((gapN - dapKg * 0.18) / 0.46) * ha;

    const efficiency = IRRIGATION[irrigation];
    const waterMm = need.water / efficiency;
    const litresPerAcre = waterMm * 4047; // 1 mm over 1 acre ≈ 4047 litres

    return {
      ha,
      acreNum,
      urea: Math.max(Math.round(ureaKg), 0),
      dap: Math.max(Math.round(dapKg), 0),
      mop: Math.max(Math.round(mopKg), 0),
      gapN: Math.round(gapN),
      gapP: Math.round(gapP),
      gapK: Math.round(gapK),
      waterMm: Math.round(waterMm),
      litres: Math.round(litresPerAcre * acreNum),
      splits: crop === "Paddy" ? 3 : 2,
    };
  }, [crop, acres, irrigation, n, p, k]);

  const bars = [
    { label: "Nitrogen (N)", value: result.gapN, max: 160, tone: "bg-primary" },
    { label: "Phosphorus (P)", value: result.gapP, max: 160, tone: "bg-accent" },
    { label: "Potash (K)", value: result.gapK, max: 160, tone: "bg-chart-3" },
  ];

  return (
    <>
      <PageHeader
        icon={FlaskConical}
        title="Soil & Fertilizer Planner"
        subtitle="Estimates from standard recommendations — follow your Soil Health Card where available."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="card-base space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-bold" htmlFor="crop">Crop</label>
              <select id="crop" className={field} value={crop} onChange={(e) => setCrop(e.target.value)}>
                {Object.keys(CROP_NEEDS).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold" htmlFor="acres">Acreage</label>
              <input id="acres" inputMode="decimal" className={field} value={acres} onChange={(e) => setAcres(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="irrigation">Irrigation type</label>
            <select
              id="irrigation"
              className={field}
              value={irrigation}
              onChange={(e) => setIrrigation(e.target.value as keyof typeof IRRIGATION)}
            >
              {Object.keys(IRRIGATION).map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "N (kg/ha)", value: n, set: setN },
              { label: "P (kg/ha)", value: p, set: setP },
              { label: "K (kg/ha)", value: k, set: setK },
            ].map((item) => (
              <div key={item.label}>
                <label className="mb-1.5 block text-xs font-bold">{item.label}</label>
                <input
                  inputMode="decimal"
                  className={field}
                  value={item.value}
                  onChange={(e) => item.set(e.target.value)}
                />
              </div>
            ))}
          </div>

          <p className="rounded-2xl bg-surface-amber px-4 py-3 text-xs font-medium text-accent-foreground">
            Enter available nutrient values from your soil test report. Without a test, use your
            block's average and get a Soil Health Card done before the next season.
          </p>
        </div>

        <div className="space-y-4">
          <div className="card-base p-5">
            <h3 className="text-lg font-bold">Nutrient gap to fill</h3>
            <div className="mt-4 space-y-3">
              {bars.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-sm font-semibold">
                    <span>{b.label}</span>
                    <span>{b.value} kg/ha</span>
                  </div>
                  <div className="mt-1 h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${b.tone}`}
                      style={{ width: `${Math.min((b.value / b.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-5">
            <h3 className="text-lg font-bold">
              Fertilizer for {result.acreNum || 0} acre ({result.ha.toFixed(2)} ha)
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                { name: "Urea", kg: result.urea, tone: "bg-surface-emerald" },
                { name: "DAP", kg: result.dap, tone: "bg-surface-amber" },
                { name: "MOP", kg: result.mop, tone: "bg-surface-indigo" },
              ].map((f) => (
                <div key={f.name} className={`rounded-2xl ${f.tone} p-4`}>
                  <p className="text-xs font-bold uppercase text-muted-foreground">{f.name}</p>
                  <p className="text-2xl font-extrabold">{f.kg} kg</p>
                  <p className="text-xs text-muted-foreground">
                    ≈ {(f.kg / 45).toFixed(1)} bags of 45 kg
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Apply all DAP and MOP as basal at sowing. Split urea into {result.splits} doses with
              irrigation for better uptake and less loss.
            </p>
          </div>

          <div className="card-base p-5">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Irrigation estimate</h3>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Season water need</p>
                <p className="text-2xl font-extrabold">{result.waterMm} mm</p>
                <p className="text-xs text-muted-foreground">{irrigation} delivery efficiency</p>
              </div>
              <div className="rounded-2xl bg-surface-emerald p-4">
                <p className="text-xs font-bold uppercase text-muted-foreground">Total for your plot</p>
                <p className="text-2xl font-extrabold">
                  {(result.litres / 100000).toFixed(1)} lakh L
                </p>
                <p className="text-xs text-muted-foreground">
                  Switching to drip can cut this by roughly a third.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
