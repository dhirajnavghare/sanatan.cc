'use client';

import { useMemo } from 'react';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface SacredWeekStripProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  isHi: boolean;
}

export default function SacredWeekStrip({
  currentDate,
  onSelectDate,
  isHi,
}: SacredWeekStripProps) {
  const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayNamesHi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  // Generate 7-day pill week based on currentDate
  const weekDays = useMemo(() => {
    const list: Date[] = [];
    const base = new Date(currentDate);
    const dayOfWeek = base.getDay(); // 0 = Sunday
    const startSunday = new Date(base);
    startSunday.setDate(base.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const d = new Date(startSunday);
      d.setDate(startSunday.getDate() + i);
      list.push(d);
    }
    return list;
  }, [currentDate]);

  const handleSelect = (d: Date) => {
    triggerHaptic('tap');
    onSelectDate(d);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const today = new Date();

  return (
    <div
      data-testid="week-strip-container"
      className="grid grid-cols-7 gap-1.5 sm:gap-2 rounded-2xl border border-zinc-200/80 bg-white/80 p-2 shadow-xs backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      {weekDays.map((d, index) => {
        const isSelected = isSameDay(d, currentDate);
        const isTodayDate = isSameDay(d, today);
        const dayNum = d.getDate();
        const dayName = isHi ? dayNamesHi[d.getDay()] : dayNamesEn[d.getDay()];

        return (
          <button
            key={index}
            type="button"
            data-testid={isSelected ? 'day-pill-selected' : `day-pill-${index}`}
            onClick={() => handleSelect(d)}
            className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition cursor-pointer ${
              isSelected
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
                : 'hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            {/* Status dot */}
            <span
              className={`h-1.5 w-1.5 rounded-full mb-1 ${
                isSelected
                  ? 'bg-white'
                  : isTodayDate
                  ? 'bg-amber-500'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
            <span
              className={`text-[11px] font-semibold tracking-wider uppercase ${
                isSelected ? 'text-amber-100' : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {dayName}
            </span>
            <span className="font-serif text-base font-extrabold sm:text-lg">
              {dayNum}
            </span>
          </button>
        );
      })}
    </div>
  );
}
