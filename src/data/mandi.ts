// Project direction and ownership: Aarush & Project Team.
// Indicative India mandi reference data for prototype demonstration only.

export interface MandiRow {
  crop: string;
  emoji: string;
  mandi: string;
  state: string;
  modal: number;
  msp: number;
  trend: "up" | "down" | "stable";
  change: number;
}

export const MANDI_ROWS: MandiRow[] = [
  { crop: "Wheat", emoji: "🌾", mandi: "Karnal APMC", state: "Haryana", modal: 2480, msp: 2425, trend: "up", change: 35 },
  { crop: "Wheat", emoji: "🌾", mandi: "Indore Mandi", state: "Madhya Pradesh", modal: 2390, msp: 2425, trend: "down", change: -20 },
  { crop: "Paddy (Common)", emoji: "🌾", mandi: "Karimnagar Market", state: "Telangana", modal: 2310, msp: 2300, trend: "stable", change: 5 },
  { crop: "Paddy (Common)", emoji: "🌾", mandi: "Burdwan Mandi", state: "West Bengal", modal: 2185, msp: 2300, trend: "down", change: -45 },
  { crop: "Cotton (Medium Staple)", emoji: "🧵", mandi: "Rajkot APMC", state: "Gujarat", modal: 7420, msp: 7121, trend: "up", change: 120 },
  { crop: "Cotton (Medium Staple)", emoji: "🧵", mandi: "Akola APMC", state: "Maharashtra", modal: 7080, msp: 7121, trend: "stable", change: 10 },
  { crop: "Soybean", emoji: "🫘", mandi: "Ujjain Mandi", state: "Madhya Pradesh", modal: 4620, msp: 4892, trend: "down", change: -60 },
  { crop: "Maize", emoji: "🌽", mandi: "Davangere APMC", state: "Karnataka", modal: 2260, msp: 2225, trend: "up", change: 40 },
  { crop: "Gram (Chana)", emoji: "🫛", mandi: "Bikaner Mandi", state: "Rajasthan", modal: 5820, msp: 5650, trend: "up", change: 75 },
  { crop: "Mustard", emoji: "🌼", mandi: "Alwar Mandi", state: "Rajasthan", modal: 5480, msp: 5650, trend: "down", change: -30 },
  { crop: "Potato", emoji: "🥔", mandi: "Agra Mandi", state: "Uttar Pradesh", modal: 1240, msp: 0, trend: "up", change: 90 },
  { crop: "Onion", emoji: "🧅", mandi: "Lasalgaon APMC", state: "Maharashtra", modal: 1880, msp: 0, trend: "down", change: -140 },
  { crop: "Tur (Arhar)", emoji: "🫘", mandi: "Gulbarga APMC", state: "Karnataka", modal: 8150, msp: 7550, trend: "up", change: 160 },
  { crop: "Sugarcane", emoji: "🎋", mandi: "Muzaffarnagar Centre", state: "Uttar Pradesh", modal: 370, msp: 340, trend: "stable", change: 0 },
];

export const MANDI_STATES = Array.from(new Set(MANDI_ROWS.map((r) => r.state))).sort();
