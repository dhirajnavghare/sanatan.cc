import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white/70 py-10 text-xs text-zinc-600 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70 dark:text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand & Description */}
          <div className="col-span-2 space-y-3 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-indigo-900 text-sm font-bold text-white shadow-sm">
                ॐ
              </span>
              <span className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                sanatan.cc
              </span>
            </Link>
            <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Open-source digital initiative dedicated to authentic Hindu Dharma spiritual texts, high-precision mathematical astrology, and Vedic astronomical ephemeris.
            </p>
            <div className="text-[11px] text-zinc-400">
              MIT License • Zero trackers
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Applications
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/panchang"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Panchang (पञ्चाङ्गम्) <span className="text-[10px] text-amber-500 font-bold">Beta</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/muhurta"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Shubh Muhurta (शुभ मुहूर्त) <span className="text-[10px] text-amber-500 font-bold">Beta</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Organization
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine & Agent Interfaces */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Agent &amp; Open Standards
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  /llms.txt (LLM Context)
                </a>
              </li>
              <li>
                <a
                  href="/.well-known/mcp/server-card.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  MCP Server Card (SEP-1649)
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  /sitemap.xml
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dhirajnavghare/sanatan.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  GitHub Source Code ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-zinc-200/60 pt-6 text-[11px] text-zinc-500 sm:flex-row dark:border-zinc-800/60 dark:text-zinc-400">
          <div>
            © 2026 sanatan.cc • Open source for Vedic preservation.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Inquiry"
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              Feedback: mail@sanatan.cc
            </a>
            <span>•</span>
            <span className="font-mono text-[10px]">Content-Signal: search=yes, ai-train=no</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
