import {
  calculateSunTimes,
  toJulianDay,
} from './astronomy';
import {
  getElongation,
  getSunSiderealLongitude,
  findNewMoon,
} from './panchang-calc';
import {
  EKADASHI_NAMES_SHUKLA,
  EKADASHI_NAMES_KRISHNA,
  RASHI_NAMES,
} from './constants';
import { FestivalEvent, UpcomingFestival, GeoLocation } from './types';

export interface RawFestivalRule {
  monthIdx: number | null; // Amanta month: 0=Chaitra, 1=Vaishakha, ..., 11=Phalguna, null = every month
  paksha: 'S' | 'K';
  tithi: number; // 1 to 15
  timeOfDay: 's' | 'm' | 'a' | 'p' | 'r' | 'n'; // s=sunrise, m=noon, a=afternoon, p=evening/pradosha, r=moonrise, n=midnight
  name: string | ((monthIdx: number, isAdhika: boolean) => string);
  category: 'Festival' | 'Vrat' | 'Jayanti' | 'Sankranti' | 'Parva';
  isMajor: boolean;
  isAfternoonPriority?: boolean;
}

export const FESTIVAL_RULES: RawFestivalRule[] = [
  // Chaitra (Month 0)
  { monthIdx: 0, paksha: 'S', tithi: 1, timeOfDay: 's', name: 'Gudi Padwa / Ugadi / Chaitra Navratri begins', category: 'Festival', isMajor: true },
  { monthIdx: 0, paksha: 'S', tithi: 9, timeOfDay: 'm', name: 'Rama Navami', category: 'Festival', isMajor: true },
  { monthIdx: 0, paksha: 'S', tithi: 13, timeOfDay: 's', name: 'Mahavir Jayanti', category: 'Jayanti', isMajor: true },
  { monthIdx: 0, paksha: 'S', tithi: 15, timeOfDay: 's', name: 'Hanuman Jayanti', category: 'Festival', isMajor: true },

  // Vaishakha (Month 1)
  { monthIdx: 1, paksha: 'S', tithi: 3, timeOfDay: 's', name: 'Akshaya Tritiya', category: 'Festival', isMajor: true },
  { monthIdx: 1, paksha: 'S', tithi: 15, timeOfDay: 'm', name: 'Buddha Purnima', category: 'Jayanti', isMajor: true },

  // Jyeshtha (Month 2)
  { monthIdx: 2, paksha: 'S', tithi: 10, timeOfDay: 'm', name: 'Ganga Dussehra', category: 'Festival', isMajor: true },
  { monthIdx: 2, paksha: 'S', tithi: 15, timeOfDay: 'm', name: 'Vat Purnima', category: 'Vrat', isMajor: true },

  // Ashadha (Month 3)
  { monthIdx: 3, paksha: 'S', tithi: 2, timeOfDay: 's', name: 'Jagannath Rath Yatra', category: 'Festival', isMajor: true },
  { monthIdx: 3, paksha: 'S', tithi: 11, timeOfDay: 's', name: 'Devshayani Ekadashi (Ashadhi Ekadashi)', category: 'Vrat', isMajor: true },
  { monthIdx: 3, paksha: 'S', tithi: 15, timeOfDay: 'm', name: 'Guru Purnima', category: 'Festival', isMajor: true },

  // Shravana (Month 4)
  { monthIdx: 4, paksha: 'S', tithi: 5, timeOfDay: 's', name: 'Nag Panchami', category: 'Festival', isMajor: true },
  { monthIdx: 4, paksha: 'S', tithi: 15, timeOfDay: 'a', name: 'Raksha Bandhan', category: 'Festival', isMajor: true },
  { monthIdx: 4, paksha: 'K', tithi: 8, timeOfDay: 'n', name: 'Krishna Janmashtami', category: 'Festival', isMajor: true },

  // Bhadrapada (Month 5)
  { monthIdx: 5, paksha: 'S', tithi: 3, timeOfDay: 's', name: 'Hartalika Teej', category: 'Festival', isMajor: true },
  { monthIdx: 5, paksha: 'S', tithi: 4, timeOfDay: 'm', name: 'Ganesh Chaturthi', category: 'Festival', isMajor: true },
  { monthIdx: 5, paksha: 'S', tithi: 14, timeOfDay: 's', name: 'Anant Chaturdashi', category: 'Festival', isMajor: true },
  { monthIdx: 5, paksha: 'K', tithi: 15, timeOfDay: 'a', name: 'Sarvapitri Amavasya (Mahalaya)', category: 'Parva', isMajor: true },

  // Ashwin (Month 6)
  { monthIdx: 6, paksha: 'S', tithi: 1, timeOfDay: 's', name: 'Sharad Navratri begins (Ghatasthapana)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'S', tithi: 8, timeOfDay: 's', name: 'Durga Ashtami (Maha Ashtami)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'S', tithi: 9, timeOfDay: 'm', name: 'Maha Navami', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'S', tithi: 10, timeOfDay: 'a', name: 'Dussehra (Vijayadashami)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'S', tithi: 15, timeOfDay: 'p', name: 'Sharad Purnima (Kojagari)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'K', tithi: 4, timeOfDay: 'r', name: 'Karwa Chauth', category: 'Vrat', isMajor: true },
  { monthIdx: 6, paksha: 'K', tithi: 8, timeOfDay: 'p', name: 'Ahoi Ashtami', category: 'Vrat', isMajor: true },
  { monthIdx: 6, paksha: 'K', tithi: 13, timeOfDay: 'p', name: 'Dhanteras (Dhanatrayodashi)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'K', tithi: 14, timeOfDay: 's', name: 'Naraka Chaturdashi (Chhoti Diwali)', category: 'Festival', isMajor: true },
  { monthIdx: 6, paksha: 'K', tithi: 15, timeOfDay: 'p', name: 'Diwali (Lakshmi Puja)', category: 'Festival', isMajor: true },

  // Kartik (Month 7)
  { monthIdx: 7, paksha: 'S', tithi: 1, timeOfDay: 's', name: 'Govardhan Puja / Annakut', category: 'Festival', isMajor: true },
  { monthIdx: 7, paksha: 'S', tithi: 2, timeOfDay: 'a', name: 'Bhai Dooj (Yama Dwitiya)', category: 'Festival', isMajor: true, isAfternoonPriority: true },
  { monthIdx: 7, paksha: 'S', tithi: 6, timeOfDay: 'p', name: 'Chhath Puja (Surya Shashthi)', category: 'Festival', isMajor: true },
  { monthIdx: 7, paksha: 'S', tithi: 11, timeOfDay: 's', name: 'Prabodhini Ekadashi (Devutthana)', category: 'Vrat', isMajor: true },
  { monthIdx: 7, paksha: 'S', tithi: 12, timeOfDay: 'p', name: 'Tulsi Vivah', category: 'Festival', isMajor: true },
  { monthIdx: 7, paksha: 'S', tithi: 15, timeOfDay: 'p', name: 'Kartik Purnima / Dev Diwali', category: 'Festival', isMajor: true },
  { monthIdx: 7, paksha: 'K', tithi: 8, timeOfDay: 'n', name: 'Kalabhairav Jayanti', category: 'Jayanti', isMajor: true },

  // Margashirsha (Month 8)
  { monthIdx: 8, paksha: 'S', tithi: 11, timeOfDay: 's', name: 'Mokshada Ekadashi / Gita Jayanti', category: 'Festival', isMajor: true },
  { monthIdx: 8, paksha: 'S', tithi: 15, timeOfDay: 'm', name: 'Dattatreya Jayanti', category: 'Jayanti', isMajor: true },

  // Magha (Month 10)
  { monthIdx: 10, paksha: 'S', tithi: 5, timeOfDay: 's', name: 'Vasant Panchami (Saraswati Puja)', category: 'Festival', isMajor: true },
  { monthIdx: 10, paksha: 'S', tithi: 7, timeOfDay: 's', name: 'Ratha Saptami', category: 'Festival', isMajor: true },
  { monthIdx: 10, paksha: 'K', tithi: 14, timeOfDay: 'n', name: 'Maha Shivaratri', category: 'Festival', isMajor: true },

  // Phalguna (Month 11)
  { monthIdx: 11, paksha: 'S', tithi: 15, timeOfDay: 'p', name: 'Holika Dahan', category: 'Festival', isMajor: true },
  { monthIdx: 11, paksha: 'K', tithi: 1, timeOfDay: 's', name: 'Holi / Dhulivandan (Rangwali Holi)', category: 'Festival', isMajor: true },

  // Monthly Recurring Vrats:
  // Ekadashi Vrats
  {
    monthIdx: null,
    paksha: 'S',
    tithi: 11,
    timeOfDay: 's',
    name: (m, isAdhika) => (isAdhika ? 'Padmini Ekadashi' : `${EKADASHI_NAMES_SHUKLA[m % 12]} Ekadashi`),
    category: 'Vrat',
    isMajor: false,
  },
  {
    monthIdx: null,
    paksha: 'K',
    tithi: 11,
    timeOfDay: 's',
    name: (m, isAdhika) => (isAdhika ? 'Parama Ekadashi' : `${EKADASHI_NAMES_KRISHNA[(m + 1) % 12]} Ekadashi`),
    category: 'Vrat',
    isMajor: false,
  },
  // Pradosh Vrat
  { monthIdx: null, paksha: 'S', tithi: 13, timeOfDay: 'p', name: 'Shukla Pradosh Vrat', category: 'Vrat', isMajor: false },
  { monthIdx: null, paksha: 'K', tithi: 13, timeOfDay: 'p', name: 'Krishna Pradosh Vrat', category: 'Vrat', isMajor: false },
  // Chaturthi Vrats
  { monthIdx: null, paksha: 'S', tithi: 4, timeOfDay: 'm', name: 'Vinayaka Chaturthi', category: 'Vrat', isMajor: false },
  { monthIdx: null, paksha: 'K', tithi: 4, timeOfDay: 'r', name: 'Sankashti Chaturthi', category: 'Vrat', isMajor: false },
  // Masik Shivaratri
  { monthIdx: null, paksha: 'K', tithi: 14, timeOfDay: 'n', name: 'Masik Shivaratri', category: 'Vrat', isMajor: false },
  // Purnima & Amavasya
  { monthIdx: null, paksha: 'S', tithi: 15, timeOfDay: 'p', name: 'Purnima Vrat', category: 'Parva', isMajor: false },
  { monthIdx: null, paksha: 'K', tithi: 15, timeOfDay: 's', name: 'Amavasya', category: 'Parva', isMajor: false },
];

/**
 * Returns lunar month index and adhika flag for a given JD timestamp
 */
function getMasaAtJd(jd: number): { amantaIndex: number; isAdhika: boolean } {
  const nm1 = findNewMoon(jd, 'prev');
  const nm2 = findNewMoon(nm1 + 5, 'next');
  const sunRashi1 = Math.floor(getSunSiderealLongitude(nm1 + 0.01) / 30);
  const sunRashi2 = Math.floor(getSunSiderealLongitude(nm2 - 0.01) / 30);
  const isAdhika = sunRashi1 === sunRashi2;
  const amantaIndex = (sunRashi1 + 1) % 12;
  return { amantaIndex, isAdhika };
}

/**
 * Calculate raw festivals occurring on a specific Gregorian date
 */
function getRawFestivals(
  year: number,
  month: number,
  day: number,
  location: GeoLocation
): Array<{ event: FestivalEvent; rule: RawFestivalRule }> {
  const sunTimes = calculateSunTimes(year, month, day, location.latitude, location.longitude, location.altitude);
  const sr = sunTimes.sunrise.getTime();
  const ss = sunTimes.sunset.getTime();

  // Key prayer & muhurta checkpoints of the day
  const checkpoints: Record<'s' | 'm' | 'a' | 'p' | 'r' | 'n', number> = {
    s: sr,
    m: (sr + ss) / 2, // Madhyahna (Solar Noon)
    a: sr + 0.7 * (ss - sr), // Aparahna (Afternoon)
    p: ss + 45 * 60000, // Pradosha (Evening twilight ~45 min after sunset)
    r: ss + 150 * 60000, // Approximate Moonrise checkpoint
    n: (ss + sr + 86400000) / 2, // Nishita (Midnight)
  };

  // Determine Prevailing Tithi at each checkpoint
  const tithiAtCheckpoints: Record<string, { paksha: 'S' | 'K'; tithi: number; jd: number }> = {};
  for (const k of ['s', 'm', 'a', 'p', 'r', 'n'] as const) {
    const cpJd = toJulianDay(new Date(checkpoints[k]));
    const el = getElongation(cpJd);
    const tiIdx = Math.floor(el / 12);
    tithiAtCheckpoints[k] = {
      paksha: tiIdx < 15 ? 'S' : 'K',
      tithi: (tiIdx % 15) + 1,
      jd: cpJd,
    };
  }

  const results: Array<{ event: FestivalEvent; rule: RawFestivalRule }> = [];
  const hitKeys = new Set<string>();

  for (const rule of FESTIVAL_RULES) {
    const cp = tithiAtCheckpoints[rule.timeOfDay];
    let isMatch = cp.paksha === rule.paksha && cp.tithi === rule.tithi;

    // Secondary vyapti rule: if festival is sunrise-based, but tithi begins slightly after sunrise and covers midday
    if (!isMatch && rule.timeOfDay === 's') {
      const middayCp = tithiAtCheckpoints.m;
      if (middayCp.paksha === rule.paksha && middayCp.tithi === rule.tithi) {
        // Tithi covers midday
        isMatch = true;
      }
    }

    if (!isMatch) continue;

    // Monthly deduplication key for recurring vrats
    const dedupKey = `${rule.paksha}_${rule.tithi}_${rule.category}`;
    if (rule.monthIdx === null && hitKeys.has(dedupKey)) continue;

    const masaInfo = getMasaAtJd(cp.jd);

    // Verify month match for annual festivals
    if (rule.monthIdx !== null) {
      if (rule.monthIdx !== masaInfo.amantaIndex || masaInfo.isAdhika) {
        continue;
      }
    }

    hitKeys.add(dedupKey);

    const festivalName =
      typeof rule.name === 'function'
        ? rule.name(masaInfo.amantaIndex, masaInfo.isAdhika)
        : rule.name;

    results.push({
      event: {
        name: festivalName,
        nameDevanagari: festivalName, // Could be enhanced with Devanagari lookup
        isMajor: rule.isMajor,
        category: rule.category,
      },
      rule,
    });
  }

  // Check Solar Sankranti on this day (Sun entering a new sidereal sign between previous sunset and current sunset)
  const prevSunsetJd = toJulianDay(new Date(ss - 86400000));
  const currSunsetJd = toJulianDay(new Date(ss));
  const rashiPrev = Math.floor(getSunSiderealLongitude(prevSunsetJd) / 30);
  const rashiCurr = Math.floor(getSunSiderealLongitude(currSunsetJd) / 30);

  if (rashiPrev !== rashiCurr) {
    const isMakar = rashiCurr === 9; // Makara (Capricorn)
    const name = isMakar ? 'Makar Sankranti / Pongal / Uttarayana' : `${RASHI_NAMES[rashiCurr]} Sankranti`;
    results.push({
      event: {
        name,
        nameDevanagari: name,
        isMajor: true,
        category: 'Sankranti',
        description: `Sun transit into sidereal ${RASHI_NAMES[rashiCurr]}.`,
      },
      rule: {
        monthIdx: null,
        paksha: 'S',
        tithi: 1,
        timeOfDay: 's',
        name,
        category: 'Sankranti',
        isMajor: true,
      },
    });
  }

  return results;
}

/**
 * Filter multi-day overlaps (picks the optimal day for a festival)
 */
export function calculateFestivals(
  date: Date,
  location: GeoLocation
): FestivalEvent[] {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();

  const currentDay = getRawFestivals(y, m, d, location);

  // Check previous and next day to resolve 2-day spans
  const prevDate = new Date(Date.UTC(y, m - 1, d - 1));
  const nextDate = new Date(Date.UTC(y, m - 1, d + 1));

  const prevNames = new Set(
    getRawFestivals(prevDate.getUTCFullYear(), prevDate.getUTCMonth() + 1, prevDate.getUTCDate(), location).map(
      (x) => x.event.name
    )
  );
  const nextNames = new Set(
    getRawFestivals(nextDate.getUTCFullYear(), nextDate.getUTCMonth() + 1, nextDate.getUTCDate(), location).map(
      (x) => x.event.name
    )
  );

  return currentDay
    .filter(({ event, rule }) => {
      // If priority is afternoon/evening and both today and tomorrow trigger, pick today or tomorrow appropriately
      if (rule.isAfternoonPriority) {
        return !nextNames.has(event.name);
      }
      return !prevNames.has(event.name);
    })
    .map((x) => x.event);
}

/**
 * Find upcoming major festivals up to 180 days ahead
 */
export function calculateUpcomingFestivals(
  startDate: Date,
  location: GeoLocation,
  maxResults: number = 6
): UpcomingFestival[] {
  const results: UpcomingFestival[] = [];
  const startMs = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());

  for (let dayOffset = 1; dayOffset <= 200 && results.length < maxResults; dayOffset++) {
    const curDate = new Date(startMs + dayOffset * 86400000);
    const dayFestivals = calculateFestivals(curDate, location).filter((f) => f.isMajor);

    if (dayFestivals.length > 0) {
      results.push({
        date: curDate,
        daysRemaining: dayOffset,
        festivals: dayFestivals,
      });
    }
  }

  return results;
}
