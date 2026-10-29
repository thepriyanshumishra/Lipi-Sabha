import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, ArrowLeft, ShieldCheck, Sparkles, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { playAcousticChime } from '@/utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'learners' | 'reviewers';
}

export function LeaderboardModal({ isOpen, onClose, defaultTab }: LeaderboardModalProps) {
  const { user, allAccounts, isReviewer, activeWorkspace } = useAuth();
  
  // Decide initial tab based on defaultTab or activeWorkspace
  const initialTab = defaultTab || (activeWorkspace === 'reviewer' || isReviewer ? 'reviewers' : 'learners');
  const [activeTab, setActiveTab] = useState<'learners' | 'reviewers'>(initialTab);

  // Sync tab whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const preferred = defaultTab || (activeWorkspace === 'reviewer' ? 'reviewers' : 'learners');
      setActiveTab(preferred);
    }
  }, [isOpen, defaultTab, activeWorkspace]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Strict separation: Section 1 = Learners only, Section 2 = Reviewers only
  const learnerAccounts = [...allAccounts]
    .filter((a) => !['reviewer', 'specialist', 'facilitator', 'admin'].includes(a.role))
    .sort((a, b) => (b.learning_xp || 0) - (a.learning_xp || 0));

  const reviewerAccounts = [...allAccounts]
    .filter((a) => ['reviewer', 'specialist', 'facilitator', 'admin'].includes(a.role))
    .sort((a, b) => (b.review_xp || 0) - (a.review_xp || 0));

  const getRankBadge = (rank: number) => {
    if (rank === 0) return <span className="text-xl">🥇</span>;
    if (rank === 1) return <span className="text-xl">🥈</span>;
    if (rank === 2) return <span className="text-xl">🥉</span>;
    return <span className="font-mono text-xs font-black text-muted">#{rank + 1}</span>;
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex justify-center items-start sm:items-center p-3 sm:p-6"
        onClick={onClose}
      >
        <div className="min-h-full py-4 sm:py-8 flex items-center justify-center w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border-[2px] border-border shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            style={{ borderBottomWidth: '4px', borderBottomColor: '#78350F' }}
          >
          {/* Header with prominent Back & Close button */}
          <div className="p-4 sm:p-5 border-b border-border bg-[#FFFDF9] dark:bg-slate-800 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-900 text-xs font-display font-bold text-ink hover:bg-neutral transition-all flex items-center gap-1.5 shadow-soft cursor-pointer shrink-0"
                title="Back to Lipi Sabha"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <div className="min-w-0">
                <h3 className="font-display font-black text-base sm:text-lg text-ink flex items-center gap-2 truncate">
                  <span>🏆 Sovereign Leaderboard</span>
                </h3>
                <p className="text-[11px] font-serif text-muted truncate">
                  {activeTab === 'learners'
                    ? 'Showing Community Learners & Speakers'
                    : 'Showing Orthography Specialists & Reviewers'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-muted hover:text-ink hover:bg-neutral transition-colors cursor-pointer shrink-0"
              aria-label="Close"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* 2 Dedicated Distinct Section Tabs */}
          <div className="p-3 bg-neutral/50 dark:bg-slate-800/50 border-b border-border shrink-0">
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-border">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('learners');
                  playAcousticChime(520, 0.2);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'learners'
                    ? 'bg-[#78350F] text-white shadow-soft font-black'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <span>🌱 1. User Leaderboard ({learnerAccounts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('reviewers');
                  playAcousticChime(600, 0.2);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviewers'
                    ? 'bg-mint-dark text-white shadow-soft font-black'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <span>⚖️ 2. Reviewer Leaderboard ({reviewerAccounts.length})</span>
              </button>
            </div>
          </div>

          {/* Content: Section 1 (Learners only) or Section 2 (Reviewers only) */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
            {activeTab === 'learners' ? (
              learnerAccounts.length === 0 ? (
                <div className="p-8 text-center text-xs font-serif text-muted">
                  No community learners found.
                </div>
              ) : (
                learnerAccounts.map((acc, idx) => {
                  const isCurrent = user?.id === acc.id;
                  return (
                    <div
                      key={acc.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-50/90 dark:bg-amber-950/40 border-[#78350F] shadow-soft scale-[1.01]'
                          : 'bg-white dark:bg-slate-800/80 border-border hover:border-[#78350F]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 flex items-center justify-center shrink-0">
                          {getRankBadge(idx)}
                        </div>

                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B45309] to-amber-500 text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                          {acc.display_name.charAt(0)}
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-display font-bold text-xs text-ink truncate">
                              {acc.display_name}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-[#78350F] text-white text-[9px] font-mono font-bold">
                                YOU (Active)
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-muted block truncate">
                            {acc.email}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-display font-black text-sm text-[#78350F] dark:text-amber-400 block">
                          {acc.learning_xp || 0} XP
                        </span>
                        <span className="text-[9px] font-mono text-muted">
                          Learning Points
                        </span>
                      </div>
                    </div>
                  );
                })
              )
            ) : reviewerAccounts.length === 0 ? (
              <div className="p-8 text-center text-xs font-serif text-muted">
                No specialists found.
              </div>
            ) : (
              reviewerAccounts.map((acc, idx) => {
                const isCurrent = user?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-mint-dark shadow-soft scale-[1.01]'
                        : 'bg-white dark:bg-slate-800/80 border-border hover:border-mint-dark/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 flex items-center justify-center shrink-0">
                        {getRankBadge(idx)}
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-mint-dark to-emerald-500 text-white font-display font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {acc.display_name.charAt(0)}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-display font-bold text-xs text-ink truncate">
                            {acc.display_name}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-mint-dark text-white text-[9px] font-mono font-bold">
                              YOU (Reviewer)
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-muted block truncate">
                          {acc.email}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-display font-black text-sm text-mint-dark block">
                        {acc.review_xp || 0} Review XP
                      </span>
                      <span className="text-[9px] font-mono text-muted">
                        Specialist Calibration
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with XP Rules and Bottom Back Button */}
          <div className="p-4 border-t border-border bg-[#FFFDF9] dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="text-[10px] font-mono text-muted">
              <span>💡 Earn: <strong>+50 XP</strong> Quiz • <strong>+25 XP</strong> Doubt • <strong>+10 XP</strong> Comment</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn-chunky-purple px-5 py-1.5 text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-soft"
            >
              <ArrowLeft size={13} />
              <span>Back to Lipi Sabha</span>
            </button>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
