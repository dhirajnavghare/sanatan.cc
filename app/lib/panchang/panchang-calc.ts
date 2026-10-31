import {
  toJulianDay,
  fromJulianDay,
  getSunPosition,
  getMoonPosition,
  normalizeDegrees,
} from './astronomy';
import { getAyanamsa, AyanamsaSystem } from './ayanamsa';
import {
  TITHI_NAMES,
  TITHI_DEVANAGARI,
  TITHI_DEITIES,
  NAKSHATRA_NAMES,
  NAKSHATRA_DEVANAGARI,
  NAKSHATRA_LORDS,
  NAKSHATRA_DEITIES,
  YOGA_NAMES,
  YOGA_DEVANAGARI,
  YOGA_NATURE,
  CHARA_KARANAS,
  CHARA_KARANAS_DEVANAGARI,
  STHIRA_KARANAS,
  STHIRA_KARANAS_DEVANAGARI,
  RASHI_NAMES,
  RASHI_DEVANAGARI,
  RASHI_ENGLISH,
  RASHI_LORDS,
  RASHI_ELEMENTS,
  LUNAR_MONTHS,
  LUNAR_MONTHS_DEVANAGARI,
  VARA_NAMES,
  VARA_DEVANAGARI,
  VARA_ENGLISH,
  VARA_LORDS,
  RITUS,
} from './constants';
import {
  TithiDetails,
  NakshatraDetails,
  YogaDetails,
  KaranaDetails,
  VaraDetails,
  RashiDetails,
  MasaDetails,
  SamvatDetails,
  TransitionEvent,
} from './types';

/**
 * Returns Sidereal Moon Longitude in degrees (0 to 360)
 */
export function getMoonSiderealLongitude(jd: number, ayanamsaSystem: AyanamsaSystem = 'Lahiri'): number {
  const moon = getMoonPosition(jd);
  const ayan = getAyanamsa(jd, ayanamsaSystem);
  return normalizeDegrees(moon.longitudeDeg - ayan);
}

/**
 * Returns Sidereal Sun Longitude in degrees (0 to 360)
 */
export function getSunSiderealLongitude(jd: number, ayanamsaSystem: AyanamsaSystem = 'Lahiri'): number {
  const sun = getSunPosition(jd);
  const ayan = getAyanamsa(jd, ayanamsaSystem);
  return normalizeDegrees(sun.longitudeDeg - ayan);
}

/**
 * Elongation = (Moon Tropical - Sun Tropical) mod 360
 */
export function getElongation(jd: number): number {
  const sun = getSunPosition(jd);
  const moon = getMoonPosition(jd);
  return normalizeDegrees(moon.longitudeDeg - sun.longitudeDeg);
}

/**
 * Yoga Longitude = (Moon Sidereal + Sun Sidereal) mod 360
 */
export function getYogaLongitude(jd: number, ayanamsaSystem: AyanamsaSystem = 'Lahiri'): number {
  const sm = getMoonSiderealLongitude(jd, ayanamsaSystem);
  const ss = getSunSiderealLongitude(jd, ayanamsaSystem);
  return normalizeDegrees(sm + ss);
}

/**
 * Helper to get Tithi details from index 0..29
 */
export function getTithiDetails(index0: number): TithiDetails {
  const normIndex = ((index0 % 30) + 30) % 30;
  const isShukla = normIndex < 15;
  const pakshaIndex = (normIndex % 15) + 1; // 1 to 15
  const paksha = isShukla ? 'Shukla' : 'Krishna';
  const pakshaDevanagari = isShukla ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';

  let name: string;
  let nameDevanagari: string;

  if (normIndex === 14) {
    name = 'Purnima';
    nameDevanagari = 'पूर्णिमा';
  } else if (normIndex === 29) {
    name = 'Amavasya';
    nameDevanagari = 'अमावस्या';
  } else {
    name = TITHI_NAMES[pakshaIndex - 1];
    nameDevanagari = TITHI_DEVANAGARI[pakshaIndex - 1];
  }

  const deity = TITHI_DEITIES[pakshaIndex - 1];

  return {
    index: normIndex + 1,
    pakshaIndex,
    paksha,
    pakshaDevanagari,
    name,
    nameDevanagari,
    deity,
  };
}

/**
 * Helper to get Nakshatra details from index 0..26
 */
export function getNakshatraDetails(index0: number, moonSiderealDeg?: number): NakshatraDetails {
  const normIndex = ((index0 % 27) + 27) % 27;
  let pada = 1;
  if (moonSiderealDeg !== undefined) {
    const nakSpan = 360 / 27; // 13.333333333°
    const offsetInNak = normalizeDegrees(moonSiderealDeg) % nakSpan;
    pada = Math.floor(offsetInNak / (nakSpan / 4)) + 1;
    if (pada > 4) pada = 4;
  }

  return {
    index: normIndex + 1,
    name: NAKSHATRA_NAMES[normIndex],
    nameDevanagari: NAKSHATRA_DEVANAGARI[normIndex],
    lord: NAKSHATRA_LORDS[normIndex],
    deity: NAKSHATRA_DEITIES[normIndex],
    pada,
  };
}

/**
 * Helper to get Yoga details from index 0..26
 */
export function getYogaDetails(index0: number): YogaDetails {
  const normIndex = ((index0 % 27) + 27) % 27;
  return {
    index: normIndex + 1,
    name: YOGA_NAMES[normIndex],
    nameDevanagari: YOGA_DEVANAGARI[normIndex],
    nature: YOGA_NATURE[normIndex],
  };
}

/**
 * Helper to get Karana details from index 0..59
 * First karana of Shukla Pratipada: Kimstughna (sthira)
 * Then 7 chara karanas repeat 8 times (56 karanas)
 * Then last 3 karanas: Shakuni, Chatushpada, Naga (sthira)
 */
export function getKaranaDetails(index0: number): KaranaDetails {
  const k = ((index0 % 60) + 60) % 60;
  let name: string;
  let nameDevanagari: string;
  let type: 'Chara' | 'Sthira';
  let deity = 'Brahma';

  if (k === 0) {
    name = 'Kimstughna';
    nameDevanagari = 'किंस्तुघ्न';
    type = 'Sthira';
    deity = 'Vayu';
  } else if (k >= 57) {
    const sthiraIdx = k - 57;
    name = STHIRA_KARANAS[sthiraIdx];
    nameDevanagari = STHIRA_KARANAS_DEVANAGARI[sthiraIdx];
    type = 'Sthira';
    deity = ['Kali', 'Vrishabha', 'Sarpa'][sthiraIdx] || 'Yama';
  } else {
    const charaIdx = (k - 1) % 7;
    name = CHARA_KARANAS[charaIdx];
    nameDevanagari = CHARA_KARANAS_DEVANAGARI[charaIdx];
    type = 'Chara';
    deity = ['Indra', 'Brahma', 'Mitra', 'Aryaman', 'Bhaga', 'Vishnu', 'Yama'][charaIdx] || 'Indra';
  }

  return {
    index: k + 1,
    name,
    nameDevanagari,
    type,
    deity,
  };
}

/**
 * Helper to get Rashi details from index 0..11
 */
export function getRashiDetails(index0: number): RashiDetails {
  const normIndex = ((index0 % 12) + 12) % 12;
  return {
    index: normIndex,
    name: RASHI_NAMES[normIndex],
    nameDevanagari: RASHI_DEVANAGARI[normIndex],
    englishName: RASHI_ENGLISH[normIndex],
    lord: RASHI_LORDS[normIndex],
    element: RASHI_ELEMENTS[normIndex],
  };
}

/**
 * Finds the exact transition (end) time of an astronomical limb using adaptive step and bisection.
 * @param angleFn function returning continuous degree angle [0..360)
 * @param spanDegrees span of one unit (e.g. 12 for tithi, 360/27 for nakshatra, 6 for karana, 30 for rashi)
 * @param startJd starting JD (e.g. sunrise)
 */
export function findTransitionTime(
  angleFn: (jd: number) => number,
  spanDegrees: number,
  startJd: number
): { endJd: number; progressPercent: number } {
  const currentAngle = angleFn(startJd);
  const currentIdx = Math.floor(currentAngle / spanDegrees);

  // Progress in current limb at startJd
  const angleInLimb = currentAngle - currentIdx * spanDegrees;
  const progressPercent = Math.min(100, Math.max(0, (angleInLimb / spanDegrees) * 100));

  // Forward search in 10-minute steps (up to 4 days)
  const dtDays = 10 / 1440;
  let aJd = startJd;
  let bJd = startJd;

  while (bJd - startJd < 4.0) {
    bJd += dtDays;
    const ang = angleFn(bJd);
    const idx = Math.floor(ang / spanDegrees);
    if (idx !== currentIdx) {
      // Crossed boundary between aJd and bJd
      break;
    }
    aJd = bJd;
  }

  // Refine crossing with bisection to sub-second precision (25 iterations gives ~0.03 seconds precision)
  for (let i = 0; i < 26; i++) {
    const mid = (aJd + bJd) / 2;
    const idx = Math.floor(angleFn(mid) / spanDegrees);
    if (idx === currentIdx) {
      aJd = mid;
    } else {
      bJd = mid;
    }
  }

  return { endJd: (aJd + bJd) / 2, progressPercent };
}

/**
 * Compute the 5 limbs (Pancha-Anga) for a given sunrise time and location
 */
export function calculatePanchaAnga(
  sunriseTime: Date,
  ayanamsaSystem: AyanamsaSystem = 'Lahiri',
  dayOfWeek?: number
): {
  tithi: TransitionEvent<TithiDetails>;
  nakshatra: TransitionEvent<NakshatraDetails>;
  yoga: TransitionEvent<YogaDetails>;
  karana: TransitionEvent<KaranaDetails>;
  vara: VaraDetails;
  sunRashi: TransitionEvent<RashiDetails>;
  moonRashi: TransitionEvent<RashiDetails>;
} {
  const sunriseJd = toJulianDay(sunriseTime);

  // 1. Tithi
  const tithiAngleFn = (jd: number) => getElongation(jd);
  const tithiTransition = findTransitionTime(tithiAngleFn, 12, sunriseJd);
  const tithiCurrentIdx = Math.floor(tithiAngleFn(sunriseJd) / 12);
  const tithiCurrent = getTithiDetails(tithiCurrentIdx);
  const tithiNext = getTithiDetails((tithiCurrentIdx + 1) % 30);

  // 2. Nakshatra
  const nakshatraSpan = 360 / 27; // 13° 20'
  const nakshatraAngleFn = (jd: number) => getMoonSiderealLongitude(jd, ayanamsaSystem);
  const nakshatraTransition = findTransitionTime(nakshatraAngleFn, nakshatraSpan, sunriseJd);
  const moonSiderealAtSunrise = nakshatraAngleFn(sunriseJd);
  const nakshatraCurrentIdx = Math.floor(moonSiderealAtSunrise / nakshatraSpan);
  const nakshatraCurrent = getNakshatraDetails(nakshatraCurrentIdx, moonSiderealAtSunrise);
  const nakshatraNext = getNakshatraDetails((nakshatraCurrentIdx + 1) % 27);

  // 3. Yoga
  const yogaAngleFn = (jd: number) => getYogaLongitude(jd, ayanamsaSystem);
  const yogaTransition = findTransitionTime(yogaAngleFn, nakshatraSpan, sunriseJd);
  const yogaCurrentIdx = Math.floor(yogaAngleFn(sunriseJd) / nakshatraSpan);
  const yogaCurrent = getYogaDetails(yogaCurrentIdx);
  const yogaNext = getYogaDetails((yogaCurrentIdx + 1) % 27);

  // 4. Karana
  const karanaAngleFn = (jd: number) => getElongation(jd);
  const karanaTransition = findTransitionTime(karanaAngleFn, 6, sunriseJd);
  const karanaCurrentIdx = Math.floor(karanaAngleFn(sunriseJd) / 6);
  const karanaCurrent = getKaranaDetails(karanaCurrentIdx);
  const karanaNext = getKaranaDetails((karanaCurrentIdx + 1) % 60);

  // 5. Vara (Weekday at local sunrise)
  // Use explicitly provided civil day of week, or fallback to sunrise timestamp UTC day
  const resolvedDayOfWeek = dayOfWeek !== undefined ? dayOfWeek : sunriseTime.getUTCDay();
  const vara: VaraDetails = {
    dayOfWeek: resolvedDayOfWeek,
    name: VARA_NAMES[resolvedDayOfWeek],
    nameDevanagari: VARA_DEVANAGARI[resolvedDayOfWeek],
    englishName: VARA_ENGLISH[resolvedDayOfWeek],
    lordPlanet: VARA_LORDS[resolvedDayOfWeek],
  };

  // 6. Moon Rashi
  const moonRashiAngleFn = (jd: number) => getMoonSiderealLongitude(jd, ayanamsaSystem);
  const moonRashiTransition = findTransitionTime(moonRashiAngleFn, 30, sunriseJd);
  const moonRashiCurrentIdx = Math.floor(moonRashiAngleFn(sunriseJd) / 30);
  const moonRashiCurrent = getRashiDetails(moonRashiCurrentIdx);
  const moonRashiNext = getRashiDetails((moonRashiCurrentIdx + 1) % 12);

  // 7. Sun Rashi (Sankranti)
  const sunRashiAngleFn = (jd: number) => getSunSiderealLongitude(jd, ayanamsaSystem);
  const sunRashiTransition = findTransitionTime(sunRashiAngleFn, 30, sunriseJd);
  const sunRashiCurrentIdx = Math.floor(sunRashiAngleFn(sunriseJd) / 30);
  const sunRashiCurrent = getRashiDetails(sunRashiCurrentIdx);
  const sunRashiNext = getRashiDetails((sunRashiCurrentIdx + 1) % 12);

  return {
    tithi: {
      current: tithiCurrent,
      endTime: fromJulianDay(tithiTransition.endJd),
      next: tithiNext,
      progressPercent: tithiTransition.progressPercent,
    },
    nakshatra: {
      current: nakshatraCurrent,
      endTime: fromJulianDay(nakshatraTransition.endJd),
      next: nakshatraNext,
      progressPercent: nakshatraTransition.progressPercent,
    },
    yoga: {
      current: yogaCurrent,
      endTime: fromJulianDay(yogaTransition.endJd),
      next: yogaNext,
      progressPercent: yogaTransition.progressPercent,
    },
    karana: {
      current: karanaCurrent,
      endTime: fromJulianDay(karanaTransition.endJd),
      next: karanaNext,
      progressPercent: karanaTransition.progressPercent,
    },
    vara,
    sunRashi: {
      current: sunRashiCurrent,
      endTime: fromJulianDay(sunRashiTransition.endJd),
      next: sunRashiNext,
      progressPercent: sunRashiTransition.progressPercent,
    },
    moonRashi: {
      current: moonRashiCurrent,
      endTime: fromJulianDay(moonRashiTransition.endJd),
      next: moonRashiNext,
      progressPercent: moonRashiTransition.progressPercent,
    },
  };
}

/**
 * Find exact previous or next New Moon (Amavasya point)
 */
export function findNewMoon(startJd: number, direction: 'prev' | 'next'): number {
  const e = getElongation(startJd);
  let estOffsetDays = (direction === 'prev' ? -e : (360 - e)) / 12.19075;
  if (Math.abs(estOffsetDays) < 0.05) {
    estOffsetDays = direction === 'prev' ? -29.53 : 29.53;
  }
  let aJd = startJd + estOffsetDays - 1.5;
  let bJd = startJd + estOffsetDays + 1.5;

  // Binary search for elongation 0
  const normSigned = (x: number) => ((getElongation(x) + 180) % 360) - 180;
  for (let k = 0; k < 35; k++) {
    const mid = (aJd + bJd) / 2;
    if (normSigned(mid) < 0) {
      aJd = mid;
    } else {
      bJd = mid;
    }
  }
  return (aJd + bJd) / 2;
}

/**
 * Determine Lunar Month (Amanta and Purnimanta) and Adhika Masa
 */
export function calculateMasa(
  sunriseTime: Date,
  tithiCurrent: TithiDetails,
  ayanamsaSystem: AyanamsaSystem = 'Lahiri'
): MasaDetails {
  const sunriseJd = toJulianDay(sunriseTime);

  // New Moon before this sunrise
  const nm1 = findNewMoon(sunriseJd, 'prev');
  // Next New Moon after nm1
  const nm2 = findNewMoon(nm1 + 5, 'next');

  // Sun sidereal rashi at nm1 and nm2
  const sunRashi1 = Math.floor(getSunSiderealLongitude(nm1 + 0.01, ayanamsaSystem) / 30);
  const sunRashi2 = Math.floor(getSunSiderealLongitude(nm2 - 0.01, ayanamsaSystem) / 30);

  const isAdhika = sunRashi1 === sunRashi2;
  // Lunar month index in Amanta system:
  // Sun in Mesha (0) -> Vaishakha (1)
  // Sun in Meena (11) -> Chaitra (0)
  // In Indian tradition:
  // 0: Chaitra (Sun in Meena -> Mesha)
  // 1: Vaishakha (Sun in Mesha -> Vrishabha)
  // etc.
  const amantaIndex = (sunRashi1 + 1) % 12;

  // In Purnimanta system:
  // Krishna paksha belongs to the upcoming month!
  let purnimantaIndex = amantaIndex;
  if (tithiCurrent.paksha === 'Krishna') {
    purnimantaIndex = (amantaIndex + 1) % 12;
  }

  const amantaName = (isAdhika ? 'Adhika ' : '') + LUNAR_MONTHS[amantaIndex];
  const amantaNameDevanagari = (isAdhika ? 'अधिक ' : '') + LUNAR_MONTHS_DEVANAGARI[amantaIndex];

  const purnimantaName = (isAdhika ? 'Adhika ' : '') + LUNAR_MONTHS[purnimantaIndex];
  const purnimantaNameDevanagari = (isAdhika ? 'अधिक ' : '') + LUNAR_MONTHS_DEVANAGARI[purnimantaIndex];

  return {
    amantaIndex,
    amantaName,
    amantaNameDevanagari,
    purnimantaIndex,
    purnimantaName,
    purnimantaNameDevanagari,
    isAdhika,
    adhikaType: isAdhika ? 'Adhika' : 'Nija',
  };
}

/**
 * Determine Samvat (Vikram, Shaka, Kali), Ayana, and Ritu
 */
export function calculateSamvat(
  date: Date,
  sunSiderealRashi: number,
  masa: MasaDetails
): SamvatDetails {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 1-12

  // Vikram Samvat begins on Chaitra Shukla Pratipada (approx March-April)
  // Before Chaitra, it is year + 56; after Chaitra Pratipada, year + 57.
  let vikramSamvat = year + 57;
  if (month < 3 || (month <= 4 && masa.amantaIndex >= 10)) {
    vikramSamvat = year + 56;
  }

  // Shaka Samvat begins with Chaitra (approx March 21-22)
  let shakaSamvat = year - 78;
  if (month < 3 || (month <= 4 && masa.amantaIndex >= 10)) {
    shakaSamvat = year - 79;
  }

  // Kali Yuga started 3102 BCE
  const kaliSamvat = year + 3101;

  // Ayana:
  // Uttarayana: Sun enters Makara (Rashi 9: Capricorn) through Mithuna (Rashi 2)
  // Dakshinayana: Sun enters Karka (Rashi 3: Cancer) through Dhanu (Rashi 8)
  const isUttarayana = sunSiderealRashi >= 9 || sunSiderealRashi <= 2;
  const ayana = isUttarayana ? 'Uttarayana' : 'Dakshinayana';
  const ayanaDevanagari = isUttarayana ? 'उत्तरायण' : 'दक्षिणायन';

  // 6 Ritus based on Solar sidereal sign:
  // 0, 1 (Mesha, Vrishabha): Vasanta
  // 2, 3 (Mithuna, Karka): Grishma
  // 4, 5 (Simha, Kanya): Varsha
  // 6, 7 (Tula, Vrishchika): Sharad
  // 8, 9 (Dhanu, Makara): Hemanta
  // 10, 11 (Kumbha, Meena): Shishira
  const rituIdx = Math.floor(sunSiderealRashi / 2);
  const rituObj = RITUS[rituIdx] || RITUS[0];

  return {
    vikramSamvat,
    shakaSamvat,
    kaliSamvat,
    ayana,
    ayanaDevanagari,
    ritu: rituObj.name,
    rituDevanagari: rituObj.devanagari,
  };
}
