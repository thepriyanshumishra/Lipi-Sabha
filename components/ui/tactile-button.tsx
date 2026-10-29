'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'amber' | 'mint' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        'bg-[#5d5fef] text-white border-2 border-[#5d5fef] shadow-[0_4px_0_#4647c9] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#4647c9]',
      secondary:
        'bg-white text-[#5d5fef] border-2 border-[#e2e8f0] shadow-[0_4px_0_#e2e8f0] hover:border-[#5d5fef] active:translate-y-1 active:shadow-[0_0_0_#e2e8f0]',
      amber:
        'bg-[#f59e0b] text-white border-2 border-[#f59e0b] shadow-[0_4px_0_#d97706] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#d97706]',
      mint:
        'bg-[#10b981] text-white border-2 border-[#10b981] shadow-[0_4px_0_#059669] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#059669]',
      danger:
        'bg-[#f43f5e] text-white border-2 border-[#f43f5e] shadow-[0_4px_0_#e11d48] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#e11d48]',
      ghost:
        'bg-transparent text-[#64748b] border-2 border-transparent hover:bg-[#f1f5f9] active:bg-[#e2e8f0]',
      outline:
        'bg-slate-900/60 text-slate-200 border-2 border-slate-700 shadow-[0_4px_0_#1e293b] hover:bg-slate-800 active:translate-y-1 active:shadow-[0_0_0_#1e293b]',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-xl font-bold tracking-wide uppercase',
      md: 'px-5 py-2.5 text-sm rounded-xl font-bold tracking-wider uppercase',
      lg: 'px-8 py-3.5 text-base rounded-2xl font-extrabold tracking-widest uppercase',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer font-sans transition-all duration-75',
          fullWidth ? 'w-full' : '',
          variantStyles[variant],
          sizeStyles[size],
          disabled ? 'opacity-50 cursor-not-allowed transform-none shadow-none pointer-events-none' : '',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TactileButton.displayName = 'TactileButton';
