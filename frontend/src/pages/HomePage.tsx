import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  RotateCcw,
  Award,
  Volume2,
  Lightbulb,
  Sparkles,
  X,
  Layers,
  Radio
} from 'lucide-react';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';

interface KnowledgeNode {
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
  // Step 1: Learn & Trace
  learnTitle: string;
  learnExplanation: string;
  culturalNote: string;
  sampleWords: { char: string; ipa: string; gloss: string }[];
  // Step 2: Interactive Quiz
  quizQuestion: string;
  quizOptions: { text: string; subtext: string; isCorrect: boolean }[];
  quizExplanation: string;
  // Step 3: Deep Wisdom
  deepTitle: string;
  deepLore: string;
  dialectInsight: string;
  dialectSample: { label: string; text: string; lang: string };
  communityRule: string;
}

const knowledgeNodes: KnowledgeNode[] = [
  {
    id: 'node-root',
    level: 1,
    title: 'Root & Lineage: Devanagari & Brahmi',
    subtitle: 'How ancient sound-first writing systems organize human speech.',
    glyph: 'ल',
    scriptName: 'Devanagari (South Asian Tradition)',
    themeColor: '#B45309',
    badgeLabel: 'Lineage Foundation',
    lang: 'hi-IN',
    spokenForm: 'ल',
    learnTitle: 'The 3D Anatomy of "ल" (Lipi / Script)',
    learnExplanation:
      'In the Devanagari tradition, every character represents a consonant with an inherent vowel /a/. The continuous horizontal hanging bar (shirorekha) physically links syllables into unified words, echoing unbroken breath flow.',
    culturalNote:
      'Devanagari is an abugida descended from ancient Brahmi (c. 3rd century BCE). It prioritizes phonetic truth: letters are arranged strictly by place of vocal articulation (throat, palate, teeth, lips).',
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
      'Correct! As an abugida, every base consonant carries an inherent vowel. To cancel it, a halant (्) is attached.',
    deepTitle: 'Sovereign Community Rationale',
    deepLore:
      'When digitizing classical scripts, early computers struggled with conjunct stacking. Rather than discarding classical ligatures, language communities demanded smart font rendering engines that preserve orthographic dignity.',
    dialectInsight: 'Regional pronunciation varies from dental /l/ to retroflex flap /ɭ/ across Marathi, Hindi, and Rajasthani dialects.',
    dialectSample: { label: 'Listen to Regional Flap Variant', text: 'ळ', lang: 'mr-IN' },
    communityRule: 'Orthography Rule #1: Inherent vowels must be preserved in base orthography models.'
  },
  {
    id: 'node-vowels',
    level: 2,
    title: 'Vowel Alchemy: Macrons vs Digraphs',
    subtitle: 'The great debate: compact diacritic lines (ā) vs double letters (aa).',
    glyph: 'ā',
    scriptName: 'Latin Extended Diacritic Orthography',
    themeColor: '#C2410C',
    badgeLabel: 'Acoustic Precision',
    lang: 'en-US',
    spokenForm: 'tāla',
    learnTitle: 'Signaling Vowel Length Across Alphabets',
    learnExplanation:
      'Languages distinguish short vowels from long vowels. How should a community write this distinction? Option A uses a macron diacritic above the letter (ā). Option B doubles the vowel letter (aa). Each choice entails distinct engineering and reading trade-offs.',
    culturalNote:
      'Macrons offer visual brevity and preserve bookish elegance (common in sacred Sanskrit transcriptions and Māori). Digraphs (aa) allow typing on standard English keyboards with zero special software.',
    sampleWords: [
      { char: 'talā', ipa: '/tɐlaː/', gloss: 'Short initial, long final' },
      { char: 'tāla', ipa: '/taːlɐ/', gloss: 'Long initial, short final' },
      { char: 'tālā', ipa: '/taːlaː/', gloss: 'Both vowels long' }
    ],
    quizQuestion: 'Which word has a SHORT initial vowel and a LONG final vowel?',
    quizOptions: [
      { text: 'talā', subtext: 'Initial vowel bare (short), second vowel marked (long)', isCorrect: true },
      { text: 'tāla', subtext: 'Initial vowel marked (long), second bare (short)', isCorrect: false },
      { text: 'tālā', subtext: 'Both vowels marked as long', isCorrect: false }
    ],
    quizExplanation:
      'Spot on! In "talā", "a" has no marker (short), whereas "ā" carries the horizontal macron (long vowel).',
    deepTitle: 'Digital Access vs Orthographic Elegance',
    deepLore:
      'A community in northern Norway debated whether to adopt macrons. Older speakers favored macrons for their compact aesthetic; younger mobile users initially preferred double vowels because standard phone keyboards lacked quick macron keys.',
    dialectInsight: 'In dialects where vowel duration conveys grammatical tense, precision in length marking prevents ambiguity.',
    dialectSample: { label: 'Listen to Vowel Contrast (talā vs tāla)', text: 'tala, taala', lang: 'en-US' },
    communityRule: 'Orthography Rule #2: Long vowel representation must be consistently verified without automated bias.'
  },
  {
    id: 'node-conjuncts',
    level: 3,
    title: 'The Conjunct Forge: Ligatures vs Linear Keys',
    subtitle: 'Balancing complex sacred ligatures against smartphone keypad ergonomics.',
    glyph: 'क्ष',
    scriptName: 'Classical Conjunct Orthography (Ksha)',
    themeColor: '#15803D',
    badgeLabel: 'Scribal Mastery',
    lang: 'hi-IN',
    spokenForm: 'क्ष',
    learnTitle: 'When Two Consonants Merge into One Form',
    learnExplanation:
      'When two consonants sound consecutively without an intervening vowel (like "k" + "ṣ"), traditional scribes forged a single ligature (क्ष). In digital input, this requires complex font shapers.',
    culturalNote:
      'Classical Gita manuscripts feature intricate stacked conjuncts that economize page space and reflect sacred calligraphy. Modern mobile keyboards sometimes offer a linear fallback (क्+ष) to assist quick typing.',
    sampleWords: [
      { char: 'क्ष', ipa: '/kʂɐ/', gloss: 'Ligature conjunct of Ka + Ssa' },
      { char: 'ज्ञ', ipa: '/dʑɲɐ/', gloss: 'Ligature conjunct of Ja + Nya' },
      { char: 'त्र', ipa: '/tɾɐ/', gloss: 'Ligature conjunct of Ta + Ra' }
    ],
    quizQuestion: 'Why did traditional scribes merge consonants into compact ligatures?',
    quizOptions: [
      { text: 'To economize expensive parchment and reflect unbroken pronunciation', subtext: 'Scribal tradition and phonological unity', isCorrect: true },
      { text: 'Because they had not yet invented single letters', subtext: 'Single letters existed beforehand', isCorrect: false },
      { text: 'To confuse readers from outside the village', subtext: 'Inaccurate historical belief', isCorrect: false }
    ],
    quizExplanation:
      'Exactly! In handwritten manuscripts, palm leaf and paper were scarce and precious. Ligatures mirrored unbroken speech stream while saving surface area.',
    deepTitle: 'Mobile Accessibility Compromise',
    deepLore:
      'In the River Valley community, elders and youth compromised: traditional print editions retain full ligatures, while a simplified one-letter-per-key standard was adopted for official SMS messaging.',
    dialectInsight: 'Conjunct clustering often relaxes in informal spoken dialects into epenthetic vowels (e.g., "pra-" becoming "para-").',
    dialectSample: { label: 'Listen to Conjunct Pronunciation', text: 'क्षमा', lang: 'hi-IN' },
    communityRule: 'Orthography Rule #3: Conjunct rules must provide clear mapping between input keystrokes and rendered glyphs.'
  },
  {
    id: 'node-sabha',
    level: 4,
    title: 'Sovereign Sabha: Community Decision-Making',
    subtitle: 'The golden principle: Communities are decision-makers, not mere datasets.',
    glyph: '⚖️',
    scriptName: 'Community Consensus Governance',
    themeColor: '#4338CA',
    badgeLabel: 'Democratic Forum',
    lang: 'hi-IN',
    spokenForm: 'सभा',
    learnTitle: 'Who Decides How a Language is Written?',
    learnExplanation:
      'Historically, external linguists or centralized bureaucracies imposed writing systems on regional languages. Lipi Sabha restores sovereignty: orthography choices are debated openly in the community forum.',
    culturalNote:
      'A writing system is not just an arbitrary technical cipher; it represents religious identity, historical continuity, and emotional connection to ancestral speech.',
    sampleWords: [
      { char: 'मत', ipa: '/mɐt̪/', gloss: 'Deliberation, vote, informed perspective' },
      { char: 'सभा', ipa: '/sɐbʱaː/', gloss: 'Democratic council of speakers' },
      { char: 'निर्णय', ipa: '/nɪɾɳɐjɐ/', gloss: 'Consensus decision permanently recorded' }
    ],
    quizQuestion: 'In Lipi Sabha, who determines the official spelling and orthography standards?',
    quizOptions: [
      { text: 'The native speaker community through transparent consensus deliberation', subtext: 'The foundational principle of Lipi Sabha', isCorrect: true },
      { text: 'An automated machine learning algorithm that picks the shortest word', subtext: 'Algorithms do not understand human heritage', isCorrect: false },
      { text: 'A single external government administrator', subtext: 'Top-down imposition', isCorrect: false }
    ],
    quizExplanation:
      'Spot on! The community is the sovereign decision-maker. Technology serves documentation; speakers choose the standard.',
    deepTitle: 'Recorded Consensus Records',
    deepLore:
      'Every proposal voted on in the Sabha is entered into an immutable community ledger that includes minority opinions, ensuring dissenting perspectives are never erased.',
    dialectInsight: 'Consensus does not enforce dialect extinction; variants are tagged with metadata rather than labeled "incorrect".',
    dialectSample: { label: 'Listen to "Sabha" Chanted in Council', text: 'सत्यमेव जयते सभा', lang: 'hi-IN' },
    communityRule: 'Orthography Rule #4: No spelling convention shall be enforced without recorded speaker consultation.'
  }
];

export function HomePage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-root');
  const [activeStep, setActiveStep] = useState<'learn' | 'quiz' | 'deep'>('learn');
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(450);

  const activeNode = knowledgeNodes.find((n) => n.id === selectedNodeId) || knowledgeNodes[0];

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setActiveStep('learn');
    setQuizSelection(null);
    setQuizSubmitted(false);
    playAcousticChime(440 + activeNode.level * 40, 0.4);
  };

  const handleQuizAnswer = (index: number) => {
    setQuizSelection(index);
    setQuizSubmitted(true);
    if (activeNode.quizOptions[index]?.isCorrect) {
      playSuccessChime();
      setEarnedXP((prev) => prev + 50);
    } else {
      playAcousticChime(300, 0.35);
    }
  };

  return (
    <div className="bg-cream text-ink min-h-screen">
      {/* ========================================================
          HERO: ILLUMINATED GITA BOOK / SACRED MANUSCRIPT OPENING
          Clean, elegant, with the badge line removed as requested
          ======================================================== */}
      <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-24 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.18]">
            Every letter has a{' '}
            <span className="hero-story-underline text-purple">
              story.
            </span>
            <br />
            Every community has a voice.
          </h1>

          <p className="text-muted text-base sm:text-lg font-serif max-w-2xl mx-auto leading-relaxed">
            Writing systems are living tapestries of culture, acoustic precision, and sovereign choice. Explore the 3D Tree of Knowledge below or jump to the Script Testing Lab.
          </p>

          {/* Quick Dual Jump Scrolls */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#tree-of-knowledge"
              className="btn-chunky-purple px-7 py-3.5 text-sm inline-flex items-center gap-2"
            >
              <BookOpen size={17} />
              <span>ज्ञान वृक्ष (The 3D Knowledge Tree)</span>
              <ArrowRight size={16} />
            </a>

            <Link
              to="/lab"
              className="btn-chunky-white px-7 py-3.5 text-sm inline-flex items-center gap-2"
            >
              <FlaskConical size={17} className="text-purple" />
              <span>प्रयोग शाला (Test & Verify Script) →</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-sans text-muted pt-2">
            <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" />
            <span>Audited Community Ledger • 100% Free & Open-Access</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 1: ज्ञान वृक्ष — THE 3D KNOWLEDGE TREE
          Sculpted 3D medallions, organic golden branching path,
          and interactive 3-stage deep wisdom bloom
          ======================================================== */}
      <section id="tree-of-knowledge" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-light border border-purple/30 text-xs font-serif font-bold text-purple uppercase">
            ज्ञान वृक्ष • The 3D Knowledge Tree
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-ink">
            Ascend the Sacred Orthographic Tree
          </h2>
          <p className="text-muted text-sm font-serif">
            Step upon the sculpted 3D medallions along the golden vine. Each node unlocks a tactile lesson, an interactive quiz, and living community wisdom.
          </p>
        </div>

        {/* The 3D Tree & Detail Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Sculpted Tree Path */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-border p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-purple flex items-center gap-1.5">
                <span>🌿</span>
                <span>The 3D Discovery Trail</span>
              </span>
              <span className="text-xs font-mono font-bold text-muted">
                Branch {activeNode.level} of 4
              </span>
            </div>

            {/* 3D Stepping Stone Nodes */}
            <div className="space-y-5 relative py-2">
              {/* Organic 3D Golden Vine Line with Soft Drop Shadow */}
              <div
                className="absolute left-[34px] top-6 bottom-6 w-1 rounded-full -z-0"
                style={{
                  background: 'linear-gradient(to bottom, #D97706, #B45309, #15803D, #4338CA)',
                  boxShadow: '0 0 10px rgba(180, 83, 9, 0.35)'
                }}
              />

              {knowledgeNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelectNode(node.id)}
                    className={`relative z-10 w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-50/90 to-white border-2 border-purple shadow-elevated -translate-y-1'
                        : 'bg-white border-[1.5px] border-border hover:border-purple/60 hover:-translate-y-0.5 shadow-soft'
                    }`}
                    style={{
                      borderBottomWidth: isSelected ? '4.5px' : '3.5px',
                      borderBottomColor: isSelected ? '#78350F' : '#DCCFB9'
                    }}
                  >
                    {/* 3D Tactile Circular Medallion / Stepping Stone */}
                    <div
                      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-2xl shrink-0 transition-all select-none ${
                        isSelected
                          ? 'scale-105 text-white'
                          : 'text-ink bg-neutral border border-border group-hover:scale-102'
                      }`}
                      style={
                        isSelected
                          ? {
                              background: 'linear-gradient(180deg, #D97706 0%, #B45309 60%, #78350F 100%)',
                              border: '2px solid #FCD34D',
                              boxShadow: '0 6px 0px #451A03, 0 10px 18px rgba(120, 53, 15, 0.4)'
                            }
                          : {
                              background: 'linear-gradient(180deg, #FFFDF9 0%, #F5EFE4 100%)',
                              border: '1.5px solid #DCCFB9',
                              boxShadow: '0 4px 0px #C4B59D, 0 6px 12px rgba(28, 25, 23, 0.08)'
                            }
                      }
                    >
                      {/* Top Specular 3D Reflection */}
                      <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/30 pointer-events-none" />
                      <span className="relative z-10 drop-shadow-sm">{node.glyph}</span>
                    </div>

                    {/* Node Metadata & Title */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-purple tracking-wider">
                          Level {node.level} • {node.badgeLabel}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono font-black bg-purple text-white px-2 py-0.5 rounded-full shadow-sm">
                            BLOOMING
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-sm text-ink truncate group-hover:text-purple transition-colors">
                        {node.title.split(':')[0]}
                      </h3>
                      <p className="text-xs text-muted font-sans line-clamp-1">
                        {node.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Interactive Detail Bloom Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
            {/* 3D Header Emblem with Holographic Glow */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-4">
                {/* 3D Focal Glyph Orb */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-3xl text-white shadow-elevated relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 60%, #78350F 100%)',
                    border: '2px solid #FDE68A',
                    boxShadow: '0 8px 0px #451A03, 0 12px 24px rgba(180, 83, 9, 0.35)'
                  }}
                >
                  <span className="absolute inset-x-2 top-1 h-2.5 rounded-full bg-white/40" />
                  <span className="relative z-10">{activeNode.glyph}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-purple uppercase">
                      {activeNode.scriptName}
                    </span>
                    <button
                      onClick={() => {
                        playAcousticChime(580, 0.3);
                        playPronunciation(activeNode.spokenForm, activeNode.lang);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-light border border-purple/30 text-[11px] font-sans font-bold text-purple hover:bg-purple hover:text-white transition-all shadow-soft cursor-pointer"
                      title="Click to hear authentic audio pronunciation"
                    >
                      <Volume2 size={13} />
                      <span>Hear ({activeNode.glyph})</span>
                    </button>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-ink">
                    {activeNode.title}
                  </h3>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-mono uppercase text-muted">Audited XP</span>
                <span className="text-xs font-mono font-bold text-mint-dark">+{earnedXP} XP</span>
              </div>
            </div>

            {/* Stage Selector Tabs with 3D Tactile Push */}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => setActiveStep('learn')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  activeStep === 'learn'
                    ? 'btn-chunky-purple'
                    : 'bg-neutral text-muted border border-border hover:text-ink'
                }`}
              >
                📖 1. Learn & Trace
              </button>

              <button
                onClick={() => setActiveStep('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  activeStep === 'quiz'
                    ? 'btn-chunky-purple'
                    : 'bg-neutral text-muted border border-border hover:text-ink'
                }`}
              >
                🎯 2. Interactive Quiz {quizSubmitted && '✓'}
              </button>

              <button
                onClick={() => setActiveStep('deep')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  activeStep === 'deep'
                    ? 'btn-chunky-purple'
                    : 'bg-neutral text-muted border border-border hover:text-ink'
                }`}
              >
                📜 3. Deep Wisdom
              </button>
            </div>

            {/* STAGE 1: LEARN & TRACE */}
            {activeStep === 'learn' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-2"
              >
                <div className="space-y-2">
                  <h4 className="font-display text-xl font-black text-ink">
                    {activeNode.learnTitle}
                  </h4>
                  <p className="text-sm font-serif text-muted leading-relaxed">
                    {activeNode.learnExplanation}
                  </p>
                </div>

                {/* Cultural Heritage Card */}
                <div className="p-4 rounded-2xl bg-neutral/60 border border-border space-y-1">
                  <span className="text-[11px] font-display font-extrabold uppercase text-purple flex items-center gap-1">
                    <Lightbulb size={13} />
                    <span>Historical Scribal Lineage</span>
                  </span>
                  <p className="text-xs font-serif text-ink leading-relaxed">
                    {activeNode.culturalNote}
                  </p>
                </div>

                {/* Interactive Letter Anatomy Swatches with Audio Pronunciation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                      Interactive Glyph Anatomy (Click to hear sound):
                    </span>
                    <span className="text-[11px] font-serif text-purple flex items-center gap-1">
                      <Volume2 size={12} />
                      <span>Audio Enabled</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeNode.sampleWords.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playAcousticChime(520 + idx * 75, 0.25);
                          playPronunciation(sample.char, activeNode.lang);
                        }}
                        className="p-3 rounded-2xl bg-white border border-border hover:border-purple transition-all text-center space-y-1 shadow-soft cursor-pointer hover:-translate-y-1 group active:translate-y-0.5"
                        style={{ borderBottomWidth: '3px', borderBottomColor: '#DCCFB9' }}
                        title="Click to hear authentic sound"
                      >
                        <div className="flex items-center justify-center gap-1 text-[10px] text-muted group-hover:text-purple">
                          <Volume2 size={11} />
                          <span>Listen</span>
                        </div>
                        <span className="font-display text-2xl font-black text-ink block group-hover:text-purple">
                          {sample.char}
                        </span>
                        <span className="font-mono text-[10px] text-purple block font-semibold">
                          {sample.ipa}
                        </span>
                        <span className="text-[9px] font-sans text-muted block leading-tight">
                          {sample.gloss}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => setActiveStep('quiz')}
                    className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2"
                  >
                    <span>Proceed to Interactive Quiz</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: INTERACTIVE QUIZ */}
            {activeStep === 'quiz' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-2"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-purple uppercase">
                    Level {activeNode.level} Knowledge Check
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-black text-ink">
                    {activeNode.quizQuestion}
                  </h4>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {activeNode.quizOptions.map((opt, oIdx) => {
                    const isSelected = quizSelection === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(oIdx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-mint/60 border-mint-dark text-ink shadow-soft'
                              : 'bg-danger-light border-danger text-ink'
                            : 'bg-white border-border hover:border-purple/50'
                        }`}
                        style={{
                          borderBottomWidth: '3.5px',
                          borderBottomColor: isSelected
                            ? opt.isCorrect
                              ? '#059669'
                              : '#DC2626'
                            : '#DCCFB9'
                        }}
                      >
                        <div className="space-y-0.5">
                          <p className="font-display font-bold text-sm text-ink">{opt.text}</p>
                          <p className="text-xs font-sans text-muted">{opt.subtext}</p>
                        </div>
                        {isSelected && (
                          <span className="shrink-0 pt-0.5">
                            {opt.isCorrect ? (
                              <CheckCircle2 size={18} className="text-mint-dark" />
                            ) : (
                              <X size={18} className="text-danger" />
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Rewarding Feedback */}
                {quizSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-mint/40 border border-mint-dark/30 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-display font-black text-mint-dark">
                      <Award size={16} />
                      <span>{quizSelection !== null && activeNode.quizOptions[quizSelection]?.isCorrect ? 'Splendid! +50 XP Awarded' : 'Insightful Exploration!'}</span>
                    </div>
                    <p className="text-xs font-serif text-ink leading-relaxed">
                      {activeNode.quizExplanation}
                    </p>
                  </motion.div>
                )}

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <button
                    onClick={() => { setQuizSelection(null); setQuizSubmitted(false); }}
                    className="text-xs font-sans text-muted hover:text-ink inline-flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    <span>Reset Quiz</span>
                  </button>

                  <button
                    onClick={() => setActiveStep('deep')}
                    className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2"
                  >
                    <span>Unpack Deep Wisdom</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: DEEP WISDOM */}
            {activeStep === 'deep' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-2"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-purple uppercase">
                    Wisdom & Living Tradition
                  </span>
                  <h4 className="font-display text-2xl font-black text-ink">
                    {activeNode.deepTitle}
                  </h4>
                  <p className="text-sm font-serif text-muted leading-relaxed">
                    {activeNode.deepLore}
                  </p>
                </div>

                {/* Dialect Respect & Interactive Acoustic Audition */}
                <div className="p-4 rounded-2xl bg-purple-light/40 border border-purple/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-display font-extrabold uppercase text-purple flex items-center gap-1.5">
                      <Volume2 size={14} />
                      <span>Dialect Respect & Spoken Variety</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold text-muted">Acoustic Audio</span>
                  </div>
                  <p className="text-xs font-serif text-ink leading-relaxed">
                    {activeNode.dialectInsight}
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        playAcousticChime(540, 0.25);
                        playPronunciation(activeNode.spokenForm, activeNode.lang);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-border text-xs font-display font-bold text-ink hover:border-purple inline-flex items-center gap-1.5 shadow-soft cursor-pointer active:translate-y-0.5"
                    >
                      <Volume2 size={13} className="text-purple" />
                      <span>Hear Standard ({activeNode.glyph})</span>
                    </button>
                    <button
                      onClick={() => {
                        playAcousticChime(480, 0.25);
                        playPronunciation(activeNode.dialectSample.text, activeNode.dialectSample.lang);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-border text-xs font-display font-bold text-ink hover:border-purple inline-flex items-center gap-1.5 shadow-soft cursor-pointer active:translate-y-0.5"
                    >
                      <Radio size={13} className="text-purple" />
                      <span>{activeNode.dialectSample.label}</span>
                    </button>
                  </div>
                </div>

                {/* Formally Codified Sabha Rule */}
                <div className="p-4 rounded-2xl bg-neutral/80 border border-border space-y-1">
                  <span className="text-[10px] font-mono font-black uppercase text-muted">
                    Ratified Sabha Principle
                  </span>
                  <p className="text-xs font-mono font-bold text-ink">
                    {activeNode.communityRule}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <button
                    onClick={() => {
                      const currIdx = knowledgeNodes.findIndex((n) => n.id === selectedNodeId);
                      const nextNode = knowledgeNodes[(currIdx + 1) % knowledgeNodes.length];
                      handleSelectNode(nextNode.id);
                    }}
                    className="btn-chunky-purple px-6 py-2.5 text-xs inline-flex items-center gap-2"
                  >
                    <span>Next Branch on the Tree</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          LINK TO PAGE 2 (प्रयोग शाला)
          ======================================================== */}
      <section className="py-12 bg-neutral/50 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-purple">
            Dedicated Workbench
          </span>
          <h3 className="font-display text-2xl font-black text-ink">
            Ready to test your orthography rules?
          </h3>
          <p className="text-xs sm:text-sm font-serif text-muted max-w-xl mx-auto leading-relaxed">
            Visit the dedicated Script Testing Studio to type with tactile glyph keys, validate sentences against community rules, and run consistency audits.
          </p>
          <div className="pt-2">
            <Link
              to="/lab"
              className="btn-chunky-purple px-7 py-3 text-xs inline-flex items-center gap-2"
            >
              <FlaskConical size={16} />
              <span>Enter प्रयोग शाला (Test & Verify Studio)</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-white border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <span className="font-display text-xl font-black text-ink block">
            Lipi Sabha
          </span>
          <p className="text-xs font-serif text-muted">
            &ldquo;The community is the decision-maker, not just the dataset.&rdquo;
          </p>
        </div>
      </footer>
    </div>
  );
}
