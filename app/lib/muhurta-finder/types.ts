export type MuhurtaCategoryId =
  | 'griha_pravesh'
  | 'vivaha'
  | 'vehicle_purchase'
  | 'business_start'
  | 'property_purchase'
  | 'namakarana'
  | 'gold_purchase'
  | 'sarvartha_siddhi';

export interface MuhurtaCategoryMeta {
  id: MuhurtaCategoryId;
  title: string;
  titleDevanagari: string;
  icon: string;
  description: string;
  traditionalReference: string;
}

export type MuhurtaSuitability = 'Optimal' | 'Good' | 'Average' | 'Inauspicious';

export interface RecommendedTimeWindow {
  label: string;
  startTime: Date;
  endTime: Date;
  quality: 'Shubh' | 'Amrit' | 'Labh' | 'Abhijit' | 'Vijaya';
  description: string;
}

export interface MuhurtaDayEvaluation {
  date: Date;
  isoDate: string;
  suitability: MuhurtaSuitability;
  score: number; // 0 to 100
  title: string;
  reasons: string[];
  precautions: string[];
  specialYogas: string[];
  panchakaType?: 'Rog' | 'Agni' | 'Raj' | 'Chora' | 'Mrityu' | 'None';
  hasVishtiBhadra: boolean;
  hasRiktaTithi: boolean;
  windows: RecommendedTimeWindow[];
  avoidWindows: { label: string; startTime: Date; endTime: Date }[];
  panchangSummary: {
    tithiName: string;
    tithiNameDevanagari?: string;
    tithiPaksha: string;
    tithiPakshaDevanagari?: string;
    nakshatraName: string;
    nakshatraNameDevanagari?: string;
    yogaName: string;
    yogaNameDevanagari?: string;
    karanaName: string;
    karanaNameDevanagari?: string;
    varaName: string;
    varaNameDevanagari?: string;
    sunrise: Date;
    sunset: Date;
  };
}

export interface MuhurtaFilterOptions {
  category: MuhurtaCategoryId;
  daysCount: 30 | 60 | 90 | 180;
  minimumSuitability?: 'All' | 'Good' | 'Optimal';
}
