// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Search, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MANDI_ROWS, MANDI_STATES } from "@/data/mandi";
import { useProfile } from "@/lib/profile";

export const Route = createFileRoute("/mandi")({
  head: () => ({
    meta: [
      { title: "Mandi Rates — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Compare mandi model price with MSP, see the price trend and get a simple sell-or-hold view.",
      },
      { property: "og:title", content: "Mandi Rates — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Indicative India mandi prices against MSP with sell-or-hold guidance.",
      },
    ],
  }),
  component: MandiPage,
});

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function MandiPage() {
  const { country } = useProfile();
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MANDI_ROWS.filter(
      (r) =>
        (state === "all" || r.state === state) &&
        (!q || r.crop.toLowerCase().includes(q) || r.mandi.toLowerCase().includes(q)),
    );
  }, [query, state]);

  return (
    <>
      <PageHeader
        icon={TrendingUp}
        title="Mandi Rates"
        subtitle="Indicative prices for learning and comparison — confirm at your mandi before selling."
      />

      {country.code !== "IN" && (
        <p className="rounded-2xl bg-surface-amber px-4 py-3 text-sm font-semibold text-accent-foreground">
          Your profile country is {country.flag} {country.name}. The built-in price data covers
          India mandis only — verified market data for other BRICS countries has not been added, so
          nothing here is shown as {country.name} prices.
        </p>
      )}

      <div className="card-base grid gap-3 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className={`${field} pl-11`}
            placeholder="Search crop or mandi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className={field} value={state} onChange={(e) => setState(e.target.value)}>
          <option value="all">All states</option>
          {MANDI_STATES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => {
          const diff = r.msp ? r.modal - r.msp : 0;
          const above = diff >= 0;
          const TrendIcon =
            r.trend === "up" ? ArrowUpRight : r.trend === "down" ? ArrowDownRight : ArrowRight;
          return (
            <article key={`${r.crop}-${r.mandi}`} className="card-base space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-emerald text-xl">
                    {r.emoji}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-bold">{r.crop}</h3>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.mandi} · {r.state}
                    </p>
                  </div>
                </div>
                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                    r.trend === "up"
                      ? "bg-surface-emerald text-primary"
                      : r.trend === "down"
                        ? "bg-surface-rose text-danger"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <TrendIcon className="h-3.5 w-3.5" />
                  {r.change > 0 ? "+" : ""}
                  {r.change}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-muted p-3">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Model price</p>
                  <p className="text-lg font-extrabold">₹{r.modal.toLocaleString("en-IN")}</p>
                  <p className="text-[11px] text-muted-foreground">per quintal</p>
                </div>
                <div className="rounded-2xl bg-surface-indigo p-3">
                  <p className="text-xs font-bold uppercase text-muted-foreground">MSP</p>
                  <p className="text-lg font-extrabold">
                    {r.msp ? `₹${r.msp.toLocaleString("en-IN")}` : "No MSP"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {r.msp ? `${above ? "+" : ""}${diff} vs MSP` : "market-driven crop"}
                  </p>
                </div>
              </div>

              <p
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  r.msp === 0
                    ? "bg-muted text-muted-foreground"
                    : above
                      ? "bg-surface-emerald text-primary"
                      : "bg-surface-rose text-danger"
                }`}
              >
                {r.msp === 0
                  ? "No MSP for this crop — compare two or three nearby mandis before selling."
                  : above
                    ? "Price is above MSP — selling now looks reasonable if your produce is dry and graded."
                    : "Price is below MSP — consider holding or check procurement centre options."}
              </p>
            </article>
          );
        })}
      </div>

      {rows.length === 0 && (
        <p className="card-base p-6 text-sm text-muted-foreground">
          No mandi matches that search. Try a different crop or clear the state filter.
        </p>
      )}
    </>
  );
}
