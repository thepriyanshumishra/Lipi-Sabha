import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sparkles,
  FlaskConical,
  ArrowRight
} from 'lucide-react';
import { demoContributions, demoQuests } from '@/data/demo';

export function DashboardPage() {
  const { user, isReviewer, setActiveWorkspace } = useAuth();

  const storedProgressRaw = localStorage.getItem('lipisabha_learning_progress');
  const userProgress = storedProgressRaw ? JSON.parse(storedProgressRaw) : {};
  const completedCount = Object.values(userProgress).filter((p: any) => p.completed).length;

  const contributions = demoContributions;

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Reviewer Bridge Callout (if authorized) */}
        {isReviewer && (
          <div className="p-4 px-6 rounded-2xl bg-mint/40 border-2 border-mint-dark/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚖️</span>
              <p className="text-xs sm:text-sm text-ink font-sans">
                You are currently in <strong>User Space</strong>. You have verified reviewer authorization.
              </p>
            </div>
            <button
              onClick={() => setActiveWorkspace('reviewer')}
              className="text-xs font-display font-extrabold text-mint-dark hover:text-green-800 underline flex items-center gap-1 cursor-pointer"
            >
              Switch to Reviewer Studio <ArrowRight size={13} />
            </button>
          </div>
        )}

        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lilac border border-purple/20 text-xs font-display font-extrabold tracking-wider text-purple uppercase">
              <Sparkles size={13} />
              Personal Discovery Journal
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-ink tracking-tight">
              Welcome back, {user?.display_name || 'Explorer'}!
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-xl">
              Track your exploration across writing systems, resume active learning quests, and view community feedback on your submissions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/learn"
              className="btn-chunky-purple px-6 py-3 text-xs inline-flex items-center gap-2"
            >
              Continue Learning Quests
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/lab"
              className="btn-chunky-white px-5 py-3 text-xs inline-flex items-center gap-2"
            >
              <FlaskConical size={14} />
              Writing Lab
            </Link>
          </div>
        </div>

        {/* 3 Intuitive Activity Cards (Discovery, Lab, Community) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Quests */}
          <div className="bg-white rounded-3xl border-2 border-border p-6 shadow-soft space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-mint/50 border border-mint-dark/20 text-mint-dark flex items-center justify-center text-2xl shadow-soft">
                🌱
              </div>
              <h3 className="font-display text-lg font-black text-ink">The Learning Garden</h3>
              <p className="text-xs text-muted leading-relaxed">
                Step-by-step interactive lessons on vowels, scripts, and orthographic decisions.
              </p>
              <div className="p-3 rounded-xl bg-cream border border-border flex items-center justify-between text-xs font-display font-extrabold text-ink">
                <span>Completed Quests</span>
                <span className="text-purple">{completedCount} of {demoQuests.length}</span>
              </div>
            </div>

            <Link
              to="/learn"
              className="text-xs font-display font-extrabold text-purple hover:underline inline-flex items-center gap-1 pt-2"
            >
              Resume Next Chapter <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 2: Writing Lab Experiments */}
          <div className="bg-white rounded-3xl border-2 border-border p-6 shadow-soft space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-lilac border border-purple/20 text-purple flex items-center justify-center text-2xl shadow-soft">
                🔬
              </div>
              <h3 className="font-display text-lg font-black text-ink">Writing Lab</h3>
              <p className="text-xs text-muted leading-relaxed">
                Test spelling conventions side-by-side, simulate keyboard input, and export orthography cheat-sheets.
              </p>
              <div className="p-3 rounded-xl bg-cream border border-border flex items-center justify-between text-xs font-display font-extrabold text-ink">
                <span>Active Sandbox</span>
                <span className="text-mint-dark font-sans font-semibold">Tulu Tigalari vs Kannada</span>
              </div>
            </div>

            <Link
              to="/lab"
              className="text-xs font-display font-extrabold text-purple hover:underline inline-flex items-center gap-1 pt-2"
            >
              Open Writing Sandbox <ArrowRight size={13} />
            </Link>
          </div>

          {/* Card 3: Community Submissions */}
          <div className="bg-white rounded-3xl border-2 border-border p-6 shadow-soft space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-coral-light border border-coral/20 text-coral flex items-center justify-center text-2xl shadow-soft">
                ✍️
              </div>
              <h3 className="font-display text-lg font-black text-ink">My Submissions</h3>
              <p className="text-xs text-muted leading-relaxed">
                Words, sentences, and rules you submitted to language projects undergoing transparent community review.
              </p>
              <div className="p-3 rounded-xl bg-cream border border-border flex items-center justify-between text-xs font-display font-extrabold text-ink">
                <span>Recorded Submissions</span>
                <span className="text-ink">{contributions.length} Submissions</span>
              </div>
            </div>

            <Link
              to="/contributions"
              className="text-xs font-display font-extrabold text-purple hover:underline inline-flex items-center gap-1 pt-2"
            >
              View Submission History <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Detailed Recent Activity & Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Contributions */}
          <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-border p-6 sm:p-8 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="font-display text-xl font-black text-ink">Recent Submissions Under Review</h2>
                <p className="text-xs text-muted">Transparent consensus tracking by appointed community reviewers</p>
              </div>
              <Link to="/contributions" className="text-xs font-display font-extrabold text-purple hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {contributions.slice(0, 3).map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-cream border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple/30 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-display font-extrabold text-ink">{c.project_name}</span>
                      <span className="text-[10px] text-muted capitalize">({c.contribution_type.replace('_', ' ')})</span>
                    </div>
                    <p className="text-sm font-mono font-bold text-purple">{c.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-display font-extrabold uppercase tracking-wider ${
                      c.status === 'accepted'
                        ? 'bg-mint text-mint-dark'
                        : c.status === 'under_review'
                        ? 'bg-yellow/40 text-yellow-dark'
                        : 'bg-neutral text-muted'
                    }`}>
                      {c.status.replace('_', ' ')}
                    </span>
                    <Link
                      to={`/contributions/${c.id}`}
                      className="text-xs font-semibold text-muted hover:text-ink p-1"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Suggested Next Curiosity Step */}
          <div className="lg:col-span-4 bg-white rounded-3xl border-2 border-border p-6 sm:p-8 shadow-card space-y-4">
            <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-purple block">
              Suggested Next Step
            </span>
            <h3 className="font-display text-lg font-black text-ink">
              Experiment with Long Vowels
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              Compare how the Gondi project resolves the phoneme /aː/ using doubled vowels (&ldquo;aa&rdquo;) versus diacritics (&ldquo;ā&rdquo;).
            </p>
            <div className="pt-2">
              <Link
                to="/lab"
                className="btn-chunky-purple w-full py-3 text-xs flex items-center justify-center gap-1.5"
              >
                Launch Experiment in Lab <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
