export type TempleCircuit =
  | 'all'
  | 'jyotirlinga'
  | 'char_dham'
  | 'shakti_peetha'
  | 'pancha_bhoota'
  | 'divya_desam'
  | 'maha_kshetra'
  | 'international';

export type TempleTradition =
  | 'all'
  | 'shaiva'
  | 'vaishnava'
  | 'shakta'
  | 'smarta'
  | 'kaumara'
  | 'saura';

export interface TempleLocation {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  elevationMeters?: number;
}

export interface TempleRecord {
  id: string; // e.g. 'kashi-vishwanath'
  name: string;
  nameDevanagari: string;
  circuit:
    | 'Jyotirlinga'
    | 'Char Dham'
    | 'Shakti Peetha'
    | 'Pancha Bhoota'
    | 'Divya Desam'
    | 'Maha Kshetra'
    | 'International';
  circuitCategory: TempleCircuit;
  secondaryCircuits?: TempleCircuit[];
  tradition: 'Shaiva' | 'Vaishnava' | 'Shakta' | 'Smarta' | 'Kaumara' | 'Saura';
  deityId: string; // e.g. 'shiva', 'vishnu', 'durga'
  primaryDeity: string;
  primaryDeityDevanagari: string;
  consortDeity?: string;
  location: TempleLocation;
  sacredRiver?: string;
  era: string; // e.g. "Vedic Primordial (Current structure Ahilyabai Holkar 1780 CE)"
  architecturalStyle: string; // e.g. "Nagara", "Dravidian", "Kalinga"
  significance: string;
  puranicLore: string;
  darshanTimings: string;
  dressCode?: string;
  majorFestivals: string[];
  presidingTithi?: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    accentGlow: string;
  };
}

export interface TemplesFilterOptions {
  circuit?: TempleCircuit;
  tradition?: TempleTradition;
  state?: string;
  searchQuery?: string;
  id?: string;
  deityId?: string;
}

export interface TemplesApiResponse {
  totalCount: number;
  circuits: {
    id: TempleCircuit;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  temples: TempleRecord[];
}
