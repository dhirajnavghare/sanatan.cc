'use client';

import Link from 'next/link';
import { MuhurtaDayEvaluation } from '@/app/lib/muhurta-finder/types';
import { formatCivilDateLong, formatPanchangTime } from '../panchang/PanchangHero';

interface MuhurtaResultCardProps {
  evaluation: MuhurtaDayEvaluation;
  timezone: string;
}

export default function MuhurtaResultCard({ evaluation, timezone }: MuhurtaResultCardProps) {
  const {
    isoDate,
    suitability,
    score,
    reasons,
    precautions,
    specialYogas,
    panchakaType,
    windows,
    avoidWindows,
    panchangSummary,
  } = evaluation;

  // Suitability styling badge
  const suitabilityConfig = {
    Optimal: {
      badge: 'border-green-500/30 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-950/40 dark:text-green-300',
      dot: 'bg-green-500',
      label: 'Optimal Muhurta',
      border: 'hover:border-green-400/50 dark:hover:border-green-500/30',
    },
    Good: {
      badge: 'border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      label: 'Good Muhurta',
      border: 'hover:border-emerald-400/50 dark:hover:border-emerald-500/30',
    },
    Average: {
      badge: 'border-amber-500/30 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300',
      dot: 'bg-amber-500',
      label: 'Average (Conditional)',
      border: 'hover:border-amber-400/50 dark:hover:border-amber-500/30',
    },
    Inauspicious: {
      badge: 'border-rose-500/30 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300',
      dot: 'bg-rose-500',
      label: 'Not Recommended',
      border: 'hover:border-rose-400/50 dark:hover:border-rose-500/30',
    },
  }[suitability];

  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-sm transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-900 ${suitabilityConfig.border}`}
    >
      <div className="space-y-4">
        {/* Top Header: Date, Weekday & Compatibility Badge */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4
                className="font-serif text-lg font-bold text-zinc-900 sm:text-xl dark:text-zinc-100"
                suppressHydrationWarning
              >
                {formatCivilDateLong(isoDate)}
              </h4>
            </div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Vara: <strong className="text-zinc-800 dark:text-zinc-200">{panchangSummary.varaName}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${suitabilityConfig.badge}`}
            >
              <span className={`h-2 w-2 rounded-full ${suitabilityConfig.dot}`} />
              {suitabilityConfig.label} ({score}%)
            </span>
          </div>
        </div>

        {/* Special Yogas & Panchaka Tags */}
        {(specialYogas.length > 0 || (panchakaType && panchakaType !== 'None')) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {specialYogas.map((yoga, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300"
              >
                ✨ {yoga}
              </span>
            ))}
            {panchakaType && panchakaType !== 'None' && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                ⚠️ {panchakaType} Panchaka
              </span>
            )}
          </div>
        )}

        {/* Panchang Core Limbs Grid */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-zinc-50 p-3 text-xs sm:grid-cols-4 dark:bg-zinc-800/50">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Tithi
            </div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {panchangSummary.tithiName}
            </div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {panchangSummary.tithiPaksha}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Nakshatra
            </div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {panchangSummary.nakshatraName}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Yoga
            </div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {panchangSummary.yogaName}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              Karana
            </div>
            <div className="font-semibold text-zinc-800 dark:text-zinc-200">
              {panchangSummary.karanaName}
            </div>
          </div>
        </div>

        {/* Shastra Positive Factors */}
        {reasons.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Auspicious Astrological Factors:
            </div>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Time Windows */}
        {windows.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Recommended Muhurta Windows (Best Timings):
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {windows.map((win, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-50/50 p-2.5 text-xs dark:border-amber-400/20 dark:bg-amber-950/20"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-amber-900 dark:text-amber-200">
                      {win.label}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {win.description}
                    </div>
                  </div>
                  <div
                    className="font-mono text-xs font-semibold text-amber-900 dark:text-amber-200 text-right"
                    suppressHydrationWarning
                  >
                    {formatPanchangTime(win.startTime, timezone)} -{' '}
                    {formatPanchangTime(win.endTime, timezone)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avoidance & Precautions */}
        {(avoidWindows.length > 0 || precautions.length > 0) && (
          <div className="space-y-1.5 rounded-xl border border-rose-500/10 bg-rose-50/40 p-3 text-xs text-rose-900 dark:border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-200">
            <div className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-rose-700 dark:text-rose-400">
              <span>⛔ Inauspicious Windows To Avoid:</span>
            </div>
            {avoidWindows.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs">
                {avoidWindows.map((avoid, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded bg-rose-100/70 px-2 py-0.5 font-mono text-[11px] dark:bg-rose-900/50"
                    suppressHydrationWarning
                  >
                    <strong>{avoid.label}:</strong>{' '}
                    {formatPanchangTime(avoid.startTime, timezone)} -{' '}
                    {formatPanchangTime(avoid.endTime, timezone)}
                  </span>
                ))}
              </div>
            )}
            {precautions.map((p, i) => (
              <p key={i} className="text-[11px] text-rose-800 dark:text-rose-300">
                • {p}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation CTA */}
      <div className="mt-5 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <Link
          href={`/panchang?date=${isoDate}`}
          className="cursor-pointer inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <span>View Full Panchang for this Day</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
