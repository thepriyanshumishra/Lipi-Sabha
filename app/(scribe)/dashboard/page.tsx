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
    instruction: 'Select the Modi script letterform that represents the sound /ka/:',
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
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white border-b-2 border-[#e5e5e5] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 select-none">
            <div className="w-10 h-10 bg-[#58cc02] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-[0_3px_0_#46a302]">
              लि
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#000437]">
              Lipi<span className="text-[#58cc02]">Sabha</span>
            </span>
          </Link>

          {/* Gamification Telemetry */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff0f0] border-2 border-[#ffd6d6] rounded-xl text-[#ff4b4b] font-black text-sm">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>5</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff9e6] border-2 border-[#ffe899] rounded-xl text-[#ffc800] font-black text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-[#4b4b4b]">240 XP</span>
            </div>

            {/* Scribe Rank Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#f0f8ff] border-2 border-[#d0e8fc] rounded-xl text-[#1cb0f6] font-bold text-xs uppercase tracking-wider">
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
          {/* Daily Quest Hero Card (Duolingo Style) */}
          <div className="relative bg-white border-2 border-[#e5e5e5] rounded-3xl p-6 md:p-8 shadow-[0_5px_0_#e5e5e5] overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="inline-block bg-[#d7ffb8] text-[#46a302] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Today's Fieldwork Quest
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#4b4b4b] leading-tight">
                  Modi vs Devanagari in Marathi Orthography
                </h1>
                <p className="text-sm font-semibold text-[#777777] mt-2 leading-relaxed">
                  Compare historical administrative Modi spellings with modern Devanagari print. 3 bite-sized tasks.
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <TactileButton variant="primary" size="lg" onClick={() => setInQuest(true)}>
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    <span>Start Quest (3 Mins)</span>
                  </TactileButton>
                  <span className="text-xs font-bold text-[#58cc02]">+10 XP</span>
                </div>
              </div>

              {/* Scribe Mascot Mascot Illustration */}
              <div className="shrink-0 mx-auto md:mx-0">
                <Mascot mood="idle" size={130} />
              </div>
            </div>
          </div>

          {/* Active Community Research Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#4b4b4b]">
                Active Research Studies
              </h2>
              <span className="text-xs font-bold text-[#1cb0f6] hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TactileCard interactive className="flex flex-col justify-between">
                <div>
                  <span className="bg-[#e0f2fe] text-[#0284c7] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                    Script Fieldwork
                  </span>
                  <h3 className="font-extrabold text-lg text-[#4b4b4b] mt-2">
                    Sharada Script Revival in Kashmiri
                  </h3>
                  <p className="text-xs font-medium text-[#777777] mt-1">
                    Comparing vowel vocalization marks between Sharada and Devanagari.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bold text-[#1cb0f6]">
                  <span>192 Participants</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </TactileCard>

              <TactileCard interactive className="flex flex-col justify-between">
                <div>
                  <span className="bg-[#fef3c7] text-[#b45309] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                    Orthography Study
                  </span>
                  <h3 className="font-extrabold text-lg text-[#4b4b4b] mt-2">
                    Santhali Orthographic Conventions
                  </h3>
                  <p className="text-xs font-medium text-[#777777] mt-1">
                    Evaluating Ol Chiki reading speeds versus regional Latin and Bengali transcriptions.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bold text-[#1cb0f6]">
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
              <div className="p-2.5 bg-[#f0f8ff] text-[#1cb0f6] rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#4b4b4b]">Scribe Journey</h3>
                <p className="text-xs font-semibold text-[#777777]">Rank: Script Apprentice</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#777777]">Progress to Scribe</span>
                <span className="text-[#58cc02]">240 / 500 XP</span>
              </div>
              <div className="w-full h-3 bg-[#e5e5e5] rounded-full overflow-hidden">
                <div className="w-[48%] h-full bg-[#58cc02] rounded-full" />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-xs font-bold text-[#777777]">
              <span>Ink Savers Available: 1</span>
              <span className="text-[#ff4b4b] font-black">Active</span>
            </div>
          </TactileCard>

          {/* Community Sovereignty Manifesto Card */}
          <TactileCard className="bg-[#f8fafc]">
            <div className="flex items-center gap-2 text-[#000437] font-extrabold text-sm mb-2">
              <Compass className="w-4 h-4 text-[#58cc02]" />
              <span>Lipi Sabha Sovereign Guarantee</span>
            </div>
            <p className="text-xs text-[#777777] font-medium leading-relaxed">
              Software provides empirical clarity; communities make decisions. Algorithms never declare a "winning" script or force adoption on any language.
            </p>
          </TactileCard>
        </div>
      </main>
    </div>
  );
}
