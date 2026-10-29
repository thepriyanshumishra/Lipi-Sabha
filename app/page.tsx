'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Sparkles, Shield, Compass, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Mascot } from '@/components/ui/mascot';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#4b4b4b] flex flex-col justify-between">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="w-11 h-11 bg-[#58cc02] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_4px_0_#46a302]">
            लि
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#000437]">
            Lipi<span className="text-[#58cc02]">Sabha</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <TactileButton variant="primary" size="md">
              Launch Scribe App
            </TactileButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl w-full mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Mascot Centerpiece */}
        <div className="md:order-2 flex justify-center shrink-0">
          <div className="relative p-6 bg-[#fafafa] border-2 border-[#e5e5e5] rounded-full shadow-[0_8px_0_#e5e5e5] animate-bounce-subtle">
            <Mascot mood="happy" size={240} />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#58cc02] text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow">
              Meet Lipi
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="md:order-1 max-w-xl text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#d7ffb8] text-[#46a302] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Playful Script Fieldwork & Learning</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-[#58cc02] tracking-tight leading-[1.15]">
            free. fun. <br />
            <span className="text-[#000437]">community-owned.</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-[#777777] leading-relaxed">
            Discover ancient and competing writing systems through 3-minute quests. Compare scripts blind-first, view the Community Mirror, and protect linguistic heritage without algorithmic bias.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <TactileButton variant="primary" size="lg" fullWidth>
                <Play className="w-5 h-5 mr-2 fill-current" />
                <span>Start Learning</span>
              </TactileButton>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <TactileButton variant="secondary" size="lg" fullWidth>
                <span>Browse Studies</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </TactileButton>
            </Link>
          </div>
        </div>
      </main>

      {/* Value Pillars Section */}
      <section className="bg-[#fafafa] border-t-2 border-[#e5e5e5] py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TactileCard className="space-y-3">
            <div className="p-3 bg-[#d7ffb8] text-[#46a302] w-fit rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#4b4b4b]">Bite-Sized Quests</h3>
            <p className="text-sm font-medium text-[#777777] leading-relaxed">
              Match sounds to glyphs, reorder phrase tiles, and trace historical characters with responsive tactile feedback.
            </p>
          </TactileCard>

          <TactileCard className="space-y-3">
            <div className="p-3 bg-[#ddf4ff] text-[#1cb0f6] w-fit rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#4b4b4b]">Blind-First Mirror</h3>
            <p className="text-sm font-medium text-[#777777] leading-relaxed">
              Answer without peer influence. Discover regional orthographic variation and see what your community reads naturally.
            </p>
          </TactileCard>

          <TactileCard className="space-y-3">
            <div className="p-3 bg-[#fff0f0] text-[#ff4b4b] w-fit rounded-2xl">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#4b4b4b]">Community Sovereign</h3>
            <p className="text-sm font-medium text-[#777777] leading-relaxed">
              Software provides transparent empirical evidence. The human language community retains authority over every adoption decision.
            </p>
          </TactileCard>
        </div>
      </section>

      {/* Full-Bleed Green Footer Band (Duolingo Style) */}
      <footer className="bg-[#58cc02] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              LipiSabha (लिपि सभा)
            </span>
            <p className="text-xs text-[#d7ffb8] font-semibold mt-1">
              Collaborative Language Research & Script Learning Engine
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-[#d7ffb8]">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Scribe Dashboard
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Community Mirror
            </Link>
            <span className="text-white">
              Powered by Neon & Next.js
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
