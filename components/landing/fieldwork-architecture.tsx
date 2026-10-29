'use client';

import React from 'react';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ArrowRight } from 'lucide-react';

export function FieldworkArchitecture() {
  const steps = [
    {
      number: '01',
      title: 'Blind-First Micro-Quests',
      description: 'Short, focused tasks (~ 3 minutes) where you transcribe, read or compare without seeing what others chose.',
      footerTag: 'YOUR KNOWLEDGE FIRST',
      assetId: 'fieldwork-blind-first-quest',
    },
    {
      number: '02',
      title: 'Community Mirror',
      description: 'After your response, see aggregate patterns from a privacy-safe cohort (N ≥ 5) and how your answer compares.',
      footerTag: 'DIVERSE PERSPECTIVES NEXT',
      assetId: 'fieldwork-community-mirror',
    },
    {
      number: '03',
      title: 'Sovereign Governance',
      description: 'Linguistic evidence informs the discussion, but living language communities decide their writing systems and spellings.',
      footerTag: 'COMMUNITY DECIDES ALWAYS',
      assetId: 'fieldwork-sovereign-governance',
    },
  ];

  return (
    <section className="relative bg-[#F4EFE6] text-[#292017] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D8CEBF] overflow-hidden">
      {/* Subtle aged paper fiber texture overlay */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#C4B59F_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#8F5224] block mb-2">
              OUR APPROACH
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1E1710] tracking-tight leading-tight">
              Empirical Fieldwork Architecture
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base font-serif text-[#5E4C3D] leading-relaxed">
              A transparent, community-centred process for comparing writing systems and spellings.
            </p>
          </div>
        </div>

        {/* 3 Connected Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Subtle horizontal connecting dashed line (Desktop only) */}
          <div className="hidden md:block absolute top-[18px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-[#BBAA96] z-0 pointer-events-none" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-start group">
              {/* Step Header with Circled Number */}
              <div className="flex items-center gap-3 mb-4 w-full">
                <div className="w-9 h-9 rounded-full bg-[#E8DEC\-parchment bg-[#EADFD0] border border-[#9A7D63] flex items-center justify-center text-[#553E2A] font-serif font-bold text-sm shadow-sm">
                  {step.number}
                </div>
                {/* Connecting arrow indicator for mobile */}
                {idx < 2 && (
                  <div className="md:hidden flex-1 border-t border-dashed border-[#BBAA96] ml-2" />
                )}
              </div>

              {/* Replaceable Step Image Placeholder */}
              <div className="w-full rounded-xl overflow-hidden shadow-md border border-[#C5B49E] bg-[#DDD0BF] mb-5 group-hover:border-[#9A7D63] transition-colors">
                <ImagePlaceholder
                  assetId={step.assetId}
                  variant="parchment"
                  aspectRatio="16/10"
                  className="w-full"
                />
              </div>

              {/* Step Content */}
              <h3 className="text-lg font-serif font-bold text-[#22180F] mb-2 group-hover:text-[#8F5224] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4A3A] leading-relaxed mb-4 flex-grow">
                {step.description}
              </p>

              {/* Bottom Invariant / Micro-Tag */}
              <div className="pt-2 border-t border-[#D6C7B2] w-full">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#A8452D]">
                  {step.footerTag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
