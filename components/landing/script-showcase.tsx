'use client';

import React from 'react';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ArrowRight } from 'lucide-react';

export function ScriptShowcase() {
  const specimens = [
    {
      title: 'Modi',
      meta: 'Maharashtra · 17th–20th century use',
      description: 'A cursive administrative script used in the Marathi Empire, known for its flowing ligatures and distinctive forms.',
      assetId: 'script-specimen-modi',
      linkText: 'Explore Modi',
      slug: 'marathi-modi-devanagari',
    },
    {
      title: 'Sharada',
      meta: 'Kashmir · from c. 8th century',
      description: 'An important script from the Kashmir region with a rich manuscript tradition in literary and scholarly texts.',
      assetId: 'script-specimen-sharada',
      linkText: 'Explore Sharada',
      slug: 'kashmiri-sharada-devanagari',
    },
    {
      title: 'Ol Chiki',
      meta: 'Santhali · developed 1925',
      description: 'A modern script created for the Santali language, representing an important example of community-led script development.',
      assetId: 'script-specimen-ol-chiki',
      linkText: 'Explore Ol Chiki',
      slug: 'santhali-olchiki-bengali',
    },
    {
      title: 'Brahmi',
      meta: 'South Asia · ancient inscription tradition',
      description: 'One of the earliest writing systems in South Asia, found in edicts and inscriptions across the region.',
      assetId: 'script-specimen-brahmi',
      linkText: 'Explore Brahmi',
      slug: 'marathi-modi-devanagari',
    },
  ];

  return (
    <section id="scripts-traditions" className="bg-[#070A12] text-slate-100 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-slate-500 block mb-2">
              EXPLORE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
              Scripts & Writing Traditions
            </h2>
          </div>

          <div className="max-w-md flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Discover the rich diversity of writing systems from across India and the world. Each script has a unique history, community and on-going research journey.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              <span>View all scripts</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </div>

        {/* 4-Specimen Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specimens.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-[#0C101C] p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl group"
            >
              <div>
                {/* Specimen Image Placeholder */}
                <div className="rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950 mb-4 group-hover:border-slate-700 transition-colors">
                  <ImagePlaceholder
                    assetId={item.assetId}
                    variant="specimen"
                    aspectRatio="4/3"
                    className="w-full"
                  />
                </div>

                {/* Script Title & Meta */}
                <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-amber-400/90 mb-3">
                  {item.meta}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Explore Link */}
              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  href={`/projects/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-amber-300 hover:text-amber-200 transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
