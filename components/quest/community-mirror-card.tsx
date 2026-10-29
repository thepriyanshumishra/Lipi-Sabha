'use client';

import React from 'react';
import { Users, Info, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MirrorOption {
  label: string;
  glyph: string;
  percentage: number;
  responseCount: number;
  isSelectedByUser?: boolean;
}

export interface CommunityMirrorCardProps {
  questionTitle: string;
  options: MirrorOption[];
  totalSample: number;
  isSuppressed?: boolean;
  className?: string;
}

export function CommunityMirrorCard({
  questionTitle,
  options,
  totalSample,
  isSuppressed = false,
  className,
}: CommunityMirrorCardProps) {
  return (
    <div className={cn('bg-white border-2 border-[#e5e5e5] rounded-3xl p-6 shadow-[0_4px_0_#f0f0f0]', className)}>
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#ddf4ff] text-[#1cb0f6] rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#4b4b4b]">Community Mirror</h3>
            <p className="text-xs font-semibold text-[#777777]">
              Sample Cohort: N = {totalSample} participants
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-[#58cc02] bg-[#d7ffb8]/50 px-2.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Blind-First Verified</span>
        </div>
      </div>

      <p className="text-sm font-bold text-[#4b4b4b] mb-4">
        {questionTitle}
      </p>

      {isSuppressed ? (
        <div className="p-4 bg-[#f9f9f9] border border-dashed border-[#e5e5e5] rounded-2xl text-center">
          <Info className="w-6 h-6 text-[#afafaf] mx-auto mb-2" />
          <p className="text-xs font-semibold text-[#777777]">
            Subgroup breakdown suppressed to protect participant anonymity (cohort sample &lt; 5).
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {options.map((opt, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="flex items-center gap-2 text-[#4b4b4b]">
                  <span className="font-mono text-base font-extrabold">{opt.glyph}</span>
                  <span>{opt.label}</span>
                  {opt.isSelectedByUser && (
                    <span className="bg-[#58cc02] text-white text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
                      Your Choice
                    </span>
                  )}
                </span>
                <span className="text-[#1cb0f6] font-extrabold">{opt.percentage}%</span>
              </div>

              {/* Comparative Progress Bar */}
              <div className="w-full h-3.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500 ease-out',
                    opt.isSelectedByUser ? 'bg-[#58cc02]' : 'bg-[#1cb0f6]'
                  )}
                  style={{ width: `${opt.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust & Methodology Footer Note */}
      <div className="mt-5 pt-3.5 border-t border-[#f0f0f0] flex items-start gap-2 text-[11px] text-[#777777] font-medium leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-[#afafaf] mt-0.5" />
        <span>
          Community Mirror reflects real-world usage patterns across this study cohort. It is a research comparison tool, not an endorsement of linguistic superiority.
        </span>
      </div>
    </div>
  );
}
