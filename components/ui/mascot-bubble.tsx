'use client';

import React from 'react';
import { Mascot, type MascotMood } from './mascot';
import { cn } from '@/lib/utils';

export interface MascotBubbleProps {
  mood?: MascotMood;
  message: React.ReactNode;
  subtitle?: string;
  className?: string;
  mascotSize?: number;
}

export function MascotBubble({
  mood = 'idle',
  message,
  subtitle,
  className,
  mascotSize = 84,
}: MascotBubbleProps) {
  return (
    <div className={cn('flex items-center gap-4 my-4', className)}>
      <div className="shrink-0 animate-bounce-subtle">
        <Mascot mood={mood} size={mascotSize} />
      </div>

      <div className="relative bg-white border-2 border-[#e5e5e5] rounded-2xl px-5 py-3.5 shadow-[0_3px_0_#f0f0f0] max-w-lg">
        {/* Left pointing speech bubble pointer */}
        <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#e5e5e5]" />
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-white" />

        <div className="text-[17px] font-bold text-[#4b4b4b] leading-snug">{message}</div>
        {subtitle && <p className="text-sm font-medium text-[#777777] mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
