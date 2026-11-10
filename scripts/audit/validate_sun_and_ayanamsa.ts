import { calculateSunTimes, toJulianDay } from '../../app/lib/panchang/astronomy';
import { getAyanamsa } from '../../app/lib/panchang/ayanamsa';

interface AyanamsaRef {
  year: number;
  dateStr: string;
  expectedLahiriDeg: number;
  expectedLahiriDms: string;
}

// Benchmark references from Positional Astronomy Centre (Kolkata) / Indian Astronomical Ephemeris / Drik Panchang
const AYANAMSA_BENCHMARKS: AyanamsaRef[] = [
  { year: 2024, dateStr: '2024-01-01T00:00:00Z', expectedLahiriDeg: 24.1883, expectedLahiriDms: '24° 11′ 18″' },
  { year: 2025, dateStr: '2025-01-01T00:00:00Z', expectedLahiriDeg: 24.2023, expectedLahiriDms: '24° 12′ 08″' },
  { year: 2026, dateStr: '2026-01-01T00:00:00Z', expectedLahiriDeg: 24.2163, expectedLahiriDms: '24° 12′ 59″' },
  { year: 2027, dateStr: '2027-01-01T00:00:00Z', expectedLahiriDeg: 24.2302, expectedLahiriDms: '24° 13′ 49″' },
];

function degToDms(deg: number): string {
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = ((mFloat - m) * 60).toFixed(1);
  return `${d}° ${m}′ ${s}″`;
}

interface CityBenchmark {
  name: string;
  lat: number;
  lon: number;
  alt: number;
  tz: string;
}

const CITIES: CityBenchmark[] = [
  { name: 'Ujjain (Avantika, Standard Meridian)', lat: 23.1765, lon: 75.7885, alt: 491, tz: 'Asia/Kolkata' },
  { name: 'New Delhi (Capital)', lat: 28.6139, lon: 77.2090, alt: 216, tz: 'Asia/Kolkata' },
  { name: 'Varanasi (Kashi)', lat: 25.3176, lon: 82.9739, alt: 80, tz: 'Asia/Kolkata' },
  { name: 'Bengaluru (South India)', lat: 12.9716, lon: 77.5946, alt: 920, tz: 'Asia/Kolkata' },
  { name: 'London, UK (Greenwich)', lat: 51.5074, lon: -0.1278, alt: 11, tz: 'Europe/London' },
  { name: 'New York, USA (EST)', lat: 40.7128, lon: -74.0060, alt: 10, tz: 'America/New_York' },
];

const SEASONS = [
  { name: 'Vernal Equinox 2026', y: 2026, m: 3, d: 20 },
  { name: 'Summer Solstice 2026', y: 2026, m: 6, d: 21 },
  { name: 'Autumn Equinox 2026', y: 2026, m: 9, d: 22 },
  { name: 'Winter Solstice 2026', y: 2026, m: 12, d: 21 },
];

async function runValidation() {
  console.log('='.repeat(100));
  console.log('AYANAMSA & SOLAR PHENOMENOLOGY VALIDATION');
  console.log('='.repeat(100));

  console.log('\n--- 1. AYANAMSA BENCHMARK AUDIT (Lahiri / NCAC / Drik Panchang) ---');
  console.log('Year'.padEnd(8) + 'Date'.padEnd(24) + 'Ref DMS'.padEnd(16) + 'Calc DMS'.padEnd(16) + 'Calc Deg'.padEnd(14) + 'Δ (arcsec)'.padEnd(14) + 'Status');
  console.log('-'.repeat(95));

  for (const b of AYANAMSA_BENCHMARKS) {
    const jd = toJulianDay(new Date(b.dateStr));
    const lahiri = getAyanamsa(jd, 'Lahiri');
    const dms = degToDms(lahiri);
    const diffArcsec = Math.abs(lahiri - b.expectedLahiriDeg) * 3600;
    const pass = diffArcsec < 3.0; // Under 3 arcseconds agreement

    console.log(
      String(b.year).padEnd(8) +
      b.dateStr.padEnd(24) +
      b.expectedLahiriDms.padEnd(16) +
      dms.padEnd(16) +
      lahiri.toFixed(5).padEnd(14) +
      diffArcsec.toFixed(2).padEnd(14) +
      (pass ? '✅ PASS' : '❌ FAIL')
    );
  }

  // Cross-compare systems for 2026-01-01
  const jd2026 = toJulianDay(new Date('2026-01-01T00:00:00Z'));
  console.log('\n--- Multi-System Comparison at 2026-01-01T00:00:00Z ---');
  const systems: Array<'Lahiri' | 'KP' | 'Raman' | 'TrueChitra' | 'Sayana'> = ['Lahiri', 'KP', 'Raman', 'TrueChitra', 'Sayana'];
  for (const s of systems) {
    const val = getAyanamsa(jd2026, s);
    console.log(`• System: ${s.padEnd(12)} = ${val.toFixed(6)}° (${degToDms(val)})`);
  }

  console.log('\n--- 2. SOLAR TIMES & DAY LENGTH ACROSS GLOBAL LATITUDES (2026) ---');
  for (const season of SEASONS) {
    console.log(`\nSeason: ${season.name} (${season.y}-${String(season.m).padStart(2, '0')}-${String(season.d).padStart(2, '0')})`);
    console.log('City'.padEnd(36) + 'Sunrise'.padEnd(14) + 'Sunset'.padEnd(14) + 'Solar Noon'.padEnd(14) + 'Day Duration'.padEnd(16) + 'Civil Dawn');
    console.log('-'.repeat(105));

    for (const city of CITIES) {
      const times = calculateSunTimes(season.y, season.m, season.d, city.lat, city.lon, city.alt, false);
      const fmt = (d: Date | null) => d ? d.toLocaleTimeString('en-US', { timeZone: city.tz, hour12: true, hour: '2-digit', minute: '2-digit' }) : 'N/A';

      let durationStr = 'N/A';
      if (times.sunrise && times.sunset) {
        const diffMs = times.sunset.getTime() - times.sunrise.getTime();
        const hrs = Math.floor(diffMs / 3600000);
        const mins = Math.floor((diffMs % 3600000) / 60000);
        durationStr = `${hrs}h ${mins}m`;
      }

      console.log(
        city.name.padEnd(36) +
        fmt(times.sunrise).padEnd(14) +
        fmt(times.sunset).padEnd(14) +
        fmt(times.solarNoon).padEnd(14) +
        durationStr.padEnd(16) +
        fmt(times.civilDawn)
      );
    }
  }

  console.log('='.repeat(100));
}

runValidation().catch(console.error);
