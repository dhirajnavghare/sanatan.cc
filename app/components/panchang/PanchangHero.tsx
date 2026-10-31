'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import MoonVisualizer from './MoonVisualizer';

interface PanchangHeroProps {
  data: PanchangData;
  onOpenLocationModal: () => void;
}

export function formatPanchangTime(
  date: Date | null,
  timezone: string,
  options?: { showDate?: boolean; short?: boolean }
): string {
  if (!date) return '—';
  try {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      ...(options?.showDate ? { month: 'short', day: 'numeric' } : {}),
    });
    return formatter.format(date).toUpperCase();
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

export default function PanchangHero({ data, onOpenLocationModal }: PanchangHeroProps) {
  const { tithi, vara, masa, sunTimes, moonTimes, location, festivals } = data;
  const majorFestivals = festivals.filter((f) => f.isMajor);

  // Format calendar date in observer's timezone
  const dateFormatted = new Intl.DateTimeFormat('en-IN', {
    timeZone: location.timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(data.date);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16173d] via-[#1c1e50] to-[#0d0e26] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      {/* Decorative celestial background aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
        {/* Left Side: Headline & Tithi */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tracking-wide text-amber-400 sm:text-3xl">
              पञ्चाङ्गम्
            </span>
            <button
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-amber-400/20"
              title="Click to edit precise coordinates or change location"
            >
              <span>📍</span>
              <span className="max-w-[200px] truncate">{location.name}</span>
              <span className="text-[10px] text-amber-400/80">({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)</span>
            </button>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {tithi.current.name} <span className="text-xl font-normal text-amber-300 sm:text-2xl">({tithi.current.nameDevanagari})</span>
          </h1>

          <p className="text-sm text-indigo-200 sm:text-base">
            <span className="font-medium text-white">{tithi.current.paksha}</span> ({tithi.current.pakshaDevanagari}) •{' '}
            <span className="font-medium text-white">{masa.amantaName}</span> (Amanta) •{' '}
            <span className="font-medium text-amber-200">{vara.name}</span> ({vara.nameDevanagari})
          </p>

          <p className="text-xs text-indigo-300">
            {dateFormatted} • Coordinates: {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E (Alt: {location.altitude}m)
          </p>

          {/* Major Festival highlight */}
          {majorFestivals.length > 0 && (
            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-xl bg-amber-500/20 px-3.5 py-1.5 ring-1 ring-amber-400/40">
              <span className="text-xs font-semibold text-amber-300">उत्सव / Parva:</span>
              {majorFestivals.map((f, i) => (
                <span key={i} className="text-xs font-bold text-amber-100">
                  {f.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Moon Phase Visualization */}
        <div className="flex flex-none items-center justify-center md:pr-4">
          <MoonVisualizer
            phaseAngleDeg={moonTimes.phaseAngleDeg}
            illuminationFraction={moonTimes.illuminationFraction}
            phaseName={moonTimes.phaseName}
            size={96}
          />
        </div>
      </div>

      {/* Sun & Moon Grid */}
      <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            🌅 Sunrise (सूर्योदय)
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl">
            {formatPanchangTime(sunTimes.sunrise, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">Dawn: {formatPanchangTime(sunTimes.civilDawn, location.timezone)}</span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            🌇 Sunset (सूर्यास्त)
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl">
            {formatPanchangTime(sunTimes.sunset, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">Dusk: {formatPanchangTime(sunTimes.civilDusk, location.timezone)}</span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            ☀️ Solar Noon (मध्याह्न)
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl">
            {formatPanchangTime(sunTimes.solarNoon, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">Day length: {Math.floor(sunTimes.dayLengthMs / 3600000)}h {Math.floor((sunTimes.dayLengthMs % 3600000) / 60000)}m</span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            🌕 Moonrise (चन्द्रोदय)
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl">
            {formatPanchangTime(moonTimes.moonrise, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">Age: {moonTimes.moonAgeDays.toFixed(1)} days</span>
        </div>

        <div className="col-span-2 rounded-2xl bg-white/5 p-3 backdrop-blur-sm sm:col-span-4 lg:col-span-1">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            🌑 Moonset (चन्द्रास्त)
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl">
            {formatPanchangTime(moonTimes.moonset, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">Night: {Math.floor(sunTimes.nightLengthMs / 3600000)}h {Math.floor((sunTimes.nightLengthMs % 3600000) / 60000)}m</span>
        </div>
      </div>
    </div>
  );
}
