import { MuhurtaCategoryId, MuhurtaSuitability } from './types';
import { PanchangData } from '../panchang/types';

export interface CategoryEvaluationResult {
  score: number; // 0 to 100
  suitability: MuhurtaSuitability;
  reasons: string[];
  precautions: string[];
}

export function evaluateCategoryRules(
  category: MuhurtaCategoryId,
  panchang: PanchangData,
  specialYogas: string[],
  panchakaType: string
): CategoryEvaluationResult {
  const tithiIdx1 = panchang.tithi.current.index;
  const pakshaTithi = ((tithiIdx1 - 1) % 15) + 1;
  const isShukla = panchang.tithi.current.paksha === 'Shukla';
  const nakshatraIdx0 = panchang.nakshatra.current.index - 1;
  const dayOfWeek = panchang.vara.dayOfWeek;
  const karanaName = panchang.karana.current.name;
  const isVishti = karanaName === 'Vishti';
  const isRikta = pakshaTithi === 4 || pakshaTithi === 9 || pakshaTithi === 14;
  const isAmavasya = tithiIdx1 === 30;

  let baseScore = 60;
  const reasons: string[] = [];
  const precautions: string[] = [];

  // Universal Dosha Penalties:
  if (isVishti) {
    baseScore -= 30;
    precautions.push('Vishti (Bhadra) Karana present — inauspicious window during half-tithi.');
  } else {
    reasons.push('Bhadra Dosha free (भद्रारहित कल्याणकारी मुहूर्त).');
  }

  if (isRikta) {
    baseScore -= 25;
    precautions.push(`${panchang.tithi.current.name} is a Rikta Tithi (रिक्ता तिथि) — avoid crucial ceremonies.`);
  }

  if (isAmavasya) {
    baseScore -= 35;
    precautions.push('Amavasya (अमावस्या) — avoided for auspicious constructive ceremonies.');
  }

  if (isShukla) {
    baseScore += 5;
    reasons.push('Shukla Paksha (bright waxing fortnight) auspicious energy.');
  }

  // Bonus for Special Yogas:
  if (specialYogas.length > 0) {
    baseScore += 20;
    reasons.push(...specialYogas.map((y) => `Blessed by ${y}`));
  }

  // Category-specific evaluations:
  switch (category) {
    case 'griha_pravesh': {
      // Preferred Nakshatras: Rohini (3), Mrigashira (4), Uttara Phalguni (11), Chitra (13), Anuradha (16), Uttara Ashadha (20), Uttara Bhadrapada (25), Revati (26)
      const auspiciousNaks = [3, 4, 11, 13, 16, 20, 25, 26];
      const preferredTithis = [2, 3, 5, 7, 10, 11, 12, 13];
      const preferredDays = [1, 3, 4, 5]; // Mon, Wed, Thu, Fri

      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Auspicious Griha Pravesh Nakshatra: ${panchang.nakshatra.current.name} (${panchang.nakshatra.current.nameDevanagari}).`);
      } else {
        baseScore -= 10;
        precautions.push(`Nakshatra ${panchang.nakshatra.current.name} is not among prime classical Sthira/Mridu stars.`);
      }

      if (preferredTithis.includes(pakshaTithi)) {
        baseScore += 15;
        reasons.push(`Favorable Tithi: ${panchang.tithi.current.name} (${panchang.tithi.current.paksha}).`);
      }

      if (preferredDays.includes(dayOfWeek)) {
        baseScore += 10;
        reasons.push(`Auspicious Weekday: ${panchang.vara.name} (${panchang.vara.englishName}).`);
      } else if (dayOfWeek === 2 || dayOfWeek === 0) {
        baseScore -= 15;
        precautions.push(`${panchang.vara.englishName} is traditionally avoided for Griha Pravesh.`);
      }

      if (panchakaType === 'Agni' || panchakaType === 'Mrityu') {
        baseScore -= 20;
        precautions.push(`${panchakaType} Panchaka active — exercise caution with new construction.`);
      }
      break;
    }

    case 'vivaha': {
      // Preferred Nakshatras: Rohini (3), Mrigashira (4), Magha (9), Uttara Phalguni (11), Hasta (12), Swati (14), Anuradha (16), Mula (18), Uttara Ashadha (20), Uttara Bhadrapada (25), Revati (26)
      const auspiciousNaks = [3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26];
      const preferredTithis = [2, 3, 5, 7, 10, 11, 12, 13];
      const preferredDays = [0, 1, 3, 4, 5]; // Sun, Mon, Wed, Thu, Fri

      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Prime Vivaha Nakshatra: ${panchang.nakshatra.current.name} (${panchang.nakshatra.current.nameDevanagari}).`);
      } else {
        baseScore -= 15;
        precautions.push(`Nakshatra ${panchang.nakshatra.current.name} is not on the prime wedding list.`);
      }

      if (preferredTithis.includes(pakshaTithi)) {
        baseScore += 15;
        reasons.push(`Shuddha Tithi: ${panchang.tithi.current.name}.`);
      }

      if (preferredDays.includes(dayOfWeek)) {
        baseScore += 10;
        reasons.push(`Harmonious Day: ${panchang.vara.name}.`);
      } else {
        baseScore -= 15;
        precautions.push(`${panchang.vara.englishName}s are avoided for solemnizing marriage rites.`);
      }
      break;
    }

    case 'vehicle_purchase': {
      // Preferred Nakshatras: Ashwini (0), Rohini (3), Punarvasu (6), Pushya (7), Hasta (12), Swati (14), Shravana (21), Shatabhisha (23), Revati (26)
      const auspiciousNaks = [0, 3, 6, 7, 12, 14, 21, 23, 26];
      const preferredDays = [0, 1, 3, 4, 5]; // Avoid Saturday & Tuesday

      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Chara/Kshipra Vahan Nakshatra: ${panchang.nakshatra.current.name}.`);
      }

      if (preferredDays.includes(dayOfWeek)) {
        baseScore += 15;
        reasons.push(`Benefic Planetary Day: ${panchang.vara.name}.`);
      } else {
        baseScore -= 15;
        precautions.push(`${panchang.vara.englishName} is avoided for acquiring new personal vehicles.`);
      }
      break;
    }

    case 'business_start': {
      // Preferred Nakshatras: Ashwini (0), Rohini (3), Pushya (7), Hasta (12), Chitra (13), Anuradha (16), Shravana (21), Revati (26)
      const auspiciousNaks = [0, 3, 7, 12, 13, 16, 21, 26];
      const preferredDays = [1, 3, 4, 5]; // Mon, Wed, Thu, Fri

      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Commerce & Wealth Nakshatra: ${panchang.nakshatra.current.name}.`);
      }

      if (preferredDays.includes(dayOfWeek)) {
        baseScore += 15;
        reasons.push(`Favorable Weekday for Commerce: ${panchang.vara.name}.`);
      }

      if (dayOfWeek === 4 && nakshatraIdx0 === 7) {
        baseScore += 30;
        reasons.push('Guru Pushya Yoga — the most revered combination for new commerce and enterprises.');
      }
      break;
    }

    case 'property_purchase': {
      // Sthira Nakshatras preferred: Rohini (3), Uttara Phalguni (11), Uttara Ashadha (20), Uttara Bhadrapada (25), plus Mrigashira, Chitra, Anuradha, Revati
      const auspiciousNaks = [3, 4, 11, 13, 16, 20, 25, 26];
      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Sthira / Dhruva Nakshatra: ${panchang.nakshatra.current.name} grants enduring ownership.`);
      }

      if ([3, 4, 5, 0].includes(dayOfWeek)) { // Wed, Thu, Fri, Sun
        baseScore += 10;
        reasons.push(`Good legal registry day: ${panchang.vara.name}.`);
      }
      break;
    }

    case 'gold_purchase': {
      // Pushya (7) is supreme
      if (nakshatraIdx0 === 7) {
        baseScore += 35;
        reasons.push('Pushya Nakshatra — supreme constellation for accumulating lasting gold and gems.');
      } else if ([0, 3, 4, 6, 12, 14, 16, 21, 26].includes(nakshatraIdx0)) {
        baseScore += 20;
        reasons.push(`Auspicious Wealth Nakshatra: ${panchang.nakshatra.current.name}.`);
      }

      if (dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 0) { // Thu, Fri, Sun
        baseScore += 15;
        reasons.push(`Prosperity Weekday: ${panchang.vara.name} (Brihaspati / Shukra / Surya).`);
      }
      break;
    }

    case 'namakarana': {
      const auspiciousNaks = [0, 3, 4, 6, 7, 11, 12, 14, 16, 20, 21, 22, 23, 25, 26];
      if (auspiciousNaks.includes(nakshatraIdx0)) {
        baseScore += 25;
        reasons.push(`Gentle & Long-lived Nakshatra: ${panchang.nakshatra.current.name}.`);
      }
      if ([1, 3, 4, 5].includes(dayOfWeek)) {
        baseScore += 15;
        reasons.push(`Benefic Naming Day: ${panchang.vara.name}.`);
      }
      break;
    }

    case 'sarvartha_siddhi':
    default: {
      if (specialYogas.length > 0) {
        baseScore += 30;
      }
      if (panchang.yoga.current.nature === 'Auspicious') {
        baseScore += 10;
        reasons.push(`Auspicious Solilunar Yoga: ${panchang.yoga.current.name}.`);
      }
      break;
    }
  }

  // Normalize score between 10 and 100
  const normalizedScore = Math.min(100, Math.max(10, Math.round(baseScore)));

  let suitability: MuhurtaSuitability = 'Average';
  if (normalizedScore >= 80) {
    suitability = 'Optimal';
  } else if (normalizedScore >= 65) {
    suitability = 'Good';
  } else if (normalizedScore < 45 || isAmavasya || (isVishti && normalizedScore < 55)) {
    suitability = 'Inauspicious';
  }

  return {
    score: normalizedScore,
    suitability,
    reasons,
    precautions,
  };
}
