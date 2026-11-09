'use client';

import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface TemplesHeroProps {
  totalCount: number;
  jyotirlingaCount: number;
  charDhamCount: number;
  onSelectCircuit: (circuit: string) => void;
  selectedCircuit: string;
}

export default function TemplesHero({
  totalCount,
  jyotirlingaCount,
  charDhamCount,
  onSelectCircuit,
  selectedCircuit,
}: TemplesHeroProps) {
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
                <span>🛕</span>
                <span>{isHi ? 'सनातन तीर्थ एवं मन्दिर' : 'Hindu Sanatan Tirthas & Temples'}</span>
              </span>
              <span className="rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {isHi ? 'पवित्र तीर्थ दर्शन' : 'Sacred Pilgrimage Directory'}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {isHi ? 'सनातन तीर्थ एवं दिव्य मन्दिर' : 'Sanatan Tirthas & Divine Temples'}
            </h1>

            {/* Sacred Tirtha Sloka */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-2.5 text-xs font-serif italic text-amber-900 dark:border-amber-500/10 dark:bg-amber-500/10 dark:text-amber-200">
              {isHi
                ? '« गङ्गे च यमुने चैव गोदावरि सरस्वति । नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥ »'
                : '« O holy waters of Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, and Kaveri — be present in this sacred realm. »'}
            </div>

            {/* Description */}
            <p className="max-w-2xl text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
              {isHi
                ? 'भारतवर्ष एवं वैश्विक सनातन संस्कृति के पावन तीर्थ धाम। १२ द्वादश ज्योतिर्लिंग, ४ पावन चार धाम, महाशक्तिपीठ, पञ्चभूत स्थल, मन्दिर स्थापत्य शैली, दर्शन समय तथा स्थानीय पञ्चाङ्ग गणना।'
                : 'Discover the eternal pilgrimage sanctuaries of Bharat and the global Hindu diaspora. From the 12 Jyotirlingas and 4 Grand Char Dhams to primordial Shakti Peethas and Pancha Bhoota Sthalams, with authentic Puranic lore, architectural styles, darshan timings, and real-time Panchang alignment.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-1.5 font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>
                  {totalCount} {isHi ? 'पवित्र धाम एवं मन्दिर' : 'Sacred Sanctuaries'}
                </span>
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="font-semibold">
                {jyotirlingaCount} {isHi ? 'द्वादश ज्योतिर्लिंग' : 'Dvadasha Jyotirlingas'}
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="font-semibold">
                {charDhamCount} {isHi ? 'पावन चार धाम' : 'Sacred Char Dhams'}
              </div>
              <div className="text-zinc-300 dark:text-zinc-700">•</div>
              <div className="flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                <span>{isHi ? '📍 प्रमाणित अक्षांश एवं पावन संगम' : '📍 Verified Coordinates & River Sangams'}</span>
              </div>
            </div>
          </div>

          {/* Right Highlights: Quick Circuit Callout */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 text-xs max-w-xs">
              <div className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{isHi ? 'पवित्र तीर्थ परिक्रमा' : 'Sacred Pilgrimage Circuits'}</span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                {isHi
                  ? '१२ ज्योतिर्लिंग, ४ चार धाम, शक्तिपीठ, पञ्चभूत अथवा वैश्विक मन्दिरों के अनुसार दर्शन करें।'
                  : 'Filter by holy circuit: 12 Jyotirlingas, 4 Char Dhams, Shakti Peethas, Pancha Bhootas, or Global Temples.'}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectCircuit(selectedCircuit === 'jyotirlinga' ? 'all' : 'jyotirlinga')}
                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    selectedCircuit === 'jyotirlinga'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300'
                  }`}
                >
                  <span>
                    {selectedCircuit === 'jyotirlinga'
                      ? (isHi ? '✓ ज्योतिर्लिंग' : '✓ Jyotirlingas')
                      : (isHi ? '१२ ज्योतिर्लिंग' : '12 Jyotirlingas')}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCircuit(selectedCircuit === 'char_dham' ? 'all' : 'char_dham')}
                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold transition cursor-pointer ${
                    selectedCircuit === 'char_dham'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 dark:bg-amber-400/10 dark:text-amber-300'
                  }`}
                >
                  <span>
                    {selectedCircuit === 'char_dham'
                      ? (isHi ? '✓ चार धाम' : '✓ Char Dham')
                      : (isHi ? 'पावन चार धाम' : 'Char Dham')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
