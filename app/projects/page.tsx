'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SEED_PROJECTS } from '@/lib/data/fieldwork-seeds';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import {
  Compass,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Vote,
  BookOpen,
  Scroll,
  Layers,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProjects = useMemo(() => {
    return SEED_PROJECTS.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.candidateOrthographies.some(o =>
          o.scriptName.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesRegion =
        selectedRegion === 'all' ||
        project.region.toLowerCase().includes(selectedRegion.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesRegion && matchesStatus;
    });
  }, [searchQuery, selectedRegion, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-serif font-black text-amber-300">लि</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-black tracking-tight text-white text-lg">Lipi Sabha</span>
                <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase bg-indigo-950/80 border border-indigo-700/50 px-1.5 py-0.5 rounded">
                  FIELDWORK
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Sovereign Script Directory & Research</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/projects" className="text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-1">
              Field Projects
            </Link>
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-200 transition-colors">
              Scribe Quests
            </Link>
            <Link href="/coordinator/new-project" className="text-slate-400 hover:text-slate-200 transition-colors">
              Propose Fieldwork
            </Link>
            <Link href="/admin/proposals" className="text-slate-400 hover:text-slate-200 transition-colors">
              Governance Queue
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/coordinator/new-project">
            <TactileButton variant="primary" size="sm" className="hidden sm:inline-flex">
              + Propose Project
            </TactileButton>
          </Link>
          <Link href="/login">
            <TactileButton variant="outline" size="sm">
              Scribe Sign In
            </TactileButton>
          </Link>
        </div>
      </nav>

      {/* Directory Hero */}
      <section className="relative px-6 py-12 border-b border-slate-800/60 bg-gradient-to-b from-indigo-950/20 via-slate-950/40 to-[#070A12]">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/50 text-indigo-300 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Decentralized Language Fieldwork
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
            Script Fieldwork & Research Projects
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-3xl leading-relaxed">
            Explore active fieldwork initiatives mapping orthographic legibility, historic cursive decipherment, and indigenous writing system revivals across South Asia. Every micro-quest contributes to open linguistic science under sovereign community audit.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by language, script (e.g. Modi, Sharada, Ol Chiki), or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 pl-1">
                <Filter className="w-3 h-3" /> Region:
              </span>
              {[
                { label: 'All Regions', val: 'all' },
                { label: 'Maharashtra', val: 'maharashtra' },
                { label: 'Kashmir', val: 'kashmir' },
                { label: 'Eastern India', val: 'jharkhand' },
              ].map((r) => (
                <button
                  key={r.val}
                  onClick={() => setSelectedRegion(r.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedRegion === r.val
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Showing <span className="text-white font-bold">{filteredProjects.length}</span> Fieldwork Projects
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Status Filter:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Fieldwork</option>
              <option value="community_consultation">Community Consultation</option>
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Scroll className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-slate-300">No matching projects found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search criteria or contribute by proposing a new fieldwork initiative for your linguistic community.
            </p>
            <div className="mt-4">
              <Link href="/coordinator/new-project">
                <TactileButton variant="primary" size="sm">
                  Propose New Script Fieldwork
                </TactileButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <TactileCard
                key={project.id}
                variant="default"
                className="bg-slate-900/80 border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
              >
                <div>
                  {/* Status & Region Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono tracking-wider text-slate-400 flex items-center gap-1">
                      <Compass className="w-3 h-3 text-indigo-400" />
                      {project.region}
                    </span>
                    {project.status === 'active' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-[10px] font-semibold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Fieldwork
                      </span>
                    )}
                    {project.status === 'community_consultation' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-800 text-[10px] font-semibold text-amber-400">
                        <Vote className="w-3 h-3" />
                        In Consultation
                      </span>
                    )}
                  </div>

                  {/* Title & Native Title */}
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-indigo-300 transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.name}
                    </Link>
                  </h3>
                  <p className="text-xs font-serif text-amber-400/80 font-medium mt-0.5">
                    {project.hindiName}
                  </p>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Candidate Orthographies */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                      Candidate Writing Systems
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.candidateOrthographies.map((ortho) => (
                        <div
                          key={ortho.id}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-1.5"
                        >
                          <span className="font-serif font-black text-amber-300 text-sm">
                            {ortho.sampleGlyph}
                          </span>
                          <span className="text-slate-300 text-[11px] font-medium">
                            {ortho.scriptName.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fieldwork Telemetry */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{project.totalParticipants} scribes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Scroll className="w-3.5 h-3.5 text-amber-400" />
                      <span>{project.totalQuestsCompleted} field responses</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <Link href={`/projects/${project.slug}`} className="flex-1">
                    <TactileButton variant="outline" size="sm" className="w-full text-xs">
                      View Study Details
                    </TactileButton>
                  </Link>

                  <Link href="/dashboard">
                    <TactileButton variant="primary" size="sm" className="text-xs flex items-center gap-1">
                      Start Quest
                      <ArrowRight className="w-3 h-3" />
                    </TactileButton>
                  </Link>
                </div>
              </TactileCard>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-6 py-6 text-center text-xs text-slate-500">
        <p>Lipi Sabha Fieldwork Platform &bull; Empirical Clarity &bull; Community Sovereignty &bull; Living Heritage</p>
      </footer>
    </div>
  );
}
