'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SEED_PROJECTS } from '@/lib/data/fieldwork-seeds';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import {
  Compass,
  ArrowRight,
  Vote,
  ShieldCheck,
  Users,
  Scroll,
  Layers,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const project = SEED_PROJECTS.find(p => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <SiteHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-amber-300 transition-colors">
            Field Projects
          </Link>
          <span>/</span>
          <span className="text-amber-300 font-bold">{project.name}</span>
        </div>

        {/* Hero Header */}
        <div className="rounded-2xl border border-slate-800 bg-[#0C101C] p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                {project.region}
              </span>

              {project.status === 'active' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Fieldwork Quest
                </span>
              )}
              {project.status === 'community_consultation' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-xs font-semibold text-amber-400">
                  <Vote className="w-3.5 h-3.5" />
                  Sovereign Community Consultation
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight leading-tight">
              {project.name}
            </h1>
            <p className="text-base sm:text-lg font-serif text-amber-400/90 font-medium mt-1">
              {project.hindiName}
            </p>

            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-3xl">
              {project.problemStatement}
            </p>

            {/* Fieldwork Telemetry Badges */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>
                  <strong className="text-white text-sm">{project.totalParticipants}</strong> Participating Scribes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400" />
                <span>
                  <strong className="text-white text-sm">{project.totalQuestsCompleted}</strong> Field Decipherments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>
                  Led by <strong className="text-white">{project.proposer.name}</strong> ({project.proposer.role})
                </span>
              </div>
            </div>

            {/* Quick Action */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/dashboard">
                <TactileButton variant="amber" size="lg" className="flex items-center gap-2 text-slate-950 font-bold">
                  <span>Enter 3-Minute Fieldwork Quest</span>
                  <ArrowRight className="w-4 h-4" />
                </TactileButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Candidate Writing Systems */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Candidate Writing Systems & Paleography
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.candidateOrthographies.map((ortho) => (
              <TactileCard
                key={ortho.id}
                variant="default"
                className="bg-[#0C101C] border-slate-800 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">
                        {ortho.scriptName}
                      </h3>
                      <p className="text-xs font-mono text-amber-400/90 mt-0.5">
                        {ortho.historicalEra}
                      </p>
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl font-serif font-black text-amber-300 shadow-inner">
                      {ortho.sampleGlyph}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {ortho.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Legibility Score</span>
                    <span className="text-white font-bold text-sm">{ortho.legibilityScore}/100</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Agreement Rate</span>
                    <span className="text-amber-400 font-bold text-sm">{Math.round(ortho.agreementRate * 100)}%</span>
                  </div>
                </div>
              </TactileCard>
            ))}
          </div>
        </section>

        {/* Live Community Mirror Telemetry */}
        <section className="mb-12 rounded-2xl border border-slate-800 bg-[#0C101C] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Community Mirror Telemetry
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Aggregated empirical responses across verified scribes ({project.communityMirror.totalResponses} total submissions).
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-amber-300 self-start sm:self-auto">
              Status: {project.communityMirror.consensusStatus.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {/* Aggregate Distribution Bar */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-xs font-medium text-slate-300">
              <span>Variant Preference Breakdown</span>
              <span className="text-slate-400 font-mono">100% Normalized</span>
            </div>
            <div className="h-6 w-full rounded-xl bg-slate-950 border border-slate-800 flex overflow-hidden p-0.5">
              {project.communityMirror.distribution.map((d, i) => (
                <div
                  key={i}
                  style={{ width: `${d.percentage}%` }}
                  className={`${
                    i === 0 ? 'bg-amber-500' : 'bg-indigo-600'
                  } h-full flex items-center justify-center text-[10px] font-bold text-slate-950 truncate px-1 transition-all`}
                  title={`${d.variantName}: ${d.percentage}%`}
                >
                  {d.percentage}% {d.variantName}
                </div>
              ))}
            </div>
          </div>

          {/* Demographic Cohorts & Privacy Guard */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Demographic Cohorts &amp; Privacy Suppression (N &ge; 5 Invariant)
            </h3>
            <div className="space-y-2">
              {project.communityMirror.cohorts.map((cohort) => (
                <div
                  key={cohort.cohortKey}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                    cohort.isSuppressed
                      ? 'bg-amber-950/20 border-amber-800/50 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {cohort.isSuppressed ? (
                      <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                    <span className="font-semibold">{cohort.cohortLabel}</span>
                  </div>

                  {cohort.isSuppressed ? (
                    <span className="text-[11px] font-mono text-amber-400/90 italic">
                      {cohort.suppressionNote}
                    </span>
                  ) : (
                    <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                      <span>N = {cohort.respondentCount}</span>
                      <span className="text-white font-bold">{cohort.preferredVariant}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
