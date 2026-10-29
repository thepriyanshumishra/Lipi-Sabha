'use client';

import React from 'react';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ArrowRight, ShieldCheck, Sprout } from 'lucide-react';

export function EthicsCharter() {
  return (
    <section id="sovereign-ethics" className="relative bg-[#06080F] text-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
      {/* Background Archival Landscape Image Slot */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <ImagePlaceholder
          assetId="bg-ethics-landscape"
          variant="background"
          aspectRatio="21/9"
          className="w-full h-full border-none"
          showDetails={false}
        />
        {/* Dark Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080F] via-[#06080F]/90 to-[#06080F]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080F] via-transparent to-[#06080F]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Center: The Sovereign Commitment Statement */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
            {/* Top Subtitle */}
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#E5A93C] font-semibold">
              <span>&mdash; OUR COMMITMENT &mdash;</span>
            </div>

            {/* Giant Quotation */}
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
              <span className="text-[#E5A93C] font-serif text-3xl sm:text-4xl">&ldquo;</span>
              Software provides empirical clarity; human language communities retain complete sovereign authority.
              <span className="text-[#E5A93C] font-serif text-3xl sm:text-4xl">&rdquo;</span>
            </blockquote>

            {/* Explanatory Body */}
            <p className="text-xs sm:text-sm font-serif text-slate-300 leading-relaxed max-w-2xl">
              Lipi Sabha does not impose a winning script or spelling. We provide tools, comparisons and evidence so that communities, informed by linguistic experts, can make their own decisions.
            </p>

            {/* Charter Link */}
            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#E5A93C] hover:text-[#F3BA52] transition-colors"
              >
                <span>Read our Community & Ethics Charter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: The Sovereign Community Seal Emblem */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/20 via-slate-950/80 to-slate-950 flex flex-col items-center justify-center p-6 shadow-2xl shadow-amber-950/30 group hover:border-amber-400 transition-colors">
              {/* Concentric Decorative Rings */}
              <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/20" />
              <div className="absolute inset-4 rounded-full border border-amber-500/30" />

              {/* Circular SVG Text */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <path
                  id="textPath-seal"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  fill="none"
                />
                <text className="text-[9px] font-mono tracking-[0.22em] fill-amber-300 uppercase">
                  <textPath href="#textPath-seal" startOffset="50%" textAnchor="middle">
                    COMMUNITY DECIDES &bull; ALWAYS DECIDES
                  </textPath>
                </text>
              </svg>

              {/* Center Botanical / Plant Sprout Icon (Three-leaf motif) */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                <Sprout className="w-8 h-8 text-amber-400" />
              </div>

              <div className="mt-2 text-[8px] font-mono tracking-widest uppercase text-amber-500/80 font-bold">
                SOVEREIGN TRUST
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
