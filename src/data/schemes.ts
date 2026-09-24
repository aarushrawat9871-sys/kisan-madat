// Project direction and ownership: Aarush & Project Team.
// India scheme summaries for guidance only. Always confirm current rules with
// the official portal or your local agriculture office before applying.

export interface Scheme {
  id: string;
  name: string;
  hindi: string;
  benefit: string;
  description: string;
  eligibility: string[];
  documents: string[];
}

export const SCHEMES: Scheme[] = [
  {
    id: "pmfby",
    name: "PM Fasal Bima Yojana",
    hindi: "प्रधानमंत्री फसल बीमा योजना",
    benefit: "Crop insurance cover",
    description:
      "Crop insurance against natural calamity, pest and disease losses. Farmer premium is typically 2% for Kharif, 1.5% for Rabi and 5% for commercial or horticulture crops.",
    eligibility: [
      "All farmers growing notified crops in notified areas",
      "Both loanee and non-loanee farmers, including tenant and sharecroppers",
      "Enrolment before the cut-off date of the season",
    ],
    documents: ["Aadhaar", "Land records / khasra khatauni", "Bank passbook", "Sowing certificate or self-declaration", "Tenancy agreement for tenant farmers"],
  },
  {
    id: "pmkisan",
    name: "PM-KISAN",
    hindi: "पीएम-किसान सम्मान निधि",
    benefit: "₹6,000 per year income support",
    description:
      "Direct income support of ₹6,000 a year paid in three equal instalments straight into the landholding farmer's bank account.",
    eligibility: [
      "Landholding farmer families with cultivable land",
      "Excludes income-tax payers, institutional landholders and specified higher-income categories",
      "e-KYC and Aadhaar-seeded bank account required",
    ],
    documents: ["Aadhaar", "Land ownership papers", "Aadhaar-linked bank account", "Mobile number for e-KYC"],
  },
  {
    id: "pmkusum",
    name: "PM-KUSUM",
    hindi: "पीएम-कुसुम सौर योजना",
    benefit: "Subsidy on solar pumps",
    description:
      "Central and state subsidy support for standalone solar pumps, solarisation of existing grid-connected pumps and small solar plants on barren farmland.",
    eligibility: [
      "Individual farmers, FPOs, cooperatives and water user associations",
      "Existing irrigation source or approved pump connection",
      "Component-wise capacity limits as notified by the state",
    ],
    documents: ["Aadhaar", "Land records", "Bank passbook", "Existing electricity connection details (for solarisation)"],
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    hindi: "किसान क्रेडिट कार्ड",
    benefit: "Short-term crop loan at concessional interest",
    description:
      "Working-capital credit for crop production, post-harvest expenses, allied activities and household needs, with interest subvention and prompt-repayment incentive.",
    eligibility: [
      "Owner cultivators, tenant farmers, oral lessees and sharecroppers",
      "Self-help groups and joint liability groups of farmers",
      "Animal husbandry and fisheries activities also covered",
    ],
    documents: ["Aadhaar and PAN", "Land records or tenancy proof", "Passport photos", "Crop plan for the season"],
  },
  {
    id: "micro-irrigation",
    name: "Micro Irrigation / Drip (PDMC)",
    hindi: "सूक्ष्म सिंचाई / ड्रिप",
    benefit: "Subsidy on drip and sprinkler systems",
    description:
      "Per Drop More Crop support for drip and sprinkler installation to raise water-use efficiency. Subsidy share differs for small/marginal and other farmers and by state.",
    eligibility: [
      "Farmers with an assured water source",
      "Land in the applicant's name or with valid lease",
      "Subsidy generally limited to 5 hectares per beneficiary",
    ],
    documents: ["Aadhaar", "Land records", "Water source proof", "Quotation from empanelled supplier", "Bank details"],
  },
  {
    id: "soil-health",
    name: "Soil Health Card",
    hindi: "मृदा स्वास्थ्य कार्ड",
    benefit: "Free soil testing and nutrient advice",
    description:
      "Soil samples are tested for macro and micro nutrients and a card is issued with crop-wise fertilizer recommendations, helping cut unnecessary fertilizer spend.",
    eligibility: ["Open to all farmers", "Sample collected from the registered survey number"],
    documents: ["Aadhaar", "Land record with survey/khasra number", "Mobile number"],
  },
  {
    id: "enam",
    name: "e-NAM",
    hindi: "ई-नाम राष्ट्रीय कृषि बाज़ार",
    benefit: "Online mandi trading access",
    description:
      "Electronic trading platform linking APMC mandis nationally so farmers can see more buyers, transparent bidding and direct online payment.",
    eligibility: ["Farmers selling through a linked APMC mandi", "Registration at the mandi with a bank account"],
    documents: ["Aadhaar", "Bank passbook", "Mandi registration / gate entry details"],
  },
];
