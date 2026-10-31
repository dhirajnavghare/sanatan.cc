'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import { formatPanchangTime } from './PanchangHero';

interface CalendarDetailsProps {
  data: PanchangData;
}

export default function CalendarDetails({ data }: CalendarDetailsProps) {
  const { sunRashi, moonRashi, masa, samvat, location } = data;
  const tz = location.timezone;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
            ☀️
          </span>
          <span>Sky, Zodiac & Solar-Lunar Calendar (सौर एवं चान्द्र संवत्सर)</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Sidereal Nirayana Rashi Positions
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sun in Rashi */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Sun Sign (सूर्य राशि / संक्रान्ति)
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {sunRashi.current.name} ({sunRashi.current.englishName})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {sunRashi.current.nameDevanagari} • Lord: {sunRashi.current.lord}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <span>Next Sankranti: </span>
            <strong className="text-zinc-800 dark:text-zinc-200">
              {formatPanchangTime(sunRashi.endTime, tz, { showDate: true })}
            </strong>{' '}
            into {sunRashi.next.name}
          </div>
        </div>

        {/* Moon in Rashi */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Moon Sign (चन्द्र राशि)
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {moonRashi.current.name} ({moonRashi.current.englishName})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {moonRashi.current.nameDevanagari} • Lord: {moonRashi.current.lord}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <span>Till </span>
            <strong className="text-zinc-800 dark:text-zinc-200">
              {formatPanchangTime(moonRashi.endTime, tz, { showDate: true })}
            </strong>
            , then {moonRashi.next.name}
          </div>
        </div>

        {/* Lunar Month (Masa) */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Lunar Month (चान्द्र मास)
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {masa.amantaName}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {masa.amantaNameDevanagari} (अमान्त / मुख्य पद्धति)
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <div>
              Purnimanta: <strong className="text-zinc-800 dark:text-zinc-200">{masa.purnimantaName}</strong>
            </div>
            {masa.isAdhika && (
              <span className="mt-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                ★ Adhika Masa (अधिक मास / Malmasa)
              </span>
            )}
          </div>
        </div>

        {/* Samvat & Vedic Seasons */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Samvat & Ritu (संवत्सर एवं ऋतु)
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Vikram {samvat.vikramSamvat}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Shaka {samvat.shakaSamvat} • Kaliyuga {samvat.kaliSamvat}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <div>
              Ayana: <strong className="text-zinc-800 dark:text-zinc-200">{samvat.ayana}</strong> ({samvat.ayanaDevanagari})
            </div>
            <div>
              Ritu: <strong className="text-zinc-800 dark:text-zinc-200">{samvat.ritu}</strong> ({samvat.rituDevanagari})
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
