'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Star, Award, BookOpen, Compass, ChevronRight, Play } from 'lucide-react';
import { Mascot } from '@/components/ui/mascot';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import { QuestRunner, type QuestTask } from '@/components/quest/quest-runner';

// Seeded Sample Quest Tasks: Marathi Orthography (Modi vs Devanagari)
const DEMO_QUEST_TASKS: QuestTask[] = [
  {
    id: 'task-1',
    type: 'script_match',
    instruction: 'Identify the historic Modi letterform representing the sound /ka/:',
    hint: 'Notice the top horizontal line differs between Modi and Devanagari.',
    options: [
      { id: 'opt-1', glyph: '𑘎', label: 'Modi Script', transliteration: 'ka' },
      { id: 'opt-2', glyph: 'क', label: 'Devanagari', transliteration: 'ka' },
      { id: 'opt-3', glyph: '𑘐', label: 'Modi Script', transliteration: 'ga' },
      { id: 'opt-4', glyph: 'ग', label: 'Devanagari', transliteration: 'ga' },
    ],
    explanation: '𑘎 is the historic Modi letterform for /ka/, widely used in Maratha administrative records.',
  },
  {
    id: 'task-2',
    type: 'variant_compare',
    instruction: 'Which candidate orthography is faster and more natural for you to read?',
    hint: 'Compare the word "Lipi" written in both candidate conventions.',
    options: [
      { id: 'c-1', glyph: '𑘩𑘱𑘢𑘱', label: 'Option A: Classical Modi', transliteration: 'lipi' },
      { id: 'c-2', glyph: 'लिपि', label: 'Option B: Modern Devanagari', transliteration: 'lipi' },
    ],
    mirrorData: {
      totalSample: 148,
      options: [
        { label: 'Classical Modi (Option A)', glyph: '𑘩𑘱𑘢𑘱', percentage: 38, responseCount: 56 },
        { label: 'Modern Devanagari (Option B)', glyph: 'लिपि', percentage: 62, responseCount: 92 },
      ],
    },
    explanation: 'Your preference is recorded anonymously. Notice how readability divides across familiarity groups.',
  },
  {
    id: 'task-3',
    type: 'canvas_trace',
    instruction: 'Trace the Modi letterform for "Aa" (𑘁):',
    hint: 'Start with the left curved stroke, then complete the vertical spine.',
    guideGlyph: '𑘁',
    explanation: 'Excellent stroke fluidity! Modi was designed for rapid continuous handwriting without lifting the stylus.',
  },
];

export default function DashboardPage() {
  const [inQuest, setInQuest] = useState(false);

  if (inQuest) {
    return (
      <QuestRunner
        questTitle="Marathi Orthography: Modi vs Devanagari"
        tasks={DEMO_QUEST_TASKS}
        onExit={() => setInQuest(false)}
        onComplete={() => setInQuest(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white border-b-2 border-[#e2e8f0] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="w-10 h-10 bg-[#5d5fef] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_3px_0_#4647c9]">
              लि
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#1e1b2e]">
              Lipi<span className="text-[#5d5fef]">Sabha</span>
            </span>
          </Link>

          {/* Gamification Telemetry */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff1f2] border-2 border-[#ffe4e6] rounded-xl text-[#f43f5e] font-black text-sm">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>5</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fffbeb] border-2 border-[#fef3c7] rounded-xl text-[#b45309] font-black text-sm">
              <Star className="w-4 h-4 fill-current text-[#f59e0b]" />
              <span>240 XP</span>
            </div>

            {/* Scribe Rank Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5ff] border-2 border-[#d5d6fc] rounded-xl text-[#5d5fef] font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Script Apprentice</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Daily Quest & Active Research Studies (2 Cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Daily Quest Hero Card */}
          <div className="relative bg-white border-2 border-[#e2e8f0] rounded-3xl p-6 md:p-8 shadow-[0_5px_0_#e2e8f0] overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="inline-block bg-[#f5f5ff] text-[#5d5fef] border border-[#d5d6fc] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Today's Fieldwork Quest
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e1b2e] leading-tight">
                  Modi vs Devanagari in Marathi Orthography
                </h1>
                <p className="text-sm font-semibold text-[#64748b] mt-2 leading-relaxed">
                  Join Gaju to compare historical administrative Modi spellings with modern Devanagari print. 3 bite-sized tasks.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <TactileButton variant="primary" size="lg" onClick={() => setInQuest(true)}>
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    <span>Start Quest (3 Mins)</span>
                  </TactileButton>
                  <span className="text-xs font-bold text-[#f59e0b]">+10 XP</span>
                </div>
              </div>

              {/* Gaju The Scribe Elephant Mascot Illustration */}
              <div className="shrink-0 mx-auto md:mx-0">
                <Mascot mood="idle" size={135} />
              </div>
            </div>
          </div>

          {/* Active Community Research Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#1e1b2e]">
                Active Research Studies
              </h2>
              <span className="text-xs font-bold text-[#5d5fef] hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TactileCard interactive className="flex flex-col justify-between">
                <div>
                  <span className="bg-[#ecfeff] text-[#0891b2] border border-[#a5f3fc] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                    Script Fieldwork
                  </span>
                  <h3 className="font-extrabold text-lg text-[#1e1b2e] mt-2">
                    Sharada Script Revival in Kashmiri
                  </h3>
                  <p className="text-xs font-medium text-[#64748b] mt-1">
                    Comparing vowel vocalization marks between Sharada and Devanagari.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#5d5fef]">
                  <span>192 Participants</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </TactileCard>

              <TactileCard interactive className="flex flex-col justify-between">
                <div>
                  <span className="bg-[#fffbeb] text-[#b45309] border border-[#fef3c7] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                    Orthography Study
                  </span>
                  <h3 className="font-extrabold text-lg text-[#1e1b2e] mt-2">
                    Santhali Orthographic Conventions
                  </h3>
                  <p className="text-xs font-medium text-[#64748b] mt-1">
                    Evaluating Ol Chiki reading speeds versus regional Latin and Bengali transcriptions.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#5d5fef]">
                  <span>340 Participants</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </TactileCard>
            </div>
          </div>
        </div>

        {/* Right Column: Scribe Profile, Rank & Community Sovereignty */}
        <div className="space-y-6">
          {/* Scribe Rank & Badges */}
          <TactileCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#f5f5ff] text-[#5d5fef] rounded-2xl border border-[#d5d6fc]">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#1e1b2e]">Scribe Journey</h3>
                <p className="text-xs font-semibold text-[#64748b]">Rank: Script Apprentice</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#64748b]">Progress to Scribe</span>
                <span className="text-[#5d5fef]">240 / 500 XP</span>
              </div>
              <div className="w-full h-3 bg-[#e2e8f0] rounded-full overflow-hidden">
                <div className="w-[48%] h-full bg-[#5d5fef] rounded-full" />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#64748b]">
              <span>Ink Savers Available: 1</span>
              <span className="text-[#f43f5e] font-black">Active</span>
            </div>
          </TactileCard>

          {/* Community Sovereignty Manifesto Card */}
          <TactileCard className="bg-[#f8fafc]">
            <div className="flex items-center gap-2 text-[#1e1b2e] font-extrabold text-sm mb-2">
              <Compass className="w-4 h-4 text-[#5d5fef]" />
              <span>Lipi Sabha Sovereign Guarantee</span>
            </div>
            <p className="text-xs text-[#64748b] font-medium leading-relaxed">
              Software provides empirical clarity; communities make decisions. Algorithms never declare a "winning" script or force adoption on any language.
            </p>
          </TactileCard>
        </div>
      </main>
    </div>
  );
}
