'use client';

import Link from 'next/link';
import { GeoLocation } from '@/app/lib/panchang/types';
import { FestivalTimelineItem } from '@/app/lib/festivals/types';

interface FestivalsHeroProps {
  year: number;
  onYearChange: (year: number) => void;
  location: GeoLocation;
  onOpenLocationModal: () => void;
  nextUpcoming?: FestivalTimelineItem | null;
  totalCount: number;
  majorCount: number;
}

const SUPPORTED_YEARS = [2025, 2026, 2027];

export default function FestivalsHero({
  year,
  onYearChange,
  location,
  onOpenLocationModal,
  nextUpcoming,
  totalCount,
  majorCount,
}: FestivalsHeroProps) {
  return (
    <div className="space-y-5">
      {/* Hero Banner Container */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-6 shadow-sm backdrop-blur-xl dark:border-amber-500/15 dark:from-amber-950/30 dark:via-orange-950/15 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
                <span>🪔</span>
                <span>Hindu Festival Calendar &amp; Timeline</span>
              </span>
              <span className="rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Year {year}
              </span>
            </div>

            <h1 className="font-serif text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              सनातन उत्सव एवं व्रत पञ्चाङ्ग
            </h1>

            <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
              Explore the sacred annual timeline of Hindu festivals, Ekadashi vrats, Jayantis, and solar transits. Mathematically computed using classical Drik Panchang, Dharmasindhu, and Nirnayasindhu astronomical rules for any location on Earth.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>{majorCount} Major Festivals</span>
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="font-semibold">{totalCount} Total Observances</div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                <span>📍</span>
                <span>{location.name}</span>
              </div>
            </div>
          </div>

          {/* Right Controls: Year Selector & Location Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            {/* Year Selector Segmented Control */}
            <div className="flex items-center gap-1 rounded-2xl border border-zinc-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
              {SUPPORTED_YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => onYearChange(y)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    year === y
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Location Pill */}
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200/90 bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              title="Change Observer Location"
            >
              <span>🌍 Change City:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 truncate max-w-[150px]">
                {location.name}
              </span>
              <span className="text-[10px] text-zinc-400">✏️</span>
            </button>
          </div>
        </div>

        {/* Featured Upcoming Festival Banner (if available) */}
        {nextUpcoming && (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 p-4 backdrop-blur-md dark:border-amber-500/20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-xl text-white shadow-md shadow-amber-500/25">
                  🪔
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Next Upcoming Major Festival
                    </span>
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                      {nextUpcoming.daysRemaining === 0
                        ? 'Today!'
                        : nextUpcoming.daysRemaining === 1
                        ? 'Tomorrow'
                        : `In ${nextUpcoming.daysRemaining} days`}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {nextUpcoming.name}
                    <span className="ml-2 font-normal text-xs text-zinc-500 dark:text-zinc-400">
                      ({nextUpcoming.nameDevanagari})
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    📅 {nextUpcoming.formattedDate} • 🕉️ {nextUpcoming.masaName} {nextUpcoming.paksha} {nextUpcoming.tithiName}
                  </p>
                </div>
              </div>

              <Link
                href={nextUpcoming.panchangUrl}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-amber-700 cursor-pointer sm:flex-shrink-0"
              >
                <span>View Day Panchang</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
