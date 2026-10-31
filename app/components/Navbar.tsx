'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', beta: false },
    { name: 'Panchang', href: '/panchang', beta: true },
    { name: 'Muhurta', href: '/muhurta', beta: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-indigo-900 text-lg font-bold text-white shadow-sm ring-1 ring-amber-400/30 transition-transform group-hover:scale-105">
              ॐ
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                sanatan.cc
              </span>
              <span className="text-[10px] font-medium tracking-wide text-amber-700 dark:text-amber-400">
                वैदिक ज्ञान एवं अनुप्रयोग
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-100/70 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {link.name}
                  {link.beta && (
                    <span className="ml-1.5 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      Beta
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Panchang%20Beta%20Feedback"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="Send Feedback to mail@sanatan.cc"
          >
            <span>✉️</span>
            <span className="hidden sm:inline">Feedback</span>
          </a>

          <div className="flex items-center gap-1.5 sm:hidden">
            <Link
              href="/panchang"
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-amber-700 hover:to-amber-800"
            >
              <span>पञ्चाङ्ग</span>
            </Link>
            <Link
              href="/muhurta"
              className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-800 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:from-indigo-800 hover:to-indigo-900"
            >
              <span>मुहूर्त</span>
            </Link>
          </div>
          <a
            href="https://github.com/dhirajnavghare/sanatan.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
