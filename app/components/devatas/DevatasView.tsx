'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DeityRecord, DeityTradition } from '@/app/lib/devatas/types';
import DevatasHero from './DevatasHero';
import DevatasFilterBar from './DevatasFilterBar';
import DevataCard from './DevataCard';
import DevataModal from './DevataModal';

interface DevatasViewProps {
  initialDeities: DeityRecord[];
  traditions: {
    id: DeityTradition;
    label: string;
    labelDevanagari: string;
  }[];
}

export default function DevatasView({ initialDeities, traditions }: DevatasViewProps) {
  const searchParams = useSearchParams();

  // Initialize directly from URL search parameters
  const initialTrad = (searchParams.get('tradition') as DeityTradition) || 'all';
  const initialQ = searchParams.get('q') || '';
  const initialId = searchParams.get('id') || '';

  const [selectedTradition, setSelectedTradition] = useState<DeityTradition>(initialTrad);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeModalDeity, setActiveModalDeity] = useState<DeityRecord | null>(() => {
    if (!initialId) return null;
    return initialDeities.find((d) => d.id.toLowerCase() === initialId.toLowerCase()) || null;
  });

  // Client-side instant filter and search
  const filteredDeities = useMemo(() => {
    return initialDeities.filter((d) => {
      // 1. Tradition filter
      if (selectedTradition === 'pancha_deva') {
        if (!d.isPanchaDeva) return false;
      } else if (selectedTradition !== 'all') {
        if (d.tradition.toLowerCase() !== selectedTradition.toLowerCase()) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = d.name.toLowerCase().includes(q) || d.nameDevanagari.includes(q);
        const matchSubtitle = d.subtitle.toLowerCase().includes(q) || d.subtitleDevanagari.includes(q);
        const matchTatva = d.tatva.toLowerCase().includes(q);
        const matchVahana = d.vahana?.toLowerCase().includes(q);
        const matchAyudhas = d.ayudhas?.some((a) => a.toLowerCase().includes(q));
        const matchFestivals = d.associatedFestivals.some((f) => f.toLowerCase().includes(q));
        const matchOfferings = d.traditionalOfferings.some((o) => o.toLowerCase().includes(q));
        const matchTemples = d.majorTemples.some(
          (t) => t.name.toLowerCase().includes(q) || t.location.toLowerCase().includes(q)
        );
        const matchMantras = d.keyMantras.some(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.devanagari.includes(q) ||
            m.transliteration.toLowerCase().includes(q) ||
            m.meaning.toLowerCase().includes(q)
        );

        if (
          !matchName &&
          !matchSubtitle &&
          !matchTatva &&
          !matchVahana &&
          !matchAyudhas &&
          !matchFestivals &&
          !matchOfferings &&
          !matchTemples &&
          !matchMantras
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialDeities, selectedTradition, searchQuery]);

  // Counts for tradition filter chips
  const traditionListWithCounts = useMemo(() => {
    return traditions.map((trad) => {
      let count = 0;
      if (trad.id === 'all') {
        count = initialDeities.length;
      } else if (trad.id === 'pancha_deva') {
        count = initialDeities.filter((d) => d.isPanchaDeva).length;
      } else {
        count = initialDeities.filter((d) => d.tradition.toLowerCase() === trad.id.toLowerCase()).length;
      }
      return {
        ...trad,
        count,
      };
    });
  }, [initialDeities, traditions]);

  const panchaDevaCount = useMemo(() => {
    return initialDeities.filter((d) => d.isPanchaDeva).length;
  }, [initialDeities]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <DevatasHero
        totalCount={initialDeities.length}
        panchaDevaCount={panchaDevaCount}
        onSelectTradition={(trad) => setSelectedTradition(trad as DeityTradition)}
        selectedTradition={selectedTradition}
      />

      {/* Filter and Instant Search Bar */}
      <DevatasFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTradition={selectedTradition}
        onTraditionChange={setSelectedTradition}
        traditions={traditionListWithCounts}
        totalMatching={filteredDeities.length}
        totalAll={initialDeities.length}
      />

      {/* Deities Grid */}
      {filteredDeities.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDeities.map((deity) => (
            <DevataCard
              key={deity.id}
              deity={deity}
              onOpenModal={setActiveModalDeity}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-4xl">🕉️</span>
          <h3 className="mt-3 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No deities found matching your search
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Try adjusting your search keywords or clearing the tradition filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedTradition('all');
            }}
            className="mt-4 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-amber-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detailed Modal */}
      <DevataModal
        deity={activeModalDeity}
        onClose={() => setActiveModalDeity(null)}
      />
    </div>
  );
}
