// Project direction and ownership: Aarush & Project Team.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CloudSun, Droplets, Package, Sparkles, Stethoscope, Wind } from "lucide-react";
import { useProfile } from "@/lib/profile";
import { fetchForecast, type ForecastDay } from "@/lib/weather";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Your farm at a glance: crop advisory shortcut, spray-safe weather summary and inventory access.",
      },
      { property: "og:title", content: "Dashboard — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Crop advisory, spray-safe weather and farm inventory in one farmer-friendly screen.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { profile, country } = useProfile();
  const [today, setToday] = useState<ForecastDay | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setFailed(false);
    fetchForecast(profile.area || country.name, country.name)
      .then((days) => {
        if (!active) return;
        setToday(days[0] ?? null);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [profile.area, country.name]);

  return (
    <>
      <section className="banner-hero relative overflow-hidden rounded-3xl p-6 text-primary-foreground sm:p-10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-accent">
            {country.flag} {country.name}
            {profile.area ? ` · ${profile.area}` : ""}
          </p>
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            {profile.name ? `Namaste, ${profile.name}` : "Namaste, Kisan Bhai/Behen"}
          </h2>
          <p className="text-sm opacity-90 sm:text-base">
            Ask about a sick crop, check today's spray window, compare mandi rates and keep your farm
            store organised — all in one place.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/crop-doctor"
              className="inline-flex items-center gap-2 rounded-2xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground"
            >
              <Stethoscope className="h-4 w-4" /> Get Crop Advisory
            </Link>
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-deep px-5 py-3 text-sm font-bold"
            >
              <Package className="h-4 w-4" /> Farm Inventory
            </Link>
          </div>
        </div>
      </section>

      <section className="card-base p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-emerald">
              <CloudSun className="h-5 w-5 text-primary" />
            </span>
            <div>
              <h3 className="text-lg font-bold">Today's weather & spray view</h3>
              <p className="text-xs text-muted-foreground">
                Live from Open-Meteo for {profile.area || country.name}
              </p>
            </div>
          </div>
          <Link to="/weather" className="text-sm font-bold text-primary underline-offset-4 hover:underline">
            5-day forecast →
          </Link>
        </div>

        {failed && (
          <p className="rounded-2xl bg-surface-rose px-4 py-3 text-sm font-medium text-danger">
            Live weather could not be loaded right now. Please check your connection — no estimated
            weather is shown.
          </p>
        )}

        {!failed && !today && (
          <p className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
            Loading live weather…
          </p>
        )}

        {today && (
          <div className="grid gap-3 sm:grid-cols-3">
            <SummaryCard
              icon={<Wind className="h-5 w-5 text-primary" />}
              tone="bg-surface-emerald"
              label="Wind speed"
              value={`${today.wind} km/h`}
              note={today.wind < 20 ? "Calm enough for spraying" : "Too windy for spraying"}
            />
            <SummaryCard
              icon={<Droplets className="h-5 w-5 text-primary" />}
              tone="bg-surface-indigo"
              label="Rain probability"
              value={`${today.rain}%`}
              note={today.rain < 30 ? "Low wash-off risk" : "Rain may wash off the spray"}
            />
            <SummaryCard
              icon={<Sparkles className="h-5 w-5 text-primary" />}
              tone={today.rain > 60 ? "bg-surface-rose" : "bg-surface-amber"}
              label="Irrigation advice"
              value={today.rain > 60 ? "Hold irrigation" : "Irrigate as planned"}
              note={
                today.rain > 60
                  ? "Good rain chance — save water and diesel"
                  : `Max ${today.max}°C · Min ${today.min}°C`
              }
            />
          </div>
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <QuickCard
          to="/mandi"
          emoji="📈"
          title="Mandi Rates"
          text="Compare model price against MSP and decide sell or hold."
        />
        <QuickCard
          to="/schemes"
          emoji="🏛️"
          title="Government Schemes"
          text="Eligibility and documents for major India farm schemes."
        />
        <QuickCard
          to="/disease-scanner"
          emoji="🔍"
          title="Disease Scanner"
          text="Match leaf symptoms with common crop disease patterns."
        />
        <QuickCard
          to="/offline"
          emoji="📕"
          title="Offline Guide"
          text="Tank dose calculator and safety checks that work without data."
        />
      </section>
    </>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  note,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <div className={`rounded-2xl ${tone} p-4`}>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {icon} {label}
      </div>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function QuickCard({
  to,
  emoji,
  title,
  text,
}: {
  to: string;
  emoji: string;
  title: string;
  text: string;
}) {
  return (
    <Link to={to} className="card-base flex items-start gap-4 p-5 transition-shadow hover:shadow-lift">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface-amber text-2xl">
        {emoji}
      </span>
      <div className="min-w-0">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </Link>
  );
}
