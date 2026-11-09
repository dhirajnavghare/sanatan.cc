'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: '🏠', beta: false },
    { name: 'Panchang', href: '/panchang', devanagari: 'पञ्चाङ्ग', icon: '🗓', beta: true },
    { name: 'Shubh Muhurta', href: '/muhurta', devanagari: 'शुभ मुहूर्त', icon: '✨', beta: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl transition-colors dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-lg font-bold text-white shadow-md shadow-amber-500/20 ring-1 ring-amber-400/40 transition-transform duration-200 group-hover:scale-105">
            ॐ
            <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              sanatan.cc
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-amber-700 dark:text-amber-400">
              वैदिक ज्ञान एवं अनुप्रयोग
            </span>
          </div>
        </Link>

        {/* Central Segmented Tab Switcher (Desktop & Tablet) */}
        <nav
          className="hidden items-center rounded-2xl border border-zinc-200/80 bg-zinc-100/80 p-1 backdrop-blur-md sm:flex dark:border-zinc-800 dark:bg-zinc-900/80"
          aria-label="Main Navigation Tabs"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-zinc-950 shadow-sm ring-1 ring-black/5 dark:bg-zinc-800 dark:text-amber-300 dark:ring-white/10'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
                {link.beta && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-800 dark:bg-amber-400/20 dark:text-amber-300'
                        : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}
                  >
                    Beta
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Beta%20Feedback"
            className="hidden items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100 hover:text-zinc-900 md:inline-flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="Send calculation feedback or observations to mail@sanatan.cc"
          >
            <span>✉️</span>
            <span>Feedback</span>
          </a>

          <a
            href="https://github.com/dhirajnavghare/sanatan.cc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex border-t border-zinc-200/60 bg-zinc-50/70 p-1.5 sm:hidden dark:border-zinc-800/60 dark:bg-zinc-900/70">
        <div className="grid w-full grid-cols-3 gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-center gap-1 rounded-xl py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-amber-300'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.devanagari || link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
