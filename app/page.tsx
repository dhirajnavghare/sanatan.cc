import { Suspense } from 'react';
import InteractiveHomeView from './components/home/InteractiveHomeView';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center text-sm text-zinc-500">
          <span className="text-3xl animate-pulse">ॐ</span>
          <p className="mt-3 font-serif text-base text-zinc-700 dark:text-zinc-300">
            Connecting to authentic Vedic ephemeris...
          </p>
        </div>
      }
    >
      <InteractiveHomeView />
    </Suspense>
  );
}
