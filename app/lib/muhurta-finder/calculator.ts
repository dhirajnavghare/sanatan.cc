import { GeoLocation } from '../panchang/types';
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

    // 1. Calculate local astronomical Panchang for this exact day
    const panchang = calculatePanchang(curIso, location, ayanamsa);

    const dayOfWeek = panchang.vara.dayOfWeek;
    const nakshatraIdx0 = panchang.nakshatra.current.index - 1;
    const tithiIdx1 = panchang.tithi.current.index;
    const pakshaTithi = ((tithiIdx1 - 1) % 15) + 1;

    // 2. Detect special celestial yogas
    const specialYogas = detectSpecialYogas(dayOfWeek, nakshatraIdx0, tithiIdx1);

    // 3. Compute Panchaka Dosha
    const panchaka = getPanchakaType(tithiIdx1, dayOfWeek, nakshatraIdx0);

    // 4. Evaluate classical category rules
    const evalResult = evaluateCategoryRules(category, panchang, specialYogas, panchaka);

    // 5. Build recommended daytime windows
    const windows: RecommendedTimeWindow[] = [];

    // Abhijit Muhurta (Midday victory window, except Wednesday)
    if (panchang.muhurtas.abhijitMuhurta) {
      windows.push({
        label: 'Abhijit Muhurta (अभिजित मुहूर्त)',
        startTime: panchang.muhurtas.abhijitMuhurta.startTime,
        endTime: panchang.muhurtas.abhijitMuhurta.endTime,
        quality: 'Abhijit',
        description: 'Midday auspicious window blessed by Lord Vishnu.',
      });
    }

    // Auspicious Day Choghadiyas (Amrit, Shubh, Labh)
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

    // Sort windows chronologically
    windows.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    // Inauspicious windows to strictly avoid (Rahu Kaal & Yamaganda)
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
