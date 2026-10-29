'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max(total > 0 ? (current / total) * 100 : 0, 0), 100);

  return (
    <div className={cn('relative w-full h-4 bg-[#e5e5e5] rounded-full overflow-hidden p-0.5', className)}>
      <div
        className="h-full bg-[#58cc02] rounded-full transition-all duration-300 ease-out relative shadow-[0_2px_0_#46a302]"
        style={{ width: `${percentage}%` }}
      >
        {/* Duolingo inner highlight gleam */}
        <div className="absolute top-0.5 left-1 right-1 h-1 bg-[#d7ffb8]/60 rounded-full" />
      </div>
    </div>
  );
}
