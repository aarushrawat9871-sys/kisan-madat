// Project direction and ownership: Aarush & Project Team.
// Prototype directory. Replace with a Firebase/Supabase realtime source later.

export interface CommunityFarmer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  expertise: string;
  online: boolean;
  years: number;
  reply: string;
}

export const COMMUNITY: CommunityFarmer[] = [
  {
    id: "f1",
    name: "Ramkishan Yadav",
    avatar: "👨‍🌾",
    location: "Hardoi, Uttar Pradesh",
    expertise: "Wheat & mustard rotation",
    online: true,
    years: 22,
    reply: "Namaste! For wheat at crown-root stage, keep irrigation light and check for yellow rust on lower leaves first.",
  },
  {
    id: "f2",
    name: "Sunita Patil",
    avatar: "👩‍🌾",
    location: "Akola, Maharashtra",
    expertise: "Cotton IPM & pheromone traps",
    online: true,
    years: 14,
    reply: "In cotton, put up traps before flowering. Counting moths weekly saves two unnecessary sprays in my field.",
  },
  {
    id: "f3",
    name: "Harpreet Singh",
    avatar: "🧑‍🌾",
    location: "Bathinda, Punjab",
    expertise: "Paddy direct seeding",
    online: false,
    years: 18,
    reply: "DSR works well if the field is laser levelled. Keep the first irrigation light and weed control on time.",
  },
  {
    id: "f4",
    name: "Lakshmi Reddy",
    avatar: "👩‍🌾",
    location: "Karimnagar, Telangana",
    expertise: "Paddy nursery & seed treatment",
    online: true,
    years: 11,
    reply: "Treat seed before sowing and keep the nursery bed raised. It reduces early blight problems a lot.",
  },
  {
    id: "f5",
    name: "Bhavesh Patel",
    avatar: "👨‍🌾",
    location: "Rajkot, Gujarat",
    expertise: "Drip irrigation & groundnut",
    online: false,
    years: 16,
    reply: "Drip lines need flushing every fortnight. Blocked emitters cost more yield than people expect.",
  },
  {
    id: "f6",
    name: "Meena Kumari",
    avatar: "👩‍🌾",
    location: "Muzaffarpur, Bihar",
    expertise: "Vegetables & organic inputs",
    online: true,
    years: 9,
    reply: "Neem extract works best as a preventive spray, not as a cure. Start early and repeat after rain.",
  },
];
