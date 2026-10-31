'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import { formatPanchangTime } from './PanchangHero';

interface PanchaAngaCardsProps {
  data: PanchangData;
}

export default function PanchaAngaCards({ data }: PanchaAngaCardsProps) {
  const { tithi, nakshatra, yoga, karana, vara, location } = data;
  const tz = location.timezone;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
            ५
          </span>
          <span>Pancha-Anga (पञ्चाङ्ग)</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Calculated at Sunrise • Lahiri Sidereal Ephemeris
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Tithi Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              1. Tithi (तिथि)
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              {tithi.current.paksha}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {tithi.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {tithi.current.nameDevanagari} ({tithi.current.pakshaDevanagari})
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>Till {formatPanchangTime(tithi.endTime, tz, { showDate: true })}</span>
              <span className="text-[11px] font-mono text-zinc-400">{Math.round(tithi.progressPercent)}%</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, tithi.progressPercent))}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            <span>Next: <strong className="text-zinc-700 dark:text-zinc-200">{tithi.next.name}</strong></span>
            <span>Deity: {tithi.current.deity}</span>
          </div>
        </div>

        {/* 2. Nakshatra Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              2. Nakshatra (नक्षत्र)
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              Pada {nakshatra.current.pada} of 4
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {nakshatra.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {nakshatra.current.nameDevanagari} • Lord: {nakshatra.current.lord}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>Till {formatPanchangTime(nakshatra.endTime, tz, { showDate: true })}</span>
              <span className="text-[11px] font-mono text-zinc-400">{Math.round(nakshatra.progressPercent)}%</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, nakshatra.progressPercent))}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            <span>Next: <strong className="text-zinc-700 dark:text-zinc-200">{nakshatra.next.name}</strong></span>
            <span>Deity: {nakshatra.current.deity}</span>
          </div>
        </div>

        {/* 3. Yoga Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              3. Yoga (योग)
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                yoga.current.nature === 'Auspicious'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              }`}
            >
              {yoga.current.nature}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {yoga.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {yoga.current.nameDevanagari} (Solilunar combination)
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>Till {formatPanchangTime(yoga.endTime, tz, { showDate: true })}</span>
              <span className="text-[11px] font-mono text-zinc-400">{Math.round(yoga.progressPercent)}%</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, yoga.progressPercent))}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            <span>Next: <strong className="text-zinc-700 dark:text-zinc-200">{yoga.next.name}</strong></span>
            <span>Index {yoga.current.index} of 27</span>
          </div>
        </div>

        {/* 4. Karana Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              4. Karana (करण)
            </span>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              {karana.current.type} (Half-Tithi)
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {karana.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {karana.current.nameDevanagari} • Deity: {karana.current.deity}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>Till {formatPanchangTime(karana.endTime, tz, { showDate: true })}</span>
              <span className="text-[11px] font-mono text-zinc-400">{Math.round(karana.progressPercent)}%</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, karana.progressPercent))}%` }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-[11px] text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            <span>Next: <strong className="text-zinc-700 dark:text-zinc-200">{karana.next.name}</strong></span>
            <span>Index {karana.current.index} of 60</span>
          </div>
        </div>

        {/* 5. Vara Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              5. Vara (वासर / वार)
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              Solar Weekday (Sunrise-based)
            </span>
          </div>

          <div className="mt-2 flex flex-col justify-between sm:flex-row sm:items-center">
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {vara.name} ({vara.englishName})
              </h3>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {vara.nameDevanagari} • Ruling Planet: <strong className="text-zinc-800 dark:text-zinc-200">{vara.lordPlanet}</strong>
              </span>
            </div>
            <div className="mt-2 text-xs text-zinc-500 sm:mt-0 sm:text-right dark:text-zinc-400" suppressHydrationWarning>
              Civil day ruled by sunrise at {formatPanchangTime(data.sunTimes.sunrise, tz)}
            </div>
          </div>

          <div className="mt-3 border-t border-zinc-100 pt-2.5 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            In Hindu Sanatan tradition, the day (Ahoratra) commences at local Surya Udaya (Sunrise), not standard civil midnight.
          </div>
        </div>
      </div>
    </section>
  );
}
