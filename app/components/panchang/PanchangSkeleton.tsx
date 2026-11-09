export default function PanchangSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading Panchang calculations...">
      {/* Hero Card Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16173d] via-[#1c1e50] to-[#0d0e26] p-6 text-white shadow-xl ring-1 ring-white/10 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-28 rounded-lg bg-amber-400/20" />
              <div className="h-6 w-32 rounded-full bg-white/10" />
              <div className="h-6 w-40 rounded-full bg-amber-400/10" />
            </div>

            <div className="h-10 w-3/4 max-w-md rounded-xl bg-white/15" />

            <div className="h-4 w-48 rounded bg-amber-300/20" />

            {/* Sun/Moon times row skeleton */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="h-3 w-16 rounded bg-white/20" />
                  <div className="mt-2 h-5 w-20 rounded bg-white/30" />
                  <div className="mt-1.5 h-2.5 w-14 rounded bg-white/15" />
                </div>
              ))}
            </div>
          </div>

          {/* Moon Visualizer Skeleton */}
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            <div className="h-24 w-24 rounded-full border border-amber-400/20 bg-white/5" />
            <div className="h-3 w-12 rounded bg-amber-200/20" />
            <div className="h-2.5 w-20 rounded bg-white/15" />
          </div>
        </div>
      </div>

      {/* 5 Pancha-Anga Cards Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-40 rounded bg-zinc-100 dark:bg-zinc-850" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${
                i === 4 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="h-3.5 w-24 rounded bg-amber-500/20 dark:bg-amber-400/15" />
                <div className="h-4 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800" />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-6 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-3.5 w-44 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800" />
                <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Muhurta Section Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-800">
              <div className="h-5 w-40 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-4 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </div>
            {[...Array(5)].map((_, j) => (
              <div key={j} className="flex items-center justify-between py-2.5 border-b border-zinc-50 dark:border-zinc-800/50">
                <div className="space-y-1">
                  <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-2.5 w-48 rounded bg-zinc-100 dark:bg-zinc-850" />
                </div>
                <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
