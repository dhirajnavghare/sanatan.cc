'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculatePanchang, GeoLocation, PRESET_CITIES } from '@/app/lib/panchang';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import PanchangHero, { formatCivilDateShort } from './PanchangHero';
import PanchaAngaCards from './PanchaAngaCards';
import MuhurtaSection from './MuhurtaSection';
import ChoghadiyaSection from './ChoghadiyaSection';
import CalendarDetails from './CalendarDetails';
import FestivalsSection from './FestivalsSection';
import AstroParameters from './AstroParameters';
import LocationModal from './LocationModal';

function getTodayIso(tz: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export default function PanchangView() {
  // Default to Ujjain (the prime meridian of ancient Indian astronomy)
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  // Stable anchor ISO civil date string
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-10-31');
  const [currentTime, setCurrentTime] = useState<Date | undefined>(undefined);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load user saved location, ayanamsa, and current date on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const now = new Date();
      setCurrentTime(now);

      let activeLoc = PRESET_CITIES[0];
      try {
        const savedLoc = localStorage.getItem('panchang_custom_location');
        if (savedLoc) {
          const parsed = JSON.parse(savedLoc);
          if (
            typeof parsed.latitude === 'number' &&
            typeof parsed.longitude === 'number' &&
            parsed.timezone
          ) {
            activeLoc = parsed;
            setLocation(parsed);
          }
        }
        const savedAyan = localStorage.getItem('panchang_ayanamsa');
        if (savedAyan) {
          setAyanamsa(savedAyan as AyanamsaSystem);
        }
      } catch {}

      // Initialize selected date to today's civil date in observer's timezone
      setSelectedDateStr(getTodayIso(activeLoc.timezone || 'Asia/Kolkata'));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Compute Panchang data in real-time
  const panchangData = useMemo(() => {
    return calculatePanchang(selectedDateStr, location, ayanamsa, currentTime);
  }, [selectedDateStr, location, ayanamsa, currentTime]);

  const displayDateFormatted = useMemo(() => {
    return formatCivilDateShort(selectedDateStr);
  }, [selectedDateStr]);

  const shiftDay = (days: number) => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const nextDate = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
      setSelectedDateStr(nextDate.toISOString().slice(0, 10));
    }
  };

  const handleDateChange = (isoString: string) => {
    if (!isoString) return;
    if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
      setSelectedDateStr(isoString);
    }
  };

  const handleToday = () => {
    setSelectedDateStr(getTodayIso(location.timezone || 'Asia/Kolkata'));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-16">
      {/* Top Controls: Location & Date Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        {/* Location selector trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="location-modal-trigger"
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-100 hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            title="Configure exact Latitude, Longitude, Altitude, Timezone & Ayanamsa"
          >
            <span className="text-amber-500">📍</span>
            <span className="max-w-[180px] truncate sm:max-w-[240px]">{location.name}</span>
            <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[10px] font-mono dark:bg-zinc-700">
              {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
            </span>
            <span className="text-zinc-400">✏️</span>
          </button>
        </div>

        {/* Date Navigator */}
        <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
          <span
            className="hidden pr-2 text-xs font-medium text-zinc-500 sm:inline dark:text-zinc-400"
            suppressHydrationWarning
          >
            {displayDateFormatted}
          </span>

          <button
            type="button"
            data-testid="prev-day-button"
            onClick={() => shiftDay(-1)}
            aria-label="Previous Day"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Previous Day"
          >
            ‹
          </button>

          <input
            type="date"
            aria-label="Date Picker"
            data-testid="date-picker-input"
            value={mounted ? selectedDateStr : '2026-10-31'}
            onChange={(e) => handleDateChange(e.target.value)}
            className="min-w-[135px] rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-2 text-center text-xs font-semibold text-zinc-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          <button
            type="button"
            data-testid="next-day-button"
            onClick={() => shiftDay(1)}
            aria-label="Next Day"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Next Day"
          >
            ›
          </button>

          <button
            type="button"
            data-testid="today-button"
            onClick={handleToday}
            className="rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none"
          >
            Today
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <PanchangHero
        data={panchangData}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* 5 Limbs: Pancha-Anga Cards */}
      <PanchaAngaCards data={panchangData} />

      {/* Muhurta Section: Auspicious & Inauspicious Periods */}
      <MuhurtaSection data={panchangData} />

      {/* Choghadiya Section */}
      <ChoghadiyaSection data={panchangData} />

      {/* Calendar & Samvat Details */}
      <CalendarDetails data={panchangData} />

      {/* Festivals & Vrats */}
      <FestivalsSection
        data={panchangData}
        onSelectDate={(iso) => setSelectedDateStr(iso)}
      />

      {/* Mathematical & Astronomy Transparency */}
      <AstroParameters
        astronomy={panchangData.astronomy}
        location={location}
      />

      {/* Rigorous Calculation Disclaimer & Public Beta Notice */}
      <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 text-[11px] leading-relaxed text-zinc-600 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Public Beta
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              Open for Community &amp; Astronomical Validation
            </span>
          </div>

          <a
            href={`mailto:mail@sanatan.cc?subject=Panchang%20Beta%20Feedback%20%26%20Validation&body=Hi%20Sanatan.cc%20Team%2C%0A%0AI%20am%20testing%20the%20Panchang%20Beta%20calculator.%20Here%20is%20my%20feedback%20%2F%20observation%3A%0A%0A-%20Location%3A%20${encodeURIComponent(location.name)}%20(${location.latitude.toFixed(4)}%2C%20${location.longitude.toFixed(4)})%0A-%20Date%20Checked%3A%20${encodeURIComponent(selectedDateStr)}%0A-%20Observation%20%2F%20Discrepancy%3A%0A%0AThanks!`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none"
            title="Send calculation feedback or observations to mail@sanatan.cc"
          >
            <span>✉️</span>
            <span>Send Feedback (mail@sanatan.cc)</span>
          </a>
        </div>
        <p className="mt-2.5">
          This Panchang uses pure trigonometric ephemeris calculations (VSOP87 Solar &amp; Chapront ELP-2000 Lunar perturbation models with Lahiri Chitra Paksha ayanamsa) without tabular hardcoding. Planetary positions, sunrise/sunset, solar noon, and horizon crossings are computed locally for your exact latitude, longitude, and elevation with topocentric atmospheric refraction. Transitions represent the exact astronomical second when solilunar elongation or sidereal longitudes cross limb demarcations. We actively cross-validate against verified ephemerides (Drik Panchang, Positional Astronomy Centre NCAC, Astrosage, Date Panchang). We invite your observations and validation reports via <a href="mailto:mail@sanatan.cc" className="font-semibold text-amber-700 underline dark:text-amber-300">mail@sanatan.cc</a>.
        </p>
      </div>

      {/* Location Modal */}
      <LocationModal
        location={location}
        ayanamsa={ayanamsa}
        onLocationChange={(newLoc) => setLocation(newLoc)}
        onAyanamsaChange={(newAyan) => setAyanamsa(newAyan)}
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
}
