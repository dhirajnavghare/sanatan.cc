import { getJulianCenturies } from './astronomy';

export type AyanamsaSystem = 'Lahiri' | 'TrueChitra' | 'KP' | 'Raman' | 'Sayana';

/**
 * Calculate Ayanamsa in degrees for a given Julian Day
 *
 * Lahiri (Chitra Paksha):
 * At J2000.0 (JD 2451545.0), Lahiri Ayanamsa = 23° 51' 25.53" = 23.857092°
 * (or standard NCAC: 23.85307° with precession rate 50.29 arcsec/yr)
 */
export function getAyanamsa(jd: number, system: AyanamsaSystem = 'Lahiri'): number {
  if (system === 'Sayana') return 0;

  const T = getJulianCenturies(jd);

  // Standard Lahiri (NCAC)
  const lahiri = 23.85307 + 1.396042 * T + 0.000308 * T * T;

  switch (system) {
    case 'Lahiri':
      return lahiri;

    case 'KP':
      // Krishnamurti Ayanamsa differs by ~6 arcmin from Lahiri
      return lahiri - 0.098333;

    case 'Raman':
      // B.V. Raman Ayanamsa
      return 22.463 + 1.396042 * T;

    case 'TrueChitra':
      // True Chitra positions Spica (Alpha Virginis) exactly at 180° sidereal
      // Mean longitude of Spica: 201.298° at J2000.0, precession ~1.396°/century
      const spicaTropical = 201.2983 + 1.3960 * T;
      return spicaTropical - 180.0;

    default:
      return lahiri;
  }
}
