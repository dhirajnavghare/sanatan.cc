'use client';

import { MuhurtaCategoryMeta } from '@/app/lib/muhurta-finder/types';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

interface MuhurtaFilterBarProps {
  daysCount: 30 | 60 | 90 | 180;
  onDaysCountChange: (days: 30 | 60 | 90 | 180) => void;
  suitabilityFilter: 'All' | 'Good' | 'Optimal';
  onSuitabilityFilterChange: (filter: 'All' | 'Good' | 'Optimal') => void;
  totalMatches: number;
  categoryMeta: MuhurtaCategoryMeta;
}

const CATEGORY_DESC_HI: Record<string, string> = {
  griha_pravesh: 'नवनिर्मित, क्रय अथवा जीर्णोद्धार किए गए भवन में विधि-विधानपूर्वक पावन प्रवेश।',
  vivaha: 'वैदिक विवाह संस्कार, पाणिग्रहण तथा पवित्र दाम्पत्य जीवन का शुभारम्भ।',
  vehicle_purchase: 'दीर्घायु, सुरक्षा एवं निर्विघ्न यात्रा हेतु दुपहिया/चौपहिया अथवा व्यावसायिक वाहन क्रय।',
  business_start: 'नूतन व्यापार, दुकान, कार्यालय का शुभारम्भ अथवा प्रमुख व्यावसायिक अनुबन्ध।',
  property_purchase: 'स्थायित्व एवं समृद्धि हेतु भूमि, भूखण्ड अथवा अचल सम्पत्ति का क्रय एवं विलेख पञ्जीकरण।',
  gold_purchase: 'दीर्घकालीन समृद्धि हेतु स्वर्ण, आभूषण, रत्न एवं मूल्यवान धातुओं का क्रय।',
  namakarana: 'नवजात शिशु का वैदिक विधि से कल्याणकारी एवं शास्त्रसम्मत नामकरण संस्कार।',
  sarvartha_siddhi: 'किसी भी शुभ, नवीन अथवा महत्त्वपूर्ण कार्य के आरम्भ हेतु सर्वफलदायी योग।',
};

const CATEGORY_REF_HI: Record<string, string> = {
  griha_pravesh: 'मुहूर्तचिन्तामणि, गृहप्रवेश प्रकरण',
  vivaha: 'मुहूर्त गणपति एवं बृहत्संहिता, विवाह अध्याय',
  vehicle_purchase: 'कालप्रकाशिका, यान-वाहन अध्याय',
  business_start: 'मुहूर्तचिन्तामणि, व्यापाराग्नि प्रकरण',
  property_purchase: 'मुहूर्त दीपिका, भूमि-सम्पत्ति प्रकरण',
  gold_purchase: 'बृहत्संहिता, रत्न-द्रव्य संग्रह',
  namakarana: 'पारस्कर गृह्यसूत्र, नामकरण विधि',
  sarvartha_siddhi: 'मुहूर्तचिन्तामणि, सर्वार्थसिद्धि प्रकरण',
};

const DAY_OPTIONS: Array<{ value: 30 | 60 | 90 | 180; labelEn: string; labelHi: string }> = [
  { value: 30, labelEn: '30 Days', labelHi: '३० दिन' },
  { value: 60, labelEn: '60 Days', labelHi: '६० दिन' },
  { value: 90, labelEn: '90 Days', labelHi: '९० दिन' },
  { value: 180, labelEn: '180 Days', labelHi: '१८० दिन' },
];

export default function MuhurtaFilterBar({
  daysCount,
  onDaysCountChange,
  suitabilityFilter,
  onSuitabilityFilterChange,
  totalMatches,
  categoryMeta,
}: MuhurtaFilterBarProps) {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const suitabilityOptions: Array<{
    value: 'All' | 'Good' | 'Optimal';
    label: string;
  }> = [
    { value: 'All', label: isHi ? 'सभी शुभ मुहूर्त' : 'All Auspicious' },
    { value: 'Good', label: isHi ? 'उत्तम (≥६५%)' : 'Good (≥65%)' },
    { value: 'Optimal', label: isHi ? 'केवल श्रेष्ठ (≥८०%)' : 'Optimal Only (≥80%)' },
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Category Info Banner */}
      <div className="flex flex-col gap-2 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">{categoryMeta.icon}</span>
            <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? categoryMeta.titleDevanagari : categoryMeta.title}
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {isHi ? (CATEGORY_DESC_HI[categoryMeta.id] || categoryMeta.description) : categoryMeta.description}
          </p>
        </div>

        <div className="flex-none">
          <span className="inline-flex items-center rounded-xl border border-zinc-200/70 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            📜 {isHi ? (CATEGORY_REF_HI[categoryMeta.id] || categoryMeta.traditionalReference) : categoryMeta.traditionalReference}
          </span>
        </div>
      </div>

      {/* Segmented Controls / Tabs */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Time Horizon Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {isHi ? 'खोज अवधि:' : 'Horizon:'}
          </span>
          <div
            role="tablist"
            aria-label={isHi ? 'खोज अवधि' : 'Search Horizon'}
            className="inline-flex rounded-xl border border-zinc-200/80 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-800/80"
          >
            {DAY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={daysCount === opt.value}
                onClick={() => onDaysCountChange(opt.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  daysCount === opt.value
                    ? 'bg-white text-zinc-900 shadow-sm ring-1 ring-black/5 dark:bg-zinc-700 dark:text-zinc-50 dark:ring-white/10'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {isHi ? opt.labelHi : opt.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {isHi ? 'उपयुक्तता:' : 'Suitability:'}
          </span>
          <div
            role="tablist"
            aria-label={isHi ? 'गुणवत्ता फिल्टर' : 'Quality Filter'}
            className="inline-flex flex-wrap rounded-xl border border-zinc-200/80 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-zinc-800/80"
          >
            {suitabilityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={suitabilityFilter === opt.value}
                onClick={() => onSuitabilityFilterChange(opt.value)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  suitabilityFilter === opt.value
                    ? 'bg-white text-amber-900 shadow-sm ring-1 ring-amber-500/20 dark:bg-zinc-700 dark:text-amber-300 dark:ring-white/10'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Match Summary Indicator */}
      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            {isHi ? (
              <>
                अगले <strong className="text-zinc-900 dark:text-zinc-100">{daysCount}</strong> दिनों में कुल{' '}
                <strong className="text-zinc-900 dark:text-zinc-100">{totalMatches}</strong> शुभ दिवस उपलब्ध
              </>
            ) : (
              <>
                Found <strong className="text-zinc-900 dark:text-zinc-100">{totalMatches}</strong> auspicious{' '}
                {totalMatches === 1 ? 'day' : 'days'} across the next {daysCount} days
              </>
            )}
          </span>
        </div>
        <span className="hidden text-[11px] text-zinc-400 sm:inline">
          {isHi
            ? 'कालक्रमानुसार व्यवस्थित • शास्त्रीय मानदण्ड स्कोरिंग'
            : 'Sorted chronologically with classical shastra factor scoring'}
        </span>
      </div>
    </div>
  );
}
