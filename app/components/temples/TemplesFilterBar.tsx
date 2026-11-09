'use client';

import { TempleCircuit, TempleTradition } from '@/app/lib/temples/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface TemplesFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCircuit: TempleCircuit;
  onCircuitChange: (circuit: TempleCircuit) => void;
  circuits: {
    id: TempleCircuit;
    label: string;
    labelDevanagari: string;
    count: number;
  }[];
  selectedTradition: TempleTradition;
  onTraditionChange: (tradition: TempleTradition) => void;
  totalMatching: number;
  totalAll: number;
}

export default function TemplesFilterBar({
  searchQuery,
  onSearchChange,
  selectedCircuit,
  onCircuitChange,
  circuits,
  selectedTradition,
  onTraditionChange,
  totalMatching,
  totalAll,
}: TemplesFilterBarProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const isFiltered = searchQuery.trim() !== '' || selectedCircuit !== 'all' || selectedTradition !== 'all';

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      {/* Top Search & Tradition Row */}
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
                ? 'मन्दिर, नगर, पावन नदी अथवा देवता खोजें (जैसे: काशी, केदारनाथ, गंगा, जगन्नाथ, उज्जैन)...'
                : 'Search temples, cities, rivers, deities (e.g. Kashi, Kedarnath, Ganga, Jagannath, Ujjain)...'
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

        {/* Tradition Filter & Counter */}
        <div className="flex items-center gap-3 sm:justify-end">
          <div className="flex items-center gap-1.5">
            <label htmlFor="temple-tradition-select" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              {isHi ? 'परम्परा:' : 'Tradition:'}
            </label>
            <select
              id="temple-tradition-select"
              value={selectedTradition}
              onChange={(e) => onTraditionChange(e.target.value as TempleTradition)}
              className="rounded-2xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-2 text-xs font-semibold text-zinc-900 transition focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100 dark:focus:border-amber-400 cursor-pointer"
            >
              <option value="all">{isHi ? 'सर्व परम्परा' : 'All Traditions'}</option>
              <option value="shaiva">{isHi ? 'शैव' : 'Shaiva'}</option>
              <option value="vaishnava">{isHi ? 'वैष्णव' : 'Vaishnava'}</option>
              <option value="shakta">{isHi ? 'शाक्त' : 'Shakta'}</option>
              <option value="smarta">{isHi ? 'स्मार्त' : 'Smarta'}</option>
              <option value="kaumara">{isHi ? 'कौमार' : 'Kaumara'}</option>
            </select>
          </div>

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
                onCircuitChange('all');
                onTraditionChange('all');
              }}
              className="rounded-xl border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 transition hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer whitespace-nowrap"
            >
              {isHi ? 'रीसेट' : 'Reset'}
            </button>
          )}
        </div>
      </div>

      {/* Circuit Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {circuits.map((circ) => {
          const isActive = selectedCircuit === circ.id;
          return (
            <button
              key={circ.id}
              type="button"
              onClick={() => onCircuitChange(circ.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-500'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              <span>{isHi ? circ.labelDevanagari : circ.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300'
                }`}
              >
                {circ.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
