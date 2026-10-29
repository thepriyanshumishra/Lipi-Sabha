'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import { SEED_PROJECTS } from '@/lib/data/fieldwork-seeds';
import { ShieldCheck, CheckCircle2, AlertCircle, XCircle, Clock, Scroll, ArrowRight } from 'lucide-react';

export default function GovernanceQueuePage() {
  const [selectedProposal, setSelectedProposal] = useState(SEED_PROJECTS[1]); // Kashmiri Sharada
  const [auditReason, setAuditReason] = useState('Proposal satisfies paleographic and community consent guidelines.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleTransition = async (targetStatus: 'approved' | 'changes_requested' | 'rejected') => {
    setIsProcessing(true);
    setFeedbackMessage(null);
    try {
      const res = await fetch('/api/governance/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: selectedProposal.id,
          currentStatus: 'under_review',
          targetStatus,
          actorId: 'elder_reviewer_01',
          actorRole: 'linguist_reviewer',
          isProposer: false,
          reason: auditReason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setFeedbackMessage(`Audited decision recorded: Proposal moved to '${targetStatus}'.`);
      } else {
        setFeedbackMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setFeedbackMessage(`Network error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <SiteHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 text-xs font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Sovereign Governance Review Queue
          </div>
          <h1 className="text-3xl font-serif font-black text-white tracking-tight">
            Proposal Evaluation &amp; Auditing
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Community elders and linguistic reviewers verify research integrity, ethical consent, and orthographic provenance before fieldwork quests open to the public.
          </p>
        </div>

        {feedbackMessage && (
          <div className="mb-6 p-4 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Proposals List */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Proposals Awaiting Decision (3)
            </h2>

            {SEED_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProposal(proj)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedProposal.id === proj.id
                    ? 'bg-[#0C101C] border-amber-500/80 shadow-lg text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="text-amber-400">{proj.region}</span>
                  <span className="text-slate-500">{proj.status.toUpperCase()}</span>
                </div>
                <h3 className="text-sm font-serif font-bold line-clamp-1">{proj.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1">Led by {proj.proposer.name}</p>
              </button>
            ))}
          </div>

          {/* Right Column: Active Proposal Review Dossier */}
          <div className="lg:col-span-8">
            <TactileCard variant="default" className="bg-[#0C101C] border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  Status: Under Sovereign Review
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {selectedProposal.name}
                </h2>
                <p className="text-xs font-serif text-amber-400/90 mt-0.5">
                  {selectedProposal.hindiName}
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    Problem Statement
                  </h4>
                  <p>{selectedProposal.problemStatement}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    Research Objective &amp; Goal
                  </h4>
                  <p>{selectedProposal.goal}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                    Candidate Orthographies
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedProposal.candidateOrthographies.map((c) => (
                      <span
                        key={c.id}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-[11px] text-amber-300"
                      >
                        {c.scriptName} ({c.sampleGlyph})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Immutable Audit Trail Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Mandatory Audited Justification (Immutable Log)</span>
                  <span className="text-[10px] text-slate-500 font-mono">Minimum 10 chars</span>
                </label>
                <textarea
                  rows={3}
                  value={auditReason}
                  onChange={(e) => setAuditReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Reviewer Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <TactileButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleTransition('approved')}
                  disabled={isProcessing || auditReason.length < 10}
                  className="bg-emerald-600 hover:bg-emerald-500 border-emerald-600 text-white font-bold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Approve for Active Fieldwork
                </TactileButton>

                <TactileButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleTransition('changes_requested')}
                  disabled={isProcessing || auditReason.length < 10}
                  className="border-amber-500/60 text-amber-300 hover:bg-amber-950/40"
                >
                  <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Request Clarifications
                </TactileButton>

                <TactileButton
                  variant="outline"
                  size="sm"
                  onClick={() => handleTransition('rejected')}
                  disabled={isProcessing || auditReason.length < 10}
                  className="border-rose-700 text-rose-400 hover:bg-rose-950/40"
                >
                  <XCircle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                  Decline Proposal
                </TactileButton>
              </div>
            </TactileCard>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
