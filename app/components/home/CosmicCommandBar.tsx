'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DEITIES_DATABASE } from '@/app/lib/devatas/data';
import { TEMPLES_DATABASE } from '@/app/lib/temples/data';
import { MUHURTA_CATEGORIES } from '@/app/lib/muhurta-finder/categories';
import { FESTIVAL_METADATA_MAP } from '@/app/lib/festivals/metadata';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';
import { cleanBilingualTitle, cleanIndianLocation } from '@/app/lib/i18n/formatters';

interface SearchResultItem {
  id: string;
  title: string;
  devanagari?: string;
  category: 'festival' | 'temple' | 'deity' | 'muhurta' | 'panchang';
  categoryLabel: string;
  categoryLabelHindi: string;
  subtitle: string;
  subtitleHindi?: string;
  href: string;
  icon: string;
}

export default function CosmicCommandBar({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { language } = useLanguage();

  // Global keyboard shortcut: Cmd+K or Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Aggregate searchable corpus across all 5 modules
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Devi Devatas
    DEITIES_DATABASE.forEach((d) => {
      const firstMantra = d.keyMantras[0]?.devanagari || d.keyMantras[0]?.transliteration || '';
      const traditionHi =
        d.tradition === 'Shaiva'
          ? 'शैव परम्परा'
          : d.tradition === 'Vaishnava'
          ? 'वैष्णव परम्परा'
          : d.tradition === 'Shakta'
          ? 'शाक्त परम्परा'
          : d.tradition === 'Ganapatya'
          ? 'गाणपत्य परम्परा'
          : d.tradition === 'Saura'
          ? 'सौर परम्परा'
          : d.tradition === 'Kaumara'
          ? 'कौमार परम्परा'
          : `${d.tradition} परम्परा`;
      items.push({
        id: `deity-${d.id}`,
        title: d.name,
        devanagari: d.nameDevanagari,
        category: 'deity',
        categoryLabel: 'Devi Devata',
        categoryLabelHindi: 'देवी-देवता',
        subtitle: `${d.tradition} • ${firstMantra.slice(0, 36)}...`,
        subtitleHindi: `${traditionHi} • ${firstMantra.slice(0, 36)}...`,
        href: `/devatas?id=${d.id}`,
        icon: '🕉️',
      });
    });

    // 2. Sacred Temples
    TEMPLES_DATABASE.forEach((t) => {
      items.push({
        id: `temple-${t.id}`,
        title: t.name,
        devanagari: t.nameDevanagari,
        category: 'temple',
        categoryLabel: 'Holy Tirtha',
        categoryLabelHindi: 'पवित्र तीर्थ',
        subtitle: `${t.location.city}, ${t.location.state} • ${cleanBilingualTitle(t.primaryDeity, false)}`,
        subtitleHindi: `${cleanIndianLocation(`${t.location.city}, ${t.location.state}`, true)} • ${t.primaryDeityDevanagari || cleanBilingualTitle(t.primaryDeity, true)}`,
        href: `/temples?id=${t.id}`,
        icon: '🛕',
      });
    });

    // 3. Shubh Muhurtas
    MUHURTA_CATEGORIES.forEach((m) => {
      const muhurtaDescHi: Record<string, string> = {
        griha_pravesh: 'नूतन अथवा पुनर्निर्मित गृह में मंगल प्रवेश हेतु मुहूर्त।',
        vivaha: 'पाणिग्रहण एवं वैवाहिक संस्कार हेतु शुभ लग्न व मुहूर्त।',
        vehicle_purchase: 'वाहन क्रय एवं यात्रा सुरक्षा हेतु शुभ नक्षत्र संयोग।',
        business_start: 'नूतन व्यापार, दुकान व प्रतिष्ठान आरम्भ हेतु श्रेष्ठ मुहूर्त।',
        property_purchase: 'भूमि, भवन एवं अचल सम्पत्ति क्रय-पंजीयन हेतु शुभ काल।',
        gold_purchase: 'स्वर्ण, आभूषण एवं मूल्यवान धातुओं के क्रय हेतु शुभ योग।',
      };
      items.push({
        id: `muhurta-${m.id}`,
        title: m.title,
        devanagari: m.titleDevanagari,
        category: 'muhurta',
        categoryLabel: 'Shubh Muhurta',
        categoryLabelHindi: 'शुभ मुहूर्त',
        subtitle: m.description,
        subtitleHindi: muhurtaDescHi[m.id] || m.titleDevanagari,
        href: `/muhurta?category=${m.id}`,
        icon: '✨',
      });
    });

    // 4. Major Festivals
    Object.entries(FESTIVAL_METADATA_MAP).forEach(([name, meta]) => {
      items.push({
        id: `fest-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: name,
        devanagari: meta.nameDevanagari,
        category: 'festival',
        categoryLabel: 'Utsav / Vrat',
        categoryLabelHindi: 'उत्सव / व्रत',
        subtitle: meta.deity ? `Dedicated to ${cleanBilingualTitle(meta.deity, false)}` : meta.significance.slice(0, 60),
        subtitleHindi: meta.deity ? `आराध्य: ${cleanBilingualTitle(meta.deity, true)}` : meta.nameDevanagari,
        href: `/festivals?search=${encodeURIComponent(name)}`,
        icon: '🪔',
      });
    });

    // 5. Core Panchang Limbs & Windows
    const panchangConcepts = [
      {
        name: 'Daily Panchang Calculator',
        nameHindi: 'दैनिक पञ्चाङ्ग गणक',
        href: '/panchang',
        subtitle: '5 Limbs (Tithi, Nakshatra, Yoga, Karana, Vara) for any GPS coordinates',
        subtitleHindi: 'पञ्चाङ्ग के ५ अंग (तिथि, नक्षत्र, योग, करण, वार) किसी भी स्थान हेतु',
        icon: '🗓',
      },
      {
        name: 'Rahu Kaal & Inauspicious Periods',
        nameHindi: 'राहु काल एवं अशुभ समय',
        href: '/panchang#muhurtas',
        subtitle: 'Exact start and end times to avoid initiating sacred ventures',
        subtitleHindi: 'शुभ कार्य आरम्भ टालने हेतु दैनिक राहु काल समय',
        icon: '⏱',
      },
      {
        name: 'Abhijit Muhurta',
        nameHindi: 'अभिजित मुहूर्त',
        href: '/panchang#muhurtas',
        subtitle: 'Lord Vishnu blessed midday auspicious 48-minute victory window',
        subtitleHindi: 'सर्वकार्य सिद्धि हेतु भगवान विष्णु का पावन मध्याह्न विजय मुहूर्त',
        icon: '🌟',
      },
      {
        name: 'Choghadiya Timings (Day & Night)',
        nameHindi: 'दिन व रात्रि चौघड़िया',
        href: '/panchang#choghadiya',
        subtitle: 'Amrit, Shubh, and Labh auspicious hourly segments',
        subtitleHindi: 'अमृत, शुभ, लाभ आदि फलदायी चौघड़िया काल',
        icon: '⌛',
      },
      {
        name: 'Moon Phase & Lunar Illumination',
        nameHindi: 'चन्द्र कला एवं स्थिति',
        href: '/panchang',
        subtitle: 'Real-time topocentric lunar elongation, age, and rise/set times',
        subtitleHindi: 'चन्द्रमा का उदय-अस्त समय एवं दैनिक दृश्य कला',
        icon: '🌙',
      },
    ];

    panchangConcepts.forEach((p, idx) => {
      items.push({
        id: `panchang-${idx}`,
        title: p.name,
        devanagari: p.nameHindi,
        category: 'panchang',
        categoryLabel: 'Panchang',
        categoryLabelHindi: 'पञ्चाङ्ग',
        subtitle: p.subtitle,
        subtitleHindi: p.subtitleHindi,
        href: p.href,
        icon: p.icon,
      });
    });

    return items;
  }, []);

  // Filter items matching query
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      // Suggest high-value starting quick links
      return allItems.slice(0, 8);
    }

    const q = query.toLowerCase().trim();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.devanagari && item.devanagari.includes(q)) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query, allItems]);

  const closePalette = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleSelect = (item: SearchResultItem) => {
    closePalette();
    router.push(item.href);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredResults.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filteredResults.length || 1)) % (filteredResults.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Trigger Bar on the Page */}
      <div className={`relative w-full ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-zinc-200/90 bg-white/95 px-4 py-3 text-left shadow-md shadow-zinc-200/50 backdrop-blur-xl transition-all duration-200 hover:border-amber-400 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-none dark:hover:border-amber-500/50 dark:hover:bg-zinc-900"
          aria-label={
            language === 'hi'
              ? 'पर्व, मन्दिर, देवता, मुहूर्त अथवा पञ्चाङ्ग खोजें'
              : 'Search all festivals, temples, deities, muhurtas, and panchang'
          }
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-600 transition-transform group-hover:scale-110 dark:bg-amber-400/10 dark:text-amber-400">
              🔍
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 sm:text-sm">
                {language === 'hi'
                  ? 'पर्व, मन्दिर, देवता, मुहूर्त अथवा पञ्चाङ्ग खोजें...'
                  : 'Search festivals, temples, devatas, muhurtas, or panchang...'}
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                {language === 'hi'
                  ? 'उदा. महाशिवरात्रि, गृह प्रवेश, केदारनाथ, राहु काल, श्रीकृष्ण, सोमनाथ'
                  : 'E.g. Shivaratri, Griha Pravesh, Kedarnath, Rahu Kaal, Krishna, Somnath'}
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-1.5 sm:flex">
            <kbd className="rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              ⌘K
            </kbd>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
              {language === 'hi' ? 'या' : 'or'}
            </span>
            <kbd className="rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              /
            </kbd>
          </div>
        </button>
      </div>

      {/* Fullscreen Search Modal Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'hi' ? 'सार्वभौमिक वैदिक खोज' : 'Universal Vedic Search'}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
          onClick={closePalette}
        >
          <div
            className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition-all dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="relative flex items-center border-b border-zinc-200/80 px-4 py-3.5 dark:border-zinc-800/80">
              <span className="mr-3 text-xl text-amber-500">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownInInput}
                placeholder={
                  language === 'hi'
                    ? 'पर्व, मन्दिर, देवता अथवा मुहूर्त खोजने के लिए लिखें...'
                    : 'Type to search festivals, temples, deities, or muhurtas...'
                }
                className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder-zinc-500 outline-none dark:text-zinc-100 dark:placeholder-zinc-500 sm:text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-lg p-1 text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {language === 'hi' ? 'हटाएं' : 'Clear'}
                </button>
              )}
              <button
                type="button"
                onClick={closePalette}
                className="ml-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Categories */}
            <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/70 px-4 py-2 text-xs dark:border-zinc-800/50 dark:bg-zinc-950/40">
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                {language === 'hi' ? 'त्वरित सुझाव:' : 'Quick suggestions:'}
              </span>
              {(language === 'hi'
                ? ['दीपावली', 'गृह प्रवेश', 'केदारनाथ', 'शिवरात्रि', 'हनुमान', 'राहु काल']
                : ['Diwali', 'Griha Pravesh', 'Kedarnath', 'Shivaratri', 'Hanuman', 'Rahu Kaal']
              ).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setQuery(preset);
                    inputRef.current?.focus();
                  }}
                  className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:bg-amber-50 hover:text-amber-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="text-3xl">🕊️</span>
                  <p className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {language === 'hi'
                      ? `"${query}" के लिए कोई शास्त्रीय परिणाम नहीं मिला`
                      : `No matching Vedic records found for "${query}"`}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {language === 'hi'
                      ? 'उदा. "सोमनाथ", "विवाह", "विष्णु" अथवा "एकादशी" खोज कर देखें।'
                      : 'Try searching for common names like "Somnath", "Vivaha", "Vishnu", or "Ekadashi".'}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredResults.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex cursor-pointer items-center justify-between rounded-2xl px-3.5 py-2.5 transition-all duration-150 ${
                          isSelected
                            ? 'bg-amber-500/10 text-amber-950 dark:bg-amber-500/20 dark:text-amber-100'
                            : 'hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-800 dark:ring-zinc-700">
                            {item.icon}
                          </span>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                {language === 'hi' ? item.devanagari || item.title : item.title}
                              </span>
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {language === 'hi' && item.subtitleHindi ? item.subtitleHindi : item.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              item.category === 'festival'
                                ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300'
                                : item.category === 'temple'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : item.category === 'deity'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                : item.category === 'muhurta'
                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                            }`}
                          >
                            {language === 'hi' ? item.categoryLabelHindi : item.categoryLabel}
                          </span>
                          <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                            &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-4 py-2 text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                {language === 'hi' ? (
                  <>
                    <span>नेविगेट: <kbd className="font-mono font-bold">↑</kbd> <kbd className="font-mono font-bold">↓</kbd></span>
                    <span>चुनें: <kbd className="font-mono font-bold">↵</kbd></span>
                    <span>बन्द करें: <kbd className="font-mono font-bold">ESC</kbd></span>
                  </>
                ) : (
                  <>
                    <span>Navigate: <kbd className="font-mono font-bold">↑</kbd> <kbd className="font-mono font-bold">↓</kbd></span>
                    <span>Select: <kbd className="font-mono font-bold">↵</kbd></span>
                    <span>Close: <kbd className="font-mono font-bold">ESC</kbd></span>
                  </>
                )}
              </div>
              <span className="font-medium text-amber-700 dark:text-amber-400">
                {language === 'hi' ? 'sanatan.cc सार्वभौमिक खोज' : 'sanatan.cc Universal Search'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
