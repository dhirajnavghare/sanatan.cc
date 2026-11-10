import { Suspense } from 'react';
import type { Metadata } from 'next';
import PrayersDirectoryView from '@/app/components/prayers/PrayersDirectoryView';

export const metadata: Metadata = {
  title: 'Sacred Prayers, Chalisas & Stotrams (Text & Chanting Reader) | sanatan.cc',
  description:
    'Complete authentic text library of Hindu prayers, Chalisas, and Stotrams (Hanuman Chalisa, Shiv Tandav Stotram, Shri Suktam, Aditya Hridaya, Sankat Mochan, Ganesh Chalisa, and daily morning Pratahsmarana mantras) with verse-by-verse meaning, font scaler, and Japa repetition counters for morning and evening rituals.',
  alternates: {
    canonical: '/prayers',
  },
};

export default function PrayersPage() {
  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-6 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Suspense
          fallback={
            <div className="mx-auto max-w-5xl py-16 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Loading sacred prayers and classical chalisas...
            </div>
          }
        >
          <PrayersDirectoryView />
        </Suspense>
      </div>
    </div>
  );
}
