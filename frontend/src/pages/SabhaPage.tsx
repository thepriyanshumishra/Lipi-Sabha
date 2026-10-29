import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileCheck2,
  Scale,
  ArrowRight,
  Clock,
  Sparkles,
  AlertCircle,
  Vote,
  CheckCircle2,
  MessageSquare,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { demoProposals, demoDecisions } from '@/data/demo';

export function SabhaPage() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'decisions' | 'principles'>('proposals');

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Sabha Hero & Council Banner */}
        <div className="card-catchy p-8 sm:p-12 bg-gradient-to-br from-white via-white to-mint/10 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-mint/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="badge-catchy-mint">
                <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" />
                Community Sabha Active
              </span>
              <span className="text-xs font-display font-extrabold text-muted">
                Sovereign Orthography Governance
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.15]">
              Where Communities Deliberate & Decide
            </h1>

            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
              The Sabha is the democratic forum for language communities. Here, orthography proposals are debated openly, phonological evidence is evaluated, and community decisions are permanently recorded with deep respect for minority dialects.
            </p>

            {/* Catchy Pill Tabs */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab('proposals')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-black transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'proposals'
                    ? 'btn-chunky-purple shadow-soft'
                    : 'bg-white border border-border/80 text-muted hover:text-ink'
                }`}
              >
                <Vote size={15} />
                <span>Active Proposals ({demoProposals.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('decisions')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-black transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'decisions'
                    ? 'btn-chunky-purple shadow-soft'
                    : 'bg-white border border-border/80 text-muted hover:text-ink'
                }`}
              >
                <FileCheck2 size={15} />
                <span>Ratified Decisions ({demoDecisions.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('principles')}
                className={`px-5 py-2.5 rounded-2xl text-xs font-display font-black transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'principles'
                    ? 'btn-chunky-purple shadow-soft'
                    : 'bg-white border border-border/80 text-muted hover:text-ink'
                }`}
              >
                <Scale size={15} />
                <span>Sabha Principles</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: ACTIVE PROPOSALS */}
        {activeTab === 'proposals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-black text-ink">Open Consultations & Voting</h2>
                <p className="text-xs text-muted">Examine neutral proposals, test them in the lab, and submit community votes.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoProposals.map((proposal, idx) => (
                <div
                  key={proposal.id}
                  className="card-catchy p-7 bg-white flex flex-col justify-between space-y-6 hover:border-purple/50 group"
                >
                  <div className="space-y-4">
                    {/* Header Chips */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="badge-catchy-purple text-[11px]">
                        {proposal.project_name}
                      </span>
                      <span className="badge-catchy-mint text-[11px] uppercase tracking-wider">
                        {proposal.status}
                      </span>
                    </div>

                    {/* Proposal Title */}
                    <h3 className="font-display text-2xl font-black text-ink tracking-tight group-hover:text-purple transition-colors">
                      {proposal.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3">
                      {proposal.problem}
                    </p>

                    {/* Visual Comparison Swatch (Catchy preview) */}
                    <div className="p-3.5 rounded-2xl bg-neutral/50 border border-border/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-xl bg-purple-light text-purple text-xs font-display font-black">
                          {idx === 0 ? 'Option A: ā' : 'Option A: pʰ'}
                        </span>
                        <span className="text-[11px] text-muted font-display font-bold">vs</span>
                        <span className="px-2.5 py-1 rounded-xl bg-mint/50 text-mint-dark text-xs font-display font-black">
                          {idx === 0 ? 'Option B: aa' : 'Option B: ph'}
                        </span>
                      </div>
                      <span className="text-[10px] font-display font-extrabold uppercase text-purple">
                        Side-by-side
                      </span>
                    </div>

                    {/* Consensus Meter Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-display font-extrabold">
                        <span className="text-ink">Community Consensus</span>
                        <span className="text-mint-dark">{idx === 0 ? '78% Agreement' : '62% Agreement'}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple to-mint-dark rounded-full"
                          style={{ width: idx === 0 ? '78%' : '62%' }}
                        />
                      </div>
                      <p className="text-[10px] text-muted text-right">
                        {idx === 0 ? '46 participating community members' : '31 participating community members'}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-border/80 flex items-center justify-between">
                    <span className="text-[11px] font-sans text-muted">
                      Facilitated by <strong className="text-ink font-semibold">{proposal.author_display_name}</strong>
                    </span>

                    <Link
                      to={`/sabha/proposals/${proposal.id}`}
                      className="btn-chunky-purple px-5 py-2.5 text-xs inline-flex items-center gap-1.5 shadow-soft"
                    >
                      Deliberate & Vote
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DECISION RECORDS */}
        {activeTab === 'decisions' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-black text-ink">Published Decision Records</h2>
              <p className="text-xs text-muted">Immutable ledger of community ratifications, coexisting standards, and minority protections.</p>
            </div>

            <div className="space-y-4">
              {demoDecisions.map((dec) => (
                <div
                  key={dec.id}
                  className="card-catchy p-7 bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-mint-dark/50"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge-catchy-mint text-[11px] uppercase tracking-wider">
                        <CheckCircle2 size={13} />
                        {dec.outcome}
                      </span>
                      <span className="text-xs font-display font-extrabold text-muted">
                        Ratified on {dec.decided_at}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-black text-ink tracking-tight">
                      {dec.title}
                    </h3>

                    <p className="text-xs text-muted max-w-2xl leading-relaxed">
                      Process standard: <strong className="text-ink">{dec.process_used}</strong>. Verified by consensus review council with recorded support from regional elders and native speaker practitioners.
                    </p>
                  </div>

                  <Link
                    to={`/sabha/decisions/${dec.id}`}
                    className="btn-chunky-white px-6 py-3 text-xs inline-flex items-center gap-2 self-start md:self-center shrink-0"
                  >
                    View Official Charter
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SABHA PRINCIPLES */}
        {activeTab === 'principles' && (
          <div className="card-catchy p-8 sm:p-10 bg-white space-y-6 max-w-4xl">
            <div className="space-y-1">
              <span className="badge-catchy-purple">
                <Scale size={13} />
                Governance Integrity Charter
              </span>
              <h2 className="font-display text-3xl font-black text-ink">
                Ethical Safeguards for Language Sovereignty
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <div className="p-5 rounded-2xl bg-cream border-2 border-border/80 space-y-2">
                <span className="text-2xl">⚖️</span>
                <h4 className="font-display font-black text-sm text-ink">Consensus Over Speed</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Typing speed benchmarks and algorithmic convenience never override community consensus. The speakers decide how their language is written.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border-2 border-border/80 space-y-2">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-display font-black text-sm text-ink">Preservation of Dissent</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Minority viewpoints are never erased. When irreconcilable differences exist, the platform supports dual coexisting orthographies without forcing standardization.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border-2 border-border/80 space-y-2">
                <span className="text-2xl">🌱</span>
                <h4 className="font-display font-black text-sm text-ink">Equal Voice</h4>
                <p className="text-xs text-muted leading-relaxed">
                  Gamification badges, XP, or reviewer status do not confer extra voting privileges. Every community speaker participates on an equal basis.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
