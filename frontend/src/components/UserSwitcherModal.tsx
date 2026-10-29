import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Check, ShieldCheck, User as UserIcon, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { playSuccessChime, playAcousticChime } from '@/utils/audio';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSwitcherModal({ isOpen, onClose }: UserSwitcherModalProps) {
  const { user, allAccounts, switchAccount, createAccount } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'learner' | 'reviewer' | 'contributor'>('learner');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createAccount(name, email, role);
    playSuccessChime();
    setName('');
    setEmail('');
    setShowCreateForm(false);
    onClose();
  };

  const handleSwitch = (id: number) => {
    switchAccount(id);
    playAcousticChime(580, 0.25);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border-[1.5px] border-border shadow-elevated w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
          style={{ borderBottomWidth: '4px', borderBottomColor: '#78350F' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-border bg-[#FFFDF9] dark:bg-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#78350F] text-white flex items-center justify-center font-display font-black text-sm shadow-soft">
                👥
              </span>
              <div>
                <h3 className="font-display font-black text-base text-ink">
                  Switch Identity or Create Persona
                </h3>
                <p className="text-[11px] font-serif text-muted">
                  Current: <strong className="text-ink">{user?.display_name}</strong> ({user?.role})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-muted hover:text-ink hover:bg-neutral cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Create Persona Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-muted">
                Available Identities ({allAccounts.length})
              </span>

              <button
                type="button"
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="text-xs font-display font-bold text-[#78350F] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <UserPlus size={13} />
                <span>{showCreateForm ? 'View Existing' : '+ Create Unique User / Reviewer'}</span>
              </button>
            </div>

            {/* Create New User / Reviewer Form */}
            {showCreateForm ? (
              <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800 border-[1.5px] border-[#78350F]/20 space-y-3">
                <span className="text-xs font-display font-bold text-ink uppercase block">
                  Create Brand New Persona:
                </span>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-muted uppercase block">Display Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Sharma, Dr. Anand..."
                    className="w-full px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-900 text-xs font-serif text-ink"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-muted uppercase block">Identity Role:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('learner')}
                      className={`p-2 rounded-xl border text-xs font-display font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        role === 'learner'
                          ? 'bg-[#78350F] text-white border-[#78350F] shadow-soft'
                          : 'bg-white dark:bg-slate-900 border-border text-ink'
                      }`}
                    >
                      <span>🌱 Community Learner</span>
                      <span className="text-[10px] font-serif opacity-80">Ask doubts, vote, learn</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('reviewer')}
                      className={`p-2 rounded-xl border text-xs font-display font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        role === 'reviewer'
                          ? 'bg-mint-dark text-white border-mint-dark shadow-soft'
                          : 'bg-white dark:bg-slate-900 border-border text-ink'
                      }`}
                    >
                      <span>⚖️ Lipi Reviewer</span>
                      <span className="text-[10px] font-serif opacity-80">Verify posts & edit tree</span>
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-3 py-1.5 rounded-xl border border-border text-xs text-muted hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-chunky-purple px-4 py-1.5 text-xs inline-flex items-center gap-1 shadow-soft cursor-pointer"
                  >
                    <Check size={13} />
                    <span>Create & Switch Now</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Accounts List */
              <div className="space-y-2">
                {allAccounts.map((acc) => {
                  const isActive = user?.id === acc.id;
                  const isRev = ['reviewer', 'specialist', 'facilitator', 'admin'].includes(acc.role);

                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleSwitch(acc.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-amber-50 dark:bg-slate-800 border-[#78350F] shadow-soft scale-[1.01]'
                          : 'bg-white dark:bg-slate-800/60 border-border hover:border-[#78350F]/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm text-white shrink-0 ${
                            isRev
                              ? 'bg-mint-dark'
                              : 'bg-[#B45309]'
                          }`}
                        >
                          {acc.display_name.charAt(0)}
                        </div>

                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-display font-bold text-xs text-ink truncate">
                              {acc.display_name}
                            </span>
                            <span
                              className={`text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded-md ${
                                isRev
                                  ? 'bg-mint/40 text-mint-dark'
                                  : 'bg-amber-100 dark:bg-amber-950 text-[#78350F] dark:text-amber-300'
                              }`}
                            >
                              {isRev ? 'Reviewer' : 'Learner'}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-muted block truncate">
                            {acc.email} • {isRev ? `${acc.review_xp || 0} Review XP` : `${acc.learning_xp || 0} Learning XP`}
                          </span>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="px-2 py-1 rounded-lg bg-[#78350F] text-white text-[10px] font-mono font-bold shrink-0">
                          Active ✓
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-lg border border-border text-[11px] font-display font-bold text-ink hover:border-[#78350F] shrink-0"
                        >
                          Switch
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
