// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Save, User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { COUNTRIES, getCountry } from "@/data/regions";
import { useProfile, type FarmerProfile } from "@/lib/profile";
import { translateText } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile & Region — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Save your name, BRICS country, language and area to personalise advisory, weather and crop calendar.",
      },
      { property: "og:title", content: "Farmer Profile & Region — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Set country, language and area for a personalised crop calendar.",
      },
    ],
  }),
  component: ProfilePage,
});

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function ProfilePage() {
  const { profile, save, loaded } = useProfile();
  const [form, setForm] = useState<FarmerProfile>(profile);
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    if (loaded) setForm(profile);
  }, [loaded, profile]);

  const country = getCountry(form.country);

  useEffect(() => {
    let active = true;
    setCalendar(country.calendar);
    translateText(country.calendar, form.language).then((text) => {
      if (active) setCalendar(text);
    });
    return () => {
      active = false;
    };
  }, [country.calendar, form.language]);

  function onCountryChange(code: string) {
    const next = getCountry(code);
    setForm((f) => ({
      ...f,
      country: code,
      area: next.areas[0] ?? "",
      language: next.languages[0]?.code ?? "en",
    }));
  }

  return (
    <>
      <PageHeader
        icon={User}
        title="Farmer Profile & Region"
        subtitle="Saved on this device only — used for weather, language and crop calendar."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <form
          className="card-base space-y-4 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            save(form);
            toast.success("Profile saved on this device");
          }}
        >
          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="name">
              Farmer name
            </label>
            <input
              id="name"
              className={field}
              value={form.name}
              placeholder="e.g. Ramkishan Yadav"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="country">
              BRICS country
            </label>
            <select
              id="country"
              className={field}
              value={form.country}
              onChange={(e) => onCountryChange(e.target.value)}
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="language">
              Preferred language
            </label>
            <select
              id="language"
              className={field}
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              {country.languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-bold" htmlFor="area">
              State / area
            </label>
            <select
              id="area"
              className={field}
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            >
              {country.areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground"
          >
            <Save className="h-5 w-5" /> Save profile
          </button>

          <p className="rounded-2xl bg-surface-amber px-4 py-3 text-xs font-medium text-accent-foreground">
            Hindi and English are fully built into the app. Other languages are filled in through
            LibreTranslate on the server, so some wording may read differently.
          </p>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl bg-surface-indigo p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Selected profile
            </p>
            <p className="mt-2 text-2xl font-extrabold">{profile.name || "Name not saved yet"}</p>
            <p className="text-sm font-semibold">
              {getCountry(profile.country).flag} {getCountry(profile.country).name}
            </p>
            <p className="text-sm text-muted-foreground">{profile.area || "Area not selected"}</p>
          </div>

          <div className="rounded-3xl bg-surface-emerald p-5">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Crops & planting calendar</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {country.crops.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-card px-3 py-1 text-sm font-semibold shadow-card"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed">{calendar}</p>
          </div>
        </div>
      </div>
    </>
  );
}
