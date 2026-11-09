'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanPlanetLord } from '@/app/lib/i18n/formatters';
import { formatPanchangTime } from './PanchangHero';

interface CalendarDetailsProps {
  data: PanchangData;
}

export default function CalendarDetails({ data }: CalendarDetailsProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const { sunRashi, moonRashi, masa, samvat, location } = data;
  const tz = location.timezone;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
            ☀️
          </span>
          <span>{isHi ? 'सौर एवं चान्द्र संवत्सर' : 'Sky, Zodiac & Solar-Lunar Calendar'}</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {isHi ? 'निरयण राशि स्थिति' : 'Sidereal Nirayana Rashi Positions'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Sun in Rashi */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {isHi ? 'सूर्य राशि (संक्रान्ति)' : 'Sun Sign (Sankranti)'}
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {isHi ? sunRashi.current.nameDevanagari : sunRashi.current.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? `स्वामी: ${cleanPlanetLord(sunRashi.current.lord, true)}`
              : `Lord: ${cleanPlanetLord(sunRashi.current.lord, false)}`}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <span>{isHi ? 'आगामी संक्रान्ति: ' : 'Next Sankranti: '}</span>
            <strong className="text-zinc-800 dark:text-zinc-200" suppressHydrationWarning>
              {formatPanchangTime(sunRashi.endTime, tz, { showDate: true })}
            </strong>{' '}
            {isHi ? `(${sunRashi.next.nameDevanagari || sunRashi.next.name} में)` : `into ${sunRashi.next.name}`}
          </div>
        </div>

        {/* Moon in Rashi */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {isHi ? 'चन्द्र राशि' : 'Moon Sign'}
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {isHi ? moonRashi.current.nameDevanagari : moonRashi.current.name}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? `स्वामी: ${cleanPlanetLord(moonRashi.current.lord, true)}`
              : `Lord: ${cleanPlanetLord(moonRashi.current.lord, false)}`}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <span>{isHi ? 'समाप्ति काल: ' : 'Till '}</span>
            <strong className="text-zinc-800 dark:text-zinc-200" suppressHydrationWarning>
              {formatPanchangTime(moonRashi.endTime, tz, { showDate: true })}
            </strong>
            {isHi ? `, फिर ${moonRashi.next.nameDevanagari || moonRashi.next.name}` : `, then ${moonRashi.next.name}`}
          </div>
        </div>

        {/* Lunar Month (Masa) */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {isHi ? 'चान्द्र मास' : 'Lunar Month'}
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {isHi ? masa.amantaNameDevanagari : masa.amantaName}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi ? 'अमान्त (मुख्य पद्धति)' : 'Amanta System'}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <div>
              {isHi ? 'पूर्णिमान्त: ' : 'Purnimanta: '}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {isHi ? masa.purnimantaNameDevanagari || masa.purnimantaName : masa.purnimantaName}
              </strong>
            </div>
            {masa.isAdhika && (
              <span className="mt-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                {isHi ? '★ अधिक मास (मलमास)' : '★ Adhika Masa (Malmasa)'}
              </span>
            )}
          </div>
        </div>

        {/* Samvat & Vedic Seasons */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {isHi ? 'संवत्सर एवं ऋतु' : 'Samvat & Seasons'}
          </span>
          <h3 className="mt-2 font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {isHi ? `विक्रम संवत् ${samvat.vikramSamvat}` : `Vikram ${samvat.vikramSamvat}`}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? `शक संवत् ${samvat.shakaSamvat} • कलियुग ${samvat.kaliSamvat}`
              : `Shaka ${samvat.shakaSamvat} • Kaliyuga ${samvat.kaliSamvat}`}
          </p>
          <div className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <div>
              {isHi ? 'अयन: ' : 'Ayana: '}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {isHi ? samvat.ayanaDevanagari : samvat.ayana}
              </strong>
            </div>
            <div>
              {isHi ? 'ऋतु: ' : 'Ritu: '}
              <strong className="text-zinc-800 dark:text-zinc-200">
                {isHi ? samvat.rituDevanagari : samvat.ritu}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
