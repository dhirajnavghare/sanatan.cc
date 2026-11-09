'use client';

import { FestivalCategory } from '@/app/lib/festivals/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface FestivalsFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: FestivalCategory;
  onCategoryChange: (cat: FestivalCategory) => void;
  categories: {
    id: FestivalCategory;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  selectedMonth?: number;
  onMonthChange: (month?: number) => void;
  months: {
    monthNumber: number;
    monthName: string;
    monthNameHindi: string;
    count: number;
  }[];
}

export default function FestivalsFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedMonth,
  onMonthChange,
  months,
}: FestivalsFilterBarProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      {/* Top Search & Month Select Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Instant Search Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isHi
                ? 'पर्व, देवता अथवा व्रत खोजें (जैसे: दीपावली, शिवरात्रि, एकादशी, गणेश)...'
                : 'Search festivals, deities, fasts (e.g. Diwali, Shivaratri, Ekadashi, Ganesh)...'
            }
            className="w-full rounded-2xl border border-zinc-200/90 bg-zinc-50/70 py-2.5 pl-10 pr-9 text-xs text-zinc-900 placeholder-zinc-400 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-amber-400 dark:focus:bg-zinc-950"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              title={isHi ? 'खोज रिक्त करें' : 'Clear search'}
            >
              ✕
            </button>
          )}
        </div>

        {/* Month Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="festival-month-select" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {isHi ? 'माह:' : 'Month:'}
          </label>
          <select
            id="festival-month-select"
            value={selectedMonth || ''}
            onChange={(e) => onMonthChange(e.target.value ? parseInt(e.target.value, 10) : undefined)}
            className="rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-2 text-xs font-semibold text-zinc-900 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100 dark:focus:border-amber-400 cursor-pointer"
          >
            <option value="">{isHi ? 'सभी माह (सम्पूर्ण वर्ष)' : 'All Months'}</option>
            {months.map((m) => (
              <option key={m.monthNumber} value={m.monthNumber}>
                {isHi ? m.monthNameHindi : m.monthName} {m.count > 0 ? `(${m.count})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-500'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              <span>{isHi ? cat.labelDevanagari : cat.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
