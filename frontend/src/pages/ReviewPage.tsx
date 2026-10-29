import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  AlertTriangle,
  Award,
  BookOpen,
  Info,
  Scale,
  Sparkles,
  Layers,
  ChevronRight,
  PlusCircle,
  Volume2,
  Trash2,
  Check,
  X,
  FileCheck2,
  Radio,
  Send
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLipi } from '@/contexts/LipiContext';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import type { LipiKnowledgeNode } from '@/data/lipiData';

export function ReviewPage() {
  const { user, isReviewer } = useAuth();
  const {
    activeLipi,
    allLipis,
    setLipiId,
    activeLipiNodes,
    addKnowledgeNode,
    deleteKnowledgeNode,
    submissions,
    approveSubmission,
    rejectSubmission
  } = useLipi();

  const [activeTab, setActiveTab] = useState<'queue' | 'treeBuilder' | 'principles'>('queue');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  // Review Rationale state map
  const [rationaleMap, setRationaleMap] = useState<Record<string, string>>({});
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  // New Tree Node Form State
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [newNodeSubtitle, setNewNodeSubtitle] = useState('');
  const [newNodeGlyph, setNewNodeGlyph] = useState(activeLipi.symbol);
  const [newNodeBadge, setNewNodeBadge] = useState('Scribal Canon');
  const [newNodeLearnTitle, setNewNodeLearnTitle] = useState('');
  const [newNodeLearnExplanation, setNewNodeLearnExplanation] = useState('');
  const [newNodeCulturalNote, setNewNodeCulturalNote] = useState('');
  const [newNodeQuizQuestion, setNewNodeQuizQuestion] = useState('');
  const [opt1Text, setOpt1Text] = useState('');
  const [opt1Subtext, setOpt1Subtext] = useState('');
  const [opt2Text, setOpt2Text] = useState('');
  const [opt2Subtext, setOpt2Subtext] = useState('');
  const [correctOpt, setCorrectOpt] = useState<number>(0);
  const [newNodeQuizExplanation, setNewNodeQuizExplanation] = useState('');
  const [newNodeDeepTitle, setNewNodeDeepTitle] = useState('Sovereign Community Rationale');
  const [newNodeDeepLore, setNewNodeDeepLore] = useState('');
  const [newNodeRule, setNewNodeRule] = useState('');
  const [nodePublishSuccess, setNodePublishSuccess] = useState(false);

  // Review queue strictly scoped to the active Lipi
  const lipiSubmissions = submissions.filter((s) => s.lipiId === activeLipi.id);
  const filteredSubmissions = lipiSubmissions.filter((s) => {
    if (filterStatus === 'pending') return s.status === 'pending';
    if (filterStatus === 'approved') return s.status === 'approved';
    return true;
  });

  const pendingCount = lipiSubmissions.filter((s) => s.status === 'pending').length;
  const approvedCount = lipiSubmissions.filter((s) => s.status === 'approved').length;

  const handleApprove = (subId: string) => {
    const rationale =
      rationaleMap[subId]?.trim() ||
      `Verified by ${user?.display_name || 'Lipi Specialist'}. Conforms with documented ${activeLipi.nameNative} orthographic canon.`;
    approveSubmission(subId, rationale, user?.display_name || 'Meera (Reviewer)');
    playSuccessChime();
    setDecisionFeedback(`Submission ratified and published to verified ${activeLipi.nameNative} canon.`);
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  const handleReject = (subId: string) => {
    const rationale =
      rationaleMap[subId]?.trim() ||
      'Revision required: orthography does not conform to documented canonical rulebook.';
    rejectSubmission(subId, rationale, user?.display_name || 'Meera (Reviewer)');
    playAcousticChime(320, 0.3);
    setDecisionFeedback('Feedback sent to contributor for revision.');
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeTitle.trim() || !newNodeQuizQuestion.trim()) return;

    const newLevel = activeLipiNodes.length + 1;
    const newNode: LipiKnowledgeNode = {
      id: `${activeLipi.id}-node-${Date.now()}`,
      level: newLevel,
      title: newNodeTitle.trim(),
      subtitle: newNodeSubtitle.trim() || 'Orthographic mechanics and community wisdom.',
      glyph: newNodeGlyph.trim() || activeLipi.symbol,
      scriptName: `${activeLipi.nameNative} (${activeLipi.nameEnglish})`,
      themeColor: activeLipi.themeColor,
      badgeLabel: newNodeBadge.trim() || 'Scribal Canon',
      lang: activeLipi.gardenLetters[0]?.lang || 'hi-IN',
      spokenForm: newNodeGlyph.trim() || activeLipi.symbol,
      learnTitle: newNodeLearnTitle.trim() || `The Anatomy of "${newNodeGlyph.trim()}" in ${activeLipi.nameNative}`,
      learnExplanation:
        newNodeLearnExplanation.trim() ||
        `Curated by ${user?.display_name || 'Reviewer'}: orthographic and phonetic characteristics of ${activeLipi.nameNative}.`,
      culturalNote:
        newNodeCulturalNote.trim() ||
        `Documented scribal tradition preserved across historical manuscript codices in ${activeLipi.region}.`,
      sampleWords: [
        { char: newNodeGlyph.trim(), ipa: `/${newNodeGlyph.trim()}/`, gloss: 'Base character phoneme' }
      ],
      quizQuestion: newNodeQuizQuestion.trim(),
      quizOptions: [
        {
          text: opt1Text.trim() || 'Conforms strictly to classical phonetic articulation',
          subtext: opt1Subtext.trim() || 'Verified standard characteristic',
          isCorrect: correctOpt === 0
        },
        {
          text: opt2Text.trim() || 'Violates the acoustic breath flow',
          subtext: opt2Subtext.trim() || 'Incorrect historical usage',
          isCorrect: correctOpt === 1
        }
      ],
      quizExplanation:
        newNodeQuizExplanation.trim() ||
        'Correct! Documented orthographic rules require preserving phonetic authenticity.',
      deepTitle: newNodeDeepTitle.trim() || 'Sovereign Community Rationale',
      deepLore:
        newNodeDeepLore.trim() ||
        `Decided by community consultation: ${activeLipi.nameNative} orthography respects traditional roots while serving modern digital tools.`,
      dialectInsight: 'Regional dialect variations are recorded with metadata rather than marked incorrect.',
      dialectSample: { label: 'Listen to Regional Accent', text: newNodeGlyph.trim(), lang: activeLipi.gardenLetters[0]?.lang || 'hi-IN' },
      communityRule:
        newNodeRule.trim() ||
        `Orthography Rule #${newLevel}: All spelling variations must be verified through speaker consensus.`
    };

    addKnowledgeNode(activeLipi.id, newNode);
    playSuccessChime();
    setNodePublishSuccess(true);
    setTimeout(() => {
      setNodePublishSuccess(false);
      setShowAddNodeModal(false);
      // Reset form
      setNewNodeTitle('');
      setNewNodeSubtitle('');
      setNewNodeLearnTitle('');
      setNewNodeLearnExplanation('');
      setNewNodeCulturalNote('');
      setNewNodeQuizQuestion('');
      setOpt1Text('');
      setOpt2Text('');
      setNewNodeQuizExplanation('');
      setNewNodeDeepLore('');
      setNewNodeRule('');
    }, 1500);
  };

  return (
    <div className="bg-cream min-h-screen py-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Workspace Observer Notice for Non-Reviewers */}
        {!isReviewer && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-[1.5px] border-[#78350F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400 block">
                Preview / Demo Mode
              </span>
              <p className="font-display font-bold text-sm text-ink">
                You are viewing the Reviewer Studio in preview. To sign in as an authorized Reviewer, switch accounts.
              </p>
            </div>
            <Link
              to="/auth/sign-in"
              className="btn-chunky-purple px-4 py-2 text-xs shrink-0 cursor-pointer"
            >
              Sign In as Meera (Reviewer)
            </Link>
          </div>
        )}

        {/* ========================================================
            REVIEWER STUDIO MASTER HEADER
            Scoped to the Active Lipi (e.g. Devanagari Review Scope)
            ======================================================== */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 border border-mint-dark/30 text-xs font-mono font-bold text-mint-dark">
                  <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" />
                  <span>Reviewer Workspace Live</span>
                </span>
                <span className="text-xs font-serif font-bold text-muted">
                  Qualified Domain Authority
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-black text-ink tracking-tight">
                {activeLipi.nameNative} ({activeLipi.nameEnglish}) Review Studio
              </h1>

              <p className="text-muted text-xs sm:text-sm font-serif leading-relaxed">
                As an authorized specialist for <span className="font-bold text-ink">{activeLipi.nameNative}</span>, you curate the 3D Knowledge Tree, author interactive quest levels, and calibrate test submissions from community learners.
              </p>
            </div>

            {/* Scope Badge & Stats */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border text-center space-y-1 shadow-soft">
                <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                  Pending Tests
                </span>
                <span className="font-display font-black text-2xl text-[#78350F] dark:text-amber-400">
                  {pendingCount}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border text-center space-y-1 shadow-soft">
                <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                  Tree Branches
                </span>
                <span className="font-display font-black text-2xl text-purple">
                  {activeLipiNodes.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border text-center space-y-1 shadow-soft">
                <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                  Ratified Canon
                </span>
                <span className="font-display font-black text-2xl text-mint-dark">
                  {approvedCount}
                </span>
              </div>
            </div>
          </div>

          {/* Lipi Scope Switcher */}
          <div className="flex items-center gap-2 flex-wrap pt-2 border-t-[1.5px] border-border">
            <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider">
              Reviewer Qualification Scope:
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
                {lipi.id === activeLipi.id && <span className="text-[10px] ml-1">✓ Active</span>}
              </button>
            ))}
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'queue'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <ShieldCheck size={15} />
              <span>1. {activeLipi.nameNative} Test Queue ({pendingCount} pending)</span>
            </button>

            <button
              onClick={() => setActiveTab('treeBuilder')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'treeBuilder'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <PlusCircle size={15} />
              <span>2. Curate Knowledge Tree & Quests ({activeLipiNodes.length} Levels)</span>
            </button>

            <button
              onClick={() => setActiveTab('principles')}
              className={`px-5 py-2.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'principles'
                  ? 'btn-chunky-purple'
                  : 'bg-neutral dark:bg-slate-800 text-muted border border-border hover:text-ink'
              }`}
            >
              <Scale size={15} />
              <span>3. Sabha Calibration Principles</span>
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {decisionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-mint/40 border-[1.5px] border-mint-dark/40 text-xs font-display font-bold text-ink flex items-center gap-2 shadow-soft"
          >
            <CheckCircle2 size={16} className="text-mint-dark" />
            <span>{decisionFeedback}</span>
          </motion.div>
        )}

        {/* ========================================================
            TAB 1: ORTHOGRAPHY REVIEW QUEUE FOR ACTIVE LIPI
            Reviewer receives ONLY tests posted for this specific Lipi
            ======================================================== */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-black text-ink">
                  Orthography Test Queue for {activeLipi.nameNative}
                </h2>
                <p className="text-xs font-serif text-muted">
                  Submissions routed strictly to qualified {activeLipi.nameEnglish} specialists. Decisions require evidence & transparent rationale.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-border self-start sm:self-auto">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-display font-bold ${
                    filterStatus === 'all' ? 'bg-[#78350F] text-white shadow-soft' : 'text-muted hover:text-ink'
                  }`}
                >
                  All ({lipiSubmissions.length})
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-display font-bold ${
                    filterStatus === 'pending' ? 'bg-[#78350F] text-white shadow-soft' : 'text-muted hover:text-ink'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilterStatus('approved')}
                  className={`px-3 py-1 rounded-lg text-xs font-display font-bold ${
                    filterStatus === 'approved' ? 'bg-[#78350F] text-white shadow-soft' : 'text-muted hover:text-ink'
                  }`}
                >
                  Ratified ({approvedCount})
                </button>
              </div>
            </div>

            {filteredSubmissions.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 border-[1.5px] border-dashed border-border rounded-3xl space-y-3">
                <span className="text-4xl block">✨</span>
                <h3 className="font-display font-bold text-base text-ink">
                  No {filterStatus === 'pending' ? 'pending' : ''} submissions for {activeLipi.nameNative}.
                </h3>
                <p className="text-xs text-muted max-w-md mx-auto font-serif">
                  All incoming test samples for {activeLipi.nameEnglish} have been calibrated and verified against Sabha standards.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredSubmissions.map((sub) => {
                  const isApproved = sub.status === 'approved';
                  const isPending = sub.status === 'pending';

                  return (
                    <div
                      key={sub.id}
                      className={`p-6 sm:p-7 rounded-3xl border-[1.5px] transition-all space-y-4 ${
                        isApproved
                          ? 'bg-mint/10 border-mint-dark/30 shadow-card'
                          : 'bg-white dark:bg-slate-900 border-border shadow-card'
                      }`}
                      style={{
                        borderBottomWidth: '4px',
                        borderBottomColor: isApproved ? '#059669' : '#DCCFB9'
                      }}
                    >
                      {/* Card Top: Submitter & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-sm">
                            {activeLipi.symbol}
                          </span>
                          <div>
                            <span className="font-display font-bold text-xs text-ink">{sub.author}</span>
                            <span className="text-[10px] font-mono text-muted block">
                              Submitted {sub.submittedAt} • Scope: {sub.lipiName}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-extrabold px-3 py-1 rounded-full uppercase ${
                            isApproved
                              ? 'bg-mint-dark text-white'
                              : 'bg-amber-100 text-[#78350F] dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {isApproved ? '✓ Ratified Canon' : '⏳ Awaiting Calibration'}
                        </span>
                      </div>

                      {/* Submitted Specimen Text with Audio */}
                      <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-[#78350F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                            Submitted Script Expression:
                          </span>
                          <span className="font-serif font-black text-3xl sm:text-4xl text-ink tracking-wide block">
                            {sub.text}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            playAcousticChime(580, 0.3);
                            playPronunciation(sub.text, activeLipi.gardenLetters[0]?.lang || 'hi-IN');
                          }}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border text-xs font-display font-bold text-[#78350F] hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer shrink-0 self-start sm:self-auto"
                        >
                          <Volume2 size={15} />
                          <span>Audit Acoustic Sound</span>
                        </button>
                      </div>

                      {/* Speaker & Context Metadata */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-neutral/50 dark:bg-slate-800/50 border border-border">
                          <span className="font-mono text-[10px] font-bold text-muted uppercase block">
                            Dialect Tradition:
                          </span>
                          <span className="font-serif text-ink">{sub.dialectRegion}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral/50 dark:bg-slate-800/50 border border-border">
                          <span className="font-mono text-[10px] font-bold text-muted uppercase block">
                            Linguistic Observation:
                          </span>
                          <span className="font-serif text-ink">{sub.phoneticContext}</span>
                        </div>
                      </div>

                      {/* Evaluation & Decision Module for Reviewers */}
                      {isPending ? (
                        <div className="space-y-3 pt-2 border-t border-border">
                          <label className="text-xs font-display font-bold text-ink uppercase tracking-wider block">
                            Reviewer Calibration Rationale (Required for permanent record):
                          </label>
                          <textarea
                            rows={2}
                            value={rationaleMap[sub.id] || ''}
                            onChange={(e) =>
                              setRationaleMap({ ...rationaleMap, [sub.id]: e.target.value })
                            }
                            placeholder={`Document evidence, conjunct accuracy, or dialect respect for this ${activeLipi.nameNative} specimen...`}
                            className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-border focus:border-[#78350F] text-xs font-serif text-ink"
                          />

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <span className="text-[11px] font-serif text-muted flex items-center gap-1">
                              <Info size={13} />
                              <span>Decisions are attributed to your reviewer identity</span>
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleReject(sub.id)}
                                className="px-4 py-2 rounded-xl border border-danger/40 hover:bg-danger-light text-danger text-xs font-display font-bold cursor-pointer transition-all"
                              >
                                ✕ Request Revisions
                              </button>

                              <button
                                type="button"
                                onClick={() => handleApprove(sub.id)}
                                className="btn-chunky-purple px-5 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                              >
                                <Check size={14} strokeWidth={3} />
                                <span>Ratify & Approve as Canon (+75 XP)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-2xl bg-mint/30 dark:bg-emerald-950/40 border border-mint-dark/30 space-y-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-mint-dark flex items-center gap-1 text-[11px]">
                              <ShieldCheck size={14} />
                              <span>Ratified by {sub.reviewerName || 'Lipi Specialist'}:</span>
                            </span>
                            <span className="font-mono text-[10px] text-muted">{sub.evaluatedAt || 'Evaluated'}</span>
                          </div>
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
            TAB 2: KNOWLEDGE TREE & QUEST STUDIO
            Reviewer creates and expands the 3D Tree for their Lipi!
            ======================================================== */}
        {activeTab === 'treeBuilder' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-black text-ink">
                  Curate 3D Knowledge Tree for {activeLipi.nameNative}
                </h2>
                <p className="text-xs font-serif text-muted mt-0.5">
                  Reviewers have domain authority to forge new branches, write lessons, and compose interactive quiz checks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddNodeModal(true)}
                className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <PlusCircle size={15} />
                <span>+ Forge New Branch / Quest (Level {activeLipiNodes.length + 1})</span>
              </button>
            </div>

            {/* List of Current Living Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeLipiNodes.map((node, nIdx) => (
                <div
                  key={node.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-[1.5px] border-border shadow-card space-y-3 relative group"
                  style={{ borderBottomWidth: '4px', borderBottomColor: '#DCCFB9' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#B45309] dark:text-amber-400">
                      Level {node.level} • {node.badgeLabel}
                    </span>

                    {/* Delete button (only allow deleting custom levels beyond the core foundational ones) */}
                    {node.level > 2 && (
                      <button
                        type="button"
                        onClick={() => deleteKnowledgeNode(activeLipi.id, node.id)}
                        className="p-1 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors cursor-pointer"
                        title="Remove branch from tree"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 border border-[#78350F]/20 flex items-center justify-center font-serif font-black text-2xl text-[#78350F] dark:text-amber-300 shrink-0 shadow-soft">
                      {node.glyph}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-ink">{node.title}</h4>
                      <p className="text-xs font-serif text-muted line-clamp-1">{node.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral/50 dark:bg-slate-800/50 border border-border text-xs space-y-1">
                    <span className="font-bold text-[10px] font-mono uppercase text-muted block">Interactive Quiz Check:</span>
                    <p className="font-serif text-ink italic">&ldquo;{node.quizQuestion}&rdquo;</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-border text-[11px] text-muted">
                    <span className="font-serif">Rule: {node.communityRule.slice(0, 35)}...</span>
                    <Link
                      to="/"
                      className="font-bold text-purple hover:underline inline-flex items-center gap-1"
                    >
                      <span>Preview Live</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Forge New Tree Branch */}
            <AnimatePresence>
              {showAddNodeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#FFFDF8] dark:bg-slate-900 rounded-3xl border-[1.5px] border-[#78350F]/30 p-6 sm:p-8 max-w-2xl w-full shadow-elevated space-y-5 my-8"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-base">
                          {activeLipi.symbol}
                        </span>
                        <div>
                          <h3 className="font-display font-black text-base text-ink">
                            Forge Branch {activeLipiNodes.length + 1} for {activeLipi.nameNative} Tree
                          </h3>
                          <p className="text-[11px] font-mono text-muted">
                            Authored content is published directly to the public 3D Knowledge Tree
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAddNodeModal(false)}
                        className="p-1 rounded-lg text-muted hover:text-ink cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {nodePublishSuccess ? (
                      <div className="p-8 text-center space-y-3 bg-mint/30 rounded-2xl border border-mint-dark/30">
                        <CheckCircle2 size={36} className="text-mint-dark mx-auto" />
                        <h4 className="font-display font-black text-lg text-ink">Branch Ratified & Published!</h4>
                        <p className="text-xs font-serif text-muted">
                          Level {activeLipiNodes.length} is now live on the 3D Knowledge Tree for all learners exploring {activeLipi.nameNative}.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleCreateNode} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        {/* Title & Subtitle */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-display font-bold text-ink uppercase">
                              Branch Title:
                            </label>
                            <input
                              type="text"
                              required
                              value={newNodeTitle}
                              onChange={(e) => setNewNodeTitle(e.target.value)}
                              placeholder={`e.g. Vedic Anusvara Mechanics`}
                              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs text-ink"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-display font-bold text-ink uppercase">
                              Focal Character Glyph:
                            </label>
                            <input
                              type="text"
                              required
                              value={newNodeGlyph}
                              onChange={(e) => setNewNodeGlyph(e.target.value)}
                              placeholder={`e.g. ${activeLipi.symbol}`}
                              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs text-ink font-serif text-center font-black"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-display font-bold text-ink uppercase">
                            Branch Subtitle:
                          </label>
                          <input
                            type="text"
                            value={newNodeSubtitle}
                            onChange={(e) => setNewNodeSubtitle(e.target.value)}
                            placeholder="Brief summary of the scribal problem being explored..."
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs text-ink"
                          />
                        </div>

                        {/* Step 1: Learn & Trace */}
                        <div className="p-4 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase text-purple block">
                            Step 1: Scribal Explanation & Lineage
                          </span>
                          <textarea
                            rows={3}
                            required
                            value={newNodeLearnExplanation}
                            onChange={(e) => setNewNodeLearnExplanation(e.target.value)}
                            placeholder={`Explain the phonetic or calligraphic rule for this character in ${activeLipi.nameNative}...`}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border text-xs font-serif text-ink"
                          />
                        </div>

                        {/* Step 2: Interactive Quiz */}
                        <div className="p-4 rounded-2xl bg-neutral/50 dark:bg-slate-800/50 border border-border space-y-3">
                          <span className="text-[10px] font-mono font-bold uppercase text-purple block">
                            Step 2: Interactive Quiz Check
                          </span>
                          <input
                            type="text"
                            required
                            value={newNodeQuizQuestion}
                            onChange={(e) => setNewNodeQuizQuestion(e.target.value)}
                            placeholder="Quiz Question (e.g. When is this ligature preferred over linear letters?)"
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border text-xs text-ink font-bold"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold">Option A</span>
                                <label className="text-[10px] font-mono flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="correctOption"
                                    checked={correctOpt === 0}
                                    onChange={() => setCorrectOpt(0)}
                                  />
                                  <span>Mark Correct</span>
                                </label>
                              </div>
                              <input
                                type="text"
                                required
                                value={opt1Text}
                                onChange={(e) => setOpt1Text(e.target.value)}
                                placeholder="Answer text..."
                                className="w-full p-1.5 rounded-lg border border-border text-xs text-ink"
                              />
                            </div>

                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-border space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold">Option B</span>
                                <label className="text-[10px] font-mono flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="correctOption"
                                    checked={correctOpt === 1}
                                    onChange={() => setCorrectOpt(1)}
                                  />
                                  <span>Mark Correct</span>
                                </label>
                              </div>
                              <input
                                type="text"
                                required
                                value={opt2Text}
                                onChange={(e) => setOpt2Text(e.target.value)}
                                placeholder="Answer text..."
                                className="w-full p-1.5 rounded-lg border border-border text-xs text-ink"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Step 3: Codified Sabha Rule */}
                        <div className="space-y-1">
                          <label className="text-xs font-display font-bold text-ink uppercase">
                            Codified Sabha Principle:
                          </label>
                          <input
                            type="text"
                            value={newNodeRule}
                            onChange={(e) => setNewNodeRule(e.target.value)}
                            placeholder={`Orthography Rule: Conventions must reflect native speaker consensus.`}
                            className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-border text-xs text-ink font-mono"
                          />
                        </div>

                        <div className="pt-2 flex justify-end gap-2 border-t border-border">
                          <button
                            type="button"
                            onClick={() => setShowAddNodeModal(false)}
                            className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-muted hover:text-ink cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn-chunky-purple px-6 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                          >
                            <Send size={13} />
                            <span>Publish to Living Knowledge Tree</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ========================================================
            TAB 3: SABHA CALIBRATION PRINCIPLES
            ======================================================== */}
        {activeTab === 'principles' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="font-display text-xl font-black text-ink">
              Core Reviewer Governance Charter
            </h3>
            <p className="text-xs font-serif text-muted">
              Every calibration decision must adhere to transparent community standards rather than arbitrary preference.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border space-y-2">
                <span className="w-8 h-8 rounded-lg bg-mint text-mint-dark flex items-center justify-center font-black">
                  1
                </span>
                <h4 className="font-display font-bold text-sm text-ink">Rule-Based Assessment</h4>
                <p className="text-xs font-serif text-muted leading-relaxed">
                  Evaluate proposals directly against approved project orthography rules. Personal preference is not a valid evaluation rationale.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border space-y-2">
                <span className="w-8 h-8 rounded-lg bg-purple-light text-purple flex items-center justify-center font-black">
                  2
                </span>
                <h4 className="font-display font-bold text-sm text-ink">Speaker & Dialect Context</h4>
                <p className="text-xs font-serif text-muted leading-relaxed">
                  Respect dialectal variety and regional pronunciation differences. Tag minority variants rather than marking them incorrect.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800 border-[1.5px] border-border space-y-2">
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-[#78350F] flex items-center justify-center font-black">
                  3
                </span>
                <h4 className="font-display font-bold text-sm text-ink">Evidence Verification</h4>
                <p className="text-xs font-serif text-muted leading-relaxed">
                  Verify historical manuscript specimens or recorded audio evidence before ratifying spelling changes into canonical standards.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
