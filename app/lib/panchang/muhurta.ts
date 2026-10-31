import {
  RAHU_KAAL_PARTS,
  YAMAGANDA_PARTS,
  GULIKA_PARTS,
  CHOGHADIYA_DAY_SEQUENCES,
  CHOGHADIYA_NIGHT_SEQUENCES,
  CHOGHADIYA_META,
} from './constants';
import { MuhurtaPeriod, ChoghadiyaPeriod } from './types';

// Varjyam start ghatis for each of the 27 Nakshatras (Ashwini = 0)
const VARJYAM_START_GHATIS = [
  50, 24, 30, 40, 14, 11, 30, 20, 32, 30,
  20, 18, 21, 20, 14, 14, 10, 14, 56, 24,
  20, 10, 10, 18, 16, 24, 30
];

export function calculateMuhurtas(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  dayOfWeek: number, // 0 = Sunday
  nakshatraIndex0?: number,
  nakshatraStart?: Date,
  nakshatraEnd?: Date
): {
  brahmaMuhurta: MuhurtaPeriod;
  pratahSandhya: MuhurtaPeriod;
  abhijitMuhurta: MuhurtaPeriod | null;
  vijayaMuhurta: MuhurtaPeriod;
  godhuliMuhurta: MuhurtaPeriod;
  sayahnaSandhya: MuhurtaPeriod;
  amritKaal: MuhurtaPeriod | null;
  nishitaMuhurta: MuhurtaPeriod;
  rahuKaal: MuhurtaPeriod;
  yamaganda: MuhurtaPeriod;
  gulikaKaal: MuhurtaPeriod;
  durMuhurtas: MuhurtaPeriod[];
  varjyam: MuhurtaPeriod | null;
} {
  const sunriseMs = sunrise.getTime();
  const sunsetMs = sunset.getTime();
  const nextSunriseMs = nextSunrise.getTime();

  const dayLengthMs = sunsetMs - sunriseMs;
  const nightLengthMs = nextSunriseMs - sunsetMs;

  const dayMuhurtaMs = dayLengthMs / 15;
  const nightMuhurtaMs = nightLengthMs / 15;
  const dayAshtamshaMs = dayLengthMs / 8;

  // 1. Brahma Muhurta: 2 muhurtas before sunrise (approx 96 min to 48 min before sunrise, scaled to night length)
  const brahmaMuhurta: MuhurtaPeriod = {
    name: 'Brahma Muhurta',
    nameDevanagari: 'ब्रह्म मुहूर्त',
    startTime: new Date(sunriseMs - 2 * nightMuhurtaMs),
    endTime: new Date(sunriseMs - nightMuhurtaMs),
    isAuspicious: true,
    quality: 'Shubh',
    description: 'Supreme auspicious time for meditation, prayer, spiritual study, and yoga.',
  };

  // 2. Pratah Sandhya: 1 muhurta before sunrise to sunrise
  const pratahSandhya: MuhurtaPeriod = {
    name: 'Pratah Sandhya',
    nameDevanagari: 'प्रातः सन्ध्या',
    startTime: new Date(sunriseMs - nightMuhurtaMs),
    endTime: new Date(sunriseMs),
    isAuspicious: true,
    quality: 'Shubh',
    description: 'Dawn twilight prayer and Gayatri Japa period.',
  };

  // 3. Abhijit Muhurta: 8th day muhurta (centered around solar noon).
  // In traditional astrology, Abhijit is deemed ineffective / avoided on Wednesdays (Budhavara).
  let abhijitMuhurta: MuhurtaPeriod | null = null;
  if (dayOfWeek !== 3) { // Skip Wednesday
    abhijitMuhurta = {
      name: 'Abhijit Muhurta',
      nameDevanagari: 'अभिजित मुहूर्त',
      startTime: new Date(sunriseMs + 7 * dayMuhurtaMs),
      endTime: new Date(sunriseMs + 8 * dayMuhurtaMs),
      isAuspicious: true,
      quality: 'Shubh',
      description: 'Midday victory muhurta blessed by Lord Vishnu; destroys negative doshas.',
    };
  }

  // 4. Vijaya Muhurta: 11th daytime muhurta
  const vijayaMuhurta: MuhurtaPeriod = {
    name: 'Vijaya Muhurta',
    nameDevanagari: 'विजय मुहूर्त',
    startTime: new Date(sunriseMs + 10 * dayMuhurtaMs),
    endTime: new Date(sunriseMs + 11 * dayMuhurtaMs),
    isAuspicious: true,
    quality: 'Shubh',
    description: 'Auspicious afternoon muhurta for starting journeys, ventures, and overcoming obstacles.',
  };

  // 5. Godhuli Muhurta: 24 minutes before sunset to 24 minutes after sunset
  const godhuliMuhurta: MuhurtaPeriod = {
    name: 'Godhuli Muhurta',
    nameDevanagari: 'गोधूलि मुहूर्त',
    startTime: new Date(sunsetMs - 24 * 60000),
    endTime: new Date(sunsetMs + 24 * 60000),
    isAuspicious: true,
    quality: 'Shubh',
    description: 'Sacred dusk time when cows return; auspicious for peaceful ceremonies and prayer.',
  };

  // 6. Sayahna Sandhya: Sunset to 1 muhurta after sunset
  const sayahnaSandhya: MuhurtaPeriod = {
    name: 'Sayahna Sandhya',
    nameDevanagari: 'सायं सन्ध्या',
    startTime: new Date(sunsetMs),
    endTime: new Date(sunsetMs + nightMuhurtaMs),
    isAuspicious: true,
    quality: 'Shubh',
    description: 'Evening twilight prayer and lamp lighting time.',
  };

  // 7. Nishita Kaal: 8th night muhurta (around local midnight)
  const nishitaMuhurta: MuhurtaPeriod = {
    name: 'Nishita Kaal',
    nameDevanagari: 'निशीथ काल',
    startTime: new Date(sunsetMs + 7 * nightMuhurtaMs),
    endTime: new Date(sunsetMs + 8 * nightMuhurtaMs),
    isAuspicious: true,
    quality: 'Neutral',
    description: 'Midnight hour dedicated to Shiva worship, Tantra, and Janmashtami puja.',
  };

  // 8. Rahu Kaal: 1/8th daytime division
  const rahuPart = RAHU_KAAL_PARTS[dayOfWeek];
  const rahuKaal: MuhurtaPeriod = {
    name: 'Rahu Kaal',
    nameDevanagari: 'राहु काल',
    startTime: new Date(sunriseMs + (rahuPart - 1) * dayAshtamshaMs),
    endTime: new Date(sunriseMs + rahuPart * dayAshtamshaMs),
    isAuspicious: false,
    quality: 'Ashubh',
    description: 'Inauspicious period ruled by Rahu; avoid commencing new tasks or travel.',
  };

  // 9. Yamaganda: 1/8th daytime division
  const yamaPart = YAMAGANDA_PARTS[dayOfWeek];
  const yamaganda: MuhurtaPeriod = {
    name: 'Yamaganda',
    nameDevanagari: 'यमगण्ड',
    startTime: new Date(sunriseMs + (yamaPart - 1) * dayAshtamshaMs),
    endTime: new Date(sunriseMs + yamaPart * dayAshtamshaMs),
    isAuspicious: false,
    quality: 'Ashubh',
    description: 'Inauspicious period ruled by Yama; avoid important beginnings.',
  };

  // 10. Gulika Kaal: 1/8th daytime division
  const guliPart = GULIKA_PARTS[dayOfWeek];
  const gulikaKaal: MuhurtaPeriod = {
    name: 'Gulika Kaal',
    nameDevanagari: 'गुलिक काल',
    startTime: new Date(sunriseMs + (guliPart - 1) * dayAshtamshaMs),
    endTime: new Date(sunriseMs + guliPart * dayAshtamshaMs),
    isAuspicious: false,
    quality: 'Ashubh',
    description: 'Inauspicious period ruled by Gulika (son of Saturn).',
  };

  // 11. Dur Muhurtas: specific malefic daytime muhurtas
  // 1-indexed daytime muhurta numbers for each day of week (0 = Sun)
  const durMuhurtaRules: Record<number, number[]> = {
    0: [14],
    1: [8, 12],
    2: [4, 11],
    3: [5],
    4: [6, 7],
    5: [4, 9],
    6: [2, 3],
  };

  const durMuhurtas: MuhurtaPeriod[] = (durMuhurtaRules[dayOfWeek] || []).map((mIdx, idx) => ({
    name: `Dur Muhurtam ${idx > 0 ? idx + 1 : ''}`.trim(),
    nameDevanagari: 'दुर्मुहूर्त',
    startTime: new Date(sunriseMs + (mIdx - 1) * dayMuhurtaMs),
    endTime: new Date(sunriseMs + mIdx * dayMuhurtaMs),
    isAuspicious: false,
    quality: 'Ashubh',
    description: 'Astrological inauspicious time slot of the day; avoid beginning auspicious works.',
  }));

  // 12. Varjyam & Amrit Kaal from Nakshatra
  let varjyam: MuhurtaPeriod | null = null;
  let amritKaal: MuhurtaPeriod | null = null;

  if (nakshatraIndex0 !== undefined && nakshatraStart && nakshatraEnd) {
    const totalNakDurationMs = nakshatraEnd.getTime() - nakshatraStart.getTime();
    if (totalNakDurationMs > 0) {
      const ghatiMs = totalNakDurationMs / 60; // 60 ghatis in a nakshatra
      const vStartGhati = VARJYAM_START_GHATIS[nakshatraIndex0 % 27] || 30;

      const vStartMs = nakshatraStart.getTime() + vStartGhati * ghatiMs;
      const vEndMs = vStartMs + 4 * ghatiMs; // Varjyam lasts 4 ghatis

      varjyam = {
        name: 'Varjyam (Tyajya)',
        nameDevanagari: 'वर्ज्यम्',
        startTime: new Date(vStartMs),
        endTime: new Date(vEndMs),
        isAuspicious: false,
        quality: 'Ashubh',
        description: 'Nakshatra Tyajya period; strictly avoided for auspicious ceremonies.',
      };

      // Amrit Kaal typically starts 14 ghatis after Varjyam begins and lasts 4 ghatis
      const aStartMs = vStartMs + 14 * ghatiMs;
      const aEndMs = aStartMs + 4 * ghatiMs;

      amritKaal = {
        name: 'Amrit Kaalam',
        nameDevanagari: 'अमृत काल',
        startTime: new Date(aStartMs),
        endTime: new Date(aEndMs),
        isAuspicious: true,
        quality: 'Shubh',
        description: 'Highly auspicious Nakshatra nectar time for beginning vital works.',
      };
    }
  }

  return {
    brahmaMuhurta,
    pratahSandhya,
    abhijitMuhurta,
    vijayaMuhurta,
    godhuliMuhurta,
    sayahnaSandhya,
    amritKaal,
    nishitaMuhurta,
    rahuKaal,
    yamaganda,
    gulikaKaal,
    durMuhurtas,
    varjyam,
  };
}

/**
 * Calculates the Day and Night Choghadiya for the given sunrise, sunset, and weekday.
 */
export function calculateChoghadiya(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  dayOfWeek: number,
  nowTime?: Date
): { day: ChoghadiyaPeriod[]; night: ChoghadiyaPeriod[] } {
  const sunriseMs = sunrise.getTime();
  const sunsetMs = sunset.getTime();
  const nextSunriseMs = nextSunrise.getTime();

  const dayPartMs = (sunsetMs - sunriseMs) / 8;
  const nightPartMs = (nextSunriseMs - sunsetMs) / 8;

  const nowMs = nowTime ? nowTime.getTime() : -1;

  const daySeq = CHOGHADIYA_DAY_SEQUENCES[dayOfWeek] || CHOGHADIYA_DAY_SEQUENCES[0];
  const nightSeq = CHOGHADIYA_NIGHT_SEQUENCES[dayOfWeek] || CHOGHADIYA_NIGHT_SEQUENCES[0];

  const day: ChoghadiyaPeriod[] = daySeq.map((name, i) => {
    const s = sunriseMs + i * dayPartMs;
    const e = sunriseMs + (i + 1) * dayPartMs;
    const meta = CHOGHADIYA_META[name];
    return {
      name,
      nameDevanagari: meta.devanagari,
      ruler: meta.ruler,
      quality: name,
      nature: meta.nature,
      startTime: new Date(s),
      endTime: new Date(e),
      isCurrent: nowMs >= s && nowMs < e,
    };
  });

  const night: ChoghadiyaPeriod[] = nightSeq.map((name, i) => {
    const s = sunsetMs + i * nightPartMs;
    const e = sunsetMs + (i + 1) * nightPartMs;
    const meta = CHOGHADIYA_META[name];
    return {
      name,
      nameDevanagari: meta.devanagari,
      ruler: meta.ruler,
      quality: name,
      nature: meta.nature,
      startTime: new Date(s),
      endTime: new Date(e),
      isCurrent: nowMs >= s && nowMs < e,
    };
  });

  return { day, night };
}
