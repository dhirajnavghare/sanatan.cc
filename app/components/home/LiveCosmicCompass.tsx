'use client';

import { useState, useEffect, useMemo } from 'react';
import { PanchangData } from '@/app/lib/panchang/types';
import {
  getLiveCosmicStatus,
  buildDayPlannerSlots,
  DayPlansMap,
  LiveCosmicStatus,
} from '@/app/lib/services/dayplanner';

interface LiveCosmicCompassProps {
  panchang: PanchangData;
  timezone: string;
  isHi: boolean;
  dayPlans?: DayPlansMap;
}

export default function LiveCosmicCompass({
  panchang,
  timezone,
  isHi,
  dayPlans = {},
}: LiveCosmicCompassProps) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const liveStatus: LiveCosmicStatus = useMemo(() => {
    return getLiveCosmicStatus(panchang, now, timezone);
  }, [panchang, now, timezone]);

  const plannerSlots = useMemo(() => {
    return buildDayPlannerSlots(panchang, now);
  }, [panchang, now]);

  const activeSlotTodos = useMemo(() => {
    const nowMs = now.getTime();
    const currentSlot = plannerSlots.find(
      (s) => nowMs >= s.startTime.getTime() && nowMs <= s.endTime.getTime()
    );
    if (!currentSlot) return null;
    const plan = dayPlans[currentSlot.id];
    if (!plan) return null;
    const pending = plan.todos
      ? plan.todos.filter((t) => !t.isCompleted)
      : plan.taskText && !plan.isCompleted
      ? [{ id: 'legacy', text: plan.taskText, isCompleted: false, createdAt: plan.updatedAt || 0 }]
      : [];
    if (pending.length === 0) return null;
    return { slot: currentSlot, tasks: pending };
  }, [plannerSlots, dayPlans, now]);

  return (
    <div
      data-testid="live-cosmic-compass"
      className="relative overflow-hidden rounded-3xl border p-5 shadow-sm transition sm:p-6"
      style={{
        backgroundColor: liveStatus.badgeBg,
        borderColor: liveStatus.accentColor + '55',
      }}
    >
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full animate-ping"
            style={{ backgroundColor: liveStatus.accentColor }}
          />
          <span
            className="text-xs font-extrabold uppercase tracking-wider"
            style={{ color: liveStatus.accentColor }}
          >
            {isHi ? liveStatus.badgeHi : liveStatus.badgeEn}
          </span>
        </div>

        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-zinc-700 dark:text-zinc-200"
        >
          {isHi ? liveStatus.windowHi : liveStatus.windowEn}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-2 font-serif text-lg font-bold text-zinc-900 sm:text-xl dark:text-zinc-100">
        {isHi ? liveStatus.titleHi : liveStatus.titleEn}
      </h3>

      {/* Description */}
      <p className="mt-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
        {isHi ? liveStatus.descriptionHi : liveStatus.descriptionEn}
      </p>

      {/* Active Tasks Planned for this window */}
      {activeSlotTodos && activeSlotTodos.tasks.length > 0 && (
        <div className="mt-3.5 rounded-2xl bg-white/80 p-3 shadow-xs dark:bg-zinc-900/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            {isHi ? '🎯 इस समय हेतु नियोजित कार्य:' : '🎯 Tasks planned for this active window:'}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {activeSlotTodos.tasks.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-900 dark:text-amber-200"
              >
                <span>•</span>
                <span>{t.text}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
