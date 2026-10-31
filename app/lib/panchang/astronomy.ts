const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export function normalizeDegrees(deg: number): number {
  const mod = deg % 360;
  return mod < 0 ? mod + 360 : mod;
}

export function toJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

export function fromJulianDay(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}

/**
 * Approximate Delta T (TT - UT1) in seconds based on Espenak and Meeus (NASA).
 */
export function getDeltaT(year: number): number {
  const t = year - 2000;
  if (year >= 2005 && year <= 2050) {
    return 62.92 + 0.32217 * t + 0.005589 * t * t;
  } else if (year >= 1986 && year < 2005) {
    return 63.86 + 0.3345 * t - 0.060374 * t * t + 0.0017275 * t * t * t + 0.000651814 * Math.pow(t, 4);
  } else if (year >= 1900 && year < 1986) {
    const t2 = year - 1900;
    return -2.79 + 1.494119 * t2 - 0.0598939 * t2 * t2 + 0.0061966 * Math.pow(t2, 3) - 0.000197 * Math.pow(t2, 4);
  }
  return 69.2;
}

/**
 * Julian Ephemeris Centuries from J2000.0 (T)
 */
export function getJulianCenturies(jde: number): number {
  return (jde - 2451545.0) / 36525;
}

/**
 * Obliquity of the Ecliptic and Nutation (IAU theory)
 */
export function getNutationAndObliquity(T: number): {
  nutationInLongitudeDeg: number;
  nutationInObliquityDeg: number;
  meanObliquityDeg: number;
  trueObliquityDeg: number;
} {
  const meanObliquity = 23.43929111 - 0.013004167 * T - 1.638889e-7 * T * T + 5.03611e-7 * T * T * T;
  const omega = (125.04452 - 1934.136261 * T) * DEG_TO_RAD;
  const L = (280.4665 + 36000.7698 * T) * DEG_TO_RAD;
  const Lprime = (218.3165 + 481267.8813 * T) * DEG_TO_RAD;

  // Nutation in arcseconds
  const dPsiArcsec = -17.20 * Math.sin(omega) - 1.32 * Math.sin(2 * L) - 0.23 * Math.sin(2 * Lprime) + 0.21 * Math.sin(2 * omega);
  const dEpsArcsec = 9.20 * Math.cos(omega) + 0.57 * Math.cos(2 * L) + 0.10 * Math.cos(2 * Lprime) - 0.09 * Math.cos(2 * omega);

  const nutationInLongitudeDeg = dPsiArcsec / 3600;
  const nutationInObliquityDeg = dEpsArcsec / 3600;
  const trueObliquityDeg = meanObliquity + nutationInObliquityDeg;

  return {
    nutationInLongitudeDeg,
    nutationInObliquityDeg,
    meanObliquityDeg: meanObliquity,
    trueObliquityDeg,
  };
}

/**
 * High precision Sun Ephemeris (VSOP87 series + planetary perturbations from Jean Meeus)
 * Evaluated at Terrestrial Dynamic Time (JDE).
 */
export function getSunPosition(jd: number): {
  longitudeDeg: number;
  distanceAU: number;
  rightAscensionDeg: number;
  declinationDeg: number;
} {
  const year = 2000 + (jd - 2451545.0) / 365.25;
  const deltaT = getDeltaT(year);
  const jde = jd + deltaT / 86400; // Ephemeris Dynamical Time
  const T = getJulianCenturies(jde);

  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * DEG_TO_RAD;

  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * M)
          + 0.000289 * Math.sin(3 * M);

  // Periodic planetary perturbations (Venus, Jupiter, Mars, Moon) from Meeus Chapter 25
  const dL = 0.00134 * Math.cos((153.23 + 22518.7541 * T) * DEG_TO_RAD)
           + 0.00154 * Math.cos((216.57 + 45037.5082 * T) * DEG_TO_RAD)
           + 0.00200 * Math.cos((312.69 + 32964.4677 * T) * DEG_TO_RAD)
           + 0.00179 * Math.sin((350.74 + 445267.1142 * T) * DEG_TO_RAD)
           + 0.00178 * Math.sin((231.19 + 20.20 * T) * DEG_TO_RAD);

  const trueLongitude = L0 + C + dL;
  const nut = getNutationAndObliquity(T);

  // Apparent longitude: true longitude minus aberration (-20.4955" / R ~ 0.00569°) plus nutation
  const apparentLongitude = normalizeDegrees(
    trueLongitude - 0.00569 + nut.nutationInLongitudeDeg
  );

  // Eccentricity & Sun-Earth distance in AU
  const e = 0.016708634 - 0.000042037 * T - 0.0000001267 * T * T;
  const v = M + C * DEG_TO_RAD; // True anomaly
  const distanceAU = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(v));

  // Equatorial coordinates
  const epsRad = nut.trueObliquityDeg * DEG_TO_RAD;
  const appLonRad = apparentLongitude * DEG_TO_RAD;

  const sinDec = Math.sin(epsRad) * Math.sin(appLonRad);
  const declinationDeg = Math.asin(sinDec) * RAD_TO_DEG;

  const y = Math.cos(epsRad) * Math.sin(appLonRad);
  const x = Math.cos(appLonRad);
  const rightAscensionDeg = normalizeDegrees(Math.atan2(y, x) * RAD_TO_DEG);

  return {
    longitudeDeg: apparentLongitude,
    distanceAU,
    rightAscensionDeg,
    declinationDeg,
  };
}

// Table 47.A from Jean Meeus: Periodic terms for Moon's longitude (Sigmal in 1e-6 deg) and distance (Sigmar in 0.001 km)
const TABLE_47_A: [number, number, number, number, number, number][] = [
  [0,  0,  1,  0,  6288774.0, -20905355.0],
  [2,  0, -1,  0,  1274027.0,  -3699111.0],
  [2,  0,  0,  0,   658314.0,  -2955968.0],
  [0,  0,  2,  0,   213618.0,   -569925.0],
  [0,  1,  0,  0,  -185116.0,     48888.0],
  [0,  0,  0,  2,  -114332.0,     -3149.0],
  [2,  0, -2,  0,    58793.0,    246158.0],
  [2, -1, -1,  0,    57066.0,   -152138.0],
  [2,  0,  1,  0,    53322.0,   -170733.0],
  [2, -1,  0,  0,    45758.0,   -204586.0],
  [0,  1, -1,  0,   -40923.0,   -129620.0],
  [1,  0,  0,  0,   -34720.0,    108743.0],
  [0,  1,  1,  0,   -30383.0,    104755.0],
  [2,  0,  0, -2,    15327.0,     10321.0],
  [0,  0,  1,  2,   -12528.0,         0.0],
  [0,  0,  1, -2,    10980.0,     79661.0],
  [4,  0, -1,  0,    10675.0,    -34782.0],
  [0,  0,  3,  0,    10034.0,    -23210.0],
  [4,  0, -2,  0,     8548.0,    -21636.0],
  [2,  1, -1,  0,    -7888.0,     24208.0],
  [2,  1,  0,  0,    -6766.0,     30824.0],
  [1,  0, -1,  0,    -5163.0,     -8379.0],
  [1,  1,  0,  0,     4987.0,    -16675.0],
  [2, -1,  1,  0,     4036.0,    -12831.0],
  [2,  0,  2,  0,     3994.0,    -10445.0],
  [4,  0,  0,  0,     3861.0,    -11650.0],
  [2,  0, -3,  0,     3665.0,     14403.0],
  [0,  1, -2,  0,    -2689.0,     -7003.0],
  [2,  0, -1,  2,    -2602.0,         0.0],
  [2, -1, -2,  0,     2390.0,     10056.0],
  [1,  0,  1,  0,    -2348.0,      6322.0],
  [2, -2,  0,  0,     2236.0,     -9884.0],
  [0,  1,  2,  0,    -2120.0,      5751.0],
  [0,  2,  0,  0,    -2069.0,         0.0],
  [2, -2, -1,  0,     2048.0,     -4950.0],
  [2,  0,  1, -2,    -1773.0,      4130.0],
  [2,  0,  0,  2,    -1595.0,         0.0],
  [4, -1, -1,  0,     1215.0,     -3958.0],
  [0,  0,  2,  2,    -1110.0,         0.0],
  [3,  0, -1,  0,     -892.0,      3258.0],
  [2,  1,  1,  0,     -810.0,      2616.0],
  [4, -1, -2,  0,      759.0,     -1897.0],
  [0,  2, -1,  0,     -713.0,     -2117.0],
  [2,  2, -1,  0,     -700.0,      2354.0],
  [2,  1, -2,  0,      691.0,         0.0],
  [2, -1,  0, -2,      596.0,         0.0],
  [4,  0,  1,  0,      549.0,     -1423.0],
  [0,  0,  4,  0,      537.0,     -1117.0],
  [4, -1,  0,  0,      520.0,     -1571.0],
  [1,  0, -2,  0,     -487.0,     -1739.0],
  [2,  1,  0, -2,     -399.0,         0.0],
  [0,  0,  2, -2,     -381.0,     -4421.0],
  [1,  1,  1,  0,      351.0,         0.0],
  [3,  0, -2,  0,     -340.0,         0.0],
  [4,  0, -3,  0,      330.0,         0.0],
  [2, -1,  2,  0,      327.0,         0.0],
  [0,  2,  1,  0,     -323.0,      1165.0],
  [1,  1, -1,  0,      299.0,         0.0],
  [2,  0,  3,  0,      294.0,         0.0],
  [2,  0, -1, -2,        0.0,      8752.0]
];

// Table 47.B from Jean Meeus: Periodic terms for Moon's latitude (Sigmab in 1e-6 deg)
const TABLE_47_B: [number, number, number, number, number][] = [
  [0,  0,  0,  1,  5128122.0],
  [0,  0,  1,  1,   280602.0],
  [0,  0,  1, -1,   277693.0],
  [2,  0,  0, -1,   173237.0],
  [2,  0, -1,  1,    55413.0],
  [2,  0, -1, -1,    46271.0],
  [2,  0,  0,  1,    32573.0],
  [0,  0,  2,  1,    17198.0],
  [2,  0,  1, -1,     9266.0],
  [0,  0,  2, -1,     8822.0],
  [2, -1,  0, -1,     8216.0],
  [2,  0, -2, -1,     4324.0],
  [2,  0,  1,  1,     4200.0],
  [2,  1,  0, -1,    -3359.0],
  [2, -1, -1,  1,     2463.0],
  [2, -1,  0,  1,     2211.0],
  [2, -1, -1, -1,     2065.0],
  [0,  1, -1, -1,    -1870.0],
  [4,  0, -1, -1,     1828.0],
  [0,  1,  0,  1,    -1794.0],
  [0,  0,  0,  3,    -1749.0],
  [0,  1, -1,  1,    -1565.0],
  [1,  0,  0,  1,    -1491.0],
  [0,  1,  1,  1,    -1475.0],
  [0,  1,  1, -1,    -1410.0],
  [0,  1,  0, -1,    -1344.0],
  [1,  0,  0, -1,    -1335.0],
  [0,  0,  3,  1,     1107.0],
  [4,  0,  0, -1,     1021.0],
  [4,  0, -1,  1,      833.0],
  [0,  0,  1, -3,      777.0],
  [4,  0, -2,  1,      671.0],
  [2,  0,  0, -3,      607.0],
  [2,  0,  2, -1,      596.0],
  [2, -1,  1, -1,      491.0],
  [2,  0, -2,  1,     -451.0],
  [0,  0,  3, -1,      439.0],
  [2,  0,  2,  1,      422.0],
  [2,  0, -3, -1,      421.0],
  [2,  1, -1,  1,     -366.0],
  [2,  1,  0,  1,     -351.0],
  [4,  0,  0,  1,      331.0],
  [2, -1,  1,  1,      315.0],
  [2, -2,  0, -1,      302.0],
  [0,  0,  1,  3,     -283.0],
  [2,  1,  1, -1,     -229.0],
  [1,  1,  0, -1,      223.0],
  [1,  1,  0,  1,      223.0],
  [0,  1, -2, -1,     -220.0],
  [2,  1, -1, -1,     -220.0],
  [1,  0,  1,  1,     -185.0],
  [2, -1, -2, -1,      181.0],
  [0,  1,  2,  1,     -177.0],
  [4,  0, -2, -1,      176.0],
  [4, -1, -1, -1,      166.0],
  [1,  0,  1, -1,     -164.0],
  [4,  0,  1, -1,      132.0],
  [1,  0, -1, -1,     -119.0],
  [4, -1,  0, -1,      115.0],
  [2, -2,  0,  1,      107.0]
];

/**
 * High precision Moon Ephemeris (Complete Chapront ELP-2000 periodic theory)
 * Evaluated at Terrestrial Dynamic Time (JDE).
 */
export function getMoonPosition(jd: number): {
  longitudeDeg: number;
  latitudeDeg: number;
  distanceKm: number;
  rightAscensionDeg: number;
  declinationDeg: number;
} {
  const year = 2000 + (jd - 2451545.0) / 365.25;
  const deltaT = getDeltaT(year);
  const jde = jd + deltaT / 86400; // Ephemeris Dynamical Time
  const T = getJulianCenturies(jde);

  // Fundamental Delaunay arguments
  const Lprime = normalizeDegrees(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000);
  const D = normalizeDegrees(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000);
  const M = normalizeDegrees(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000);
  const Mprime = normalizeDegrees(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000);
  const F = normalizeDegrees(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000);

  const A1 = (119.75 + 131.849 * T) * DEG_TO_RAD;
  const A2 = (53.09 + 479264.290 * T) * DEG_TO_RAD;
  const A3 = (313.45 + 481266.484 * T) * DEG_TO_RAD;

  // Eccentricity factor of Earth's orbit
  const E = 1.0 - 0.002516 * T - 0.0000074 * T * T;
  const E2 = E * E;

  const Dr = D * DEG_TO_RAD;
  const Mr = M * DEG_TO_RAD;
  const Mprimer = Mprime * DEG_TO_RAD;
  const Fr = F * DEG_TO_RAD;
  const Lprimer = Lprime * DEG_TO_RAD;

  let sigmal = 0;
  let sigmar = 0;

  for (let i = 0; i < TABLE_47_A.length; i++) {
    const row = TABLE_47_A[i];
    const arg = row[0] * Dr + row[1] * Mr + row[2] * Mprimer + row[3] * Fr;
    let cl = row[4];
    let cr = row[5];
    const absM = Math.abs(row[1]);
    if (absM === 1) {
      cl *= E;
      cr *= E;
    } else if (absM === 2) {
      cl *= E2;
      cr *= E2;
    }
    sigmal += cl * Math.sin(arg);
    sigmar += cr * Math.cos(arg);
  }

  // Additive longitude terms
  sigmal += 3958.0 * Math.sin(A1) + 1962.0 * Math.sin(Lprimer - Fr) + 318.0 * Math.sin(A2);

  // Periodic terms for latitude (Table 47.B)
  let sigmab = 0;
  for (let i = 0; i < TABLE_47_B.length; i++) {
    const row = TABLE_47_B[i];
    const arg = row[0] * Dr + row[1] * Mr + row[2] * Mprimer + row[3] * Fr;
    let cb = row[4];
    const absM = Math.abs(row[1]);
    if (absM === 1) {
      cb *= E;
    } else if (absM === 2) {
      cb *= E2;
    }
    sigmab += cb * Math.sin(arg);
  }

  // Additive latitude terms
  sigmab += -2235.0 * Math.sin(Lprimer) + 382.0 * Math.sin(A3)
          + 175.0 * Math.sin(A1 - Fr) + 175.0 * Math.sin(A1 + Fr)
          + 127.0 * Math.sin(Lprimer - Mprimer) - 115.0 * Math.sin(Lprimer + Mprimer);

  const nut = getNutationAndObliquity(T);

  // Apparent longitude = geometric + nutation
  const apparentLongitude = normalizeDegrees(Lprime + sigmal / 1000000.0 + nut.nutationInLongitudeDeg);
  const latitudeDeg = sigmab / 1000000.0;
  const distanceKm = 385000.56 + sigmar / 1000.0;

  // Transform to Equatorial coordinates (Right Ascension & Declination)
  const epsRad = nut.trueObliquityDeg * DEG_TO_RAD;
  const lonRad = apparentLongitude * DEG_TO_RAD;
  const latRad = latitudeDeg * DEG_TO_RAD;

  const sinDec = Math.sin(latRad) * Math.cos(epsRad) + Math.cos(latRad) * Math.sin(epsRad) * Math.sin(lonRad);
  const declinationDeg = Math.asin(sinDec) * RAD_TO_DEG;

  const y = Math.sin(lonRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  const x = Math.cos(lonRad);
  const rightAscensionDeg = normalizeDegrees(Math.atan2(y, x) * RAD_TO_DEG);

  return {
    longitudeDeg: apparentLongitude,
    latitudeDeg,
    distanceKm,
    rightAscensionDeg,
    declinationDeg,
  };
}

/**
 * Greenwich Apparent Sidereal Time (GAST) in degrees
 */
export function getGAST(jd: number): number {
  const T = getJulianCenturies(jd);
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
  const nut = getNutationAndObliquity(T);
  const gast = gmst + nut.nutationInLongitudeDeg * Math.cos(nut.trueObliquityDeg * DEG_TO_RAD);
  return normalizeDegrees(gast);
}

/**
 * Local Apparent Sidereal Time (LAST) in degrees
 */
export function getLAST(jd: number, longitudeDeg: number): number {
  return normalizeDegrees(getGAST(jd) + longitudeDeg);
}

/**
 * Equation of time in minutes
 */
export function getEquationOfTime(jd: number): number {
  const T = getJulianCenturies(jd);
  const eps = getNutationAndObliquity(T).trueObliquityDeg * DEG_TO_RAD;
  const L0 = (280.46646 + 36000.76983 * T) * DEG_TO_RAD;
  const M = (357.52911 + 35999.05029 * T) * DEG_TO_RAD;
  const e = 0.016708634 - 0.000042037 * T;
  const y = Math.tan(eps / 2) ** 2;

  const eqtRad =
    y * Math.sin(2 * L0) -
    2 * e * Math.sin(M) +
    4 * e * y * Math.sin(M) * Math.cos(2 * L0) -
    0.5 * y * y * Math.sin(4 * L0) -
    1.25 * e * e * Math.sin(2 * M);

  return eqtRad * RAD_TO_DEG * 4;
}

/**
 * Geometric horizon dip in degrees due to observer altitude
 */
export function getHorizonDipDeg(altitudeMeters: number): number {
  if (altitudeMeters <= 0) return 0;
  return 0.0293 * Math.sqrt(altitudeMeters);
}

/**
 * Solar transit and rise/set times with high precision
 * By default in Indian / Drik Panchang, sea level (0m) is used as standard civil baseline
 * unless observer explicitly requests topocentric geometric dip.
 */
export function calculateSunTimes(
  year: number,
  month: number,
  day: number,
  latDeg: number,
  lonDeg: number,
  altitudeMeters: number = 0,
  useElevationDip: boolean = false
): {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  civilDawn: Date;
  civilDusk: Date;
  nauticalDawn: Date;
  astronomicalDawn: Date;
} {
  const baseMidnightMs = Date.UTC(year, month - 1, day);
  const baseJd = baseMidnightMs / 86400000 + 2440587.5;

  const approxNoonJd = baseJd + 0.5 - lonDeg / 360;
  const eqtMin = getEquationOfTime(approxNoonJd);
  const solarNoonMs = baseMidnightMs + (12 * 60 - lonDeg * 4 - eqtMin) * 60000;
  const solarNoonJd = solarNoonMs / 86400000 + 2440587.5;

  const effectiveAlt = useElevationDip ? altitudeMeters : 0;
  const dipDeg = getHorizonDipDeg(effectiveAlt);
  const latRad = latDeg * DEG_TO_RAD;

  // Standard upper limb solar horizon: -0.8333 deg (34' refraction + 16' semidiameter) minus dip
  const standardZenith = 90 + 0.833333 + dipDeg;
  const civilZenith = 90 + 6.0;
  const nauticalZenith = 90 + 12.0;
  const astroZenith = 90 + 18.0;

  function findHourAngle(targetZenithDeg: number, jdRef: number): number | null {
    const sun = getSunPosition(jdRef);
    const decRad = sun.declinationDeg * DEG_TO_RAD;
    const cosZenith = Math.cos(targetZenithDeg * DEG_TO_RAD);

    const cosH = (cosZenith - Math.sin(latRad) * Math.sin(decRad)) / (Math.cos(latRad) * Math.cos(decRad));
    if (cosH > 1 || cosH < -1) return null;
    return Math.acos(cosH) * RAD_TO_DEG;
  }

  // Refine sunrise and sunset iteratively
  let riseH = findHourAngle(standardZenith, solarNoonJd) ?? 90;
  let setH = riseH;

  const riseJd1 = solarNoonJd - (riseH * 4) / 1440;
  const setJd1 = solarNoonJd + (setH * 4) / 1440;

  riseH = findHourAngle(standardZenith, riseJd1) ?? riseH;
  setH = findHourAngle(standardZenith, setJd1) ?? setH;

  const sunriseMs = solarNoonMs - riseH * 4 * 60000;
  const sunsetMs = solarNoonMs + setH * 4 * 60000;

  const civilH = findHourAngle(civilZenith, solarNoonJd) ?? (riseH + 6);
  const nautH = findHourAngle(nauticalZenith, solarNoonJd) ?? (riseH + 12);
  const astroH = findHourAngle(astroZenith, solarNoonJd) ?? (riseH + 18);

  return {
    sunrise: new Date(sunriseMs),
    sunset: new Date(sunsetMs),
    solarNoon: new Date(solarNoonMs),
    civilDawn: new Date(solarNoonMs - civilH * 4 * 60000),
    civilDusk: new Date(solarNoonMs + civilH * 4 * 60000),
    nauticalDawn: new Date(solarNoonMs - nautH * 4 * 60000),
    astronomicalDawn: new Date(solarNoonMs - astroH * 4 * 60000),
  };
}

/**
 * Topocentric altitude of the moon in degrees
 */
export function getMoonAltitude(
  jd: number,
  latDeg: number,
  lonDeg: number
): number {
  const moon = getMoonPosition(jd);
  const lastDeg = getLAST(jd, lonDeg);
  const hourAngleRad = (lastDeg - moon.rightAscensionDeg) * DEG_TO_RAD;
  const latRad = latDeg * DEG_TO_RAD;
  const decRad = moon.declinationDeg * DEG_TO_RAD;

  const sinAlt = Math.sin(latRad) * Math.sin(decRad) + Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngleRad);
  const altDeg = Math.asin(sinAlt) * RAD_TO_DEG;

  const parallaxDeg = (6378.14 / moon.distanceKm) * RAD_TO_DEG * Math.cos(altDeg * DEG_TO_RAD);
  return altDeg - parallaxDeg;
}

/**
 * Moonrise and Moonset calculation by root-finding across the 24-hour day
 */
export function calculateMoonTimes(
  year: number,
  month: number,
  day: number,
  latDeg: number,
  lonDeg: number,
  altitudeMeters: number = 0,
  useElevationDip: boolean = false
): { moonrise: Date | null; moonset: Date | null } {
  const baseMidnightMs = Date.UTC(year, month - 1, day);
  const effectiveAlt = useElevationDip ? altitudeMeters : 0;
  const dipDeg = getHorizonDipDeg(effectiveAlt);
  const targetAlt = -0.5667 - dipDeg;

  let moonrise: Date | null = null;
  let moonset: Date | null = null;

  const steps = 48;
  const dtMs = 1800000;
  let prevAlt = getMoonAltitude(baseMidnightMs / 86400000 + 2440587.5, latDeg, lonDeg) - targetAlt;

  for (let i = 1; i <= steps; i++) {
    const tMs = baseMidnightMs + i * dtMs;
    const jd = tMs / 86400000 + 2440587.5;
    const currAlt = getMoonAltitude(jd, latDeg, lonDeg) - targetAlt;

    if (prevAlt < 0 && currAlt >= 0 && !moonrise) {
      let low = tMs - dtMs;
      let high = tMs;
      for (let k = 0; k < 18; k++) {
        const mid = (low + high) / 2;
        const alt = getMoonAltitude(mid / 86400000 + 2440587.5, latDeg, lonDeg) - targetAlt;
        if (alt < 0) low = mid;
        else high = mid;
      }
      moonrise = new Date((low + high) / 2);
    } else if (prevAlt > 0 && currAlt <= 0 && !moonset) {
      let low = tMs - dtMs;
      let high = tMs;
      for (let k = 0; k < 18; k++) {
        const mid = (low + high) / 2;
        const alt = getMoonAltitude(mid / 86400000 + 2440587.5, latDeg, lonDeg) - targetAlt;
        if (alt > 0) low = mid;
        else high = mid;
      }
      moonset = new Date((low + high) / 2);
    }

    prevAlt = currAlt;
  }

  return { moonrise, moonset };
}

/**
 * Moon phase angle and illuminated fraction
 */
export function getMoonIllumination(jd: number): {
  phaseAngleDeg: number;
  fraction: number;
  phaseName: string;
} {
  const sun = getSunPosition(jd);
  const moon = getMoonPosition(jd);

  const elongationDeg = normalizeDegrees(moon.longitudeDeg - sun.longitudeDeg);
  const dRad = elongationDeg * DEG_TO_RAD;

  const phaseAngleRad = Math.PI - dRad;
  const fraction = (1 + Math.cos(phaseAngleRad)) / 2;

  let phaseName = 'New Moon';
  if (elongationDeg > 0.5 && elongationDeg < 89.5) phaseName = 'Waxing Crescent';
  else if (elongationDeg >= 89.5 && elongationDeg <= 90.5) phaseName = 'First Quarter';
  else if (elongationDeg > 90.5 && elongationDeg < 179.5) phaseName = 'Waxing Gibbous';
  else if (elongationDeg >= 179.5 && elongationDeg <= 180.5) phaseName = 'Full Moon';
  else if (elongationDeg > 180.5 && elongationDeg < 269.5) phaseName = 'Waning Gibbous';
  else if (elongationDeg >= 269.5 && elongationDeg <= 270.5) phaseName = 'Last Quarter';
  else if (elongationDeg > 270.5 && elongationDeg < 359.5) phaseName = 'Waning Crescent';

  return {
    phaseAngleDeg: elongationDeg,
    fraction,
    phaseName,
  };
}
