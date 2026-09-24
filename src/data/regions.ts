// Project direction and ownership: Aarush & Project Team.

export type CountryCode =
  | "IN"
  | "BR"
  | "RU"
  | "CN"
  | "ZA"
  | "EG"
  | "ET"
  | "ID"
  | "IR"
  | "AE";

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  areas: string[];
  languages: { code: string; label: string; locale: string }[];
  crops: string[];
  calendar: string;
}

const EN = { code: "en", label: "English", locale: "en-IN" };

export const COUNTRIES: CountryInfo[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    areas: [
      "Uttar Pradesh",
      "Punjab",
      "Haryana",
      "Maharashtra",
      "Madhya Pradesh",
      "Rajasthan",
      "Bihar",
      "Gujarat",
      "Karnataka",
      "Tamil Nadu",
      "Telangana",
      "Andhra Pradesh",
      "West Bengal",
      "Odisha",
      "Uttarakhand",
    ],
    languages: [
      { code: "hi", label: "हिन्दी (Hindi)", locale: "hi-IN" },
      { code: "bn", label: "বাংলা (Bengali)", locale: "bn-IN" },
      { code: "mr", label: "मराठी (Marathi)", locale: "mr-IN" },
      { code: "ta", label: "தமிழ் (Tamil)", locale: "ta-IN" },
      { code: "te", label: "తెలుగు (Telugu)", locale: "te-IN" },
      { code: "gu", label: "ગુજરાતી (Gujarati)", locale: "gu-IN" },
      { code: "kn", label: "ಕನ್ನಡ (Kannada)", locale: "kn-IN" },
      { code: "ml", label: "മലയാളം (Malayalam)", locale: "ml-IN" },
      { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", locale: "pa-IN" },
      { code: "ur", label: "اردو (Urdu)", locale: "ur-IN" },
      EN,
    ],
    crops: ["Rice", "Wheat", "Pulses", "Cotton", "Maize"],
    calendar:
      "Kharif (June-October): sow rice, cotton, maize with the monsoon. Rabi (November-April): sow wheat and pulses after the monsoon withdraws. Zaid (March-June): short summer vegetables, fodder and moong under assured irrigation.",
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    areas: ["Mato Grosso", "Paraná", "São Paulo", "Minas Gerais", "Goiás", "Bahia"],
    languages: [{ code: "pt", label: "Português (Portuguese)", locale: "pt-BR" }, EN],
    crops: ["Soybean", "Maize", "Coffee", "Sugarcane"],
    calendar:
      "Main soybean sowing runs September-December, with safrinha maize following January-March. Coffee is harvested May-September and sugarcane is cut April-November.",
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    areas: ["Krasnodar Krai", "Rostov Oblast", "Stavropol Krai", "Voronezh Oblast", "Altai Krai"],
    languages: [{ code: "ru", label: "Русский (Russian)", locale: "ru-RU" }, EN],
    crops: ["Wheat", "Barley", "Sunflower", "Potato"],
    calendar:
      "Winter wheat is sown August-September and harvested July-August. Spring barley, sunflower and potato are planted April-May once soils warm above 8°C.",
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    areas: ["Henan", "Shandong", "Heilongjiang", "Jiangsu", "Sichuan", "Hunan"],
    languages: [{ code: "zh", label: "中文 (Mandarin Chinese)", locale: "zh-CN" }, EN],
    crops: ["Rice", "Wheat", "Maize", "Soybean"],
    calendar:
      "Winter wheat is sown October and harvested June. Single-season rice is transplanted May-June; maize and soybean occupy the April-September northeast summer window.",
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    areas: ["Free State", "Mpumalanga", "North West", "Western Cape", "KwaZulu-Natal", "Limpopo"],
    languages: [
      EN,
      { code: "af", label: "Afrikaans", locale: "af-ZA" },
      { code: "zu", label: "isiZulu (Zulu)", locale: "zu-ZA" },
    ],
    crops: ["Maize", "Wheat", "Citrus", "Grapes"],
    calendar:
      "Summer maize is planted October-December and harvested April-July. Winter wheat in the Western Cape is sown May-June. Citrus harvest peaks May-September; grapes are picked January-March.",
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    areas: ["Nile Delta", "Fayoum", "Sharqia", "Beheira", "Minya", "Aswan"],
    languages: [{ code: "ar", label: "العربية (Arabic)", locale: "ar-EG" }, EN],
    crops: ["Wheat", "Maize", "Rice", "Vegetables"],
    calendar:
      "Wheat is sown November and harvested April-May. Summer maize and rice are planted May-June under Nile irrigation, with vegetables grown across both seasons.",
  },
  {
    code: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    areas: ["Oromia", "Amhara", "Tigray", "SNNPR", "Sidama"],
    languages: [{ code: "am", label: "አማርኛ (Amharic)", locale: "am-ET" }, EN],
    crops: ["Teff", "Maize", "Wheat", "Coffee", "Pulses"],
    calendar:
      "Meher season sowing follows the Kiremt rains June-September, with harvest November-January. Belg short rains (February-April) support early maize and pulses. Coffee is picked October-December.",
  },
  {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    areas: ["Java", "Sumatra", "Sulawesi", "Kalimantan", "Bali"],
    languages: [{ code: "id", label: "Bahasa Indonesia", locale: "id-ID" }, EN],
    crops: ["Rice", "Maize", "Coffee", "Cocoa", "Palm"],
    calendar:
      "Wet-season rice is transplanted October-December; a second crop follows March-June. Coffee and cocoa are harvested through the dry months, and palm is cut year-round on a 10-14 day cycle.",
  },
  {
    code: "IR",
    name: "Iran",
    flag: "🇮🇷",
    areas: ["Fars", "Khuzestan", "Kerman", "Golestan", "Khorasan Razavi"],
    languages: [{ code: "fa", label: "فارسی (Persian)", locale: "fa-IR" }, EN],
    crops: ["Wheat", "Barley", "Pistachio", "Saffron"],
    calendar:
      "Wheat and barley are sown October-November and harvested May-June. Pistachio is harvested August-September; saffron corms flower late October-November.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    areas: ["Abu Dhabi", "Al Ain", "Dubai", "Sharjah", "Ras Al Khaimah", "Fujairah"],
    languages: [{ code: "ar", label: "العربية (Arabic)", locale: "ar-AE" }, EN],
    crops: ["Dates", "Vegetables", "Fodder crops"],
    calendar:
      "Date palm pollination is February-March with harvest July-September. Protected-house vegetables run October-April; fodder crops depend on controlled irrigation year-round.",
  },
];

export function getCountry(code: string): CountryInfo {
  return COUNTRIES.find((c) => c.code === code) ?? (COUNTRIES[0] as CountryInfo);
}
