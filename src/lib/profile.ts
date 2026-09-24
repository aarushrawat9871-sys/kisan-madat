// Project direction and ownership: Aarush & Project Team.
import { useCallback, useEffect, useState } from "react";
import { getCountry } from "@/data/regions";

export interface FarmerProfile {
  name: string;
  country: string;
  language: string;
  area: string;
}

export const PROFILE_KEY = "kisan-profile";

export const DEFAULT_PROFILE: FarmerProfile = {
  name: "",
  country: "IN",
  language: "hi",
  area: "Uttar Pradesh",
};

const listeners = new Set<(p: FarmerProfile) => void>();

export function readProfile(): FarmerProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<FarmerProfile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function writeProfile(profile: FarmerProfile) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
  listeners.forEach((fn) => fn(profile));
}

/** Profile is client-only (localStorage); starts from defaults during SSR. */
export function useProfile() {
  const [profile, setProfile] = useState<FarmerProfile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(readProfile());
    setLoaded(true);
    const fn = (p: FarmerProfile) => setProfile(p);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const save = useCallback((next: FarmerProfile) => {
    writeProfile(next);
    setProfile(next);
  }, []);

  const country = getCountry(profile.country);
  const locale =
    country.languages.find((l) => l.code === profile.language)?.locale ?? "en-IN";

  return { profile, save, loaded, country, locale };
}
