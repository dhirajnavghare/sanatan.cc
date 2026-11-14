// Mandir brass bell harmonic frequencies (Fundamental D5 ~587Hz with characteristic bell overtones)
export const TEMPLE_BELL_HARMONICS = [
  { freq: 587.33, gain: 0.6, decay: 1.8 }, // Fundamental bell chime
  { freq: 1174.66, gain: 0.35, decay: 1.4 }, // 1st octave overtone
  { freq: 1762.0, gain: 0.2, decay: 0.9 }, // 3rd harmonic
  { freq: 2349.32, gain: 0.15, decay: 0.6 }, // Bell shimmer
  { freq: 2936.65, gain: 0.08, decay: 0.4 }, // High sparkle
];

let webAudioCtx: AudioContext | null = null;

function getWebAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!webAudioCtx || webAudioCtx.state === 'closed') {
    webAudioCtx = new AudioCtx();
  }
  if (webAudioCtx.state === 'suspended') {
    webAudioCtx.resume().catch(() => {});
  }
  return webAudioCtx;
}

// Synthesis fallback for temple bell
function playSynthesizedBell(volume: number): void {
  try {
    const ctx = getWebAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(1.0, Math.max(0.1, volume)), now);
    masterGain.connect(ctx.destination);

    TEMPLE_BELL_HARMONICS.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(gain, now + 0.005);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Non-blocking fallback
  }
}

// Synthesis fallback for shankh
function playSynthesizedShankh(volume: number): void {
  try {
    const ctx = getWebAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(Math.min(1.0, Math.max(0.1, volume)), now);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';

    // Conch blowing pitch contour
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(330, now + 0.3);
    osc.frequency.setValueAtTime(330, now + 1.2);
    osc.frequency.linearRampToValueAtTime(220, now + 2.0);

    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.4, now + 0.2);
    oscGain.gain.setValueAtTime(0.4, now + 1.2);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 2.0);
  } catch {
    // Non-blocking fallback
  }
}

let bellAudioEl: HTMLAudioElement | null = null;
let shankhAudioEl: HTMLAudioElement | null = null;

/**
 * Plays the authentic temple brass bell chime at maximum clarity and richness (default volume: 1.0).
 */
export async function playTempleBell(volume: number = 1.0): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    if (!bellAudioEl) {
      bellAudioEl = new Audio('/audio/temple_bell.wav');
    }
    bellAudioEl.volume = Math.min(1.0, Math.max(0.0, volume));
    bellAudioEl.currentTime = 0;
    const playPromise = bellAudioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to synthesized bell if audio file autoplay was blocked
        playSynthesizedBell(volume);
      });
    }
  } catch {
    playSynthesizedBell(volume);
  }
}

/**
 * Plays the sacred Conch / Shankh Naad sound (default volume: 1.0).
 */
export async function playShankhNaad(volume: number = 1.0): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    if (!shankhAudioEl) {
      shankhAudioEl = new Audio('/audio/shankh_naad.wav');
    }
    shankhAudioEl.volume = Math.min(1.0, Math.max(0.0, volume));
    shankhAudioEl.currentTime = 0;
    const playPromise = shankhAudioEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        playSynthesizedShankh(volume);
      });
    }
  } catch {
    playSynthesizedShankh(volume);
  }
}

/**
 * Tactile vibration feedback for web browsers (if supported)
 */
export async function triggerHaptic(
  type: 'tap' | 'success' | 'warning' | 'error' = 'tap',
  enabled: boolean = true
): Promise<void> {
  if (!enabled || typeof window === 'undefined') return;
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && navigator.vibrate) {
      switch (type) {
        case 'tap':
          navigator.vibrate(30);
          break;
        case 'success':
          navigator.vibrate([40, 50, 40]);
          break;
        case 'warning':
          navigator.vibrate([60, 60, 60]);
          break;
        case 'error':
          navigator.vibrate([80, 50, 80]);
          break;
      }
    }
  } catch {
    // Non-blocking fallback
  }
}
