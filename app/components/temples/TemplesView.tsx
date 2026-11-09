'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { TempleRecord, TempleCircuit, TempleTradition } from '@/app/lib/temples/types';
import TemplesHero from './TemplesHero';
import TemplesFilterBar from './TemplesFilterBar';
import TempleCard from './TempleCard';
import TempleModal from './TempleModal';

interface TemplesViewProps {
  initialTemples: TempleRecord[];
  circuits: {
    id: TempleCircuit;
    label: string;
    labelDevanagari: string;
  }[];
}

export default function TemplesView({ initialTemples, circuits }: TemplesViewProps) {
  const searchParams = useSearchParams();

  // Initialize directly from URL search parameters
  const initialCircuit = (searchParams.get('circuit') as TempleCircuit) || 'all';
  const initialTrad = (searchParams.get('tradition') as TempleTradition) || 'all';
  const initialQ = searchParams.get('q') || '';
  const initialId = searchParams.get('id') || '';

  const [selectedCircuit, setSelectedCircuit] = useState<TempleCircuit>(initialCircuit);
  const [selectedTradition, setSelectedTradition] = useState<TempleTradition>(initialTrad);
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeModalTemple, setActiveModalTemple] = useState<TempleRecord | null>(() => {
    if (!initialId) return null;
    return initialTemples.find((t) => t.id.toLowerCase() === initialId.toLowerCase()) || null;
  });

  // Client-side instant filter and search
  const filteredTemples = useMemo(() => {
    return initialTemples.filter((t) => {
      // 1. Circuit filter
      if (selectedCircuit !== 'all' && t.circuitCategory !== selectedCircuit) {
        return false;
      }

      // 2. Tradition filter
      if (selectedTradition !== 'all' && t.tradition.toLowerCase() !== selectedTradition.toLowerCase()) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = t.name.toLowerCase().includes(q) || t.nameDevanagari.includes(q);
        const matchDeity =
          t.primaryDeity.toLowerCase().includes(q) ||
          t.primaryDeityDevanagari.includes(q) ||
          (t.consortDeity && t.consortDeity.toLowerCase().includes(q));
        const matchLocation =
          t.location.city.toLowerCase().includes(q) ||
          t.location.state.toLowerCase().includes(q) ||
          t.location.country.toLowerCase().includes(q);
        const matchRiver = t.sacredRiver && t.sacredRiver.toLowerCase().includes(q);
        const matchCircuit = t.circuit.toLowerCase().includes(q);
        const matchSignificance = t.significance.toLowerCase().includes(q) || t.puranicLore.toLowerCase().includes(q);
        const matchFestivals = t.majorFestivals.some((f) => f.toLowerCase().includes(q));

        if (
          !matchName &&
          !matchDeity &&
          !matchLocation &&
          !matchRiver &&
          !matchCircuit &&
          !matchSignificance &&
          !matchFestivals
        ) {
          return false;
        }
      }

      return true;
    });
  }, [initialTemples, selectedCircuit, selectedTradition, searchQuery]);

  // Counts for circuit filter chips
  const circuitListWithCounts = useMemo(() => {
    return circuits.map((c) => {
      let count = 0;
      if (c.id === 'all') {
        count = initialTemples.length;
      } else {
        count = initialTemples.filter((t) => t.circuitCategory === c.id).length;
      }
      return {
        ...c,
        count,
      };
    });
  }, [initialTemples, circuits]);

  const jyotirlingaCount = useMemo(() => {
    return initialTemples.filter((t) => t.circuitCategory === 'jyotirlinga').length;
  }, [initialTemples]);

  const charDhamCount = useMemo(() => {
    return initialTemples.filter((t) => t.circuitCategory === 'char_dham').length;
  }, [initialTemples]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <TemplesHero
        totalCount={initialTemples.length}
        jyotirlingaCount={jyotirlingaCount}
        charDhamCount={charDhamCount}
        onSelectCircuit={(circ) => setSelectedCircuit(circ as TempleCircuit)}
        selectedCircuit={selectedCircuit}
      />

      {/* Filter and Instant Search Bar */}
      <TemplesFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCircuit={selectedCircuit}
        onCircuitChange={setSelectedCircuit}
        circuits={circuitListWithCounts}
        selectedTradition={selectedTradition}
        onTraditionChange={setSelectedTradition}
        totalMatching={filteredTemples.length}
        totalAll={initialTemples.length}
      />

      {/* Temples Grid */}
      {filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((temple) => (
            <TempleCard
              key={temple.id}
              temple={temple}
              onOpenModal={setActiveModalTemple}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-4xl">🛕</span>
          <h3 className="mt-3 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
            No temples found matching your search
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Try adjusting your search keywords or clearing the circuit filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCircuit('all');
              setSelectedTradition('all');
            }}
            className="mt-4 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-amber-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Detailed Lore Modal */}
      <TempleModal
        temple={activeModalTemple}
        onClose={() => setActiveModalTemple(null)}
      />
    </div>
  );
}
