import { Suspense } from 'react';
import type { Metadata } from 'next';
import MuhurtaFinderView from '@/app/components/muhurta/MuhurtaFinderView';

export const metadata: Metadata = {
  title: 'Shubh Muhurta Finder (Beta) — Auspicious Vedic Timings & Dates | sanatan.cc',
  description:
    'Algorithmic Shubh Muhurta Finder based on authentic classical scriptures (Muhurta Chintamani, Brihat Samhita). Discover optimal dates and daytime Choghadiya windows for Griha Pravesh, Vivaha, Vehicle Purchase, Business Start, Property Registration, and Namakarana with zero hardcoding.',
};

export default function MuhurtaPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-6 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Calculating auspicious Shubh Muhurtas based on astronomical ephemeris...
            </div>
          }
        >
          <MuhurtaFinderView />
        </Suspense>
      </div>
    </div>
  );
}
