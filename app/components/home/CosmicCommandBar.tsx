'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DEITIES_DATABASE } from '@/app/lib/devatas/data';
import { TEMPLES_DATABASE } from '@/app/lib/temples/data';
import { MUHURTA_CATEGORIES } from '@/app/lib/muhurta-finder/categories';
import { FESTIVAL_METADATA_MAP } from '@/app/lib/festivals/metadata';

interface SearchResultItem {
  id: string;
  title: string;
  devanagari?: string;
  category: 'festival' | 'temple' | 'deity' | 'muhurta' | 'panchang';
  categoryLabel: string;
  subtitle: string;
  href: string;
  icon: string;
}

export default function CosmicCommandBar({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
      items.push({
        id: `deity-${d.id}`,
        title: d.name,
        devanagari: d.nameDevanagari,
        category: 'deity',
        categoryLabel: 'Devi Devata',
        subtitle: `${d.tradition} • ${firstMantra.slice(0, 36)}...`,
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
        subtitle: `${t.location.city}, ${t.location.state} • ${t.primaryDeity}`,
        href: `/temples?id=${t.id}`,
        icon: '🛕',
      });
    });

    // 3. Shubh Muhurtas
    MUHURTA_CATEGORIES.forEach((m) => {
      items.push({
        id: `muhurta-${m.id}`,
        title: m.title,
        devanagari: m.titleDevanagari,
        category: 'muhurta',
        categoryLabel: 'Shubh Muhurta',
        subtitle: m.description,
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
        subtitle: meta.deity ? `Dedicated to ${meta.deity}` : meta.significance.slice(0, 60),
        href: `/festivals?search=${encodeURIComponent(name)}`,
        icon: '🪔',
      });
    });

    // 5. Core Panchang Limbs & Windows
    const panchangConcepts = [
      { name: 'Daily Panchang Calculator', href: '/panchang', subtitle: '5 Limbs (Tithi, Nakshatra, Yoga, Karana, Vara) for any GPS coordinates', icon: '🗓' },
      { name: 'Rahu Kaal & Inauspicious Periods', href: '/panchang#muhurtas', subtitle: 'Exact start and end times to avoid initiating sacred ventures', icon: '⏱' },
      { name: 'Abhijit Muhurta', href: '/panchang#muhurtas', subtitle: 'Lord Vishnu blessed midday auspicious 48-minute victory window', icon: '🌟' },
      { name: 'Choghadiya Timings (Day & Night)', href: '/panchang#choghadiya', subtitle: 'Amrit, Shubh, and Labh auspicious hourly segments', icon: '⌛' },
      { name: 'Moon Phase & Lunar Illumination', href: '/panchang', subtitle: 'Real-time topocentric lunar elongation, age, and rise/set times', icon: '🌙' },
    ];

    panchangConcepts.forEach((p, idx) => {
      items.push({
        id: `panchang-${idx}`,
        title: p.name,
        category: 'panchang',
        categoryLabel: 'Panchang',
        subtitle: p.subtitle,
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
          aria-label="Search all festivals, temples, deities, muhurtas, and panchang"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-lg text-amber-600 transition-transform group-hover:scale-110 dark:bg-amber-400/10 dark:text-amber-400">
              🔍
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 sm:text-sm">
                Search festivals, temples, devatas, muhurtas, or panchang...
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                E.g. Shivaratri, Griha Pravesh, Kedarnath, Rahu Kaal, Krishna, Somnath
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-1.5 sm:flex">
            <kbd className="rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              ⌘K
            </kbd>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">or</span>
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
          aria-label="Universal Vedic Search"
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
                placeholder="Type to search festivals, temples, deities, or muhurtas..."
                className="w-full bg-transparent text-sm font-medium text-zinc-900 placeholder-zinc-500 outline-none dark:text-zinc-100 dark:placeholder-zinc-500 sm:text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-lg p-1 text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={closePalette}
                className="ml-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                ESC
              </button>
            </div>

            {/* Quick Filter Categories */}
            <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/70 px-4 py-2 text-xs dark:border-zinc-800/50 dark:bg-zinc-950/40">
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">Quick suggestions:</span>
              {['Diwali', 'Griha Pravesh', 'Kedarnath', 'Shivaratri', 'Hanuman', 'Rahu Kaal'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setQuery(preset);
                    inputRef.current?.focus();
                  }}
                  className="rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm transition hover:bg-amber-50 hover:text-amber-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
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
                    No matching Vedic records found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Try searching for common names like &ldquo;Somnath&rdquo;, &ldquo;Vivaha&rdquo;, &ldquo;Vishnu&rdquo;, or &ldquo;Ekadashi&rdquo;.
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
                                {item.title}
                              </span>
                              {item.devanagari && (
                                <span className="text-xs text-amber-700 dark:text-amber-400">
                                  ({item.devanagari})
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                              {item.subtitle}
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
                            {item.categoryLabel}
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
                <span>Navigate: <kbd className="font-mono font-bold">↑</kbd> <kbd className="font-mono font-bold">↓</kbd></span>
                <span>Select: <kbd className="font-mono font-bold">↵</kbd></span>
                <span>Close: <kbd className="font-mono font-bold">ESC</kbd></span>
              </div>
              <span className="font-medium text-amber-700 dark:text-amber-400">sanatan.cc Universal Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
