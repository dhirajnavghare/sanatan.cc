'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

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
              {language === 'hi'
                ? 'सनातन धर्म के प्रामाणिक ग्रंथों, उच्च परिशुद्धता गणितीय ज्योतिष एवं वैदिक खगोलीय गणना को समर्पित खुला डिजिटल उपक्रम।'
                : 'Open-source digital initiative dedicated to authentic Hindu Dharma spiritual texts, high-precision mathematical astrology, and Vedic astronomical ephemeris.'}
            </p>
            <div className="text-[11px] text-zinc-400">
              {language === 'hi' ? 'CC0 1.0 सार्वभौमिक • शून्य ट्रैकर' : 'CC0 1.0 Universal • Zero trackers'}
            </div>
          </div>

          {/* Applications */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {language === 'hi' ? 'अनुप्रयोग' : 'Applications'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/panchang"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'पञ्चाङ्ग' : 'Panchang'}
                </Link>
              </li>
              <li>
                <Link
                  href="/muhurta"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'शुभ मुहूर्त' : 'Shubh Muhurta'}
                </Link>
              </li>
              <li>
                <Link
                  href="/festivals"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'व्रत एवं त्योहार' : 'Festivals Timeline'}
                </Link>
              </li>
              <li>
                <Link
                  href="/devatas"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'देवी-देवता' : 'Devi Devatas'}
                </Link>
              </li>
              <li>
                <Link
                  href="/temples"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'तीर्थ एवं मन्दिर' : 'Temples & Tirthas'}
                </Link>
              </li>
              <li>
                <Link
                  href="/prayers"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'स्तोत्र एवं चालीसा' : 'Prayers & Chalisas'}
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'सेटिंग्स व प्रधान देशान्तर' : 'Settings & Meridian'}
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <span>🤖</span>
                  <span>{language === 'hi' ? 'एंड्रॉइड ऐप (शीघ्र उपलब्ध)' : 'Android App (Coming Soon)'}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* About & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {language === 'hi' ? 'संस्था' : 'Organization'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'परिचय' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'सम्पर्क एवं सहायता' : 'Contact & Support'}
                </Link>
              </li>
              <li>
                <a
                  href="https://dhirajnavghare.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'डेवलपर सम्पर्क ↗' : 'Developer Contact ↗'}
                </a>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400"
                >
                  {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine & Agent Interfaces */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              {language === 'hi' ? 'मुक्त मानक एवं अवसंरचना' : 'Agent & Open Standards'}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="/api/calendar?type=major"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  /api/calendar (.ics)
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  /llms.txt ({language === 'hi' ? 'एआई संदर्भ' : 'LLM Context'})
                </a>
              </li>
              <li>
                <a
                  href="/.well-known/mcp/server-card.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-600 dark:hover:text-amber-400 font-mono text-[11px]"
                >
                  {language === 'hi' ? 'एमसीपी सर्वर कार्ड (एसईपी-१६४९)' : 'MCP Server Card (SEP-1649)'}
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
                  {language === 'hi' ? 'गिटहब स्रोत कोड ↗' : 'GitHub Source Code ↗'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-zinc-200/60 pt-6 text-[11px] text-zinc-500 sm:flex-row dark:border-zinc-800/60 dark:text-zinc-400">
          <div>
            {language === 'hi'
              ? '© 2026 sanatan.cc • वैदिक धरोहर के संरक्षण हेतु खुला स्रोत।'
              : '© 2026 sanatan.cc • Open source for Vedic preservation.'}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Inquiry"
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              {language === 'hi' ? 'प्रतिक्रिया:' : 'Feedback:'} mail@sanatan.cc
            </a>
            <span>•</span>
            <span className="font-mono text-[10px]">Content-Signal: search=yes, ai-train=no</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
