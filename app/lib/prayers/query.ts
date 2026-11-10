import { PRAYERS_DATA } from './data';
import { PrayerRecord, PrayersFilterOptions, PrayersResponse } from './types';

export function getAllPrayers(): PrayerRecord[] {
  return PRAYERS_DATA;
}

export function getPrayerBySlug(slug: string): PrayerRecord | undefined {
  return PRAYERS_DATA.find((p) => p.slug === slug || p.id === slug);
}

export function filterPrayers(options: PrayersFilterOptions = {}): PrayersResponse {
  let filtered = [...PRAYERS_DATA];

  if (options.deity && options.deity !== 'all') {
    filtered = filtered.filter((p) => p.deity === options.deity);
  }

  if (options.category && options.category !== 'all') {
    filtered = filtered.filter((p) => p.category === options.category);
  }

  if (options.searchQuery && options.searchQuery.trim().length > 0) {
    const q = options.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.titleDevanagari.includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.subtitleDevanagari.includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.authorDevanagari.includes(q) ||
        p.verses.some(
          (v) =>
            v.sanskrit.includes(q) ||
            v.transliteration.toLowerCase().includes(q) ||
            v.hindiMeaning.includes(q) ||
            v.englishMeaning.toLowerCase().includes(q)
        )
    );
  }

  return {
    total: filtered.length,
    prayers: filtered,
  };
}

/**
 * Recommended prayer of the day based on the Vedic day of week (Vara)
 * Sunday: Aditya Hridaya
 * Monday: Shiv Tandav
 * Tuesday: Hanuman Chalisa
 * Wednesday: Ganesh Chalisa
 * Thursday: Om Jai Jagdish Hare
 * Friday: Shri Suktam
 * Saturday: Sankat Mochan
 */
export function getPrayerOfTheDay(dayOfWeekIndex?: number): PrayerRecord {
  const day = typeof dayOfWeekIndex === 'number' ? dayOfWeekIndex : new Date().getDay();
  switch (day) {
    case 0: // Sunday
      return getPrayerBySlug('aditya-hridaya-stotram') || PRAYERS_DATA[0];
    case 1: // Monday
      return getPrayerBySlug('shiv-tandav-stotram') || PRAYERS_DATA[0];
    case 2: // Tuesday
      return getPrayerBySlug('hanuman-chalisa') || PRAYERS_DATA[0];
    case 3: // Wednesday
      return getPrayerBySlug('ganesh-chalisa') || PRAYERS_DATA[0];
    case 4: // Thursday
      return getPrayerBySlug('om-jai-jagdish-hare') || PRAYERS_DATA[0];
    case 5: // Friday
      return getPrayerBySlug('shri-suktam') || PRAYERS_DATA[0];
    case 6: // Saturday
      return getPrayerBySlug('sankat-mochan-hanuman-ashtak') || PRAYERS_DATA[0];
    default:
      return PRAYERS_DATA[0];
  }
}
