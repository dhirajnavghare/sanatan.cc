'use client';

import { useState } from 'react';
import { AstronomicalDetails, GeoLocation } from '@/app/lib/panchang/types';

interface AstroParametersProps {
  astronomy: AstronomicalDetails;
  location: GeoLocation;
}

function formatDMS(deg: number): string {
  const norm = ((deg % 360) + 360) % 360;
  const d = Math.floor(norm);
  const minFloat = (norm - d) * 60;
  const m = Math.floor(minFloat);
  const s = ((minFloat - m) * 60).toFixed(2);
  return `${d}° ${m}' ${s}"`;
}

export default function AstroParameters({ astronomy, location }: AstroParametersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
            <span>🔬 Mathematical & Astronomical Transparency Engine</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            World-class real-time ephemeris calculations without tabular hardcoding
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
        >
          <span>{isExpanded ? 'Hide Ephemeris Metrics ▲' : 'View High-Precision Ephemeris Metrics ▼'}</span>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4 text-xs sm:grid-cols-3 lg:grid-cols-4 dark:border-zinc-800">
          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Julian Day (JD at Sunrise)</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.julianDay.toFixed(6)}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Delta T (ΔT = TT - UT1)</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              +{astronomy.deltaTSeconds.toFixed(2)} seconds
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">
              Ayanamsa ({astronomy.ayanamsaType})
            </span>
            <span className="mt-1 block font-mono font-bold text-amber-600 dark:text-amber-400">
              {formatDMS(astronomy.ayanamsaValueDeg)}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Observer Horizon Dip</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.topocentricHorizonDipDeg.toFixed(4)}° (Alt: {location.altitude}m)
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Sun Apparent Sidereal</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {formatDMS(astronomy.sunSiderealLonDeg)}
            </span>
            <span className="text-[10px] text-zinc-400">Tropical: {formatDMS(astronomy.sunTropicalLonDeg)}</span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Moon Apparent Sidereal</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {formatDMS(astronomy.moonSiderealLonDeg)}
            </span>
            <span className="text-[10px] text-zinc-400">Tropical: {formatDMS(astronomy.moonTropicalLonDeg)}</span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Sun Equatorial (RA / Dec)</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.sunRightAscensionDeg.toFixed(2)}° / {astronomy.sunDeclinationDeg.toFixed(2)}°
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Moon Equatorial (RA / Dec)</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.moonRightAscensionDeg.toFixed(2)}° / {astronomy.moonDeclinationDeg.toFixed(2)}°
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Equation of Time</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.equationOfTimeMinutes > 0 ? '+' : ''}{astronomy.equationOfTimeMinutes.toFixed(2)} min
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Lunar Distance</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {Math.round(astronomy.moonDistanceKm).toLocaleString()} km
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Solar Distance</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.sunDistanceAU.toFixed(5)} AU
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Moon Ecliptic Latitude</span>
            <span className="mt-1 block font-mono font-bold text-zinc-900 dark:text-zinc-100">
              {astronomy.moonLatitudeDeg > 0 ? '+' : ''}{astronomy.moonLatitudeDeg.toFixed(4)}°
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
