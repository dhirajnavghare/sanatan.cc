'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRESET_CITIES, GeoLocation } from '@/app/lib/panchang';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import {
  findMuhurtas,
  getMuhurtaCategoryMeta,
  MUHURTA_CATEGORIES,
} from '@/app/lib/muhurta-finder';
import { MuhurtaCategoryId } from '@/app/lib/muhurta-finder/types';
import MuhurtaHero from './MuhurtaHero';
import MuhurtaCategorySelector from './MuhurtaCategorySelector';
import MuhurtaFilterBar from './MuhurtaFilterBar';
import MuhurtaResultCard from './MuhurtaResultCard';
import LocationModal from '../panchang/LocationModal';

function getTodayAnchor(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0));
}

export default function MuhurtaFinderView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Category from query or default
  const paramCategory = searchParams.get('category') as MuhurtaCategoryId | null;
  const initialCategory: MuhurtaCategoryId =
    paramCategory && MUHURTA_CATEGORIES.some((c) => c.id === paramCategory)
      ? paramCategory
      : 'griha_pravesh';

  const [selectedCategory, setSelectedCategory] = useState<MuhurtaCategoryId>(initialCategory);
  const [daysCount, setDaysCount] = useState<30 | 60 | 90 | 180>(60);
  const [suitabilityFilter, setSuitabilityFilter] = useState<'All' | 'Good' | 'Optimal'>('Good');

  // Location state
  const [location, setLocation] = useState<GeoLocation>(PRESET_CITIES[0]);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [, setMounted] = useState(false);

  // Sync saved location from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      try {
        const savedLoc = localStorage.getItem('panchang_custom_location');
        if (savedLoc) {
          const parsed = JSON.parse(savedLoc);
          if (
            typeof parsed.latitude === 'number' &&
            typeof parsed.longitude === 'number' &&
            parsed.timezone
          ) {
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

  const handleCategoryChange = (catId: MuhurtaCategoryId) => {
    setSelectedCategory(catId);
    // Update URL query parameter without full reload
    const params = new URLSearchParams(window.location.search);
    params.set('category', catId);
    router.replace(`/muhurta?${params.toString()}`, { scroll: false });
  };

  // Run the Shastra calculation engine
  const startDate = useMemo(() => getTodayAnchor(), []);

  const rawEvaluations = useMemo(() => {
    return findMuhurtas(
      {
        category: selectedCategory,
        daysCount,
      },
      location,
      startDate,
      ayanamsa
    );
  }, [selectedCategory, startDate, daysCount, location, ayanamsa]);

  // Filter evaluations based on user selection
  const filteredEvaluations = useMemo(() => {
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
    <div className="space-y-6">
      {/* Hero Header */}
      <MuhurtaHero
        location={location}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
      />

      {/* Category Grid */}
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
      {filteredEvaluations.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
                className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                Show All Auspicious Days ({rawEvaluations.length} found)
              </button>
            )}
            {daysCount < 180 && (
              <button
                type="button"
                onClick={() => setDaysCount(daysCount === 30 ? 60 : daysCount === 60 ? 90 : 180)}
                className="rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                Expand Search Horizon to {daysCount === 30 ? '60' : daysCount === 60 ? '90' : '180'} Days
              </button>
            )}
          </div>
        </div>
      )}

      {/* Classical Methodology & Beta Feedback Accordion / Callout */}
      <section className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2 max-w-3xl">
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              Classical Shastra Calculations &amp; Verification Methodology
            </h4>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Unlike static table lookups, this finder computes high-precision planetary positions in real-time using local astronomical equations (Swiss Ephemeris &amp; Jean Meeus VSOP87 algorithms). It continuously calculates:
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
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600"
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
