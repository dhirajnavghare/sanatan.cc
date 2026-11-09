'use client';

import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface DevatasHeroProps {
  totalCount: number;
  panchaDevaCount: number;
  onSelectTradition: (tradition: string) => void;
  selectedTradition: string;
}

export default function DevatasHero({
  totalCount,
  panchaDevaCount,
  onSelectTradition,
  selectedTradition,
}: DevatasHeroProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="space-y-5">
      {/* Hero Banner Container */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-6 shadow-sm backdrop-blur-xl dark:border-amber-500/15 dark:from-amber-950/30 dark:via-orange-950/15 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            {/* Tag Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-400/30 dark:text-amber-300">
                <span>🕉️</span>
                <span>{isHi ? 'सनातन देवी-देवता' : 'Hindu Sanatan Devi Devatas'}</span>
              </span>
              <span className="rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {isHi ? 'वैदिक दर्शन एवं मन्त्र' : 'Vedic Philosophy & Mantras'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {isHi ? 'सनातन देवी-देवता दर्शन' : 'Sanatan Devi Devatas Directory'}
            </h1>

            {/* Shanti Invocation Sloka */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-xs font-serif italic text-amber-900 dark:border-amber-500/10 dark:bg-amber-500/10 dark:text-amber-200">
              {isHi
                ? '« त्वमेव माता च पिता त्वमेव त्वमेव बन्धुश्च सखा त्वमेव । त्वमेव विद्या द्रविणं त्वमेव त्वमेव सर्वं मम देव देव ॥ »'
                : '« You alone are Mother, You alone are Father; You alone are Kin, You alone are Friend; You alone are Wisdom, You alone are Wealth; You alone are my All in All, O God of Gods. »'}
            </div>

            {/* Description */}
            <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
              {isHi
                ? 'सनातन देवी-देवताओं के दिव्य स्वरूप, दार्शनिक तत्त्व, बीज एवं मूल मन्त्र, वाहन, आयुध, प्रिय तिथियाँ तथा ऐतिहासिक तीर्थ धाम। पञ्चाङ्ग एवं पर्व पञ्चिका के साथ एकाकार।'
                : 'Discover the divine forms (Svarupa), philosophical essence (Tatva), sacred Sanskrit mantras, vahanas, ayudhas, holy tithis, and historic shrines of Hindu deities. Unified with our real-time Vedic Panchang and Festival ephemeris.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  {totalCount} {isHi ? 'प्रमुख देवी-देवता' : 'Principal Deities'}
                </span>
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="font-semibold">
                {panchaDevaCount} {isHi ? 'स्मार्त पञ्चायतन देवता' : 'Smarta Panchayatana Devatas'}
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                <span>{isHi ? '📜 प्रामाणिक मन्त्र एवं भावार्थ' : '📜 Authentic Mantras with Meaning'}</span>
              </div>
            </div>
          </div>

          {/* Right Highlights: Quick Panchayatana Filter Callout */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 text-xs max-w-xs">
              <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>✨</span>
                <span>{isHi ? 'स्मार्त पञ्चायतन' : 'Smarta Panchayatana'}</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                {isHi
                  ? 'आद्य शंकराचार्य द्वारा स्थापित पञ्च प्रधान देव: शिव, विष्णु, शक्ति (दुर्गा), सूर्य तथा गणेश।'
                  : 'The 5 primordial forms worshipped simultaneously: Shiva, Vishnu, Shakti (Durga), Surya, and Ganesha.'}
              </p>
              <button
                type="button"
                onClick={() => onSelectTradition(selectedTradition === 'pancha_deva' ? 'all' : 'pancha_deva')}
                className={`mt-2.5 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold transition cursor-pointer ${
                  selectedTradition === 'pancha_deva'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300'
                }`}
              >
                <span>
                  {selectedTradition === 'pancha_deva'
                    ? (isHi ? '✓ पञ्चायतन प्रदर्शित' : '✓ Showing Panchayatana')
                    : (isHi ? 'पञ्चायतन देवता देखें →' : 'Filter Panchayatana Devatas →')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
