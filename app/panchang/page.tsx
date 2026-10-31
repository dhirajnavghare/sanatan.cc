import { Suspense } from 'react';
import type { Metadata } from 'next';
import PanchangView from '@/app/components/panchang/PanchangView';

export const metadata: Metadata = {
  title: 'Panchang — High Precision Vedic Calendar & Ephemeris | sanatan.cc',
  description:
    'Worlds most accurate calculation-based Hindu Vedic Panchang. High-precision calculations for Tithi, Nakshatra, Yoga, Karana, Vara, Muhurta, and Choghadiya based on exact latitude, longitude, and elevation.',
};

export default function PanchangPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-6 dark:bg-black sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="mx-auto max-w-5xl py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Calculating high-precision Vedic ephemeris...
          </div>
        }
      >
        <PanchangView />
      </Suspense>
    </div>
  );
}
