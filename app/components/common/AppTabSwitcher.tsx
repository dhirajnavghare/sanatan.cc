'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppTabSwitcher() {
  const pathname = usePathname();
  const isPanchang = pathname === '/panchang' || pathname.startsWith('/panchang');
  const isMuhurta = pathname === '/muhurta' || pathname.startsWith('/muhurta');
  const isFestivals = pathname === '/festivals' || pathname.startsWith('/festivals');

  return (
    <div className="flex items-center justify-center">
      <div
        role="tablist"
        aria-label="Vedic Applications"
        className="inline-flex flex-wrap items-center justify-center rounded-2xl border border-zinc-200/90 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 gap-1"
      >
        <Link
          href="/panchang"
          role="tab"
          aria-selected={isPanchang}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
            isPanchang
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>🗓</span>
          <span>Daily Panchang</span>
          <span className="hidden opacity-80 sm:inline">(पञ्चाङ्गम्)</span>
          <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase ${isPanchang ? 'bg-white/25 text-white' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}>
            Beta
          </span>
        </Link>

        <Link
          href="/muhurta"
          role="tab"
          aria-selected={isMuhurta}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
            isMuhurta
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>✨</span>
          <span>Shubh Muhurta Finder</span>
          <span className="hidden opacity-80 sm:inline">(शुभ मुहूर्त)</span>
          <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase ${isMuhurta ? 'bg-white/25 text-white' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}>
            Beta
          </span>
        </Link>

        <Link
          href="/festivals"
          role="tab"
          aria-selected={isFestivals}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
            isFestivals
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/50'
              : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
          }`}
        >
          <span>🪔</span>
          <span>Festivals Timeline</span>
          <span className="hidden opacity-80 sm:inline">(व्रत-त्योहार)</span>
          <span className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase ${isFestivals ? 'bg-white/25 text-white' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}>
            Beta
          </span>
        </Link>
      </div>
    </div>
  );
}
