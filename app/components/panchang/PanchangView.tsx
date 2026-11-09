'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import { GeoLocation, PanchangData } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import PanchangHero, { formatCivilDateShort } from './PanchangHero';
import PanchaAngaCards from './PanchaAngaCards';
import MuhurtaSection from './MuhurtaSection';
import ChoghadiyaSection from './ChoghadiyaSection';
import CalendarDetails from './CalendarDetails';
import FestivalsSection from './FestivalsSection';
import AstroParameters from './AstroParameters';
import LocationModal from './LocationModal';
import PanchangSkeleton from './PanchangSkeleton';

function getTodayIso(tz?: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: tz || 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function parseJsonWithDates(text: string): PanchangData {
  return JSON.parse(text, (_key, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value);
    }
    return value;
  });
}

export default function PanchangView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => getTodayIso());
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 1. Sync saved location/ayanamsa/date from localStorage and URL after mount
  useEffect(() => {
    const timer = setTimeout(() => {
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

      try {
        const params = new URLSearchParams(window.location.search);
        const queryDate = params.get('date');
        if (queryDate && /^\d{4}-\d{2}-\d{2}$/.test(queryDate)) {
          setSelectedDateStr(queryDate);
        } else {
          setSelectedDateStr(getTodayIso(activeLoc.timezone));
        }
      } catch {}
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 2. Fetch computed Panchang from high-speed backend API
  useEffect(() => {
    let isCancelled = false;

    const fetchPanchang = async () => {
      try {
        const query = new URLSearchParams({
          date: selectedDateStr,
          lat: String(location.latitude),
          lon: String(location.longitude),
          alt: String(location.altitude ?? 0),
          tz: location.timezone,
          ayanamsa,
          dip: String(!!location.useElevationDip),
          name: location.name,
        });

        const res = await fetch(`/api/panchang?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to load Panchang from backend');
        const text = await res.text();
        const data = parseJsonWithDates(text);

        if (!isCancelled) {
          startTransition(() => {
            setPanchangData(data);
            setIsLoading(false);
          });
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPanchang();
    return () => {
      isCancelled = true;
    };
  }, [selectedDateStr, location, ayanamsa]);

  const displayDateFormatted = useMemo(() => {
    return formatCivilDateShort(selectedDateStr, language);
  }, [selectedDateStr, language]);

  const updateSelectedDate = (newDateStr: string) => {
    setSelectedDateStr(newDateStr);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('date', newDateStr);
      window.history.replaceState(null, '', url.pathname + url.search);
    } catch {}
  };

  const shiftDay = (days: number) => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      const nextDate = new Date(Date.UTC(y, m - 1, d + days, 12, 0, 0));
      updateSelectedDate(nextDate.toISOString().slice(0, 10));
    }
  };

  const handleDateChange = (isoString: string) => {
    if (!isoString) return;
    if (/^\d{4}-\d{2}-\d{2}$/.test(isoString)) {
      updateSelectedDate(isoString);
    }
  };

  const handleToday = () => {
    updateSelectedDate(getTodayIso(location.timezone));
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl space-y-6 pb-16">
      {/* Top Transition Progress Bar */}
      {isPending && (
        <div
          role="progressbar"
          aria-label={isHi ? 'गणना अद्यतन हो रही है...' : 'Updating calculation...'}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 animate-pulse"
        />
      )}

      {/* Top Controls: Location & Date Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/90 bg-white p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        {/* Location selector trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            data-testid="location-modal-trigger"
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-100 hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 cursor-pointer"
            title={isHi ? 'अक्षांश, रेखांश, ऊँचाई, समय क्षेत्र एवं अयनांश निर्धारित करें' : 'Configure exact Latitude, Longitude, Altitude, Timezone & Ayanamsa'}
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
            aria-label={isHi ? 'पिछला दिन' : 'Previous Day'}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer"
            title={isHi ? 'पिछला दिन' : 'Previous Day'}
          >
            ‹
          </button>

          <input
            type="date"
            aria-label={isHi ? 'दिनांक चुनें' : 'Date Picker'}
            data-testid="date-picker-input"
            value={selectedDateStr}
            onChange={(e) => handleDateChange(e.target.value)}
            className="min-w-[135px] rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-2 text-center text-xs font-semibold text-zinc-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          <button
            type="button"
            data-testid="next-day-button"
            onClick={() => shiftDay(1)}
            aria-label={isHi ? 'अगला दिन' : 'Next Day'}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer"
            title={isHi ? 'अगला दिन' : 'Next Day'}
          >
            ›
          </button>

          <button
            type="button"
            data-testid="today-button"
            onClick={handleToday}
            className="rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none cursor-pointer"
          >
            {isHi ? 'आज' : 'Today'}
          </button>
        </div>
      </div>

      {/* Main View or Skeleton Loader */}
      {isLoading || !panchangData ? (
        <PanchangSkeleton />
      ) : (
        <div className={`space-y-6 transition-opacity duration-200 ${isPending ? 'opacity-60' : 'opacity-100'}`}>
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
            onSelectDate={(iso) => updateSelectedDate(iso)}
          />

          {/* Mathematical & Astronomy Transparency */}
          <AstroParameters
            astronomy={panchangData.astronomy}
            location={location}
          />
        </div>
      )}

      {/* Rigorous Calculation Disclaimer & Public Beta Notice */}
      <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 text-[11px] leading-relaxed text-zinc-600 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {isHi ? 'सार्वजनिक बीटा' : 'Public Beta'}
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {isHi
                ? 'समुदाय एवं खगोलीय सत्यापन हेतु उपलब्ध'
                : 'Open for Community & Astronomical Validation'}
            </span>
          </div>

          <a
            href={`mailto:mail@sanatan.cc?subject=Panchang%20Beta%20Feedback%20%26%20Validation&body=Hi%20Sanatan.cc%20Team%2C%0A%0AI%20am%20testing%20the%20Panchang%20Beta%20calculator.%20Here%20is%20my%20feedback%20%2F%20observation%3A%0A%0A-%20Location%3A%20${encodeURIComponent(location.name)}%20(${location.latitude.toFixed(4)}%2C%20${location.longitude.toFixed(4)})%0A-%20Date%20Checked%3A%20${encodeURIComponent(selectedDateStr)}%0A-%20Observation%20%2F%20Discrepancy%3A%0A%0AThanks!`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none"
            title={isHi ? 'गणना सत्यापन या प्रतिक्रिया mail@sanatan.cc पर भेजें' : 'Send calculation feedback or observations to mail@sanatan.cc'}
          >
            <span>✉️</span>
            <span>{isHi ? 'प्रतिक्रिया भेजें (mail@sanatan.cc)' : 'Send Feedback (mail@sanatan.cc)'}</span>
          </a>
        </div>
        <p className="mt-2.5">
          {isHi
            ? 'यह पञ्चाङ्ग शुद्ध त्रिकोणमितीय दृक गणना (VSOP87 सौर एवं Chapront ELP-2000 चन्द्र क्षोभ सिद्धान्त तथा लाहिरी चित्रा पक्ष अयनांश) पर आधारित है, जिसमें किसी भी प्रकार की सारिणी का हार्डकोडिंग नहीं किया गया है। ग्रहों की सूक्ष्म स्थिति, सूर्योदय, सूर्यास्त, मध्याह्न तथा क्षितिज संक्रमण आपके सटीक अक्षांश, रेखांश एवं तुंगता के अनुसार वायुमण्डलीय अपवर्तन को समाहित करते हुए गणना किए जाते हैं। अंग परिवर्तन उस यथार्थ सेकंड को दर्शाते हैं जब कोणीय अन्तर अथवा निरयण भोगांश अंग सीमा को पार करते हैं। हम राष्ट्रीय पञ्चाङ्ग (PAC), दृक पञ्चाङ्ग, दाते पञ्चाङ्ग आदि से सतत् सत्यापन करते हैं। आपकी प्रतिक्रिया एवं प्रेक्षण mail@sanatan.cc पर सादर आमन्त्रित हैं।'
            : 'This Panchang uses pure trigonometric ephemeris calculations (VSOP87 Solar & Chapront ELP-2000 Lunar perturbation models with Lahiri Chitra Paksha ayanamsa) without tabular hardcoding. Planetary positions, sunrise/sunset, solar noon, and horizon crossings are computed on our high-performance backend for your exact latitude, longitude, and elevation with topocentric atmospheric refraction. Transitions represent the exact astronomical second when solilunar elongation or sidereal longitudes cross limb demarcations. We actively cross-validate against verified ephemerides (Drik Panchang, Positional Astronomy Centre NCAC, Astrosage, Date Panchang). We invite your observations and validation reports via mail@sanatan.cc.'}
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
