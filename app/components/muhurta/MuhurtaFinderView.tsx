'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { PRESET_CITIES } from '@/app/lib/panchang/constants';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import {
  getMuhurtaCategoryMeta,
  MUHURTA_CATEGORIES,
} from '@/app/lib/muhurta-finder/categories';
import { MuhurtaCategoryId, MuhurtaDayEvaluation } from '@/app/lib/muhurta-finder/types';
import MuhurtaHero from './MuhurtaHero';
import MuhurtaCategorySelector from './MuhurtaCategorySelector';
import MuhurtaFilterBar from './MuhurtaFilterBar';
import MuhurtaResultCard from './MuhurtaResultCard';
import MuhurtaSkeleton from './MuhurtaSkeleton';
import LocationModal from '../panchang/LocationModal';
import AppTabSwitcher from '../common/AppTabSwitcher';

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

function parseJsonWithDates(text: string): MuhurtaDayEvaluation[] {
  return JSON.parse(text, (_key, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value);
    }
    return value;
  });
}

export default function MuhurtaFinderView() {
  const [selectedCategory, setSelectedCategory] = useState<MuhurtaCategoryId>('griha_pravesh');
  const [daysCount, setDaysCount] = useState<30 | 60 | 90 | 180>(30);
  const [suitabilityFilter, setSuitabilityFilter] = useState<'All' | 'Good' | 'Optimal'>('Good');

  // Location and date state
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  const [startDateStr, setStartDateStr] = useState<string>(() => getTodayIso());
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Data fetching & loading transition state
  const [rawEvaluations, setRawEvaluations] = useState<MuhurtaDayEvaluation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // 1. Sync category from URL & saved location from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      let activeLoc = PRESET_CITIES[0];

      try {
        // Sync category from URL query param if present
        const params = new URLSearchParams(window.location.search);
        const queryCategory = params.get('category') as MuhurtaCategoryId | null;
        if (queryCategory && MUHURTA_CATEGORIES.some((c) => c.id === queryCategory)) {
          setSelectedCategory(queryCategory);
        }

        // Sync location
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

        // Sync Ayanamsa
        const savedAyan = localStorage.getItem('panchang_ayanamsa');
        if (savedAyan) {
          setAyanamsa(savedAyan as AyanamsaSystem);
        }
      } catch {}

      // Set today's anchor in observer's timezone
      setStartDateStr(getTodayIso(activeLoc.timezone));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 2. Fetch computed Muhurtas from high-performance backend API
  useEffect(() => {
    let isCancelled = false;

    const fetchMuhurtas = async () => {
      try {
        const query = new URLSearchParams({
          category: selectedCategory,
          days: String(daysCount),
          date: startDateStr,
          lat: String(location.latitude),
          lon: String(location.longitude),
          tz: location.timezone,
          ayanamsa,
          min: 'All', // Fetch all candidates to allow instantaneous client-side filter switching
        });

        const res = await fetch(`/api/muhurta?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to load Muhurtas from backend');
        const text = await res.text();
        const data = parseJsonWithDates(text);

        if (!isCancelled) {
          startTransition(() => {
            setRawEvaluations(data);
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

    fetchMuhurtas();
    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, daysCount, startDateStr, location, ayanamsa]);

  // Instant category change
  const handleCategoryChange = (catId: MuhurtaCategoryId) => {
    setSelectedCategory(catId);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('category', catId);
      window.history.replaceState(null, '', url.pathname + url.search);
    } catch {}
  };

  // Instant client-side filtering without refetching
  const filteredEvaluations = useMemo(() => {
    if (!rawEvaluations) return [];
    if (suitabilityFilter === 'Optimal') {
      return rawEvaluations.filter((e) => e.suitability === 'Optimal');
    }
    if (suitabilityFilter === 'Good') {
      return rawEvaluations.filter(
        (e) => e.suitability === 'Optimal' || e.suitability === 'Good'
      );
    }
    return rawEvaluations.filter((e) => e.suitability !== 'Inauspicious');
  }, [rawEvaluations, suitabilityFilter]);

  const categoryMeta = useMemo(() => {
    return getMuhurtaCategoryMeta(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative mx-auto w-full max-w-5xl space-y-6 pb-16">
      {/* Top Transition Progress Bar */}
      {isPending && (
        <div
          role="progressbar"
          aria-label="Updating Muhurta calculations..."
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 animate-pulse"
        />
      )}

      {/* Top Application Tab Switcher */}
      <AppTabSwitcher />

      {/* Top Controls: Location & Search Horizon Anchor */}
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

        {/* Start Anchor Date Navigator */}
        <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Search from:
          </span>

          <input
            type="date"
            aria-label="Start Date"
            value={startDateStr}
            onChange={(e) => {
              if (e.target.value && /^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) {
                setStartDateStr(e.target.value);
              }
            }}
            className="min-w-[135px] rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-2 text-center text-xs font-semibold text-zinc-800 focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />

          <button
            type="button"
            onClick={() => setStartDateStr(getTodayIso(location.timezone))}
            className="rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none"
          >
            Today
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <MuhurtaHero
        location={location}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* Category Grid (Clickable tabs) */}
      <MuhurtaCategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Filter and Criteria Bar */}
      <MuhurtaFilterBar
        daysCount={daysCount}
        onDaysCountChange={setDaysCount}
        suitabilityFilter={suitabilityFilter}
        onSuitabilityFilterChange={setSuitabilityFilter}
        totalMatches={filteredEvaluations.length}
        categoryMeta={categoryMeta}
      />

      {/* Results Section */}
      {isLoading || !rawEvaluations ? (
        <MuhurtaSkeleton />
      ) : filteredEvaluations.length > 0 ? (
        <div
          className={`grid grid-cols-1 gap-4 lg:grid-cols-2 transition-opacity duration-200 ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {filteredEvaluations.map((evaluation) => (
            <MuhurtaResultCard
              key={evaluation.isoDate}
              evaluation={evaluation}
              timezone={location.timezone}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center sm:p-12 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl dark:bg-amber-950/60">
            🔍
          </div>
          <h3 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No Muhurtas match the selected filter
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            Within the next {daysCount} days, no dates meet the strict{' '}
            <strong>{suitabilityFilter}</strong> criterion for {categoryMeta.title}. Classical texts
            strictly exclude Rikta Tithis (4th, 9th, 14th), Bhadra (Vishti Karana), and inauspicious
            Panchakas for this activity.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {suitabilityFilter !== 'All' && (
              <button
                type="button"
                onClick={() => setSuitabilityFilter('All')}
                className="cursor-pointer rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                Show All Auspicious Days ({rawEvaluations?.length ?? 0} found)
              </button>
            )}
            {daysCount < 180 && (
              <button
                type="button"
                onClick={() => setDaysCount(daysCount === 30 ? 60 : daysCount === 60 ? 90 : 180)}
                className="cursor-pointer rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Expand Search Horizon to {daysCount === 30 ? '60' : daysCount === 60 ? '90' : '180'} Days
              </button>
            )}
          </div>
        </div>
      )}

      {/* Classical Methodology & Beta Feedback Callout */}
      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2 max-w-3xl">
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              Classical Shastra Calculations &amp; Verification Methodology
            </h4>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Unlike static table lookups, this finder computes high-precision planetary positions on our high-performance backend using local astronomical equations (Swiss Ephemeris &amp; Jean Meeus VSOP87 algorithms). It continuously calculates:
            </p>
            <ul className="grid grid-cols-1 gap-1 text-xs text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <strong>Shodash Samskara Rules:</strong> <em>Muhurta Chintamani</em> &amp; <em>Brihat Samhita</em>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <strong>Special Yogas:</strong> Sarvartha Siddhi, Amrita Siddhi, Guru Pushya
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <strong>Dosha Exclusion:</strong> Bhadra (Vishti), Rikta Tithis, Mrityu/Agni Panchaka
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <strong>Dynamic Choghadiya:</strong> Exact daytime divisions derived from solar rise &amp; set
              </li>
            </ul>
          </div>

          <div className="flex-none rounded-2xl border border-amber-500/20 bg-amber-50 p-4 text-xs dark:border-amber-400/20 dark:bg-amber-950/30">
            <div className="font-bold text-amber-900 dark:text-amber-200">
              Active Public Beta
            </div>
            <p className="mt-1 text-[11px] text-amber-800/90 dark:text-amber-300/90 max-w-xs">
              Help us build the most accurate astronomical platform. If your local tradition or regional almanac shows an alternate calculation, send your notes to:
            </p>
            <a
              href="mailto:mail@sanatan.cc?subject=Muhurta%20Finder%20Feedback"
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600 cursor-pointer"
            >
              <span>✉️ mail@sanatan.cc</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      <LocationModal
        location={location}
        ayanamsa={ayanamsa}
        onLocationChange={setLocation}
        onAyanamsaChange={setAyanamsa}
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </div>
  );
}
