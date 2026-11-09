export default function MuhurtaSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Calculating auspicious Muhurtas...">
      {/* Category selector skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>

      {/* Filter bar skeleton */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-5 w-44 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Result Cards Skeleton */}
      <div className="grid grid-cols-1 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5">
                <div className="h-6 w-52 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-3.5 w-32 rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
              <div className="h-7 w-36 rounded-full bg-emerald-500/15" />
            </div>

            {/* Limbs 4-grid */}
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-zinc-50 p-3 sm:grid-cols-4 dark:bg-zinc-800/50">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-1">
                  <div className="h-2.5 w-12 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              ))}
            </div>

            {/* Time windows */}
            <div className="space-y-2">
              <div className="h-3 w-48 rounded bg-amber-500/20" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[...Array(2)].map((_, k) => (
                  <div key={k} className="h-12 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/15" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
