'use client';

import { useState, useMemo } from 'react';
import { GeoLocation } from '@/app/lib/panchang/types';
import { calculatePanchang } from '@/app/lib/panchang';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface MonthlyCalendarGridProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  location: GeoLocation;
  isHi: boolean;
}

export default function MonthlyCalendarGrid({
  currentDate,
  onSelectDate,
  location,
  isHi,
}: MonthlyCalendarGridProps) {
  const [viewYear, setViewYear] = useState(() => currentDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => currentDate.getMonth());

  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthNamesHi = [
    'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितम्बर', 'अक्टूबर', 'नवम्बर', 'दिसम्बर',
  ];

  const weekHeadersEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekHeadersHi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const handlePrevMonth = () => {
    triggerHaptic('tap');
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    triggerHaptic('tap');
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    triggerHaptic('tap');
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onSelectDate(now);
  };

  // Build grid of days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const lastDayOfMonth = new Date(viewYear, viewMonth + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // Preceding padding
    for (let i = 0; i < startDayOfWeek; i++) {
      const padDate = new Date(viewYear, viewMonth, 1 - (startDayOfWeek - i));
      days.push({
        date: padDate,
        dayNumber: padDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }

    const today = new Date();

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(viewYear, viewMonth, d);
      const isToday =
        dayDate.getFullYear() === today.getFullYear() &&
        dayDate.getMonth() === today.getMonth() &&
        dayDate.getDate() === today.getDate();
      const isSelected =
        dayDate.getFullYear() === currentDate.getFullYear() &&
        dayDate.getMonth() === currentDate.getMonth() &&
        dayDate.getDate() === currentDate.getDate();

      // Quick panchang info
      let tithiShort = '';
      let isEkadashi = false;
      let isPurnima = false;
      let isAmavasya = false;
      let isPradosh = false;

      try {
        const p = calculatePanchang(dayDate, location);
        const idx = p.tithi.current.pakshaIndex;
        const paksha = p.tithi.current.paksha;
        tithiShort = isHi ? p.tithi.current.nameDevanagari : p.tithi.current.name;
        isEkadashi = idx === 11;
        isPradosh = idx === 13;
        isPurnima = idx === 15 && paksha === 'Shukla';
        isAmavasya = idx === 15 && paksha === 'Krishna';
      } catch {}

      days.push({
        date: dayDate,
        dayNumber: d,
        isCurrentMonth: true,
        isToday,
        isSelected,
        tithiShort,
        isEkadashi,
        isPurnima,
        isAmavasya,
        isPradosh,
      });
    }

    return days;
  }, [viewYear, viewMonth, currentDate, location, isHi]);

  return (
    <div
      data-testid="monthly-calendar-grid"
      className="space-y-4 rounded-3xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
    >
      {/* Month Navigator Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
            {isHi ? monthNamesHi[viewMonth] : monthNamesEn[viewMonth]} {viewYear}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi ? 'मासिक वैदिक पञ्चाङ्ग एवं एकादशी/व्रत ग्रिड' : 'Monthly Vedic Panchang & Vrat Grid'}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleToday}
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
          >
            {isHi ? 'आज' : 'Today'}
          </button>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-sm font-bold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* Day of Week Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {(isHi ? weekHeadersHi : weekHeadersEn).map((d, i) => (
          <div
            key={i}
            className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {calendarDays.map((cell, idx) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={idx}
                className="h-16 rounded-xl p-1 text-zinc-300 dark:text-zinc-700 opacity-40"
              >
                <span className="text-xs">{cell.dayNumber}</span>
              </div>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                triggerHaptic('tap');
                onSelectDate(cell.date);
              }}
              className={`min-h-[72px] sm:min-h-[80px] flex flex-col justify-between rounded-xl p-1.5 text-left transition cursor-pointer ${
                cell.isSelected
                  ? 'border-2 border-amber-500 bg-amber-500/10 dark:bg-amber-950/30'
                  : cell.isToday
                  ? 'border border-amber-400/70 bg-amber-50/40 dark:border-amber-700/60 dark:bg-amber-950/20'
                  : 'border border-zinc-200/70 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-serif text-sm font-bold ${
                    cell.isSelected
                      ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {cell.dayNumber}
                </span>

                {cell.isToday && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                )}
              </div>

              {/* Tithi name and badges */}
              <div className="space-y-0.5">
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {cell.tithiShort}
                </div>

                {cell.isEkadashi && (
                  <span className="inline-block rounded bg-purple-500/15 px-1 py-0.2 text-[9px] font-bold text-purple-700 dark:text-purple-300">
                    एकादशी
                  </span>
                )}
                {cell.isPurnima && (
                  <span className="inline-block rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-bold text-amber-800 dark:text-amber-300">
                    पूर्णिमा
                  </span>
                )}
                {cell.isAmavasya && (
                  <span className="inline-block rounded bg-zinc-800 px-1 py-0.2 text-[9px] font-bold text-zinc-100">
                    अमावस्या
                  </span>
                )}
                {cell.isPradosh && !cell.isEkadashi && (
                  <span className="inline-block rounded bg-indigo-500/15 px-1 py-0.2 text-[9px] font-bold text-indigo-700 dark:text-indigo-300">
                    प्रदोष
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
