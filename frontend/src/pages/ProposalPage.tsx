import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  AlertTriangle,
  Scale,
  Send,
  CheckCircle2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { demoProposals } from '@/data/demo';

export function ProposalPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposal = demoProposals.find((p) => p.id === Number(proposalId)) || demoProposals[0];

  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <Link
            to="/sabha"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to Sabha
          </Link>
        </div>

        {/* Proposal Header */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-card space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple bg-lilac px-3 py-1 rounded-full">
                {proposal.project_name}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-mint-dark bg-mint px-3 py-1 rounded-full">
                {proposal.status}
              </span>
            </div>
            <span className="text-xs text-muted flex items-center gap-1">
              <Clock size={12} /> Timeline: {proposal.timeline}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
            {proposal.title}
          </h1>

          <div className="p-4 rounded-2xl bg-neutral/50 border border-border text-xs text-muted space-y-1">
            <p><strong>Proposal Scope:</strong> {proposal.scope}</p>
            <p><strong>Submitted By:</strong> {proposal.author_display_name}</p>
            <p><strong>Process:</strong> {proposal.process}</p>
          </div>

          {/* Background and Problem */}
          <div className="space-y-4 pt-2">
            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-1">Background</h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{proposal.background}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink mb-1">The Problem Being Addressed</h2>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{proposal.problem}</p>
            </div>
          </div>
        </div>

        {/* NEUTRAL ALTERNATIVE OPTIONS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Scale size={20} className="text-purple" />
            <h2 className="font-display text-2xl font-bold text-ink">Options Under Deliberation</h2>
          </div>
          <p className="text-xs text-muted">
            The platform presents these options with equal visual prominence without declaring any option superior.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proposal.options.map((option) => (
              <div
                key={option.id}
                className="bg-white rounded-2xl border-2 border-border p-6 shadow-soft space-y-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-purple">Option #{option.id}</span>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">{option.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-4">{option.description}</p>
                </div>

                <div className="space-y-2 text-xs border-t border-border pt-4">
                  {option.advantages && (
                    <div className="p-2.5 rounded-lg bg-mint/40 border border-mint-dark/20 text-mint-dark">
                      <strong>Documented Advantages:</strong> {option.advantages}
                    </div>
                  )}
                  {option.disadvantages && (
                    <div className="p-2.5 rounded-lg bg-coral-light/50 border border-coral/30 text-coral">
                      <strong>Documented Trade-offs:</strong> {option.disadvantages}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence and Limitations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-2">
            <h3 className="font-display font-bold text-lg text-ink">Evidence Considered</h3>
            <p className="text-xs text-muted leading-relaxed">
              {proposal.evidence || 'Preliminary typing surveys and test recall records from synthetic participants.'}
            </p>
          </div>

          <div className="bg-yellow/20 rounded-2xl border border-yellow/60 p-6 shadow-soft space-y-2">
            <h3 className="font-display font-bold text-lg text-yellow-dark">Documented Limitations</h3>
            <p className="text-xs text-ink/80 leading-relaxed">
              {proposal.limitations || 'Surveys reflect early digital adopters. Rural elder speakers and non-keyboard users have not yet been surveyed.'}
            </p>
          </div>
        </div>

        {/* Participation Feedback Form */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-4">
          <h2 className="font-display text-xl font-bold text-ink">Community Voice & Consultation</h2>
          <p className="text-xs text-muted">
            Share your perspective, raise unconsidered dialectal nuances, or express support.
          </p>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-mint/50 border border-mint-dark/30 flex items-center gap-3 text-xs text-mint-dark font-bold">
              <CheckCircle2 size={18} />
              Thank you! Your feedback has been recorded in the community consultation log.
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your perspective on vowel length, typing comfort, or historical precedents..."
                rows={4}
                className="w-full p-4 rounded-xl border border-border bg-cream text-ink text-xs focus:outline-none focus:border-purple"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple text-white text-xs font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
              >
                <Send size={14} /> Submit Community Feedback
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
