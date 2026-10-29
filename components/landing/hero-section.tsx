'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { Play, Pause, ArrowRight, Sparkles, Feather, Eye, Layers, Compass, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  // Interactive Decipherment Sandbox states
  const [activeTab, setActiveTab] = useState<'modi' | 'devanagari'>('modi');
  const [showStrokeAnalysis, setShowStrokeAnalysis] = useState(true);
  const [overlayModernReading, setOverlayModernReading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50); // Split view slider 0 - 100

  const scriptComparisons = [
    { modi: '𑘨', devanagari: 'राम', ipa: '/raːm/', meaning: 'Lord / Pillar' },
    { modi: '𑘩', devanagari: 'गाव', ipa: '/ɡaːʋ/', meaning: 'Village' },
    { modi: '𑘪', devanagari: 'या', ipa: '/jaː/', meaning: 'This / Come' },
    { modi: '𑘎', devanagari: 'कि', ipa: '/ki/', meaning: 'That / Or' },
    { modi: '𑘮', devanagari: 'तेव', ipa: '/t̪eːʋ/', meaning: 'So much' },
    { modi: '𑘝', devanagari: 'आहे', ipa: '/aːheː/', meaning: 'Is / Exists' },
  ];

  return (
    <section className="relative bg-[#070A12] text-slate-100 pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background Atmosphere Image Slot */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <ImagePlaceholder
          assetId="bg-hero-archive-atmosphere"
          variant="background"
          aspectRatio="21/9"
          className="w-full h-full border-none"
          showDetails={false}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Small Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400 font-semibold">
              <span>SCRIPTS</span>
              <span className="text-slate-600">&bull;</span>
              <span>COMMUNITIES</span>
              <span className="text-slate-600">&bull;</span>
              <span>SHARED KNOWLEDGE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-[1.08] text-white">
              Every script <br />
              carries a{' '}
              <span className="italic font-serif font-normal text-[#E5A93C] underline decoration-amber-500/30 underline-offset-8">
                world.
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg font-serif text-slate-200 leading-relaxed max-w-xl">
              A collaborative platform to document, compare and preserve the written heritage of our languages.
            </p>

            {/* Detailed Body Paragraph */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              From ancient inscriptions to living traditions, Lipi Sabha brings together communities, researchers and curious minds to explore scripts, test spellings and build evidence — so that language communities can decide their own writing futures.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E5A93C] hover:bg-[#F3BA52] text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/30 active:translate-y-0.5 transition-all"
              >
                <span>Explore fieldwork</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold text-sm active:translate-y-0.5 transition-all"
              >
                <Feather className="w-4 h-4 text-amber-400" />
                <span>Take a 3-minute scribe quest</span>
              </Link>
            </div>

            {/* Community Member Strip */}
            <div className="pt-4 flex items-center gap-3">
              {/* Replaceable Member Strip Asset Slot with CSS avatar fallback */}
              <div className="w-28 h-9 rounded-full overflow-hidden flex-shrink-0">
                <ImagePlaceholder
                  assetId="hero-community-member-strip"
                  aspectRatio="4/1"
                  className="w-full h-full rounded-full border border-amber-500/40"
                  showDetails={false}
                  badgePosition="center"
                >
                  <div className="flex -space-x-2 overflow-hidden w-full h-full items-center pl-1">
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#070A12] bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 font-serif font-bold text-[10px] flex items-center justify-center shadow">
                      VS
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#070A12] bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-serif font-bold text-[10px] flex items-center justify-center shadow">
                      RK
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#070A12] bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-serif font-bold text-[10px] flex items-center justify-center shadow">
                      SM
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#070A12] bg-gradient-to-tr from-purple-600 to-purple-400 text-white font-serif font-bold text-[10px] flex items-center justify-center shadow">
                      PM
                    </div>
                  </div>
                </ImagePlaceholder>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-tight">
                A growing community of language enthusiasts, researchers and native speakers.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Script Comparison Sandbox */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-700/80 bg-[#0C101C] shadow-2xl overflow-hidden backdrop-blur-md">
              {/* Panel Top Header Bar */}
              <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-slate-300 text-[11px]">
                    Study specimen &bull; <span className="text-slate-400">Interpretation under review</span>
                  </span>
                </div>
                <div className="text-[11px] font-serif text-slate-400 italic">
                  Marathi in Modi &bull; 18th century (illustrative)
                </div>
              </div>

              {/* Main Sandbox Grid: Manuscript View + Comparison Column */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
                {/* Left Side: Manuscript Specimen Area */}
                <div className="md:col-span-7 relative bg-[#090D18] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between overflow-hidden">
                  <div className="relative w-full h-full min-h-[280px]">
                    {/* Replaceable Manuscript Specimen Placeholder */}
                    <ImagePlaceholder
                      assetId="hero-modi-manuscript-specimen"
                      variant="hero"
                      aspectRatio="4/3"
                      className="w-full h-full rounded-none border-none"
                      badgePosition="top-left"
                    >
                      {/* Overlay Stroke Analysis Layer */}
                      {showStrokeAnalysis && (
                        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                          <div className="self-end bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                            Cursive Flow Vector &bull; 87% confidence
                          </div>

                          {/* Interactive Inspection Reticle */}
                          <div
                            className="absolute w-8 h-8 rounded-full border-2 border-amber-400/80 bg-amber-400/20 flex items-center justify-center text-amber-200 text-xs shadow-lg transition-all"
                            style={{ left: `${sliderPosition}%`, top: '45%' }}
                          >
                            +
                          </div>
                        </div>
                      )}

                      {/* Decipherment Split-Slider Input */}
                      <div className="absolute bottom-3 left-4 right-4 z-20 bg-slate-950/80 border border-slate-700/60 rounded-lg p-2 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                          <span>Original Ink Specimen</span>
                          <span className="text-amber-400 font-bold">{sliderPosition}% deciphered</span>
                          <span>Modern Transcription</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPosition}
                          onChange={(e) => setSliderPosition(Number(e.target.value))}
                          className="w-full accent-amber-400 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </ImagePlaceholder>
                  </div>
                </div>

                {/* Right Side: Script Glyph Comparison Table */}
                <div className="md:col-span-5 p-4 flex flex-col justify-between bg-slate-950/40">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        Comparing scripts
                      </span>
                      {/* Script Tabs */}
                      <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-[10px] font-medium">
                        <button
                          onClick={() => setActiveTab('modi')}
                          className={`px-2 py-0.5 rounded ${
                            activeTab === 'modi'
                              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Modi
                        </button>
                        <button
                          onClick={() => setActiveTab('devanagari')}
                          className={`px-2 py-0.5 rounded ${
                            activeTab === 'devanagari'
                              ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Devanagari
                        </button>
                      </div>
                    </div>

                    {/* Glyphs list */}
                    <div className="space-y-1.5">
                      {scriptComparisons.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                        >
                          <span className="text-xl font-serif text-amber-300">
                            {item.modi}
                          </span>
                          <span className="text-slate-600 text-xs font-mono">&rarr;</span>
                          <span className="text-sm font-serif font-bold text-slate-100">
                            {item.devanagari}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micro Hint */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 leading-tight">
                    Ligatures transcribed under Yadava and Maratha administrative conventions.
                  </div>
                </div>
              </div>

              {/* Bottom Audio & Feature Toggles Bar */}
              <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Audio Playback Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-7 h-7 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center transition-colors shadow-sm"
                    aria-label="Toggle specimen audio pronunciation"
                  >
                    {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>

                  {/* Simulated Waveform Visualizer */}
                  <div className="flex items-center gap-0.5 h-4">
                    {[4, 10, 14, 8, 16, 12, 18, 6, 10, 14, 8, 4, 12, 6].map((h, i) => (
                      <div
                        key={i}
                        className={`w-0.5 rounded-full transition-all duration-300 ${
                          isPlayingAudio ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                        }`}
                        style={{ height: `${isPlayingAudio ? Math.max(4, (h * 1.3) % 18) : h}px` }}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Listen to reading <span className="text-slate-600">(illustrative)</span> 0:10 / 0:26
                  </span>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showStrokeAnalysis}
                      onChange={(e) => setShowStrokeAnalysis(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Show stroke analysis</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={overlayModernReading}
                      onChange={(e) => setOverlayModernReading(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                    />
                    <span>Overlay modern reading</span>
                  </label>

                  <button className="text-slate-300 hover:text-white flex items-center gap-1 border-l border-slate-800 pl-3">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>Read view</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
