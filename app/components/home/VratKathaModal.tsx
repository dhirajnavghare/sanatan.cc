'use client';

import { useState } from 'react';
import { VRAT_KATHAS_DATABASE, VratKathaRecord } from '@/app/lib/vrat-katha/data';

interface VratKathaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVratId?: string;
  language: 'en' | 'hi';
}

export default function VratKathaModal({
  isOpen,
  onClose,
  defaultVratId = 'ekadashi-vrat',
  language,
}: VratKathaModalProps) {
  const [selectedVratId, setSelectedVratId] = useState<string>(defaultVratId);
  const [activeTab, setActiveTab] = useState<'vidhi' | 'rules' | 'parana' | 'katha' | 'aarti'>('vidhi');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentVrat: VratKathaRecord =
    VRAT_KATHAS_DATABASE.find((v) => v.id === selectedVratId) || VRAT_KATHAS_DATABASE[0];

  const handleCopyKatha = async () => {
    try {
      const text = `${currentVrat.titleDevanagari}\n\nव्रत कथा:\n${currentVrat.sacredKathaText}\n\nआरती:\n${currentVrat.sacredAartiText}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'hi' ? 'व्रत कथा व पूजा विधि' : 'Vrat Katha & Puja Vidhi'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-amber-500/30 bg-zinc-900 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-gradient-to-r from-amber-600/30 via-zinc-900 to-zinc-900 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl text-amber-400">
              🪔
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {language === 'hi' ? currentVrat.titleDevanagari : currentVrat.title}
              </h3>
              <p className="text-xs text-amber-300/80">
                {language === 'hi' ? currentVrat.deityDevanagari : currentVrat.deity} •{' '}
                {language === 'hi' ? currentVrat.tithiDevanagari : currentVrat.tithi}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Vrat Switcher Pills */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950/60 px-6 py-2.5 overflow-x-auto">
          {VRAT_KATHAS_DATABASE.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVratId(v.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedVratId === v.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {language === 'hi' ? v.titleDevanagari.split(' ')[0] : v.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Sub-Tabs (Vidhi, Rules, Parana, Katha, Aarti) */}
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-6 py-2 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'vidhi', label: language === 'hi' ? 'पूजा विधि' : 'Puja Vidhi' },
            { id: 'rules', label: language === 'hi' ? 'फलाहार एवं नियम' : 'Fasting Rules' },
            { id: 'parana', label: language === 'hi' ? 'पारण विधि' : 'Parana Timing' },
            { id: 'katha', label: language === 'hi' ? 'पावन व्रत कथा' : 'Sacred Katha' },
            { id: 'aarti', label: language === 'hi' ? 'दैनिक आरती' : 'Daily Aarti' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              data-testid={`vrat-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'border border-amber-400/40 bg-amber-500/20 text-amber-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-zinc-200">
          {/* Tab 1: Puja Vidhi */}
          {activeTab === 'vidhi' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <h4 className="font-serif text-base font-bold text-amber-200">
                  {language === 'hi' ? 'घर पर सरल एवं प्रामाणिक पूजा विधि:' : 'Step-by-Step Home Puja Rituals:'}
                </h4>
                <p className="mt-1 text-xs text-amber-300/80">{currentVrat.significance}</p>
              </div>

              <div className="space-y-2.5">
                {currentVrat.pujaVidhiSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-xs font-bold text-amber-300">
                      {idx + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Fasting Rules (Dos & Don'ts) */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div>
                <h4 className="flex items-center gap-2 font-serif text-base font-bold text-emerald-400">
                  <span>✓</span>
                  <span>
                    {language === 'hi' ? 'व्रत में क्या खा सकते हैं (स्वीकार्य फलाहार):' : 'Allowed Fasting Foods (Phalahar):'}
                  </span>
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {currentVrat.fastingRules.allowed.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-serif text-base font-bold text-red-400">
                  <span>✕</span>
                  <span>
                    {language === 'hi' ? 'व्रत में क्या वर्जित है (त्याग करने योग्य):' : 'Prohibited Items (Strictly Avoid):'}
                  </span>
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {currentVrat.fastingRules.prohibited.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Parana Timing & Guidance */}
          {activeTab === 'parana' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
                <div className="flex items-center gap-2 font-serif text-base font-bold text-amber-300">
                  <span>⏰</span>
                  <span>
                    {language === 'hi' ? 'पारण का शास्त्रीय महत्व एवं नियम:' : 'Parana Muhurta Canonical Rules:'}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-zinc-200">{currentVrat.paranaTimingGuidance}</p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400 leading-relaxed">
                {language === 'hi' ? (
                  <>
                    <strong className="text-white">हरिवासर नियम:</strong> द्वादशी तिथि की प्रथम एक चौथाई अवधि को हरिवासर कहते हैं। शास्त्रानुसार हरिवासर समाप्त होने के पश्चात ही व्रत खोला जाता है। पारण में सदैव भगवान विष्णु को तुलसी पत्र व चरणामृत अर्पण कर ब्राह्मण/कन्या को अन्न-दान देकर ही स्वयं अन्न ग्रहण करें।
                  </>
                ) : (
                  <>
                    <strong className="text-white">Hari Vasara Rule:</strong> The first quarter (first 25% duration) of Dvadashi tithi is called Hari Vasara. According to the scriptures, the fast is broken strictly after Hari Vasara ends. Complete the parana by offering Tulasi leaves and charanamrita to Lord Vishnu, and honor charity before taking grains.
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Sacred Katha */}
          {activeTab === 'katha' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">
                  {language === 'hi' ? 'पौराणिक व्रत माहात्म्य कथा:' : 'Puranic Vrat Mahatmya Katha:'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyKatha}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                >
                  {copied
                    ? (language === 'hi' ? '✓ कॉपी हो गया' : '✓ Copied')
                    : (language === 'hi' ? '📋 कथा कॉपी करें' : '📋 Copy Katha')}
                </button>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 font-serif text-sm sm:text-base leading-loose text-zinc-200 whitespace-pre-line">
                {currentVrat.sacredKathaText}
              </div>
            </div>
          )}

          {/* Tab 5: Sacred Aarti */}
          {activeTab === 'aarti' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">
                  {language === 'hi' ? 'दैनिक पावन आरती:' : 'Daily Sacred Aarti:'}
                </span>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-center font-serif text-base sm:text-lg leading-loose text-amber-100 whitespace-pre-line">
                {currentVrat.sacredAartiText}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-6 py-3 text-xs text-zinc-400">
          <span>{language === 'hi' ? 'शास्त्र सम्मत व्रत एवं पूजा विधि • sanatan.cc' : 'Canonical Shastric Fasting & Puja Lore • sanatan.cc'}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
          >
            {language === 'hi' ? 'बंद करें ✕' : 'Close ✕'}
          </button>
        </div>
      </div>
    </div>
  );
}
