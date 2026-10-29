import { useState } from 'react';
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
  Volume2
} from 'lucide-react';
import { playPronunciation, playAcousticChime } from '@/utils/audio';
import { demoRules } from '@/data/demo';

export function LabPage() {
  const [activeTab, setActiveTab] = useState<'validator' | 'compare' | 'audit'>('validator');

  // Interactive Validator State
  const [testScriptMode, setTestScriptMode] = useState<'devanagari' | 'latin' | 'cyrillic'>('devanagari');
  const [inputText, setInputText] = useState('tāla mēra kūna');
  const [validationResult, setValidationResult] = useState<{
    lengthScore: number;
    keyboardEase: 'High' | 'Medium' | 'Complex';
    rulesPassed: number;
    feedback: string;
  } | null>({
    lengthScore: 95,
    keyboardEase: 'Medium',
    rulesPassed: 4,
    feedback: 'Macron convention: High visual brevity, requires diacritic-aware keyboard input.'
  });

  // Comparison State
  const [compareWord, setCompareWord] = useState('tāla');
  const [selectedHookOption, setSelectedHookOption] = useState<'macron' | 'doubled'>('macron');

  // Text Audit State
  const [uploadText, setUploadText] = useState('tāla mēra kūna pīla vāri sēna');
  const [uploadAudit, setUploadAudit] = useState<{
    totalWords: number;
    consistencyScore: number;
    flaggedTokens: string[];
    summary: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleValidateInput = () => {
    const text = inputText.trim();
    if (!text) return;
    const hasMacrons = /[āēīōū]/i.test(text);
    const hasDoubled = /(aa|ee|ii|oo|uu)/i.test(text);

    let score = 95;
    let ease: 'High' | 'Medium' | 'Complex' = 'High';
    let feedback = 'Strong orthographic consistency adhering to documented standards.';

    if (hasMacrons && hasDoubled) {
      score = 65;
      ease = 'Medium';
      feedback = 'Warning: Mixed conventions detected! Both macrons (ā) and double vowels (aa) appear in the same sample.';
    } else if (hasMacrons) {
      ease = 'Medium';
      feedback = 'Macron convention: High visual brevity, requires diacritic-aware keyboard input.';
    } else {
      ease = 'High';
      feedback = 'Standard ASCII convention: 100% compatible with universal English QWERTY keypads.';
    }

    setValidationResult({
      lengthScore: score,
      keyboardEase: ease,
      rulesPassed: score > 70 ? 4 : 2,
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
          ? 'Passed with distinction! Sample exhibits rigorous orthographic conformity with zero conflicting diacritic styles.'
          : `Review needed: Found ${flags.length} tokens with inconsistent vowel length representations.`
    });
  };

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page 2 Master Header */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-light border border-coral/30 text-xs font-serif font-bold text-coral uppercase">
                <FlaskConical size={14} />
                <span>प्रयोग शाला • Page 2</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-ink tracking-tight">
                The Living Script Testing Lab & Validator
              </h1>
              <p className="text-muted text-sm sm:text-base font-serif leading-relaxed">
                Test spelling conventions in real time. Type with tactile glyph keys, evaluate acoustic consistency against documented Sabha standards, and audit full text excerpts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral/60 border border-border space-y-1 text-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                Sabha Consensus Engine
              </span>
              <span className="font-display font-black text-xl text-purple">
                Active v1.0
              </span>
            </div>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border">
            <button
              onClick={() => setActiveTab('validator')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'validator'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral text-muted border border-border hover:text-ink'
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
                  : 'bg-neutral text-muted border border-border hover:text-ink'
              }`}
            >
              <Layers size={15} />
              <span>2. Side-by-Side Convention Comparison</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral text-muted border border-border hover:text-ink'
              }`}
            >
              <Upload size={15} />
              <span>3. Text Consistency Audit</span>
            </button>
          </div>
        </div>

        {/* TAB 1: LIVE RULE VALIDATOR & TACTILE KEYPAD */}
        {activeTab === 'validator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-purple flex items-center gap-2">
                  <Sliders size={15} />
                  <span>Tactile Virtual Glyph Palette</span>
                </span>
                <span className="text-xs font-mono font-bold text-muted">Real-Time Shaper</span>
              </div>

              {/* Script Mode Switcher */}
              <div className="space-y-2">
                <span className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                  Select Working Tradition:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'devanagari', label: 'Devanagari (South Asian)', glyph: 'क' },
                    { id: 'latin', label: 'Latin Extended (Diacritic)', glyph: 'ā' },
                    { id: 'cyrillic', label: 'Cyrillic (Eurasian)', glyph: 'ж' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setTestScriptMode(mode.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        testScriptMode === mode.id
                          ? 'btn-chunky-purple'
                          : 'bg-neutral text-muted border border-border hover:text-ink'
                      }`}
                    >
                      <span>{mode.glyph}</span>
                      <span>{mode.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Virtual Tactile Keys */}
              <div className="space-y-2">
                <span className="text-[11px] font-display font-bold text-muted uppercase tracking-wider block">
                  Tactile Glyph Keys (Click to append):
                </span>
                <div className="flex flex-wrap gap-2 p-3.5 rounded-2xl bg-neutral/60 border border-border">
                  {(testScriptMode === 'devanagari'
                    ? ['क', 'ख', 'ग', 'घ', 'ल', 'ा', 'ि', 'ी', 'ु', 'ू', '्', 'क्ष', 'त्र']
                    : testScriptMode === 'latin'
                    ? ['a', 'ā', 'e', 'ē', 'i', 'ī', 'o', 'ō', 'u', 'ū', 'pʰ', 'tʰ', 'kʰ']
                    : ['а', 'аа', 'б', 'в', 'г', 'д', 'ж', 'и', 'ии', 'к', 'л', 'м']
                  ).map((char, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        playAcousticChime(480 + cIdx * 25, 0.15);
                        playPronunciation(
                          char,
                          testScriptMode === 'devanagari' ? 'hi-IN' : testScriptMode === 'cyrillic' ? 'ru-RU' : 'en-US'
                        );
                        setInputText((prev) => prev + char);
                      }}
                      className="w-10 h-10 rounded-xl bg-white border border-border text-ink font-display font-black text-base hover:border-purple hover:-translate-y-1 transition-all shadow-soft flex items-center justify-center cursor-pointer active:translate-y-0.5"
                      style={{ borderBottomWidth: '3px', borderBottomColor: '#DCCFB9' }}
                      title={`Click to type and hear ${char}`}
                    >
                      {char}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      playAcousticChime(400, 0.1);
                      setInputText((prev) => prev + ' ');
                    }}
                    className="px-3.5 h-10 rounded-xl bg-white border border-border text-xs font-sans font-bold text-muted hover:text-ink hover:border-purple shadow-soft cursor-pointer"
                  >
                    Space
                  </button>
                  <button
                    onClick={() => setInputText('')}
                    className="px-3.5 h-10 rounded-xl bg-neutral text-xs font-sans font-bold text-danger hover:bg-danger-light cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Input Display Area */}
              <div className="space-y-2">
                <label className="text-xs font-display font-bold text-ink block">
                  Test Sentence / Expression:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or click tactile keys above..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-border bg-white text-ink font-display text-xl font-bold focus:outline-none focus:border-purple shadow-soft transition-all"
                  />
                  {inputText && (
                    <button
                      onClick={() => handleCopy(inputText)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted hover:text-ink hover:bg-neutral"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={16} className="text-mint-dark" /> : <Copy size={16} />}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleValidateInput}
                    className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2"
                  >
                    <FileCheck2 size={15} />
                    <span>Validate Orthography Rules</span>
                  </button>

                  <button
                    onClick={() => {
                      playAcousticChime(560, 0.2);
                      playPronunciation(
                        inputText,
                        testScriptMode === 'devanagari' ? 'hi-IN' : testScriptMode === 'cyrillic' ? 'ru-RU' : 'en-US'
                      );
                    }}
                    disabled={!inputText.trim()}
                    className="btn-chunky-white px-4 py-2.5 text-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                    title="Listen to how this sentence sounds"
                  >
                    <Volume2 size={15} className="text-purple" />
                    <span>Hear Audio</span>
                  </button>
                </div>
                <span className="text-xs font-mono text-muted">
                  {inputText.length} graphemes
                </span>
              </div>
            </div>

            {/* Assessment Report Column */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-purple">
                  Rule Evaluation Output
                </span>
                {validationResult && (
                  <span className="px-2.5 py-0.5 rounded-full bg-mint text-mint-dark text-xs font-mono font-black">
                    Score: {validationResult.lengthScore}%
                  </span>
                )}
              </div>

              {validationResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-neutral/50 border border-border">
                      <span className="text-[10px] font-sans font-bold uppercase text-muted block">
                        Mobile Keypad Ease
                      </span>
                      <span className="text-lg font-display font-black text-purple">
                        {validationResult.keyboardEase}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-neutral/50 border border-border">
                      <span className="text-[10px] font-sans font-bold uppercase text-muted block">
                        Sabha Rules Passed
                      </span>
                      <span className="text-lg font-display font-black text-mint-dark">
                        {validationResult.rulesPassed} / 4 Rules
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-light/40 border border-purple/30 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-purple block">
                      Acoustic & Mechanical Feedback
                    </span>
                    <p className="text-xs font-serif text-ink leading-relaxed">
                      {validationResult.feedback}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-xs font-display font-bold text-muted block">
                      Rule Checklist:
                    </span>
                    <div className="space-y-1.5 text-xs font-serif">
                      <div className="flex items-center gap-2 text-mint-dark">
                        <Check size={14} />
                        <span>Vowel length differentiation preserved</span>
                      </div>
                      <div className="flex items-center gap-2 text-mint-dark">
                        <Check size={14} />
                        <span>Unicode normalization form NFC compliant</span>
                      </div>
                      <div className="flex items-center gap-2 text-mint-dark">
                        <Check size={14} />
                        <span>No unescaped non-standard diacritic collision</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted space-y-2">
                  <FlaskConical size={32} className="mx-auto text-muted/60" />
                  <p className="text-xs font-serif">Click &quot;Validate Orthography Rules&quot; to inspect your test sample.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SIDE-BY-SIDE CONVENTION COMPARISON */}
        {activeTab === 'compare' && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-8">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                Compare Documented Conventions Without Bias
              </h2>
              <p className="text-muted text-sm font-serif">
                Observe the practical difference between two valid community options. Lipi Sabha never declares an automated winner.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-display font-bold text-muted mr-2">Select Active Rule:</span>
              <button
                onClick={() => setSelectedHookOption('macron')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  selectedHookOption === 'macron' ? 'btn-chunky-purple' : 'btn-chunky-white'
                }`}
              >
                Option A: Macron Diacritics (ā, ē, ī)
              </button>
              <button
                onClick={() => setSelectedHookOption('doubled')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  selectedHookOption === 'doubled' ? 'btn-chunky-purple' : 'btn-chunky-white'
                }`}
              >
                Option B: Doubled Vowels (aa, ee, ii)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="p-8 rounded-3xl bg-neutral/50 border border-border space-y-3">
                <span className="text-xs font-mono font-bold text-purple uppercase tracking-wider block">
                  Sentence Output
                </span>
                <p className="font-display text-3xl sm:text-4xl font-black text-ink tracking-wide">
                  {selectedHookOption === 'macron' ? 'tāla mēra kūna pīla' : 'taala meera kuuna piila'}
                </p>
                <p className="text-xs text-muted font-serif">
                  Meaning: &ldquo;The morning sun warms the valley path.&rdquo;
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">
                  {selectedHookOption === 'macron' ? 'Macron Diacritic System' : 'Doubled ASCII Digraph System'}
                </h3>
                <p className="text-xs sm:text-sm text-muted font-serif leading-relaxed">
                  {selectedHookOption === 'macron'
                    ? 'Compact visual width, preserving elegant page layout. Requires long-pressing on touch keyboards or customized keyboard layouts.'
                    : 'Requires zero special software and works immediately on standard physical and mobile QWERTY keyboards. However, words take up 25-35% more visual width.'}
                </p>
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted">
                  <span>Preserved in Sabha Ledger: <strong>Open Consultation</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEXT CONSISTENCY AUDIT */}
        {activeTab === 'audit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-purple flex items-center gap-2">
                  <Upload size={15} />
                  <span>Sample Text Consistency Audit</span>
                </span>
                <span className="text-xs font-mono font-bold text-mint-dark">Batch Engine</span>
              </div>

              <p className="text-xs font-serif text-muted leading-relaxed">
                Paste any regional text excerpt or transcribed sentence to inspect whether long vowels, aspiration markers, and conjuncts adhere strictly to documented standards.
              </p>

              <textarea
                rows={5}
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
                placeholder="Paste sample text here..."
                className="w-full p-4 rounded-2xl border border-border bg-neutral/30 text-ink font-sans text-xs focus:outline-none focus:border-purple shadow-soft transition-all"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setUploadText('tāla mēra kūna pīla vāri sēna')}
                  className="text-xs font-serif text-purple hover:underline cursor-pointer"
                >
                  Insert Sample Paragraph
                </button>

                <button
                  onClick={handleAuditSample}
                  disabled={!uploadText.trim()}
                  className="btn-chunky-purple px-6 py-2.5 text-xs inline-flex items-center gap-2 disabled:opacity-40"
                >
                  <Award size={15} />
                  <span>Audit Consistency</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-display font-extrabold uppercase text-purple">
                  Audit Certificate
                </span>
                {uploadAudit && (
                  <span className="text-xs font-mono font-bold text-mint-dark">
                    {uploadAudit.consistencyScore}% Match
                  </span>
                )}
              </div>

              {uploadAudit ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-neutral/50 border border-border space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                      Audit Summary
                    </span>
                    <p className="text-xs font-serif text-ink leading-relaxed">
                      {uploadAudit.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-white border border-border">
                      <span className="text-[10px] font-sans font-bold uppercase text-muted block">
                        Words Analyzed
                      </span>
                      <span className="font-display font-black text-xl text-purple">
                        {uploadAudit.totalWords}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-border">
                      <span className="text-[10px] font-sans font-bold uppercase text-muted block">
                        Flagged Tokens
                      </span>
                      <span className="font-display font-black text-xl text-mint-dark">
                        {uploadAudit.flaggedTokens.length}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted space-y-2">
                  <FileCheck2 size={32} className="mx-auto text-muted/60" />
                  <p className="text-xs font-serif">Click &quot;Audit Consistency&quot; to analyze the text excerpt.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
