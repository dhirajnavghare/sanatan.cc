'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FestivalTimelineItem } from '@/app/lib/festivals/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanBilingualTitle, cleanPujaMuhurta } from '@/app/lib/i18n/formatters';

interface FestivalTimelineCardProps {
  festival: FestivalTimelineItem;
  isLast?: boolean;
}

const CATEGORY_NAMES_HI: Record<string, string> = {
  Festival: 'प्रमुख पर्व',
  Vrat: 'व्रत',
  Jayanti: 'जयन्ती',
  Sankranti: 'संक्रान्ति',
  Parva: 'पावन पर्व',
};

export default function FestivalTimelineCard({ festival, isLast = false }: FestivalTimelineCardProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const [showRituals, setShowRituals] = useState(false);

  const isMajor = festival.isMajor;
  const isToday = festival.timeStatus === 'today';
  const isUpcoming = festival.timeStatus === 'upcoming';

  // Category styling
  const categoryBadgeColors = {
    Festival: 'bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300 dark:border-amber-400/30',
    Vrat: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/30',
    Jayanti: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:border-indigo-400/30',
    Sankranti: 'bg-orange-500/10 text-orange-700 border-orange-500/30 dark:bg-orange-400/10 dark:text-orange-300 dark:border-orange-400/30',
    Parva: 'bg-purple-500/10 text-purple-700 border-purple-500/30 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/30',
  }[festival.category] || 'bg-zinc-100 text-zinc-700 border-zinc-200';

  const categoryIcon = {
    Festival: '🪔',
    Vrat: '🕉️',
    Jayanti: '🌸',
    Sankranti: '☀️',
    Parva: '🌕',
  }[festival.category] || '✨';

  return (
    <div className="relative flex items-start gap-4 sm:gap-6">
      {/* Timeline Spine & Dot */}
      <div className="relative flex flex-col items-center self-stretch">
        <div
          className={`relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs shadow-sm transition-transform ${
            isToday
              ? 'bg-amber-500 text-white ring-4 ring-amber-500/25 scale-110 animate-bounce'
              : isMajor
              ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white ring-2 ring-amber-400/40'
              : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
          }`}
          title={`${isHi ? festival.nameDevanagari : festival.name} - ${isHi ? (CATEGORY_NAMES_HI[festival.category] || festival.category) : festival.category}`}
        >
          <span>{categoryIcon}</span>
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-zinc-200/90 dark:bg-zinc-800/90 my-1" />
        )}
      </div>

      {/* Main Festival Card */}
      <div
        className={`mb-6 flex-1 rounded-3xl border p-5 sm:p-6 transition-all duration-200 shadow-sm ${
          isToday
            ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-white to-white shadow-md dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900'
            : isMajor
            ? 'border-zinc-200/90 bg-white hover:border-amber-500/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900'
            : 'border-zinc-200/70 bg-white/70 dark:border-zinc-800/70 dark:bg-zinc-900/70'
        }`}
      >
        <div className="flex flex-col gap-3">
          {/* Header Row: Date & Countdown Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-serif text-xs font-bold text-zinc-900 dark:text-zinc-100 sm:text-sm">
                📅 {isHi ? (festival.formattedDateDevanagari || festival.formattedDate) : festival.formattedDate}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {isHi ? festival.dayOfWeekDevanagari : festival.dayOfWeek}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Category Pill */}
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${categoryBadgeColors}`}
              >
                <span>{categoryIcon}</span>
                <span>{isHi ? (CATEGORY_NAMES_HI[festival.category] || festival.category) : festival.category}</span>
              </span>

              {/* Countdown Pill */}
              {isToday && (
                <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-extrabold text-white animate-pulse">
                  {isHi ? 'आज' : 'Today'}
                </span>
              )}
              {isUpcoming && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {festival.daysRemaining === 1
                    ? (isHi ? 'कल' : 'Tomorrow')
                    : (isHi ? `${festival.daysRemaining} दिन शेष` : `In ${festival.daysRemaining} days`)}
                </span>
              )}
            </div>
          </div>

          {/* Festival Title */}
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl">
              {isHi ? festival.nameDevanagari : festival.name}
            </h3>
          </div>

          {/* Astrological & Hindu Calendar Context Pills */}
          <div className="flex flex-wrap gap-1.5 py-1 text-xs">
            <span className="rounded-xl border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
              🌙 <strong>{isHi ? 'मास:' : 'Masa:'}</strong>{' '}
              {isHi ? (festival.masaNameDevanagari || festival.masaName) : festival.masaName}
            </span>
            <span className="rounded-xl border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
              🌓 <strong>{isHi ? 'तिथि:' : 'Tithi:'}</strong>{' '}
              {isHi
                ? `${festival.paksha === 'Shukla' ? 'शुक्ल' : 'कृष्ण'} ${festival.tithiNameDevanagari || festival.tithiName}`
                : `${festival.paksha} ${festival.tithiName}`}
            </span>
            <span className="rounded-xl border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
              🌿 <strong>{isHi ? 'ऋतु:' : 'Ritu:'}</strong>{' '}
              {isHi ? (festival.rituDevanagari || festival.ritu) : festival.ritu}
            </span>
            {festival.deity && (
              <span className="rounded-xl border border-amber-500/20 bg-amber-50/50 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:border-amber-400/20 dark:bg-amber-950/30 dark:text-amber-300">
                🙏 <strong>{isHi ? 'आराध्य देवता:' : 'Deity:'}</strong>{' '}
                {cleanBilingualTitle(festival.deity, isHi)}
              </span>
            )}
          </div>

          {/* Auspicious Muhurta / Puja Window */}
          {festival.pujaMuhurta && (
            <div className="flex items-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs text-zinc-700 dark:border-amber-500/10 dark:text-zinc-300">
              <span className="text-amber-600 dark:text-amber-400">⏰</span>
              <div>
                <strong className="text-amber-900 dark:text-amber-300">
                  {isHi ? 'पूजा मुहूर्त एवं समय:' : 'Puja Muhurta & Timing:'}
                </strong>{' '}
                <span>{cleanPujaMuhurta(festival.pujaMuhurta, isHi)}</span>
              </div>
            </div>
          )}

          {/* Significance Narrative */}
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {festival.significance}
          </p>

          {/* Expandable Rituals Section */}
          {festival.rituals && festival.rituals.length > 0 && (
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setShowRituals(!showRituals)}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 cursor-pointer"
              >
                <span>{showRituals ? '▼' : '▶'}</span>
                <span>{isHi ? 'पर्व विधि एवं अनुष्ठान' : 'Traditional Rituals & Puja Vidhi'}</span>
              </button>

              {showRituals && (
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-3.5 text-xs dark:border-zinc-800 dark:bg-zinc-950/60">
                  <ul className="list-disc space-y-1.5 pl-4 text-zinc-600 dark:text-zinc-400">
                    {festival.rituals.map((r, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {isHi ? 'दृक सिद्धान्त पञ्चाङ्ग' : 'Drik Panchang Ephemeris'}
            </span>

            <Link
              href={festival.panchangUrl}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-700 transition hover:bg-amber-500 hover:text-white cursor-pointer dark:border-amber-400/30 dark:text-amber-300 dark:hover:bg-amber-600 dark:hover:text-white"
            >
              <span>{isHi ? 'दैनिक पञ्चाङ्ग देखें' : 'View Day Panchang'}</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
