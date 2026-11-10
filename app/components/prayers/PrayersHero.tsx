'use client';

import { PrayerRecord } from '@/app/lib/prayers/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface PrayersHeroProps {
  todayPrayer: PrayerRecord;
  onSelectPrayer: (prayer: PrayerRecord) => void;
  totalPrayers: number;
}

const DAY_NAMES_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
const DAY_NAMES_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function PrayersHero({
  todayPrayer,
  onSelectPrayer,
  totalPrayers,
}: PrayersHeroProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const dayIndex = new Date().getDay();
  const currentDayName = isHi ? DAY_NAMES_HI[dayIndex] : DAY_NAMES_EN[dayIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-6 shadow-sm backdrop-blur-xl dark:border-amber-500/20 dark:from-amber-950/30 dark:via-orange-950/15 sm:p-8">
      {/* Decorative celestial background aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Headline & Narrative */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
              <span>📿</span>
              <span>{isHi ? 'दैनिक वैदिक स्तोत्र एवं चालीसा' : 'Sacred Prayers & Chalisas'}</span>
            </span>
            <span className="rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {totalPrayers} {isHi ? 'प्रामाणिक पाठ' : 'Authentic Prayers'}
            </span>
          </div>

          <h1 className="font-serif text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {isHi ? 'सनातन नित्य प्रार्थना एवं स्तोत्र' : 'Sanatan Daily Ritual Prayers & Chalisas'}
          </h1>

          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
            {isHi
              ? 'उषाकाल एवं सायं सन्ध्या हेतु गोस्वामी तुलसीदास, महर्षि अगस्त्य, वेदों एवं आचार्यों द्वारा विरचित दिव्य स्तोत्र, चालीसा, आरती एवं नित्य मन्त्र। अक्षर आकार नियन्त्रक, जप सङ्कल्प गणक एवं ध्यान पद्धति सहित।'
              : 'Sacred classical Chalisas, Stotrams, Suktams, and daily morning invocations composed by Vedic seers and saints. Features distraction-free chanting mode, font scaling, and repetition japa counters for daily morning and evening rituals.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>{isHi ? 'शुद्ध पाठ्य संस्करण' : 'Pure Text Chanting'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-amber-500 font-bold">✓</span>
              <span>{isHi ? 'जप सङ्कल्प गणक' : 'Japa Repetition Counter'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-indigo-500 font-bold">✓</span>
              <span>{isHi ? 'सात्त्विक रात्रि एवं उषा मोड' : 'Atmospheric Night Modes'}</span>
            </span>
          </div>
        </div>

        {/* Right Side: Today's Recommended Chanting Card */}
        <div className="flex-none w-full sm:w-auto">
          <div className="rounded-3xl border border-amber-500/30 bg-white/90 p-5 shadow-lg backdrop-blur-md dark:border-amber-400/25 dark:bg-zinc-900/90 sm:min-w-[320px]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {isHi ? `आज (${currentDayName}) का पाठ` : `Today (${currentDayName})`}
              </span>
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-extrabold text-amber-700 dark:text-amber-300">
                {isHi ? 'दैनिक अनुष्ठान' : 'Daily Ritual'}
              </span>
            </div>

            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? todayPrayer.titleDevanagari : todayPrayer.title}
            </h3>

            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {isHi ? todayPrayer.subtitleDevanagari : todayPrayer.subtitle}
            </p>

            <button
              type="button"
              onClick={() => onSelectPrayer(todayPrayer)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/25 transition hover:from-amber-600 hover:to-amber-700 cursor-pointer"
            >
              <span>📿</span>
              <span>{isHi ? 'आज का पाठ आरम्भ करें' : 'Begin Daily Chanting'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
