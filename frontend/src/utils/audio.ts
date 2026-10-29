// Lipi Sabha Audio Engine
// Provides zero-dependency native browser pronunciation via Web Speech API
// with comprehensive phonetic transliteration for ancient scripts (Brahmi, Modi, Sharada, Grantha, IAST)
// and rich harmonic acoustic synthesizer fallbacks via Web Audio API.

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
 * Phonetic transliteration map for ancient / extended scripts
 * Browsers do not have TTS voices for SMP Unicode blocks (Brahmi, Modi, Sharada, Grantha).
 * We map them to speakable phonetic forms so browser SpeechSynthesis reliably speaks them.
 */
const SCRIPT_PHONETIC_MAP: Record<string, string> = {
  // Brahmi (U+11000 - U+1107F)
  '𑀮': 'ल',
  '𑀓': 'क',
  '𑀆': 'आ',
  '𑀥': 'ध',
  '𑀫': 'म',
  '𑀤': 'द',
  '𑀤𑁂𑀯𑀸𑀦𑀁': 'देवानां',
  '𑀧𑀺𑀬𑁂𑀦': 'पियेन',
  '𑀧𑀺𑀬𑀤𑀲𑀺': 'पियदसि',
  '𑀮𑀸𑀚𑀺𑀦𑀸': 'लाजिना',
  '𑀥𑀫': 'धम्म',
  '𑀤𑁂𑀯': 'देव',
  '𑀅𑀲𑁄𑀓': 'अशोक',
  '𑀮𑀺𑀧𑀺': 'लिपि',

  // Modi (U+11600 - U+1165F)
  '𑘩': 'ल',
  '𑘁': 'आ',
  '𑘎': 'क',
  '𑘨': 'र',
  '𑘨𑘰𑘕𑘹': 'राजे',
  '𑘢𑘝𑘿𑘨': 'पत्र',
  '𑘭𑘿𑘪𑘨𑘰𑘕𑘿𑘧': 'स्वराज्य',
  '𑘮𑘰': 'हा',
  '𑘦𑘰𑘛𑘰': 'माझा',
  '𑘕𑘡𑘿𑘦𑘭𑘲𑘟𑘿𑘠': 'जन्मसिद्ध',
  '𑘮𑘎𑘿𑘎': 'हक्क',
  '𑘁𑘮𑘹': 'आहे',
  '𑘫𑘿𑘨𑘲𑘦𑘽𑘝': 'श्रीमंत',
  '𑘕𑘡𑘝𑘰': 'जनता',
  '𑘨𑘰𑘕𑘰': 'राजा',
  '𑘔𑘝𑘿𑘨𑘢𑘝𑘲': 'छत्रपती',
  '𑘫𑘲𑘪𑘰𑘕𑘲': 'शिवाजी',
  '𑘦𑘮𑘰𑘨𑘰𑘕': 'महाराज',

  // Sharada (U+11180 - U+111DF)
  '𑆬': 'ल',
  '𑆄': 'आ',
  '𑆑': 'क',
  '𑆯': 'श',
  '𑆯𑆳𑆫𑆢𑆳': 'शारदा',
  '𑆥𑆵𑆜': 'पीठ',
  '𑆑𑆳𑆯𑇀𑆩𑆵𑆫': 'काश्मीर',
  '𑆤𑆩𑆱𑇀𑆠𑁂': 'नमस्ते',
  '𑆯𑆳𑆫𑆢𑁂': 'शारदे',
  '𑆢𑁂𑆮𑆴': 'देवि',
  '𑆑𑆳𑆯𑇀𑆩𑆵𑆫𑆥𑆶𑆫𑆮𑆳𑆱𑆴𑆤𑆴': 'काश्मीरपुरवासिनि',

  // Grantha (U+11300 - U+1137F)
  '𑌲': 'ल',
  '𑌆': 'आ',
  '𑌕': 'क',
  '𑌮': 'म',
  '𑌵𑍇𑌦': 'वेद',
  '𑌧𑌰𑍍𑌮': 'धर्म',
  '𑌓𑌁': 'ॐ',
  '𑌨𑌮𑌃': 'नमः',
  '𑌶𑌿𑌵𑌾𑌯': 'शिवाय',
  '𑌨𑌮𑍋': 'नमो',
  '𑌭𑌗𑌵𑌤𑍇': 'भगवते',
  '𑌵𑌾𑌸𑍁𑌦𑍇𑌵𑌾𑌯': 'वासुदेवाय',

  // IAST Diacritics to speakable phonetic words
  'tāla': 'ताला',
  'tala': 'तल',
  'tālā': 'ताला',
  'talā': 'तला',
  'sarve': 'सर्वे',
  'bhavantu': 'भवन्तु',
  'sukhinaḥ': 'सुखिनः',
  'santu': 'सन्तु',
  'nirāmayāḥ': 'निरामयाः',
  'satyam': 'सत्यम्',
  'tālam': 'तालम्'
};

function transliterateForSpeech(input: string): { speakable: string; lang: string } {
  let text = input.trim();

  // 1. Direct whole-phrase lookup
  if (SCRIPT_PHONETIC_MAP[text]) {
    return { speakable: SCRIPT_PHONETIC_MAP[text], lang: 'hi-IN' };
  }

  // 2. Word-by-word substitution
  const words = text.split(/\s+/);
  const replacedWords = words.map((w) => SCRIPT_PHONETIC_MAP[w] || w);
  let result = replacedWords.join(' ');

  // 3. Substring character replacement for unmapped tokens in ancient scripts
  for (const [key, val] of Object.entries(SCRIPT_PHONETIC_MAP)) {
    if (result.includes(key)) {
      result = result.split(key).join(val);
    }
  }

  // 4. Roman IAST cleanup if still in Latin with macrons
  const hasLatinDiacritics = /[āēīōūṛṣśñṭḍṇ]/i.test(result);
  if (hasLatinDiacritics) {
    result = result
      .replace(/ā/g, 'aa')
      .replace(/ī/g, 'ee')
      .replace(/ū/g, 'oo')
      .replace(/ē/g, 'ay')
      .replace(/ō/g, 'oh')
      .replace(/ṛ/g, 'ri')
      .replace(/ś/g, 'sh')
      .replace(/ṣ/g, 'sh')
      .replace(/ñ/g, 'ny')
      .replace(/ṭ/g, 't')
      .replace(/ḍ/g, 'd')
      .replace(/ṇ/g, 'n');
    return { speakable: result, lang: 'en-US' };
  }

  // If result has Devanagari characters, use 'hi-IN'
  const hasDevanagari = /[\u0900-\u097F]/.test(result);
  return { speakable: result, lang: hasDevanagari ? 'hi-IN' : 'en-US' };
}

// Cached voices for instant zero-delay speech
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Pronounces a character, word, or phoneme using the browser SpeechSynthesis API.
 * Optimized for instant zero-delay response and clear pronunciation.
 */
export function playPronunciation(text: string, defaultLang = 'hi-IN') {
  if (!text || !text.trim()) {
    playAcousticChime(440, 0.15);
    return;
  }

  // Play a quick subtle harmonic tick immediately so user has 0ms audio feedback
  playAcousticChime(580, 0.12);

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    const synth = window.speechSynthesis;
    // Resume in case browser suspended speech engine
    if (synth.paused) {
      synth.resume();
    }
    // Only cancel if already busy speaking
    if (synth.speaking) {
      synth.cancel();
    }

    const { speakable, lang } = transliterateForSpeech(text);
    const targetLang = lang || defaultLang;

    const utterance = new SpeechSynthesisUtterance(speakable);
    utterance.lang = targetLang;
    utterance.rate = 1.05; // natural, responsive pacing
    utterance.pitch = 1.0;

    const voices = cachedVoices.length > 0 ? cachedVoices : synth.getVoices();
    if (voices && voices.length > 0) {
      const targetPrefix = targetLang.slice(0, 2).toLowerCase();
      const match =
        voices.find((v) => v.lang.toLowerCase().startsWith(targetPrefix)) ||
        voices.find((v) => v.lang.toLowerCase().includes('in') || v.lang.toLowerCase().includes('hi')) ||
        voices[0];
      if (match) {
        utterance.voice = match;
      }
    }

    utterance.onerror = () => {
      playAcousticChime(432, 0.3);
    };

    synth.speak(utterance);
  } catch (err) {
    playAcousticChime(432, 0.3);
  }
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
  playAcousticChime(523.25, 0.35); // C5
  setTimeout(() => {
    playAcousticChime(659.25, 0.55); // E5
  }, 100);
}
