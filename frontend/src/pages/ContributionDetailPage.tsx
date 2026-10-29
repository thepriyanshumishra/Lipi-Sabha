import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileText
} from 'lucide-react';
import { demoContributions } from '@/data/demo';

export function ContributionDetailPage() {
  const { contributionId } = useParams<{ contributionId: string }>();

  // Look in localStorage first, then fallback to demo
  const raw = localStorage.getItem('lipisabha_user_contributions');
  const userSubmitted = raw ? JSON.parse(raw) : [];
  const all = [...userSubmitted, ...demoContributions];

  const item = all.find((c) => String(c.id) === contributionId) || all[0];
  const [withdrawn, setWithdrawn] = useState(item?.status === 'withdrawn');

  const handleWithdraw = () => {
    if (window.confirm('Are you sure you wish to withdraw this contribution from the active review queue?')) {
      setWithdrawn(true);
      // Update in localStorage if user submission
      const updated = userSubmitted.map((c: any) =>
        String(c.id) === contributionId ? { ...c, status: 'withdrawn' } : c
      );
      localStorage.setItem('lipisabha_user_contributions', JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Link
            to="/contributions"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to My Contributions
          </Link>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-lilac text-purple">
                  {item.contribution_type.replace('_', ' ')}
                </span>
                <span className="text-xs text-muted">ID: #{item.id}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {item.project_name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  withdrawn
                    ? 'bg-neutral text-muted'
                    : item.status === 'accepted'
                    ? 'bg-mint text-mint-dark'
                    : item.status === 'under_review'
                    ? 'bg-yellow/40 text-yellow-dark'
                    : 'bg-sky/40 text-sky-dark'
                }`}
              >
                {withdrawn ? 'Withdrawn' : item.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Submitted Content Display */}
          <div className="p-6 bg-cream rounded-2xl border border-border space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Submitted Material</span>
            <p className="font-display text-2xl font-bold text-ink">{item.content}</p>
          </div>

          {/* Metadata Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral/40 border border-border space-y-1">
              <span className="text-muted">Language Variety</span>
              <p className="font-semibold text-ink">{item.language_variety || 'General'}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral/40 border border-border space-y-1">
              <span className="text-muted">Writing System</span>
              <p className="font-semibold text-ink">{item.writing_system || 'Proposed Latin'}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral/40 border border-border space-y-1">
              <span className="text-muted">Recorded Source</span>
              <p className="font-semibold text-ink">{item.source || 'Direct speaker input'}</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral/40 border border-border space-y-1">
              <span className="text-muted">Visibility Protocol</span>
              <p className="font-semibold text-ink capitalize">{item.visibility}</p>
            </div>
          </div>

          {/* Reviewer Feedback (if any) */}
          {item.reviewer_feedback && (
            <div className="p-5 rounded-2xl bg-mint/30 border border-mint-dark/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-mint-dark uppercase tracking-wider">
                <CheckCircle2 size={16} /> Reviewer Feedback
              </div>
              <p className="text-xs text-ink leading-relaxed">{item.reviewer_feedback}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted flex items-center gap-1.5">
              <Clock size={14} /> Created: {new Date(item.created_at).toLocaleDateString()}
            </span>

            {!withdrawn && item.status !== 'accepted' && (
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 rounded-xl border border-danger/30 text-danger text-xs font-semibold hover:bg-danger-light transition-colors"
              >
                Request Withdrawal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
