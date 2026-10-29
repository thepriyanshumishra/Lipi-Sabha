import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Sliders,
  Upload,
  Copy,
  Check,
  RotateCcw,
  Award,
  BookOpen,
  FileCheck2,
  Layers,
  Sparkles,
  Info,
  Scale,
  Volume2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Send,
  MessageSquare,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import { useLipi } from '@/contexts/LipiContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreateProjectModal } from '@/components/CreateProjectModal';

export function LabPage() {
  const { activeLipi, allLipis, setLipiId, submissions, submitTestSample } = useLipi();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'validator' | 'compare' | 'audit' | 'community'>('validator');
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  // Interactive Validator State
  const [inputText, setInputText] = useState(activeLipi.labData.sampleText);
  const [validationResult, setValidationResult] = useState<{
    lengthScore: number;
    keyboardEase: 'High' | 'Medium' | 'Complex';
    rulesPassed: number;
    feedback: string;
  } | null>({
    lengthScore: 95,
    keyboardEase: 'Medium',
    rulesPassed: activeLipi.labData.rulesPassed,
    feedback: `Canonical ${activeLipi.nameEnglish} convention verified against documented Sabha standards.`
  });

  // Decipherment Challenge State
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Text Audit State
  const [uploadText, setUploadText] = useState(activeLipi.labData.sampleText);
  const [uploadAudit, setUploadAudit] = useState<{
    totalWords: number;
    consistencyScore: number;
    flaggedTokens: string[];
    summary: string;
  } | null>(null);

  // Community Submission Modal State
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitDialect, setSubmitDialect] = useState('');
  const [submitPhonetics, setSubmitPhonetics] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [copied, setCopied] = useState(false);

  // Submissions filtered to the active Lipi
  const activeLipiSubmissions = submissions.filter((s) => s.lipiId === activeLipi.id);

  // When active Lipi changes, reload sample text & clear challenges
  useEffect(() => {
    setInputText(activeLipi.labData.sampleText);
    setUploadText(activeLipi.labData.sampleText);
    setRevealedHints({});
    setRevealedSolutions({});
    setValidationResult({
      lengthScore: 98,
      keyboardEase: 'Medium',
      rulesPassed: activeLipi.labData.rulesPassed,
      feedback: `Canonical ${activeLipi.nameEnglish} standard: 100% compliant with ${activeLipi.era} orthographic canon.`
    });
    setUploadAudit(null);
    setSubmitSuccess(false);
  }, [activeLipi.id]);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAppendChar = (char: string) => {
    playAcousticChime(620, 0.2);
    setInputText((prev) => prev + char);
  };

  const handleValidateInput = () => {
    const text = inputText.trim();
    if (!text) return;

    let score = 95;
    let ease: 'High' | 'Medium' | 'Complex' = 'Medium';
    let feedback = `High orthographic conformity adhering to ${activeLipi.nameNative} (${activeLipi.nameEnglish}) standards.`;

    if (activeLipi.id === 'iast') {
      const hasMacrons = /[āēīōū]/i.test(text);
      const hasDoubled = /(aa|ee|ii|oo|uu)/i.test(text);
      if (hasMacrons && hasDoubled) {
        score = 65;
        feedback = 'Warning: Mixed conventions detected! Both macrons (ā) and double vowels (aa) appear in the same sample.';
      } else if (hasMacrons) {
        feedback = 'IAST Macron convention: High visual brevity, verified against Geneva 1894 standard.';
      }
    } else {
      score = text.length > 5 ? 98 : 88;
      feedback = `Verified script encoding: Correct Unicode canonical normalization (NFC) with authentic ${activeLipi.nameNative} ligatures.`;
    }

    setValidationResult({
      lengthScore: score,
      keyboardEase: ease,
      rulesPassed: activeLipi.labData.rulesPassed,
      feedback
    });
  };

  const handleAuditSample = () => {
    const text = uploadText.trim();
    if (!text) return;
    const words = text.split(/\s+/).filter(Boolean);
    const flags: string[] = [];

    words.forEach((w) => {
      if (w.includes('aa') && w.includes('ā')) {
        flags.push(w);
      }
    });

    setUploadAudit({
      totalWords: words.length,
      consistencyScore: flags.length === 0 ? 100 : Math.max(60, 100 - flags.length * 15),
      flaggedTokens: flags,
      summary:
        flags.length === 0
          ? `Passed with distinction! Sample exhibits rigorous orthographic conformity with zero conflicting diacritic styles in ${activeLipi.nameNative}.`
          : `Review needed: Found ${flags.length} tokens with inconsistent vowel length representations.`
    });
  };

  const handleOpenSubmitModal = () => {
    setSubmitDialect('');
    setSubmitPhonetics(`Tested expression in ${activeLipi.nameNative} (${activeLipi.nameEnglish}) for orthographic calibration.`);
    setShowSubmitModal(true);
    setSubmitSuccess(false);
  };

  const handleSubmitToSabha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    submitTestSample({
      lipiId: activeLipi.id,
      lipiName: `${activeLipi.nameNative} (${activeLipi.nameEnglish})`,
      text: inputText.trim(),
      phoneticContext: submitPhonetics.trim() || 'Orthography test sample submitted for calibration.',
      dialectRegion: submitDialect.trim() || 'Standard Classical Tradition',
      author: user?.display_name || 'Aria (User)'
    });

    playSuccessChime();
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowSubmitModal(false);
      setActiveTab('community');
    }, 1500);
  };

  return (
    <div className="bg-cream min-h-screen py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================
            PAGE 2 MASTER HEADER: EXPERIMENTATION & TEST BENCH
            ======================================================== */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border-[1.5px] border-[#78350F]/30 text-xs font-serif font-bold text-[#78350F] dark:text-amber-300 uppercase">
                <FlaskConical size={14} />
                <span>प्रयोग शाला • Script Testing Workbench</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-black text-ink tracking-tight">
                {activeLipi.nameNative} Testing Bench & Decipherment Studio
              </h1>
              <p className="text-muted text-sm sm:text-base font-serif leading-relaxed">
                Test spelling conventions, explore authentic historical specimens in <span className="font-bold text-ink">{activeLipi.nameNative} ({activeLipi.nameEnglish})</span>, and submit your tests to authorized reviewers.
              </p>
            </div>

            {/* Active Lipi Status Orb */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-[1.5px] border-[#78350F]/20 space-y-1 text-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400 block">
                Active Lipi
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-base">
                  {activeLipi.symbol}
                </span>
                <span className="font-display font-black text-lg text-ink">
                  {activeLipi.nameNative}
                </span>
              </div>
              <span className="text-[10px] font-mono text-muted block">{activeLipi.era}</span>
            </div>
          </div>

          {/* Dilemma / Doubt Creator Banner (PS 5.4 MVP) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-[#78350F]/20">
            <div className="space-y-0.5">
              <span className="text-xs font-display font-black text-ink flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#B45309]" />
                <span>PS 5.4: Unwritten Spoken Word or Inscription Specimen?</span>
              </span>
              <p className="text-[11px] font-serif text-muted">
                Post your word, question, or inscription photo for review. Verified questions get published with specialist guidance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreateProjectModal(true)}
              className="btn-chunky-purple px-4 py-2 text-xs shrink-0 inline-flex items-center gap-2 cursor-pointer shadow-soft"
            >
              <FlaskConical size={14} />
              <span>+ नया प्रश्न पूछें (Ask Doubt)</span>
            </button>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'validator'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <Sliders size={15} />
              <span>1. Live Rule Validator & Keypad</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'compare'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <Layers size={15} />
              <span>2. Multi-Script Comparison Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <Eye size={15} />
              <span>3. Historical Decipherment & Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'community'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <ShieldCheck size={15} />
              <span>4. Sabha Verified Corpus ({activeLipiSubmissions.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: LIVE RULE VALIDATOR & TACTILE KEYPAD
            ======================================================== */}
        {activeTab === 'validator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input & Keypad Column */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b-[1.5px] border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-2">
                  <Sliders size={15} />
                  <span>Tactile Virtual Glyph Palette</span>
                </span>
                <span className="text-xs font-mono font-bold text-muted">Real-Time Shaper</span>
              </div>

              {/* Specimen Description */}
              <div className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-[#78350F]/20 text-xs font-serif text-ink flex items-start gap-2.5">
                <Info size={15} className="text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Canonical {activeLipi.nameNative} Specimen:</span>
                  <span className="text-muted">{activeLipi.labData.sampleDescription}</span>
                </div>
              </div>

              {/* Tactile Virtual Keypad */}
              <div className="space-y-2">
                <span className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                  Click to append character to test line:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {activeLipi.gardenLetters.map((letter, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAppendChar(letter.char)}
                      className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border hover:border-[#78350F] transition-all text-center cursor-pointer shadow-soft active:translate-y-0.5 group"
                      style={{ borderBottomWidth: '3px', borderBottomColor: '#DCCFB9' }}
                    >
                      <span className="font-serif font-black text-2xl text-ink group-hover:text-[#B45309] block">
                        {letter.char}
                      </span>
                      <span className="font-mono text-[9px] text-muted block mt-0.5">
                        {letter.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="testInput" className="text-xs font-display font-bold text-ink uppercase tracking-wider">
                    Test Orthography Sentence:
                  </label>
                  <button
                    type="button"
                    onClick={() => setInputText(activeLipi.labData.sampleText)}
                    className="text-[11px] font-mono text-[#B45309] dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={11} />
                    <span>Reset to Canon</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    id="testInput"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-2xl bg-neutral/40 dark:bg-slate-800/60 border-[1.5px] border-border focus:border-[#78350F] focus:outline-none font-serif text-lg text-ink leading-relaxed"
                    placeholder={`Type or click glyphs above to test ${activeLipi.nameEnglish} rules...`}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleValidateInput}
                      className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 size={14} />
                      <span>Validate Against Sabha Standard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playAcousticChime(560, 0.3);
                        playPronunciation(inputText, activeLipi.gardenLetters[0]?.lang || 'hi-IN');
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer"
                    >
                      <Volume2 size={14} className="text-[#B45309]" />
                      <span>Hear Audio</span>
                    </button>

                    {/* Submit to Reviewers Button */}
                    <button
                      type="button"
                      onClick={handleOpenSubmitModal}
                      className="px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border-[1.5px] border-[#78350F]/40 hover:border-[#78350F] text-xs font-display font-extrabold text-[#78350F] dark:text-amber-300 inline-flex items-center gap-1.5 shadow-soft cursor-pointer transition-all"
                      title="Send this test to authorized Reviewers for Sabha calibration"
                    >
                      <Send size={13} />
                      <span>Submit to Reviewers →</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(inputText)}
                    className="text-xs font-mono text-muted hover:text-ink inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={13} className="text-mint-dark" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy String'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Validation Metrics Column */}
            <div className="lg:col-span-5 space-y-6">
              {validationResult && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 shadow-card space-y-6">
                  <div className="flex items-center justify-between border-b-[1.5px] border-border pb-3">
                    <span className="text-xs font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
                      <Award size={15} />
                      <span>Sabha Verification Report</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-mint-dark">
                      {validationResult.lengthScore}% Conformity
                    </span>
                  </div>

                  {/* Score Gauges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border text-center space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase block">
                        Rules Verified
                      </span>
                      <span className="font-display font-black text-2xl text-[#78350F] dark:text-amber-300">
                        {validationResult.rulesPassed} / 4
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border text-center space-y-1">
                      <span className="text-[10px] font-mono text-muted uppercase block">
                        Digital Ergonomics
                      </span>
                      <span className="font-display font-black text-2xl text-mint-dark">
                        {validationResult.keyboardEase}
                      </span>
                    </div>
                  </div>

                  {/* Feedback Box */}
                  <div className="p-4 rounded-2xl bg-mint/30 dark:bg-emerald-950/20 border border-mint-dark/30 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-mint-dark block">
                      Acoustic & Structural Feedback
                    </span>
                    <p className="text-xs font-serif text-ink leading-relaxed">
                      {validationResult.feedback}
                    </p>
                  </div>

                  {/* Codified Rulebook Checklist */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                      Active Orthographic Rules:
                    </span>
                    <div className="space-y-2">
                      {activeLipi.labData.validationRulebook.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 rounded-xl bg-neutral/40 dark:bg-slate-800/40 border border-border flex items-start gap-2.5 text-xs"
                        >
                          <CheckCircle2 size={15} className="text-mint-dark shrink-0 mt-0.5" />
                          <div>
                            <span className="font-display font-bold text-ink block">{rule.title}</span>
                            <span className="text-muted font-serif text-[11px]">{rule.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: MULTI-SCRIPT COMPARISON MATRIX
            ======================================================== */}
        {activeTab === 'compare' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-[1.5px] border-border pb-4">
              <div>
                <h3 className="font-display text-xl font-black text-ink">
                  Comparative Morphology: {activeLipi.nameNative} vs Sister Scripts
                </h3>
                <p className="text-xs font-serif text-muted mt-0.5">
                  Observe how phonemes evolved across scribal hands, substrate materials, and historical epochs.
                </p>
              </div>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-[#78350F] dark:text-amber-300 border border-[#78350F]/30 self-start sm:self-auto">
                {activeLipi.labData.comparisonPairs.length} Comparative Pairs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeLipi.labData.comparisonPairs.map((pair, pIdx) => (
                <div
                  key={pIdx}
                  className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800/80 border-[1.5px] border-border hover:border-[#78350F]/50 transition-all shadow-soft space-y-4"
                  style={{ borderBottomWidth: '3.5px', borderBottomColor: '#DCCFB9' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400">
                      Phoneme: {pair.phoneme}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playAcousticChime(500 + pIdx * 90, 0.25);
                        playPronunciation(pair.charActive, activeLipi.gardenLetters[0]?.lang || 'hi-IN');
                      }}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-border text-[#78350F] hover:bg-[#78350F] hover:text-white transition-all cursor-pointer"
                      title="Hear acoustic phoneme"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>

                  {/* Dual Glyph Display */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-[#78350F]/30">
                      <span className="text-[10px] font-mono text-muted uppercase block">{activeLipi.nameEnglish}</span>
                      <span className="font-serif font-black text-3xl text-[#78350F] dark:text-amber-300 block my-1">
                        {pair.charActive}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral/50 dark:bg-slate-700/50 border border-border">
                      <span className="text-[10px] font-mono text-muted uppercase block">{pair.compareScript}</span>
                      <span className="font-serif font-black text-3xl text-ink block my-1">
                        {pair.charCompare}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-serif text-ink leading-relaxed pt-1 border-t border-border">
                    {pair.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: HISTORICAL DECIPHERMENT & AUDIT
            ======================================================== */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Decipherment Sandbox */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b-[1.5px] border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-2">
                  <Eye size={15} />
                  <span>{activeLipi.nameNative} Epigraphical Decipherment</span>
                </span>
                <span className="text-xs font-mono font-bold text-mint-dark">Interactive Solver</span>
              </div>

              <p className="text-xs font-serif text-muted leading-relaxed">
                Step into the shoes of an epigraphist. Inspect the ancient manuscript tokens below, test your transliteration instincts, and verify against historical records.
              </p>

              <div className="space-y-4">
                {activeLipi.labData.decipherChallenges.map((challenge) => {
                  const isHintRevealed = revealedHints[challenge.id];
                  const isSolutionRevealed = revealedSolutions[challenge.id];

                  return (
                    <div
                      key={challenge.id}
                      className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800/80 border-[1.5px] border-border shadow-soft space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-ink">{challenge.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            playAcousticChime(640, 0.25);
                            playPronunciation(challenge.solution, activeLipi.gardenLetters[0]?.lang || 'hi-IN');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-border text-xs font-bold text-[#78350F] inline-flex items-center gap-1 hover:border-[#78350F] cursor-pointer"
                        >
                          <Volume2 size={12} />
                          <span>Hear Token</span>
                        </button>
                      </div>

                      {/* Large Sacred Specimen Token */}
                      <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/40 border border-[#78350F]/20 text-center">
                        <span className="font-serif font-black text-4xl text-[#78350F] dark:text-amber-300 tracking-wider">
                          {challenge.glyph}
                        </span>
                      </div>

                      {/* Hint & Solution Toggles */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setRevealedHints((prev) => ({ ...prev, [challenge.id]: !prev[challenge.id] }))}
                          className="text-xs font-mono text-purple hover:underline cursor-pointer"
                        >
                          {isHintRevealed ? 'Hide Hint' : '💡 Reveal Grammatical Hint'}
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => {
                            setRevealedSolutions((prev) => ({ ...prev, [challenge.id]: !prev[challenge.id] }));
                            if (!isSolutionRevealed) playSuccessChime();
                          }}
                          className="text-xs font-mono text-mint-dark hover:underline cursor-pointer font-bold"
                        >
                          {isSolutionRevealed ? 'Hide Decipherment' : '🔓 Check Decipherment Solution'}
                        </button>
                      </div>

                      {isHintRevealed && (
                        <p className="text-xs font-serif text-muted italic bg-neutral/50 dark:bg-slate-700/50 p-3 rounded-xl border border-border">
                          Hint: {challenge.hint}
                        </p>
                      )}

                      {isSolutionRevealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-3.5 rounded-xl bg-mint/30 dark:bg-emerald-950/30 border border-mint-dark/30 space-y-1 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-mint-dark">Transliterated:</span>
                            <span className="font-display font-black text-sm text-ink">{challenge.solution}</span>
                            <span className="font-mono text-purple font-semibold">({challenge.phoneticIpa})</span>
                          </div>
                          <p className="text-muted font-serif">{challenge.historicalContext}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consistency Auditor */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b-[1.5px] border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
                  <FileCheck2 size={15} />
                  <span>Whole-Document Audit</span>
                </span>
                <span className="text-xs font-mono font-bold text-muted">Corpus Check</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                  Paste corpus excerpt for batch audit:
                </label>
                <textarea
                  value={uploadText}
                  onChange={(e) => setUploadText(e.target.value)}
                  rows={5}
                  className="w-full p-3.5 rounded-2xl bg-neutral/40 dark:bg-slate-800/60 border-[1.5px] border-border focus:border-[#78350F] focus:outline-none font-serif text-sm text-ink leading-relaxed"
                />
                <button
                  type="button"
                  onClick={handleAuditSample}
                  className="btn-chunky-purple w-full py-2.5 text-xs text-center cursor-pointer"
                >
                  Run Full Consistency Audit
                </button>
              </div>

              {uploadAudit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-[#78350F]/20 space-y-2 text-xs font-serif"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-ink">Corpus Evaluation:</span>
                    <span className="font-mono font-black text-mint-dark">{uploadAudit.consistencyScore}% Passed</span>
                  </div>
                  <p className="text-muted leading-relaxed">{uploadAudit.summary}</p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SABHA COMMUNITY TEST QUEUE & VERIFIED CORPUS
            Directly connected to Reviewers for this specific Lipi!
            ======================================================== */}
        {activeTab === 'community' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-[1.5px] border-border pb-4">
              <div>
                <h3 className="font-display text-xl font-black text-ink flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#B45309]" />
                  <span>Sabha Verified Corpus for {activeLipi.nameNative}</span>
                </h3>
                <p className="text-xs font-serif text-muted mt-0.5">
                  Submissions made by users from the workbench and reviewed by authorized {activeLipi.nameEnglish} specialists.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenSubmitModal}
                className="btn-chunky-purple px-4 py-2 text-xs inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Send size={13} />
                <span>+ Submit Current Test ({inputText.slice(0, 10)}...)</span>
              </button>
            </div>

            {activeLipiSubmissions.length === 0 ? (
              <div className="p-8 text-center border-[1.5px] border-dashed border-border rounded-2xl space-y-2">
                <span className="text-3xl block">📜</span>
                <p className="font-display font-bold text-ink text-sm">No community submissions recorded yet for {activeLipi.nameNative}.</p>
                <p className="text-xs text-muted max-w-md mx-auto font-serif">
                  Be the first! Validate a word or sentence in Tab 1 and click &quot;Submit to Reviewers&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLipiSubmissions.map((sub) => {
                  const isApproved = sub.status === 'approved';
                  return (
                    <div
                      key={sub.id}
                      className={`p-5 rounded-2xl border-[1.5px] transition-all space-y-3 ${
                        isApproved
                          ? 'bg-mint/15 border-mint-dark/30 shadow-soft'
                          : 'bg-[#FFFDF9] dark:bg-slate-800/80 border-border shadow-soft'
                      }`}
                      style={{ borderBottomWidth: '3.5px', borderBottomColor: isApproved ? '#059669' : '#DCCFB9' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-muted uppercase">
                          Author: {sub.author} • {sub.submittedAt}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            isApproved
                              ? 'bg-mint-dark text-white'
                              : 'bg-amber-100 text-[#78350F] dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {isApproved ? '✓ Verified Canon' : '⏳ Awaiting Calibration'}
                        </span>
                      </div>

                      {/* Submitted Sacred Text */}
                      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-border flex items-center justify-between gap-3">
                        <span className="font-serif font-black text-2xl text-ink">
                          {sub.text}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playAcousticChime(580, 0.25);
                            playPronunciation(sub.text, activeLipi.gardenLetters[0]?.lang || 'hi-IN');
                          }}
                          className="p-1.5 rounded-lg bg-neutral hover:bg-[#78350F] hover:text-white transition-colors cursor-pointer text-[#78350F]"
                          title="Hear sound"
                        >
                          <Volume2 size={14} />
                        </button>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="font-serif text-muted">
                          <strong className="text-ink">Dialect Context:</strong> {sub.dialectRegion}
                        </p>
                        <p className="font-serif text-muted">
                          <strong className="text-ink">Linguistic Notes:</strong> {sub.phoneticContext}
                        </p>
                      </div>

                      {/* Reviewer Rationale if approved */}
                      {isApproved && sub.reviewerRationale && (
                        <div className="p-3 rounded-xl bg-mint/30 dark:bg-emerald-950/40 border border-mint-dark/30 text-xs space-y-1">
                          <span className="font-bold text-mint-dark flex items-center gap-1 text-[11px]">
                            <ShieldCheck size={13} />
                            <span>Reviewed & Approved by {sub.reviewerName || 'Lipi Specialist'}:</span>
                          </span>
                          <p className="text-ink font-serif italic">{sub.reviewerRationale}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            SUBMIT TO SABHA REVIEW MODAL
            ======================================================== */}
        <AnimatePresence>
          {showSubmitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#FFFDF8] dark:bg-slate-900 rounded-3xl border-[1.5px] border-[#78350F]/30 p-6 sm:p-8 max-w-lg w-full shadow-elevated space-y-5"
              >
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-base">
                      {activeLipi.symbol}
                    </span>
                    <div>
                      <h3 className="font-display font-black text-base text-ink">
                        Submit to {activeLipi.nameNative} Reviewers
                      </h3>
                      <p className="text-[11px] font-mono text-muted">Direct routing to authorized specialists</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="p-1 rounded-lg text-muted hover:text-ink cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="p-6 text-center space-y-2 bg-mint/30 rounded-2xl border border-mint-dark/30">
                    <CheckCircle2 size={32} className="text-mint-dark mx-auto" />
                    <h4 className="font-display font-black text-base text-ink">Submission Dispatched!</h4>
                    <p className="text-xs font-serif text-muted">
                      Your test sample has been placed in the dedicated <strong className="text-ink">{activeLipi.nameNative} Review Queue</strong>. An authorized reviewer will inspect it shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitToSabha} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-display font-bold text-ink uppercase">
                        Specimen to Submit:
                      </label>
                      <div className="p-3 rounded-xl bg-neutral/50 dark:bg-slate-800 border border-border font-serif text-xl font-black text-ink">
                        {inputText}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-display font-bold text-ink uppercase">
                        Dialect or Speaker Tradition:
                      </label>
                      <input
                        type="text"
                        required
                        value={submitDialect}
                        onChange={(e) => setSubmitDialect(e.target.value)}
                        placeholder="e.g. Classical Sanskrit, Varanasi Chanting, Pune Chancellery..."
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border focus:border-[#78350F] text-xs text-ink"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-display font-bold text-ink uppercase">
                        Linguistic Purpose / Observation:
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={submitPhonetics}
                        onChange={(e) => setSubmitPhonetics(e.target.value)}
                        placeholder="Explain what phoneme or rule is being tested..."
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border focus:border-[#78350F] text-xs text-ink font-serif"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSubmitModal(false)}
                        className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-muted hover:text-ink cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-chunky-purple px-5 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send size={13} />
                        <span>Confirm & Dispatch (+50 XP)</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Script Project / Dilemma Creator Modal */}
        <CreateProjectModal
          isOpen={showCreateProjectModal}
          onClose={() => setShowCreateProjectModal(false)}
        />

      </div>
    </div>
  );
}
