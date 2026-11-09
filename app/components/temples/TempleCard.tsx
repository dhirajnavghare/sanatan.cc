'use client';

import Link from 'next/link';
import { TempleRecord } from '@/app/lib/temples/types';

interface TempleCardProps {
  temple: TempleRecord;
  onOpenModal: (temple: TempleRecord) => void;
}

export default function TempleCard({ temple, onOpenModal }: TempleCardProps) {
  return (
    <div
      onClick={() => onOpenModal(temple)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-500/30 sm:p-6 cursor-pointer"
    >
      {/* Ambient background glow matching temple color theme */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${temple.colorTheme.accentGlow} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
      />

      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${temple.colorTheme.badgeBg} ${temple.colorTheme.badgeText} ${temple.colorTheme.border}`}
            >
              {temple.circuit}
            </span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {temple.tradition}
            </span>
          </div>

          <span className="text-[11px] font-medium text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Tap for darshan lore &rarr;
          </span>
        </div>

        {/* Temple Title & Devanagari */}
        <div>
          <h3 className="font-serif text-xl font-bold text-zinc-900 group-hover:text-amber-600 dark:text-zinc-50 dark:group-hover:text-amber-400 transition-colors sm:text-2xl">
            {temple.name}
          </h3>
          <div className="mt-0.5 font-serif text-sm font-semibold text-amber-700 dark:text-amber-400">
            {temple.nameDevanagari}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span>📍</span>
            <span>
              {temple.location.city}, {temple.location.state} ({temple.location.country})
            </span>
          </div>
        </div>

        {/* Quick Highlights (Deity, Sacred River) */}
        <div className="space-y-1.5 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3 text-[11px] dark:border-zinc-800/60 dark:bg-zinc-950/50">
          <div>
            <span className="text-zinc-400">Primary Deity:</span>{' '}
            <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{temple.primaryDeity}</strong>
          </div>
          {temple.sacredRiver && (
            <div>
              <span className="text-zinc-400">Sacred River / Sangam:</span>{' '}
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">{temple.sacredRiver}</span>
            </div>
          )}
          <div>
            <span className="text-zinc-400">Darshan:</span>{' '}
            <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate inline-block max-w-[280px]">
              {temple.darshanTimings.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Significance Preview */}
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {temple.significance}
        </p>

        {/* Major Festivals */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Key Observances:
          </span>
          <div className="flex flex-wrap gap-1">
            {temple.majorFestivals.slice(0, 2).map((f) => (
              <span
                key={f}
                className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                🪔 {f.split('(')[0].trim()}
              </span>
            ))}
            {temple.majorFestivals.length > 2 && (
              <span className="rounded-lg bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                +{temple.majorFestivals.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(temple);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
        >
          <span>विस्तृत दर्शन (Lore)</span>
          <span>&rarr;</span>
        </button>

        <Link
          href={`/panchang?lat=${temple.location.latitude}&lon=${temple.location.longitude}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          title={`Compute local Vedic Panchang at ${temple.name}`}
        >
          <span>🗓 Local Panchang</span>
        </Link>
      </div>
    </div>
  );
}
