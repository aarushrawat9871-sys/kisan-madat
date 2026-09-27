// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CloudSun, Droplets, ShieldCheck, ShieldX, Wind } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useProfile } from "@/lib/profile";
import { fetchForecast, type ForecastDay } from "@/lib/weather";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather & Spray Window — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Live five-day forecast for your area with a clear spray-safe or unsafe decision for each day.",
      },
      { property: "og:title", content: "Weather & Spray Window — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Rain probability, wind speed and spray-safe guidance from Open-Meteo.",
      },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  const { profile, country } = useProfile();
  const [days, setDays] = useState<ForecastDay[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setDays(null);
    setError("");
    fetchForecast(profile.area || country.name, country.name)
      .then((d) => active && setDays(d))
      .catch(() => active && setError("Live weather is not available right now."));
    return () => {
      active = false;
    };
  }, [profile.area, country.name]);

  return (
    <>
      <PageHeader
        icon={CloudSun}
        title="Weather & Spray Window"
        subtitle={`Live forecast for ${profile.area || country.name} · source: Open-Meteo`}
      />

      <p className="rounded-2xl bg-surface-emerald px-4 py-3 text-sm font-semibold text-primary">
        Spray is marked safe only when rain chance is below 30% and wind stays below 20 km/h.
      </p>

      {error && (
        <div className="card-base space-y-2 p-6">
          <p className="text-lg font-bold text-danger">{error}</p>
          <p className="text-sm text-muted-foreground">
            No estimated weather is shown. Check your internet connection, or confirm your area on
            the profile page and try again.
          </p>
        </div>
      )}

      {!error && !days && (
        <p className="card-base p-6 text-sm text-muted-foreground">Loading live forecast…</p>
      )}

      {days && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {days.map((d) => (
            <article
              key={d.date}
              className={`rounded-3xl border p-5 shadow-card ${
                d.spraySafe ? "border-primary/30 bg-surface-emerald" : "border-danger/30 bg-surface-rose"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold">
                  {new Date(d.date).toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    d.spraySafe ? "bg-primary text-primary-foreground" : "bg-danger text-danger-foreground"
                  }`}
                >
                  {d.spraySafe ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldX className="h-3.5 w-3.5" />}
                  {d.spraySafe ? "Spray safe" : "Do not spray"}
                </span>
              </div>

              <p className="mt-3 text-3xl font-extrabold">
                {d.max}° <span className="text-lg font-semibold text-muted-foreground">/ {d.min}°</span>
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-semibold">
                <span className="flex items-center gap-2 rounded-xl bg-card px-3 py-2">
                  <Droplets className="h-4 w-4 text-primary" /> {d.rain}% rain
                </span>
                <span className="flex items-center gap-2 rounded-xl bg-card px-3 py-2">
                  <Wind className="h-4 w-4 text-primary" /> {d.wind} km/h
                </span>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {d.spraySafe
                  ? "Spray early morning or late evening for best coverage."
                  : d.rain >= 30
                    ? "Rain may wash off the spray — wait for a drier day."
                    : "Wind is too strong — drift will waste chemical and harm neighbours."}
              </p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
