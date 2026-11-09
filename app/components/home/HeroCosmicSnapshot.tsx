'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { GeoLocation, PanchangData } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { calculatePanchang } from '@/app/lib/panchang';

interface HeroCosmicSnapshotProps {
  location: GeoLocation;
  onLocationChange: (loc: GeoLocation) => void;
}

export default function HeroCosmicSnapshot({
  location,
  onLocationChange,
}: HeroCosmicSnapshotProps) {
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Compute live panchang data instantly
  const panchang: PanchangData = useMemo(() => {
    return calculatePanchang(currentTime, location, 'Lahiri', currentTime);
  }, [currentTime, location]);

  // Determine current active Choghadiya
  const currentChoghadiya = useMemo(() => {
    const all = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
    return all.find((c) => c.isCurrent) || all[0];
  }, [panchang]);

  // Determine if Rahu Kaal or Abhijit is active right now
  const activeSpecialWindow = useMemo(() => {
    const nowMs = currentTime.getTime();
    const rahu = panchang.muhurtas.rahuKaal;
    const abhijit = panchang.muhurtas.abhijitMuhurta;

    if (nowMs >= rahu.startTime.getTime() && nowMs <= rahu.endTime.getTime()) {
      return {
        type: 'rahu',
        title: '⚠️ Rahu Kaal Currently Active',
        desc: `Avoid starting significant ventures until ${formatTimeShort(rahu.endTime, location.timezone)}`,
        badgeClass: 'bg-red-500/20 text-red-200 border-red-500/30',
      };
    }

    if (abhijit && nowMs >= abhijit.startTime.getTime() && nowMs <= abhijit.endTime.getTime()) {
      return {
        type: 'abhijit',
        title: '🌟 Abhijit Muhurta Active Right Now',
        desc: `Most auspicious midday victory window (until ${formatTimeShort(abhijit.endTime, location.timezone)})`,
        badgeClass: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
      };
    }

    if (currentChoghadiya) {
      const isGood =
        currentChoghadiya.quality === 'Amrit' ||
        currentChoghadiya.quality === 'Shubh' ||
        currentChoghadiya.quality === 'Labh';
      return {
        type: 'choghadiya',
        title: `${isGood ? '🟢' : '⚪'} ${currentChoghadiya.name} Choghadiya Active (${currentChoghadiya.quality})`,
        desc: `Ruling: ${currentChoghadiya.ruler} • Ends at ${formatTimeShort(currentChoghadiya.endTime, location.timezone)}`,
        badgeClass: isGood
          ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
          : 'bg-white/10 text-indigo-200 border-white/20',
      };
    }

    return null;
  }, [currentTime, panchang, currentChoghadiya, location.timezone]);

  // GPS Geolocation Handler
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingLocation(false);
        const { latitude, longitude } = pos.coords;
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
        const customLoc: GeoLocation = {
          name: 'My GPS Location',
          latitude,
          longitude,
          timezone: tz,
          altitude: 0,
        };
        onLocationChange(customLoc);
        try {
          localStorage.setItem('panchang_custom_location', JSON.stringify(customLoc));
        } catch {}
      },
      (err) => {
        setIsDetectingLocation(false);
        setGpsError('Unable to retrieve your location: ' + err.message);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Format formatted date string
  const formattedDateStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: location.timezone,
      }).format(currentTime);
    } catch {
      return currentTime.toDateString();
    }
  }, [currentTime, location.timezone]);

  // Format local clock time
  const localClockStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: location.timezone,
      }).format(currentTime);
    } catch {
      return currentTime.toLocaleTimeString();
    }
  }, [currentTime, location.timezone]);

  const topCities = [
    PRESET_CITIES.find((c) => c.name === 'New Delhi') || PRESET_CITIES[0],
    PRESET_CITIES.find((c) => c.name === 'Varanasi') || PRESET_CITIES[1],
    PRESET_CITIES.find((c) => c.name === 'Ayodhya') || PRESET_CITIES[2],
    PRESET_CITIES.find((c) => c.name === 'Ujjain') || PRESET_CITIES[3],
    PRESET_CITIES.find((c) => c.name === 'Mumbai') || PRESET_CITIES[4],
    PRESET_CITIES.find((c) => c.name === 'Bengaluru') || PRESET_CITIES[5],
    PRESET_CITIES.find((c) => c.name === 'London') || PRESET_CITIES[10],
    PRESET_CITIES.find((c) => c.name === 'New York') || PRESET_CITIES[11],
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e1028] via-[#161845] to-[#0a0b1d] p-6 text-white shadow-2xl ring-1 ring-white/15 sm:p-10">
      {/* Luminous Ambient Background Glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Control Bar: City Selector, GPS, & Live Time */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-base text-amber-300">
              📍
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-zinc-300">Coordinates:</span>
              <select
                aria-label="Select location"
                value={location.name}
                onChange={(e) => {
                  const match = PRESET_CITIES.find((c) => c.name === e.target.value);
                  if (match) onLocationChange(match);
                }}
                className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md outline-none transition hover:bg-white/15 cursor-pointer dark:bg-zinc-800"
              >
                {PRESET_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-zinc-900 text-white">
                    {c.name} ({c.timezone.split('/')[1] || c.timezone})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isDetectingLocation}
                title="Detect your exact coordinates via browser GPS"
                className="inline-flex items-center gap-1 rounded-xl border border-amber-400/30 bg-amber-500/20 px-2.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/30 disabled:opacity-50 cursor-pointer"
              >
                <span>{isDetectingLocation ? '⏳' : '🎯'}</span>
                <span>{isDetectingLocation ? 'Locating...' : 'Use My GPS'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono font-bold tracking-wider text-emerald-300">{localClockStr}</span>
              <span className="text-[10px] text-zinc-400">({location.timezone.split('/')[1] || location.timezone})</span>
            </div>
          </div>
        </div>

        {gpsError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {gpsError}
          </div>
        )}

        {/* Quick City Pills for Instant One-Click Switching */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-zinc-400">Quick Sacred Centers:</span>
          {topCities.map((c) => {
            const isSelected = location.name === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => onLocationChange(c)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'border border-amber-400/50 bg-amber-500/30 text-amber-200 shadow-sm'
                    : 'border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-white'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Main Hero Header */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
              <span>ॐ</span>
              <span>आज का वैदिक पञ्चाङ्ग</span>
            </span>

            {/* Live Auspicious Status Pill */}
            {activeSpecialWindow && (
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${activeSpecialWindow.badgeClass}`}
              >
                <span className="text-xs">{activeSpecialWindow.title}</span>
                <span className="hidden opacity-80 sm:inline">• {activeSpecialWindow.desc}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {formattedDateStr}
              </h1>
              <p className="mt-1 text-sm font-medium text-amber-300/90 sm:text-base">
                {panchang.masa.purnimantaName} मास • {panchang.tithi.current.paksha} पक्ष • विक्रम संवत् {panchang.samvat.vikramSamvat} • शक संवत् {panchang.samvat.shakaSamvat}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/panchang?date=${panchang.isoDate}&lat=${location.latitude}&lon=${location.longitude}&tz=${location.timezone}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/30 transition hover:from-amber-600 hover:to-amber-700 cursor-pointer"
              >
                <span>Open Full Panchang</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/muhurta"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <span>Find Muhurta</span>
                <span>✨</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 5 Sacred Limbs (Pancha-Anga) Live Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Limb 1: Tithi */}
          <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                <span>1. Tithi (तिथि)</span>
                <span>🌙</span>
              </div>
              <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                {panchang.tithi.current.name}
              </h2>
              <p className="text-xs text-indigo-200">
                {panchang.tithi.current.nameDevanagari} ({panchang.tithi.current.paksha})
              </p>
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
              <span>Ends: </span>
              <span className="font-semibold text-white">
                {formatTimeShort(panchang.tithi.endTime, location.timezone)}
              </span>
            </div>
          </div>

          {/* Limb 2: Nakshatra */}
          <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                <span>2. Nakshatra (नक्षत्र)</span>
                <span>✨</span>
              </div>
              <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                {panchang.nakshatra.current.name}
              </h2>
              <p className="text-xs text-indigo-200">
                {panchang.nakshatra.current.nameDevanagari} • Pada {panchang.nakshatra.current.pada}
              </p>
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
              <span>Lord: </span>
              <span className="font-semibold text-white">{panchang.nakshatra.current.lord}</span>
            </div>
          </div>

          {/* Limb 3: Yoga */}
          <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                <span>3. Yoga (योग)</span>
                <span>🕉️</span>
              </div>
              <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                {panchang.yoga.current.name}
              </h2>
              <p className="text-xs text-indigo-200">
                {panchang.yoga.current.nameDevanagari}
              </p>
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
              <span>Quality: </span>
              <span className="font-semibold text-white">{panchang.yoga.current.nature}</span>
            </div>
          </div>

          {/* Limb 4: Karana */}
          <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                <span>4. Karana (करण)</span>
                <span>⚡</span>
              </div>
              <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                {panchang.karana.current.name}
              </h2>
              <p className="text-xs text-indigo-200">
                {panchang.karana.current.nameDevanagari}
              </p>
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
              <span>Type: </span>
              <span className="font-semibold text-white">{panchang.karana.current.type}</span>
            </div>
          </div>

          {/* Limb 5: Vara */}
          <div className="group flex flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/15 col-span-2 sm:col-span-1">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-orange-300 uppercase tracking-wider">
                <span>5. Vara (वार)</span>
                <span>☀️</span>
              </div>
              <h2 className="mt-1 font-serif text-lg font-bold text-white sm:text-xl">
                {panchang.vara.englishName}
              </h2>
              <p className="text-xs text-indigo-200">
                {panchang.vara.name} ({panchang.vara.nameDevanagari})
              </p>
            </div>
            <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-zinc-300">
              <span>Graha: </span>
              <span className="font-semibold text-white">{panchang.vara.lordPlanet}</span>
            </div>
          </div>
        </div>

        {/* Solar & Lunar Ephemeris Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs backdrop-blur-md">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌅</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Sunrise</span>
                <p className="font-mono font-bold text-amber-200">
                  {formatTimeShort(panchang.sunTimes.sunrise, location.timezone)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg">🌇</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Sunset</span>
                <p className="font-mono font-bold text-orange-200">
                  {formatTimeShort(panchang.sunTimes.sunset, location.timezone)}
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <span className="text-lg">⌛</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Day Length</span>
                <p className="font-mono font-bold text-zinc-200">
                  {Math.floor(panchang.sunTimes.dayLengthMs / 3600000)}h {Math.floor((panchang.sunTimes.dayLengthMs % 3600000) / 60000)}m
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌙</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Moon Phase</span>
                <p className="font-bold text-zinc-200">
                  {panchang.moonTimes.phaseName} ({(panchang.moonTimes.illuminationFraction * 100).toFixed(0)}%)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg">🌟</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400">Abhijit Muhurta</span>
                <p className="font-mono font-bold text-amber-300">
                  {panchang.muhurtas.abhijitMuhurta
                    ? `${formatTimeShort(panchang.muhurtas.abhijitMuhurta.startTime, location.timezone)} - ${formatTimeShort(panchang.muhurtas.abhijitMuhurta.endTime, location.timezone)}`
                    : 'Not today'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-red-300">Rahu Kaal</span>
                <p className="font-mono font-bold text-red-300">
                  {formatTimeShort(panchang.muhurtas.rahuKaal.startTime, location.timezone)} - {formatTimeShort(panchang.muhurtas.rahuKaal.endTime, location.timezone)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTimeShort(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
