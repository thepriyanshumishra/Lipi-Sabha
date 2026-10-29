import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { demoReviewTasks, demoRules } from '@/data/demo';

export function ReviewTaskPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const task = demoReviewTasks.find((t) => t.id === Number(taskId)) || demoReviewTasks[0];
  const contribution = task.contribution;

  // Rubric state
  const [consistency, setConsistency] = useState<'meets' | 'partial' | 'fails' | 'unable'>('meets');
  const [clarity, setClarity] = useState<'meets' | 'partial' | 'fails' | 'unable'>('meets');
  const [contextRating, setContextRating] = useState<'meets' | 'partial' | 'fails' | 'unable'>('meets');
  const [sourceQuality, setSourceQuality] = useState<'meets' | 'partial' | 'fails' | 'unable'>('meets');

  const [rationale, setRationale] = useState('');
  const [action, setAction] = useState<'approve' | 'revision' | 'escalate' | 'unable'>('approve');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationale.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate('/review');
    }, 1500);
  };

  return (
    <div className="bg-neutral/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            to="/review"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to Review Queue
          </Link>
        </div>

        {/* Header Bar */}
        <div className="bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-purple bg-lilac px-2.5 py-0.5 rounded-full uppercase">
                Task #{task.id}
              </span>
              <span className="text-xs text-muted">Scope: {task.task_scope}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Reviewing: {contribution.project_name}
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow/40 text-yellow-dark uppercase">
            In Progress
          </span>
        </div>

        {/* 2-Column Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Evidence & Reference */}
          <div className="lg:col-span-7 space-y-6">
            {/* Submitted Material */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-3">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Submitted Material ({contribution.contribution_type.replace('_', ' ')})
              </span>
              <div className="p-4 rounded-xl bg-cream border border-border font-display text-2xl font-bold text-ink">
                {contribution.content}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-muted pt-2">
                <div>Variety: <strong>{contribution.language_variety || 'General'}</strong></div>
                <div>Writing System: <strong>{contribution.writing_system || 'Proposed Latin'}</strong></div>
                <div>Source: <strong>{contribution.source || 'Direct speaker input'}</strong></div>
                <div>Visibility: <strong className="capitalize">{contribution.visibility}</strong></div>
              </div>
            </div>

            {/* Applicable Approved Rules */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-bold text-ink">Approved Project Conventions</h3>
              <div className="space-y-3 text-xs">
                {demoRules.slice(0, 2).map((rule) => (
                  <div key={rule.id} className="p-3.5 rounded-xl bg-neutral/50 border border-border space-y-1">
                    <span className="font-bold text-purple">{rule.title}</span>
                    <p className="text-muted leading-relaxed">{rule.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-lilac/30 border border-purple/20 text-xs text-muted flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-purple flex-shrink-0 mt-0.5" />
              <span>
                <strong>Reviewer Responsibility:</strong> Evaluate based on consistency with documented community rules. If evidence is ambiguous, choose &ldquo;Escalate to Specialist&rdquo; or &ldquo;Unable to Assess&rdquo;.
              </span>
            </div>
          </div>

          {/* Right Column: Rubric & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={handleSubmitDecision} className="bg-white rounded-2xl border border-border p-6 shadow-card space-y-6">
              <h2 className="font-display text-xl font-bold text-ink">Evaluation Rubric</h2>

              {/* Rubric Item 1 */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink">1. Consistency with Documented Rule</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {(['meets', 'partial', 'fails', 'unable'] as const).map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setConsistency(v)}
                      className={`py-1.5 rounded-lg border text-center capitalize transition-all ${
                        consistency === v ? 'bg-purple text-white font-bold border-purple' : 'bg-neutral border-border text-muted'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rubric Item 2 */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink">2. Clarity & Orthographic Accuracy</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {(['meets', 'partial', 'fails', 'unable'] as const).map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setClarity(v)}
                      className={`py-1.5 rounded-lg border text-center capitalize transition-all ${
                        clarity === v ? 'bg-purple text-white font-bold border-purple' : 'bg-neutral border-border text-muted'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rubric Item 3 */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink">3. Context & Metadata Adequacy</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {(['meets', 'partial', 'fails', 'unable'] as const).map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setContextRating(v)}
                      className={`py-1.5 rounded-lg border text-center capitalize transition-all ${
                        contextRating === v ? 'bg-purple text-white font-bold border-purple' : 'bg-neutral border-border text-muted'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rubric Item 4 */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-ink">4. Source Quality & Provenance</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {(['meets', 'partial', 'fails', 'unable'] as const).map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setSourceQuality(v)}
                      className={`py-1.5 rounded-lg border text-center capitalize transition-all ${
                        sourceQuality === v ? 'bg-purple text-white font-bold border-purple' : 'bg-neutral border-border text-muted'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Documented Rationale */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-ink">
                  Documented Rationale <span className="text-danger">*</span>
                </label>
                <textarea
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  placeholder="Explain your assessment rationale based on evidence..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-border bg-cream text-ink text-xs focus:outline-none focus:border-purple"
                  required
                />
              </div>

              {/* Decision Action Selectors */}
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-ink">Formal Review Action</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setAction('approve')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      action === 'approve' ? 'bg-mint border-mint-dark text-mint-dark font-bold' : 'border-border bg-neutral text-ink'
                    }`}
                  >
                    Approve within Scope
                  </button>
                  <button
                    type="button"
                    onClick={() => setAction('revision')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      action === 'revision' ? 'bg-yellow/40 border-yellow-dark text-yellow-dark font-bold' : 'border-border bg-neutral text-ink'
                    }`}
                  >
                    Request Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => setAction('escalate')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      action === 'escalate' ? 'bg-sky/40 border-sky-dark text-sky-dark font-bold' : 'border-border bg-neutral text-ink'
                    }`}
                  >
                    Escalate to Specialist
                  </button>
                  <button
                    type="button"
                    onClick={() => setAction('unable')}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      action === 'unable' ? 'bg-neutral border-ink text-ink font-bold' : 'border-border bg-neutral text-muted'
                    }`}
                  >
                    Unable to Assess
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="p-3 bg-mint rounded-xl text-mint-dark text-xs font-bold text-center">
                  Review decision recorded with audit log. Returning to queue...
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!rationale.trim()}
                  className="w-full py-3 rounded-xl bg-purple text-white text-xs font-bold hover:bg-purple-hover transition-colors shadow-soft disabled:opacity-40"
                >
                  Submit Formal Assessment
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
