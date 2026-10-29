import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { demoReviewTasks } from '@/data/demo';
import { useAuth } from '@/contexts/AuthContext';

export function ReviewPage() {
  const { user, isReviewer } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterScope, setFilterScope] = useState<string>('all');
  const [showPrinciples, setShowPrinciples] = useState<boolean>(false);

  const tasks = demoReviewTasks;
  const filtered = tasks.filter((t) => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesScope = filterScope === 'all' || t.task_scope.toLowerCase().includes(filterScope.toLowerCase());
    return matchesStatus && matchesScope;
  });

  const assignedCount = tasks.filter((t) => t.status === 'assigned').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Context Banner for Non-Reviewers */}
        {!isReviewer && (
          <div className="card-catchy p-6 sm:p-7 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-purple/30">
            <div className="space-y-1">
              <span className="badge-catchy-purple">
                <Info size={13} />
                Observer Mode
              </span>
              <h2 className="font-display text-xl font-black text-ink">
                Review Studio is currently in preview.
              </h2>
              <p className="text-xs text-muted max-w-xl">
                The Review Studio is a transparent environment where community reviewers assess submissions against consensus orthography rules.
              </p>
            </div>
            <Link
              to="/auth/sign-in"
              className="btn-chunky-purple px-5 py-2.5 text-xs whitespace-nowrap shadow-soft"
            >
              Sign In as Reviewer
            </Link>
          </div>
        )}

        {/* Master Studio Hero & Command Header */}
        <div className="card-catchy p-8 sm:p-10 bg-gradient-to-br from-white via-white to-purple-light/20 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-mint/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-lilac/50 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header Description */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="badge-catchy-mint">
                  <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" />
                  Review Studio Live
                </span>
                <span className="text-xs font-display font-extrabold text-muted">
                  Community Consensus Protocol
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.15]">
                Evaluation & Calibration Queue
              </h1>

              <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-2xl font-sans">
                Verify submitted words, sentences, and rules against approved orthography standards. Review decisions are based on transparent evidence, speaker context, and consensus—never personal preference.
              </p>

              {/* Collapsible Principles Guide Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowPrinciples(!showPrinciples)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral/60 border border-border/80 text-xs font-display font-extrabold text-ink hover:border-purple/50 transition-colors"
                >
                  <BookOpen size={14} className="text-purple" />
                  <span>{showPrinciples ? 'Hide Reviewer Principles' : 'View Core Reviewer Principles'}</span>
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-200 ${showPrinciples ? 'rotate-90' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Right: Integrated Metrics & Audited XP Pod */}
            <div className="lg:col-span-5 bg-neutral/40 backdrop-blur-sm rounded-3xl border border-border/80 p-6 space-y-5 shadow-soft">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-mint-dark text-white flex items-center justify-center font-bold text-xl shadow-soft">
                    <Scale size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-display font-extrabold text-muted tracking-wider block">
                      Audited Review XP
                    </span>
                    <p className="font-display font-black text-2xl text-ink leading-tight">
                      {user?.review_xp || 650} XP
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-mint text-mint-dark text-xs font-display font-black">
                  Level 2 Reviewer
                </span>
              </div>

              {/* Compact Metrics Row */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white border border-border/70">
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-muted block">
                    Queue
                  </span>
                  <span className="font-display font-black text-xl text-purple">
                    {assignedCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-border/70">
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-muted block">
                    Active
                  </span>
                  <span className="font-display font-black text-xl text-yellow-dark">
                    {inProgressCount}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-border/70">
                  <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-muted block">
                    Consensus
                  </span>
                  <span className="font-display font-black text-xl text-mint-dark">
                    14
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Principles Strip */}
          {showPrinciples && (
            <div className="mt-8 pt-6 border-t border-border/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral/50 border border-border/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-display font-black text-ink">
                  <span>📖</span>
                  <span>Rule Compliance</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Evaluate proposals directly against approved project orthography rules, not subjective aesthetics.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral/50 border border-border/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-display font-black text-ink">
                  <span>🎙️</span>
                  <span>Dialect Respect</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Regional variants are valid speech forms. Tag dialect metadata instead of rejecting variations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral/50 border border-border/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-display font-black text-ink">
                  <span>✍️</span>
                  <span>Mandatory Rationale</span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  Every decision requires documented, transparent feedback explaining the rationale for the community.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Clean Filter & Scope Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `All Tasks (${tasks.length})` },
              { id: 'assigned', label: `Assigned (${assignedCount})` },
              { id: 'in_progress', label: `In Progress (${inProgressCount})` },
              { id: 'completed', label: 'Verified (14)' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilterStatus(id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                  filterStatus === id
                    ? 'bg-purple text-white shadow-soft'
                    : 'bg-white border-2 border-border text-muted hover:text-ink hover:border-purple/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border-2 border-border">
            <span className="text-[11px] font-display font-extrabold text-muted">Scope:</span>
            {['all', 'spelling', 'phonology'].map((scope) => (
              <button
                key={scope}
                onClick={() => setFilterScope(scope)}
                className={`px-2.5 py-1 rounded-xl text-xs font-display font-bold capitalize transition-all cursor-pointer ${
                  filterScope === scope
                    ? 'bg-lilac text-purple'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Catchy Task Cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="card-catchy p-12 text-center space-y-3 bg-white">
              <span className="text-4xl block">✨</span>
              <h3 className="font-display text-xl font-black text-ink">Review Queue is Clear!</h3>
              <p className="text-xs text-muted max-w-sm mx-auto">
                No tasks match your selected filter criteria. All pending community contributions have been reviewed.
              </p>
            </div>
          ) : (
            filtered.map((task) => (
              <div
                key={task.id}
                className="card-catchy p-6 sm:p-7 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple/50 group"
              >
                {/* Left: Character Badge + Details */}
                <div className="flex items-start gap-5">
                  {/* Distinct Glyph Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lilac to-purple-light border-2 border-purple/20 flex flex-col items-center justify-center shrink-0 shadow-soft group-hover:scale-105 transition-transform">
                    <span className="font-display text-2xl font-black text-purple">
                      {task.contribution.content.charAt(0) || 'ल'}
                    </span>
                    <span className="text-[9px] font-display font-extrabold uppercase tracking-wider text-purple/70">
                      GLYPH
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-catchy-purple capitalize text-[11px]">
                        {task.contribution.contribution_type.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-display font-extrabold text-ink">
                        {task.contribution.project_name}
                      </span>
                      <span className="text-[11px] text-muted">
                        • Scope: <strong className="text-ink">{task.task_scope}</strong>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black text-ink tracking-tight">
                      &ldquo;{task.contribution.content}&rdquo;
                    </h3>

                    <p className="text-xs text-muted flex flex-wrap items-center gap-2">
                      <span>Assigned {new Date(task.assigned_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Contributor #{task.contribution.contributor_id}</span>
                      <span>•</span>
                      <span className="text-mint-dark font-semibold">1 Reference Rule Documented</span>
                    </p>
                  </div>
                </div>

                {/* Right: Status Pill & Chunky CTA Button */}
                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-xs font-display font-black uppercase tracking-wider ${
                      task.status === 'completed'
                        ? 'bg-mint text-mint-dark border border-mint-dark/30'
                        : task.status === 'in_progress'
                        ? 'bg-yellow text-yellow-dark border border-yellow-dark/30'
                        : 'bg-lilac text-purple border border-purple/30'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>

                  <Link
                    to={`/review/${task.id}`}
                    className="btn-chunky-purple px-6 py-3 text-xs inline-flex items-center gap-2 shadow-soft"
                  >
                    Evaluate Evidence
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
