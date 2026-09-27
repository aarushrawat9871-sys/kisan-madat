// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Landmark, Phone, TimerReset } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SCHEMES } from "@/data/schemes";
import { useProfile } from "@/lib/profile";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Eligibility, documents and benefits for PM-KISAN, PMFBY, KCC, PM-KUSUM, drip subsidy, Soil Health Card and e-NAM.",
      },
      { property: "og:title", content: "Government Schemes — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "India farm scheme guide with eligibility and document checklists.",
      },
    ],
  }),
  component: SchemesPage,
});

function SchemesPage() {
  const { country } = useProfile();
  const [activeId, setActiveId] = useState(SCHEMES[0]!.id);
  const active = SCHEMES.find((s) => s.id === activeId) ?? SCHEMES[0]!;

  if (country.code !== "IN") {
    return (
      <>
        <PageHeader
          icon={Landmark}
          title="Government Schemes"
          subtitle={`Country selected: ${country.flag} ${country.name}`}
        />
        <div className="card-base space-y-3 p-6">
          <h3 className="text-lg font-bold">Verified scheme data not added yet</h3>
          <p className="text-sm text-muted-foreground">
            The scheme library currently covers India only. We do not list schemes for{" "}
            {country.name} because we have not verified them with an official source, and inventing
            eligibility or benefit details could cost you a real application.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your national or provincial agriculture ministry portal, or switch your
            profile country to India to view the verified list.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        icon={Landmark}
        title="Government Schemes"
        subtitle="India schemes — confirm current rules on the official portal before applying."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <div className="card-base space-y-1 p-3">
          {SCHEMES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`w-full rounded-2xl px-4 py-3 text-left transition-colors ${
                s.id === activeId ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <p className="font-bold">{s.name}</p>
              <p
                className={`text-xs ${
                  s.id === activeId ? "opacity-90" : "text-muted-foreground"
                }`}
              >
                {s.hindi}
              </p>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <article className="card-base space-y-4 p-5">
            <div>
              <span className="rounded-full bg-surface-amber px-3 py-1 text-xs font-bold text-accent-foreground">
                {active.benefit}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold">{active.name}</h3>
              <p className="text-sm text-muted-foreground">{active.hindi}</p>
            </div>
            <p className="text-sm leading-relaxed">{active.description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface-emerald p-4">
                <h4 className="text-sm font-extrabold uppercase text-primary">Who is eligible</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {active.eligibility.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-surface-indigo p-4">
                <h4 className="text-sm font-extrabold uppercase text-primary">Documents to keep ready</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {active.documents.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-surface-amber p-5">
              <div className="flex items-center gap-2">
                <TimerReset className="h-5 w-5 text-accent-foreground" />
                <h4 className="font-bold">72-hour crop loss rule</h4>
              </div>
              <p className="mt-2 text-sm">
                For insured crops, report damage within 72 hours of the event to the insurance
                company, the bank branch or the Crop Insurance app. Late intimation is the most
                common reason claims are rejected.
              </p>
            </div>
            <div className="rounded-3xl bg-surface-emerald p-5">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <h4 className="font-bold">Insurance & farmer helpline</h4>
              </div>
              <p className="mt-2 text-sm">
                Kisan Call Centre: <a className="font-bold underline" href="tel:1800-180-1551">1800-180-1551</a>
                <br />
                PMFBY support: <a className="font-bold underline" href="tel:1800-200-7710">1800-200-7710</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
