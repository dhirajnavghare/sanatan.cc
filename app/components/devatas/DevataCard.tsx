'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DeityRecord } from '@/app/lib/devatas/types';

interface DevataCardProps {
  deity: DeityRecord;
  onOpenModal: (deity: DeityRecord) => void;
}

export default function DevataCard({ deity, onOpenModal }: DevataCardProps) {
  const [copiedMantra, setCopiedMantra] = useState(false);
  const primaryMantra = deity.keyMantras[0];

  const handleCopyMantra = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!primaryMantra) return;
    navigator.clipboard.writeText(
      `${primaryMantra.devanagari}\n${primaryMantra.transliteration}\nMeaning: ${primaryMantra.meaning}`
    );
    setCopiedMantra(true);
    setTimeout(() => setCopiedMantra(false), 2000);
  };

  return (
    <div
      onClick={() => onOpenModal(deity)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-500/30 sm:p-6 cursor-pointer"
    >
      {/* Ambient background glow matching deity color theme */}
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-gradient-to-br ${deity.colorTheme.accentGlow} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
      />

      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${deity.colorTheme.badgeBg} ${deity.colorTheme.badgeText} ${deity.colorTheme.border}`}
            >
              {deity.tradition}
            </span>
            {deity.isPanchaDeva && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
                <span>✨</span>
                <span>Pancha Deva</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-zinc-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            Tap for full lore &rarr;
          </span>
        </div>

        {/* Deity Title & Devanagari */}
        <div>
          <h3 className="font-serif text-xl font-bold text-zinc-900 group-hover:text-amber-600 dark:text-zinc-50 dark:group-hover:text-amber-400 transition-colors sm:text-2xl">
            {deity.name}
          </h3>
          <div className="mt-0.5 font-serif text-sm font-semibold text-amber-700 dark:text-amber-400">
            {deity.nameDevanagari}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
            {deity.subtitle}
          </p>
        </div>

        {/* Quick Highlights (Vahana, Sacred Day, Sacred Tithi) */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3 text-[11px] dark:border-zinc-800/60 dark:bg-zinc-950/50">
          {deity.vahana && (
            <div>
              <span className="text-zinc-400">Vahana:</span>{' '}
              <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{deity.vahana.split('(')[0]}</strong>
            </div>
          )}
          <div>
            <span className="text-zinc-400">Sacred Day:</span>{' '}
            <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{deity.sacredDay.split('(')[0]}</strong>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-400">Sacred Tithi:</span>{' '}
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{deity.sacredTithi}</span>
          </div>
        </div>

        {/* Primary Mantra Preview */}
        {primaryMantra && (
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-3.5 dark:border-amber-500/10 dark:bg-amber-950/20">
            <div className="flex items-center justify-between gap-1 pb-1 text-[11px] font-semibold text-amber-900 dark:text-amber-300">
              <span className="truncate">📜 {primaryMantra.title}</span>
              <button
                type="button"
                onClick={handleCopyMantra}
                className="shrink-0 rounded-md border border-amber-500/20 bg-white/70 px-1.5 py-0.5 text-[10px] text-zinc-700 transition hover:bg-white dark:border-amber-400/20 dark:bg-zinc-800/70 dark:text-zinc-300 cursor-pointer"
                title="Copy Sanskrit mantra"
              >
                {copiedMantra ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <div className="font-serif text-xs font-bold leading-relaxed text-zinc-900 dark:text-zinc-100">
              {primaryMantra.devanagari}
            </div>
            <div className="mt-1 line-clamp-2 text-[11px] text-zinc-600 dark:text-zinc-400">
              {primaryMantra.meaning}
            </div>
          </div>
        )}

        {/* Associated Festivals Pills */}
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
            Major Festivals:
          </span>
          <div className="flex flex-wrap gap-1">
            {deity.associatedFestivals.slice(0, 3).map((f) => (
              <span
                key={f}
                className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                🪔 {f}
              </span>
            ))}
            {deity.associatedFestivals.length > 3 && (
              <span className="rounded-lg bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                +{deity.associatedFestivals.length - 3} more
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
            onOpenModal(deity);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 cursor-pointer"
        >
          <span>विस्तृत दर्शन (Lore)</span>
          <span>&rarr;</span>
        </button>

        <Link
          href={`/festivals?q=${encodeURIComponent(deity.name.split('/')[0].trim())}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          title={`Find ${deity.name} festivals in timeline`}
        >
          <span>🪔 Festivals</span>
        </Link>
      </div>
    </div>
  );
}
