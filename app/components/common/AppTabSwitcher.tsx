'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function AppTabSwitcher() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isPanchang = pathname === '/panchang' || pathname.startsWith('/panchang');
  const isMuhurta = pathname === '/muhurta' || pathname.startsWith('/muhurta');
  const isFestivals = pathname === '/festivals' || pathname.startsWith('/festivals');

  return (
    <div className="flex items-center justify-center">
      <div
        role="tablist"
        aria-label={language === 'hi' ? 'वैदिक अनुप्रयोग' : 'Vedic Applications'}
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
          <span>{language === 'hi' ? 'दैनिक पञ्चाङ्ग' : 'Daily Panchang'}</span>
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
          <span>{language === 'hi' ? 'शुभ मुहूर्त अन्वेषक' : 'Shubh Muhurta Finder'}</span>
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
          <span>{language === 'hi' ? 'व्रत एवं उत्सव पञ्चिका' : 'Festivals Timeline'}</span>
        </Link>
      </div>
    </div>
  );
}
