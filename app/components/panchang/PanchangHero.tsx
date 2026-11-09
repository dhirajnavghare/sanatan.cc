'use client';

import { PanchangData } from '@/app/lib/panchang/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import MoonVisualizer from './MoonVisualizer';

interface PanchangHeroProps {
  data: PanchangData;
  onOpenLocationModal: () => void;
}

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS_SHORT_HI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
const WEEKDAYS_LONG_HI = [
  'रविवार',
  'सोमवार',
  'मंगलवार',
  'बुधवार',
  'गुरुवार',
  'शुक्रवार',
  'शनिवार',
];
const MONTHS_SHORT_HI = [
  'जन',
  'फ़र',
  'मार्च',
  'अप्रै',
  'मई',
  'जून',
  'जुला',
  'अग',
  'सितं',
  'अक्टू',
  'नवं',
  'दिसं',
];
const MONTHS_LONG_HI = [
  'जनवरी',
  'फ़रवरी',
  'मार्च',
  'अप्रैल',
  'मई',
  'जून',
  'जुलाई',
  'अगस्त',
  'सितंबर',
  'अक्टूबर',
  'नवंबर',
  'दिसंबर',
];

/**
 * Deterministic date formatter: short (e.g., "Sat, 31 Oct 2026" or "शनि, 31 अक्टू 2026")
 * Completely immune to browser vs Node.js ICU comma/punctuation hydration differences.
 */
export function formatCivilDateShort(isoDate: string, lang: 'en' | 'hi' = 'en'): string {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return isoDate;
  const anchor = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dow = anchor.getUTCDay();
  if (lang === 'hi') {
    return `${WEEKDAYS_SHORT_HI[dow]}, ${d} ${MONTHS_SHORT_HI[m - 1]} ${y}`;
  }
  return `${WEEKDAYS_SHORT[dow]}, ${d} ${MONTHS_SHORT[m - 1]} ${y}`;
}

/**
 * Deterministic date formatter: long (e.g., "Saturday, 31 October 2026" or "शनिवार, 31 अक्टूबर 2026")
 */
export function formatCivilDateLong(isoDate: string, lang: 'en' | 'hi' = 'en'): string {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return isoDate;
  const anchor = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dow = anchor.getUTCDay();
  if (lang === 'hi') {
    return `${WEEKDAYS_LONG_HI[dow]}, ${d} ${MONTHS_LONG_HI[m - 1]} ${y}`;
  }
  return `${WEEKDAYS_LONG[dow]}, ${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

export function formatPanchangTime(
  date: Date | string | null,
  timezone: string,
  options?: { showDate?: boolean; short?: boolean }
): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '—';
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      ...(options?.showDate ? { month: 'short', day: 'numeric' } : {}),
    });
    return formatter.format(d).replace(/[\u202F\u00A0]/g, ' ').toUpperCase();
  } catch {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

export default function PanchangHero({ data, onOpenLocationModal }: PanchangHeroProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const { tithi, vara, masa, sunTimes, moonTimes, location, festivals } = data;
  const majorFestivals = festivals.filter((f) => f.isMajor);

  // Format calendar date deterministically without timezone drift or hydration mismatches
  const iso = data.isoDate || data.date.toISOString().slice(0, 10);
  const dateFormatted = formatCivilDateLong(iso, language);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16173d] via-[#1c1e50] to-[#0d0e26] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
      {/* Decorative celestial background aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
        {/* Left Side: Headline & Tithi */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-serif text-2xl font-bold tracking-wide text-amber-400 sm:text-3xl">
              {isHi ? 'दैनिक पञ्चाङ्ग' : 'Daily Panchang'}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 shadow-sm backdrop-blur-sm"
              title={isHi ? 'सार्वजनिक बीटा — वेधशालाओं एवं पञ्चाङ्गों के साथ गणितीय सत्यापन' : 'Public Beta — Active mathematical verification against traditional observatories and almanacs'}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              {isHi ? 'बीटा' : 'Beta'}
            </span>
            <a
              href={`mailto:mail@sanatan.cc?subject=Panchang%20Beta%20Feedback%20%26%20Validation&body=Hi%20Sanatan.cc%20Team%2C%0A%0AI%20am%20testing%20the%20Panchang%20Beta%20calculator.%20Here%20is%20my%20feedback%20%2F%20observation%3A%0A%0A-%20Location%3A%20${encodeURIComponent(location.name)}%20(${location.latitude.toFixed(4)}%2C%20${location.longitude.toFixed(4)})%0A-%20Date%20Checked%3A%20${encodeURIComponent(data.isoDate || '')}%0A-%20Observation%20%2F%20Discrepancy%3A%0A%0AThanks!`}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-white/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-white/20 hover:text-white backdrop-blur-sm"
              title={isHi ? 'गणना सत्यापन या प्रतिक्रिया mail@sanatan.cc पर भेजें' : 'Send feedback or calculation validation notes to mail@sanatan.cc'}
            >
              <span>✉️</span>
              <span>{isHi ? 'प्रतिक्रिया भेजें' : 'Send Beta Feedback'}</span>
            </a>
            <button
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-amber-400/20"
              title={isHi ? 'अक्षांश/रेखांश या स्थान बदलने के लिए क्लिक करें' : 'Click to edit precise coordinates or change location'}
            >
              <span>📍</span>
              <span className="max-w-[200px] truncate">{location.name}</span>
              <span className="text-[10px] text-amber-400/80">({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)</span>
            </button>
          </div>

          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {isHi ? tithi.current.nameDevanagari : tithi.current.name}
          </h1>

          <p className="text-sm text-indigo-200 sm:text-base">
            {isHi ? (
              <>
                <span className="font-medium text-white">{tithi.current.pakshaDevanagari} पक्ष</span> •{' '}
                <span className="font-medium text-white">{masa.amantaNameDevanagari} मास</span> •{' '}
                <span className="font-medium text-amber-200">{vara.nameDevanagari}</span>
              </>
            ) : (
              <>
                <span className="font-medium text-white">{tithi.current.paksha} Paksha</span> •{' '}
                <span className="font-medium text-white">{masa.amantaName} Masa</span> •{' '}
                <span className="font-medium text-amber-200">{vara.name}</span>
              </>
            )}
          </p>

          <p className="text-xs text-indigo-300" suppressHydrationWarning>
            {isHi
              ? `${dateFormatted} • अक्षांश: ${location.latitude.toFixed(4)}° उ., रेखांश: ${location.longitude.toFixed(4)}° पू. (ऊँचाई: ${location.altitude} मी.)`
              : `${dateFormatted} • Coordinates: ${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(4)}°E (Alt: ${location.altitude}m)`}
          </p>

          {/* Major Festival highlight */}
          {majorFestivals.length > 0 && (
            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-xl bg-amber-500/20 px-3.5 py-1.5 ring-1 ring-amber-400/40">
              <span className="text-xs font-semibold text-amber-300">{isHi ? 'पर्व:' : 'Festival:'}</span>
              {majorFestivals.map((f, i) => (
                <span key={i} className="text-xs font-bold text-amber-100">
                  {isHi ? (f.nameDevanagari || f.name) : f.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Moon Phase Visualization */}
        <div className="flex flex-none items-center justify-center md:pr-4">
          <MoonVisualizer
            phaseAngleDeg={moonTimes.phaseAngleDeg}
            illuminationFraction={moonTimes.illuminationFraction}
            phaseName={moonTimes.phaseName}
            size={96}
          />
        </div>
      </div>

      {/* Sun & Moon Grid */}
      <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '🌅 सूर्योदय' : '🌅 Sunrise'}
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl" suppressHydrationWarning>
            {formatPanchangTime(sunTimes.sunrise, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200" suppressHydrationWarning>
            {isHi ? 'उषाकाल: ' : 'Dawn: '}
            {formatPanchangTime(sunTimes.civilDawn, location.timezone)}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-amber-300">
            {isHi ? '🌇 सूर्यास्त' : '🌇 Sunset'}
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl" suppressHydrationWarning>
            {formatPanchangTime(sunTimes.sunset, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200" suppressHydrationWarning>
            {isHi ? 'गोधूलि: ' : 'Dusk: '}
            {formatPanchangTime(sunTimes.civilDusk, location.timezone)}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            {isHi ? '☀️ मध्याह्न' : '☀️ Solar Noon'}
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl" suppressHydrationWarning>
            {formatPanchangTime(sunTimes.solarNoon, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">
            {isHi
              ? `दिनमान: ${Math.floor(sunTimes.dayLengthMs / 3600000)}घं ${Math.floor((sunTimes.dayLengthMs % 3600000) / 60000)}मि`
              : `Day length: ${Math.floor(sunTimes.dayLengthMs / 3600000)}h ${Math.floor((sunTimes.dayLengthMs % 3600000) / 60000)}m`}
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 p-3 backdrop-blur-sm">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            {isHi ? '🌕 चन्द्रोदय' : '🌕 Moonrise'}
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl" suppressHydrationWarning>
            {formatPanchangTime(moonTimes.moonrise, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">
            {isHi
              ? `चन्द्रावस्था: ${moonTimes.moonAgeDays.toFixed(1)} दिन`
              : `Age: ${moonTimes.moonAgeDays.toFixed(1)} days`}
          </span>
        </div>

        <div className="col-span-2 rounded-2xl bg-white/5 p-3 backdrop-blur-sm sm:col-span-4 lg:col-span-1">
          <span className="block text-[11px] font-medium uppercase tracking-wider text-indigo-200">
            {isHi ? '🌑 चन्द्रास्त' : '🌑 Moonset'}
          </span>
          <b className="mt-0.5 block font-mono text-lg font-bold text-white sm:text-xl" suppressHydrationWarning>
            {formatPanchangTime(moonTimes.moonset, location.timezone)}
          </b>
          <span className="text-[10px] text-indigo-200">
            {isHi
              ? `रात्रिमान: ${Math.floor(sunTimes.nightLengthMs / 3600000)}घं ${Math.floor((sunTimes.nightLengthMs % 3600000) / 60000)}मि`
              : `Night: ${Math.floor(sunTimes.nightLengthMs / 3600000)}h ${Math.floor((sunTimes.nightLengthMs % 3600000) / 60000)}m`}
          </span>
        </div>
      </div>
    </div>
  );
}
