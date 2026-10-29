'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'action' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        'bg-[#58cc02] text-white border-2 border-[#58cc02] shadow-[0_4px_0_#46a302] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#46a302]',
      secondary:
        'bg-white text-[#1cb0f6] border-2 border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] hover:border-[#1cb0f6] active:translate-y-1 active:shadow-[0_0_0_#e5e5e5]',
      action:
        'bg-[#1cb0f6] text-white border-2 border-[#1cb0f6] shadow-[0_4px_0_#1899d6] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#1899d6]',
      danger:
        'bg-[#ff4b4b] text-white border-2 border-[#ff4b4b] shadow-[0_4px_0_#d63f3f] hover:brightness-105 active:translate-y-1 active:shadow-[0_0_0_#d63f3f]',
      ghost:
        'bg-transparent text-[#777777] border-2 border-transparent hover:bg-[#f7f7f7] active:bg-[#e5e5e5]',
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
