'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/lib/i18n/LanguageContext';

export default function EphemerisTechPillars() {
  const [activeTab, setActiveTab] = useState<'sanatan' | 'traditional'>('sanatan');
  const { language } = useLanguage();

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <span>🔬</span>
            <span>{language === 'hi' ? 'खगोलीय यथार्थता' : 'Astronomical Ephemeris Technology'}</span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {language === 'hi' ? 'सटीक खगोलीय गणित का महत्व' : 'Why Mathematical Ephemeris Matters'}
          </h2>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {language === 'hi'
              ? 'पारम्परिक मुद्रित पञ्चाङ्गों की तुलना में नासा JPL एवं VSOP87 द्वारा संचालित शून्य-अनुमान गणना'
              : 'Comparison between traditional static tabular almanacs and our zero-approximation NASA JPL VSOP87 engine'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-800">
          <button
            type="button"
            onClick={() => setActiveTab('sanatan')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'sanatan'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'hi' ? 'गणितीय परिशुद्धता (नासा)' : 'sanatan.cc Math (NASA JPL)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('traditional')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeTab === 'traditional'
                ? 'bg-zinc-700 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {language === 'hi' ? 'पारम्परिक मुद्रित सारणी' : 'Traditional Tabular Print'}
          </button>
        </div>
      </div>

      {/* Comparison Visual Panel */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">📐</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'hi' ? 'कक्षीय परिशुद्धता' : 'Orbital Precision'}
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? 'Meeus VSOP87 एवं Chapront ELP-2000 द्वारा < ०.०००२° सौर एवं < ०.००३° चन्द्रमा की सूक्ष्म गणना।'
                : 'Meeus VSOP87 & Chapront ELP-2000 full harmonic series with < 0.0002° solar and < 0.003° lunar error.'
              : language === 'hi'
              ? 'मध्यमान गति आधारित सारणियां, जिनमें समय के साथ १५-४५ कला का विचलन आ जाता है।'
              : 'Mean motion linear tables with up to 15-45 arcminute perturbation drift over time.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? '✓ IAU खगोलीय मानक'
                : '✓ IAU Standards Compliant'
              : language === 'hi'
              ? '⚠ ऐतिहासिक स्थूल अनुमान'
              : '⚠ Historical Approximation'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">🌍</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'hi' ? 'स्थानिक क्षितिज गणना' : 'Topocentric Horizon'}
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? 'स्थानीय तुंगता (ऊंचाई), वायुमंडलीय अपवर्तन (-०.८३३३°) और सटीक लंबन (parallax) की गणना।'
                : 'Computes local elevation horizon dip, atmospheric refraction (-0.8333°), and exact topocentric parallax.'
              : language === 'hi'
              ? 'प्रायः केवल उज्जैन या वाराणसी के अक्षांश पर आधारित; अन्य देशों में १५ से ४५ मिनट तक का अन्तर।'
              : 'Typically hardcoded for Ujjain or Varanasi; introduces 15 to 45 min errors in other continents.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? '✓ वैश्विक स्तर पर सटीक'
                : '✓ Accurate Worldwide'
              : language === 'hi'
              ? '⚠ केवल क्षेत्रीय'
              : '⚠ Regional Only'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">⚡</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'hi' ? 'गणना गति' : 'Computation Speed'}
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? 'त्रिकोणमितीय सूत्रों व LRU कैशिंग के माध्यम से १ मिलीसेकंड से कम में गणना।'
                : 'Under 1 millisecond execution via optimized trigonometric formulas with LRU caching.'
              : language === 'hi'
              ? 'कागजी पोथियों में हस्तलिखित खोज या धीमे बाहरी डेटाबेस सर्वर पर निर्भरता।'
              : 'Manual lookup across voluminous paper tables or slow external server database round-trips.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? '✓ उप-मिलीसेकंड त्वरित'
                : '✓ Sub-millisecond Instant'
              : language === 'hi'
              ? '⚠ स्थैतिक हस्तलिखित सारणी'
              : '⚠ Static Manual Tables'}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="text-2xl">📜</span>
          <h4 className="mt-2 font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {language === 'hi' ? 'शास्त्रीय व्याप्ति शुद्धि' : 'Shastric Vyapti Fidelity'}
          </h4>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? 'मुहूर्त चिन्तामणि, धर्मसिन्धु एवं निर्णयसिन्धु के नियमों तथा भद्रा (विष्टि) त्याग का पूर्ण परिपालन।'
                : 'Faithful to Muhurta Chintamani, Dharmasindhu, and Nirnayasindhu with Bhadra Vishti exclusion.'
              : language === 'hi'
              ? 'स्थानीय व्याप्ति नियमों की उपेक्षा अथवा स्मार्त व वैष्णव व्रत तिथियों का घालमेल।'
              : 'Often omits critical local vyapti rules or conflates Smarta and Vaishnava fasting boundaries.'}
          </p>
          <div className="mt-3 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400">
            {activeTab === 'sanatan'
              ? language === 'hi'
                ? '✓ प्रामाणिक धर्मसिन्धु'
                : '✓ Canonical Dharmasindhu'
              : language === 'hi'
              ? '⚠ प्रकाशक अनुसार भिन्नता'
              : '⚠ Varies by Publisher'}
          </div>
        </div>
      </div>
    </div>
  );
}
