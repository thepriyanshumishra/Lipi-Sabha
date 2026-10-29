// Lipi Sabha Audio Engine
// Provides zero-dependency native browser pronunciation via Web Speech API
// and pleasant acoustic chime synthesis via Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Pronounces a character, word, or phoneme using the browser SpeechSynthesis API.
 */
export function playPronunciation(text: string, lang = 'hi-IN') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    playAcousticChime(440);
    return;
  }

  // Cancel any currently speaking audio
  window.speechSynthesis.cancel();

  const cleanText = text.trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set appropriate language and pitch
  utterance.lang = lang;
  utterance.rate = 0.85; // slightly slower for clear educational phonetics
  utterance.pitch = 1.0;

  // Attempt to select an authentic native voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Synthesizes a resonant harmonic acoustic bell/singing bowl chime for learning feedback.
 */
export function playAcousticChime(frequency = 528, duration = 0.6) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    // Warm natural harmonic decay
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {
    // Graceful fallback
  }
}

/**
 * Plays a gratifying 2-tone melodic success chime on correct quiz answer or node bloom.
 */
export function playSuccessChime() {
  playAcousticChime(523.25, 0.4); // C5
  setTimeout(() => {
    playAcousticChime(659.25, 0.6); // E5
  }, 120);
}
