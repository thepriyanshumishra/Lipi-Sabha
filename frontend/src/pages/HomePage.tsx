import { useState, useEffect } from 'react';
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
  Radio,
  Compass,
  Layers
} from 'lucide-react';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import { useLipi } from '@/contexts/LipiContext';

export function HomePage() {
  const { activeLipi, allLipis, setLipiId } = useLipi();
  const knowledgeNodes = activeLipi.knowledgeNodes;

  const [selectedNodeId, setSelectedNodeId] = useState<string>(knowledgeNodes[0]?.id || '');
  const [activeStep, setActiveStep] = useState<'learn' | 'quiz' | 'deep'>('learn');
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(450);
  const [activeGardenLetterIdx, setActiveGardenLetterIdx] = useState<number>(0);

  // When activeLipi changes, reset to the first node of the new Lipi
  useEffect(() => {
    if (activeLipi.knowledgeNodes.length > 0) {
      setSelectedNodeId(activeLipi.knowledgeNodes[0].id);
      setActiveStep('learn');
      setQuizSelection(null);
      setQuizSubmitted(false);
      setActiveGardenLetterIdx(0);
    }
  }, [activeLipi.id]);

  const activeNode = knowledgeNodes.find((n) => n.id === selectedNodeId) || knowledgeNodes[0];

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setActiveStep('learn');
    setQuizSelection(null);
    setQuizSubmitted(false);
    playAcousticChime(440 + (activeNode?.level || 1) * 45, 0.4);
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

  const activeGardenLetter = activeLipi.gardenLetters[activeGardenLetterIdx] || activeLipi.gardenLetters[0];

  return (
    <div className="bg-cream text-ink min-h-screen select-none">
      {/* ========================================================
          HERO: ILLUMINATED GITA BOOK / SACRED MANUSCRIPT OPENING
          Dynamically tuned to the selected Lipi
          ======================================================== */}
      <section className="relative pt-12 pb-14 lg:pt-16 lg:pb-20 border-b-[1.5px] border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Active Lipi Badge with Era & Region */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border-[1.5px] border-[#78350F]/25 dark:border-amber-900/40 text-xs font-serif shadow-soft">
            <span className="w-5 h-5 rounded-md bg-[#78350F] text-white flex items-center justify-center font-bold text-xs">
              {activeLipi.symbol}
            </span>
            <span className="font-bold text-[#78350F] dark:text-amber-300">
              {activeLipi.nameNative} ({activeLipi.nameEnglish})
            </span>
            <span className="text-muted">•</span>
            <span className="text-muted font-mono">{activeLipi.era}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.18]">
            Every letter has a{' '}
            <span className="hero-story-underline text-purple">
              story.
            </span>
            <br />
            Explore <span className="text-[#B45309] dark:text-amber-400">{activeLipi.nameNative}</span> Lipi.
          </h1>

          <p className="text-muted text-base sm:text-lg font-serif max-w-2xl mx-auto leading-relaxed">
            {activeLipi.overview}
          </p>

          {/* Quick Dual Jump Scrolls */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
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
              <FlaskConical size={17} className="text-[#B45309]" />
              <span>प्रयोग शाला (Test {activeLipi.nameEnglish} Script) →</span>
            </Link>
          </div>

          {/* Lipi Quick-Switcher Pills below Hero */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="font-mono text-muted uppercase text-[10px] tracking-wider font-bold">
              Switch Lipi:
            </span>
            {allLipis.map((lipi) => (
              <button
                key={lipi.id}
                type="button"
                onClick={() => setLipiId(lipi.id)}
                className={`px-3 py-1 rounded-xl font-display text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  lipi.id === activeLipi.id
                    ? 'bg-[#78350F] text-white shadow-soft font-bold'
                    : 'bg-white dark:bg-slate-800 border-[1.5px] border-border text-ink hover:border-[#78350F]/50'
                }`}
              >
                <span className="font-serif font-black">{lipi.symbol}</span>
                <span>{lipi.nameNative}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          THE 3D LETTER GARDEN (Tactile Blooms of Active Lipi)
          Click to hear authentic pronunciation and anatomical insight
          ======================================================== */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-[1.5px] border-border">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-[1.5px] border-border pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <h3 className="font-display text-lg sm:text-xl font-black text-ink">
                  The Living Letter Garden of {activeLipi.nameNative}
                </h3>
              </div>
              <p className="text-xs font-serif text-muted">
                Click any signature character to hear its acoustic resonance and inspect its scribal role.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 border border-mint-dark/30 text-xs font-mono font-bold text-mint-dark shrink-0">
              <Volume2 size={13} />
              <span>Audio Synthesis Ready</span>
            </div>
          </div>

          {/* Letter Petals Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {activeLipi.gardenLetters.map((letter, idx) => {
              const isActive = activeGardenLetterIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveGardenLetterIdx(idx);
                    playAcousticChime(500 + idx * 80, 0.3);
                    playPronunciation(letter.audioText, letter.lang);
                  }}
                  className={`p-4 rounded-2xl transition-all cursor-pointer text-center relative overflow-hidden group ${
                    isActive
                      ? 'bg-amber-50/90 dark:bg-amber-950/40 border-2 border-[#78350F] shadow-elevated -translate-y-1'
                      : 'bg-[#FFFDF9] dark:bg-slate-800/80 border-[1.5px] border-border hover:border-[#78350F]/50 hover:-translate-y-0.5 shadow-soft'
                  }`}
                  style={{
                    borderBottomWidth: isActive ? '4px' : '3px',
                    borderBottomColor: isActive ? '#78350F' : '#DCCFB9'
                  }}
                >
                  <div className="flex items-center justify-between text-[10px] text-muted mb-2">
                    <span className="font-mono font-bold uppercase">Petal {idx + 1}</span>
                    <span className="text-purple group-hover:scale-110 transition-transform">
                      <Volume2 size={13} />
                    </span>
                  </div>

                  {/* 3D Glyphs */}
                  <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center font-serif font-black text-3xl my-2 shadow-soft transition-transform group-hover:scale-105"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, #D97706 0%, #B45309 60%, #78350F 100%)'
                        : 'linear-gradient(180deg, #FFFFFF 0%, #F5EFE4 100%)',
                      color: isActive ? '#FFFFFF' : '#1C1917',
                      border: isActive ? '2px solid #FDE68A' : '1.5px solid #DCCFB9',
                      boxShadow: isActive ? '0 6px 0px #451A03' : '0 3px 0px #C4B59D'
                    }}
                  >
                    {letter.char}
                  </div>

                  <span className="font-display font-extrabold text-xs text-ink block truncate mt-1">
                    {letter.name}
                  </span>
                  <span className="font-mono text-[11px] text-[#B45309] dark:text-amber-400 block font-bold">
                    {letter.ipa}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Bloom Description Banner */}
          {activeGardenLetter && (
            <motion.div
              key={activeGardenLetter.char}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border-[1.5px] border-[#78350F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-xl shrink-0 shadow-soft">
                  {activeGardenLetter.char}
                </span>
                <div>
                  <h4 className="font-display font-bold text-sm text-ink flex items-center gap-2">
                    <span>{activeGardenLetter.name}</span>
                    <span className="font-mono text-xs text-purple font-semibold">({activeGardenLetter.ipa})</span>
                  </h4>
                  <p className="text-xs font-serif text-muted mt-0.5 leading-relaxed">
                    {activeGardenLetter.meaning}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playAcousticChime(600, 0.3);
                  playPronunciation(activeGardenLetter.audioText, activeGardenLetter.lang);
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Volume2 size={14} className="text-[#B45309]" />
                <span>Hear Resonance ({activeGardenLetter.char})</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ========================================================
          PAGE 1: ज्ञान वृक्ष — THE 3D KNOWLEDGE TREE
          Sculpted 3D medallions, organic golden branching path,
          and interactive 3-stage deep wisdom bloom
          ======================================================== */}
      <section id="tree-of-knowledge" className="py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-light border border-purple/30 text-xs font-serif font-bold text-purple uppercase">
            ज्ञान वृक्ष • The 3D Knowledge Tree
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-ink">
            Ascend the Living Tree of {activeLipi.nameNative}
          </h2>
          <p className="text-muted text-sm font-serif">
            Step upon the sculpted 3D medallions along the golden vine. Each node unpacks an authentic orthographic lesson, an interactive quiz, and living community wisdom for {activeLipi.nameEnglish}.
          </p>
        </div>

        {/* The 3D Tree & Detail Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Sculpted Tree Path */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b-[1.5px] border-border pb-3">
              <span className="text-xs font-display font-extrabold uppercase tracking-wider text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
                <span>🌿</span>
                <span>The 3D Discovery Trail</span>
              </span>
              <span className="text-xs font-mono font-bold text-muted">
                Branch {activeNode?.level || 1} of {knowledgeNodes.length}
              </span>
            </div>

            {/* 3D Stepping Stone Nodes */}
            <div className="space-y-4 relative py-2">
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
                    className={`relative z-10 w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-4 cursor-pointer group ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-50/90 to-white dark:from-amber-950/40 dark:to-slate-800 border-2 border-[#78350F] shadow-elevated -translate-y-1'
                        : 'bg-white dark:bg-slate-800 border-[1.5px] border-border hover:border-[#78350F]/60 hover:-translate-y-0.5 shadow-soft'
                    }`}
                    style={{
                      borderBottomWidth: isSelected ? '4.5px' : '3.5px',
                      borderBottomColor: isSelected ? '#78350F' : '#DCCFB9'
                    }}
                  >
                    {/* 3D Tactile Circular Medallion / Stepping Stone */}
                    <div
                      className={`relative w-13 h-13 rounded-2xl flex items-center justify-center font-display font-black text-2xl shrink-0 transition-all select-none ${
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
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#B45309] dark:text-amber-400 tracking-wider">
                          Level {node.level} • {node.badgeLabel}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono font-black bg-[#78350F] text-white px-2 py-0.5 rounded-full shadow-sm">
                            BLOOMING
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-sm text-ink truncate group-hover:text-[#B45309] transition-colors">
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
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
            {/* 3D Header Emblem with Holographic Glow */}
            <div className="flex items-center justify-between border-b-[1.5px] border-border pb-5">
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
                    <span className="text-xs font-mono font-bold text-[#B45309] dark:text-amber-400 uppercase">
                      {activeNode.scriptName}
                    </span>
                    <button
                      onClick={() => {
                        playAcousticChime(580, 0.3);
                        playPronunciation(activeNode.spokenForm, activeNode.lang);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-[#78350F]/30 text-[11px] font-sans font-bold text-[#78350F] dark:text-amber-300 hover:bg-[#78350F] hover:text-white transition-all shadow-soft cursor-pointer"
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
                    : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
                }`}
              >
                📖 1. Learn & Trace
              </button>

              <button
                onClick={() => setActiveStep('quiz')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  activeStep === 'quiz'
                    ? 'btn-chunky-purple'
                    : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
                }`}
              >
                🎯 2. Interactive Quiz {quizSubmitted && '✓'}
              </button>

              <button
                onClick={() => setActiveStep('deep')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  activeStep === 'deep'
                    ? 'btn-chunky-purple'
                    : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
                }`}
              >
                📜 3. Deep Wisdom & Sabha Rules
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
                <div className="p-4 rounded-2xl bg-neutral/60 dark:bg-slate-800/60 border border-border space-y-1">
                  <span className="text-[11px] font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1">
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
                    <span className="text-[11px] font-serif text-[#B45309] dark:text-amber-400 flex items-center gap-1">
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
                        className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-border hover:border-[#78350F] transition-all text-center space-y-1 shadow-soft cursor-pointer hover:-translate-y-1 group active:translate-y-0.5"
                        style={{ borderBottomWidth: '3px', borderBottomColor: '#DCCFB9' }}
                        title="Click to hear authentic sound"
                      >
                        <div className="flex items-center justify-center gap-1 text-[10px] text-muted group-hover:text-[#B45309]">
                          <Volume2 size={11} />
                          <span>Listen</span>
                        </div>
                        <span className="font-display text-2xl font-black text-ink block group-hover:text-[#B45309]">
                          {sample.char}
                        </span>
                        <span className="font-mono text-[10px] text-[#B45309] dark:text-amber-400 block font-semibold">
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
                  <span className="text-xs font-mono font-bold text-[#B45309] dark:text-amber-400 uppercase">
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
                            : 'bg-white dark:bg-slate-800 border-border hover:border-[#78350F]/50'
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
                  <span className="text-xs font-mono font-bold text-[#B45309] dark:text-amber-400 uppercase">
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
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-[#78350F]/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
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
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer active:translate-y-0.5"
                    >
                      <Volume2 size={13} className="text-[#B45309]" />
                      <span>Hear Standard ({activeNode.glyph})</span>
                    </button>
                    <button
                      onClick={() => {
                        playAcousticChime(480, 0.25);
                        playPronunciation(activeNode.dialectSample.text, activeNode.dialectSample.lang);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer active:translate-y-0.5"
                    >
                      <Radio size={13} className="text-[#B45309]" />
                      <span>{activeNode.dialectSample.label}</span>
                    </button>
                  </div>
                </div>

                {/* Formally Codified Sabha Rule */}
                <div className="p-4 rounded-2xl bg-neutral/80 dark:bg-slate-800/80 border border-border space-y-1">
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
      <section className="py-12 bg-neutral/50 border-t-[1.5px] border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-[#B45309] dark:text-amber-400">
            Dedicated Workbench
          </span>
          <h3 className="font-display text-2xl font-black text-ink">
            Ready to test your {activeLipi.nameEnglish} orthography rules?
          </h3>
          <p className="text-xs sm:text-sm font-serif text-muted max-w-xl mx-auto leading-relaxed">
            Visit the dedicated Script Testing Studio to type with tactile glyph keys, validate sentences against community rules, and run consistency audits for {activeLipi.nameNative}.
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
      <footer className="py-10 bg-white dark:bg-slate-900 border-t-[1.5px] border-border">
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
