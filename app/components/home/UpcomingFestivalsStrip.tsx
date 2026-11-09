'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GeoLocation } from '@/app/lib/panchang/types';
import { getFestivalTimeline } from '@/app/lib/festivals/timeline';
import { FestivalTimelineItem } from '@/app/lib/festivals/types';

interface UpcomingFestivalsStripProps {
  location: GeoLocation;
}

export default function UpcomingFestivalsStrip({ location }: UpcomingFestivalsStripProps) {
  const [filter, setFilter] = useState<'all' | 'major' | 'vrat' | 'jayanti'>('major');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Fetch upcoming festivals from timeline
  const festivals: FestivalTimelineItem[] = useMemo(() => {
    try {
      const res = getFestivalTimeline({ year: currentYear }, location);
      let list = res.festivals.filter((f) => f.daysRemaining >= 0);

      // If later in year, fetch next year's early festivals
      if (list.length < 6) {
        const nextRes = getFestivalTimeline({ year: currentYear + 1 }, location);
        list = [...list, ...nextRes.festivals.filter((f) => f.daysRemaining >= 0)];
      }

      if (filter === 'major') {
        list = list.filter((f) => f.isMajor);
      } else if (filter === 'vrat') {
        list = list.filter((f) => f.category === 'Vrat' || f.name.toLowerCase().includes('ekadashi'));
      } else if (filter === 'jayanti') {
        list = list.filter((f) => f.category === 'Jayanti');
      }

      return list.slice(0, 6);
    } catch {
      return [];
    }
  }, [currentYear, location, filter]);

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <span>🪔</span>
            <span>आगामी व्रत एवं उत्सव • Upcoming Celebrations</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Sacred Hindu Festivals
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            Astronomically calculated celebration dates and fasting windows with presiding deities
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'major', label: 'Major Utsavs' },
            { id: 'all', label: 'All Celebrations' },
            { id: 'vrat', label: 'Ekadashi & Vrats' },
            { id: 'jayanti', label: 'Jayantis' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                filter === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Festivals Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((fest) => {
          const isExpanded = expandedId === fest.id;
          const isToday = fest.daysRemaining === 0;
          const isTomorrow = fest.daysRemaining === 1;

          return (
            <div
              key={fest.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 ${
                isExpanded
                  ? 'border-orange-500 bg-orange-500/5 shadow-md ring-1 ring-orange-400/40 dark:bg-orange-950/20'
                  : 'border-zinc-200/80 bg-zinc-50/70 hover:border-orange-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-orange-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      isToday
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : isTomorrow
                        ? 'bg-amber-500 text-white'
                        : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}
                  >
                    {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : `In ${fest.daysRemaining} days`}
                  </span>

                  <span className="text-[11px] font-medium text-orange-700 dark:text-orange-400">
                    {fest.masaName} ({fest.paksha})
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {fest.name}
                </h3>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                  {fest.nameDevanagari}
                </p>

                <p className="mt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  {fest.formattedDate}
                </p>

                {fest.deity && (
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    Deity: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{fest.deity}</span>
                  </p>
                )}
              </div>

              {/* Expandable Section */}
              {isExpanded && (
                <div className="mt-3 border-t border-orange-200/60 pt-3 text-xs dark:border-orange-900/60">
                  <div>
                    <span className="font-bold text-orange-800 dark:text-orange-300">Puja Muhurta:</span>
                    <p className="text-zinc-700 dark:text-zinc-300">{fest.pujaMuhurta}</p>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-orange-800 dark:text-orange-300">Significance:</span>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {fest.significance}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-zinc-200/60 pt-2 text-xs dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : fest.id)}
                  className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 cursor-pointer"
                >
                  {isExpanded ? 'Show Less' : 'Puja Details & Lore'}
                </button>

                <Link
                  href={fest.panchangUrl}
                  className="inline-flex items-center gap-1 font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  <span>Panchang</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Link */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800 text-xs">
        <span className="text-zinc-500">
          Over 150+ canonical Hindu festivals calculated using Dharmasindhu vyapti rules
        </span>
        <Link
          href="/festivals"
          className="font-bold text-orange-600 hover:text-orange-700 dark:text-orange-400"
        >
          View Full Annual Timeline &rarr;
        </Link>
      </div>
    </div>
  );
}
