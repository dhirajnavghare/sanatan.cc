import { toJulianDay, getSunPosition, getMoonPosition, normalizeDegrees } from '../../app/lib/panchang/astronomy';

interface BenchmarkEpoch {
  name: string;
  utcString: string;
}

const EPOCHS: BenchmarkEpoch[] = [
  { name: 'Vernal Equinox 2024', utcString: '2024-03-20T12:00:00Z' },
  { name: 'Total Solar Eclipse 2024', utcString: '2024-04-08T18:18:00Z' },
  { name: 'Summer Solstice 2024', utcString: '2024-06-20T20:51:00Z' },
  { name: 'Autumn Equinox 2024', utcString: '2024-09-22T12:44:00Z' },
  { name: 'Winter Solstice 2024', utcString: '2024-12-21T09:20:00Z' },
  { name: 'Earth Perihelion 2025', utcString: '2025-01-04T12:00:00Z' },
  { name: 'Vernal Equinox 2025', utcString: '2025-03-20T09:01:00Z' },
  { name: 'Summer Solstice 2025', utcString: '2025-06-21T02:42:00Z' },
  { name: 'Autumn Equinox 2025', utcString: '2025-09-22T18:19:00Z' },
  { name: 'Winter Solstice 2025', utcString: '2025-12-21T15:03:00Z' },
  { name: 'Annular Solar Eclipse 2026', utcString: '2026-02-17T12:13:00Z' },
  { name: 'Total Lunar Eclipse 2026', utcString: '2026-03-03T11:34:00Z' },
  { name: 'Vernal Equinox 2026', utcString: '2026-03-20T14:46:00Z' },
  { name: 'Summer Solstice 2026', utcString: '2026-06-21T08:24:00Z' },
  { name: 'Total Solar Eclipse 2026', utcString: '2026-08-12T17:47:00Z' },
  { name: 'Vernal Equinox 2027', utcString: '2027-03-20T20:25:00Z' }
];

async function fetchHorizons(targetId: string, utcIso: string): Promise<{ lon: number; lat: number }> {
  // Format for Horizons: YYYY-MM-DD HH:MM
  const d = new Date(utcIso);
  const pad = (n: number) => String(n).padStart(2, '0');
  const startTime = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
  const dStop = new Date(d.getTime() + 60000);
  const stopTime = `${dStop.getUTCFullYear()}-${pad(dStop.getUTCMonth() + 1)}-${pad(dStop.getUTCDate())} ${pad(dStop.getUTCHours())}:${pad(dStop.getUTCMinutes())}`;

  const url = `https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='${targetId}'&EPHEM_TYPE='OBSERVER'&CENTER='500@399'&START_TIME='${encodeURIComponent(startTime)}'&STOP_TIME='${encodeURIComponent(stopTime)}'&STEP_SIZE='1m'&QUANTITIES='31'`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Horizons HTTP error: ${res.statusText}`);
  const text = await res.text();

  const match = text.match(/\$\$SOE\s*\n\s*([^ ]+)\s+([^ ]+)\s+([0-9.-]+)\s+([0-9.-]+)/);
  if (!match) {
    throw new Error(`Failed to parse Horizons response for ${targetId} at ${startTime}:\n${text.slice(0, 500)}`);
  }

  return {
    lon: parseFloat(match[3]),
    lat: parseFloat(match[4])
  };
}

async function runAudit() {
  console.log('='.repeat(100));
  console.log('NASA JPL HORIZONS vs SANATAN.CC ASTRONOMICAL EPHEMERIS AUDIT');
  console.log('='.repeat(100));
  console.log('Verifying Sun & Moon Geocentric Apparent Ecliptic Longitude across 16 critical epochs (2024-2027)\n');

  let maxSunErrorDeg = 0;
  let maxMoonErrorDeg = 0;
  let totalSunErrorDeg = 0;
  let totalMoonErrorDeg = 0;

  console.log(
    'Epoch'.padEnd(28) +
    'Date (UTC)'.padEnd(22) +
    'Sun JPL°'.padEnd(12) +
    'Sun Calc°'.padEnd(12) +
    'Sun Δ (")'.padEnd(12) +
    'Moon JPL°'.padEnd(12) +
    'Moon Calc°'.padEnd(12) +
    'Moon Δ (")'
  );
  console.log('-'.repeat(120));

  for (const ep of EPOCHS) {
    const d = new Date(ep.utcString);
    const jd = toJulianDay(d);

    const calcSun = getSunPosition(jd);
    const calcMoon = getMoonPosition(jd);

    // Rate-limit friendly delay
    await new Promise(r => setTimeout(r, 250));

    const jplSun = await fetchHorizons('10', ep.utcString);
    await new Promise(r => setTimeout(r, 250));
    const jplMoon = await fetchHorizons('301', ep.utcString);

    // Calculate angular differences taking wrap-around into account
    let sunDiff = Math.abs(normalizeDegrees(calcSun.longitudeDeg) - normalizeDegrees(jplSun.lon));
    if (sunDiff > 180) sunDiff = 360 - sunDiff;
    const sunDiffArcsec = sunDiff * 3600;

    let moonDiff = Math.abs(normalizeDegrees(calcMoon.longitudeDeg) - normalizeDegrees(jplMoon.lon));
    if (moonDiff > 180) moonDiff = 360 - moonDiff;
    const moonDiffArcsec = moonDiff * 3600;

    maxSunErrorDeg = Math.max(maxSunErrorDeg, sunDiff);
    maxMoonErrorDeg = Math.max(maxMoonErrorDeg, moonDiff);
    totalSunErrorDeg += sunDiff;
    totalMoonErrorDeg += moonDiff;

    console.log(
      ep.name.padEnd(28) +
      ep.utcString.slice(0, 16).padEnd(22) +
      jplSun.lon.toFixed(4).padEnd(12) +
      calcSun.longitudeDeg.toFixed(4).padEnd(12) +
      sunDiffArcsec.toFixed(1).padEnd(12) +
      jplMoon.lon.toFixed(4).padEnd(12) +
      calcMoon.longitudeDeg.toFixed(4).padEnd(12) +
      moonDiffArcsec.toFixed(1)
    );
  }

  const n = EPOCHS.length;
  const avgSunErrorArcsec = (totalSunErrorDeg / n) * 3600;
  const avgMoonErrorArcsec = (totalMoonErrorDeg / n) * 3600;

  console.log('-'.repeat(120));
  console.log(`SUMMARY RESULTS (${n} Epochs):`);
  console.log(`• Sun Mean Error: ${avgSunErrorArcsec.toFixed(2)} arcsec (${(totalSunErrorDeg / n).toFixed(5)}°) | Max Error: ${(maxSunErrorDeg * 3600).toFixed(2)} arcsec (${maxSunErrorDeg.toFixed(5)}°)`);
  console.log(`• Moon Mean Error: ${avgMoonErrorArcsec.toFixed(2)} arcsec (${(totalMoonErrorDeg / n).toFixed(5)}°) | Max Error: ${(maxMoonErrorDeg * 3600).toFixed(2)} arcsec (${maxMoonErrorDeg.toFixed(5)}°)`);
  console.log(`• Sun Status: ${maxSunErrorDeg < 0.02 ? '✅ PASS (Within VSOP87 analytical limits < 0.02°)' : '❌ FAIL'}`);
  console.log(`• Moon Status: ${maxMoonErrorDeg < 0.025 ? '✅ PASS (Within ELP-2000 truncated series limits < 0.025°)' : '❌ FAIL'}`);
  console.log('='.repeat(100));
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
