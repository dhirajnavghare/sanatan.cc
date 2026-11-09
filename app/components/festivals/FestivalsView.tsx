'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GeoLocation } from '@/app/lib/panchang/types';
import { AyanamsaSystem } from '@/app/lib/panchang/ayanamsa';
import {
  FestivalTimelineResponse,
  FestivalCategory,
  FestivalTimelineItem,
} from '@/app/lib/festivals/types';
import FestivalsHero from './FestivalsHero';
import FestivalsFilterBar from './FestivalsFilterBar';
import FestivalTimelineCard from './FestivalTimelineCard';
import LocationModal from '@/app/components/panchang/LocationModal';

const DEFAULT_LOCATION: GeoLocation = {
  name: 'Ujjain, India (Standard Meridian)',
  latitude: 23.1765,
  longitude: 75.7885,
  altitude: 511,
  timezone: 'Asia/Kolkata',
  useElevationDip: false,
};

export default function FestivalsView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state synchronization
  const initialYear = parseInt(searchParams.get('year') || '2026', 10);
  const initialCat = (searchParams.get('category') as FestivalCategory) || 'all';
  const initialMonth = searchParams.get('month') ? parseInt(searchParams.get('month')!, 10) : undefined;
  const initialQ = searchParams.get('q') || '';

  const [year, setYear] = useState<number>(initialYear);
  const [category, setCategory] = useState<FestivalCategory>(initialCat);
  const [month, setMonth] = useState<number | undefined>(initialMonth);
  const [searchQuery, setSearchQuery] = useState<string>(initialQ);

  const [location, setLocation] = useState<GeoLocation>(DEFAULT_LOCATION);
  const [ayanamsa, setAyanamsa] = useState<AyanamsaSystem>('Lahiri');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [data, setData] = useState<FestivalTimelineResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore saved location from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem('panchang_location');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed.latitude === 'number' && typeof parsed.longitude === 'number') {
            setLocation(parsed);
          }
        }
      } catch {
        // Fallback to default
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update URL parameters
  const updateUrlParams = useCallback(
    (newYear: number, newCat: FestivalCategory, newMonth?: number, newQ?: string) => {
      const params = new URLSearchParams();
      if (newYear !== 2026) params.set('year', String(newYear));
      if (newCat !== 'all') params.set('category', newCat);
      if (newMonth) params.set('month', String(newMonth));
      if (newQ && newQ.trim().length > 0) params.set('q', newQ.trim());

      const qs = params.toString();
      const targetUrl = qs ? `/festivals?${qs}` : '/festivals';
      router.replace(targetUrl, { scroll: false });
    },
    [router]
  );

  // Fetch festival timeline from backend API
  useEffect(() => {
    let isCancelled = false;
    const loadTimer = setTimeout(() => {
      setIsLoading(true);
      setError(null);
    }, 0);

    const params = new URLSearchParams({
      year: String(year),
      category,
      lat: location.latitude.toFixed(4),
      lon: location.longitude.toFixed(4),
      tz: location.timezone,
      alt: String(location.altitude || 0),
      city: location.name,
    });

    if (month) params.set('month', String(month));
    if (searchQuery.trim().length > 0) params.set('q', searchQuery.trim());

    fetch(`/api/festivals?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load festival timeline`);
        return res.json();
      })
      .then((json: FestivalTimelineResponse) => {
        if (!isCancelled) {
          setData(json);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('Festivals fetch error:', err);
          setError(err.message || 'Unable to load festival calculations');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      clearTimeout(loadTimer);
    };
  }, [year, category, month, searchQuery, location]);

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    updateUrlParams(newYear, category, month, searchQuery);
  };

  const handleCategoryChange = (newCat: FestivalCategory) => {
    setCategory(newCat);
    updateUrlParams(year, newCat, month, searchQuery);
  };

  const handleMonthChange = (newMonth?: number) => {
    setMonth(newMonth);
    updateUrlParams(year, category, newMonth, searchQuery);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrlParams(year, category, month, q);
  };

  const handleResetFilters = () => {
    setCategory('all');
    setMonth(undefined);
    setSearchQuery('');
    updateUrlParams(year, 'all', undefined, '');
  };

  // Group festivals by month for structured display
  const groupedFestivals = useMemo(() => {
    const list = data?.festivals || [];
    if (list.length === 0) return [];

    const monthGroups: {
      monthKey: string;
      monthName: string;
      monthNumber: number;
      festivals: FestivalTimelineItem[];
    }[] = [];

    let currentMonthKey = '';
    let currentGroup: (typeof monthGroups)[0] | null = null;

    for (const fest of list) {
      const monthNum = parseInt(fest.date.slice(5, 7), 10);
      const monthKey = `${year}-${fest.date.slice(5, 7)}`;

      if (monthKey !== currentMonthKey) {
        currentMonthKey = monthKey;
        const [y, m] = fest.date.split('-').map(Number);
        const tempDate = new Date(Date.UTC(y, m - 1, 15));
        const monthName = tempDate.toLocaleString('en-US', { month: 'long' });

        currentGroup = {
          monthKey,
          monthName,
          monthNumber: monthNum,
          festivals: [fest],
        };
        monthGroups.push(currentGroup);
      } else if (currentGroup) {
        currentGroup.festivals.push(fest);
      }
    }

    return monthGroups;
  }, [data, year]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
      {/* Hero Banner */}
      <FestivalsHero
        year={year}
        onYearChange={handleYearChange}
        location={location}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        nextUpcoming={data?.nextUpcoming}
        totalCount={data?.totalCount || 0}
        majorCount={data?.categories.find((c) => c.id === 'major')?.count || 0}
      />

      {/* Filter & Search Bar */}
      <FestivalsFilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
        categories={data?.categories || []}
        selectedMonth={month}
        onMonthChange={handleMonthChange}
        months={data?.months || []}
      />

      {/* Main Timeline Section */}
      <div className="space-y-6 pt-2">
        {isLoading ? (
          /* Loading Skeletons */
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                  <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-8 text-center backdrop-blur-md">
            <span className="text-3xl">⚠️</span>
            <h3 className="mt-2 font-serif text-lg font-bold text-rose-700 dark:text-rose-400">
              Calculation Error
            </h3>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">{error}</p>
            <button
              type="button"
              onClick={() => handleYearChange(year)}
              className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-rose-700 cursor-pointer"
            >
              Retry Calculations
            </button>
          </div>
        ) : data?.festivals.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-zinc-200/90 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-4xl">🪔</span>
            <h3 className="mt-3 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50">
              No Festivals Found
            </h3>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              No sacred observances matched your search or category filters for year {year}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Timeline Groups by Month */
          <div className="space-y-8">
            {groupedFestivals.map((group) => (
              <div key={group.monthKey} className="space-y-4">
                {/* Month Separator Ribbon */}
                <div className="sticky top-16 z-30 flex items-center justify-between rounded-2xl border border-zinc-200/90 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🗓️</span>
                    <h2 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-50 sm:text-base">
                      {group.monthName} {year}
                    </h2>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                    {group.festivals.length} Celebrations
                  </span>
                </div>

                {/* Vertical Timeline Cards */}
                <div className="pl-1 sm:pl-2">
                  {group.festivals.map((fest, idx) => (
                    <FestivalTimelineCard
                      key={fest.id}
                      festival={fest}
                      isLast={idx === group.festivals.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Observer Location Modal */}
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
