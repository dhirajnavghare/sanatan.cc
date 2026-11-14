'use client';

import { useState, useMemo } from 'react';
import { ALL_RASHIS, getDailyRashiOutlook } from '@/app/lib/services/rashiBhavishya';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface DailyRashiCardProps {
  moonRashiIndex: number;
  savedRashiIndex?: number;
  onSaveRashi?: (rashiIdx: number) => void;
  isHi: boolean;
}

export default function DailyRashiCard({
  moonRashiIndex,
  savedRashiIndex,
  onSaveRashi,
  isHi,
}: DailyRashiCardProps) {
  const [selectedRashi, setSelectedRashi] = useState<number>(
    savedRashiIndex !== undefined ? savedRashiIndex : moonRashiIndex || 0
  );

  const outlook = useMemo(() => {
    return getDailyRashiOutlook(selectedRashi, moonRashiIndex, new Date());
  }, [selectedRashi, moonRashiIndex]);

  const activeRashiMeta = ALL_RASHIS[selectedRashi] || ALL_RASHIS[0];
  const isMyRashi = savedRashiIndex === selectedRashi;

  const handleSelect = (idx: number) => {
    triggerHaptic('tap');
    setSelectedRashi(idx);
  };

  const handleSetMyRashi = () => {
    triggerHaptic('tap');
    if (onSaveRashi) {
      onSaveRashi(selectedRashi);
    }
  };

  return (
    <div
      data-testid="daily-rashi-card"
      className="flex flex-col gap-5 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪐</span>
            <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              {isHi ? 'दैनिक गोचर राशिफल व उपाय' : 'Daily Vedic Horoscope & Remedy'}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi
              ? 'चन्द्र गोचर आधारित प्रामाणिक फल एवं दैनिक साधना'
              : 'Authentic Moon transit outlook & daily spiritual remedies'}
          </p>
        </div>

        {onSaveRashi && (
          <button
            type="button"
            data-testid="rashi-set-my-btn"
            onClick={handleSetMyRashi}
            className={`self-start sm:self-auto rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
              isMyRashi
                ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                : 'border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
            }`}
          >
            {isMyRashi ? (isHi ? '✓ मेरी राशि' : '✓ My Sign') : (isHi ? '+ मेरी राशि चुनें' : '+ Set My Sign')}
          </button>
        )}
      </div>

      {/* 12 Rashi Horizontal Pill Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {ALL_RASHIS.map((r) => {
          const isSelected = r.index === selectedRashi;
          const isUserSaved = savedRashiIndex === r.index;
          return (
            <button
              key={r.index}
              type="button"
              data-testid={`rashi-pill-${r.index}`}
              onClick={() => handleSelect(r.index)}
              className={`flex-none flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-400/50'
                  : 'border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
              }`}
            >
              <span>{r.symbol}</span>
              <span>{isHi ? r.nameHi : r.nameEn}</span>
              {isUserSaved && <span className="text-[10px] text-amber-200">★</span>}
            </button>
          );
        })}
      </div>

      {/* Active Rashi Details Card */}
      <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/60 pb-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeRashiMeta.symbol}</span>
            <div>
              <div className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                {isHi ? activeRashiMeta.nameHi : activeRashiMeta.nameEn}{' '}
                <span className="text-xs font-normal text-zinc-500">
                  ({isHi ? activeRashiMeta.elementHi : activeRashiMeta.elementEn})
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {isHi ? 'स्वामी:' : 'Lord:'} {isHi ? activeRashiMeta.lordHi : activeRashiMeta.lordEn} • {isHi ? 'इष्टदेव:' : 'Deity:'} {isHi ? activeRashiMeta.ishtadevHi : activeRashiMeta.ishtadevEn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
              {isHi ? 'भाग्यशाली रंग:' : 'Lucky Color:'} {isHi ? activeRashiMeta.luckyColorHi : activeRashiMeta.luckyColorEn}
            </span>
            <span className="rounded-lg bg-indigo-500/10 px-2 py-1 text-xs font-bold text-indigo-800 dark:text-indigo-300">
              {isHi ? 'अंक:' : 'No:'} {activeRashiMeta.luckyNumber}
            </span>
          </div>
        </div>

        {/* House Transit Title & Guidance */}
        <div className="mt-2 text-xs font-bold text-amber-700 dark:text-amber-400">
          {isHi ? outlook.houseTitleHi : outlook.houseTitleEn} • {isHi ? outlook.energyLevelHi : outlook.energyLevelEn}
        </div>
        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {isHi ? outlook.guidanceHi : outlook.guidanceEn}
        </p>

        {/* Satvik Remedy (शास्त्रीय उपाय) */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-amber-300/80 bg-amber-50/60 p-3 dark:border-amber-900/50 dark:bg-amber-950/20">
          <span className="text-base">🪔</span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              {isHi ? 'आज का शास्त्रीय उपाय (Vedic Remedy):' : "Today's Vedic Remedy:"}
            </div>
            <p className="mt-0.5 text-xs text-zinc-800 dark:text-zinc-200">
              {isHi ? outlook.satvikActionHi : outlook.satvikActionEn}
            </p>
            <div className="mt-1 font-serif text-xs font-semibold text-amber-900 dark:text-amber-200">
              {activeRashiMeta.seedMantra}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
