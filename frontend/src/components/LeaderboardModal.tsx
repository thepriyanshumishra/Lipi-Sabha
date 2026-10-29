import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Medal, Award, Flame, ShieldCheck, Sparkles, User as UserIcon, BookOpen, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { playAcousticChime } from '@/utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeaderboardModal({ isOpen, onClose }: LeaderboardModalProps) {
  const { user, allAccounts, isReviewer, switchAccount } = useAuth();
  const [activeTab, setActiveTab] = useState<'learners' | 'reviewers'>(
    isReviewer ? 'reviewers' : 'learners'
  );

  if (!isOpen) return null;

  // Filter & sort accounts
  const learnerAccounts = [...allAccounts]
    .filter((a) => !['reviewer', 'specialist'].includes(a.role))
    .sort((a, b) => (b.learning_xp || 0) - (a.learning_xp || 0));

  const reviewerAccounts = [...allAccounts]
    .filter((a) => ['reviewer', 'specialist', 'facilitator', 'admin'].includes(a.role))
    .sort((a, b) => (b.review_xp || 0) - (a.review_xp || 0));

  const getRankBadge = (rank: number) => {
    if (rank === 0) return <span className="text-xl">🥇</span>;
    if (rank === 1) return <span className="text-xl">🥈</span>;
    if (rank === 2) return <span className="text-xl">🥉</span>;
    return <span className="font-mono text-xs font-bold text-muted">#{rank + 1}</span>;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
          style={{ borderBottomWidth: '4px', borderBottomColor: '#78350F' }}
        >
          {/* Header */}
          <div className="p-5 border-b border-border bg-[#FFFDF9] dark:bg-slate-800/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#B45309] to-amber-400 text-white flex items-center justify-center text-lg shadow-soft">
                🏆
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-ink flex items-center gap-2">
                  <span>Lipi Sabha Sovereign Leaderboard</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-[#78350F] dark:text-amber-300">
                    Live Real-Time
                  </span>
                </h3>
                <p className="text-xs font-serif text-muted">
                  Honoring authentic contributions to living orthographies & sacred scripts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted hover:text-ink hover:bg-neutral cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Two Distinct Tabs: User Leaderboard vs Reviewer Leaderboard */}
          <div className="p-4 border-b border-border bg-neutral/40 dark:bg-slate-800/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-border flex-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('learners');
                  playAcousticChime(520, 0.2);
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'learners'
                    ? 'btn-chunky-purple'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <span>🌱 Learners & Speakers ({learnerAccounts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('reviewers');
                  playAcousticChime(600, 0.2);
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-display font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'reviewers'
                    ? 'btn-chunky-purple'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <span>⚖️ Specialists & Reviewers ({reviewerAccounts.length})</span>
              </button>
            </div>
          </div>

          {/* Leaderboard Ranks Scroll Area */}
          <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
            {activeTab === 'learners' ? (
              learnerAccounts.map((acc, idx) => {
                const isCurrent = user?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-50/80 dark:bg-amber-950/30 border-[#78350F] shadow-soft scale-[1.01]'
                        : 'bg-white dark:bg-slate-800/80 border-border'
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
                            <span className="px-1.5 py-0.2 rounded-md bg-[#78350F] text-white text-[9px] font-mono font-bold">
                              YOU
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
            ) : (
              reviewerAccounts.map((acc, idx) => {
                const isCurrent = user?.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-mint-dark shadow-soft scale-[1.01]'
                        : 'bg-white dark:bg-slate-800/80 border-border'
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
                            <span className="px-1.5 py-0.2 rounded-md bg-mint-dark text-white text-[9px] font-mono font-bold">
                              YOU
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

          {/* XP Earning Legend / Rules Footer */}
          <div className="p-4 border-t border-border bg-[#FFFDF9] dark:bg-slate-800/60 text-xs font-serif text-ink space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-muted tracking-wider block">
              How Community XP is Earned:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-border">
                <span className="font-bold text-mint-dark block">+50 XP</span>
                <span className="text-muted">Orthography Quiz</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-border">
                <span className="font-bold text-[#78350F] dark:text-amber-400 block">+25 XP</span>
                <span className="text-muted">Post Epigraph</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-border">
                <span className="font-bold text-purple block">+10 XP</span>
                <span className="text-muted">Discussion Comment</span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-border">
                <span className="font-bold text-ink block">+5 XP</span>
                <span className="text-muted">Branch Consensus</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
