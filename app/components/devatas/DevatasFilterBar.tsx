'use client';

import { DeityTradition } from '@/app/lib/devatas/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface DevatasFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTradition: DeityTradition;
  onTraditionChange: (tradition: DeityTradition) => void;
  traditions: {
    id: DeityTradition;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  totalMatching: number;
  totalAll: number;
}

export default function DevatasFilterBar({
  searchQuery,
  onSearchChange,
  selectedTradition,
  onTraditionChange,
  traditions,
  totalMatching,
  totalAll,
}: DevatasFilterBarProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const isFiltered = searchQuery.trim() !== '' || selectedTradition !== 'all';

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      {/* Top Row: Search Input */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                ? 'देवी-देवता, मन्त्र, तीर्थ अथवा तात्विक स्वरूप खोजें (जैसे: शिव, कृष्ण, महामृत्युंजय, केदारनाथ)...'
                : 'Search deities, mantras, temples, tatva (e.g. Shiva, Krishna, Mahamrityunjaya, Kedarnath)...'
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

        {/* Counter and Clear Filters Button */}
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi ? (
              <>
                <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{totalMatching}</strong> / {totalAll} प्रदर्शित
              </>
            ) : (
              <>
                Showing <strong className="font-semibold text-zinc-900 dark:text-zinc-100">{totalMatching}</strong> of {totalAll}
              </>
            )}
          </div>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onTraditionChange('all');
              }}
              className="rounded-xl border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
            >
              {isHi ? 'रीसेट करें' : 'Reset Filters'}
            </button>
          )}
        </div>
      </div>

      {/* Tradition Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {traditions.map((trad) => {
          const isActive = selectedTradition === trad.id;
          return (
            <button
              key={trad.id}
              type="button"
              onClick={() => onTraditionChange(trad.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-500'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              <span>{isHi ? trad.labelDevanagari : trad.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                }`}
              >
                {trad.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
