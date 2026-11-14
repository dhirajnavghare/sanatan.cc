'use client';

import { useState, useEffect, useMemo } from 'react';
import { PanchangData } from '@/app/lib/panchang/types';
import {
  DAILY_SADHANA_HABITS,
  getCompletedHabits,
  toggleHabitCompletion,
  getSadhanaStreak,
  getDateKey,
} from '@/app/lib/services/sadhana';
import { generateDailySankalpa } from '@/app/lib/services/dinacharya';
import { triggerHaptic } from '@/app/lib/services/sacredAudio';

interface SacredAlignmentHubProps {
  panchang: PanchangData;
  locationName: string;
  userName?: string;
  gotra?: string;
  isHi: boolean;
}

export default function SacredAlignmentHub({
  panchang,
  locationName,
  userName,
  gotra,
  isHi,
}: SacredAlignmentHubProps) {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState<number>(1);
  const [isSadhanaModalOpen, setIsSadhanaModalOpen] = useState(false);
  const [isSankalpaModalOpen, setIsSankalpaModalOpen] = useState(false);
  const [copiedSankalpa, setCopiedSankalpa] = useState(false);

  const todayKey = useMemo(() => getDateKey(new Date()), []);

  useEffect(() => {
    getCompletedHabits(todayKey).then(setCompletedHabits);
    getSadhanaStreak().then(setStreakCount);
  }, [todayKey]);

  const dailySankalpa = useMemo(() => {
    return generateDailySankalpa(panchang, locationName, userName, gotra);
  }, [panchang, locationName, userName, gotra]);

  const handleToggleHabit = async (habitId: string) => {
    await triggerHaptic('tap');
    const updated = await toggleHabitCompletion(todayKey, habitId);
    setCompletedHabits(updated);
    const newStreak = await getSadhanaStreak();
    setStreakCount(newStreak);
  };

  const handleCopySankalpa = async () => {
    try {
      const text = `${dailySankalpa.sanskrit}\n\n[अर्थ]: ${dailySankalpa.hindi}\n\n— सनातन पञ्चाङ्ग (sanatan.cc)`;
      await navigator.clipboard.writeText(text);
      setCopiedSankalpa(true);
      setTimeout(() => setCopiedSankalpa(false), 2000);
      await triggerHaptic('success');
    } catch {}
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Left Card: Daily Sadhana Checklist */}
        <div
          data-testid="hero-challenge-card"
          onClick={() => {
            triggerHaptic('tap');
            setIsSadhanaModalOpen(true);
          }}
          className="group flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-5 shadow-xs transition hover:border-emerald-500/50 hover:shadow-sm cursor-pointer dark:border-emerald-500/20 dark:bg-zinc-900"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {isHi ? '📿 नित्यकर्म साधना' : '📿 Daily Sadhana'}
              </span>
              {streakCount > 0 && (
                <span className="rounded-full bg-orange-500/15 px-2 py-0.5 text-[11px] font-bold text-orange-600 dark:text-orange-400">
                  🔥 {streakCount}d
                </span>
              )}
            </div>

            <h3 className="mt-2 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              {isHi ? 'दैनिक ५ सूक्ष्म साधनाएं' : '5 Sacred Micro-Habits'}
            </h3>

            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {completedHabits.length}/5 {isHi ? 'साधनाएं आज पूर्ण' : 'habits completed today'}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-emerald-500/15 pt-3">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 group-hover:translate-x-0.5 transition-transform">
              {isHi ? 'चेकलिस्ट देखें →' : 'View Checklist →'}
            </span>
            <span className="text-sm">✓</span>
          </div>
        </div>

        {/* Right Card: Vedic Sankalpa Recital */}
        <div
          data-testid="bento-tall-card"
          onClick={() => {
            triggerHaptic('tap');
            setIsSankalpaModalOpen(true);
          }}
          className="group flex flex-col justify-between rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 shadow-xs transition hover:border-amber-500/50 hover:shadow-sm cursor-pointer dark:border-amber-500/20 dark:bg-zinc-900"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                {isHi ? '📜 दैनिक सङ्कल्प' : '📜 Vedic Sankalpa'}
              </span>
              <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                {isHi ? 'शास्त्रसम्मत' : 'Shastric Vow'}
              </span>
            </div>

            <h3 className="mt-2 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              {gotra ? `${gotra} गोत्र` : isHi ? 'दैनिक वैदिक संकल्प' : 'Daily Vedic Vow'}
            </h3>

            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 truncate">
              {panchang.masa.purnimantaNameDevanagari} • {panchang.tithi.current.nameDevanagari || panchang.tithi.current.name}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-amber-500/15 pt-3">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 group-hover:translate-x-0.5 transition-transform">
              {isHi ? 'सङ्कल्प पाठ करें →' : 'Recite Vow →'}
            </span>
            <span className="text-sm">→</span>
          </div>
        </div>
      </div>

      {/* Modal 1: Daily Sadhana Checklist */}
      {isSadhanaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">📿</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {isHi ? 'दैनिक नित्यकर्म साधना चेकलिस्ट' : 'Daily Sadhana Checklist'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {completedHabits.length}/5 {isHi ? 'साधनाएं पूर्ण' : 'habits completed'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSadhanaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {DAILY_SADHANA_HABITS.map((habit) => {
                const isDone = completedHabits.includes(habit.id);
                return (
                  <button
                    key={habit.id}
                    type="button"
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`w-full flex items-start gap-3 rounded-2xl p-3.5 text-left transition cursor-pointer ${
                      isDone
                        ? 'border border-emerald-300 bg-emerald-50/70 dark:border-emerald-800 dark:bg-emerald-950/30'
                        : 'border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition ${
                        isDone
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-zinc-300 text-transparent dark:border-zinc-600'
                      }`}
                    >
                      ✓
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-bold ${
                            isDone
                              ? 'text-emerald-900 line-through opacity-80 dark:text-emerald-200'
                              : 'text-zinc-900 dark:text-zinc-100'
                          }`}
                        >
                          {isHi ? habit.titleHi : habit.titleEn}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {isHi ? habit.timeContextHi : habit.timeContext}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        {isHi ? habit.descHi : habit.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t border-zinc-100 pt-3 dark:border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSadhanaModalOpen(false)}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 cursor-pointer"
              >
                {isHi ? 'सम्पन्न' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Daily Vedic Sankalpa */}
      {isSankalpaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {isHi ? 'दैनिक वैदिक सङ्कल्प पाठ' : 'Daily Vedic Sankalpa'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {locationName} • {userName || 'भक्त'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSankalpaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Sanskrit Text */}
              <div className="rounded-2xl border border-amber-300/80 bg-amber-50/50 p-4 dark:border-amber-700/60 dark:bg-amber-950/30">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  {isHi ? 'संस्कृत सङ्कल्प मन्त्र:' : 'Sanskrit Sankalpa:'}
                </div>
                <p className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-relaxed whitespace-pre-line">
                  {dailySankalpa.sanskrit}
                </p>
              </div>

              {/* Hindi Meaning */}
              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {isHi ? 'भावार्थ (सरल हिन्दी):' : 'Meaning in Hindi:'}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {dailySankalpa.hindi}
                </p>
              </div>

              {/* English */}
              {!isHi && (
                <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/60">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    English Translation:
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {dailySankalpa.english}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopySankalpa}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <span>{copiedSankalpa ? '✓' : '📋'}</span>
                <span>{copiedSankalpa ? (isHi ? 'कॉपी हो गया' : 'Copied!') : (isHi ? 'सङ्कल्प कॉपी करें' : 'Copy Text')}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSankalpaModalOpen(false)}
                className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white hover:bg-amber-600 cursor-pointer"
              >
                {isHi ? 'सम्पन्न' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
