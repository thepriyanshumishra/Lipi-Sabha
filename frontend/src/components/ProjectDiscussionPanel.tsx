import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Send, Sparkles, ChevronDown, ChevronUp, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLipi } from '@/contexts/LipiContext';
import { playSuccessChime, playAcousticChime } from '@/utils/audio';
import type { ProjectComment } from '@/data/lipiData';

interface ProjectDiscussionPanelProps {
  projectId: string;
  projectTitle?: string;
  comments?: ProjectComment[];
}

export function ProjectDiscussionPanel({
  projectId,
  projectTitle,
  comments = []
}: ProjectDiscussionPanelProps) {
  const { user, awardXP } = useAuth();
  const { addCommentToProject, likeComment } = useLipi();
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const handlePostComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    const authorName = user?.display_name || 'Community Speaker';
    const authorRole = ['reviewer', 'specialist'].includes(user?.role || '')
      ? 'Reviewer'
      : 'Community Member';

    addCommentToProject(projectId, commentText, authorName, authorRole);
    awardXP(10, 'Contributed to community orthographic discussion');
    playSuccessChime();
    setCommentText('');
  };

  const handleLike = (commentId: string) => {
    if (likedMap[commentId]) return;
    likeComment(projectId, commentId);
    setLikedMap((prev) => ({ ...prev, [commentId]: true }));
    playAcousticChime(650, 0.2);
  };

  const quickReactions = ['✨ Lossless phonetics', '🙏 Cultural consensus', '💡 Great keypad observation', '📜 Historically accurate'];

  return (
    <div className="w-full pt-1">
      {/* Toggle Discussion Header Pill */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            playAcousticChime(isOpen ? 400 : 540, 0.2);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            isOpen
              ? 'bg-[#78350F] text-white shadow-soft'
              : 'bg-neutral/80 dark:bg-slate-800 border border-border text-ink hover:border-[#78350F]'
          }`}
          title="Open community discussion"
        >
          <MessageCircle size={13} className={isOpen ? 'text-white' : 'text-[#B45309]'} />
          <span>Discussion ({comments.length})</span>
          {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {comments.length > 0 && !isOpen && (
          <span className="text-[10px] font-mono text-muted truncate max-w-[200px]">
            Latest: &ldquo;{comments[comments.length - 1].content.slice(0, 32)}...&rdquo;
          </span>
        )}
      </div>

      {/* Expandable Instagram-Style Discussion Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-3 rounded-2xl bg-[#FFFDF9] dark:bg-slate-900 border-[1.5px] border-[#78350F]/20 p-4 space-y-3.5 shadow-soft"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border/80 pb-2">
              <span className="text-[11px] font-mono font-bold uppercase text-[#78350F] dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Community Orthographic Dialogue</span>
              </span>
              <span className="text-[10px] font-mono text-mint-dark font-bold">
                +10 XP per comment
              </span>
            </div>

            {/* Comments List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <div className="p-4 text-center text-xs font-serif text-muted italic">
                  No comments yet. Be the first to share an orthographic perspective!
                </div>
              ) : (
                comments.map((comm) => {
                  const isHearted = likedMap[comm.id];
                  const isSpecialist = comm.authorRole?.toLowerCase().includes('reviewer') || comm.author.includes('Reviewer');

                  return (
                    <div
                      key={comm.id}
                      className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-border/70 flex items-start justify-between gap-3 group hover:border-[#78350F]/40 transition-colors"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        {/* Avatar */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-display font-black text-xs text-white shrink-0 shadow-sm ${
                            isSpecialist
                              ? 'bg-gradient-to-tr from-mint-dark to-emerald-400'
                              : 'bg-gradient-to-tr from-[#B45309] to-amber-500'
                          }`}
                        >
                          {comm.author.charAt(0)}
                        </div>

                        {/* Content */}
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-bold text-xs text-ink">
                              {comm.author}
                            </span>
                            {comm.authorRole && (
                              <span
                                className={`text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded-md ${
                                  isSpecialist
                                    ? 'bg-mint/40 text-mint-dark'
                                    : 'bg-neutral text-muted'
                                }`}
                              >
                                {comm.authorRole}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-muted">
                              {comm.createdAt}
                            </span>
                          </div>

                          <p className="text-xs font-serif text-ink leading-relaxed">
                            {comm.content}
                          </p>
                        </div>
                      </div>

                      {/* Heart Button (Instagram style) */}
                      <button
                        type="button"
                        onClick={() => handleLike(comm.id)}
                        className={`p-1 rounded-lg text-xs font-mono flex flex-col items-center gap-0.5 cursor-pointer shrink-0 transition-transform active:scale-125 ${
                          isHearted
                            ? 'text-rose-600'
                            : 'text-muted hover:text-rose-500'
                        }`}
                        title="Appreciate comment"
                      >
                        <Heart
                          size={14}
                          className={isHearted ? 'fill-rose-600' : ''}
                        />
                        <span className="text-[10px] leading-none">
                          {(comm.likes || 0) + (isHearted ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick reaction chips */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-mono text-muted mr-1">Quick:</span>
              {quickReactions.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCommentText((prev) => (prev ? `${prev} ${chip}` : chip))}
                  className="px-2 py-0.5 rounded-lg bg-neutral/80 dark:bg-slate-800 hover:bg-[#78350F]/10 border border-border text-[10px] font-serif text-ink cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Instagram-style Inline Post Box */}
            <form onSubmit={handlePostComment} className="pt-2 border-t border-border flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#78350F] text-white flex items-center justify-center font-display font-black text-xs shrink-0">
                {user?.display_name?.charAt(0) || 'U'}
              </div>

              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`Comment as ${user?.display_name || 'Community Member'}...`}
                className="flex-1 px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-slate-800 text-xs font-serif text-ink focus:border-[#78350F] focus:outline-none"
              />

              <button
                type="submit"
                disabled={!commentText.trim()}
                className="btn-chunky-purple px-3.5 py-1.5 text-xs inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 shadow-soft"
              >
                <Send size={12} />
                <span>Post</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
