'use client';

import { MUHURTA_CATEGORIES } from '@/app/lib/muhurta-finder';
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
    <section className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Select Auspicious Category (कार्य एवं संस्कार वर्ग)
        </h2>
        <span className="text-[11px] text-zinc-400">
          Classical Vedic Shastra criteria
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-4">
        {MUHURTA_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-start gap-3 rounded-2xl border p-3.5 text-left cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-amber-500 bg-amber-50/90 shadow-sm ring-2 ring-amber-500/40 dark:bg-amber-950/40 dark:ring-amber-400/40'
                  : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60'
              }`}
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-zinc-100 text-lg transition-transform group-hover:scale-110 dark:bg-zinc-800">
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
                      ? 'text-amber-800/80 dark:text-amber-300/80'
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
