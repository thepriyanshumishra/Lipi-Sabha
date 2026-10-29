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
          ? 'border-[#1cb0f6] bg-[#ddf4ff]/50 shadow-[0_4px_0_#bfe7fc] translate-y-0.5'
          : 'border-[#e5e5e5] shadow-[0_4px_0_#e5e5e5] hover:border-[#1cb0f6]',
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
          className="absolute top-2.5 right-2.5 p-1.5 text-[#1cb0f6] bg-[#ddf4ff] hover:bg-[#bfe7fc] rounded-full transition-colors"
          title="Listen to pronunciation"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      )}

      {/* Script Name Tag */}
      {scriptLabel && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-2 bg-[#f5f5f5] px-2 py-0.5 rounded-md">
          {scriptLabel}
        </span>
      )}

      {/* Primary Glyph Display */}
      <div className="text-4xl md:text-5xl font-bold text-[#000437] my-1 leading-normal tracking-wide">
        {glyph}
      </div>

      {/* Phonetic / Latin Transliteration */}
      {transliteration && (
        <div className="text-sm font-semibold text-[#777777] mt-1 font-mono">
          /{transliteration}/
        </div>
      )}
    </div>
  );
}
