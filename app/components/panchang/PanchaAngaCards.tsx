'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanPlanetLord, cleanDeityName } from '@/app/lib/i18n/formatters';
import { formatPanchangTime } from './PanchangHero';

interface PanchaAngaCardsProps {
  data: PanchangData;
}

export default function PanchaAngaCards({ data }: PanchaAngaCardsProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const { tithi, nakshatra, yoga, karana, vara, location } = data;
  const tz = location.timezone;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
            ५
          </span>
          <span>{isHi ? 'पञ्चाङ्ग के ५ अंग' : 'The 5 Sacred Limbs (Pancha-Anga)'}</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {isHi
            ? 'सूर्योदय कालीन गणना • लाहिरी सायन / निरयण पञ्चाङ्ग'
            : 'Calculated at Sunrise • Lahiri Sidereal Ephemeris'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1. Tithi Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? '१. तिथि' : '1. Tithi'}
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              {isHi ? `${tithi.current.pakshaDevanagari} पक्ष` : `${tithi.current.paksha} Paksha`}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {isHi ? tithi.current.nameDevanagari : tithi.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {isHi ? `${tithi.current.pakshaDevanagari} पक्ष` : `${tithi.current.paksha} Paksha`}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>
                {isHi ? 'समाप्ति काल: ' : 'Till '}
                {formatPanchangTime(tithi.endTime, tz, { showDate: true })}
              </span>
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
            <span>
              {isHi ? 'आगामी: ' : 'Next: '}
              <strong className="text-zinc-700 dark:text-zinc-200">
                {isHi ? tithi.next.nameDevanagari || tithi.next.name : tithi.next.name}
              </strong>
            </span>
            <span>{isHi ? 'देवता: ' : 'Deity: '}{cleanDeityName(tithi.current.deity, isHi)}</span>
          </div>
        </div>

        {/* 2. Nakshatra Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? '२. नक्षत्र' : '2. Nakshatra'}
            </span>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
              {isHi ? `चरण ${nakshatra.current.pada} (४ में से)` : `Pada ${nakshatra.current.pada} of 4`}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {isHi ? nakshatra.current.nameDevanagari : nakshatra.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {isHi
                ? `स्वामी: ${cleanPlanetLord(nakshatra.current.lord, true)}`
                : `Lord: ${cleanPlanetLord(nakshatra.current.lord, false)}`}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>
                {isHi ? 'समाप्ति काल: ' : 'Till '}
                {formatPanchangTime(nakshatra.endTime, tz, { showDate: true })}
              </span>
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
            <span>
              {isHi ? 'आगामी: ' : 'Next: '}
              <strong className="text-zinc-700 dark:text-zinc-200">
                {isHi ? nakshatra.next.nameDevanagari || nakshatra.next.name : nakshatra.next.name}
              </strong>
            </span>
            <span>{isHi ? 'देवता: ' : 'Deity: '}{cleanDeityName(nakshatra.current.deity, isHi)}</span>
          </div>
        </div>

        {/* 3. Yoga Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? '३. योग' : '3. Yoga'}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                yoga.current.nature === 'Auspicious'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
              }`}
            >
              {isHi ? (yoga.current.nature === 'Auspicious' ? 'शुभ' : 'अशुभ') : yoga.current.nature}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {isHi ? yoga.current.nameDevanagari : yoga.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {isHi ? 'सूर्य-चन्द्र का संयुक्त योग' : 'Solilunar combination'}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>
                {isHi ? 'समाप्ति काल: ' : 'Till '}
                {formatPanchangTime(yoga.endTime, tz, { showDate: true })}
              </span>
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
            <span>
              {isHi ? 'आगामी: ' : 'Next: '}
              <strong className="text-zinc-700 dark:text-zinc-200">
                {isHi ? yoga.next.nameDevanagari || yoga.next.name : yoga.next.name}
              </strong>
            </span>
            <span>{isHi ? `संख्या ${yoga.current.index} (२७ में से)` : `Index ${yoga.current.index} of 27`}</span>
          </div>
        </div>

        {/* 4. Karana Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? '४. करण' : '4. Karana'}
            </span>
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-medium text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              {isHi
                ? (karana.current.type === 'Chara' ? 'चर (तिथि अर्ध)' : 'स्थिर (तिथि अर्ध)')
                : `${karana.current.type} (Half-Tithi)`}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
              {isHi ? karana.current.nameDevanagari : karana.current.name}
            </h3>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {isHi
                ? `देवता: ${cleanDeityName(karana.current.deity, true)}`
                : `Deity: ${cleanDeityName(karana.current.deity, false)}`}
            </span>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
              <span suppressHydrationWarning>
                {isHi ? 'समाप्ति काल: ' : 'Till '}
                {formatPanchangTime(karana.endTime, tz, { showDate: true })}
              </span>
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
            <span>
              {isHi ? 'आगामी: ' : 'Next: '}
              <strong className="text-zinc-700 dark:text-zinc-200">
                {isHi ? karana.next.nameDevanagari || karana.next.name : karana.next.name}
              </strong>
            </span>
            <span>{isHi ? `संख्या ${karana.current.index} (६० में से)` : `Index ${karana.current.index} of 60`}</span>
          </div>
        </div>

        {/* 5. Vara Card */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm transition hover:shadow-md sm:col-span-2 lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isHi ? '५. वार' : '5. Solar Day'}
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              {isHi ? 'सौर दिवस (सूर्योदय-आधारित)' : 'Solar Weekday (Sunrise-based)'}
            </span>
          </div>

          <div className="mt-2 flex flex-col justify-between sm:flex-row sm:items-center">
            <div>
              <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {isHi ? vara.nameDevanagari : vara.name}
              </h3>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {isHi ? (
                  <>अधिपति ग्रह: <strong className="text-zinc-800 dark:text-zinc-200">{cleanPlanetLord(vara.lordPlanet, true)}</strong></>
                ) : (
                  <>Ruling Planet: <strong className="text-zinc-800 dark:text-zinc-200">{cleanPlanetLord(vara.lordPlanet, false)}</strong></>
                )}
              </span>
            </div>
            <div className="mt-2 text-xs text-zinc-500 sm:mt-0 sm:text-right dark:text-zinc-400" suppressHydrationWarning>
              {isHi
                ? `सूर्योदय कालीन आरम्भ: ${formatPanchangTime(data.sunTimes.sunrise, tz)}`
                : `Civil day ruled by sunrise at ${formatPanchangTime(data.sunTimes.sunrise, tz)}`}
            </div>
          </div>

          <div className="mt-3 border-t border-zinc-100 pt-2.5 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
            {isHi
              ? 'सनातन धर्म परम्परा में दिन (अहोरात्र) का आरम्भ स्थानीय सूर्योदय से माना जाता है, मध्यरात्रि १२:०० से नहीं।'
              : 'In Hindu Sanatan tradition, the day (Ahoratra) commences at local Surya Udaya (Sunrise), not standard civil midnight.'}
          </div>
        </div>
      </div>
    </section>
  );
}
