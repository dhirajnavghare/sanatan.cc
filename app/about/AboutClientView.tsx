'use client';

import Link from 'next/link';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function AboutClientView() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <div className="flex-1 bg-zinc-50/50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            <span>ॐ</span>
            <span>{isHi ? 'sanatan.cc के विषय में' : 'About sanatan.cc'}</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {isHi
              ? 'आधुनिक यथार्थता के साथ वैदिक ज्ञान का संरक्षण'
              : 'Preserving Vedic Wisdom Through Modern Precision'}
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {isHi
              ? 'sanatan.cc एक गैर-व्यावसायिक, मुक्त-स्रोत (Open-Source) प्रकल्प है, जो सनातन हिन्दू धर्म के प्रामाणिक आध्यात्मिक ग्रन्थों, दार्शनिक सिद्धान्तों तथा उच्च-सटीक खगोलीय वैदिक पञ्चाङ्ग गणनाओं को विश्वभर में जन-जन तक पहुँचाने हेतु समर्पित है।'
              : 'sanatan.cc is a non-commercial, open-source initiative dedicated to preserving and sharing authentic Hindu Dharma spiritual texts, philosophical treatises, and world-class mathematical Vedic ephemeris applications.'}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-xl text-amber-600 dark:text-amber-400">
              🔭
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'शुद्ध खगोलशास्त्र, शून्य सारिणी हार्डकोडिंग' : 'Pure Ephemeris, Zero Hardcoding'}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'स्थिर सारिणी-आधारित ऍप्स के विपरीत, हमारा पञ्चाङ्ग एवं मुहूर्त तन्त्र आधुनिक खगोलयांत्रिकी (VSOP87 सौर सिद्धान्त, Chapront ELP-2000 चन्द्र क्षोभ सिद्धान्त तथा लाहिरी चित्रा पक्ष अयनांश) द्वारा वास्तविक समय में ग्रहों की सटीक स्थिति की गणना करता है। प्रत्येक अंग संक्रमण सेकंड की सूक्ष्मता से निर्धारित होता है।'
                : 'Unlike static table lookup apps, our Panchang and Muhurta engines calculate planetary and solilunar positions in real-time using modern celestial mechanics (VSOP87 planetary theory, Chapront ELP-2000 lunar theory, and Lahiri Chitra Paksha Ayanamsa). Every limb transition is accurate to the astronomical second for any coordinates on Earth.'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-600 dark:text-indigo-400">
              📜
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'शास्त्रीय प्रामाणिकता एवं निष्ठा' : 'Classical Shastra Fidelity'}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'हमारे मुहूर्त नियम सूर्यसिद्धान्त, मुहूर्तचिन्तामणि, बृहत्संहिता तथा कालप्रकाशिका जैसे प्रामाणिक ग्रन्थों पर आधारित हैं। भद्रा (विष्टि करण), रिक्ता तिथियाँ तथा मृत्यु/अग्नि पञ्चक जैसे अशुभ योगों का पूर्ण शास्त्रीय परिहार किया जाता है।'
                : 'Our auspicious timing algorithms rigorously encode traditional rules from canonical authorities including Surya Siddhanta, Muhurta Chintamani, Brihat Samhita, and Kalaprakasika. We filter malefic conditions like Bhadra (Vishti Karana) and Rikta Tithis with scriptural precision.'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-600 dark:text-emerald-400">
              🔒
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'पूर्णतः स्थानीय गोपनीयता' : 'Local Privacy by Design'}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'सभी खगोलीय गणनाएँ आपके ब्राउज़र के भीतर ही सम्पन्न होती हैं। हम किसी भी प्रकार का ट्रैकर, विज्ञापन अथवा तृतीय-पक्ष डेटा संग्रह स्क्रिप्ट उपयोग नहीं करते। आपका भौगोलिक स्थान आपके उपकरण से कभी बाहर नहीं जाता।'
                : 'All astronomical calculations execute entirely inside your client browser. We deploy zero tracking scripts, zero third-party telemetry, and zero advertising pixels. Your geographical location never leaves your device.'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-600 dark:text-purple-400">
              🤖
            </div>
            <h2 className="mt-4 font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isHi ? 'एजेंट एवं AI-सक्षम अवसंरचना' : 'Agent-Ready Infrastructure'}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              {isHi
                ? 'जिज्ञासु साधकों तथा स्वायत्त AI एजेंट्स दोनों हेतु अभिकल्पित। हम स्वच्छ मार्कडाउन (Accept: text/markdown), इन-ब्राउज़र WebMCP टूल्स (navigator.modelContext), llms.txt तथा MCP सर्वर कार्ड उपलब्ध कराते हैं।'
                : 'Designed from the ground up for both human seekers and AI agents. We publish clean Markdown representations (Accept: text/markdown), expose in-browser WebMCP tools (navigator.modelContext), serve standard llms.txt, and host an MCP Server Card (/.well-known/mcp/server-card.json).'}
            </p>
          </div>
        </div>

        {/* Open Source Callout */}
        <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50/50 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800/40">
          <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
            {isHi ? 'मुक्त-स्रोत एवं समुदाय सत्यापन' : 'Open Source & Community Validation'}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {isHi
              ? 'यह रिपॉजिटरी Creative Commons CC0 1.0 Universal Public Domain Dedication के अन्तर्गत पूर्णतः मुक्त-स्रोत है। हम खगोलविदों, ज्योतिर्विदों तथा विद्वानों को हमारी गणितीय गणनाओं की समीक्षा हेतु सादर आमन्त्रित करते हैं।'
              : 'This repository is open-source under the Creative Commons CC0 1.0 Universal Public Domain Dedication. We actively invite astronomers, Jyotish scholars, and developers to audit our mathematical algorithms and report discrepancies against verified observatories.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="https://github.com/dhirajnavghare/sanatan.cc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <span>{isHi ? 'गिटहब रिपॉजिटरी' : 'GitHub Repository'}</span>
              <span>→</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <span>{isHi ? 'सम्पर्क एवं सुझाव' : 'Contact & Feedback'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
