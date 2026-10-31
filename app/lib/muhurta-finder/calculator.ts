import { GeoLocation, PanchangData } from '../panchang/types';
import { AyanamsaSystem } from '../panchang/ayanamsa';
import { calculatePanchang } from '../panchang/index';
import { parseCivilDate } from '../panchang/festivals';
import {
  MuhurtaDayEvaluation,
  MuhurtaFilterOptions,
  RecommendedTimeWindow,
} from './types';
import { detectSpecialYogas, getPanchakaType } from './yogas';
import { evaluateCategoryRules } from './rules';
import { MUHURTA_CATEGORY_MAP } from './categories';

interface CachedDayPanchang {
  date: Date;
  isoDate: string;
  panchang: PanchangData;
  dayOfWeek: number;
  nakshatraIdx0: number;
  tithiIdx1: number;
  pakshaTithi: number;
  specialYogas: string[];
  panchaka: 'Rog' | 'Agni' | 'Raj' | 'Chora' | 'Mrityu' | 'None';
  windows: RecommendedTimeWindow[];
  avoidWindows: { label: string; startTime: Date; endTime: Date }[];
}

// In-memory cache for astronomical Panchang evaluations
const panchangDayCache = new Map<string, CachedDayPanchang>();

function getDayCacheKey(isoDate: string, location: GeoLocation, ayanamsa: AyanamsaSystem): string {
  return `${isoDate}_${location.latitude.toFixed(4)}_${location.longitude.toFixed(4)}_${ayanamsa}`;
}

/**
 * Returns cached or newly computed base astronomical data for a day.
 */
export function getCachedDayPanchang(
  curDate: Date,
  curIso: string,
  location: GeoLocation,
  ayanamsa: AyanamsaSystem
): CachedDayPanchang {
  const key = getDayCacheKey(curIso, location, ayanamsa);
  const cached = panchangDayCache.get(key);
  if (cached) return cached;

  const panchang = calculatePanchang(curIso, location, ayanamsa);
  const dayOfWeek = panchang.vara.dayOfWeek;
  const nakshatraIdx0 = panchang.nakshatra.current.index - 1;
  const tithiIdx1 = panchang.tithi.current.index;
  const pakshaTithi = ((tithiIdx1 - 1) % 15) + 1;
  const specialYogas = detectSpecialYogas(dayOfWeek, nakshatraIdx0, tithiIdx1);
  const panchaka = getPanchakaType(tithiIdx1, dayOfWeek, nakshatraIdx0);

  const windows: RecommendedTimeWindow[] = [];
  if (panchang.muhurtas.abhijitMuhurta) {
    windows.push({
      label: 'Abhijit Muhurta (अभिजित मुहूर्त)',
      startTime: panchang.muhurtas.abhijitMuhurta.startTime,
      endTime: panchang.muhurtas.abhijitMuhurta.endTime,
      quality: 'Abhijit',
      description: 'Midday auspicious window blessed by Lord Vishnu.',
    });
  }

  panchang.choghadiya.day.forEach((ch) => {
    if (ch.quality === 'Amrit' || ch.quality === 'Shubh' || ch.quality === 'Labh') {
      windows.push({
        label: `${ch.name} Choghadiya (${ch.nameDevanagari})`,
        startTime: ch.startTime,
        endTime: ch.endTime,
        quality: ch.quality as 'Shubh' | 'Amrit' | 'Labh',
        description: `Ruled by ${ch.ruler} — ${ch.nature.toLowerCase()} timing for activities.`,
      });
    }
  });

  windows.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const avoidWindows: { label: string; startTime: Date; endTime: Date }[] = [
    {
      label: 'Rahu Kaal (राहु काल)',
      startTime: panchang.muhurtas.rahuKaal.startTime,
      endTime: panchang.muhurtas.rahuKaal.endTime,
    },
  ];

  if (panchang.muhurtas.yamaganda) {
    avoidWindows.push({
      label: 'Yamaganda (यमगण्ड)',
      startTime: panchang.muhurtas.yamaganda.startTime,
      endTime: panchang.muhurtas.yamaganda.endTime,
    });
  }

  const result: CachedDayPanchang = {
    date: curDate,
    isoDate: curIso,
    panchang,
    dayOfWeek,
    nakshatraIdx0,
    tithiIdx1,
    pakshaTithi,
    specialYogas,
    panchaka,
    windows,
    avoidWindows,
  };

  panchangDayCache.set(key, result);
  return result;
}

/**
 * Searches and evaluates auspicious Muhurtas across a date range
 * for a specific category and geographical location.
 */
export function findMuhurtas(
  options: MuhurtaFilterOptions,
  location: GeoLocation,
  startDateInput: Date | string = new Date(),
  ayanamsa: AyanamsaSystem = 'Lahiri'
): MuhurtaDayEvaluation[] {
  const { category, daysCount, minimumSuitability = 'All' } = options;
  const { year, month, day } = parseCivilDate(startDateInput, location.timezone);
  const startMs = Date.UTC(year, month - 1, day, 12, 0, 0);

  const results: MuhurtaDayEvaluation[] = [];

  for (let offset = 0; offset < daysCount; offset++) {
    const curDate = new Date(startMs + offset * 86400000);
    const curIso = curDate.toISOString().slice(0, 10);

    // 1. Get cached base astronomical data for this day
    const dayData = getCachedDayPanchang(curDate, curIso, location, ayanamsa);
    const { panchang, specialYogas, panchaka, windows, avoidWindows, pakshaTithi } = dayData;

    // 2. Evaluate classical category rules (instant 0.01ms)
    const evalResult = evaluateCategoryRules(category, panchang, specialYogas, panchaka);

    const categoryMeta = MUHURTA_CATEGORY_MAP[category];
    const title = `${categoryMeta.title} (${categoryMeta.titleDevanagari})`;

    const evaluation: MuhurtaDayEvaluation = {
      date: curDate,
      isoDate: curIso,
      suitability: evalResult.suitability,
      score: evalResult.score,
      title,
      reasons: evalResult.reasons,
      precautions: evalResult.precautions,
      specialYogas,
      panchakaType: panchaka,
      hasVishtiBhadra: panchang.karana.current.name === 'Vishti',
      hasRiktaTithi: pakshaTithi === 4 || pakshaTithi === 9 || pakshaTithi === 14,
      windows,
      avoidWindows,
      panchangSummary: {
        tithiName: `${panchang.tithi.current.name} (${panchang.tithi.current.paksha})`,
        tithiPaksha: panchang.tithi.current.paksha,
        nakshatraName: panchang.nakshatra.current.name,
        yogaName: panchang.yoga.current.name,
        karanaName: panchang.karana.current.name,
        varaName: `${panchang.vara.name} (${panchang.vara.englishName})`,
        sunrise: panchang.sunTimes.sunrise,
        sunset: panchang.sunTimes.sunset,
      },
    };

    // Filter based on minimum suitability
    if (minimumSuitability === 'Optimal' && evaluation.suitability !== 'Optimal') {
      continue;
    }
    if (
      minimumSuitability === 'Good' &&
      evaluation.suitability !== 'Optimal' &&
      evaluation.suitability !== 'Good'
    ) {
      continue;
    }

    results.push(evaluation);
  }

  return results;
}
