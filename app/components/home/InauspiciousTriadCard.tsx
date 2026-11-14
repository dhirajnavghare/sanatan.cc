'use client';

import { PanchangData } from '@/app/lib/panchang/types';

interface InauspiciousTriadCardProps {
  panchang: PanchangData;
  timezone: string;
  isHi: boolean;
}

export default function InauspiciousTriadCard({
  panchang,
  timezone,
  isHi,
}: InauspiciousTriadCardProps) {
  const formatTime = (d: Date | string | null): string => {
    if (!d) return '—';
    const dateObj = typeof d === 'string' ? new Date(d) : d;
    try {
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
      }).format(dateObj);
    } catch {
      return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const { rahuKaal, yamaganda, gulikaKaal } = panchang.muhurtas;

  return (
    <div
      data-testid="inauspicious-triad-card"
      className="rounded-3xl border border-red-500/25 bg-red-500/5 p-5 shadow-xs dark:border-red-500/20 dark:bg-red-950/20 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-3 border-b border-red-500/15">
        <div className="flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <h3 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {isHi ? 'त्रिकाल वर्ज्य (त्याज्य काल)' : 'Inauspicious Windows (To Avoid)'}
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
          {isHi ? 'दक्षिण एवं सर्व-भारतीय पञ्चाङ्ग' : 'South & Pan-Indian Panchangam'}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* 1. Rahu Kaal */}
        <div className="rounded-2xl border border-red-200 bg-white/80 p-3.5 shadow-xs dark:border-red-900/50 dark:bg-zinc-900">
          <div className="text-xs font-bold text-red-600 dark:text-red-400">
            {isHi ? 'राहु काल' : 'Rahu Kalam'}
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {formatTime(rahuKaal.startTime)} - {formatTime(rahuKaal.endTime)}
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            {isHi ? 'शुभ कार्य त्याज्य' : 'Avoid beginnings'}
          </div>
        </div>

        {/* 2. Yamagandam */}
        <div className="rounded-2xl border border-orange-200 bg-white/80 p-3.5 shadow-xs dark:border-orange-900/50 dark:bg-zinc-900">
          <div className="text-xs font-bold text-orange-600 dark:text-orange-400">
            {isHi ? 'यमगण्ड' : 'Yamagandam'}
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {formatTime(yamaganda.startTime)} - {formatTime(yamaganda.endTime)}
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            {isHi ? 'यात्रा व निवेश वर्जित' : 'Avoid travel & deals'}
          </div>
        </div>

        {/* 3. Gulika Kaal */}
        <div className="rounded-2xl border border-purple-200 bg-white/80 p-3.5 shadow-xs dark:border-purple-900/50 dark:bg-zinc-900">
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {isHi ? 'गुलिक काल' : 'Gulika Kalam'}
          </div>
          <div className="mt-1 font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {formatTime(gulikaKaal.startTime)} - {formatTime(gulikaKaal.endTime)}
          </div>
          <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            {isHi ? 'शनि पुत्र प्रभाव' : 'Saturn son window'}
          </div>
        </div>
      </div>
    </div>
  );
}
