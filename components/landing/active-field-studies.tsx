'use client';

import React from 'react';
import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';
import { ArrowRight } from 'lucide-react';

export function ActiveFieldStudies() {
  const projects = [
    {
      title: 'Maharashtra Modi Paleography Study',
      description: 'Comparing character forms, training materials and community preferences for reading and writing Modi today.',
      script: 'Modi',
      region: 'Maharashtra',
      status: 'In research',
      assetId: 'project-image-modi-paleography',
      slug: 'marathi-modi-devanagari',
    },
    {
      title: 'Kashmir Sharada Manuscript Fieldwork',
      description: 'Digitisation, transcription and community consultation for Sharada manuscripts and contemporary interest in the script.',
      script: 'Sharada',
      region: 'Kashmir',
      status: 'Planning',
      assetId: 'project-image-sharada-manuscript',
      slug: 'kashmiri-sharada-devanagari',
    },
    {
      title: 'Santhali Phonological Mapping',
      description: 'Exploring orthographic conventions for Santali in education and digital use, with community feedback and linguistic analysis.',
      script: 'Ol Chiki',
      region: 'Eastern India',
      status: 'Ongoing',
      assetId: 'project-image-santhali-mapping',
      slug: 'santhali-olchiki-bengali',
    },
  ];

  return (
    <section className="bg-[#FAF5EE] text-[#292017] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D8CEBF]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#8F5224] block mb-2">
              FEATURED
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#1E1710] tracking-tight">
              Active Field Studies
            </h2>
          </div>

          <div className="max-w-md flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm font-serif text-[#5E4C3D] leading-relaxed">
              Ongoing and upcoming research initiatives, in collaboration with language communities, scholars and local organizations.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#C5B49E] bg-[#EFE6D8] hover:bg-[#E5DAC8] text-[#3D2C1E] text-xs font-bold whitespace-nowrap transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8F5224]" />
            </Link>
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#D5C7B6] bg-[#FFFFFF]/80 backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-[#9A7D63] transition-all shadow-md group"
            >
              <div>
                {/* Project Image Placeholder with Illustrative Badge */}
                <div className="relative border-b border-[#D5C7B6] bg-[#E8DFD1]">
                  <ImagePlaceholder
                    assetId={proj.assetId}
                    variant="parchment"
                    aspectRatio="16/10"
                    className="w-full rounded-none border-none"
                  />
                  <div className="absolute bottom-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-[#FAF5EE]/90 border border-[#C5B49E] text-[10px] font-serif italic text-[#614F3F] shadow-sm">
                    Illustrative project
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-serif font-bold text-[#1E1710] mb-2 group-hover:text-[#8F5224] transition-colors leading-snug">
                    <Link href={`/projects/${proj.slug}`}>
                      {proj.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#5C4A3A] leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Metadata Footer Row */}
              <div className="px-5 py-3 border-t border-[#E8DEC\-line border-[#E8DFC\-parchment border-[#EADECE]] bg-[#F7F2EA] flex items-center justify-between text-[10px] font-mono tracking-wider text-[#685544]">
                <div>
                  <span className="text-[#968270]">SCRIPT:</span> <span className="font-bold text-[#2A1E14]">{proj.script}</span>
                </div>
                <div>
                  <span className="text-[#968270]">REGION:</span> <span className="font-bold text-[#2A1E14]">{proj.region}</span>
                </div>
                <div>
                  <span className="text-[#968270]">STATUS:</span> <span className="font-bold text-[#8F5224]">{proj.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
