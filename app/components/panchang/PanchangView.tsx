'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculatePanchang, GeoLocation, PRESET_CITIES } from '@/app/lib/panchang';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import PanchangHero from './PanchangHero';
import PanchaAngaCards from './PanchaAngaCards';
import MuhurtaSection from './MuhurtaSection';
import ChoghadiyaSection from './ChoghadiyaSection';
import CalendarDetails from './CalendarDetails';
import FestivalsSection from './FestivalsSection';
import AstroParameters from './AstroParameters';
import LocationModal from './LocationModal';

function formatIsoDate(d: Date, tz: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);
    return parts; // YYYY-MM-DD
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export default function PanchangView() {
  // Default to Ujjain (the ancient zero meridian of Vedic astronomy)
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  // Stable anchor date for SSR/prerender:
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(Date.UTC(2026, 9, 31, 6, 0, 0)));
  const [currentTime, setCurrentTime] = useState<Date | undefined>(undefined);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load user saved location, ayanamsa, and current date on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const now = new Date();
      setSelectedDate(now);
      setCurrentTime(now);

      try {
        const savedLoc = localStorage.getItem('panchang_custom_location');
        if (savedLoc) {
          const parsed = JSON.parse(savedLoc);
          if (parsed.latitude !== undefined && parsed.longitude !== undefined) {
            setLocation(parsed);
          }
        }
        const savedAyan = localStorage.getItem('panchang_ayanamsa');
        if (savedAyan) {
          setAyanamsa(savedAyan as AyanamsaSystem);
        }
      } catch {}
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Compute Panchang data in real-time
  const panchangData = useMemo(() => {
    return calculatePanchang(selectedDate, location, ayanamsa, currentTime);
  }, [selectedDate, location, ayanamsa, currentTime]);

  const dateInputValue = useMemo(() => {
    return formatIsoDate(selectedDate, location.timezone);
  }, [selectedDate, location.timezone]);

  const handleDateChange = (isoString: string) => {
    if (!isoString) return;
    const [y, m, d] = isoString.split('-').map(Number);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      setSelectedDate(new Date(Date.UTC(y, m - 1, d, 12, 0, 0)));
    }
  };

  const shiftDay = (days: number) => {
    const curMs = selectedDate.getTime();
    setSelectedDate(new Date(curMs + days * 86400000));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 pb-16">
      {/* Top Controls: Location & Date Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        {/* Location selector trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
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
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => shiftDay(-1)}
            aria-label="Previous Day"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            ‹
          </button>

          <input
            type="date"
            aria-label="Date Picker"
            value={mounted ? dateInputValue : ''}
            onChange={(e) => handleDateChange(e.target.value)}
            className="min-w-[140px] rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-xs font-semibold text-zinc-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          <button
            type="button"
            onClick={() => shiftDay(1)}
            aria-label="Next Day"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            ›
          </button>

          <button
            type="button"
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
        onSelectDate={(d) => setSelectedDate(d)}
      />

      {/* Mathematical & Astronomy Transparency */}
      <AstroParameters
        astronomy={panchangData.astronomy}
        location={location}
      />

      {/* Rigorous Calculation Disclaimer */}
      <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-4 text-[11px] leading-relaxed text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:text-zinc-400">
        <p className="font-semibold text-zinc-700 dark:text-zinc-300">
          Precision Astronomical Model:
        </p>
        <p className="mt-1">
          This Panchang uses full trigonometric ephemeris calculations (VSOP87 Solar &amp; Chapront ELP-2000 Lunar perturbation models with Lahiri Chitra Paksha ayanamsa). Planetary positions, sunrise/sunset, solar noon, and horizon crossings are computed locally for your exact latitude, longitude, and elevation with topocentric atmospheric refraction. Transitions represent the exact astronomical second when solilunar elongation or sidereal longitudes cross limb demarcations.
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
