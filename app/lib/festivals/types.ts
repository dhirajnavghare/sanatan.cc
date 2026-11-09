import { GeoLocation } from '../panchang/types';

export type FestivalCategory = 'all' | 'major' | 'festival' | 'vrat' | 'jayanti' | 'sankranti' | 'ekadashi' | 'parva';

export interface FestivalTimelineItem {
  id: string;
  name: string;
  nameDevanagari: string;
  category: 'Festival' | 'Vrat' | 'Jayanti' | 'Sankranti' | 'Parva';
  isMajor: boolean;
  date: string; // ISO format 'YYYY-MM-DD'
  formattedDate: string; // e.g. "Sunday, Nov 8, 2026"
  dayOfWeek: string; // e.g. "Sunday"
  dayOfWeekDevanagari: string; // e.g. "रविवार"
  daysRemaining: number; // relative to query/today date
  timeStatus: 'past' | 'today' | 'upcoming';
  masaName: string;
  masaNameDevanagari: string;
  paksha: 'Shukla' | 'Krishna';
  tithiName: string;
  tithiNameDevanagari: string;
  ritu: string;
  rituDevanagari: string;
  deity?: string;
  pujaMuhurta?: string;
  significance: string;
  rituals: string[];
  panchangUrl: string; // e.g. "/panchang?date=2026-11-08"
}

export interface FestivalTimelineFilterOptions {
  year: number;
  category?: FestivalCategory;
  month?: number; // 1 to 12 (Gregorian) or undefined for all
  searchQuery?: string;
  anchorDate?: string; // Anchor for calculating daysRemaining
}

export interface FestivalTimelineResponse {
  year: number;
  totalCount: number;
  location: GeoLocation;
  categories: {
    id: FestivalCategory;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  months: {
    monthNumber: number;
    monthName: string;
    monthNameHindi: string;
    count: number;
  }[];
  festivals: FestivalTimelineItem[];
  nextUpcoming?: FestivalTimelineItem | null;
}
