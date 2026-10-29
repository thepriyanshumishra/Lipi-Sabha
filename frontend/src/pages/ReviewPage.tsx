import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Edit3,
  Trash2,
  Plus,
  Volume2,
  Check,
  X,
  AlertTriangle,
  Camera,
  MessageSquare,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLipi } from '@/contexts/LipiContext';
import { playPronunciation, playAcousticChime, playSuccessChime } from '@/utils/audio';
import type { LipiKnowledgeNode, ScriptProject } from '@/data/lipiData';

export function ReviewPage() {
  const { user, isReviewer } = useAuth();
  const {
    activeLipi,
    allLipis,
    setLipiId,
    activeLipiNodes,
    addKnowledgeNode,
    updateKnowledgeNode,
    deleteKnowledgeNode,
    projects,
    verifyProject,
    flagProject
  } = useLipi();

  // Exactly Two Dedicated Options for Reviewer
  const [activeTab, setActiveTab] = useState<'queue' | 'treeEditor'>('queue');
  const [lipiScopeFilter, setLipiScopeFilter] = useState<'all' | string>('all');

  // Reviewer Chat / Commentary per post
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  // Edit Node Modal State
  const [editingNode, setEditingNode] = useState<LipiKnowledgeNode | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editGlyph, setEditGlyph] = useState('');
  const [editExplanation, setEditExplanation] = useState('');
  const [editCulturalNote, setEditCulturalNote] = useState('');
  const [editQuizQuestion, setEditQuizQuestion] = useState('');

  // Add Node Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGlyph, setNewGlyph] = useState(activeLipi.symbol);
  const [newExplanation, setNewExplanation] = useState('');
  const [newQuizQuestion, setNewQuizQuestion] = useState('');

  // Unverified Queue: items awaiting reviewer inspection
  const unverifiedProjects = projects.filter((p) => p.status === 'unverified');
  const filteredQueue = unverifiedProjects.filter((p) => {
    if (lipiScopeFilter === 'all') return true;
    return p.lipiId === lipiScopeFilter;
  });

  // Action: Verify & Accept
  const handleVerify = (proj: ScriptProject) => {
    const comment =
      commentMap[proj.id]?.trim() ||
      `Verified by ${user?.display_name || 'Meera (Reviewer)'}. Conforms with documented ${proj.lipiName} orthographic canon.`;

    verifyProject(proj.id, comment, user?.display_name || 'Meera (Reviewer)');
    playSuccessChime();
    setDecisionFeedback(`✓ Verified and published to public User Space: "${proj.title}"`);
    setTimeout(() => setDecisionFeedback(null), 3500);
  };

  // Action: Flag as Wrong
  const handleFlag = (proj: ScriptProject) => {
    const reason =
      commentMap[proj.id]?.trim() ||
      'Flagged: Does not meet orthographic standards or needs revision.';

    flagProject(proj.id, reason, user?.display_name || 'Meera (Reviewer)');
    playAcousticChime(320, 0.25);
    setDecisionFeedback(`Flagged post: "${proj.title}"`);
    setTimeout(() => setDecisionFeedback(null), 3500);
  };

  // Open Edit Node Modal
  const handleOpenEdit = (node: LipiKnowledgeNode) => {
    setEditingNode(node);
    setEditTitle(node.title);
    setEditGlyph(node.glyph);
    setEditExplanation(node.learnExplanation);
    setEditCulturalNote(node.culturalNote);
    setEditQuizQuestion(node.quizQuestion);
  };

  // Save Edited Node
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNode) return;

    updateKnowledgeNode(activeLipi.id, editingNode.id, {
      title: editTitle.trim(),
      glyph: editGlyph.trim(),
      learnExplanation: editExplanation.trim(),
      culturalNote: editCulturalNote.trim(),
      quizQuestion: editQuizQuestion.trim()
    });

    playSuccessChime();
    setDecisionFeedback(`✓ Node "${editTitle}" updated successfully!`);
    setEditingNode(null);
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  // Add New Node
  const handleSaveNewNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLevel = activeLipiNodes.length + 1;
    const newNode: LipiKnowledgeNode = {
      id: `${activeLipi.id}-node-${Date.now()}`,
      level: newLevel,
      title: newTitle.trim(),
      subtitle: `Lesson #${newLevel} in ${activeLipi.nameNative}`,
      glyph: newGlyph.trim() || activeLipi.symbol,
      scriptName: `${activeLipi.nameNative} (${activeLipi.nameEnglish})`,
      themeColor: activeLipi.themeColor,
      badgeLabel: 'Specialist Curated',
      lang: 'hi-IN',
      spokenForm: newGlyph.trim() || activeLipi.symbol,
      learnTitle: `Lesson: ${newTitle.trim()}`,
      learnExplanation: newExplanation.trim() || `Scribal and phonetic mechanics of ${activeLipi.nameNative}.`,
      culturalNote: `Documented tradition in ${activeLipi.region}.`,
      sampleWords: [{ char: newGlyph.trim(), ipa: `/${newGlyph.trim()}/`, gloss: 'Phoneme' }],
      quizQuestion: newQuizQuestion.trim() || 'Does this letter follow historical orthography?',
      quizOptions: [
        { text: 'Conforms to classical standard', subtext: 'Verified canon', isCorrect: true },
        { text: 'Violates script rules', subtext: 'Non-standard', isCorrect: false }
      ],
      quizExplanation: 'Correct! Documented rules require phonetic fidelity.',
      deepTitle: 'Community Wisdom',
      deepLore: `Preserved by community consultation in ${activeLipi.region}.`,
      dialectInsight: 'Regional oral variations are respected.',
      dialectSample: { label: 'Listen to Sound', text: newGlyph.trim(), lang: 'hi-IN' },
      communityRule: `Rule #${newLevel}: Spelling must be verified through consensus.`
    };

    addKnowledgeNode(activeLipi.id, newNode);
    playSuccessChime();
    setDecisionFeedback(`✓ New lesson "${newTitle}" added to Knowledge Tree!`);
    setShowAddModal(false);
    setNewTitle('');
    setNewExplanation('');
    setNewQuizQuestion('');
    setTimeout(() => setDecisionFeedback(null), 3000);
  };

  return (
    <div className="bg-cream min-h-screen py-10 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">

        {/* Top Header: Simple & Uncluttered */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border p-6 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mint/50 border border-mint-dark/30 text-[10px] font-mono font-bold text-mint-dark uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-dark animate-pulse" />
                  <span>Reviewer Workspace</span>
                </span>
                <span className="text-xs font-serif text-muted">
                  Logged in as {user?.display_name || 'Meera (Reviewer)'}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-ink">
                Lipi Sabha Specialist Studio
              </h1>
              <p className="text-xs sm:text-sm font-serif text-muted">
                Inspect user-posted unverified doubts, flag or verify them, and curate the Knowledge Tree.
              </p>
            </div>

            {/* Two Clean Tabs */}
            <div className="flex items-center gap-2 bg-neutral/80 dark:bg-slate-800 p-1 rounded-2xl border border-border self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('queue')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'queue'
                    ? 'btn-chunky-purple'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <ShieldCheck size={14} />
                <span>1. Review Queue ({unverifiedProjects.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('treeEditor')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'treeEditor'
                    ? 'btn-chunky-purple'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <Edit3 size={14} />
                <span>2. Edit Knowledge Tree ({activeLipiNodes.length})</span>
              </button>
            </div>
          </div>

          {/* Script Scope Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-border">
            <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider">
              Script Scope:
            </span>
            <button
              type="button"
              onClick={() => {
                setLipiScopeFilter('all');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold cursor-pointer transition-all ${
                lipiScopeFilter === 'all'
                  ? 'bg-[#78350F] text-white shadow-soft'
                  : 'bg-white dark:bg-slate-800 border border-border text-ink hover:border-[#78350F]/40'
              }`}
            >
              All Lipis ({unverifiedProjects.length})
            </button>
            {allLipis.map((lipi) => {
              const count = unverifiedProjects.filter((p) => p.lipiId === lipi.id).length;
              return (
                <button
                  key={lipi.id}
                  type="button"
                  onClick={() => {
                    setLipiScopeFilter(lipi.id);
                    setLipiId(lipi.id);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold cursor-pointer transition-all flex items-center gap-1 ${
                    lipiScopeFilter === lipi.id || (activeTab === 'treeEditor' && activeLipi.id === lipi.id)
                      ? 'bg-[#78350F] text-white shadow-soft'
                      : 'bg-white dark:bg-slate-800 border border-border text-ink hover:border-[#78350F]/40'
                  }`}
                >
                  <span className="font-serif font-black">{lipi.symbol}</span>
                  <span>{lipi.nameNative}</span>
                  {count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-[#78350F] text-[9px] font-black">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Feedback Banner */}
        {decisionFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-mint/30 border border-mint-dark/40 text-xs font-display font-bold text-ink flex items-center gap-2 shadow-soft"
          >
            <CheckCircle2 size={16} className="text-mint-dark" />
            <span>{decisionFeedback}</span>
          </motion.div>
        )}

        {/* ========================================================
            TAB 1: REVIEW QUEUE (UNVERIFIED USER POSTS)
            Simple, clean cards: View doubt, photo, hear audio, comment, Flag or Verify & Accept
            ======================================================== */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-black text-ink">
                Unverified User Doubts & Posts ({filteredQueue.length} pending)
              </h2>
              <span className="text-xs font-serif text-muted">
                Posts verified here immediately reflect on the public User Space.
              </span>
            </div>

            {filteredQueue.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 border-[1.5px] border-dashed border-border rounded-3xl space-y-2">
                <span className="text-3xl block">✨</span>
                <h3 className="font-display font-bold text-base text-ink">
                  No unverified posts in queue!
                </h3>
                <p className="text-xs font-serif text-muted max-w-sm mx-auto">
                  All community questions and inscription photos have been inspected and verified.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQueue.map((proj) => {
                  const comment = commentMap[proj.id] || '';

                  return (
                    <div
                      key={proj.id}
                      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border-[1.5px] border-border shadow-card space-y-4"
                      style={{ borderBottomWidth: '3px', borderBottomColor: '#78350F' }}
                    >
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#78350F] text-white flex items-center justify-center font-serif font-black text-xs">
                            {allLipis.find((l) => l.id === proj.lipiId)?.symbol || 'ल'}
                          </span>
                          <div>
                            <span className="font-display font-bold text-xs text-ink">{proj.author}</span>
                            <span className="text-[10px] font-mono text-muted block">
                              {proj.submittedAt} • Scope: {proj.lipiName}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-[#78350F] dark:text-amber-300 uppercase">
                          ⏳ Unverified Post
                        </span>
                      </div>

                      {/* Content: Doubt Word / Question */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800 border border-[#78350F]/20">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-muted uppercase block">
                            User's Question / Spoken Word:
                          </span>
                          <span className="font-serif font-black text-2xl text-ink">
                            {proj.spokenWord}
                          </span>
                          {proj.title !== proj.spokenWord && (
                            <p className="text-xs font-serif text-muted">{proj.title}</p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            playPronunciation(proj.spokenWord, 'hi-IN');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-700 border border-border text-xs font-display font-bold text-ink hover:border-[#78350F] inline-flex items-center gap-1.5 shadow-soft cursor-pointer self-start sm:self-auto"
                        >
                          <Volume2 size={14} className="text-[#B45309]" />
                          <span>Hear Pronunciation</span>
                        </button>
                      </div>

                      {/* Attached Photo (if any) */}
                      {proj.imageUrl && (
                        <div className="p-3 rounded-2xl bg-neutral/50 dark:bg-slate-800 border border-border flex items-center gap-3">
                          <img
                            src={proj.imageUrl}
                            alt="Specimen"
                            className="w-16 h-16 object-cover rounded-xl border border-border shadow-soft"
                          />
                          <div className="text-xs font-serif text-ink">
                            <span className="font-bold block text-[#78350F]">Attached Picture / Inscription</span>
                            <span className="text-muted text-[11px]">Submitted by user for orthographic decipherment.</span>
                          </div>
                        </div>
                      )}

                      {/* Optional Spelling Options / Branches if user added any */}
                      {proj.options && proj.options.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold uppercase text-muted block">
                            User-Suggested Spelling Options:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.options.map((opt, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-neutral dark:bg-slate-800 border border-border text-xs font-serif font-bold text-ink"
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reviewer Action Bar: Simple Comment + Flag / Verify */}
                      <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-slate-800/80 border-[1.5px] border-[#78350F]/20 space-y-3">
                        <div className="flex items-center gap-2">
                          <MessageSquare size={14} className="text-[#B45309]" />
                          <span className="text-xs font-display font-bold text-ink uppercase">
                            Reviewer Explanation & Specialist Verdict (रिव्यूअर टिप्पणी):
                          </span>
                        </div>

                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setCommentMap({ ...commentMap, [proj.id]: e.target.value })}
                          placeholder="उदा. देवनागरी में दीर्घ ई की मात्रा (ी) सटीक है। SMS हेतु R-I-N-A मान्य है..."
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-border focus:border-[#78350F] text-xs font-serif text-ink"
                        />

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => handleFlag(proj)}
                            className="px-3.5 py-1.5 rounded-xl border border-danger/40 hover:bg-danger-light text-danger text-xs font-display font-bold cursor-pointer transition-colors"
                          >
                            <span>🚩 Flag as Wrong</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVerify(proj)}
                            className="btn-chunky-purple px-5 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                          >
                            <Check size={14} />
                            <span>Verify & Accept (स्वीकृत एवं प्रमाणित करें)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 2: KNOWLEDGE TREE EDITOR
            Reviewer can: Click ✏️ Edit on any node, 🗑️ Delete, or ➕ Add Node
            ======================================================== */}
        {activeTab === 'treeEditor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-black text-ink">
                  Curate Knowledge Tree for {activeLipi.nameNative} ({activeLipiNodes.length} Levels)
                </h2>
                <p className="text-xs font-serif text-muted">
                  Click the ✏️ pen icon on any node to edit text/quizzes, or ➕ to add a new lesson.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="btn-chunky-purple px-4 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
              >
                <Plus size={14} />
                <span>+ Add Lesson Node</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeLipiNodes.map((node) => (
                <div
                  key={node.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-[1.5px] border-border shadow-card space-y-3 relative group"
                  style={{ borderBottomWidth: '3px', borderBottomColor: '#DCCFB9' }}
                >
                  {/* Top Bar with Edit & Delete Action Icons */}
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400">
                      Level {node.level} • {node.badgeLabel}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(node)}
                        className="p-1.5 rounded-lg bg-amber-50 dark:bg-slate-800 text-[#78350F] dark:text-amber-300 hover:bg-[#78350F] hover:text-white transition-colors cursor-pointer"
                        title="Edit Node (संपादित करें)"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete lesson "${node.title}"?`)) {
                            deleteKnowledgeNode(activeLipi.id, node.id);
                            playAcousticChime(350, 0.2);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-neutral dark:bg-slate-800 text-danger hover:bg-danger hover:text-white transition-colors cursor-pointer"
                        title="Delete Node"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Node Content */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-[#78350F]/20 flex items-center justify-center font-serif font-black text-2xl text-ink shrink-0">
                      {node.glyph}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-display font-black text-sm text-ink truncate">
                        {node.title}
                      </h4>
                      <p className="text-xs font-serif text-muted line-clamp-2">
                        {node.learnExplanation}
                      </p>
                    </div>
                  </div>

                  {/* Quiz Preview */}
                  <div className="p-2.5 rounded-xl bg-neutral/60 dark:bg-slate-800/60 border border-border text-[11px] font-serif text-ink space-y-0.5">
                    <span className="font-bold text-[#78350F] block">Interactive Quiz:</span>
                    <p className="text-muted truncate">{node.quizQuestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Edit Node Modal */}
      {editingNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-lg overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-[#FFFDF9] dark:bg-slate-800 flex items-center justify-between">
              <span className="font-display font-black text-sm text-ink flex items-center gap-1.5">
                <Edit3 size={15} className="text-[#B45309]" />
                <span>Edit Lesson: {editingNode.title}</span>
              </span>
              <button
                type="button"
                onClick={() => setEditingNode(null)}
                className="text-muted hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Lesson Title:</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-display font-bold text-ink"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Representative Glyph:</label>
                <input
                  type="text"
                  value={editGlyph}
                  onChange={(e) => setEditGlyph(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif font-black text-ink"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Scribal Explanation:</label>
                <textarea
                  rows={2}
                  value={editExplanation}
                  onChange={(e) => setEditExplanation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif text-ink"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Quiz Question:</label>
                <input
                  type="text"
                  value={editQuizQuestion}
                  onChange={(e) => setEditQuizQuestion(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif text-ink"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNode(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-border text-xs font-bold text-muted hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-chunky-purple px-5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                >
                  <Check size={13} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add New Node Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-lg overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-[#FFFDF9] dark:bg-slate-800 flex items-center justify-between">
              <span className="font-display font-black text-sm text-ink flex items-center gap-1.5">
                <Plus size={15} className="text-[#B45309]" />
                <span>Add Lesson Node to {activeLipi.nameNative}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-muted hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveNewNode} className="p-5 space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Lesson Title:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master the Shirorekha Hanging Bar"
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-display font-bold text-ink"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Glyph / Character:</label>
                <input
                  type="text"
                  value={newGlyph}
                  onChange={(e) => setNewGlyph(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif font-black text-ink"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Scribal Explanation:</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Explain why this letter or rule is important..."
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif text-ink"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-muted block">Quiz Question:</label>
                <input
                  type="text"
                  value={newQuizQuestion}
                  onChange={(e) => setNewQuizQuestion(e.target.value)}
                  placeholder="e.g. Which sandhi rule applies here?"
                  className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif text-ink"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-border text-xs font-bold text-muted hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-chunky-purple px-5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
                >
                  <Plus size={13} />
                  <span>Publish Lesson Node</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
