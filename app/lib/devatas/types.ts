export type DeityTradition =
  | 'all'
  | 'pancha_deva'
  | 'shaiva'
  | 'vaishnava'
  | 'shakta'
  | 'ganapatya'
  | 'kaumara'
  | 'hanuman'
  | 'saura'
  | 'navagraha';

export interface DeityMantra {
  title: string;
  devanagari: string;
  transliteration: string;
  meaning: string;
}

export interface DeityTemple {
  name: string;
  location: string;
  significance: string;
}

export interface DeityRecord {
  id: string; // e.g. 'shiva', 'krishna'
  name: string;
  nameDevanagari: string;
  subtitle: string;
  subtitleDevanagari: string;
  tradition: 'Shaiva' | 'Vaishnava' | 'Shakta' | 'Ganapatya' | 'Kaumara' | 'Saura' | 'Hanuman' | 'Navagraha';
  isPanchaDeva: boolean;
  avatarOf?: string;
  consort?: string;
  vahana?: string; // Divine mount (e.g. Nandi, Garuda, Tiger, Mouse)
  ayudhas?: string[]; // Weapons / Implements (e.g. Trishula, Sudarshana Chakra)
  abode?: string; // Kailash, Vaikuntha, etc.
  sacredDay: string; // e.g. "Monday (Somavara)", "Ekadashi / Saturday"
  sacredTithi: string; // e.g. "Chaturdashi (Pradosha)", "Ekadashi"
  panchangTithiLink?: string; // Query for Panchang
  associatedFestivals: string[]; // e.g. ["Maha Shivaratri", "Pradosh Vrat"]
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accentGlow: string;
  };
  tatva: string; // Philosophical / Vedic essence
  iconography: string; // Symbolism of physical forms
  keyMantras: DeityMantra[];
  majorTemples: DeityTemple[];
  traditionalOfferings: string[]; // e.g. Belpatra, Modak, Tulsi
}

export interface DevatasFilterOptions {
  tradition?: DeityTradition;
  searchQuery?: string;
  id?: string;
}

export interface DevatasApiResponse {
  totalCount: number;
  traditions: {
    id: DeityTradition;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  deities: DeityRecord[];
}
