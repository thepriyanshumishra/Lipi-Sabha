/* ==========================================================================
   Lipi Sabha — Comprehensive Multi-Script (Lipi) Knowledge & Specimen Data
   Enables deep exploration of Devanagari, Brahmi, Modi, Sharada, Grantha,
   Bengali, Tibetan, and IAST Roman Transliteration.
   ========================================================================== */

export interface LipiGardenLetter {
  char: string;
  name: string;
  ipa: string;
  meaning: string;
  audioText: string;
  lang: string;
}

export interface LipiKnowledgeNode {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  glyph: string;
  scriptName: string;
  themeColor: string;
  badgeLabel: string;
  lang: string;
  spokenForm: string;
  learnTitle: string;
  learnExplanation: string;
  culturalNote: string;
  sampleWords: { char: string; ipa: string; gloss: string }[];
  quizQuestion: string;
  quizOptions: { text: string; subtext: string; isCorrect: boolean }[];
  quizExplanation: string;
  deepTitle: string;
  deepLore: string;
  dialectInsight: string;
  dialectSample: { label: string; text: string; lang: string };
  communityRule: string;
}

export interface LipiLabData {
  sampleText: string;
  sampleDescription: string;
  rulesPassed: number;
  comparisonPairs: {
    charActive: string;
    charCompare: string;
    compareScript: string;
    phoneme: string;
    insight: string;
  }[];
  decipherChallenges: {
    id: string;
    glyph: string;
    name: string;
    hint: string;
    solution: string;
    phoneticIpa: string;
    historicalContext: string;
  }[];
  validationRulebook: {
    title: string;
    description: string;
    status: 'Verified Standard' | 'Orthographic Proposal' | 'Historical Practice';
  }[];
}

export interface LipiDefinition {
  id: string;
  nameNative: string;
  nameEnglish: string;
  symbol: string;
  era: string;
  region: string;
  family: string;
  badgeColor: string;
  themeColor: string;
  tagline: string;
  overview: string;
  gardenLetters: LipiGardenLetter[];
  knowledgeNodes: LipiKnowledgeNode[];
  labData: LipiLabData;
}

export const SUPPORTED_LIPIS: LipiDefinition[] = [
  // 1. DEVANAGARI (देवनागरी)
  {
    id: 'devanagari',
    nameNative: 'देवनागरी',
    nameEnglish: 'Devanagari',
    symbol: 'ल',
    era: '7th c. CE – Present',
    region: 'North, Central & Western India, Nepal',
    family: 'Brahmic Abugida',
    badgeColor: '#B45309',
    themeColor: '#B45309',
    tagline: 'The Sacred City-Script of Phonetic Rigor',
    overview:
      'Devanagari (from "Deva" divine, and "Nagari" urban/civic) is a sound-first abugida organized strictly by physiological vocal articulation. Characterized by its unbroken top hanging bar (shirorekha), it serves as the vehicle for classical Sanskrit, Hindi, Marathi, Nepali, and dozens of living Indian languages.',
    gardenLetters: [
      {
        char: 'ल',
        name: 'La (लकार)',
        ipa: '/lɐ/',
        meaning: 'Represents "Lipi" (script/writing). Inherent vowel /a/ resonates through dental contact.',
        audioText: 'ल',
        lang: 'hi-IN'
      },
      {
        char: 'आ',
        name: 'Dirgha Aa (आ)',
        ipa: '/aː/',
        meaning: 'Open deep throat unrounded vowel. The foundation of full breath vocalization.',
        audioText: 'आ',
        lang: 'hi-IN'
      },
      {
        char: 'क्ष',
        name: 'Ksha (संयुक्त वर्ण)',
        ipa: '/kʂɐ/',
        meaning: 'Sacred conjunct ligature forged from velar stop Ka (क) and retroflex sibilant Ssa (ष).',
        audioText: 'क्ष',
        lang: 'hi-IN'
      },
      {
        char: 'ॐ',
        name: 'Pranava Om (ॐ)',
        ipa: '/oːm/',
        meaning: 'The primordial sonic vibration uniting A-U-M from belly to crown in Sanskrit orthography.',
        audioText: 'ॐ',
        lang: 'hi-IN'
      }
    ],
    knowledgeNodes: [
      {
        id: 'deva-1',
        level: 1,
        title: 'Root & Lineage: The Shirorekha & Phonetic Matrix',
        subtitle: 'How ancient sound-first writing systems organize human speech by vocal points.',
        glyph: 'ल',
        scriptName: 'Devanagari (South Asian Tradition)',
        themeColor: '#B45309',
        badgeLabel: 'Acoustic Foundation',
        lang: 'hi-IN',
        spokenForm: 'ल',
        learnTitle: 'The 3D Anatomy of "ल" (Lipi / Script)',
        learnExplanation:
          'In Devanagari, every consonant carries an inherent vowel /a/. The continuous horizontal hanging bar (shirorekha) physically links syllables into unified words, echoing unbroken breath flow.',
        culturalNote:
          'Devanagari is an abugida descended from ancient Brahmi. Letters are arranged strictly by place of vocal articulation: Guttural (क-वर्ग), Palatal (च-वर्ग), Retroflex (ट-वर्ग), Dental (त-वर्ग), Labial (प-वर्ग).',
        sampleWords: [
          { char: 'ल', ipa: '/lɐ/', gloss: 'Base letter La with inherent vowel' },
          { char: 'लि', ipa: '/lɪ/', gloss: 'Short vowel -i matra attached left' },
          { char: 'ली', ipa: '/liː/', gloss: 'Long vowel -ī matra attached right' },
          { char: 'ल्प', ipa: '/lpɐ/', gloss: 'Half-letter conjunct ligature' }
        ],
        quizQuestion: 'In Devanagari, what happens to the vowel sound when you write the bare consonant "ल" without extra marks?',
        quizOptions: [
          { text: 'It has an inherent short "a" vowel sound (/lɐ/)', subtext: 'Standard abugida characteristic', isCorrect: true },
          { text: 'It is a pure silent consonant with zero vowel', subtext: 'Requires halant mark (्)', isCorrect: false },
          { text: 'It represents a long "ā" vowel sound', subtext: 'Requires aa matra (ा)', isCorrect: false }
        ],
        quizExplanation:
          'Correct! As an abugida, every base consonant carries an inherent vowel /a/. To cancel it, a halant (्) is attached.',
        deepTitle: 'Sovereign Community Rationale',
        deepLore:
          'When digitizing classical scripts, early ASCII computers struggled with conjunct stacking. Rather than discarding classical ligatures, language communities demanded smart font rendering engines (OpenType Uniscribe/HarfBuzz) that preserve orthographic dignity.',
        dialectInsight: 'Regional pronunciation varies from dental /l/ to retroflex flap /ɭ/ across Marathi, Hindi, and Rajasthani dialects.',
        dialectSample: { label: 'Listen to Regional Flap Variant', text: 'ळ', lang: 'mr-IN' },
        communityRule: 'Orthography Rule #1: Inherent vowels must be preserved in base orthography models.'
      },
      {
        id: 'deva-2',
        level: 2,
        title: 'Matras & Diacritics: The Sacred Vowel Modifiers',
        subtitle: 'How independent vowels transform into elegant attached strokes (Matras).',
        glyph: 'ा',
        scriptName: 'Devanagari Matra System',
        themeColor: '#C2410C',
        badgeLabel: 'Orthographic Harmony',
        lang: 'hi-IN',
        spokenForm: 'तारा',
        learnTitle: 'Independent Vowels vs Bound Matras',
        learnExplanation:
          'Independent vowels (अ, आ, इ, ई) appear at the beginning of words. When attaching to consonants, they condense into orbital matras positioned top (े), bottom (ु), left (ि), or right (ी).',
        culturalNote:
          'The short "i" matra (ि) is historically unique: it is drawn before the consonant on paper, yet acoustic pronunciation occurs strictly after the consonant.',
        sampleWords: [
          { char: 'त', ipa: '/t̪ɐ/', gloss: 'Base Ta' },
          { char: 'ता', ipa: '/t̪aː/', gloss: 'Ta + Aa Matra' },
          { char: 'तारा', ipa: '/t̪aːɾaː/', gloss: 'Star / Celestial body' }
        ],
        quizQuestion: 'Where is the Devanagari short "i" matra (ि) written relative to its base consonant?',
        quizOptions: [
          { text: 'To the left (before the consonant visually)', subtext: 'Drawn left, pronounced after', isCorrect: true },
          { text: 'To the right (after the consonant visually)', subtext: 'That is the long "ī" matra (ी)', isCorrect: false },
          { text: 'Directly on the shirorekha bar', subtext: 'That is the e matra (े)', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The short "i" matra wraps around the left side of the consonant glyph while being sounded phonetically after it.',
        deepTitle: 'Calligraphic Balance',
        deepLore:
          'In palm-leaf and handmade paper manuscripts, scribes tuned the curve of the top-hanging matras to ensure ink would not smudge into the upper line of Vedic verses.',
        dialectInsight: 'Braj Bhasha and Awadhi poetry heavily utilize rhythmic vowel elongation marked by avagraha (ऽ).',
        dialectSample: { label: 'Listen to Avagraha Elongation', text: 'रामऽऽ', lang: 'hi-IN' },
        communityRule: 'Orthography Rule #2: Matra positioning must adhere strictly to Unicode normalization forms NFC.'
      },
      {
        id: 'deva-3',
        level: 3,
        title: 'The Conjunct Forge: Half-Letters & Sacred Stackings',
        subtitle: 'Balancing complex sacred ligatures against smartphone keypad ergonomics.',
        glyph: 'क्ष',
        scriptName: 'Devanagari Samyuktakshara (संयुक्त वर्ण)',
        themeColor: '#15803D',
        badgeLabel: 'Scribal Mastery',
        lang: 'hi-IN',
        spokenForm: 'क्ष',
        learnTitle: 'When Two Consonants Merge into One Form',
        learnExplanation:
          'When two consonants sound consecutively without an intervening vowel (like "k" + "ṣ"), traditional scribes forged a single ligature (क्ष). In digital input, this is handled through zero-width joiners and virama rules.',
        culturalNote:
          'Classical Gita manuscripts feature intricate stacked conjuncts (such as द्ध, द्व, ङ्क) that economize page space and reflect sacred calligraphy. Modern mobile keyboards sometimes offer a linear fallback to assist quick typing.',
        sampleWords: [
          { char: 'क्ष', ipa: '/kʂɐ/', gloss: 'Ligature conjunct of Ka + Ssa' },
          { char: 'ज्ञ', ipa: '/dʑɲɐ/ or /ɡjɐ/', gloss: 'Ligature conjunct of Ja + Nya' },
          { char: 'त्र', ipa: '/t̪ɾɐ/', gloss: 'Ligature conjunct of Ta + Ra' }
        ],
        quizQuestion: 'What linguistic role does the virama (halant "्") perform in forging a conjunct?',
        quizOptions: [
          { text: 'It strips away the inherent vowel /a/ of the preceding consonant', subtext: 'Enabling seamless phonetic blending', isCorrect: true },
          { text: 'It forces a full pause and silent breath', subtext: 'Incorrect; that is a danda', isCorrect: false },
          { text: 'It doubles the pitch accent', subtext: 'Incorrect; pitch is denoted by svara marks', isCorrect: false }
        ],
        quizExplanation:
          'Bravo! The halant cancels the inherent vowel, telling the rendering shaper engine to forge a half-letter or conjunct ligature.',
        deepTitle: 'Living Scribes vs Digital Keyboards',
        deepLore:
          'In early Indian computing, vendors attempted to reduce Devanagari by eliminating ligatures into broken ASCII characters. The community rejected this degradation, leading to modern Unicode Indic shapers.',
        dialectInsight: 'In Maharashtra, "ज्ञ" is pronounced /d̪ɲjə/ (Dnya), whereas in Uttar Pradesh and Bihar it is pronounced /ɡjə/ (Gya).',
        dialectSample: { label: 'Listen to Conjunct Dnya vs Gya', text: 'ज्ञान', lang: 'hi-IN' },
        communityRule: 'Orthography Rule #3: Sacred conjunct shapes must not be decomposed into broken fragments.'
      },
      {
        id: 'deva-4',
        level: 4,
        title: 'Sovereign Sabha: Democratic Orthography Governance',
        subtitle: 'The golden principle: Communities are decision-makers, not just passive data.',
        glyph: '⚖️',
        scriptName: 'Community Sabha Governance Protocol',
        themeColor: '#B45309',
        badgeLabel: 'Democratic Stewardship',
        lang: 'hi-IN',
        spokenForm: 'सत्यमेव जयते',
        learnTitle: 'How Writing Communities Decide Their Future',
        learnExplanation:
          'Writing systems are living social contracts. Whenever spelling conventions, digital keyboard layouts, or standardized transliterations are debated, decisions must rest on collective consensus.',
        culturalNote:
          'The historical "Nari Lipi" and "Devanagari Reform Committees" of 1953 engaged linguists, typesetters, and poets to ensure that the script preserved its heritage while functioning smoothly on linotype presses and modern screens.',
        sampleWords: [
          { char: 'सभा', ipa: '/sɐbʱaː/', gloss: 'Sovereign Deliberative Assembly' },
          { char: 'न्याय', ipa: '/njaːjɐ/', gloss: 'Fair transparent adjudication' },
          { char: 'प्रमाण', ipa: '/pɾɐmaːɳɐ/', gloss: 'Verified evidence & proof' }
        ],
        quizQuestion: 'In Lipi Sabha governance, who holds ultimate authority over orthographic modifications?',
        quizOptions: [
          { text: 'The community of native speakers and writers in open consultation', subtext: 'Community is the decision-maker, not just a dataset', isCorrect: true },
          { text: 'A single centralized tech corporation algorithm', subtext: 'Algorithms should serve, not dictate orthography', isCorrect: false },
          { text: 'Automated AI spellcheckers alone', subtext: 'AI lacks cultural context and speaker empathy', isCorrect: false }
        ],
        quizExplanation:
          'Exactly! "The community is the decision-maker, not just the dataset" is our supreme guiding principle.',
        deepTitle: 'Permanent Decision Records',
        deepLore:
          'Every decision in Lipi Sabha is immutably documented with rationale, counter-arguments, dialectal impact assessments, and public voting tallies.',
        dialectInsight: 'Minority dialect speakers retain full rights to record alternate orthographic variants alongside the primary standard.',
        dialectSample: { label: 'Hear Community Affirmation', text: 'सत्यमेव जयते', lang: 'hi-IN' },
        communityRule: 'Orthography Rule #4: All modifications require documented evidence and consensus verification.'
      }
    ],
    labData: {
      sampleText: 'धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ',
      sampleDescription: 'Sacred verse from the Mahabharata in classical Devanagari orthography.',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: 'ल',
          charCompare: '𑀮',
          compareScript: 'Brahmi',
          phoneme: '/lɐ/',
          insight: 'Direct lineal descendant: the Devanagari "ल" evolved directly from Ashokan Brahmi "𑀮".'
        },
        {
          charActive: 'क',
          charCompare: '𑘎',
          compareScript: 'Modi',
          phoneme: '/kɐ/',
          insight: 'Devanagari cross-arm softened into cursive unbroken loop in Modi scribal hand.'
        },
        {
          charActive: 'ा',
          charCompare: 'ā',
          compareScript: 'IAST Roman',
          phoneme: '/aː/',
          insight: 'Right-side vertical kana bar corresponds 1:1 with Latin macron line (ā).'
        }
      ],
      decipherChallenges: [
        {
          id: 'deva-c1',
          glyph: 'ज्ञान',
          name: 'Gyaan (Wisdom / Knowledge)',
          hint: 'Conjunct of Ja + Nya + Aa Matra + Na.',
          solution: 'ज्ञान',
          phoneticIpa: '/dʑɲaːnɐ/ or /ɡjaːn/',
          historicalContext: 'Foundational concept in Upanishadic and Buddhist dialectics.'
        },
        {
          id: 'deva-c2',
          glyph: 'शान्ति',
          name: 'Shanti (Peace / Equanimity)',
          hint: 'Palatal Sha + Long Aa + Conjunct of Na-Ta + Short I.',
          solution: 'शान्ति',
          phoneticIpa: '/ʃaːn̪t̪ɪ/',
          historicalContext: 'Traditional threefold benediction closing sacred recitations.'
        }
      ],
      validationRulebook: [
        {
          title: 'Shirorekha Continuity',
          description: 'Words must maintain unbroken top bar except over broken letters like ध, भ, झ.',
          status: 'Verified Standard'
        },
        {
          title: 'Anusvara vs Pancham Varna',
          description: 'Nasal consonants preceding homorganic stops can be written as bindu (ं) or conjunct.',
          status: 'Verified Standard'
        },
        {
          title: 'Halant Orthographic Rigor',
          description: 'Explicit halant must be preserved in word-final Sanskrit sandhi positions.',
          status: 'Verified Standard'
        }
      ]
    }
  },

  // 2. BRAHMI (ब्राह्मी)
  {
    id: 'brahmi',
    nameNative: 'ब्राह्मी',
    nameEnglish: 'Ashokan Brahmi',
    symbol: '𑀮',
    era: '4th c. BCE – 4th c. CE',
    region: 'Pan-Indian Subcontinent, Central Asia & Sri Lanka',
    family: 'Ancestral Brahmic Syllabary',
    badgeColor: '#92400E',
    themeColor: '#92400E',
    tagline: 'The Mother of All Asian Indic Scripts',
    overview:
      'Ashokan Brahmi is the monumental mother script from which almost every writing system in South, Southeast, and Central Asia descends (including Devanagari, Bengali, Tamil, Tibetan, Thai, and Javanese). Engraved in the stone edicts of Emperor Ashoka (c. 260 BCE), it is prized for pure geometric symmetry, lack of a hanging bar, and acoustic precision.',
    gardenLetters: [
      {
        char: '𑀮',
        name: 'Brahmi La (𑀮)',
        ipa: '/lɐ/',
        meaning: 'Ancient Brahmi letter La: a graceful vertical stem with a rounded left base scoop.',
        audioText: 'La',
        lang: 'hi-IN'
      },
      {
        char: '𑀆',
        name: 'Brahmi Aa (𑀆)',
        ipa: '/aː/',
        meaning: 'Independent long vowel Aa, carved with dual balance arms in stone edicts.',
        audioText: 'Aa',
        lang: 'hi-IN'
      },
      {
        char: '𑀓',
        name: 'Brahmi Ka (𑀓)',
        ipa: '/kɐ/',
        meaning: 'The famous Brahmi Cross "+" representing the root voiceless velar stop.',
        audioText: 'Ka',
        lang: 'hi-IN'
      },
      {
        char: '𑀥',
        name: 'Brahmi Dha (𑀥)',
        ipa: '/dʱɐ/',
        meaning: 'The letter Dha from "Dhamma" (Dharma / Cosmic Natural Order) on Ashoka’s Pillars.',
        audioText: 'Dharma',
        lang: 'hi-IN'
      }
    ],
    knowledgeNodes: [
      {
        id: 'brahmi-1',
        level: 1,
        title: 'Monumental Geometry: The Edicts of Ashoka',
        subtitle: 'How 3rd-century BCE stone masons cut pure geometric shapes for public literacy.',
        glyph: '𑀮',
        scriptName: 'Ashokan Brahmi (Mauryan Court)',
        themeColor: '#92400E',
        badgeLabel: 'Imperial Inscriptions',
        lang: 'hi-IN',
        spokenForm: 'धम्म',
        learnTitle: 'The Pure Geometry of Brahmi "𑀮" and "+" (Ka)',
        learnExplanation:
          'Brahmi possesses no horizontal connecting bar (shirorekha). Each letter stands independently in crisp geometric symmetry: circles, crosses, vertical poles, and semi-circles.',
        culturalNote:
          'Deciphered by James Prinsep in 1837 through bilingual Indo-Greek coins, revealing the messages of peace, non-violence, and moral governance by Emperor Ashoka.',
        sampleWords: [
          { char: '𑀮', ipa: '/lɐ/', gloss: 'Base consonant La' },
          { char: '𑀓', ipa: '/kɐ/', gloss: 'Base consonant Ka (Cross shape)' },
          { char: '𑀥𑀫', ipa: '/dʱɐm.mɐ/', gloss: 'Dhamma (Moral law / Order)' },
          { char: '𑀤𑁂𑀯𑀸𑀦𑀁', ipa: '/d̪eːʋaːnɐ̃/', gloss: 'Devanam (Beloved of the Gods)' }
        ],
        quizQuestion: 'What distinctive visual characteristic sets Ashokan Brahmi apart from modern Devanagari?',
        quizOptions: [
          { text: 'It has no continuous horizontal top hanging bar (shirorekha)', subtext: 'Pure freestanding geometric glyphs', isCorrect: true },
          { text: 'It was written exclusively from right-to-left', subtext: 'That was Kharosthi; Brahmi is left-to-right', isCorrect: false },
          { text: 'It had zero consonants for dental sounds', subtext: 'Brahmi contains full dental and retroflex series', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Brahmi letters stand independently without a connecting top line, optimized for stone chisel engraving.',
        deepTitle: 'From Stone to Birch Bark',
        deepLore:
          'As scribes moved from chisel on sandstone to reed pens on palm leaves, the sharp right angles softened into rounded curves, giving birth to regional alphabets across Asia.',
        dialectInsight: 'Ashokan Prakrit variations show distinct phonetic shifts between Girnar (Western India) and Dhauli (Eastern Odisha).',
        dialectSample: { label: 'Listen to Prakrit Dhamma', text: 'धम्म', lang: 'hi-IN' },
        communityRule: 'Epigraphy Rule #1: Brahmi transcriptions must correlate faithfully with Prakrit phonological shifts.'
      },
      {
        id: 'brahmi-2',
        level: 2,
        title: 'Vowel Diacritics: The Tick Marks of Brahmi',
        subtitle: 'How ancient scribes attached small radiating ticks to alter vowel sounds.',
        glyph: '𑀸',
        scriptName: 'Brahmi Matra Accents',
        themeColor: '#78350F',
        badgeLabel: 'Epigraphic Precision',
        lang: 'hi-IN',
        spokenForm: 'राजा',
        learnTitle: 'Attaching Vowel Bars to Geometric Stems',
        learnExplanation:
          'In Brahmi, adding a short horizontal dash to the top right of a letter turns short /a/ into long /ā/. An upward vertical stroke represents /i/, and a downward curl indicates /u/.',
        culturalNote:
          'This intuitive system of directional vowel ticks became the architectural model for virtually all 200+ Asian scripts developed over the next 2,000 years.',
        sampleWords: [
          { char: '𑀓', ipa: '/kɐ/', gloss: 'Short Ka' },
          { char: '𑀓𑀸', ipa: '/kaː/', gloss: 'Long Kā with rightward tick' },
          { char: '𑀓𑀺', ipa: '/kɪ/', gloss: 'Ki with upward tick' }
        ],
        quizQuestion: 'In Ashokan Brahmi inscriptions, how was the long vowel "ā" indicated on the letter Ka (𑀓)?',
        quizOptions: [
          { text: 'By adding a short horizontal tick to the upper right arm', subtext: 'Produces 𑀓𑀸', isCorrect: true },
          { text: 'By drawing an entire second cross next to it', subtext: 'Doubling was not used in Brahmi epigraphy', isCorrect: false },
          { text: 'By circling the letter', subtext: 'Circles indicated independent vowels or punctuation', isCorrect: false }
        ],
        quizExplanation:
          'Spot on! A horizontal tick at the top-right marked the lengthened /ā/ vowel.',
        deepTitle: 'Pillar Inscriptions at Sarnath',
        deepLore:
          'The polished Chunar sandstone pillars of Sarnath and Sanchi show that Ashokan stone cutters possessed standardized type-gauges for consistent tick measurements.',
        dialectInsight: 'Magadhi Prakrit inscriptions substitute dental /r/ with /l/ reflecting eastern vernacular habits.',
        dialectSample: { label: 'Hear Ashokan Formula', text: 'देवानांपिय पियदसि लाजा', lang: 'hi-IN' },
        communityRule: 'Epigraphy Rule #2: Diacritic tick orientation must be rigorously cataloged per inscription site.'
      },
      {
        id: 'brahmi-3',
        level: 3,
        title: 'Vertical Stacking: The Birth of Indic Conjuncts',
        subtitle: 'How Brahmi scribes stacked consonants vertically to form compound sounds.',
        glyph: '𑀓𑁆𑀮',
        scriptName: 'Brahmi Vertical Ligatures',
        themeColor: '#92400E',
        badgeLabel: 'Architectural Stacking',
        lang: 'hi-IN',
        spokenForm: 'क्ल',
        learnTitle: 'Top-to-Bottom Phonetic Flow',
        learnExplanation:
          'Unlike modern Roman orthography which writes consonant clusters horizontally side-by-side (like "str"), Brahmi scribes placed the first consonant on top and the second directly beneath it.',
        culturalNote:
          'This vertical stacking design preserves the intuitive idea that a single syllable represents a single unit of breath (akshara).',
        sampleWords: [
          { char: '𑀓𑁆𑀮', ipa: '/klɐ/', gloss: 'Ka + La stacked vertically' },
          { char: '𑀧𑁆𑀭', ipa: '/pɾɐ/', gloss: 'Pra with bottom-flowing Ra stroke' }
        ],
        quizQuestion: 'In Brahmi conjunct stacking, which sound is pronounced first?',
        quizOptions: [
          { text: 'The upper glyph on top is sounded first', subtext: 'Top-down reading order within the syllable', isCorrect: true },
          { text: 'The bottom glyph is sounded first', subtext: 'Top glyph is primary phoneme', isCorrect: false },
          { text: 'Both sounds are produced simultaneously as a click', subtext: 'Indic languages are non-click', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The top character is sounded first, followed immediately by the subjoined bottom character.',
        deepTitle: 'Evolutionary Tree Across Asia',
        deepLore:
          'As Brahmi spread along the maritime Silk Road and Indian Ocean trade routes, Mon, Khmer, Cham, and Kawi scripts directly adopted this vertical stacking paradigm.',
        dialectInsight: 'Southern Brahmi varieties (Bhattiprolu) introduced independent vowel cancellation systems earlier than northern variants.',
        dialectSample: { label: 'Listen to Stacked Syllable Pra', text: 'प्र', lang: 'hi-IN' },
        communityRule: 'Epigraphy Rule #3: Vertical stacking hierarchy must follow chronological epigraphical standards.'
      },
      {
        id: 'brahmi-4',
        level: 4,
        title: 'Decipherment & Legacy: Prinsep’s Breakthrough',
        subtitle: 'How a lost script was resurrected for modern humanity through community epigraphy.',
        glyph: '🏛️',
        scriptName: 'Epigraphical Decipherment Ethics',
        themeColor: '#78350F',
        badgeLabel: 'Cultural Heritage',
        lang: 'hi-IN',
        spokenForm: 'धम्मलिपि',
        learnTitle: 'Recovering Forgotten Inscriptions',
        learnExplanation:
          'By the 14th century CE, even royal courtiers in Delhi could no longer read the Ashokan pillar scripts. Its decipherment in the 19th century restored over a millennium of lost Indian history.',
        culturalNote:
          'The revival of Brahmi demonstrates why transparent, open-access documentation of ancient writing systems is vital for global cultural survival.',
        sampleWords: [
          { char: '𑀅𑀲𑁄𑀓', ipa: '/ɐsoːkɐ/', gloss: 'Ashoka (Free of Sorrow)' },
          { char: '𑀮𑀺𑀧𑀺', ipa: '/lɪpɪ/', gloss: 'Lipi (Script / Inscription)' }
        ],
        quizQuestion: 'In what century was the ancient Ashokan Brahmi script successfully deciphered in modern times?',
        quizOptions: [
          { text: '19th Century (1837 CE by James Prinsep)', subtext: 'Unlocking the inscriptions of Ashoka', isCorrect: true },
          { text: '12th Century during the Delhi Sultanate', subtext: 'Sultan Feroz Shah Tughlaq could not find readers', isCorrect: false },
          { text: '21st Century using modern AI neural networks', subtext: 'Decipherment was historical epigraphy', isCorrect: false }
        ],
        quizExplanation:
          'Correct! James Prinsep deciphered the script in 1837 by comparing recurring donor inscriptions at Sanchi.',
        deepTitle: 'Digital Unicode Preservation',
        deepLore:
          'Brahmi was formally encoded in Unicode Standard Version 6.0 in October 2010 (U+11000 to U+1107F), ensuring ancient inscriptions can be published natively on modern websites.',
        dialectInsight: 'Ashoka referred to his own inscriptions as "Dhammalipi" (Orthography of Righteous Living).',
        dialectSample: { label: 'Hear Dhammalipi Pronunciation', text: 'धम्म लिपि', lang: 'hi-IN' },
        communityRule: 'Epigraphy Rule #4: Epigraphical specimens must include photographic high-resolution provenance.'
      }
    ],
    labData: {
      sampleText: '𑀤𑁂𑀯𑀸𑀦𑀁𑀧𑀺𑀬𑁂𑀦 𑀧𑀺𑀬𑀤𑀲𑀺𑀦𑀸 𑀮𑀸𑀚𑀺𑀦𑀸',
      sampleDescription: 'Famous imperial opening: "King Priyadarsin, Beloved of the Gods, speaks thus..."',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: '𑀮',
          charCompare: 'ल',
          compareScript: 'Devanagari',
          phoneme: '/lɐ/',
          insight: 'The rounded base of Brahmi "𑀮" turned horizontally and gained a top shirorekha.'
        },
        {
          charActive: '𑀓',
          charCompare: 'क',
          compareScript: 'Devanagari',
          phoneme: '/kɐ/',
          insight: 'The pure "+" crossbar bowed and looped into the modern Devanagari "क".'
        },
        {
          charActive: '𑀥',
          charCompare: 'ध',
          compareScript: 'Devanagari',
          phoneme: '/dʱɐ/',
          insight: 'Brahmi "𑀥" (D-shape) opened at top and developed an open loop.'
        }
      ],
      decipherChallenges: [
        {
          id: 'brahmi-c1',
          glyph: '𑀥𑀫',
          name: 'Dhamma (Moral Order / Right Action)',
          hint: 'Consists of Brahmi Dha (𑀥) and Ma (𑀫).',
          solution: 'धम्म',
          phoneticIpa: '/dʱɐm.mɐ/',
          historicalContext: 'The core ethical philosophy carved across dozens of mountain rock faces.'
        },
        {
          id: 'brahmi-c2',
          glyph: '𑀤𑁂𑀯',
          name: 'Deva (Divine / Celestial)',
          hint: 'Da with upper left e-matra + Va.',
          solution: 'देव',
          phoneticIpa: '/d̪eːʋɐ/',
          historicalContext: 'Honorific title used in royal decrees across classical Asia.'
        }
      ],
      validationRulebook: [
        {
          title: 'Geometric Angularity Verification',
          description: 'Letters must exhibit clean Mauryan proportions without post-Gupta curved flourishes.',
          status: 'Verified Standard'
        },
        {
          title: 'Freestanding Syllables',
          description: 'Absence of shirorekha; each consonant unit must stand isolated with 1.2ex spacing.',
          status: 'Verified Standard'
        },
        {
          title: 'Diacritic Tick Placement',
          description: 'Vowel strokes must be positioned on upper quadrant terminals per standard epigraphy.',
          status: 'Verified Standard'
        }
      ]
    }
  },

  // 3. MODI LIPI (मोडी)
  {
    id: 'modi',
    nameNative: 'मोडी',
    nameEnglish: 'Modi Script',
    symbol: '𑘩',
    era: '12th – 20th c. CE',
    region: 'Maharashtra, Western & Southern India (Maratha Realm)',
    family: 'Cursive Brahmic Chancellery Hand',
    badgeColor: '#7C2D12',
    themeColor: '#7C2D12',
    tagline: 'The Cursive Administrative Hand of the Maratha Empire',
    overview:
      'Modi (from Marathi "Moḍaṇe", meaning to break or bend) is a rapid cursive script developed in the court of the Yadavas of Devagiri and popularized by Hemadri (Hemadpant) and Chhatrapati Shivaji Maharaj. It was engineered specifically so that scribes could write administrative decrees, revenue ledgers, and battlefield dispatches continuously without lifting the reed pen.',
    gardenLetters: [
      {
        char: '𑘩',
        name: 'Modi La (𑘩)',
        ipa: '/lɐ/',
        meaning: 'Modi letter La: formed with a rounded fluid loop that connects directly to preceding syllables.',
        audioText: 'ल',
        lang: 'mr-IN'
      },
      {
        char: '𑘁',
        name: 'Modi Aa (𑘁)',
        ipa: '/aː/',
        meaning: 'Independent vowel Aa with rapid single-stroke calligraphic flourish.',
        audioText: 'आ',
        lang: 'mr-IN'
      },
      {
        char: '𑘎',
        name: 'Modi Ka (𑘎)',
        ipa: '/kɐ/',
        meaning: 'Fluid circularized Ka designed for zero pen lifts on parchment and handmade paper.',
        audioText: 'क',
        lang: 'mr-IN'
      },
      {
        char: '𑘨',
        name: 'Modi Ra (𑘨)',
        ipa: '/ɾɐ/',
        meaning: 'Quick curved descendant stroke representing the agile Maratha scribal Ra.',
        audioText: 'र',
        lang: 'mr-IN'
      }
    ],
    knowledgeNodes: [
      {
        id: 'modi-1',
        level: 1,
        title: 'The Unbroken Quill: Cursive Speed in Royal Courts',
        subtitle: 'Why the Maratha administration engineered a script with zero pen-lifts.',
        glyph: '𑘩',
        scriptName: 'Modi Chancellery Hand',
        themeColor: '#7C2D12',
        badgeLabel: 'Court Administration',
        lang: 'mr-IN',
        spokenForm: 'मोडी',
        learnTitle: 'The Fluid Mechanics of Modi "𑘩"',
        learnExplanation:
          'In standard Devanagari, the pen must lift repeatedly to draw the horizontal bar, the vertical stem, and side loops. Modi "breaks" (moḍaṇe) the rigid angles into rounded continuous loops.',
        culturalNote:
          'Over five million Modi administrative documents (Bakhars, firmans, military orders) reside in Pune and Thanjavur archives, representing centuries of authentic Indian governance history.',
        sampleWords: [
          { char: '𑘩', ipa: '/lɐ/', gloss: 'Cursive La' },
          { char: '𑘎', ipa: '/kɐ/', gloss: 'Cursive Ka' },
          { char: '𑘨𑘰𑘕𑘹', ipa: '/ɾaːdʑeː/', gloss: 'Raje (King / Sovereign Sovereign)' },
          { char: '𑘢𑘝𑘿𑘨', ipa: '/pɐt̪ɾɐ/', gloss: 'Patra (Official Dispatch)' }
        ],
        quizQuestion: 'Why was Modi script designed with continuous loops and rounded shapes?',
        quizOptions: [
          { text: 'To allow court scribes to write rapid dispatches without lifting the reed pen', subtext: 'Maximizing writing speed and preserving paper', isCorrect: true },
          { text: 'To encrypt state secrets so common people could never read', subtext: 'Modi was the standard public administrative script', isCorrect: false },
          { text: 'Because stone carvers preferred circles over lines', subtext: 'Modi was written on paper, not carved on rocks', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The continuous cursive movement avoided paper splatters and let clerks record rapid eyewitness reports.',
        deepTitle: 'Archive Recovery in Pune',
        deepLore:
          'The Peshwa Daftar in Pune contains millions of uncataloged Modi manuscripts documenting diplomacy, naval trade with Portugal and Britain, tax receipts, and botanical medicines.',
        dialectInsight: 'Modi orthography incorporates Persian diplomatic loanwords seamlessly into Marathi grammar.',
        dialectSample: { label: 'Listen to Maratha Royal Title', text: 'छत्रपती शिवाजी महाराज', lang: 'mr-IN' },
        communityRule: 'Archival Rule #1: Modi transcriptions must verify ligature ligatures against Bakhar context.'
      },
      {
        id: 'modi-2',
        level: 2,
        title: 'Joined Shirorekha: The Thread of Words',
        subtitle: 'How Modi connects whole sentences along a single running horizontal horizon.',
        glyph: '𑘱',
        scriptName: 'Modi Running Bar Flow',
        themeColor: '#9A3412',
        badgeLabel: 'Cursive Velocity',
        lang: 'mr-IN',
        spokenForm: 'पत्र',
        learnTitle: 'A Single Continuous Thread of Thought',
        learnExplanation:
          'Unlike modern separated words, Modi scribes drew a continuous headstroke across multiple syllables, linking ideas together in unbroken flow.',
        culturalNote:
          'Modi remained the dominant business and chancellery script of Western India until the mid-20th century, when printing press typography favored standardized Devanagari fonts.',
        sampleWords: [
          { char: '𑘫𑘲𑘪', ipa: '/ʃiːʋɐ/', gloss: 'Shiva' },
          { char: '𑘎𑘰𑘨𑘥𑘰𑘨', ipa: '/kaːɾbʱaːɾ/', gloss: 'Governance / State business' }
        ],
        quizQuestion: 'In what century was Modi script actively replaced by Balbodh Devanagari in primary education?',
        quizOptions: [
          { text: 'Mid-20th Century (c. 1950s)', subtext: 'To standardize for mechanical printing and typewriters', isCorrect: true },
          { text: '16th Century during Mughal rule', subtext: 'Modi flourished under the Marathas in the 17th-18th c.', isCorrect: false },
          { text: '3rd Century BCE', subtext: 'That was the time of Brahmi', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The transition to Balbodh Devanagari occurred in the mid-20th century due to printing press requirements.',
        deepTitle: 'Thanjavur Maratha Heritage',
        deepLore:
          'In Tamil Nadu, the Saraswathi Mahal Library at Thanjavur preserves Modi manuscripts recording surgical operations, musical compositions, and state astronomy.',
        dialectInsight: 'Thanjavur Marathi features distinctive southern Dravidian phonetic borrowings written in Modi.',
        dialectSample: { label: 'Hear Court Salutation', text: 'कारभारी', lang: 'mr-IN' },
        communityRule: 'Archival Rule #2: Modi cursive abbreviations must be accompanied by expanded glosses.'
      },
      {
        id: 'modi-3',
        level: 3,
        title: 'Decipherment Training: Reading Historic Bakhar',
        subtitle: 'Step into the shoes of an archivist deciphering 300-year-old handmade paper.',
        glyph: '𑘎𑘿𑘬',
        scriptName: 'Modi Archival Decipherment',
        themeColor: '#7C2D12',
        badgeLabel: 'Archival Decipherment',
        lang: 'mr-IN',
        spokenForm: 'ज्ञान',
        learnTitle: 'Recognizing Modified Character Contours',
        learnExplanation:
          'Letters like Ba (𑘤) and Wa (𑘪) can appear very similar in rapid cursive hands. Archivists rely on sentence syntax and ink flow angles to verify authentic readings.',
        culturalNote:
          'Thousands of historic land deeds in Maharashtra require Modi literacy to verify community land rights and ancestral heritage.',
        sampleWords: [
          { char: '𑘭𑘿𑘪𑘨𑘰𑘕𑘿𑘧', ipa: '/sʋɐɾaːdʑjɐ/', gloss: 'Swarajya (Self-rule / Sovereign realm)' },
          { char: '𑘁𑘕𑘿𑘗𑘰', ipa: '/aːdʑɲaː/', gloss: 'Aadnya (Royal Decree)' }
        ],
        quizQuestion: 'What historic term describes the sovereign self-rule established in Modi court records?',
        quizOptions: [
          { text: 'स्वराज्य (Swarajya)', subtext: 'The foundational principle of Shivaji Maharaj', isCorrect: true },
          { text: 'साम्राज्य (Imperial Colony)', subtext: 'Swarajya is grounded in native self-determination', isCorrect: false },
          { text: 'सुलतानत (Sultanate)', subtext: 'Swarajya was the sovereign counter-movement', isCorrect: false }
        ],
        quizExplanation:
          'Correct! "Swarajya" was the cornerstone concept penned across thousands of Modi court records.',
        deepTitle: 'Modern Revitalization Movement',
        deepLore:
          'Today, universities in Pune, Mumbai, and Kolhapur run packed weekend workshops where young software engineers, historians, and lawyers learn to read Modi script.',
        dialectInsight: 'Old Marathi phonology preserved distinctive archaic sibilants documented in Modi documents.',
        dialectSample: { label: 'Hear Swarajya Pronunciation', text: 'स्वराज्य', lang: 'mr-IN' },
        communityRule: 'Archival Rule #3: Unclear scribal loops must be scored with calibrated uncertainty flags.'
      },
      {
        id: 'modi-4',
        level: 4,
        title: 'Digital Encoding: Bringing Modi into Unicode',
        subtitle: 'How modern type designers created native digital fonts for historic Modi script.',
        glyph: '🖋️',
        scriptName: 'Modi Unicode Infrastructure (U+11600)',
        themeColor: '#7C2D12',
        badgeLabel: 'Digital Typography',
        lang: 'mr-IN',
        spokenForm: 'मोडी लिपि',
        learnTitle: 'Preserving a Scribe Hand in Vector Bézier Curves',
        learnExplanation:
          'Modi was officially encoded in the Unicode Standard Version 7.0 in June 2014 (U+11600 to U+1165F). Digital fonts must simulate natural handwriting flow through contextual ligature lookups.',
        culturalNote:
          'Digitizing Modi allows millions of historical manuscripts to be OCR-scanned, cataloged, and made searchable for researchers worldwide.',
        sampleWords: [
          { char: '𑘦𑘻𑘚𑘲', ipa: '/moːɖiː/', gloss: 'Modi' },
          { char: '𑘩𑘲𑘢𑘲', ipa: '/liːpiː/', gloss: 'Lipi' }
        ],
        quizQuestion: 'In what Unicode version was the Modi script officially added to global computer standards?',
        quizOptions: [
          { text: 'Unicode 7.0 (2014 CE)', subtext: 'Block U+11600 to U+1165F', isCorrect: true },
          { text: 'Unicode 1.0 (1991 CE)', subtext: 'Initial Unicode only covered major living scripts', isCorrect: false },
          { text: 'It has not been encoded yet', subtext: 'Modi is fully standard in Unicode today', isCorrect: false }
        ],
        quizExplanation:
          'Bravo! Unicode 7.0 brought official global standardization to the Modi script.',
        deepTitle: 'OCR and Machine Learning on Manuscripts',
        deepLore:
          'Researchers at IIT Bombay have built transformer-based neural vision models trained on thousands of authentic Bakhar manuscripts to automatically transcribe Modi into Devanagari.',
        dialectInsight: 'Punctuation in historical Modi utilized ornate circular marks (𑘻) to signify paragraph conclusion.',
        dialectSample: { label: 'Listen to Modi Lipi Greeting', text: 'नमस्कार', lang: 'mr-IN' },
        communityRule: 'Archival Rule #4: Digital Modi fonts must maintain baseline flow without clipping ascender loops.'
      }
    ],
    labData: {
      sampleText: '𑘫𑘿𑘨𑘲𑘦𑘽𑘝 𑘕𑘡𑘝𑘰 𑘨𑘰𑘕𑘰 𑘔𑘝𑘿𑘨𑘢𑘝𑘲 𑘫𑘲𑘪𑘰𑘕𑘲 𑘦𑘮𑘰𑘨𑘰𑘕',
      sampleDescription: 'Archival Maratha court title written in native cursive Modi script.',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: '𑘩',
          charCompare: 'ल',
          compareScript: 'Devanagari',
          phoneme: '/lɐ/',
          insight: 'Modi "𑘩" continuous teardrop loop replaces the three-stroke Devanagari "ल".'
        },
        {
          charActive: '𑘎',
          charCompare: 'क',
          compareScript: 'Devanagari',
          phoneme: '/kɐ/',
          insight: 'The angular center loop of Devanagari "क" is softened for rapid script execution.'
        },
        {
          charActive: '𑘨',
          charCompare: 'र',
          compareScript: 'Devanagari',
          phoneme: '/ɾɐ/',
          insight: 'Modi Ra sweeps downward without a top-right corner pause.'
        }
      ],
      decipherChallenges: [
        {
          id: 'modi-c1',
          glyph: '𑘨𑘰𑘕𑘹',
          name: 'Raje (King / Prince)',
          hint: 'Modi Ra + Aa matra + Ja + E matra.',
          solution: 'राजे',
          phoneticIpa: '/ɾaːdʑeː/',
          historicalContext: 'Honorific royal address in Maratha diplomatic letters.'
        },
        {
          id: 'modi-c2',
          glyph: '𑘢𑘝𑘿𑘨',
          name: 'Patra (Official Dispatch)',
          hint: 'Consists of Pa + Ta-Ra conjunct.',
          solution: 'पत्र',
          phoneticIpa: '/pɐt̪ɾɐ/',
          historicalContext: 'Written communication sent between fort garrisons.'
        }
      ],
      validationRulebook: [
        {
          title: 'Cursive Stroke Continuity',
          description: 'Letters in a word must join smoothly along the continuous upper loop band.',
          status: 'Verified Standard'
        },
        {
          title: 'Loop Closure Integrity',
          description: 'Letters like Ba (𑘤) and Wa (𑘪) must maintain clear circular aperture distinctions.',
          status: 'Verified Standard'
        },
        {
          title: 'Diacritic Attachment Angle',
          description: 'Modi matras attach at dynamic 45-degree angles reflecting scribal pen inclination.',
          status: 'Verified Standard'
        }
      ]
    }
  },

  // 4. SHARADA (शारदा)
  {
    id: 'sharada',
    nameNative: 'शारदा',
    nameEnglish: 'Sharada Script',
    symbol: '𑆬',
    era: '8th – 15th c. CE',
    region: 'Kashmir, Ladakh, Himachal Pradesh & Northwestern Himalayas',
    family: 'Western Himalayan Brahmic Hand',
    badgeColor: '#1E3A8A',
    themeColor: '#1E3A8A',
    tagline: 'The Sacred Birch-Bark Script of Kashmir',
    overview:
      'Sharada is the classical manuscript script of Kashmir, revered as "Sharada Desha" (the Land of Goddess Sharada / Saraswati). Written with reed pens on tender birch-bark (bhurjapatra), Sharada preserved vast corpuses of Sanskrit literature, Kashmir Shaivism, mathematics (the Bakhshali Manuscript containing early Indian numerals and zero), and astronomical treatises.',
    gardenLetters: [
      {
        char: '𑆬',
        name: 'Sharada La (𑆬)',
        ipa: '/lɐ/',
        meaning: 'Sharada letter La: featuring sharp triangular head accents and fluid manuscript stems.',
        audioText: 'La',
        lang: 'hi-IN'
      },
      {
        char: '𑆄',
        name: 'Sharada Aa (𑆄)',
        ipa: '/aː/',
        meaning: 'Independent vowel Aa with classical Himalayan calligraphic apex.',
        audioText: 'Aa',
        lang: 'hi-IN'
      },
      {
        char: '𑆑',
        name: 'Sharada Ka (𑆑)',
        ipa: '/kɐ/',
        meaning: 'Pointed diamond head-mark Ka characteristic of birch-bark manuscript hands.',
        audioText: 'Ka',
        lang: 'hi-IN'
      },
      {
        char: '𑆯',
        name: 'Sharada Sha (𑆯)',
        ipa: '/ʃɐ/',
        meaning: 'The sacred Sha from Sharada (शारदा), representing learning and pristine wisdom.',
        audioText: 'Sha',
        lang: 'hi-IN'
      }
    ],
    knowledgeNodes: [
      {
        id: 'sharada-1',
        level: 1,
        title: 'Birch Bark Calligraphy: The Ink of Kashmir',
        subtitle: 'How Kashmiri scholars wrote on birch bark (bhurjapatra) with carbon ink.',
        glyph: '𑆬',
        scriptName: 'Sharada Birch Bark Tradition',
        themeColor: '#1E3A8A',
        badgeLabel: 'Himalayan Scholarship',
        lang: 'hi-IN',
        spokenForm: 'शारदा',
        learnTitle: 'The Anatomy of Sharada "𑆬" and Triangular Heads',
        learnExplanation:
          'Sharada letters feature distinctive top-hanging triangular wedges. Because birch bark had natural horizontal grain lines, scribes developed angular strokes to prevent ink from bleeding along the fibers.',
        culturalNote:
          'Kashmir was celebrated for over a millennium as the intellectual capital of Sanskrit philosophy, drawing scholars like Shankara, Abhinavagupta, and Kalhana.',
        sampleWords: [
          { char: '𑆬', ipa: '/lɐ/', gloss: 'Base La' },
          { char: '𑆑', ipa: '/kɐ/', gloss: 'Base Ka' },
          { char: '𑆯𑆳𑆫𑆢𑆳', ipa: '/ʃaːɾɐd̪aː/', gloss: 'Sharada (Seat of Wisdom)' }
        ],
        quizQuestion: 'On what natural Himalayan material were classic Sharada manuscripts primarily composed?',
        quizOptions: [
          { text: 'Birch bark sheets (Bhurjapatra) using lampblack carbon ink', subtext: 'Naturally resilient against mold and insect pests', isCorrect: true },
          { text: 'Imported European parchment vellum', subtext: 'Parchment made of animal skin was culturally shunned', isCorrect: false },
          { text: 'Clay tablets dried in ovens', subtext: 'That was ancient Mesopotamian cuneiform', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Birch bark (bhurjapatra) preserved with walnut oil kept manuscripts intact for over a thousand years.',
        deepTitle: 'The Bakhshali Manuscript & Zero',
        deepLore:
          'Written in early Sharada script around the 3rd to 8th century CE, the Bakhshali Manuscript contains the earliest recorded use of a dot placeholder representing zero as a distinct numeral.',
        dialectInsight: 'Kashmiri Sanskrit pronunciation developed distinct pitch accents recorded in Sharada svara marks.',
        dialectSample: { label: 'Listen to Sharada Invocation', text: 'नमस्ते शारदे देवि काश्मीरपुरवासिनि', lang: 'hi-IN' },
        communityRule: 'Manuscript Rule #1: Bhurjapatra ductus angles must be preserved in digital font rendering.'
      },
      {
        id: 'sharada-2',
        level: 2,
        title: 'Triangular Head-Marks: The Crown of Sharada',
        subtitle: 'The evolution from Gupta rounded loops to sharp northern apexes.',
        glyph: '𑆵',
        scriptName: 'Sharada Vowel Ornaments',
        themeColor: '#1E40AF',
        badgeLabel: 'Geometrical Elegance',
        lang: 'hi-IN',
        spokenForm: 'काश्मीर',
        learnTitle: 'Distinctive Apexes and Loop Dynamics',
        learnExplanation:
          'Unlike Devanagari straight bars, Sharada top strokes angle into acute triangular notches. This gave the entire page a crystalline, chiseled visual texture.',
        culturalNote:
          'Kalhana wrote his famous historical chronicle "Rajatarangini" (The River of Kings) in the 12th century using classical Sharada on birch bark.',
        sampleWords: [
          { char: '𑆑𑆳𑆯𑇀𑆩𑆵𑆫', ipa: '/kaːʃmiːɾɐ/', gloss: 'Kashmir' },
          { char: '𑆯𑆴𑆮', ipa: '/ʃɪʋɐ/', gloss: 'Shiva' }
        ],
        quizQuestion: 'Which famous historical chronicle of Indian kings was composed in Kashmir in Sharada script?',
        quizOptions: [
          { text: 'Rajatarangini (The River of Kings by Kalhana)', subtext: 'A foundational historic text of classical historiography', isCorrect: true },
          { text: 'The Iliad of Homer', subtext: 'Composed in ancient Greek', isCorrect: false },
          { text: 'Ain-i-Akbari', subtext: 'Composed in Persian during the Mughal empire', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Kalhana authored Rajatarangini in 1148-1150 CE in classical Sharada.',
        deepTitle: 'Preservation at Sharada Peeth',
        deepLore:
          'Sharada Peeth, situated on the banks of the Neelum River, housed an ancient university and scriptorium where manuscripts were checked against authoritative master copies.',
        dialectInsight: 'Kashmiri vowel inventory includes central unrounded vowels that required bespoke diacritic marks in Sharada.',
        dialectSample: { label: 'Hear Rajatarangini Verse', text: 'राजतरङ्गिणी', lang: 'hi-IN' },
        communityRule: 'Manuscript Rule #2: Vowel diacritic notches must not merge into base letter serifs.'
      },
      {
        id: 'sharada-3',
        level: 3,
        title: 'Himalayan Descendants: Gurmukhi and Takri',
        subtitle: 'How Sharada gave birth to the living scripts of the Punjab and Himachal hills.',
        glyph: '𑆘𑇀𑆚',
        scriptName: 'Sharada Evolutionary Family',
        themeColor: '#1E3A8A',
        badgeLabel: 'Script Kinship',
        lang: 'hi-IN',
        spokenForm: 'ज्ञान',
        learnTitle: 'The Branching Branches of the North',
        learnExplanation:
          'Sharada is the direct parent of Gurmukhi (used for Punjabi) and Takri (used across Jammu, Kangra, and Chamba). Many letter shapes in Punjabi directly mirror Sharada.',
        culturalNote:
          'Recognizing the genealogical kinship between Sharada, Gurmukhi, and Takri demonstrates the shared cultural matrix uniting the western Himalayas.',
        sampleWords: [
          { char: '𑆘𑇀𑆚', ipa: '/dʑɲɐ/', gloss: 'Sharada Jn conjunct' },
          { char: 'ੴ', ipa: '/ɪk oːəŋkaːɾ/', gloss: 'Gurmukhi Ik Onkar descendant' }
        ],
        quizQuestion: 'Which major living North Indian script descends directly from Sharada?',
        quizOptions: [
          { text: 'Gurmukhi (used to write Punjabi)', subtext: 'Developed from Sharada / Lande script lineage', isCorrect: true },
          { text: 'Tamil script', subtext: 'Tamil descends from Southern Brahmi and Grantha', isCorrect: false },
          { text: 'Malayalam script', subtext: 'Malayalam descends from Grantha', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Gurmukhi and Takri are direct descendants of Sharada.',
        deepTitle: 'The Bakhshali Arithmetic Methods',
        deepLore:
          'The mathematics of fractions, square roots, arithmetic progressions, and algebraic unknowns were recorded in early Sharada notation.',
        dialectInsight: 'Pahadi dialects retain vocabulary whose orthographic roots are preserved in Sharada manuscripts.',
        dialectSample: { label: 'Listen to Ancient Mathematical Formula', text: 'शून्य', lang: 'hi-IN' },
        communityRule: 'Manuscript Rule #3: Comparative tables must maintain chronological glyph genealogy.'
      },
      {
        id: 'sharada-4',
        level: 4,
        title: 'Revival & Unicode: Bringing Sharada Back',
        subtitle: 'How global linguistic scholars and Kashmiri youth are typing Sharada digitally.',
        glyph: '📜',
        scriptName: 'Sharada Digital Encoding (U+11180)',
        themeColor: '#1E3A8A',
        badgeLabel: 'Cultural Revival',
        lang: 'hi-IN',
        spokenForm: 'शारदा लिपि',
        learnTitle: 'The Modern Digital Revival of Sharada',
        learnExplanation:
          'Sharada was encoded into Unicode Standard 6.1 in January 2012 (U+11180 to U+111DF). Today, open-source font designers and youth organizations run digital workshops to transcribe endangered manuscripts.',
        culturalNote:
          'Digital preservation bridges the tragic displacement of Kashmiri pandits, reconnecting generations with their ancient literary roots.',
        sampleWords: [
          { char: '𑆯𑆳𑆫𑆢𑆳', ipa: '/ʃaːɾɐd̪aː/', gloss: 'Sharada' },
          { char: '𑆥𑆵𑆜', ipa: '/piːʈʰɐ/', gloss: 'Peeth (Sacred seat)' }
        ],
        quizQuestion: 'What is the primary motivation for creating digital Unicode fonts for historic scripts like Sharada?',
        quizOptions: [
          { text: 'To enable automated cataloging, searchable databases, and community study of ancient codices', subtext: 'Preserving endangered heritage on modern digital screens', isCorrect: true },
          { text: 'To replace all modern computer operating systems', subtext: 'Scripts co-exist alongside contemporary languages', isCorrect: false },
          { text: 'To restrict text reading to private researchers', subtext: 'Unicode standard promotes global open access', isCorrect: false }
        ],
        quizExplanation:
          'Exactly! Digital encoding democratizes access so anyone can search, read, and protect cultural treasures.',
        deepTitle: 'Virtual Manuscript Libraries',
        deepLore:
          'Digital scanning initiatives at the Bhandarkar Oriental Research Institute and Indira Gandhi National Centre for the Arts have scanned thousands of Sharada manuscripts.',
        dialectInsight: 'Sharada punctuation includes the unique "kākadanda" (𑇛) to mark musical pauses in hymn recitations.',
        dialectSample: { label: 'Hear Sharada Hymn Closing', text: 'ओम् शान्तिः', lang: 'hi-IN' },
        communityRule: 'Manuscript Rule #4: All digitized manuscripts must maintain transparent open metadata.'
      }
    ],
    labData: {
      sampleText: '𑆤𑆩𑆱𑇀𑆠𑁂 𑆯𑆳𑆫𑆢𑁂 𑆢𑁂𑆮𑆴 𑆑𑆳𑆯𑇀𑆩𑆵𑆫𑆥𑆶𑆫𑆮𑆳𑆱𑆴𑆤𑆴',
      sampleDescription: 'Traditional Kashmiri invocation: "Salutations to Thee, O Goddess Sharada, dweller of Kashmir."',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: '𑆬',
          charCompare: 'ल',
          compareScript: 'Devanagari',
          phoneme: '/lɐ/',
          insight: 'Sharada "𑆬" possesses a high triangular peak compared to flat Devanagari hanging bar.'
        },
        {
          charActive: '𑆑',
          charCompare: 'क',
          compareScript: 'Devanagari',
          phoneme: '/kɐ/',
          insight: 'Sharada "𑆑" maintains a chiseled diamond body suited for reed-drawn bhurjapatra.'
        },
        {
          charActive: '𑆯',
          charCompare: 'श',
          compareScript: 'Devanagari',
          phoneme: '/ʃɐ/',
          insight: 'Sharada Sha loops upward with sharp pointed crown terminal.'
        }
      ],
      decipherChallenges: [
        {
          id: 'sharada-c1',
          glyph: '𑆯𑆳𑆫𑆢𑆳',
          name: 'Sharada (Seat of Learning)',
          hint: 'Consists of Sha + Aa matra + Ra + Da + Aa matra.',
          solution: 'शारदा',
          phoneticIpa: '/ʃaːɾɐd̪aː/',
          historicalContext: 'Name of the ancient Himalayan valley script and goddess of knowledge.'
        },
        {
          id: 'sharada-c2',
          glyph: '𑆑𑆳𑆯𑇀𑆩𑆵𑆫',
          name: 'Kashmir (Land of Sage Kashyapa)',
          hint: 'Ka + Aa matra + Sha-Ma conjunct with long I + Ra.',
          solution: 'काश्मीर',
          phoneticIpa: '/kaːʃmiːɾɐ/',
          historicalContext: 'Historical center of Sanskrit linguistic and philosophical treatises.'
        }
      ],
      validationRulebook: [
        {
          title: 'Triangular Head Angle Integrity',
          description: 'Top marks must maintain acute triangular shape distinct from flat shirorekha.',
          status: 'Verified Standard'
        },
        {
          title: 'Conjunct Subjoining Verification',
          description: 'Secondary consonants in clusters must hang vertically beneath the primary consonant apex.',
          status: 'Verified Standard'
        },
        {
          title: 'Vowel Diacritic Height Balance',
          description: 'Top vowel matras must not intersect the upper bounding line of the manuscript line.',
          status: 'Verified Standard'
        }
      ]
    }
  },

  // 5. GRANTHA (ग्रन्थ)
  {
    id: 'grantha',
    nameNative: 'ग्रन्थ',
    nameEnglish: 'Grantha Script',
    symbol: '𑌲',
    era: '5th – 19th c. CE',
    region: 'Tamil Nadu, Kerala & South India',
    family: 'Southern Brahmic Sanskrit Hand',
    badgeColor: '#047857',
    themeColor: '#047857',
    tagline: 'The Palm-Leaf Sanskrit Script of the South',
    overview:
      'Grantha (meaning "book" or "manuscript" in Sanskrit) was invented in Tamil Nadu during the Pallava period (c. 5th century CE) specifically to write Sanskrit texts in the Tamil-speaking region. Because classical Tamil script intentionally lacked letters for aspirated consonants (ख, घ, छ, झ) and sibilants (श, ष, स), Grantha was created with lush circular loops optimized for palm-leaf stylus incision.',
    gardenLetters: [
      {
        char: '𑌲',
        name: 'Grantha La (𑌲)',
        ipa: '/lɐ/',
        meaning: 'Grantha letter La: characterized by spiral loops and sweeping curves suited for palm leaf incision.',
        audioText: 'La',
        lang: 'hi-IN'
      },
      {
        char: '𑌆',
        name: 'Grantha Aa (𑌆)',
        ipa: '/aː/',
        meaning: 'Independent vowel Aa with flowing southern curves and balance loops.',
        audioText: 'Aa',
        lang: 'hi-IN'
      },
      {
        char: '𑌕',
        name: 'Grantha Ka (𑌕)',
        ipa: '/kɐ/',
        meaning: 'Curved Grantha Ka showing the Pallava transition from straight lines to circular arcs.',
        audioText: 'Ka',
        lang: 'hi-IN'
      },
      {
        char: '𑌮',
        name: 'Grantha Ma (𑌮)',
        ipa: '/mɐ/',
        meaning: 'Grantha letter Ma: rounded loop foundational to South Indian Sanskrit chanting manuscripts.',
        audioText: 'Ma',
        lang: 'hi-IN'
      }
    ],
    knowledgeNodes: [
      {
        id: 'grantha-1',
        level: 1,
        title: 'Palm Leaves & Stylus: The Physics of Curves',
        subtitle: 'Why southern Indian scripts developed beautiful loops instead of straight horizontal lines.',
        glyph: '𑌲',
        scriptName: 'Pallava Grantha Palm-Leaf Hand',
        themeColor: '#047857',
        badgeLabel: 'Palm-Leaf Physics',
        lang: 'hi-IN',
        spokenForm: 'ग्रन्थ',
        learnTitle: 'Why Straight Lines Tore Palm Leaves',
        learnExplanation:
          'In South India, manuscripts were incised with sharp metal needles (ezhuthani) on dried palmyra palm leaves (talapatra). If a scribe incised a long horizontal straight line, the leaf would split along its fibrous grain.',
        culturalNote:
          'To protect the palm leaves from tearing, scribes replaced straight bars with rounded circular loops and flowing spirals. This physical constraint gave Grantha, Malayalam, Telugu, and Kannada their signature rounded elegance.',
        sampleWords: [
          { char: '𑌲', ipa: '/lɐ/', gloss: 'Grantha La' },
          { char: '𑌕', ipa: '/kɐ/', gloss: 'Grantha Ka' },
          { char: '𑌵𑍇𑌦', ipa: '/ʋeːd̪ɐ/', gloss: 'Veda (Sacred Knowledge)' }
        ],
        quizQuestion: 'Why did Grantha and southern Indic writing systems develop circular loops instead of horizontal straight bars?',
        quizOptions: [
          { text: 'Straight horizontal incisions with an iron stylus would tear the palm leaf along its fiber grain', subtext: 'Curves distributed pressure safely across the palm leaf', isCorrect: true },
          { text: 'Southern kings strictly banned square letters by royal law', subtext: 'It was a material physics constraint, not a legal ban', isCorrect: false },
          { text: 'Scribes only had circular stencils available', subtext: 'Inscriptions were freehand stylus art', isCorrect: false }
        ],
        quizExplanation:
          'Spot on! Round strokes distributed mechanical pressure evenly without tearing the delicate fibrous structure of palm leaves.',
        deepTitle: 'The Pallava Spread to Southeast Asia',
        deepLore:
          'Pallava Grantha is the direct ancestor of Khmer (Cambodia), Thai, Mon (Myanmar), Balinese, and Old Javanese Kawi scripts across Southeast Asia.',
        dialectInsight: 'Grantha was designed specifically to write Sanskrit sounds without disrupting Tamil phonetic simplicity.',
        dialectSample: { label: 'Listen to Vedic Chanting in Grantha Tradition', text: 'वेदानां सामवेदोऽस्मि', lang: 'hi-IN' },
        communityRule: 'Palm-Leaf Rule #1: Stylus stroke depth and curve radii must follow historical talapatra models.'
      },
      {
        id: 'grantha-2',
        level: 2,
        title: 'Vedic Recitation: Preserving Svara Accents',
        subtitle: 'How Grantha preserved the exact musical pitch accents of the Rigveda and Samaveda.',
        glyph: '𑍇',
        scriptName: 'Grantha Svara Accentuation',
        themeColor: '#059669',
        badgeLabel: 'Acoustic Sacredness',
        lang: 'hi-IN',
        spokenForm: 'शान्तिः',
        learnTitle: 'Udatta, Anudatta, and Svarita Accents',
        learnExplanation:
          'Vedic Sanskrit is a pitch-accented language. Grantha manuscripts contain specialized marks: horizontal sublinear bars for anudatta (low pitch) and vertical supralinear ticks for svarita (high pitch).',
        culturalNote:
          'Generations of Vedic scholars in Kumbakonam, Kanchipuram, and Chidambaram memorized thousands of hymns with the aid of Grantha palm-leaf codices.',
        sampleWords: [
          { char: '𑌶𑌾𑌨𑍍𑌤𑌿𑌃', ipa: '/ʃaːn̪t̪ɪh/', gloss: 'Shantih (Peace)' },
          { char: '𑌧𑌰𑍍𑌮', ipa: '/dʱɐɾmɐ/', gloss: 'Dharma' }
        ],
        quizQuestion: 'What linguistic feature made Grantha indispensable for Sanskrit in Tamil-speaking regions?',
        quizOptions: [
          { text: 'It provided characters for all 4 aspirated stops and 3 sibilants absent in the native Tamil alphabet', subtext: 'Allowing pristine Sanskrit recitation without phonetic ambiguity', isCorrect: true },
          { text: 'It had zero consonants for vowels', subtext: 'Grantha has a complete set of vowels and consonants', isCorrect: false },
          { text: 'It was written from top to bottom like Chinese', subtext: 'Grantha is written left to right', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Classical Tamil script has only 18 consonants. Grantha provided the full 33 consonant inventory required for Sanskrit.',
        deepTitle: 'Grantha-Tamil Manipravalam Literature',
        deepLore:
          'During the medieval era, scholars developed Manipravalam (meaning "ruby and coral"), a hybrid literary style blending Sanskrit and Tamil written in alternating Grantha and Tamil scripts.',
        dialectInsight: 'Tamil Brahmins traditionally studied Grantha at home alongside Tamil at school.',
        dialectSample: { label: 'Hear Shanti Mantra in Grantha Style', text: 'शान्तिः शान्तिः शान्तिः', lang: 'hi-IN' },
        communityRule: 'Palm-Leaf Rule #2: Manipravalam passages must maintain strict script-switching boundaries.'
      },
      {
        id: 'grantha-3',
        level: 3,
        title: 'Lineage of Southeast Asia: The Angkor Connection',
        subtitle: 'How Pallava Grantha became the foundation of Khmer, Thai, and Javanese writing.',
        glyph: '𑌕𑍍𑌲',
        scriptName: 'Grantha Maritime Lineage',
        themeColor: '#047857',
        badgeLabel: 'Maritime Silk Road',
        lang: 'hi-IN',
        spokenForm: 'अङ्कोर',
        learnTitle: 'Voyages Across the Bay of Bengal',
        learnExplanation:
          'Between the 5th and 10th centuries CE, seafaring merchants and scholars from South India traveled across Southeast Asia. Inscriptions at Angkor Wat and Borobudur are written in Pallava Grantha scripts.',
        culturalNote:
          'Looking at modern Thai or Khmer characters reveals their undeniable kinship with Grantha curves and subjoined consonant legs.',
        sampleWords: [
          { char: '𑌅𑌙𑍍𑌕𑍋𑌰', ipa: '/ɐŋkoːɾɐ/', gloss: 'Angkor (Nagara / City-State)' },
          { char: '𑌕𑌮𑍍𑌬𑍋𑌜', ipa: '/kɐmboːdʑɐ/', gloss: 'Kamboja (Cambodia)' }
        ],
        quizQuestion: 'Which famous world heritage temple complex in Cambodia features monumental inscriptions derived from Pallava Grantha script?',
        quizOptions: [
          { text: 'Angkor Wat', subtext: 'Written in Old Khmer and Sanskrit using Pallava-derived script', isCorrect: true },
          { text: 'The Colosseum in Rome', subtext: 'Written in Latin alphabet', isCorrect: false },
          { text: 'Machu Picchu in Peru', subtext: 'Inca culture used quipu knot records', isCorrect: false }
        ],
        quizExplanation:
          'Correct! Angkor Wat and the surrounding temples boast thousands of lines of Sanskrit and Old Khmer in Pallava-derived script.',
        deepTitle: 'Malayalam Script’s Direct Mother',
        deepLore:
          'Modern Malayalam script (മലയാളം) is the closest living direct descendant of medieval Western Grantha (Arya Ezhuthu), maintaining nearly identical consonant structures.',
        dialectInsight: 'Kerala scribes preserved unique ligature ligatures that survived into modern Malayalam typography.',
        dialectSample: { label: 'Listen to Nagara Pronunciation', text: 'नगर', lang: 'hi-IN' },
        communityRule: 'Palm-Leaf Rule #3: Historical Southeast Asian epigraphs must cite Pallava coordinate prototypes.'
      },
      {
        id: 'grantha-4',
        level: 4,
        title: 'Digital Encoding & Unicode: Block U+11300',
        subtitle: 'Preserving millions of South Indian palm leaf manuscripts in modern digital databases.',
        glyph: '🌿',
        scriptName: 'Grantha Unicode Standard (U+11300)',
        themeColor: '#047857',
        badgeLabel: 'Digital Preservation',
        lang: 'hi-IN',
        spokenForm: 'ग्रन्थ लिपि',
        learnTitle: 'Rescuing Crumbling Talapatra Manuscripts',
        learnExplanation:
          'Grantha was officially encoded in Unicode 7.0 in June 2014 (U+11300 to U+1137F). Because palm leaves deteriorate after 300-400 years in tropical humidity, digital transcription is an urgent race against time.',
        culturalNote:
          'The French Institute of Pondicherry and the Adyar Library in Chennai hold over 100,000 palm leaf bundles that are now being digitally transcribed using Unicode Grantha fonts.',
        sampleWords: [
          { char: '𑌗𑍍𑌰𑌨𑍍𑌥', ipa: '/ɡɾɐn̪t̪ʰɐ/', gloss: 'Grantha' },
          { char: '𑌲𑌿𑌪𑌿', ipa: '/lɪpɪ/', gloss: 'Lipi' }
        ],
        quizQuestion: 'Why is the digital transcription of Grantha palm-leaf manuscripts particularly urgent today?',
        quizOptions: [
          { text: 'Palm leaves naturally decay and crumble in tropical heat within 300 to 400 years', subtext: 'Digital fonts permanently secure the knowledge before leaves turn to dust', isCorrect: true },
          { text: 'Because modern computers will soon delete old languages', subtext: 'Computers do not delete languages', isCorrect: false },
          { text: 'Because ink on palm leaves completely washes off with water', subtext: 'Traditional carbon soot ink is insoluble, but the leaf itself decays', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The physical palm leaf substrate decays naturally, making high-resolution scanning and Unicode typing essential.',
        deepTitle: 'AI-Assisted Palm Leaf Decipherment',
        deepLore:
          'Digital humanities teams use multispectral lighting to reveal faded stylus incisions on blackened leaves that are invisible to the naked human eye.',
        dialectInsight: 'Grantha includes a special archaic mark called "pluta" (𑍤) used to indicate prolonged musical notes in Vedic chanting.',
        dialectSample: { label: 'Listen to Grantha Vedic Salutation', text: 'नमस्ते अस्तु भगवन्', lang: 'hi-IN' },
        communityRule: 'Palm-Leaf Rule #4: Digital transliteration must include high-fidelity multispectral leaf references.'
      }
    ],
    labData: {
      sampleText: '𑌓𑌁 𑌨𑌮𑍋 𑌭𑌗𑌵𑌤𑍇 𑌵𑌾𑌸𑍁𑌦𑍇𑌵𑌾𑌯',
      sampleDescription: 'Classical Sanskrit sacred mantra incised on palm leaf in pristine Grantha script.',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: '𑌲',
          charCompare: 'ल',
          compareScript: 'Devanagari',
          phoneme: '/lɐ/',
          insight: 'Grantha "𑌲" has a curved circular base designed to prevent stylus splitting on palm leaf.'
        },
        {
          charActive: '𑌕',
          charCompare: 'க',
          compareScript: 'Tamil',
          phoneme: '/kɐ/',
          insight: 'Grantha Ka preserves the aspirate potential, whereas Tamil Ka represents both /k/ and /g/.'
        },
        {
          charActive: '𑌵',
          charCompare: 'വ',
          compareScript: 'Malayalam',
          phoneme: '/ʋɐ/',
          insight: 'Direct parent-child relationship: Malayalam Va is nearly identical to Grantha Va.'
        }
      ],
      decipherChallenges: [
        {
          id: 'grantha-c1',
          glyph: '𑌵𑍇𑌦',
          name: 'Veda (Sacred Knowledge)',
          hint: 'Va + E matra + Da.',
          solution: 'वेद',
          phoneticIpa: '/ʋeːd̪ɐ/',
          historicalContext: 'Core scriptural corpus preserved in South Indian manuscript libraries.'
        },
        {
          id: 'grantha-c2',
          glyph: '𑌧𑌰𑍍𑌮',
          name: 'Dharma (Cosmic Order & Virtue)',
          hint: 'Dha + Ra-Ma stacked conjunct.',
          solution: 'धर्म',
          phoneticIpa: '/dʱɐɾmɐ/',
          historicalContext: 'Foundational ethical treatise recorded across Grantha palm-leaf codices.'
        }
      ],
      validationRulebook: [
        {
          title: 'Stylus Radii Smoothness',
          description: 'All rounded terminals must maintain continuous curvature without sharp fracture corners.',
          status: 'Verified Standard'
        },
        {
          title: 'Sanskrit Aspirate Completeness',
          description: 'Aspirated stops (Kh, Gh, Ch, Jh, Th, Dh, Ph, Bh) must follow Pallava canonical ductus.',
          status: 'Verified Standard'
        },
        {
          title: 'Vedic Accent Mark Positioning',
          description: 'Anudatta bars must rest precisely below the baseline without touching character descenders.',
          status: 'Verified Standard'
        }
      ]
    }
  },

  // 6. ROMAN IAST TRANSLITERATION (रोमन लिप्यंतरण)
  {
    id: 'iast',
    nameNative: 'रोमन लिप्यंतरण',
    nameEnglish: 'IAST (Roman Diacritics)',
    symbol: 'ā',
    era: '1894 CE – Present',
    region: 'International Scholarly & Digital Linguistic Community',
    family: 'Academic Phonetic Latin Extension',
    badgeColor: '#C2410C',
    themeColor: '#C2410C',
    tagline: 'The Global Academic Standard for Indic Phonology',
    overview:
      'The International Alphabet of Sanskrit Transliteration (IAST) was established at the International Congress of Orientalists in Geneva (1894). It provides a lossless, reversible 1:1 mapping between Devanagari and the Roman alphabet using macrons (ā, ī, ū), underdots (ṭ, ḍ, ṇ, ṛ, ṣ), and accents (ś, ñ). It allows international scholars and typographers to read and study Indic scripts on any universal keyboard.',
    gardenLetters: [
      {
        char: 'ā',
        name: 'Macron A (ā)',
        ipa: '/aː/',
        meaning: 'Represents dirgha (long) open vowel /aː/. A single horizontal bar above replaces double letters.',
        audioText: 'tala, taala',
        lang: 'en-US'
      },
      {
        char: 'ṛ',
        name: 'Vocalic R (ṛ)',
        ipa: '/r̩/ or /ɾɪ/',
        meaning: 'Sacred Sanskrit vocalic liquid consonant (ऋ). The underdot marks its syllabic vowel function.',
        audioText: 'Rishi',
        lang: 'en-US'
      },
      {
        char: 'ś',
        name: 'Acute S (ś)',
        ipa: '/ʃɐ/',
        meaning: 'Represents palatal sibilant तालव्य श (as in Shiva). The acute accent marks palatal contact.',
        audioText: 'Shiva',
        lang: 'en-US'
      },
      {
        char: 'ñ',
        name: 'Tilde N (ñ)',
        ipa: '/ɲɐ/',
        meaning: 'Represents the palatal nasal ña (ञ) articulated with the tongue flat against the hard palate.',
        audioText: 'Gyaana',
        lang: 'en-US'
      }
    ],
    knowledgeNodes: [
      {
        id: 'iast-1',
        level: 1,
        title: 'Precision Transliteration: The Geneva Standard of 1894',
        subtitle: 'Why global linguists engineered a 100% reversible diacritic system.',
        glyph: 'ā',
        scriptName: 'IAST Academic Transliteration',
        themeColor: '#C2410C',
        badgeLabel: 'Acoustic Precision',
        lang: 'en-US',
        spokenForm: 'tāla',
        learnTitle: 'The Principle of Lossless 1:1 Reversibility',
        learnExplanation:
          'When converting between writing systems, informal spelling often introduces confusion (e.g. is "sh" dental s+h or palatal sh?). IAST solves this by assigning exactly one character with diacritics to each Indic phoneme.',
        culturalNote:
          'Standardized in Geneva in 1894, IAST remains the gold standard in Harvard Oriental Series, Oxford Classical Texts, and modern digital library catalogs worldwide.',
        sampleWords: [
          { char: 'tala', ipa: '/tɐlɐ/', gloss: 'Rhythm / Palm (short vowel)' },
          { char: 'tāla', ipa: '/taːlɐ/', gloss: 'Cymbal / Musical beat (long vowel)' },
          { char: 'ṛṣi', ipa: '/r̩.ʂɪ/', gloss: 'Rishi (Seer / Sage)' }
        ],
        quizQuestion: 'What does the horizontal macron diacritic (ā) represent in IAST orthography?',
        quizOptions: [
          { text: 'A long vowel sound with double duration (/aː/)', subtext: 'Exact phonological vowel lengthening', isCorrect: true },
          { text: 'A silent letter that is never pronounced', subtext: 'IAST has no silent letters', isCorrect: false },
          { text: 'A nasal sound through the nostrils', subtext: 'Nasalization is marked with anusvara (ṃ)', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The macron denotes a long vowel with two morae (dvi-matra duration).',
        deepTitle: 'Digital Accessibility Debates',
        deepLore:
          'While IAST provides impeccable acoustic precision for print books, mobile smartphone users often debate whether double letters (aa, ee, oo) should be accepted for casual digital typing.',
        dialectInsight: 'In modern spoken Hindi, word-final short /a/ is often silent (schwa deletion), but IAST faithfully records its full metric existence.',
        dialectSample: { label: 'Listen to Contrast (tala vs tāla)', text: 'tala, taala', lang: 'en-US' },
        communityRule: 'Transliteration Rule #1: IAST conversions must guarantee 100% lossless reverse reconstruction.'
      },
      {
        id: 'iast-2',
        level: 2,
        title: 'The Underdot Symphony: Retroflex vs Dental',
        subtitle: 'How a tiny dot beneath letters signals tongue curling to the roof of the mouth.',
        glyph: 'ṭ',
        scriptName: 'Retroflex Underdot Diacritics',
        themeColor: '#EA580C',
        badgeLabel: 'Phonological Contrast',
        lang: 'en-US',
        spokenForm: 'kṛṣṇa',
        learnTitle: 'Tongue Curling to the Palatal Dome',
        learnExplanation:
          'Indic languages strictly distinguish dental sounds (tongue touching teeth: t, d, n) from retroflex sounds (tongue curled back to hard palate: ṭ, ḍ, ṇ). In IAST, an underdot (nuqta) marks retroflex articulation.',
        culturalNote:
          'European languages lack phonemic retroflex consonants, making the underdot an indispensable visual cue for singers, linguists, and yoga reciters.',
        sampleWords: [
          { char: 'danta', ipa: '/d̪ɐn̪t̪ɐ/', gloss: 'Tooth (pure dental t and d)' },
          { char: 'ghaṭa', ipa: '/ɡʱɐʈɐ/', gloss: 'Pot (retroflex ṭ with curled tongue)' },
          { char: 'kṛṣṇa', ipa: '/kr̩ʂɳɐ/', gloss: 'Krishna (retroflex ṣ and ṇ)' }
        ],
        quizQuestion: 'In IAST, how is a retroflex consonant (e.g. ट or ड) visually distinguished from a dental consonant (त or द)?',
        quizOptions: [
          { text: 'By an underdot beneath the letter (ṭ, ḍ, ṇ)', subtext: 'Signals tongue curled backward against roof of mouth', isCorrect: true },
          { text: 'By writing the letter in ALL CAPS', subtext: 'Harvard-Kyoto used capital letters, not IAST', isCorrect: false },
          { text: 'By appending an exclamation mark', subtext: 'Exclamations are used for click consonants in African languages', isCorrect: false }
        ],
        quizExplanation:
          'Correct! The underdot consistently marks retroflex articulation across all consonants and vocalic liquids (ṭ, ḍ, ṇ, ṛ, ṣ).',
        deepTitle: 'Harvard-Kyoto and ITRANS',
        deepLore:
          'Before full Unicode keyboard support arrived, internet communities invented ASCII schemes like ITRANS and Harvard-Kyoto (using capital letters like "T" for retroflex) so anyone could type Indic scripts on basic keyboards.',
        dialectInsight: 'Tamil speakers distinguish retroflex /ɭ/ from alveolar /l/, reflected precisely in extended IAST.',
        dialectSample: { label: 'Hear Krishna in Sanskrit Pronunciation', text: 'कृष्ण', lang: 'hi-IN' },
        communityRule: 'Transliteration Rule #2: Underdots must never be substituted with hyphens or apostrophes.'
      },
      {
        id: 'iast-3',
        level: 3,
        title: 'Sibilants & Nasals: Ś, Ṣ, S, and Ṃ',
        subtitle: 'The three distinct Sanskrit sibilants: Palatal (ś), Retroflex (ṣ), and Dental (s).',
        glyph: 'ś',
        scriptName: 'Sibilant Triad Orthography',
        themeColor: '#C2410C',
        badgeLabel: 'Acoustic Mastery',
        lang: 'en-US',
        spokenForm: 'śānti',
        learnTitle: 'The Triad of Sibilant Whispers',
        learnExplanation:
          'Sanskrit features three distinct "s" sounds: ś (palatal, as in śiva), ṣ (retroflex, as in viṣṇu), and s (dental, as in sūrya). Conflating them into simple "sh" loses sacred acoustic distinctions.',
        culturalNote:
          'In traditional gurukuls, students practiced reciting the three sibilants while holding a lit candle to observe differences in air blast and turbulence.',
        sampleWords: [
          { char: 'śiva', ipa: '/ʃɪʋɐ/', gloss: 'Shiva (Palatal sibilant)' },
          { char: 'viṣṇu', ipa: '/ʋɪʂɳʊ/', gloss: 'Vishnu (Retroflex sibilant)' },
          { char: 'sūrya', ipa: '/suːɾjɐ/', gloss: 'Surya / Sun (Dental sibilant)' }
        ],
        quizQuestion: 'Which word contains the PALATAL sibilant marked with an acute accent (ś)?',
        quizOptions: [
          { text: 'śānti (Peace)', subtext: 'Palatal articulation with tongue near soft palate', isCorrect: true },
          { text: 'viṣṇu (Vishnu)', subtext: 'That is the retroflex sibilant with underdot (ṣ)', isCorrect: false },
          { text: 'sūrya (Sun)', subtext: 'That is the dental sibilant (s)', isCorrect: false }
        ],
        quizExplanation:
          'Bravo! "śānti" begins with the palatal sibilant ś (Devanagari श).',
        deepTitle: 'Anusvara and Visarga in International Phonetics',
        deepLore:
          'Anusvara (ṃ) and Visarga (ḥ) represent nasal resonant hums and voiceless breath releases that close sacred mantras.',
        dialectInsight: 'In modern Bengali, all three sibilants merge into palato-alveolar /ʃ/, while in Marathi the distinction remains active.',
        dialectSample: { label: 'Listen to Shanti in IAST', text: 'शांति', lang: 'hi-IN' },
        communityRule: 'Transliteration Rule #3: The three sibilants (ś, ṣ, s) must never be collapsed into generic "sh".'
      },
      {
        id: 'iast-4',
        level: 4,
        title: 'Global Computing: Unicode Normalization Forms',
        subtitle: 'How NFC and NFD composition standards prevent broken diacritic letters on the web.',
        glyph: '⌨️',
        scriptName: 'Unicode Precomposed Characters',
        themeColor: '#C2410C',
        badgeLabel: 'Web Standards',
        lang: 'en-US',
        spokenForm: 'IAST Standard',
        learnTitle: 'Precomposed Glyphs vs Combining Diacritics',
        learnExplanation:
          'In computers, the letter "ā" can be stored as a single precomposed character (U+0101) or as the letter "a" (U+0061) followed by a combining macron (U+0304). Modern web platforms normalize all text to NFC to ensure search engines find words correctly.',
        culturalNote:
          'Without proper normalization, typing "tāla" on an iPhone might fail to match "tāla" stored in a university database.',
        sampleWords: [
          { char: 'NFC', ipa: '/ɛn ɛf siː/', gloss: 'Canonical Composition (Recommended)' },
          { char: 'NFD', ipa: '/ɛn ɛf diː/', gloss: 'Canonical Decomposition' }
        ],
        quizQuestion: 'Why is Unicode NFC normalization critical when building software for Indic transliteration?',
        quizOptions: [
          { text: 'It ensures that precomposed letters like "ā" and combining sequences match identically in search queries', subtext: 'Preventing ghost mismatches in databases and user searches', isCorrect: true },
          { text: 'It automatically translates English into Sanskrit', subtext: 'Normalization is text encoding, not translation', isCorrect: false },
          { text: 'It changes the font size to 16px', subtext: 'Normalization affects byte values, not styling', isCorrect: false }
        ],
        quizExplanation:
          'Spot on! NFC normalization unifies composite characters so search, sorting, and comparison operate flawlessly.',
        deepTitle: 'The Future: AI-Assisted Multilingual Orthography',
        deepLore:
          'Modern language models trained with exact IAST corpora can seamlessly switch between Devanagari, Grantha, and Roman script without hallucinating phonetic mistakes.',
        dialectInsight: 'Linguistic fieldworkers use IAST to document previously unwritten tribal languages across Central and Northeast India.',
        dialectSample: { label: 'Hear International Sanskrit Phrase', text: 'Vasudhaiva Kutumbakam', lang: 'en-US' },
        communityRule: 'Transliteration Rule #4: All search indexing must enforce NFC unicode normalization.'
      }
    ],
    labData: {
      sampleText: 'sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ',
      sampleDescription: 'Sacred universal prayer: "May all beings be happy; may all beings be free from illness."',
      rulesPassed: 4,
      comparisonPairs: [
        {
          charActive: 'ā',
          charCompare: 'ा',
          compareScript: 'Devanagari',
          phoneme: '/aː/',
          insight: 'The Roman macron line corresponds directly to the right vertical kana stroke.'
        },
        {
          charActive: 'ṛ',
          charCompare: 'ऋ',
          compareScript: 'Devanagari',
          phoneme: '/r̩/',
          insight: 'The underdot preserves the vocalic vowel liquid distinction.'
        },
        {
          charActive: 'ś',
          charCompare: 'श',
          compareScript: 'Devanagari',
          phoneme: '/ʃɐ/',
          insight: 'Acute accent over "s" marks palatal tongue placement without requiring a digraph.'
        }
      ],
      decipherChallenges: [
        {
          id: 'iast-c1',
          glyph: 'tālam',
          name: 'Tālam (Rhythm / Metric Cadence)',
          hint: 'Consists of dental T + long Aa + La + Anusvara M.',
          solution: 'तालम्',
          phoneticIpa: '/t̪aːlɐm/',
          historicalContext: 'The foundational metric framework of Carnatic and Hindustani classical music.'
        },
        {
          id: 'iast-c2',
          glyph: 'satyam',
          name: 'Satyam (Truth / Reality)',
          hint: 'Dental S + short A + Ta-Ya conjunct + Anusvara M.',
          solution: 'सत्यम्',
          phoneticIpa: '/sɐt̪jɐm/',
          historicalContext: 'Core ethical pillar across all Indian philosophical traditions.'
        }
      ],
      validationRulebook: [
        {
          title: 'Macron vs Digraph Strictness',
          description: 'Long vowels must strictly use macrons (ā, ē, ī, ō, ū) rather than doubled letters.',
          status: 'Verified Standard'
        },
        {
          title: 'Retroflex Underdot Precision',
          description: 'All lingual retroflex phonemes must carry Unicode combining or precomposed underdots.',
          status: 'Verified Standard'
        },
        {
          title: 'NFC Canonical Normalization',
          description: 'Text strings must parse to Unicode Normalization Form C before verification scoring.',
          status: 'Verified Standard'
        }
      ]
    }
  }
];

export function getLipiById(id: string): LipiDefinition {
  return SUPPORTED_LIPIS.find((l) => l.id === id) || SUPPORTED_LIPIS[0];
}
