'use client';

import { MUHURTA_CATEGORIES } from '@/app/lib/muhurta-finder/categories';
import { MuhurtaCategoryId } from '@/app/lib/muhurta-finder/types';

interface MuhurtaCategorySelectorProps {
  selectedCategory: MuhurtaCategoryId;
  onSelectCategory: (id: MuhurtaCategoryId) => void;
}

export default function MuhurtaCategorySelector({
  selectedCategory,
  onSelectCategory,
}: MuhurtaCategorySelectorProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-serif text-base font-bold text-zinc-900 dark:text-zinc-50">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
            🎯
          </span>
          <span>Auspicious Category (कार्य एवं संस्कार वर्ग)</span>
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Classical Vedic Shastra criteria
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Muhurta Categories"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-4"
      >
        {MUHURTA_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 text-left cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-amber-500 bg-amber-500/10 shadow-sm ring-2 ring-amber-500/50 dark:border-amber-400 dark:bg-amber-950/40 dark:ring-amber-400/50'
                  : 'border-zinc-200/90 bg-white hover:border-zinc-300 hover:bg-zinc-50/70 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60'
              }`}
            >
              <span className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl text-xl transition-transform duration-200 group-hover:scale-110 ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                  : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
              }`}>
                {cat.icon}
              </span>

              <div className="min-w-0 flex-1">
                <div
                  className={`font-serif text-sm font-bold tracking-tight ${
                    isSelected
                      ? 'text-amber-950 dark:text-amber-200'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {cat.title}
                </div>
                <div
                  className={`truncate text-[11px] font-medium ${
                    isSelected
                      ? 'text-amber-800/90 dark:text-amber-300/90'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {cat.titleDevanagari}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
