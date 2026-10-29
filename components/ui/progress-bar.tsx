'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  variant?: 'mint' | 'indigo';
}

export function ProgressBar({ current, total, className, variant = 'mint' }: ProgressBarProps) {
  const percentage = Math.min(Math.max(total > 0 ? (current / total) * 100 : 0, 0), 100);

  const colors = {
    mint: {
      bar: 'bg-[#10b981]',
      shadow: 'shadow-[0_2px_0_#059669]',
      gleam: 'bg-[#a7f3d0]/60',
    },
    indigo: {
      bar: 'bg-[#5d5fef]',
      shadow: 'shadow-[0_2px_0_#4647c9]',
      gleam: 'bg-[#c7d2fe]/60',
    },
  };

  const active = colors[variant];

  return (
    <div className={cn('relative w-full h-4 bg-[#e2e8f0] rounded-full overflow-hidden p-0.5', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-300 ease-out relative', active.bar, active.shadow)}
        style={{ width: `${percentage}%` }}
      >
        {/* Subtle highlight gleam */}
        <div className={cn('absolute top-0.5 left-1 right-1 h-1 rounded-full', active.gleam)} />
      </div>
    </div>
  );
}
