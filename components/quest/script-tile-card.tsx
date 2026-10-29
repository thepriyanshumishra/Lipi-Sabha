'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ScriptTileCardProps {
  glyph: string;
  transliteration?: string;
  scriptLabel?: string;
  selected?: boolean;
  onSelect?: () => void;
  onPlayAudio?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export function ScriptTileCard({
  glyph,
  transliteration,
  scriptLabel,
  selected = false,
  onSelect,
  onPlayAudio,
  className,
  disabled = false,
}: ScriptTileCardProps) {
  return (
    <div
      onClick={!disabled ? onSelect : undefined}
      className={cn(
        'relative flex flex-col items-center justify-center p-6 bg-white border-2 rounded-2xl select-none transition-all duration-100',
        selected
          ? 'border-[#5d5fef] bg-[#f5f5ff] shadow-[0_4px_0_#d5d6fc] translate-y-0.5'
          : 'border-[#e2e8f0] shadow-[0_4px_0_#e2e8f0] hover:border-[#5d5fef]',
        disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:translate-y-1 active:shadow-none',
        className
      )}
    >
      {/* Audio Play Trigger */}
      {onPlayAudio && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPlayAudio(e);
          }}
          className="absolute top-2.5 right-2.5 p-1.5 text-[#06b6d4] bg-[#ecfeff] hover:bg-[#cffafe] rounded-full transition-colors"
          title="Listen to pronunciation"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      )}

      {/* Script Name Tag */}
      {scriptLabel && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-2 bg-[#f8fafc] px-2 py-0.5 rounded-md border border-[#e2e8f0]">
          {scriptLabel}
        </span>
      )}

      {/* Primary Glyph Display */}
      <div className="text-4xl md:text-5xl font-extrabold text-[#1e1b2e] my-1 leading-normal tracking-wide">
        {glyph}
      </div>

      {/* Phonetic / Latin Transliteration */}
      {transliteration && (
        <div className="text-sm font-semibold text-[#64748b] mt-1 font-mono">
          /{transliteration}/
        </div>
      )}
    </div>
  );
}
