// Project direction and ownership: Aarush & Project Team.
// Reference cards used by the Disease Scanner simulation.

export interface DiseaseCard {
  id: string;
  name: string;
  hindi: string;
  crop: string;
  emoji: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High";
  symptoms: string[];
  chemical: string;
  organic: string;
  sprayTiming: string;
  cost: string;
  savings: string;
}

export const DISEASE_CARDS: DiseaseCard[] = [
  {
    id: "late-blight",
    name: "Late Blight",
    hindi: "पछेती झुलसा",
    crop: "Potato / Tomato",
    emoji: "🥔",
    confidence: 92,
    severity: "High",
    symptoms: [
      "Water-soaked dark patches on leaf edges",
      "White fuzzy growth under the leaf in humid mornings",
      "Rapid drying and collapse of foliage after cloudy, wet days",
    ],
    chemical:
      "Protective spray of mancozeb 75% WP as label-directed; move to a systemic cymoxanil + mancozeb combination only if disease is already spreading and the label permits it on your crop.",
    organic:
      "Remove and bury infected foliage, improve spacing and drainage, and spray a copper-based bio-fungicide early in the morning.",
    sprayTiming: "Early morning or late evening, when leaves are dry and no rain is expected for 6 hours.",
    cost: "₹900 - ₹1,400 per acre",
    savings: "Timely action can protect ₹12,000 - ₹18,000 per acre of yield",
  },
  {
    id: "pink-bollworm",
    name: "Pink Bollworm",
    hindi: "गुलाबी सुंडी",
    crop: "Cotton",
    emoji: "🧵",
    confidence: 88,
    severity: "High",
    symptoms: [
      "Rosette flowers with twisted petals",
      "Small entry holes on green bolls",
      "Pink larvae and stained lint inside opened bolls",
    ],
    chemical:
      "Follow the state package of practices for bollworm; rotate approved insecticide groups and never repeat the same group twice in a row.",
    organic:
      "Install 8-10 pheromone traps per acre, release Trichogramma cards, destroy rosette flowers and remove crop residue after harvest.",
    sprayTiming: "Evening hours when pollinators are inactive and wind is below 10 km/h.",
    cost: "₹1,100 - ₹1,800 per acre",
    savings: "Early trapping can protect ₹15,000 - ₹22,000 per acre",
  },
  {
    id: "blb",
    name: "Bacterial Leaf Blight",
    hindi: "जीवाणु झुलसा",
    crop: "Paddy",
    emoji: "🌾",
    confidence: 85,
    severity: "Moderate",
    symptoms: [
      "Yellow-white wavy streaks from the leaf tip downward",
      "Leaves drying from the margins inward",
      "Milky bacterial ooze from a cut leaf placed in clear water",
    ],
    chemical:
      "Bacterial blight does not respond to normal fungicides. Use only the copper or antibiotic combination cleared for paddy in your state, exactly as printed on the label.",
    organic:
      "Drain the field for 2-3 days, stop nitrogen top-dressing, use clean seed and resistant varieties next season.",
    sprayTiming: "Apply after drainage, on a calm dry day; avoid spraying in standing flood water.",
    cost: "₹600 - ₹1,000 per acre",
    savings: "Managing spread can protect ₹8,000 - ₹14,000 per acre",
  },
];
