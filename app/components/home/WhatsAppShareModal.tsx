'use client';

import { useState, useRef, useMemo } from 'react';
import { PanchangData, GeoLocation } from '@/app/lib/panchang/types';
import { CalendarSystem } from '@/app/lib/i18n/LanguageContext';
import { cleanPlanetLord, cleanChoghadiyaQuality } from '@/app/lib/i18n/formatters';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  panchang: PanchangData;
  location: GeoLocation;
  calendarSystem: CalendarSystem;
  language: 'en' | 'hi';
}

export default function WhatsAppShareModal({
  isOpen,
  onClose,
  panchang,
  location,
  calendarSystem,
  language,
}: WhatsAppShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active month name according to regional system
  const masaDisplay = useMemo(() => {
    if (calendarSystem === 'amanta') {
      return language === 'hi'
        ? `${panchang.masa.amantaNameDevanagari} मास (अमान्त)`
        : `${panchang.masa.amantaName} Masa (Amanta)`;
    }
    return language === 'hi'
      ? `${panchang.masa.purnimantaNameDevanagari} मास (पूर्णिमान्त)`
      : `${panchang.masa.purnimantaName} Masa (Purnimanta)`;
  }, [calendarSystem, language, panchang.masa]);

  const activeChoghadiya = useMemo(() => {
    const all = [...panchang.choghadiya.day, ...panchang.choghadiya.night];
    return all.find((c) => c.isCurrent) || all[0];
  }, [panchang]);

  // Formatted date string
  const formattedDate = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: location.timezone,
      }).format(panchang.date);
    } catch {
      return panchang.isoDate;
    }
  }, [language, location.timezone, panchang.date, panchang.isoDate]);

  // Formatted WhatsApp Message
  const getShareText = () => {
    const sunriseStr = formatTime(panchang.sunTimes.sunrise, location.timezone);
    const sunsetStr = formatTime(panchang.sunTimes.sunset, location.timezone);
    const abhijitStr = panchang.muhurtas.abhijitMuhurta
      ? `${formatTime(panchang.muhurtas.abhijitMuhurta.startTime, location.timezone)} - ${formatTime(panchang.muhurtas.abhijitMuhurta.endTime, location.timezone)}`
      : 'लागू नहीं';
    const rahuStr = `${formatTime(panchang.muhurtas.rahuKaal.startTime, location.timezone)} - ${formatTime(panchang.muhurtas.rahuKaal.endTime, location.timezone)}`;

    if (language === 'hi') {
      return `🚩 ॐ श्री गणेशाय नमः 🚩
*आज का वैदिक पञ्चाङ्ग • sanatan.cc*
📍 स्थान: ${location.name}
📅 दिनांक: ${formattedDate}
✨ ${masaDisplay} • ${panchang.tithi.current.pakshaDevanagari} पक्ष
🔱 संवत्: विक्रम ${panchang.samvat.vikramSamvat} | शक ${panchang.samvat.shakaSamvat}

🌙 *तिथि:* ${panchang.tithi.current.nameDevanagari} (${panchang.tithi.current.pakshaDevanagari} पक्ष)
⭐ *नक्षत्र:* ${panchang.nakshatra.current.nameDevanagari} (स्वामी: ${cleanPlanetLord(panchang.nakshatra.current.lord, true)})
🕉️ *योग:* ${panchang.yoga.current.nameDevanagari} | *करण:* ${panchang.karana.current.nameDevanagari}
☀️ *वार:* ${panchang.vara.nameDevanagari} (ग्रह: ${cleanPlanetLord(panchang.vara.lordPlanet, true)})

🌅 *सूर्योदय:* ${sunriseStr} | 🌇 *सूर्यास्त:* ${sunsetStr}
🌟 *अभिजित मुहूर्त:* ${abhijitStr} (अति शुभ)
⚠️ *राहु काल:* ${rahuStr} (अशुभ समय)
⌛ *शुभ चौघड़िया:* ${activeChoghadiya?.nameDevanagari || 'अमृत'} (${cleanChoghadiyaQuality(activeChoghadiya?.quality, true) || 'शुभ'})

📿 *दैनिक महामंत्र:*
"ॐ नमः शिवाय" • "हरे राम हरे कृष्ण"

👉 *सम्पूर्ण पञ्चाङ्ग, चौघड़िया एवं शुभ मुहूर्त देखें:*
https://sanatan.cc/panchang?date=${panchang.isoDate}

_शुद्ध गणितीय खगोलीय पञ्चाङ्ग • बिना किसी विज्ञापन के निःशुल्क जनहित में_`;
    }

    return `🚩 Om Shri Ganeshaya Namah 🚩
*Daily Vedic Panchang • sanatan.cc*
📍 Location: ${location.name}
📅 Date: ${formattedDate}
✨ ${masaDisplay} • ${panchang.tithi.current.paksha} Paksha
🔱 Samvat: Vikram ${panchang.samvat.vikramSamvat} | Shaka ${panchang.samvat.shakaSamvat}

🌙 *Tithi:* ${panchang.tithi.current.name} (${panchang.tithi.current.paksha})
⭐ *Nakshatra:* ${panchang.nakshatra.current.name} (Lord: ${cleanPlanetLord(panchang.nakshatra.current.lord, false)})
🕉️ *Yoga:* ${panchang.yoga.current.name} | *Karana:* ${panchang.karana.current.name}
☀️ *Vara:* ${panchang.vara.englishName}

🌅 *Sunrise:* ${sunriseStr} | 🌇 *Sunset:* ${sunsetStr}
🌟 *Abhijit Muhurta:* ${abhijitStr} (Most Auspicious)
⚠️ *Rahu Kaal:* ${rahuStr} (Inauspicious Period)
⌛ *Active Choghadiya:* ${activeChoghadiya?.name || 'Amrit'} (${activeChoghadiya?.quality || 'Auspicious'})

📿 *Sacred Mantra:*
"Om Namah Shivaya" • "Hare Rama Hare Krishna"

👉 *View Full Panchang, Choghadiya & Muhurtas:*
https://sanatan.cc/panchang?date=${panchang.isoDate}

_Pure NASA Ephemeris Math • Free, Open-Source & Ad-Free_`;
  };

  const shareText = getShareText();

  if (!isOpen) return null;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleWhatsAppRedirect = () => {
    const encoded = encodeURIComponent(shareText);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadImageCard = () => {
    setIsGeneratingImage(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setIsGeneratingImage(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGeneratingImage(false);
      return;
    }

    // 1080 x 1080 HD Square Card
    canvas.width = 1080;
    canvas.height = 1080;

    // Background Gradient (Deep sacred saffron to midnight ruby)
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    bgGrad.addColorStop(0, '#1a0b02');
    bgGrad.addColorStop(0.35, '#2e1202');
    bgGrad.addColorStop(0.7, '#421600');
    bgGrad.addColorStop(1, '#1f0900');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative Sacred Gold Border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1020, 1020);

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, 990, 990);

    // Corner Ornaments
    drawCornerAccent(ctx, 45, 45);
    drawCornerAccent(ctx, 1035, 45, true);
    drawCornerAccent(ctx, 45, 1035, false, true);
    drawCornerAccent(ctx, 1035, 1035, true, true);

    // Header Emblem: ॐ
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 72px serif';
    ctx.textAlign = 'center';
    ctx.fillText('ॐ', 540, 140);

    // Brand & Title
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText(language === 'hi' ? 'दैनिक वैदिक पञ्चाङ्ग' : 'DAILY VEDIC PANCHANG', 540, 200);

    ctx.fillStyle = '#fde68a';
    ctx.font = '26px sans-serif';
    ctx.fillText(`${formattedDate} • ${location.name}`, 540, 245);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(
      language === 'hi'
        ? `${masaDisplay} | विक्रम संवत् ${panchang.samvat.vikramSamvat}`
        : `${masaDisplay} | Vikram Samvat ${panchang.samvat.vikramSamvat}`,
      540,
      295
    );

    // Divider Line
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 325);
    ctx.lineTo(930, 325);
    ctx.stroke();

    // 5 Limbs (Pancha-Anga) Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    roundRect(ctx, 100, 355, 880, 360, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 5 Limbs Content
    ctx.textAlign = 'left';
    const leftX = 140;
    const rightValX = 520;
    let rowY = 415;

    if (language === 'hi') {
      drawRow(ctx, '🌙 तिथि:', panchang.tithi.current.nameDevanagari, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '⭐ नक्षत्र:', panchang.nakshatra.current.nameDevanagari, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '🕉️ योग:', panchang.yoga.current.nameDevanagari, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '⚡ करण:', panchang.karana.current.nameDevanagari, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '☀️ वार:', panchang.vara.nameDevanagari, leftX, rightValX, rowY);
    } else {
      drawRow(ctx, '🌙 Tithi:', `${panchang.tithi.current.name} (${panchang.tithi.current.paksha} Paksha)`, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '⭐ Nakshatra:', `${panchang.nakshatra.current.name} (Pada ${panchang.nakshatra.current.pada})`, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '🕉️ Yoga:', panchang.yoga.current.name, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '⚡ Karana:', panchang.karana.current.name, leftX, rightValX, rowY);
      rowY += 60;
      drawRow(ctx, '☀️ Solar Day:', panchang.vara.englishName, leftX, rightValX, rowY);
    }

    // Auspicious & Inauspicious Timings Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    roundRect(ctx, 100, 740, 880, 180, 20);
    ctx.fill();

    const sunriseStr = formatTime(panchang.sunTimes.sunrise, location.timezone);
    const sunsetStr = formatTime(panchang.sunTimes.sunset, location.timezone);
    const abhijitStr = panchang.muhurtas.abhijitMuhurta
      ? `${formatTime(panchang.muhurtas.abhijitMuhurta.startTime, location.timezone)} - ${formatTime(panchang.muhurtas.abhijitMuhurta.endTime, location.timezone)}`
      : (language === 'hi' ? 'आज नहीं' : 'Not Today');
    const rahuStr = `${formatTime(panchang.muhurtas.rahuKaal.startTime, location.timezone)} - ${formatTime(panchang.muhurtas.rahuKaal.endTime, location.timezone)}`;

    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#fef3c7';
    if (language === 'hi') {
      ctx.fillText(`🌅 सूर्योदय: ${sunriseStr}   |   🌇 सूर्यास्त: ${sunsetStr}`, 140, 795);
      ctx.fillText(`🌟 अभिजित मुहूर्त: ${abhijitStr}`, 140, 845);
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(`⚠️ राहु काल: ${rahuStr}`, 140, 895);
    } else {
      ctx.fillText(`🌅 Sunrise: ${sunriseStr}   |   🌇 Sunset: ${sunsetStr}`, 140, 795);
      ctx.fillText(`🌟 Abhijit Muhurta: ${abhijitStr}`, 140, 845);
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(`⚠️ Rahu Kaal: ${rahuStr}`, 140, 895);
    }

    // Footer Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(
      language === 'hi'
        ? '🚩 sanatan.cc • निःशुल्क शुद्ध वैदिक पञ्चाङ्ग 🚩'
        : '🚩 sanatan.cc • Pure Astronomical Vedic Panchang 🚩',
      540,
      980
    );

    ctx.fillStyle = '#9ca3af';
    ctx.font = '20px sans-serif';
    ctx.fillText(
      language === 'hi'
        ? 'उच्च-परिशुद्ध खगोलीय गणना • शून्य ट्रैकर • नासा JPL मॉडल'
        : 'High-Precision Ephemeris • Zero Trackers • NASA JPL Models',
      540,
      1015
    );

    // Trigger Download
    setTimeout(() => {
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `sanatan-panchang-${panchang.isoDate}.png`;
        link.href = dataUrl;
        link.click();
      } finally {
        setIsGeneratingImage(false);
      }
    }, 100);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'hi' ? 'दैनिक पञ्चाङ्ग शेयर करें' : 'WhatsApp Daily Panchang Share'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-amber-500/30 bg-zinc-900 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-gradient-to-r from-amber-600/30 via-zinc-900 to-zinc-900 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl text-emerald-400">
              📲
            </span>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {language === 'hi' ? 'दैनिक पञ्चाङ्ग शेयर करें' : 'Share Daily Panchang on WhatsApp'}
              </h3>
              <p className="text-xs text-amber-300/80">
                {formattedDate} • {location.name}
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

        {/* Text Preview Box */}
        <div className="p-6">
          <label className="text-xs font-semibold text-zinc-400">
            {language === 'hi' ? 'व्हाट्सएप संदेश पूर्वावलोकन:' : 'WhatsApp Message Preview:'}
          </label>
          <div className="mt-2 max-h-64 overflow-y-auto rounded-2xl border border-zinc-700/80 bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-200 whitespace-pre-wrap select-all">
            {shareText}
          </div>

          {/* Hidden Canvas for Image Card Generation */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Primary Action: Direct WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppRedirect}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:from-emerald-600 hover:to-emerald-700 cursor-pointer"
            >
              <span className="text-base">💬</span>
              <span>{language === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send via WhatsApp'}</span>
            </button>

            {/* Action 2: Copy Formatted Text */}
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-xs font-bold text-white transition hover:bg-zinc-700 cursor-pointer"
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? (language === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (language === 'hi' ? 'टेक्स्ट कॉपी करें' : 'Copy Text')}</span>
            </button>

            {/* Action 3: Download HD Image Card */}
            <button
              type="button"
              onClick={handleDownloadImageCard}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/15 px-4 py-3 text-xs font-bold text-amber-300 transition hover:bg-amber-500/25 disabled:opacity-50 cursor-pointer"
            >
              <span>🖼️</span>
              <span>{isGeneratingImage ? 'डाउनलोड हो रहा...' : (language === 'hi' ? 'फोटो कार्ड डाउनलोड' : 'Download Photo')}</span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="border-t border-zinc-800 bg-zinc-950/70 px-6 py-3 text-center text-[11px] text-zinc-500">
          {language === 'hi'
            ? 'परिवार एवं मित्रों के व्हाट्सएप ग्रुप पर प्रामाणिक वैदिक पञ्चाङ्ग साझा करें 🙏'
            : 'Share verified Sanatan Vedic Panchang with family and friends on WhatsApp groups 🙏'}
        </div>
      </div>
    </div>
  );
}

function formatTime(date: Date, timezone: string): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    }).format(date);
  } catch {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawRow(
  ctx: CanvasRenderingContext2D,
  label: string,
  val: string,
  x1: number,
  x2: number,
  y: number
) {
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText(label, x1, y);

  ctx.font = '28px sans-serif';
  ctx.fillStyle = '#fef3c7';
  ctx.fillText(val, x2, y);
}

function drawCornerAccent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  flipX = false,
  flipY = false
) {
  const dirX = flipX ? -1 : 1;
  const dirY = flipY ? -1 : 1;

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y + 25 * dirY);
  ctx.lineTo(x, y);
  ctx.lineTo(x + 25 * dirX, y);
  ctx.stroke();
}
