import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileCheck2,
  Scale,
  Calendar,
  AlertTriangle,
  History,
  ShieldAlert
} from 'lucide-react';
import { demoDecisions } from '@/data/demo';

export function DecisionPage() {
  const { decisionId } = useParams<{ decisionId: string }>();
  const decision = demoDecisions.find((d) => d.id === Number(decisionId)) || demoDecisions[0];

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Link
            to="/sabha"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to Sabha Records
          </Link>
        </div>

        {/* Official Decision Document Container */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-1">
                Formal Community Decision Record #{decision.id}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {decision.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-mint text-mint-dark">
                Outcome: {decision.outcome}
              </span>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted p-5 rounded-2xl bg-cream border border-border">
            <div>
              <span className="font-bold text-ink">Scope:</span> {decision.scope}
            </div>
            <div>
              <span className="font-bold text-ink">Date Enacted:</span> {decision.decided_at}
            </div>
            <div className="sm:col-span-2">
              <span className="font-bold text-ink">Decision Process:</span> {decision.process_used}
            </div>
          </div>

          {/* Evidence Section */}
          <div className="space-y-2">
            <h2 className="font-display text-lg font-bold text-ink">Evidence Considered</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {decision.evidence_considered}
            </p>
          </div>

          {/* Dissenting Perspectives (Protected Principle) */}
          <div className="p-6 rounded-2xl bg-yellow/20 border border-yellow/50 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-dark">
              <Scale size={16} />
              Dissenting Views & Minority Perspectives
            </div>
            <p className="text-xs text-ink/90 leading-relaxed">
              {decision.dissenting_views || 'None formally registered during final deliberation.'}
            </p>
            <p className="text-[10px] text-muted italic">
              Note: Lipi Sabha guarantees that documented minority perspectives remain an unalterable part of the official historical record.
            </p>
          </div>

          {/* Unresolved Issues & Reconsideration */}
          {decision.unresolved_issues && (
            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-ink">Unresolved Issues for Future Reconsideration</h3>
              <p className="text-xs text-muted leading-relaxed">
                {decision.unresolved_issues}
              </p>
            </div>
          )}

          {/* Notice on Reconsideration */}
          <div className="pt-6 border-t border-border flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <History size={14} /> Subject to periodic community review under Sabha protocols.
            </span>
            <Link to="/sabha" className="text-purple font-semibold hover:underline">
              Return to Sabha
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
