'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'parchment' | 'dark';
}

export const TactileCard = React.forwardRef<HTMLDivElement, TactileCardProps>(
  ({ className, selected = false, interactive = false, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl transition-all duration-150',
          variant === 'default' && 'bg-slate-900/90 border border-slate-800 shadow-[0_4px_0_#0f172a]',
          variant === 'parchment' && 'bg-[#FAF5EE] border border-[#D5C7B6] shadow-[0_4px_0_#C5B49E]',
          variant === 'dark' && 'bg-[#0C101C] border border-slate-800 shadow-[0_4px_0_#070A12]',
          selected
            ? 'border-amber-400 bg-amber-950/20 shadow-[0_4px_0_#b45309]'
            : '',
          interactive
            ? 'cursor-pointer hover:border-amber-400 active:translate-y-1 active:shadow-none'
            : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TactileCard.displayName = 'TactileCard';
