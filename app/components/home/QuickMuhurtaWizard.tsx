'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GeoLocation } from '@/app/lib/panchang/types';
import { MUHURTA_CATEGORIES } from '@/app/lib/muhurta-finder/categories';
import { findMuhurtas } from '@/app/lib/muhurta-finder/calculator';
import { MuhurtaCategoryId, MuhurtaDayEvaluation } from '@/app/lib/muhurta-finder/types';

interface QuickMuhurtaWizardProps {
  location: GeoLocation;
}

export default function QuickMuhurtaWizard({ location }: QuickMuhurtaWizardProps) {
  const [selectedCategory, setSelectedCategory] = useState<MuhurtaCategoryId>('griha_pravesh');

  // Compute next 3 auspicious dates in milliseconds
  const upcomingResults = useMemo(() => {
    try {
      const all = findMuhurtas(
        { category: selectedCategory, daysCount: 90, minimumSuitability: 'Good' },
        location,
        new Date(),
        'Lahiri'
      );
      return all.slice(0, 3);
    } catch {
      return [];
    }
  }, [selectedCategory, location]);

  const activeCategoryMeta = useMemo(() => {
    return MUHURTA_CATEGORIES.find((c) => c.id === selectedCategory) || MUHURTA_CATEGORIES[0];
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>✨</span>
            <span>शुभ मुहूर्त अन्वेषक • Vedic Auspicious Timing Wizard</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Instant Muhurta Discovery
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            Select a sacred venture to find the next canon-approved dates with zero Vishti Bhadra or Rikta Tithis
          </p>
        </div>

        <Link
          href={`/muhurta?category=${selectedCategory}`}
          className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-800/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900"
        >
          <span>Scan 180 Days</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Interactive Category Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {MUHURTA_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`group flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/25 ring-1 ring-indigo-500'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="text-base transition-transform group-hover:scale-110">{cat.icon}</span>
              <span>{cat.title}</span>
              <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-zinc-400'}`}>
                ({cat.titleDevanagari})
              </span>
            </button>
          );
        })}
      </div>

      {/* Immediate Results Grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>
            Next Auspicious Dates for <strong className="text-zinc-900 dark:text-zinc-100">{activeCategoryMeta.title}</strong> in {location.name}:
          </span>
          <span className="text-[11px] text-zinc-400">Calculated from Muhurta Chintamani</span>
        </div>

        {upcomingResults.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
            <span>🔍</span>
            <p className="mt-1 text-sm font-semibold">Scanning next 90 days for canonical windows...</p>
            <Link
              href={`/muhurta?category=${selectedCategory}`}
              className="mt-3 inline-block text-xs font-bold text-indigo-600 hover:underline"
            >
              Open Full 180-Day Scanner &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {upcomingResults.map((item, idx) => (
              <MuhurtaQuickCard key={item.isoDate} item={item} rank={idx + 1} />
            ))}
          </div>
        )}
      </div>

      {/* Category Guidance Footnote */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/30">
        <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200">
          <span>📜</span>
          <span>Shastra Canon for {activeCategoryMeta.title}:</span>
        </div>
        <p className="mt-1 leading-relaxed text-indigo-800/80 dark:text-indigo-300/80">
          {activeCategoryMeta.description}. Canonical rules strictly reject Vishti (Bhadra), Rikta Tithis (Chaturthi, Navami, Chaturdashi), and Surya Sankranti conjunctions while prioritizing Sarvartha Siddhi and Amrita Siddhi yogas.
        </p>
      </div>
    </div>
  );
}

function MuhurtaQuickCard({ item, rank }: { item: MuhurtaDayEvaluation; rank: number }) {
  const isOptimal = item.suitability === 'Optimal';

  const formattedDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(item.date);
    } catch {
      return item.isoDate;
    }
  }, [item.date, item.isoDate]);

  const bestWindow = item.windows[0];

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 transition-all duration-200 hover:border-indigo-400 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-indigo-500">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Choice #{rank}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
              isOptimal
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
            }`}
          >
            {isOptimal ? '⭐⭐⭐ Optimal' : '⭐⭐ Good'}
          </span>
        </div>

        <h3 className="mt-2 font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
          {formattedDate}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {item.panchangSummary.tithiName} • {item.panchangSummary.nakshatraName}
        </p>

        {item.specialYogas.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.specialYogas.map((y) => (
              <span
                key={y}
                className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
              >
                ✨ {y}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 border-t border-zinc-200/60 pt-2.5 text-xs dark:border-zinc-800">
        {bestWindow ? (
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400">Recommended Window:</span>
            <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {bestWindow.label.split('(')[0]}
            </p>
          </div>
        ) : (
          <span className="text-zinc-400">General auspicious day</span>
        )}

        <Link
          href={`/panchang?date=${item.isoDate}`}
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          <span>View Day Panchang</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
