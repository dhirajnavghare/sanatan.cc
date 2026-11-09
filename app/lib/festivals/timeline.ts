import { GeoLocation } from '../panchang/types';
import { calculateFestivals, getMasaAtJd } from '../panchang/festivals';
import { getElongation } from '../panchang/panchang-calc';
import { toJulianDay } from '../panchang/astronomy';
import {
  LUNAR_MONTHS,
  LUNAR_MONTHS_DEVANAGARI,
  TITHI_NAMES,
  TITHI_DEVANAGARI,
} from '../panchang/constants';
import {
  FestivalTimelineItem,
  FestivalTimelineFilterOptions,
  FestivalTimelineResponse,
  FestivalCategory,
} from './types';
import {
  FESTIVAL_METADATA_MAP,
  RITU_DATA,
  MONTH_NAMES_MAP,
  DAY_OF_WEEK_MAP,
} from './metadata';

// In-memory LRU cache for yearly festival timelines
const festivalYearCache = new Map<string, FestivalTimelineItem[]>();
const MAX_CACHE_ENTRIES = 40;

function getCacheKey(year: number, location: GeoLocation): string {
  return `${year}_${location.latitude.toFixed(3)}_${location.longitude.toFixed(3)}_${location.timezone}`;
}

/**
 * High-performance computation of all festivals for a Gregorian calendar year (Jan 1 to Dec 31)
 */
function computeYearFestivals(year: number, location: GeoLocation): FestivalTimelineItem[] {
  const allItems: FestivalTimelineItem[] = [];
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;

  for (let d = 0; d < daysInYear; d++) {
    const dateObj = new Date(Date.UTC(year, 0, 1 + d, 12, 0, 0));
    const iso = dateObj.toISOString().slice(0, 10);
    const dayFestivals = calculateFestivals(iso, location);

    if (dayFestivals.length > 0) {
      const [y, m, dayNum] = iso.split('-').map(Number);
      const dayOfWeekNum = dateObj.getUTCDay();
      const dayInfo = DAY_OF_WEEK_MAP[dayOfWeekNum] || { english: 'Day', hindi: 'दिन' };

      const monthName = MONTH_NAMES_MAP[m - 1]?.monthName || 'Month';
      const formattedDate = `${dayInfo.english}, ${monthName} ${dayNum}, ${y}`;

      const jd = toJulianDay(dateObj);
      const masaInfo = getMasaAtJd(jd);
      const elongation = getElongation(jd);
      const tiIdx = Math.floor(elongation / 12);
      const isShukla = tiIdx < 15;
      const paksha = isShukla ? 'Shukla' : 'Krishna';
      const tithiIdx15 = tiIdx % 15;

      const baseMasaName = LUNAR_MONTHS[masaInfo.amantaIndex] || 'Chaitra';
      const masaName = masaInfo.isAdhika ? `Adhika ${baseMasaName}` : baseMasaName;
      const masaNameDevanagari = masaInfo.isAdhika
        ? `अधिक ${LUNAR_MONTHS_DEVANAGARI[masaInfo.amantaIndex] || 'चैत्र'}`
        : LUNAR_MONTHS_DEVANAGARI[masaInfo.amantaIndex] || 'चैत्र';

      const tithiName =
        tiIdx === 14 ? 'Purnima' : tiIdx === 29 ? 'Amavasya' : TITHI_NAMES[tithiIdx15] || 'Pratipada';
      const tithiNameDevanagari =
        tiIdx === 14
          ? 'पूर्णिमा'
          : tiIdx === 29
          ? 'अमावस्या'
          : TITHI_DEVANAGARI[tithiIdx15] || 'प्रतिपदा';

      const ritu = RITU_DATA[masaInfo.amantaIndex] || {
        name: 'Vasanta (Spring)',
        nameDevanagari: 'वसन्त ऋतु',
      };

      for (let idx = 0; idx < dayFestivals.length; idx++) {
        const f = dayFestivals[idx];
        const meta = FESTIVAL_METADATA_MAP[f.name];
        const isEkadashi = f.name.toLowerCase().includes('ekadashi');
        const category: FestivalTimelineItem['category'] = isEkadashi
          ? 'Vrat'
          : (f.category as FestivalTimelineItem['category']);

        const slug = `${f.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}-${iso}`;

        allItems.push({
          id: slug || `fest-${iso}-${idx}`,
          name: f.name,
          nameDevanagari: meta?.nameDevanagari || f.nameDevanagari || f.name,
          category,
          isMajor: f.isMajor,
          date: iso,
          formattedDate,
          dayOfWeek: dayInfo.english,
          dayOfWeekDevanagari: dayInfo.hindi,
          daysRemaining: 0,
          timeStatus: 'upcoming',
          masaName,
          masaNameDevanagari,
          paksha,
          tithiName,
          tithiNameDevanagari,
          ritu: ritu.name,
          rituDevanagari: ritu.nameDevanagari,
          deity: meta?.deity,
          pujaMuhurta: meta?.pujaMuhurta || 'Auspicious Muhurta across day',
          significance:
            meta?.significance ||
            f.description ||
            `Auspicious observance during sacred ${masaName} masa in Sanatan Dharma.`,
          rituals: meta?.rituals || [
            'Morning prayer, bath, and temple worship.',
            'Fasting and sacred mantra recitation per tradition.',
            'Charity and food offerings to the needy.',
          ],
          panchangUrl: `/panchang?date=${iso}`,
        });
      }
    }
  }

  // Manage cache capacity
  if (festivalYearCache.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = festivalYearCache.keys().next().value;
    if (oldestKey) festivalYearCache.delete(oldestKey);
  }
  festivalYearCache.set(getCacheKey(year, location), allItems);

  return allItems;
}

/**
 * Returns festival timeline response with search, category filtering, and month pagination
 */
export function getFestivalTimeline(
  options: FestivalTimelineFilterOptions,
  location: GeoLocation
): FestivalTimelineResponse {
  const { year, category = 'all', month, searchQuery, anchorDate } = options;

  const cacheKey = getCacheKey(year, location);
  let baseItems = festivalYearCache.get(cacheKey);

  if (!baseItems) {
    baseItems = computeYearFestivals(year, location);
  }

  // Determine today or anchor date for daysRemaining calculation
  const anchorIso = anchorDate || new Date().toISOString().slice(0, 10);
  const [aY, aM, aD] = anchorIso.split('-').map(Number);
  const anchorMidnightMs = Date.UTC(aY, aM - 1, aD, 0, 0, 0);

  // Update daysRemaining and timeStatus for each item
  const enrichedItems = baseItems.map((item) => {
    const [iY, iM, iD] = item.date.split('-').map(Number);
    const itemMidnightMs = Date.UTC(iY, iM - 1, iD, 0, 0, 0);
    const diffDays = Math.round((itemMidnightMs - anchorMidnightMs) / 86400000);

    let timeStatus: FestivalTimelineItem['timeStatus'] = 'upcoming';
    if (diffDays < 0) timeStatus = 'past';
    else if (diffDays === 0) timeStatus = 'today';

    return {
      ...item,
      daysRemaining: diffDays,
      timeStatus,
    };
  });

  // Calculate dynamic category counts across the full year
  const categoriesList: {
    id: FestivalCategory;
    label: string;
    labelDevanagari: string;
    count: number;
  }[] = [
    { id: 'all', label: 'All Celebrations', labelDevanagari: 'सभी पर्व', count: enrichedItems.length },
    {
      id: 'major',
      label: 'Major Festivals',
      labelDevanagari: 'प्रमुख त्योहार',
      count: enrichedItems.filter((i) => i.isMajor).length,
    },
    {
      id: 'vrat',
      label: 'Vrats & Fasts',
      labelDevanagari: 'व्रत एवं उपवास',
      count: enrichedItems.filter((i) => i.category === 'Vrat').length,
    },
    {
      id: 'ekadashi',
      label: 'Ekadashi',
      labelDevanagari: 'एकादशी व्रत',
      count: enrichedItems.filter((i) => i.name.toLowerCase().includes('ekadashi')).length,
    },
    {
      id: 'jayanti',
      label: 'Jayanti & Avatara',
      labelDevanagari: 'जयंती पर्व',
      count: enrichedItems.filter((i) => i.category === 'Jayanti').length,
    },
    {
      id: 'sankranti',
      label: 'Sankranti Transits',
      labelDevanagari: 'संक्रांति',
      count: enrichedItems.filter((i) => i.category === 'Sankranti').length,
    },
  ];

  // Calculate monthly counts
  const monthsList = MONTH_NAMES_MAP.map((m) => {
    const count = enrichedItems.filter((i) => {
      const monthNum = parseInt(i.date.slice(5, 7), 10);
      return monthNum === m.monthNumber;
    }).length;
    return {
      monthNumber: m.monthNumber,
      monthName: m.monthName,
      monthNameHindi: m.monthNameHindi,
      count,
    };
  });

  // Filter based on requested parameters
  let filtered = enrichedItems;

  if (category && category !== 'all') {
    if (category === 'major') {
      filtered = filtered.filter((i) => i.isMajor);
    } else if (category === 'ekadashi') {
      filtered = filtered.filter((i) => i.name.toLowerCase().includes('ekadashi'));
    } else {
      const targetCat =
        category === 'vrat'
          ? 'Vrat'
          : category === 'jayanti'
          ? 'Jayanti'
          : category === 'sankranti'
          ? 'Sankranti'
          : category === 'festival'
          ? 'Festival'
          : null;
      if (targetCat) {
        filtered = filtered.filter((i) => i.category === targetCat);
      }
    }
  }

  if (month && month >= 1 && month <= 12) {
    filtered = filtered.filter((i) => parseInt(i.date.slice(5, 7), 10) === month);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.nameDevanagari.toLowerCase().includes(q) ||
        i.masaName.toLowerCase().includes(q) ||
        i.masaNameDevanagari.toLowerCase().includes(q) ||
        (i.deity && i.deity.toLowerCase().includes(q)) ||
        i.significance.toLowerCase().includes(q)
    );
  }

  // Find the next upcoming festival
  const upcomingCandidates = enrichedItems.filter((i) => i.daysRemaining >= 0 && i.isMajor);
  const nextUpcoming = upcomingCandidates.length > 0 ? upcomingCandidates[0] : null;

  return {
    year,
    totalCount: filtered.length,
    location,
    categories: categoriesList,
    months: monthsList,
    festivals: filtered,
    nextUpcoming,
  };
}
