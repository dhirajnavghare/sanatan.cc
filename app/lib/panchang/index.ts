import {
  toJulianDay,
  calculateSunTimes,
  calculateMoonTimes,
  getMoonIllumination,
  getSunPosition,
  getMoonPosition,
  getEquationOfTime,
  getHorizonDipDeg,
  getDeltaT,
} from './astronomy';
import { getAyanamsa, AyanamsaSystem } from './ayanamsa';
import {
  calculatePanchaAnga,
  calculateMasa,
  calculateSamvat,
  getMoonSiderealLongitude,
  getSunSiderealLongitude,
} from './panchang-calc';
import { calculateMuhurtas, calculateChoghadiya } from './muhurta';
import { calculateFestivals, calculateUpcomingFestivals, parseCivilDate } from './festivals';
import { GeoLocation, PanchangData } from './types';
export * from './types';
export * from './constants';
export * from './astronomy';
export * from './ayanamsa';
export * from './panchang-calc';
export * from './muhurta';
export * from './festivals';

/**
 * Main calculation engine function for Panchang
 */
export function calculatePanchang(
  dateInput: Date | string,
  location: GeoLocation,
  ayanamsaSystem: AyanamsaSystem = 'Lahiri',
  currentTime?: Date
): PanchangData {
  const { year, month, day, isoDate } = parseCivilDate(dateInput, location.timezone);
  const civilDateAnchor = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  // 1. Solar Ephemeris & Times
  const useDip = !!location.useElevationDip;
  const sunTimesRaw = calculateSunTimes(
    year,
    month,
    day,
    location.latitude,
    location.longitude,
    location.altitude,
    useDip
  );

  // Next day's sunrise for ratrimana & nighttime calculations
  const nextDayDate = new Date(Date.UTC(year, month - 1, day + 1, 12, 0, 0));
  const nextSunTimes = calculateSunTimes(
    nextDayDate.getUTCFullYear(),
    nextDayDate.getUTCMonth() + 1,
    nextDayDate.getUTCDate(),
    location.latitude,
    location.longitude,
    location.altitude,
    useDip
  );

  const dayLengthMs = sunTimesRaw.sunset.getTime() - sunTimesRaw.sunrise.getTime();
  const nightLengthMs = nextSunTimes.sunrise.getTime() - sunTimesRaw.sunset.getTime();

  const sunTimes = {
    ...sunTimesRaw,
    dayLengthMs,
    nightLengthMs,
  };

  // 2. Lunar Ephemeris & Times
  const moonTimesRaw = calculateMoonTimes(
    year,
    month,
    day,
    location.latitude,
    location.longitude,
    location.altitude,
    useDip
  );

  const sunriseJd = toJulianDay(sunTimesRaw.sunrise);
  const moonIllum = getMoonIllumination(sunriseJd);

  // Approximate age of moon in days (29.53 days cycle)
  const moonAgeDays = (moonIllum.phaseAngleDeg / 360) * 29.53059;

  const moonTimes = {
    moonrise: moonTimesRaw.moonrise,
    moonset: moonTimesRaw.moonset,
    phaseAngleDeg: moonIllum.phaseAngleDeg,
    illuminationFraction: moonIllum.fraction,
    moonAgeDays,
    phaseName: moonIllum.phaseName,
  };

  // 3. Pancha-Anga (5 Limbs) at Sunrise
  const civilDayOfWeek = civilDateAnchor.getUTCDay();
  const panchaAnga = calculatePanchaAnga(sunTimesRaw.sunrise, ayanamsaSystem, civilDayOfWeek);

  // 4. Masa (Lunar Month) & Samvat
  const masa = calculateMasa(sunTimesRaw.sunrise, panchaAnga.tithi.current, ayanamsaSystem);
  const samvat = calculateSamvat(civilDateAnchor, panchaAnga.sunRashi.current.index, masa);

  // 5. Muhurtas & Auspicious/Inauspicious Timings
  const muhurtas = calculateMuhurtas(
    sunTimesRaw.sunrise,
    sunTimesRaw.sunset,
    nextSunTimes.sunrise,
    panchaAnga.vara.dayOfWeek,
    panchaAnga.nakshatra.current.index - 1,
    new Date(sunTimesRaw.sunrise.getTime() - (panchaAnga.nakshatra.progressPercent / 100) * 86400000),
    panchaAnga.nakshatra.endTime
  );

  // 6. Choghadiya
  const choghadiya = calculateChoghadiya(
    sunTimesRaw.sunrise,
    sunTimesRaw.sunset,
    nextSunTimes.sunrise,
    panchaAnga.vara.dayOfWeek,
    currentTime
  );

  // 7. Festivals & Upcoming Vrats
  const festivals = calculateFestivals(isoDate, location);
  const upcomingFestivals = calculateUpcomingFestivals(isoDate, location, 6);

  // 8. Astronomical Details
  const sunPos = getSunPosition(sunriseJd);
  const moonPos = getMoonPosition(sunriseJd);
  const ayanVal = getAyanamsa(sunriseJd, ayanamsaSystem);
  const deltaT = getDeltaT(year);
  const eqtMin = getEquationOfTime(sunriseJd);
  const dipDeg = getHorizonDipDeg(location.altitude);

  const astronomy = {
    julianDay: sunriseJd,
    deltaTSeconds: deltaT,
    ayanamsaType: ayanamsaSystem,
    ayanamsaValueDeg: ayanVal,
    sunTropicalLonDeg: sunPos.longitudeDeg,
    sunSiderealLonDeg: getSunSiderealLongitude(sunriseJd, ayanamsaSystem),
    moonTropicalLonDeg: moonPos.longitudeDeg,
    moonSiderealLonDeg: getMoonSiderealLongitude(sunriseJd, ayanamsaSystem),
    moonLatitudeDeg: moonPos.latitudeDeg,
    moonDistanceKm: moonPos.distanceKm,
    sunDistanceAU: sunPos.distanceAU,
    sunDeclinationDeg: sunPos.declinationDeg,
    sunRightAscensionDeg: sunPos.rightAscensionDeg,
    moonDeclinationDeg: moonPos.declinationDeg,
    moonRightAscensionDeg: moonPos.rightAscensionDeg,
    equationOfTimeMinutes: eqtMin,
    topocentricHorizonDipDeg: dipDeg,
  };

  return {
    date: civilDateAnchor,
    isoDate,
    location,
    sunTimes,
    moonTimes,
    tithi: panchaAnga.tithi,
    nakshatra: panchaAnga.nakshatra,
    yoga: panchaAnga.yoga,
    karana: panchaAnga.karana,
    vara: panchaAnga.vara,
    sunRashi: panchaAnga.sunRashi,
    moonRashi: panchaAnga.moonRashi,
    masa,
    samvat,
    muhurtas,
    choghadiya,
    festivals,
    upcomingFestivals,
    astronomy,
  };
}
