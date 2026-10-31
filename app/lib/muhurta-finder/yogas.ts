/**
 * Planetary & Solilunar Yoga Detectors
 * Based on classical Jyotisha principles from Muhurta Chintamani.
 */

// Sarvartha Siddhi Weekday -> Nakshatras 0..26 (Ashwini = 0)
const SARVARTHA_SIDDHI_MAP: Record<number, number[]> = {
  0: [12, 18, 11, 20, 25, 0, 7], // Sunday: Hasta, Mula, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Ashwini, Pushya
  1: [21, 3, 4, 7, 16],          // Monday: Shravana, Rohini, Mrigashira, Pushya, Anuradha
  2: [0, 2],                     // Tuesday: Ashwini, Krittika
  3: [3, 16, 12, 2, 4],          // Wednesday: Rohini, Anuradha, Hasta, Krittika, Mrigashira
  4: [6, 7, 16, 0],              // Thursday: Punarvasu, Pushya, Anuradha, Ashwini
  5: [26, 16, 0, 6],             // Friday: Revati, Anuradha, Ashwini, Punarvasu
  6: [3, 14, 21],                // Saturday: Rohini, Swati, Shravana
};

// Amrita Siddhi Weekday -> Nakshatra 0..26
const AMRITA_SIDDHI_MAP: Record<number, number> = {
  0: 12, // Sun + Hasta
  1: 4,  // Mon + Mrigashira
  2: 0,  // Tue + Ashwini
  3: 16, // Wed + Anuradha
  4: 7,  // Thu + Pushya
  5: 26, // Fri + Revati
  6: 3,  // Sat + Rohini
};

export function detectSpecialYogas(
  dayOfWeek: number, // 0 = Sunday
  nakshatraIdx0: number, // 0 = Ashwini
  tithiIdx1: number // 1 to 30
): string[] {
  const yogas: string[] = [];

  // 1. Guru Pushya Yoga (Thursday + Pushya)
  if (dayOfWeek === 4 && nakshatraIdx0 === 7) {
    yogas.push('Guru Pushya Yoga (गुरु पुष्य योग)');
  }

  // 2. Ravi Pushya Yoga (Sunday + Pushya)
  if (dayOfWeek === 0 && nakshatraIdx0 === 7) {
    yogas.push('Ravi Pushya Yoga (रवि पुष्य योग)');
  }

  // 3. Amrita Siddhi Yoga
  if (AMRITA_SIDDHI_MAP[dayOfWeek] === nakshatraIdx0) {
    yogas.push('Amrita Siddhi Yoga (अमृत सिद्धि योग)');
  }

  // 4. Sarvartha Siddhi Yoga
  const ssList = SARVARTHA_SIDDHI_MAP[dayOfWeek] || [];
  if (ssList.includes(nakshatraIdx0)) {
    yogas.push('Sarvartha Siddhi Yoga (सर्वार्थ सिद्धि योग)');
  }

  // 5. Dvipushkar Yoga
  // Occurs on Sunday, Tuesday, or Saturday + Bhadra Tithi (2, 7, 12 in either paksha) + Dvisvabhava nakshatras (Mrigashira, Chitra, Dhanishta)
  const isSpecialDay = dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 6;
  const pakshaTithi = ((tithiIdx1 - 1) % 15) + 1;
  const isBhadraTithi = pakshaTithi === 2 || pakshaTithi === 7 || pakshaTithi === 12;

  if (isSpecialDay && isBhadraTithi) {
    if ([4, 13, 22].includes(nakshatraIdx0)) {
      yogas.push('Dvipushkar Yoga (द्विपुष्कर योग)');
    } else if ([2, 6, 11, 15, 20, 24].includes(nakshatraIdx0)) {
      yogas.push('Tripushkar Yoga (त्रिपुष्कर योग)');
    }
  }

  return yogas;
}

/**
 * Calculates Panchaka Dosha type if Moon is transiting the last 5 nakshatras.
 */
export function getPanchakaType(
  tithiIdx1: number,
  dayOfWeek: number,
  nakshatraIdx0: number
): 'Rog' | 'Agni' | 'Raj' | 'Chora' | 'Mrityu' | 'None' {
  // Panchaka is active during Dhanishta (latter half), Shatabhisha, Purva Bhadra, Uttara Bhadra, Revati
  if (nakshatraIdx0 < 22 || nakshatraIdx0 > 26) {
    return 'None';
  }

  const remainder = (tithiIdx1 + dayOfWeek + (nakshatraIdx0 + 1)) % 9;
  if (remainder === 1) return 'Mrityu';
  if (remainder === 2) return 'Agni';
  if (remainder === 4) return 'Raj';
  if (remainder === 6) return 'Chora';
  if (remainder === 8) return 'Rog';

  return 'None';
}
