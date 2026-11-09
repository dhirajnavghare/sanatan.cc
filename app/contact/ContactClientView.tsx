'use client';

import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function ContactClientView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>✉️</span>
            <span>{isHi ? 'सम्पर्क एवं सुझाव' : 'Contact & Feedback'}</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {isHi ? 'सम्पर्क करें' : 'Get in Touch'}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {isHi
              ? 'शोधकर्ताओं, विद्वानों, ज्योतिर्विदों तथा कम्प्यूटेशनल खगोलशास्त्र एवं आध्यात्मिक ज्ञान संरक्षण में रुचि रखने वाले सभी सनातन बन्धुओं का स्वागत है।'
              : 'We welcome inquiries from researchers, developers, Jyotish practitioners, and anyone interested in advancing computational Vedic astronomy and spiritual knowledge preservation.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'प्रत्यक्ष ईमेल' : 'Direct Email'}
            </h2>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'सामान्य जिज्ञासाओं, सत्यापन टिप्पणियों अथवा तकनीकी पत्राचार हेतु:'
                : 'For general inquiries, validation reports, or technical correspondence:'}
            </p>
            <div className="mt-4">
              <a
                href="mailto:mail@sanatan.cc?subject=Sanatan.cc%20Inquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600"
              >
                <span>✉️ mail@sanatan.cc</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'मुक्त-स्रोत कोडबेस एवं बग रिपोर्ट' : 'Open Source Codebase & Bug Reports'}
            </h2>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'हमारा कोडबेस गिटहब पर पूर्णतः सार्वजनिक है। आप समस्याएँ सूचित कर सकते हैं, पुल रिक्वेस्ट दे सकते हैं अथवा हमारी परीक्षण श्रृंखला की समीक्षा कर सकते हैं।'
                : 'Our code is public on GitHub. Feel free to open issues, submit pull requests, or review our test suites.'}
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/dhirajnavghare/sanatan.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <span>github.com/dhirajnavghare/sanatan.cc</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'खगोलीय पञ्चाङ्ग सत्यापन दिशानिर्देश' : 'Astronomical Validation Guidelines'}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'क्षेत्रीय पञ्चाङ्गों के साथ गणना अन्तर सूचित करते समय कृपया निम्न विवरण अवश्य दें:'
                : 'When reporting calculation differences with regional panchangams:'}
            </p>
            <ul className="mt-3 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  {isHi
                    ? 'निरीक्षक के सटीक अक्षांश, देशान्तर तथा दिनांक सम्मिलित करें।'
                    : 'Include exact Observer Latitude, Longitude, and Date.'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  {isHi
                    ? 'तुलनात्मक सन्दर्भ पञ्चाङ्ग (जैसे दृक पञ्चाङ्ग, दाते पञ्चाङ्ग अथवा स्थानीय पञ्चाङ्ग) स्पष्ट करें।'
                    : 'Specify the reference panchang (e.g. Drik Panchang, Date Panchang, or regional almanac).'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-500 font-bold">•</span>
                <span>
                  {isHi
                    ? 'क्या शीर्षकेन्द्रीय अपवर्तन या क्षितिज नमन सम्मिलित किया गया है, इसका उल्लेख करें।'
                    : 'Mention whether topocentric refraction or dip was accounted for.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
