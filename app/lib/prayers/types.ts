export type PrayerCategory = 'chalisa' | 'stotram' | 'suktam' | 'aarti' | 'nitya';

export type DeityCategory =
  | 'hanuman'
  | 'shiva'
  | 'devi'
  | 'surya'
  | 'vishnu'
  | 'ganesha'
  | 'daily';

export type VerseType = 'doha' | 'chaupai' | 'sloka' | 'stuti' | 'aarti' | 'mantra';

export interface PrayerVerse {
  verseNumber: number;
  verseType: VerseType;
  sanskrit: string;
  transliteration: string;
  hindiMeaning: string;
  englishMeaning: string;
}

export interface PrayerRecord {
  id: string;
  slug: string;
  title: string;
  titleDevanagari: string;
  subtitle: string;
  subtitleDevanagari: string;
  deity: DeityCategory;
  category: PrayerCategory;
  author: string;
  authorDevanagari: string;
  totalVerses: number;
  idealTime: string;
  idealTimeDevanagari: string;
  significance: string;
  significanceDevanagari: string;
  phalaShruti: string;
  phalaShrutiDevanagari: string;
  recommendedCounts: number[];
  verses: PrayerVerse[];
}

export interface PrayersFilterOptions {
  deity?: DeityCategory | 'all';
  category?: PrayerCategory | 'all';
  searchQuery?: string;
}

export interface PrayersResponse {
  total: number;
  prayers: PrayerRecord[];
}
