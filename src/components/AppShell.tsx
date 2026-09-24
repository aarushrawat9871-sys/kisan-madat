// Project direction and ownership: Aarush & Project Team.
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeIndianRupee,
  BookOpenCheck,
  CloudSun,
  FlaskConical,
  Landmark,
  LayoutDashboard,
  Languages,
  Menu,
  Package,
  Phone,
  ScanLine,
  Sprout,
  Stethoscope,
  User,
  Users,
  VolumeX,
  X,
} from "lucide-react";
import { useProfile } from "@/lib/profile";
import { useSpeech } from "@/lib/speech";
import { t, type StringKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV: { to: string; key: StringKey; icon: typeof Sprout }[] = [
  { to: "/", key: "dashboard", icon: LayoutDashboard },
  { to: "/profile", key: "profile", icon: User },
  { to: "/crop-doctor", key: "doctor", icon: Stethoscope },
  { to: "/disease-scanner", key: "scanner", icon: ScanLine },
  { to: "/mandi", key: "mandi", icon: BadgeIndianRupee },
  { to: "/soil", key: "soil", icon: FlaskConical },
  { to: "/inventory", key: "inventory", icon: Package },
  { to: "/weather", key: "weather", icon: CloudSun },
  { to: "/schemes", key: "schemes", icon: Landmark },
  { to: "/community", key: "community", icon: Users },
  { to: "/offline", key: "offline", icon: BookOpenCheck },
];

export const HELPLINE = "1800-180-1551";

function NavList({ lang, onPick }: { lang: string; onPick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onPick}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-nav-muted hover:bg-nav-muted/10 hover:text-nav-foreground",
            )}
          >
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
                active ? "bg-accent text-accent-foreground" : "bg-nav-muted/15",
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>
            <span className="truncate">{t(item.key, lang)}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ lang, onPick }: { lang: string; onPick?: () => void }) {
  const { profile, country } = useProfile();
  return (
    <div className="flex h-full flex-col bg-nav text-nav-foreground">
      <div className="flex items-center gap-3 px-5 py-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-xl">
          🌾
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold">{t("appName", lang)}</p>
          <p className="truncate text-xs text-nav-muted">{t("subtitle", lang)}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        <NavList lang={lang} onPick={onPick} />
      </div>
      <div className="space-y-2 border-t border-nav-muted/20 px-5 py-4 text-xs text-nav-muted">
        <a
          href={`tel:${HELPLINE}`}
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-3 py-2.5 text-sm font-bold text-accent-foreground"
        >
          <Phone className="h-4 w-4" /> {HELPLINE}
        </a>
        <p className="rounded-xl bg-nav-muted/10 px-3 py-2 text-center font-semibold">
          BRICS AgriNet
        </p>
        <p className="text-center">
          {country.flag} {country.name}
          {profile.area ? ` · ${profile.area}` : ""}
        </p>
        <p className="text-center opacity-70">v1.0 · Prototype</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { profile, country, locale } = useProfile();
  const { isSpeaking, stop } = useSpeech();
  const lang = profile.language;

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-lift">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-deep lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <Sprout className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <h1 className="truncate font-display text-lg font-extrabold text-accent sm:text-xl">
                  {t("appName", lang)}
                </h1>
                <span className="hidden shrink-0 rounded-full bg-primary-deep px-2 py-0.5 text-[10px] font-bold tracking-wide sm:inline">
                  BRICS AgriN
                </span>
              </div>
              <p className="truncate text-xs opacity-90">
                {profile.name
                  ? `${profile.name} · ${country.flag} ${profile.area || country.name}`
                  : t("subtitle", lang)}
              </p>
            </div>
          </div>
          <div />
          <div className="flex shrink-0 items-center gap-2">
            {isSpeaking && (
              <button
                type="button"
                onClick={stop}
                className="flex items-center gap-2 rounded-xl bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground"
              >
                <VolumeX className="h-4 w-4" />
                <span className="hidden sm:inline">{t("stopVoice", lang)}</span>
              </button>
            )}
            <a
              href={`tel:${HELPLINE}`}
              className="flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-xs font-bold text-accent-foreground"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{t("helpline", lang)}</span>
            </a>
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl bg-primary-deep px-3 py-2 text-xs font-bold"
            >
              <Languages className="h-4 w-4" />
              <span className="hidden sm:inline">{locale.split("-")[0]?.toUpperCase()}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-72 shrink-0 lg:block">
          <SidebarBody lang={lang} />
        </aside>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-nav/60"
            />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-lift">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-4 z-10 grid h-9 w-9 place-items-center rounded-xl bg-nav-muted/20 text-nav-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarBody lang={lang} onPick={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-[1280px] space-y-6">{children}</div>
        </main>
      </div>

      <footer className="mt-10 bg-nav text-nav-foreground">
        <div className="mx-auto max-w-[1280px] space-y-4 px-6 py-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
              BRICS AgriN
            </span>
            <span className="rounded-full bg-nav-muted/15 px-3 py-1">
              Data handled locally on your device
            </span>
            <span className="rounded-full bg-nav-muted/15 px-3 py-1">
              Weather source: Open-Meteo
            </span>
            <span className="rounded-full bg-nav-muted/15 px-3 py-1">
              Advisory is guidance, not an official prescription
            </span>
          </div>
          <p className="text-sm text-nav-muted">
            Kisan Call Centre helpline {HELPLINE} · Confirm every chemical dose with the product
            label and your local agriculture officer or KVK before use.
          </p>
          <p className="text-sm font-semibold">{t("credit", lang)}</p>
          <p className="text-xs text-nav-muted">
            {lang === "hi"
              ? "Built for Indian Farmers · Aarush & Project Team"
              : "भारतीय किसानों के लिए समर्पित · Aarush व टीम द्वारा"}
          </p>
        </div>
      </footer>
    </div>
  );
}
