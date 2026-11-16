/**
 * Audio synthesis for kana pronunciation and feedback sound effects.
 * Uses Web Speech API for native Japanese pronunciation and Web Audio API for feedback chimes.
 */

// Web Audio API context for feedback sound effects
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a short, pleasant chime for correct answers
 */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Two-tone rising chime (E5 -> B5)
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (err) {
    // Audio might be blocked by browser policy until user gesture
  }
}

/**
 * Play a subtle soft thud for incorrect answers
 */
export function playWrongSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // Downward pitch (220Hz -> 110Hz)
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  } catch (err) {
    // Audio might be blocked
  }
}

/**
 * Pronounce kana character using Japanese speech synthesis
 * @param {string} kana
 */
export function speakKana(kana) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending utterances
    const utterance = new SpeechSynthesisUtterance(kana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.volume = 0.8;

    // Try to select a Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis failed:', err);
  }
}
