'use client';

import { useState, useMemo } from 'react';
import { GeoLocation, ChoghadiyaPeriod } from '@/app/lib/panchang/types';
import { calculatePanchang } from '@/app/lib/panchang';

interface LiveChoghadiyaClockProps {
  location: GeoLocation;
}

const CHOGHADIYA_EXPLAINER: Record<string, { desc: string; suitable: string; badge: string }> = {
  Amrit: {
    desc: 'Ruled by Moon / Mercury. Pure nectar; universally auspicious for all actions.',
    suitable: 'Spiritual initiation, investments, ceremonies, travel, and business launch.',
    badge: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  },
  Shubh: {
    desc: 'Ruled by Jupiter. Highly auspicious and divine blessing window.',
    suitable: 'Marriage rituals, religious rites, purchases, learning, and agreements.',
    badge: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
  },
  Labh: {
    desc: 'Ruled by Mercury. Highly beneficial for wealth accumulation and commerce.',
    suitable: 'Starting commercial trade, signing contracts, buying assets, education.',
    badge: 'bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-500/30',
  },
  Char: {
    desc: 'Ruled by Venus. Mobile and dynamic energy.',
    suitable: 'Travel, vehicle driving, journey start, sports, and fast-moving tasks.',
    badge: 'bg-blue-500/20 text-blue-800 dark:text-blue-300 border-blue-500/30',
  },
  Rog: {
    desc: 'Ruled by Mars. Negative energy; indicates strife, disputes, or illness.',
    suitable: 'Medical consultations or warfare; strictly avoid auspicious beginnings.',
    badge: 'bg-red-500/20 text-red-800 dark:text-red-300 border-red-500/30',
  },
  Kaal: {
    desc: 'Ruled by Saturn. Heavy karmic pressure; indicates delay or loss.',
    suitable: 'Demolition or debt clearance; avoid launching new ventures or travel.',
    badge: 'bg-rose-500/20 text-rose-800 dark:text-rose-300 border-rose-500/30',
  },
  Udveg: {
    desc: 'Ruled by Sun. Creates mental anxiety, restlessness, and sudden turbulence.',
    suitable: 'Government tax compliance or state duties; avoid celebrations.',
    badge: 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30',
  },
};

export default function LiveChoghadiyaClock({ location }: LiveChoghadiyaClockProps) {
  const [tab, setTab] = useState<'day' | 'night'>('day');
  const [selectedPeriod, setSelectedPeriod] = useState<ChoghadiyaPeriod | null>(null);

  const now = useMemo(() => new Date(), []);
  const panchang = useMemo(() => {
    return calculatePanchang(now, location, 'Lahiri', now);
  }, [now, location]);

  const periods = tab === 'day' ? panchang.choghadiya.day : panchang.choghadiya.night;
  const currentPeriod = useMemo(() => {
    const all = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
    return all.find((c) => c.isCurrent) || periods[0];
  }, [panchang, periods]);

  const activeInspection = selectedPeriod || currentPeriod;
  const explainer = CHOGHADIYA_EXPLAINER[activeInspection.quality] || {
    desc: 'Vedic hourly muhurta division.',
    suitable: 'General day tasks.',
    badge: 'bg-zinc-100 text-zinc-800',
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header with Day/Night Switcher */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>⌛</span>
            <span>चोघड़िया समय चक्र • Vedic Muhurta Segments</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Live Choghadiya Dial
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            The traditional 16-period daily Vedic clock divided into Day (Din-Māna) and Night (Rātri-Māna)
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => {
              setTab('day');
              setSelectedPeriod(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              tab === 'day'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <span>☀️</span>
            <span>Daytime (8)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('night');
              setSelectedPeriod(null);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              tab === 'night'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <span>🌙</span>
            <span>Nighttime (8)</span>
          </button>
        </div>
      </div>

      {/* Interactive 8-Period Horizontal Slider / Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {periods.map((period, idx) => {
          const isSelected = activeInspection.name === period.name && activeInspection.startTime.getTime() === period.startTime.getTime();
          const isCurrent = period.isCurrent;
          const isAuspicious =
            period.quality === 'Amrit' ||
            period.quality === 'Shubh' ||
            period.quality === 'Labh';

          return (
            <div
              key={`${period.name}-${idx}`}
              onClick={() => setSelectedPeriod(period)}
              className={`group relative flex flex-col justify-between rounded-2xl border p-3 transition-all duration-200 cursor-pointer ${
                isCurrent
                  ? 'border-amber-500 bg-amber-500/10 shadow-md ring-2 ring-amber-400/40 dark:bg-amber-400/10'
                  : isSelected
                  ? 'border-zinc-400 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800'
                  : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:bg-zinc-800'
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.2 text-[9px] font-bold text-white uppercase shadow-sm">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                    Now
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500">#{idx + 1}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                      isAuspicious
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : period.quality === 'Char'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    }`}
                  >
                    {period.quality}
                  </span>
                </div>

                <h3 className="mt-1.5 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {period.name}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {period.nameDevanagari}
                </p>
              </div>

              <div className="mt-3 border-t border-zinc-200/60 pt-2 text-[10px] dark:border-zinc-800">
                <p className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  {formatHourMinute(period.startTime, location.timezone)} - {formatHourMinute(period.endTime, location.timezone)}
                </p>
                <p className="mt-0.5 text-zinc-500 dark:text-zinc-400">
                  Lord: <span className="font-semibold text-zinc-700 dark:text-zinc-200">{period.ruler}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Inspector for the clicked/current Choghadiya */}
      <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-2xl text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              {activeInspection.quality === 'Amrit' || activeInspection.quality === 'Shubh' || activeInspection.quality === 'Labh' ? '✨' : '⌛'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {activeInspection.name} Choghadiya ({activeInspection.nameDevanagari})
                </h4>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${explainer.badge}`}>
                  {activeInspection.quality} Tier
                </span>
                {activeInspection.isCurrent && (
                  <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    Active Right Now
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Timing: <strong className="font-mono text-zinc-900 dark:text-zinc-100">{formatHourMinute(activeInspection.startTime, location.timezone)} to {formatHourMinute(activeInspection.endTime, location.timezone)}</strong> • Ruling Graha: <strong>{activeInspection.ruler}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Tap any segment above to inspect</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-zinc-200/60 pt-3 text-xs sm:grid-cols-2 dark:border-zinc-800">
          <div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Shastra Significance:</span>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {explainer.desc}
            </p>
          </div>
          <div>
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Recommended Activities:</span>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {explainer.suitable}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatHourMinute(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
