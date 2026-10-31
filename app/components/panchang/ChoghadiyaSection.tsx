'use client';

import { useState } from 'react';
import { PanchangData } from '@/app/lib/panchang/types';
import { formatPanchangTime } from './PanchangHero';

interface ChoghadiyaSectionProps {
  data: PanchangData;
}

export default function ChoghadiyaSection({ data }: ChoghadiyaSectionProps) {
  const [activeTab, setActiveTab] = useState<'day' | 'night'>('day');
  const { choghadiya, location } = data;
  const tz = location.timezone;

  const currentList = activeTab === 'day' ? choghadiya.day : choghadiya.night;

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              ⏱
            </span>
            <span>Choghadiya (चौघड़िया मुहूर्त)</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Vedic 8-fold daylight & nighttime muhurta divisions based on solar weekday
          </p>
        </div>

        {/* Day / Night Toggle */}
        <div className="flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab('day')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'day'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            ☀️ Day Choghadiya (दिन)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('night')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              activeTab === 'night'
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            🌙 Night Choghadiya (रात्रि)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {currentList.map((ch, idx) => {
          const isAuspicious = ch.nature === 'Auspicious';
          const isNeutral = ch.nature === 'Neutral';

          return (
            <div
              key={idx}
              className={`relative flex flex-col justify-between rounded-2xl border p-3.5 shadow-sm transition hover:scale-[1.02] ${
                ch.isCurrent
                  ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/50 dark:bg-amber-950/40 dark:ring-amber-400/50'
                  : isAuspicious
                  ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-950 dark:bg-emerald-950/20'
                  : isNeutral
                  ? 'border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/60'
                  : 'border-rose-200 bg-rose-50/40 dark:border-rose-950 dark:bg-rose-950/20'
              }`}
            >
              {ch.isCurrent && (
                <span className="absolute -top-2 right-2 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold text-white shadow">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                  NOW
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">#{idx + 1}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-semibold ${
                      isAuspicious
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : isNeutral
                        ? 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                    }`}
                  >
                    {ch.quality}
                  </span>
                </div>

                <div className="mt-1.5">
                  <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {ch.name}
                  </h4>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    {ch.nameDevanagari}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t border-zinc-200/50 pt-2 text-[11px] dark:border-zinc-800">
                <div className="font-mono font-bold text-zinc-800 dark:text-zinc-200" suppressHydrationWarning>
                  {formatPanchangTime(ch.startTime, tz)}
                </div>
                <div className="text-[10px] text-zinc-400" suppressHydrationWarning>
                  to {formatPanchangTime(ch.endTime, tz)}
                </div>
                <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                  Lord: {ch.ruler}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
