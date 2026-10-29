'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '@/components/landing/site-header';
import { SiteFooter } from '@/components/landing/site-footer';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import { Compass, ArrowRight, ShieldCheck, Scroll, CheckCircle2 } from 'lucide-react';

export default function NewProjectProposalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    region: 'Western Deccan',
    scope: 'both',
    problemStatement: '',
    goal: '',
    proposerName: 'Priyanshu Mishra',
    scriptA: 'Modi Cursive',
    scriptB: 'Devanagari Balbodh',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          hindiName: formData.hindiName,
          region: formData.region,
          scope: formData.scope,
          problemStatement: formData.problemStatement,
          goal: formData.goal,
          proposerName: formData.proposerName,
          candidateOrthographies: [
            {
              id: 'ortho_a',
              scriptName: formData.scriptA,
              nativeLabel: formData.scriptA,
              historicalEra: 'Historical',
              description: 'Primary candidate for paleographic decipherment.',
              sampleGlyph: '𑘦',
              isPrimaryHistoric: true,
              legibilityScore: 75.0,
              agreementRate: 0.7,
            },
            {
              id: 'ortho_b',
              scriptName: formData.scriptB,
              nativeLabel: formData.scriptB,
              historicalEra: 'Modern Print',
              description: 'Baseline comparison orthography.',
              sampleGlyph: 'म',
              isPrimaryHistoric: false,
              legibilityScore: 95.0,
              agreementRate: 0.95,
            },
          ],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/projects');
        }, 1500);
      } else {
        alert(data.error || 'Failed to submit proposal');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while submitting proposal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <SiteHeader />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Field Coordinator Portal
          </div>
          <h1 className="text-3xl font-serif font-black text-white tracking-tight">
            Propose Script Fieldwork Study
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Submit a proposal to document, benchmark, or transcribe historical or community writing systems. Proposals undergo community and linguistic elder review before active fieldwork.
          </p>
        </div>

        {success ? (
          <TactileCard variant="default" className="bg-[#0C101C] border-emerald-800/80 p-8 text-center shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h2 className="text-xl font-serif font-bold text-white">Proposal Successfully Submitted!</h2>
            <p className="text-xs text-slate-400 mt-2">
              Your fieldwork proposal has been entered into the sovereign governance queue. Redirecting to projects directory...
            </p>
          </TactileCard>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <TactileCard variant="default" className="bg-[#0C101C] border-slate-800 p-6 sm:p-8 space-y-5">
              <h2 className="text-base font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400" />
                1. Language &amp; Regional Scope
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Study Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gondi Script Orthography Benchmark"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Native / Hindi Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. गोंडी लिपि मानकीकरण शोध"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({ ...formData, hindiName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Geographic Region
                  </label>
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fieldwork Scope
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="word">Word-level Decipherment</option>
                    <option value="phrase">Phrase &amp; Inscription</option>
                    <option value="both">Both (Word &amp; Phrase)</option>
                  </select>
                </div>
              </div>
            </TactileCard>

            <TactileCard variant="default" className="bg-[#0C101C] border-slate-800 p-6 sm:p-8 space-y-5">
              <h2 className="text-base font-serif font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                2. Problem Statement &amp; Research Goal
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Problem Statement *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the orthographic challenge, historical gap, or manuscript preservation need..."
                  value={formData.problemStatement}
                  onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Research Goal *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build an empirical 100-word legibility baseline across native speakers"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Script 1 (Historic / Focus)
                  </label>
                  <input
                    type="text"
                    value={formData.scriptA}
                    onChange={(e) => setFormData({ ...formData, scriptA: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Script 2 (Modern / Comparison)
                  </label>
                  <input
                    type="text"
                    value={formData.scriptB}
                    onChange={(e) => setFormData({ ...formData, scriptB: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </TactileCard>

            <div className="flex items-center justify-end gap-4">
              <Link href="/projects">
                <TactileButton type="button" variant="outline" size="md">
                  Cancel
                </TactileButton>
              </Link>
              <TactileButton
                type="submit"
                variant="amber"
                size="md"
                disabled={isSubmitting}
                className="text-slate-950 font-bold"
              >
                {isSubmitting ? 'Submitting Proposal...' : 'Submit to Sovereign Governance'}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </TactileButton>
            </div>
          </form>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
