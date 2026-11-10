'use client';

import { PrayerRecord } from '@/app/lib/prayers/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface PrayerCardProps {
  prayer: PrayerRecord;
  onSelect: (prayer: PrayerRecord) => void;
}

const DEITY_ICONS: Record<string, string> = {
  hanuman: '🚩',
  shiva: '🔱',
  devi: '🪷',
  surya: '☀️',
  vishnu: '🪶',
  ganesha: '🐘',
  daily: '🌅',
};

const CATEGORY_NAMES_HI: Record<string, string> = {
  chalisa: 'चालीसा',
  stotram: 'स्तोत्रम्',
  suktam: 'सूक्तम्',
  aarti: 'आरती',
  nitya: 'नित्य मन्त्र',
};

export default function PrayerCard({ prayer, onSelect }: PrayerCardProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const deityIcon = DEITY_ICONS[prayer.deity] || '🕉️';
  const categoryLabel = isHi
    ? (CATEGORY_NAMES_HI[prayer.category] || 'स्तोत्र')
    : (prayer.category.charAt(0).toUpperCase() + prayer.category.slice(1));

  return (
    <div
      role="button"
      tabIndex={0}
      data-testid={`prayer-card-${prayer.slug}`}
      onClick={() => onSelect(prayer)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(prayer);
        }
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 cursor-pointer"
    >
      {/* Decorative gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 opacity-80 group-hover:h-1.5 transition-all duration-300" />

      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-lg dark:bg-amber-400/10 shadow-xs">
              {deityIcon}
            </span>
            <span className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
              {categoryLabel}
            </span>
          </div>

          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {prayer.totalVerses} {isHi ? 'पद / श्लोक' : 'Verses'}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="mt-4 font-serif text-xl font-bold tracking-tight text-zinc-900 group-hover:text-amber-600 dark:text-zinc-50 dark:group-hover:text-amber-400 transition-colors">
          {isHi ? prayer.titleDevanagari : prayer.title}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {isHi ? prayer.subtitleDevanagari : prayer.subtitle}
        </p>

        {/* Author & Ideal Time */}
        <div className="mt-4 space-y-1.5 rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3 text-[11px] text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-950/60 dark:text-zinc-400">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500">{isHi ? 'रचयिता:' : 'Composer:'}</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {isHi ? prayer.authorDevanagari : prayer.author}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500">{isHi ? 'उचित समय:' : 'Ideal Time:'}</span>
            <span className="font-medium text-amber-700 dark:text-amber-400 truncate max-w-[170px]">
              {isHi ? prayer.idealTimeDevanagari : prayer.idealTime}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/60">
        <span className="text-[11px] font-medium text-zinc-400">
          {isHi ? 'नित्य पाठ एवं ध्यान' : 'Chanting & Meaning'}
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition group-hover:bg-amber-600"
        >
          <span>{isHi ? 'पाठ आरम्भ करें' : 'Start Chanting'}</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
