export interface GeoLocation {
  name: string;
  latitude: number; // Decimal degrees, positive North (-90 to +90)
  longitude: number; // Decimal degrees, positive East (-180 to +180)
  altitude: number; // Elevation in meters above sea level
  timezone: string; // IANA Timezone string, e.g. 'Asia/Kolkata'
  timezoneOffset?: number; // UTC offset in hours (optional override)
  useElevationDip?: boolean; // Default false (standard sea-level baseline used by Drik Panchang and Indian almanacs)
}

export type Paksha = 'Shukla' | 'Krishna';

export interface TransitionEvent<T> {
  current: T;
  endTime: Date;
  next: T;
  progressPercent: number; // 0 to 100
}

export interface TithiDetails {
  index: number; // 1 to 30
  pakshaIndex: number; // 1 to 15
  paksha: Paksha;
  pakshaDevanagari: string;
  name: string;
  nameDevanagari: string;
  deity: string;
}

export interface NakshatraDetails {
  index: number; // 1 to 27
  name: string;
  nameDevanagari: string;
  lord: string;
  deity: string;
  pada: number; // 1 to 4
}

export interface YogaDetails {
  index: number; // 1 to 27
  name: string;
  nameDevanagari: string;
  nature: 'Auspicious' | 'Inauspicious' | 'Neutral';
}

export interface KaranaDetails {
  index: number; // 1 to 60
  name: string;
  nameDevanagari: string;
  type: 'Chara' | 'Sthira';
  deity: string;
}

export interface VaraDetails {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  name: string;
  nameDevanagari: string;
  englishName: string;
  lordPlanet: string;
}

export interface RashiDetails {
  index: number; // 0 to 11 (0 = Mesha / Aries)
  name: string;
  nameDevanagari: string;
  englishName: string;
  lord: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
}

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  civilDawn: Date;
  civilDusk: Date;
  nauticalDawn: Date;
  astronomicalDawn: Date;
  dayLengthMs: number;
  nightLengthMs: number;
}

export interface MoonTimes {
  moonrise: Date | null;
  moonset: Date | null;
  phaseAngleDeg: number;
  illuminationFraction: number; // 0 to 1
  moonAgeDays: number;
  phaseName: string;
}

export interface MuhurtaPeriod {
  name: string;
  nameDevanagari?: string;
  startTime: Date;
  endTime: Date;
  isAuspicious: boolean;
  quality: 'Shubh' | 'Ashubh' | 'Neutral';
  description?: string;
}

export interface ChoghadiyaPeriod {
  name: string;
  nameDevanagari: string;
  ruler: string;
  quality: 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg';
  nature: 'Auspicious' | 'Neutral' | 'Inauspicious';
  startTime: Date;
  endTime: Date;
  isCurrent?: boolean;
}

export interface MasaDetails {
  amantaIndex: number; // 0 to 11 (0 = Chaitra or Vaishakha)
  amantaName: string;
  amantaNameDevanagari: string;
  purnimantaIndex: number;
  purnimantaName: string;
  purnimantaNameDevanagari: string;
  isAdhika: boolean;
  adhikaType?: 'Adhika' | 'Nija';
}

export interface SamvatDetails {
  vikramSamvat: number;
  shakaSamvat: number;
  kaliSamvat: number;
  ayana: 'Uttarayana' | 'Dakshinayana';
  ayanaDevanagari: string;
  ritu: string;
  rituDevanagari: string;
}

export interface FestivalEvent {
  name: string;
  nameDevanagari: string;
  isMajor: boolean;
  category: 'Festival' | 'Vrat' | 'Jayanti' | 'Sankranti' | 'Parva';
  description?: string;
  significance?: string;
}

export interface UpcomingFestival {
  date: Date;
  isoDate: string;
  daysRemaining: number;
  festivals: FestivalEvent[];
}

export interface AstronomicalDetails {
  julianDay: number;
  deltaTSeconds: number;
  ayanamsaType: string;
  ayanamsaValueDeg: number;
  sunTropicalLonDeg: number;
  sunSiderealLonDeg: number;
  moonTropicalLonDeg: number;
  moonSiderealLonDeg: number;
  moonLatitudeDeg: number;
  moonDistanceKm: number;
  sunDistanceAU: number;
  sunDeclinationDeg: number;
  sunRightAscensionDeg: number;
  moonDeclinationDeg: number;
  moonRightAscensionDeg: number;
  equationOfTimeMinutes: number;
  topocentricHorizonDipDeg: number;
}

export interface PanchangData {
  date: Date;
  isoDate: string;
  location: GeoLocation;
  sunTimes: SunTimes;
  moonTimes: MoonTimes;
  tithi: TransitionEvent<TithiDetails>;
  nakshatra: TransitionEvent<NakshatraDetails>;
  yoga: TransitionEvent<YogaDetails>;
  karana: TransitionEvent<KaranaDetails>;
  vara: VaraDetails;
  sunRashi: TransitionEvent<RashiDetails>;
  moonRashi: TransitionEvent<RashiDetails>;
  masa: MasaDetails;
  samvat: SamvatDetails;
  muhurtas: {
    brahmaMuhurta: MuhurtaPeriod;
    pratahSandhya: MuhurtaPeriod;
    abhijitMuhurta: MuhurtaPeriod | null;
    vijayaMuhurta: MuhurtaPeriod;
    godhuliMuhurta: MuhurtaPeriod;
    sayahnaSandhya: MuhurtaPeriod;
    amritKaal?: MuhurtaPeriod | null;
    nishitaMuhurta: MuhurtaPeriod;
    rahuKaal: MuhurtaPeriod;
    yamaganda: MuhurtaPeriod;
    gulikaKaal: MuhurtaPeriod;
    durMuhurtas: MuhurtaPeriod[];
    varjyam?: MuhurtaPeriod | null;
  };
  choghadiya: {
    day: ChoghadiyaPeriod[];
    night: ChoghadiyaPeriod[];
  };
  festivals: FestivalEvent[];
  upcomingFestivals: UpcomingFestival[];
  astronomy: AstronomicalDetails;
}
