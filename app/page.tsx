const NAME = "sanatan.cc";
const TAGLINE =
  "Hindu Dharma spiritual texts, articles, content, and applications.";
const GITHUB_URL = "https://github.com/dhirajnavghare/sanatan.cc";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <main className="flex w-full max-w-2xl flex-col gap-8 py-24">
        <p className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {NAME}
        </p>

        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-7xl dark:text-zinc-50">
          Launching soon.
        </h1>

        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {TAGLINE} This new website is on its way. Check back shortly.
        </p>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-base font-medium text-zinc-950 underline underline-offset-4 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
        >
          View on GitHub
        </a>
      </main>
    </div>
  );
}