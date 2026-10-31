'use client';

import { MuhurtaCategoryMeta } from '@/app/lib/muhurta-finder/types';

interface MuhurtaFilterBarProps {
  daysCount: 30 | 60 | 90 | 180;
  onDaysCountChange: (days: 30 | 60 | 90 | 180) => void;
  suitabilityFilter: 'All' | 'Good' | 'Optimal';
  onSuitabilityFilterChange: (filter: 'All' | 'Good' | 'Optimal') => void;
  totalMatches: number;
  categoryMeta: MuhurtaCategoryMeta;
}

const DAY_OPTIONS: Array<{ value: 30 | 60 | 90 | 180; label: string }> = [
  { value: 30, label: '30 Days' },
  { value: 60, label: '60 Days' },
  { value: 90, label: '90 Days' },
  { value: 180, label: '180 Days' },
];

const SUITABILITY_OPTIONS: Array<{
  value: 'All' | 'Good' | 'Optimal';
  label: string;
  badgeClass: string;
}> = [
  { value: 'All', label: 'All Auspicious', badgeClass: 'bg-zinc-100 dark:bg-zinc-800' },
  { value: 'Good', label: 'Good & Optimal (≥65%)', badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { value: 'Optimal', label: 'Optimal Only (≥80%)', badgeClass: 'bg-green-500/10 text-green-600 dark:text-green-400' },
];

export default function MuhurtaFilterBar({
  daysCount,
  onDaysCountChange,
  suitabilityFilter,
  onSuitabilityFilterChange,
  totalMatches,
  categoryMeta,
}: MuhurtaFilterBarProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Category Info Banner */}
      <div className="flex flex-col gap-2 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{categoryMeta.icon}</span>
            <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {categoryMeta.title} ({categoryMeta.titleDevanagari})
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {categoryMeta.description}
          </p>
        </div>

        <div className="flex-none">
          <span className="inline-flex items-center rounded-lg bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            📜 {categoryMeta.traditionalReference}
          </span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Time Horizon */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Search Horizon:
          </span>
          <div className="inline-flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            {DAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onDaysCountChange(opt.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  daysCount === opt.value
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Quality Filter:
          </span>
          <div className="inline-flex flex-wrap gap-1.5">
            {SUITABILITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSuitabilityFilterChange(opt.value)}
                className={`cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                  suitabilityFilter === opt.value
                    ? 'border-amber-500 bg-amber-50 font-bold text-amber-900 ring-1 ring-amber-500/30 dark:border-amber-400 dark:bg-amber-950/40 dark:text-amber-200'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match summary indicator */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            Found <strong className="text-zinc-900 dark:text-zinc-100">{totalMatches}</strong> auspicious{' '}
            {totalMatches === 1 ? 'date' : 'dates'} across the next {daysCount} days
          </span>
        </div>
        <span className="text-[11px] text-zinc-400">
          Showing matching Muhurtas sorted chronologically
        </span>
      </div>
    </div>
  );
}
