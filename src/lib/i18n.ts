// Project direction and ownership: Aarush & Project Team.
// Built-in UI translations cover Hindi and English. All other languages are
// served through the /api/translate helper (LibreTranslate or the AI fallback).

export type UiLang = "hi" | "en";

const STRINGS = {
  appName: { en: "Kisan AI Sahayak", hi: "किसान AI सहायक" },
  subtitle: {
    en: "Farmer Friend & Crop Care Assistant",
    hi: "किसान मित्र और फसल देखभाल सहायक",
  },
  helpline: { en: "Kisan Helpline", hi: "किसान हेल्पलाइन" },
  language: { en: "Language", hi: "भाषा" },
  stopVoice: { en: "Stop voice", hi: "आवाज़ रोकें" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  profile: { en: "My Profile", hi: "मेरी प्रोफ़ाइल" },
  doctor: { en: "AI Crop Doctor", hi: "AI फसल डॉक्टर" },
  scanner: { en: "Disease Scanner", hi: "रोग स्कैनर" },
  mandi: { en: "Mandi Rates", hi: "मंडी भाव" },
  soil: { en: "Soil & Fertilizer", hi: "मिट्टी और खाद" },
  inventory: { en: "Farm Inventory", hi: "फार्म भंडार" },
  weather: { en: "Weather & Spray", hi: "मौसम और छिड़काव" },
  schemes: { en: "Government Schemes", hi: "सरकारी योजनाएँ" },
  community: { en: "Farmer Community", hi: "किसान समुदाय" },
  offline: { en: "Offline Guide", hi: "ऑफ़लाइन गाइड" },
  credit: {
    en: "Built for Indian Farmers · Aarush & Project Team",
    hi: "भारतीय किसानों के लिए समर्पित · Aarush व टीम द्वारा",
  },
  listen: { en: "Listen", hi: "सुनें" },
  share: { en: "Share on WhatsApp", hi: "व्हाट्सएप पर भेजें" },
  print: { en: "Print", hi: "प्रिंट" },
} as const;

export type StringKey = keyof typeof STRINGS;

export function uiLang(languageCode: string): UiLang {
  return languageCode === "hi" ? "hi" : "en";
}

export function t(key: StringKey, languageCode: string): string {
  return STRINGS[key][uiLang(languageCode)];
}

/** Calls the server translate endpoint. English and Hindi are returned as-is. */
export async function translateText(text: string, languageCode: string): Promise<string> {
  if (!text || languageCode === "en" || languageCode === "hi") return text;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target: languageCode }),
    });
    if (!res.ok) return text;
    const data = (await res.json()) as { translatedText?: string };
    return data.translatedText || text;
  } catch {
    return text;
  }
}
