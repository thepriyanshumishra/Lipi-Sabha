'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TactileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  interactive?: boolean;
}

export const TactileCard = React.forwardRef<HTMLDivElement, TactileCardProps>(
  ({ className, selected = false, interactive = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-2 rounded-2xl p-5 transition-all duration-150',
          selected
            ? 'border-[#1cb0f6] bg-[#ddf4ff]/40 shadow-[0_4px_0_#bfe7fc]'
            : 'border-[#e5e5e5] shadow-[0_3px_0_#f0f0f0]',
          interactive
            ? 'cursor-pointer hover:border-[#1cb0f6] hover:shadow-[0_4px_0_#e5e5e5] active:translate-y-1 active:shadow-none'
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
