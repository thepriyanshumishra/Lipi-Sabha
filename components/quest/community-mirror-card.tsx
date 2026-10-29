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
    <div className={cn('bg-white border-2 border-[#e2e8f0] rounded-3xl p-6 shadow-[0_4px_0_#f1f5f9]', className)}>
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-[#f5f5ff] text-[#5d5fef] rounded-2xl border border-[#d5d6fc]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#1e1b2e]">Community Mirror</h3>
            <p className="text-xs font-semibold text-[#64748b]">
              Fieldwork Sample: N = {totalSample} participants
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#10b981] bg-[#ecfdf5] border border-[#a7f3d0] px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Blind-First Verified</span>
        </div>
      </div>

      <p className="text-sm font-bold text-[#1e1b2e] mb-4">
        {questionTitle}
      </p>

      {isSuppressed ? (
        <div className="p-4 bg-[#f8fafc] border border-dashed border-[#cbd5e1] rounded-2xl text-center">
          <Info className="w-6 h-6 text-[#94a3b8] mx-auto mb-2" />
          <p className="text-xs font-semibold text-[#64748b]">
            Subgroup breakdown suppressed to protect participant anonymity (cohort sample &lt; 5).
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {options.map((opt, i) => (
            <div key={i} className="relative">
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="flex items-center gap-2 text-[#1e1b2e]">
                  <span className="font-mono text-base font-extrabold">{opt.glyph}</span>
                  <span>{opt.label}</span>
                  {opt.isSelectedByUser && (
                    <span className="bg-[#5d5fef] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                      Your Choice
                    </span>
                  )}
                </span>
                <span className="text-[#5d5fef] font-extrabold">{opt.percentage}%</span>
              </div>

              {/* Comparative Progress Bar */}
              <div className="w-full h-3.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500 ease-out',
                    opt.isSelectedByUser ? 'bg-[#5d5fef]' : 'bg-[#06b6d4]'
                  )}
                  style={{ width: `${opt.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust & Methodology Footer Note */}
      <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-start gap-2 text-[11px] text-[#64748b] font-medium leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-[#94a3b8] mt-0.5" />
        <span>
          Community Mirror reflects descriptive usage patterns across this research cohort. It is an empirical research tool, not a verdict on linguistic correctness.
        </span>
      </div>
    </div>
  );
}
