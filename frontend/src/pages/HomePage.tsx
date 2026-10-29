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
  Layers,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Image as ImageIcon,
  ShieldCheck,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import { useLipi } from '@/contexts/LipiContext';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { ImageLightboxModal } from '@/components/ImageLightboxModal';

export function HomePage() {
  const {
    activeLipi,
    allLipis,
    setLipiId,
    activeLipiNodes,
    projects,
    voteOnBranch,
    voteOnProject,
    userVotesMap
  } = useLipi();
  const knowledgeNodes = activeLipiNodes;

  // Public User Space ONLY shows verified and flagged decisions (unverified posts remain in Reviewer Queue)
  const verifiedProjects = projects.filter(
    (p) => p.status === 'verified' || p.status === 'ratified'
  );
  const publicDecisionProjects = projects.filter(
    (p) => p.status === 'verified' || p.status === 'ratified' || p.status === 'flagged'
  );

  // View mode: 'communityDilemmas' (MVP core: Reena dilemma & user project trees) vs 'heritage' (4-level foundational trail)
  const [treeMode, setTreeMode] = useState<'communityDilemmas' | 'heritage'>('communityDilemmas');
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    verifiedProjects[0]?.id || 'proj-reena-orthography'
  );
  const [votedBranches, setVotedBranches] = useState<Record<string, boolean>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  // Heritage Tree State
  const [selectedNodeId, setSelectedNodeId] = useState<string>(activeLipiNodes[0]?.id || '');
  const [activeStep, setActiveStep] = useState<'learn' | 'quiz' | 'deep'>('learn');
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(450);

  // When activeLipi changes or reviewer adds a node, stay in sync
  useEffect(() => {
    if (activeLipiNodes.length > 0) {
      if (!activeLipiNodes.some((n) => n.id === selectedNodeId)) {
        setSelectedNodeId(activeLipiNodes[0].id);
        setActiveStep('learn');
        setQuizSelection(null);
        setQuizSubmitted(false);
      }
    }
  }, [activeLipi.id, activeLipiNodes]);

  const activeNode = knowledgeNodes.find((n) => n.id === selectedNodeId) || knowledgeNodes[0];
  const activeProject =
    verifiedProjects.find((p) => p.id === selectedProjectId) || verifiedProjects[0];

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

  const handleVote = (branchId: string) => {
    if (votedBranches[branchId]) return;
    voteOnBranch(activeProject.id, branchId);
    setVotedBranches((prev) => ({ ...prev, [branchId]: true }));
    playSuccessChime();
  };

  return (
    <div className="bg-cream text-ink min-h-screen select-none">
      {/* ========================================================
          HERO: ILLUMINATED GITA BOOK / SACRED MANUSCRIPT OPENING
          Clean, minimal, uncluttered as requested
          ======================================================== */}
      <section className="relative pt-12 pb-14 lg:pt-16 lg:pb-16 border-b-[1.5px] border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
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
        </div>
      </section>

      {/* ========================================================
          ज्ञान वृक्ष — THE KNOWLEDGE & DECISION TREE
          Features:
          1. Community Dilemma Trees (e.g. "Reena" R-I-N-A vs R-E-E-N-A vs रीना)
          2. Heritage Trail & Quests
          ======================================================== */}
      <section id="tree-of-knowledge" className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Tree Mode Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[1.5px] border-border pb-4">
          <div className="space-y-1">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-light border border-purple/30 text-xs font-serif font-bold text-purple uppercase">
              ज्ञान वृक्ष • Sovereign Knowledge & Decision Tree
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
              {treeMode === 'communityDilemmas'
                ? 'Community Orthography Dilemmas & Decision Trees'
                : `The Sacred Heritage Trail of ${activeLipi.nameNative}`}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTreeMode('communityDilemmas')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                treeMode === 'communityDilemmas'
                  ? 'btn-chunky-purple'
                  : 'bg-white dark:bg-slate-800 border-[1.5px] border-border text-muted hover:text-ink'
              }`}
            >
              <Compass size={14} />
              <span>Community Dilemma Trees ({verifiedProjects.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setTreeMode('heritage')}
              className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                treeMode === 'heritage'
                  ? 'btn-chunky-purple'
                  : 'bg-white dark:bg-slate-800 border-[1.5px] border-border text-muted hover:text-ink'
              }`}
            >
              <BookOpen size={14} />
              <span>Script Heritage Lessons ({knowledgeNodes.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            MODE A: COMMUNITY ORTHOGRAPHY DILEMMA TREE (MVP CORE)
            Solves: "How should Reena be written? R-I-N-A, R-E-E-N-A, or रीना?"
            ======================================================== */}
        {treeMode === 'communityDilemmas' && activeProject && (
          <div className="space-y-8">
            {/* Dilemma Selector Tabs if multiple projects exist */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider">
                Select Active Dilemma:
              </span>
              {verifiedProjects.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-3 py-1.5 rounded-xl font-display text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                    proj.id === activeProject.id
                      ? 'bg-[#78350F] text-white shadow-soft font-bold'
                      : 'bg-white dark:bg-slate-800 border border-border text-ink hover:border-[#78350F]/50'
                  }`}
                >
                  <span>✓</span>
                  <span className="truncate max-w-[200px]">{proj.title}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="ml-auto text-xs font-display font-extrabold text-[#78350F] dark:text-amber-300 hover:text-purple bg-amber-50 dark:bg-amber-950/40 border border-[#78350F]/30 hover:border-[#78350F] px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-soft transition-all"
              >
                <PlusCircle size={14} />
                <span>+ नया प्रश्न / शब्द पूछें (Ask Doubt)</span>
              </button>
            </div>

            {/* Dilemma Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-[#78350F] dark:bg-amber-950 dark:text-amber-300">
                      {activeProject.dialectContext}
                    </span>
                    <span className="text-[11px] font-mono text-muted">Submitted by {activeProject.author}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-ink">
                    {activeProject.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playAcousticChime(540, 0.3);
                      playPronunciation(activeProject.spokenWord, 'hi-IN');
                    }}
                    className="btn-chunky-purple px-4 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                  >
                    <Volume2 size={15} />
                    <span>Hear Spoken Sound ({activeProject.spokenWord.split('/')[0]})</span>
                  </button>
                </div>
              </div>

              {/* Photo preview if user uploaded an image */}
              {activeProject.imageUrl && (
                <div className="p-4 rounded-2xl bg-neutral/50 dark:bg-slate-800 border border-border flex items-center gap-4">
                  <img
                    src={activeProject.imageUrl}
                    alt="Uploaded Inscription Specimen"
                    className="w-24 h-24 object-cover rounded-xl border border-border shadow-soft"
                  />
                  <div>
                    <span className="font-mono text-[10px] font-bold text-muted uppercase block">
                      Uploaded Inscription / Specimen Photo
                    </span>
                    <p className="font-serif text-xs text-ink mt-0.5">
                      Visual evidence submitted by community member for orthographic comparison.
                    </p>
                  </div>
                </div>
              )}

              <p className="font-serif text-sm text-muted leading-relaxed">
                {activeProject.description}
              </p>

              {/* Sovereign Principle Quote */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-[#78350F]/20 text-xs font-serif text-[#78350F] dark:text-amber-300 italic">
                &ldquo;The community is the decision-maker, not just the dataset. Compare keyboard ease of learning against acoustic fidelity below.&rdquo;
              </div>

              {/* Reviewer Ratification Banner if approved */}
              {activeProject.status === 'ratified' && activeProject.reviewerVerdict && (
                <div className="p-5 rounded-2xl bg-mint/20 dark:bg-emerald-950/30 border-[1.5px] border-mint-dark/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-extrabold text-mint-dark uppercase flex items-center gap-1.5">
                      <ShieldCheck size={16} />
                      <span>Sovereign Sabha Ratified Decision</span>
                    </span>
                    <span className="text-[10px] font-mono text-muted">{activeProject.reviewerVerdict.ratifiedAt}</span>
                  </div>
                  <p className="text-xs font-serif text-ink leading-relaxed font-semibold">
                    Decision by {activeProject.reviewerVerdict.reviewerName}:
                  </p>
                  <p className="text-xs font-serif text-ink italic leading-relaxed">
                    {activeProject.reviewerVerdict.rationale}
                  </p>
                </div>
              )}
            </div>

            {/* The Competing Decision Tree Branches */}
            {activeProject.branches && activeProject.branches.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-display text-lg font-black text-ink flex items-center gap-2">
                  <span>🌳</span>
                  <span>Competing Orthography Branches ({activeProject.branches.length} Proposals)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeProject.branches.map((branch, bIdx) => {
                    const isWinningVerdict =
                      activeProject.reviewerVerdict?.recommendedBranchId === branch.id;
                    const hasVoted = votedBranches[branch.id];

                    return (
                      <div
                        key={branch.id}
                        className={`p-6 rounded-3xl border-[1.5px] transition-all space-y-4 relative ${
                          isWinningVerdict
                            ? 'bg-mint/10 dark:bg-emerald-950/20 border-mint-dark shadow-elevated'
                            : 'bg-white dark:bg-slate-900 border-border shadow-card hover:border-[#78350F]/50'
                        }`}
                        style={{
                          borderBottomWidth: '4.5px',
                          borderBottomColor: isWinningVerdict ? '#059669' : '#DCCFB9'
                        }}
                      >
                        {/* Top Badges */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400">
                            {branch.scriptType}
                          </span>
                          {isWinningVerdict && (
                            <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-mint-dark text-white shadow-soft">
                              ✓ Ratified Choice
                            </span>
                          )}
                        </div>

                        {/* Representation Box with Audio Playback */}
                        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-[#78350F]/20 text-center space-y-1">
                          <span className="font-serif font-black text-3xl sm:text-4xl text-ink tracking-wide block">
                            {branch.representation}
                          </span>
                          <span className="text-xs font-display font-bold text-muted block">
                            {branch.label}
                          </span>
                        </div>

                        {/* Metrics: Ease of Learning vs Phonetic Precision */}
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <div className="p-2.5 rounded-xl bg-neutral/50 dark:bg-slate-800 border border-border space-y-0.5">
                            <span className="text-[9px] font-mono text-muted uppercase block">Keypad Ease</span>
                            <span className="font-display font-black text-ink">{branch.easeOfLearning}</span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-neutral/50 dark:bg-slate-800 border border-border space-y-0.5">
                            <span className="text-[9px] font-mono text-muted uppercase block">Acoustic Match</span>
                            <span className="font-display font-black text-mint-dark">{branch.phoneticAccuracy}%</span>
                          </div>
                        </div>

                        {/* Linguistic Rationale */}
                        <p className="text-xs font-serif text-muted leading-relaxed">
                          {branch.rationale}
                        </p>

                        {/* Actions: Listen & Vote */}
                        <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              playAcousticChime(560 + bIdx * 60, 0.25);
                              playPronunciation(branch.audioPronunciation, 'hi-IN');
                            }}
                            className="p-2 rounded-xl border border-border text-xs font-display font-bold text-[#78350F] hover:bg-[#78350F] hover:text-white transition-all cursor-pointer shadow-soft"
                            title="Listen to pronunciation of this branch"
                          >
                            <Volume2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVote(branch.id)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              hasVoted
                                ? 'bg-mint-dark text-white shadow-soft'
                                : 'bg-white dark:bg-slate-800 border border-border text-ink hover:border-[#78350F]'
                            }`}
                          >
                            <ThumbsUp size={13} />
                            <span>{hasVoted ? 'Voted' : 'Vote'} ({branch.communityVotes})</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================
                VERIFIED & FLAGGED COMMUNITY DECISIONS (RESOLVED RESOLUTIONS)
                Shows both Verified (green) and Flagged (red) posts with:
                - Reviewer Verdict & Name
                - Clickable Zoomable Photo Lightbox
                - Accepted Spelling Option
                - 1-Vote-per-user Upvoting / Downvoting (▲ / ▼)
                ======================================================== */}
            <div className="space-y-4 pt-4 border-t-[1.5px] border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono font-bold uppercase text-mint-dark flex items-center gap-1.5">
                    <ShieldCheck size={14} />
                    <span>Sabha Certified Orthography Canon ({publicDecisionProjects.length})</span>
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-ink">
                    Verified Decisions & Specialist Rectifications
                  </h3>
                </div>
                <span className="text-xs font-serif text-muted">
                  Audited by authorized script specialists with community voting
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {publicDecisionProjects.map((item) => {
                  const isFlagged = item.status === 'flagged';
                  const userVote = userVotesMap[item.id];

                  return (
                    <div
                      key={item.id}
                      className={`p-5 sm:p-6 rounded-3xl border-[1.5px] shadow-card space-y-3.5 transition-all ${
                        isFlagged
                          ? 'bg-rose-50/20 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/50'
                          : 'bg-white dark:bg-slate-900 border-mint-dark/30'
                      }`}
                      style={{
                        borderBottomWidth: '4px',
                        borderBottomColor: isFlagged ? '#E11D48' : '#059669'
                      }}
                    >
                      {/* Header: Verified seal or Red Flag */}
                      <div className="flex items-center justify-between border-b border-border pb-2.5">
                        <span
                          className={`text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            isFlagged
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-mint/40 text-mint-dark dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {isFlagged ? (
                            <>
                              <Flag size={11} className="text-rose-600 fill-rose-600" />
                              <span>🚩 Flagged / Rectified by {item.reviewerVerdict?.reviewerName || 'Lipi Specialist'}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck size={12} className="text-mint-dark" />
                              <span>✓ Verified by {item.reviewerVerdict?.reviewerName || 'Lipi Specialist'}</span>
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          {item.reviewerVerdict?.ratifiedAt || item.submittedAt}
                        </span>
                      </div>

                      {/* User Doubt / Spoken Word with Audio */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-muted uppercase block">
                            User Question / Spoken Word:
                          </span>
                          <h4 className="font-serif font-black text-xl sm:text-2xl text-ink">
                            {item.spokenWord}
                          </h4>
                          {item.title !== item.spokenWord && (
                            <p className="text-xs font-serif text-muted">{item.title}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.audioUrl ? (
                            <audio src={item.audioUrl} controls className="h-7 max-w-[170px]" />
                          ) : (
                            <button
                              type="button"
                              onClick={() => playPronunciation(item.spokenWord, 'hi-IN')}
                              className="p-2 rounded-xl bg-amber-50 dark:bg-slate-800 text-[#78350F] hover:bg-[#78350F] hover:text-white transition-colors cursor-pointer shadow-soft"
                              title="Hear pronunciation"
                            >
                              <Volume2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Attached Photo (Click to open full lightbox) */}
                      {item.imageUrl && (
                        <div className="relative group">
                          <img
                            src={item.imageUrl}
                            alt="Specimen"
                            onClick={() => setLightboxImage({ url: item.imageUrl!, title: item.spokenWord })}
                            className="w-full h-36 sm:h-44 object-cover rounded-xl border border-border shadow-soft cursor-pointer group-hover:opacity-90 group-hover:scale-[1.01] transition-all"
                            title="Click to open & zoom picture"
                          />
                          <div
                            onClick={() => setLightboxImage({ url: item.imageUrl!, title: item.spokenWord })}
                            className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/70 text-white text-[10px] font-mono cursor-pointer backdrop-blur-sm opacity-90 group-hover:opacity-100 flex items-center gap-1"
                          >
                            <span>🔍 Click to expand</span>
                          </div>
                        </div>
                      )}

                      {/* Accepted Spelling Option Pill (if reviewer endorsed one) */}
                      {item.reviewerVerdict?.acceptedOption && (
                        <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-slate-800/60 border border-[#78350F]/20 space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400 block">
                            Endorsed Standard Spelling:
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-mint-dark text-white font-serif font-black text-xs shadow-soft flex items-center gap-1">
                              <span>✓</span>
                              <span>{item.reviewerVerdict.acceptedOption}</span>
                            </span>
                            {item.options &&
                              item.options
                                .filter((o) => o !== item.reviewerVerdict?.acceptedOption)
                                .map((opt, oIdx) => (
                                  <span
                                    key={oIdx}
                                    className="px-2 py-0.5 rounded-lg bg-neutral dark:bg-slate-700 text-muted font-serif text-xs opacity-70 line-through"
                                  >
                                    {opt}
                                  </span>
                                ))}
                          </div>
                        </div>
                      )}

                      {/* Reviewer Commentary */}
                      {item.reviewerVerdict?.rationale && (
                        <div
                          className={`p-3.5 rounded-2xl text-xs font-serif space-y-1 border ${
                            isFlagged
                              ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 text-ink'
                              : 'bg-amber-50/50 dark:bg-slate-800/60 border-[#78350F]/20 text-ink'
                          }`}
                        >
                          <span
                            className={`font-bold text-[11px] block ${
                              isFlagged ? 'text-rose-700 dark:text-rose-400' : 'text-[#78350F] dark:text-amber-400'
                            }`}
                          >
                            {isFlagged ? 'Specialist Rectification:' : 'Specialist Guidance:'}
                          </span>
                          <p className="leading-relaxed italic">
                            &ldquo;{item.reviewerVerdict.rationale}&rdquo;
                          </p>
                        </div>
                      )}

                      {/* Footer Meta & 1-Vote-per-User Upvote/Downvote Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/70 text-xs">
                        <div className="text-[10px] font-mono text-muted space-y-0.5">
                          <span>Contributor: <strong className="text-ink">{item.author}</strong></span>
                          <span className="block">Scope: {item.lipiName}</span>
                        </div>

                        {/* Voting Column: Upvote & Downvote */}
                        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral/80 dark:bg-slate-800 border border-border">
                          <button
                            type="button"
                            onClick={() => voteOnProject(item.id, 'up')}
                            className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              userVote === 'up'
                                ? 'bg-mint-dark text-white shadow-soft scale-105'
                                : 'text-muted hover:text-ink'
                            }`}
                            title={userVote === 'up' ? 'Click to remove upvote' : 'Upvote resolution'}
                          >
                            <ThumbsUp size={12} className={userVote === 'up' ? 'fill-white' : ''} />
                            <span>{item.upvotes || 0}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => voteOnProject(item.id, 'down')}
                            className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                              userVote === 'down'
                                ? 'bg-danger text-white shadow-soft scale-105'
                                : 'text-muted hover:text-ink'
                            }`}
                            title={userVote === 'down' ? 'Click to remove downvote' : 'Downvote resolution'}
                          >
                            <ThumbsDown size={12} className={userVote === 'down' ? 'fill-white' : ''} />
                            <span>{item.downvotes || 0}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODE B: SCRIPT HERITAGE TRAIL (4-Level Core Lessons)
            ======================================================== */}
        {treeMode === 'heritage' && (
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
                        <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/30 pointer-events-none" />
                        <span className="relative z-10 drop-shadow-sm">{node.glyph}</span>
                      </div>

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

            {/* Right Column: Detail Bloom */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
              <div className="flex items-center justify-between border-b-[1.5px] border-border pb-5">
                <div className="flex items-center gap-4">
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

              {/* Stage Selector Tabs */}
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

              {/* STAGE 1 */}
              {activeStep === 'learn' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-black text-ink">{activeNode.learnTitle}</h4>
                    <p className="text-sm font-serif text-muted leading-relaxed">{activeNode.learnExplanation}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral/60 dark:bg-slate-800/60 border border-border space-y-1">
                    <span className="text-[11px] font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1">
                      <Lightbulb size={13} />
                      <span>Historical Scribal Lineage</span>
                    </span>
                    <p className="text-xs font-serif text-ink leading-relaxed">{activeNode.culturalNote}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-display font-bold text-muted uppercase tracking-wider block">
                      Glyph Anatomy (Click to hear sound):
                    </span>
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
                          <span className="text-[9px] font-sans text-muted block leading-tight">{sample.gloss}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end">
                    <button onClick={() => setActiveStep('quiz')} className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2">
                      <span>Proceed to Interactive Quiz</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2 */}
              {activeStep === 'quiz' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#B45309] dark:text-amber-400 uppercase">
                      Level {activeNode.level} Knowledge Check
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl font-black text-ink">{activeNode.quizQuestion}</h4>
                  </div>

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
                            borderBottomColor: isSelected ? (opt.isCorrect ? '#059669' : '#DC2626') : '#DCCFB9'
                          }}
                        >
                          <div className="space-y-0.5">
                            <p className="font-display font-bold text-sm text-ink">{opt.text}</p>
                            <p className="text-xs font-sans text-muted">{opt.subtext}</p>
                          </div>
                          {isSelected && (
                            <span className="shrink-0 pt-0.5">
                              {opt.isCorrect ? <CheckCircle2 size={18} className="text-mint-dark" /> : <X size={18} className="text-danger" />}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-mint/40 border border-mint-dark/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-display font-black text-mint-dark">
                        <Award size={16} />
                        <span>{quizSelection !== null && activeNode.quizOptions[quizSelection]?.isCorrect ? 'Splendid! +50 XP Awarded' : 'Insightful Exploration!'}</span>
                      </div>
                      <p className="text-xs font-serif text-ink leading-relaxed">{activeNode.quizExplanation}</p>
                    </motion.div>
                  )}

                  <div className="pt-4 border-t border-border flex justify-between items-center">
                    <button onClick={() => { setQuizSelection(null); setQuizSubmitted(false); }} className="text-xs font-sans text-muted hover:text-ink inline-flex items-center gap-1">
                      <RotateCcw size={12} />
                      <span>Reset Quiz</span>
                    </button>
                    <button onClick={() => setActiveStep('deep')} className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2">
                      <span>Unpack Deep Wisdom</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3 */}
              {activeStep === 'deep' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-2">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#B45309] dark:text-amber-400 uppercase">
                      Wisdom & Living Tradition
                    </span>
                    <h4 className="font-display text-2xl font-black text-ink">{activeNode.deepTitle}</h4>
                    <p className="text-sm font-serif text-muted leading-relaxed">{activeNode.deepLore}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-[#78350F]/20 space-y-2.5">
                    <span className="text-[11px] font-display font-extrabold uppercase text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
                      <Volume2 size={14} />
                      <span>Dialect Respect & Spoken Variety</span>
                    </span>
                    <p className="text-xs font-serif text-ink leading-relaxed">{activeNode.dialectInsight}</p>
                    <div className="pt-1 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          playAcousticChime(540, 0.25);
                          playPronunciation(activeNode.spokenForm, activeNode.lang);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer"
                      >
                        <Volume2 size={13} className="text-[#B45309]" />
                        <span>Hear Standard ({activeNode.glyph})</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral/80 dark:bg-slate-800/80 border border-border space-y-1">
                    <span className="text-[10px] font-mono font-black uppercase text-muted">Ratified Sabha Principle</span>
                    <p className="text-xs font-mono font-bold text-ink">{activeNode.communityRule}</p>
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
        )}

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

      {/* Create Script Dilemma Modal */}
      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={(newId) => {
          setSelectedProjectId(newId);
          setTreeMode('communityDilemmas');
        }}
      />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        isOpen={Boolean(lightboxImage)}
        imageUrl={lightboxImage?.url || null}
        title={lightboxImage?.title}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
