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
}> = [
  { value: 'All', label: 'All Auspicious' },
  { value: 'Good', label: 'Good & Optimal (≥65%)' },
  { value: 'Optimal', label: 'Optimal Only (≥80%)' },
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
    <div className="space-y-4 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
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
          <span className="inline-flex items-center rounded-xl border border-zinc-200/70 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            📜 {categoryMeta.traditionalReference}
          </span>
        </div>
      </div>

      {/* Segmented Controls / Tabs */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Time Horizon Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Horizon:
          </span>
          <div
            role="tablist"
            aria-label="Search Horizon"
            className="inline-flex rounded-xl border border-zinc-200/80 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-800/80"
          >
            {DAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={daysCount === opt.value}
                onClick={() => onDaysCountChange(opt.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  daysCount === opt.value
                    ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-black/5 dark:bg-zinc-700 dark:text-zinc-50 dark:ring-white/10'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Suitability:
          </span>
          <div
            role="tablist"
            aria-label="Quality Filter"
            className="inline-flex flex-wrap rounded-xl border border-zinc-200/80 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-800/80"
          >
            {SUITABILITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={suitabilityFilter === opt.value}
                onClick={() => onSuitabilityFilterChange(opt.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  suitabilityFilter === opt.value
                    ? 'bg-white text-amber-900 shadow-sm ring-1 ring-amber-500/20 dark:bg-zinc-700 dark:text-amber-300 dark:ring-white/10'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Summary Indicator */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            Found <strong className="text-zinc-900 dark:text-zinc-100">{totalMatches}</strong> auspicious{' '}
            {totalMatches === 1 ? 'day' : 'days'} across the next {daysCount} days
          </span>
        </div>
        <span className="hidden text-[11px] text-zinc-400 sm:inline">
          Sorted chronologically with classical shastra factor scoring
        </span>
      </div>
    </div>
  );
}
