'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  BookOpen,
  Users,
  Shield,
  Compass,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Lock,
} from 'lucide-react';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';

// Featured Scripts Showcase Data
const FEATURED_SCRIPTS = [
  {
    id: 'modi',
    name: 'Modi Script',
    nativeName: '𑘦𑘻𑘚𑘲',
    language: 'Marathi',
    period: '13th – 20th Century CE',
    charSample: '𑘎 𑘏 𑘐 𑘑 𑘒',
    description:
      'The historical cursive administrative script of Maharashtra, engineered for rapid pen-stroke writing without lifting the reed quill from parchment.',
    status: 'Active Fieldwork Study',
    participants: 148,
  },
  {
    id: 'sharada',
    name: 'Sharada Script',
    nativeName: '𑆯𑆳𑆫𑆢𑆳',
    language: 'Kashmiri & Sanskrit',
    period: '8th – 20th Century CE',
    charSample: '𑆑 𑆒 𑆓 𑆔 𑆕',
    description:
      'The sacred intellectual script of the Kashmir Valley, housing centuries of philosophical treatises, mathematics, and classical poetry.',
    status: 'Active Fieldwork Study',
    participants: 192,
  },
  {
    id: 'brahmi',
    name: 'Ashokan Brahmi',
    nativeName: '𑀩𑁆𑀭𑀸𑀳𑁆𑀫𑀻',
    language: 'Prakrit & Early Sanskrit',
    period: '3rd Century BCE',
    charSample: '𑀓 𑀔 𑀕 𑀖 𑀗',
    description:
      'The ancestral mother writing system of virtually all modern South and Southeast Asian scripts, famed for its elegant geometric simplicity.',
    status: 'Reference Baseline',
    participants: 280,
  },
  {
    id: 'grantha',
    name: 'Grantha Script',
    nativeName: '𑌗𑍍𑌰𑌨𑍍𑌥',
    language: 'Tamil-Sanskrit Diglossia',
    period: '6th Century CE – Present',
    charSample: '𑌕 𑌖 𑌗 𑌘 𑌙',
    description:
      'An ornate, highly ligatured South Indian writing system created to render Sanskrit phonetics with extraordinary acoustic precision.',
    status: 'Under Review',
    participants: 94,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const activeScript = FEATURED_SCRIPTS[activeTab];

  return (
    <div className="min-h-screen bg-white text-[#1e1b2e] flex flex-col justify-between selection:bg-[#5d5fef]/20 selection:text-[#5d5fef]">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo Mark */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="w-11 h-11 bg-[#5d5fef] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_4px_0_#4647c9] group-hover:scale-105 transition-transform">
              लि
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-[#1e1b2e]">
                Lipi<span className="text-[#5d5fef]">Sabha</span>
              </span>
              <span className="block text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
                Orthography Fieldwork & Learning
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#64748b]">
            <a href="#how-it-works" className="hover:text-[#5d5fef] transition-colors">
              Methodology
            </a>
            <a href="#script-archives" className="hover:text-[#5d5fef] transition-colors">
              Script Archives
            </a>
            <a href="#active-studies" className="hover:text-[#5d5fef] transition-colors">
              Active Studies
            </a>
            <a href="#evidence" className="hover:text-[#5d5fef] transition-colors">
              Community Mirror
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <TactileButton variant="primary" size="md">
                <span>Enter Scribe Platform</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </TactileButton>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf9f6] via-white to-white py-16 md:py-24 border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Problem Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#f5f5ff] border border-[#d5d6fc] text-[#5d5fef] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-[#f59e0b] fill-current" />
              <span>Sovereign Language Research & Epigraphy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e1b2e] tracking-tight leading-[1.12]">
              Where communities <br className="hidden sm:inline" />
              <span className="text-[#5d5fef]">test, compare, and decide</span> <br className="hidden sm:inline" />
              how their language is written.
            </h1>

            <p className="text-lg md:text-xl text-[#64748b] font-medium leading-relaxed max-w-2xl">
              Many languages have competing scripts and contested spelling traditions. Lipi Sabha replaces top-down imposition with 
              <span className="text-[#1e1b2e] font-bold"> blind-first empirical fieldwork quests</span> and 
              <span className="text-[#1e1b2e] font-bold"> transparent consensus dashboards</span>—guaranteeing that algorithms never decide on a community's behalf.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/dashboard">
                <TactileButton variant="primary" size="lg" fullWidth>
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  <span>Start Fieldwork Quest (3 Mins)</span>
                </TactileButton>
              </Link>

              <a href="#active-studies">
                <TactileButton variant="secondary" size="lg" fullWidth>
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>Explore 4 Active Studies</span>
                </TactileButton>
              </a>
            </div>

            {/* Empirical Telemetry Bar */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#e2e8f0]">
              <div>
                <p className="text-2xl font-black text-[#5d5fef]">1,420+</p>
                <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Fieldwork Quests</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#1e1b2e]">4 Major</p>
                <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Orthography Studies</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#10b981]">100%</p>
                <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Community Sovereign</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Comparison Widget (Real Product Demo) */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-[0_8px_0_#e2e8f0]">
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-5">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#5d5fef] bg-[#f5f5ff] px-3 py-1 rounded-md border border-[#d5d6fc]">
                  Live Fieldwork Demo
                </span>
                <span className="text-xs font-bold text-[#64748b]">N = 148 Respondents</span>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
                  Test Word: &quot;Lipi&quot; (Writing / Script)
                </p>

                {/* Candidate A Card */}
                <div className="p-4 bg-[#f8fafc] border-2 border-[#5d5fef] rounded-2xl flex items-center justify-between shadow-[0_3px_0_#d5d6fc]">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#5d5fef] tracking-wider">
                      Option A • Classical Modi
                    </span>
                    <p className="text-3xl font-black text-[#1e1b2e] mt-1 font-serif">
                      𑘩𑘱𑘢𑘱
                    </p>
                    <p className="text-xs font-medium text-[#64748b]">Cursive non-lifting glyphs</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#5d5fef]">38%</span>
                    <span className="block text-[10px] font-bold text-[#64748b]">Readability</span>
                  </div>
                </div>

                {/* Candidate B Card */}
                <div className="p-4 bg-white border-2 border-[#e2e8f0] rounded-2xl flex items-center justify-between shadow-[0_3px_0_#f1f5f9]">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#64748b] tracking-wider">
                      Option B • Modern Devanagari
                    </span>
                    <p className="text-3xl font-black text-[#1e1b2e] mt-1">
                      लिपि
                    </p>
                    <p className="text-xs font-medium text-[#64748b]">Standardized shirorekha print</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#1e1b2e]">62%</span>
                    <span className="block text-[10px] font-bold text-[#64748b]">Readability</span>
                  </div>
                </div>

                {/* Comparison Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-bold text-[#64748b]">
                    <span>Blind-First Community Consensus</span>
                    <span>Modi 38% vs Devanagari 62%</span>
                  </div>
                  <div className="h-3 w-full bg-[#e2e8f0] rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#5d5fef]" style={{ width: '38%' }} />
                    <div className="h-full bg-[#06b6d4]" style={{ width: '62%' }} />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#64748b] flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-[#10b981]" />
                    Zero Algorithmic Bias
                  </span>
                  <Link href="/dashboard" className="text-xs font-extrabold text-[#5d5fef] hover:underline flex items-center">
                    <span>Try Full Quest</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (THE 3-STEP FIELDWORK ARCHITECTURE) */}
      <section id="how-it-works" className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-black text-[#5d5fef] uppercase tracking-widest bg-[#f5f5ff] px-3.5 py-1 rounded-full border border-[#d5d6fc]">
              Fieldwork Architecture
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1b2e] tracking-tight">
              From Contested Manuscript to Sovereign Community Consensus
            </h2>
            <p className="text-base text-[#64748b] font-medium leading-relaxed">
              Lipi Sabha bridges linguistic anthropology, modern cognitive testing, and decentralized community governance in three rigorous stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#faf9f6] border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_4px_0_#e2e8f0] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#5d5fef] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_3px_0_#4647c9]">
                  01
                </div>
                <h3 className="text-xl font-extrabold text-[#1e1b2e]">
                  Proposal & Corpus Setup
                </h3>
                <p className="text-sm font-medium text-[#64748b] leading-relaxed">
                  Linguists and native speakers document candidate orthography profiles, citing historical manuscript provenance, phonetic rules, and dialect samples.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-bold text-[#5d5fef]">
                ✓ Immutable Provenance Audit
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#faf9f6] border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_4px_0_#e2e8f0] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#06b6d4] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_3px_0_#0891b2]">
                  02
                </div>
                <h3 className="text-xl font-extrabold text-[#1e1b2e]">
                  Blind-First Empirical Quests
                </h3>
                <p className="text-sm font-medium text-[#64748b] leading-relaxed">
                  Everyday speakers complete 3-minute tactile quests—matching glyphs, reordering sentence tiles, and tracing strokes—answering blind without peer bandwagon bias.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-bold text-[#06b6d4]">
                ✓ Unbiased Readability Capture
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#faf9f6] border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_4px_0_#e2e8f0] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#10b981] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-[0_3px_0_#059669]">
                  03
                </div>
                <h3 className="text-xl font-extrabold text-[#1e1b2e]">
                  Community Mirror & Sovereign Ballot
                </h3>
                <p className="text-sm font-medium text-[#64748b] leading-relaxed">
                  Transparent dashboards separate task accuracy from community preference. Registered community members conduct formal consultation ballots.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-xs font-bold text-[#10b981]">
                ✓ Human Sovereign Governance
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SCRIPT ARCHIVES SHOWCASE (INTERACTIVE HISTORICAL REPOSITORY) */}
      <section id="script-archives" className="py-20 bg-[#faf9f6] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-[#f59e0b] uppercase tracking-widest bg-[#fffbeb] px-3.5 py-1 rounded-full border border-[#fef3c7]">
                Orthography Archives
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1b2e] tracking-tight">
                Living & Classical Writing Systems
              </h2>
              <p className="text-base text-[#64748b] font-medium max-w-2xl">
                Explore Unicode-standardized historical scripts actively being researched and preserved on Lipi Sabha.
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2">
              {FEATURED_SCRIPTS.map((script, idx) => (
                <button
                  key={script.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl border-2 transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-[#5d5fef] text-white border-[#5d5fef] shadow-[0_3px_0_#4647c9]'
                      : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-[#5d5fef]'
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Script Detail Card */}
          <div className="bg-white border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_6px_0_#e2e8f0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-[#5d5fef] bg-[#f5f5ff] border border-[#d5d6fc] px-3 py-1 rounded-md uppercase tracking-wider">
                  {activeScript.language}
                </span>
                <span className="text-xs font-bold text-[#64748b]">
                  Period: {activeScript.period}
                </span>
                <span className="text-xs font-bold text-[#10b981] bg-[#ecfdf5] border border-[#a7f3d0] px-2.5 py-0.5 rounded-full">
                  {activeScript.status}
                </span>
              </div>

              <h3 className="text-3xl font-extrabold text-[#1e1b2e]">
                {activeScript.name} ({activeScript.nativeName})
              </h3>

              <p className="text-base text-[#64748b] font-medium leading-relaxed">
                {activeScript.description}
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Active Fieldwork Participants</p>
                  <p className="text-2xl font-black text-[#1e1b2e]">{activeScript.participants} Speakers</p>
                </div>
                <div className="h-10 w-px bg-[#e2e8f0]" />
                <div>
                  <p className="text-xs font-bold text-[#64748b] uppercase tracking-wider">Unicode Specification</p>
                  <p className="text-2xl font-black text-[#5d5fef]">Direct Encoding</p>
                </div>
              </div>
            </div>

            {/* Glyph Showcase Box */}
            <div className="lg:col-span-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl p-6 text-center shadow-inner">
              <p className="text-xs font-black text-[#64748b] uppercase tracking-widest mb-3">
                Consonant Varga Glyphs
              </p>
              <div className="text-5xl font-extrabold text-[#1e1b2e] my-4 tracking-widest py-3 border-y border-[#e2e8f0] font-serif">
                {activeScript.charSample}
              </div>
              <Link href="/dashboard">
                <TactileButton variant="primary" size="md" fullWidth>
                  <span>Practice Script Quests</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </TactileButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACTIVE FIELDWORK STUDIES */}
      <section id="active-studies" className="py-20 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-[#10b981] uppercase tracking-widest bg-[#ecfdf5] px-3.5 py-1 rounded-full border border-[#a7f3d0]">
                Field Studies
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1b2e] tracking-tight">
                Ongoing Community Orthography Research
              </h2>
              <p className="text-base text-[#64748b] font-medium max-w-2xl">
                Independent projects run by language communities and academic collaborators worldwide.
              </p>
            </div>

            <Link href="/dashboard">
              <TactileButton variant="secondary" size="md">
                <span>View Full Study Directory</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </TactileButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Study 1 */}
            <TactileCard className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-[#f5f5ff] text-[#5d5fef] border border-[#d5d6fc] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    Marathi Language
                  </span>
                  <span className="text-xs font-bold text-[#10b981]">Active Testing</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1e1b2e]">
                  Modi vs Modern Devanagari Readability
                </h3>
                <p className="text-xs text-[#64748b] font-medium leading-relaxed">
                  Evaluating reading speed, stroke fatigue, and phoneme disambiguation across historical Modi administrative forms versus 20th-century Devanagari print.
                </p>
              </div>

              <div className="pt-4 border-t border-[#f1f5f9] mt-6 flex justify-between items-center text-xs font-bold text-[#64748b]">
                <span>N = 148 Responses</span>
                <span className="text-[#5d5fef]">Enter Study →</span>
              </div>
            </TactileCard>

            {/* Study 2 */}
            <TactileCard className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-[#ecfeff] text-[#0891b2] border border-[#a5f3fc] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    Kashmiri Language
                  </span>
                  <span className="text-xs font-bold text-[#10b981]">Active Testing</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1e1b2e]">
                  Sharada Script Vowel Notation Standards
                </h3>
                <p className="text-xs text-[#64748b] font-medium leading-relaxed">
                  Testing vowel diacritic readability for unique Kashmiri central vowels (ɨ, ɨː, ə, əː) across reviving Sharada orthographies and modern phonetic Devanagari.
                </p>
              </div>

              <div className="pt-4 border-t border-[#f1f5f9] mt-6 flex justify-between items-center text-xs font-bold text-[#64748b]">
                <span>N = 192 Responses</span>
                <span className="text-[#5d5fef]">Enter Study →</span>
              </div>
            </TactileCard>

            {/* Study 3 */}
            <TactileCard className="flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-[#fffbeb] text-[#b45309] border border-[#fef3c7] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                    Santhali Language
                  </span>
                  <span className="text-xs font-bold text-[#f59e0b]">Review Phase</span>
                </div>
                <h3 className="text-lg font-extrabold text-[#1e1b2e]">
                  Ol Chiki Script & Multi-Script Usability
                </h3>
                <p className="text-xs text-[#64748b] font-medium leading-relaxed">
                  Measuring digital keyboard typing speeds and educational adoption between Ol Chiki orthography and historic regional Latin/Bengali scripts.
                </p>
              </div>

              <div className="pt-4 border-t border-[#f1f5f9] mt-6 flex justify-between items-center text-xs font-bold text-[#64748b]">
                <span>N = 340 Responses</span>
                <span className="text-[#5d5fef]">Enter Study →</span>
              </div>
            </TactileCard>
          </div>
        </div>
      </section>

      {/* 6. ETHICAL EVIDENCE & TRUST GUARANTEE */}
      <section id="evidence" className="py-20 bg-[#faf9f6] border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-black text-[#5d5fef] uppercase tracking-widest bg-[#f5f5ff] px-3.5 py-1 rounded-full border border-[#d5d6fc]">
              Ethical Fieldwork Invariants
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e1b2e] tracking-tight">
              Evidence Before Claims. <br />
              Community Before Software.
            </h2>
            <p className="text-base text-[#64748b] font-medium leading-relaxed">
              Mainstream linguistic tools often treat minority languages as training corpora or enforce arbitrary majoritarian spellings. Lipi Sabha enforces four non-negotiable architectural protections:
            </p>

            <ul className="space-y-3.5 text-sm font-bold text-[#1e1b2e]">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#10b981] text-white rounded-full mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Zero AI Prescriptions: Machine learning never decides which script or spelling is &quot;correct&quot;.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#10b981] text-white rounded-full mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Variation Is Never Error: Unfamiliar dialect spellings are cataloged as legitimate linguistic variants.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#10b981] text-white rounded-full mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Small-Cohort Privacy Guard: Subgroups under 5 participants are mathematically suppressed to prevent de-anonymization.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-[#10b981] text-white rounded-full mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>No Consensus Is a Valid Outcome: Research cycles can conclude that multiple orthographies should coexist peacefully.</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-white border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_6px_0_#e2e8f0] space-y-6">
            <h3 className="font-extrabold text-xl text-[#1e1b2e] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#5d5fef]" />
              <span>Independent Metrics Framework</span>
            </h3>
            <p className="text-xs font-semibold text-[#64748b]">
              Lipi Sabha strictly refuses to collapse diverse linguistic metrics into a single deceptive &quot;best script score&quot;:
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl">
                <span className="text-xs font-black text-[#5d5fef] uppercase tracking-wider">Task Accuracy</span>
                <p className="text-xs text-[#64748b] mt-1 font-medium">Scored only on verified, peer-reviewed phonetic criteria.</p>
              </div>
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl">
                <span className="text-xs font-black text-[#06b6d4] uppercase tracking-wider">Orthographic Agreement</span>
                <p className="text-xs text-[#64748b] mt-1 font-medium">Quantifies spelling convergence under normalized Levenshtein distance.</p>
              </div>
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl">
                <span className="text-xs font-black text-[#10b981] uppercase tracking-wider">Learnability Velocity</span>
                <p className="text-xs text-[#64748b] mt-1 font-medium">Pre vs post completion-time distributions across user cohorts.</p>
              </div>
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl">
                <span className="text-xs font-black text-[#f59e0b] uppercase tracking-wider">Community Preference</span>
                <p className="text-xs text-[#64748b] mt-1 font-medium">Recorded through sovereign, auditable consultation ballots.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-IMPACT FOOTER */}
      <footer className="bg-[#1e1b2e] text-white pt-16 pb-12 border-t-4 border-[#5d5fef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Manifesto */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5d5fef] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_3px_0_#4647c9]">
                  लि
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  Lipi<span className="text-[#5d5fef]">Sabha</span>
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] font-medium leading-relaxed">
                A collaborative open-source web application for writing system comparison, epigraphic preservation, and sovereign community decision-making.
              </p>
            </div>

            {/* Col 2: Research Modules */}
            <div className="space-y-3">
              <p className="text-xs font-black text-[#f59e0b] uppercase tracking-widest">Research Modules</p>
              <ul className="space-y-2 text-xs font-bold text-[#cbd5e1]">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Scribe Fieldwork Runner</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Blind-First Community Mirror</Link></li>
                <li><a href="#active-studies" className="hover:text-white transition-colors">Orthography Profiles Directory</a></li>
                <li><a href="#script-archives" className="hover:text-white transition-colors">Unicode Glyph Archives</a></li>
              </ul>
            </div>

            {/* Col 3: Community & Governance */}
            <div className="space-y-3">
              <p className="text-xs font-black text-[#f59e0b] uppercase tracking-widest">Governance & Ethics</p>
              <ul className="space-y-2 text-xs font-bold text-[#cbd5e1]">
                <li><a href="#evidence" className="hover:text-white transition-colors">Linguistic Sovereignty Manifesto</a></li>
                <li><a href="#evidence" className="hover:text-white transition-colors">Small-Cohort Privacy Guard</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Decision Record Framework</a></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Propose a Language Study</Link></li>
              </ul>
            </div>

            {/* Col 4: Technology & Verification */}
            <div className="space-y-3">
              <p className="text-xs font-black text-[#f59e0b] uppercase tracking-widest">Stack Architecture</p>
              <p className="text-xs text-[#94a3b8] font-medium leading-relaxed">
                Powered by Next.js 15, Neon Serverless PostgreSQL, Drizzle ORM, and NextAuth Google OAuth.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-[#5d5fef] bg-[#5d5fef]/10 border border-[#5d5fef]/20 px-2.5 py-1 rounded-md">
                  MIT Open Source • Production Ready
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#94a3b8]">
            <p>© 2026 Lipi Sabha (लिपि सभा) Foundation. Built for linguistic preservation worldwide.</p>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="hover:text-white transition-colors">Privacy Invariants</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">Fieldwork Terms</Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">GitHub Repository</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
