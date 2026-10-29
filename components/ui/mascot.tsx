'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'writing';

export interface MascotProps extends React.SVGProps<SVGSVGElement> {
  mood?: MascotMood;
  size?: number;
}

export function Mascot({ mood = 'idle', size = 96, className, ...props }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none transition-transform duration-200', className)}
      {...props}
    >
      {/* Shadow */}
      <ellipse cx="60" cy="112" rx="36" ry="6" fill="#000437" fillOpacity="0.08" />

      {/* Main Body - Duolingo Fresh Leaf & Eager Green */}
      <path
        d="M60 20C40 20 26 36 26 62C26 88 40 108 60 108C80 108 94 88 94 62C94 36 80 20 60 20Z"
        fill="#58cc02"
        stroke="#000437"
        strokeWidth="3.5"
      />

      {/* Tummy Patch - Storybook Green */}
      <path
        d="M60 48C48 48 38 60 38 78C38 96 48 104 60 104C72 104 82 96 82 78C82 60 72 48 60 48Z"
        fill="#d7ffb8"
      />

      {/* Ancient Scribe Head Tuft / Feather */}
      <path
        d="M60 18C58 8 52 4 48 2C54 6 56 12 56 18H60Z"
        fill="#46a302"
        stroke="#000437"
        strokeWidth="2"
      />

      {/* Eyes Container */}
      {mood === 'happy' ? (
        // Joyful closed curved eyes (^ ^)
        <>
          <path
            d="M40 52C42 46 48 46 50 52"
            stroke="#000437"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M70 52C72 46 78 46 80 52"
            stroke="#000437"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      ) : (
        // Expressive large friendly round eyes
        <>
          <circle cx="44" cy="50" r="11" fill="white" stroke="#000437" strokeWidth="3" />
          <circle cx="76" cy="50" r="11" fill="white" stroke="#000437" strokeWidth="3" />

          {/* Pupils */}
          <circle cx="46" cy="50" r="5" fill="#000437" />
          <circle cx="74" cy="50" r="5" fill="#000437" />

          {/* Highlights */}
          <circle cx="44.5" cy="48" r="2" fill="white" />
          <circle cx="72.5" cy="48" r="2" fill="white" />
        </>
      )}

      {/* Orange Beak */}
      <path
        d="M54 56L60 66L66 56C64 54 56 54 54 56Z"
        fill="#ff9600"
        stroke="#000437"
        strokeWidth="2.5"
      />

      {/* Scholar Spectacles / Glasses */}
      <circle cx="44" cy="50" r="13" stroke="#1cb0f6" strokeWidth="2.5" fill="none" />
      <circle cx="76" cy="50" r="13" stroke="#1cb0f6" strokeWidth="2.5" fill="none" />
      <path d="M57 50H63" stroke="#1cb0f6" strokeWidth="2.5" strokeLinecap="round" />

      {/* Wings / Arms */}
      {mood === 'happy' ? (
        // Raised wings celebration
        <>
          <path
            d="M26 65C14 55 12 40 18 36C24 32 28 46 30 56"
            fill="#58cc02"
            stroke="#000437"
            strokeWidth="3"
          />
          <path
            d="M94 65C106 55 108 40 102 36C96 32 92 46 90 56"
            fill="#58cc02"
            stroke="#000437"
            strokeWidth="3"
          />
        </>
      ) : mood === 'thinking' ? (
        // Wing touching chin thoughtfully
        <>
          <path
            d="M27 65C20 72 22 84 27 88"
            stroke="#000437"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M93 68C85 64 74 66 70 74"
            fill="#58cc02"
            stroke="#000437"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        // Holding Scribe Reed Stylus (Kalam)
        <>
          <path
            d="M28 65C22 72 22 84 28 88"
            fill="#58cc02"
            stroke="#000437"
            strokeWidth="3"
          />
          <path
            d="M92 65C98 72 98 84 92 88"
            fill="#58cc02"
            stroke="#000437"
            strokeWidth="3"
          />
          {/* Wooden Kalam / Stylus */}
          <line
            x1="94"
            y1="82"
            x2="108"
            y2="60"
            stroke="#b45309"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon points="108,60 112,56 109,62" fill="#000437" />
        </>
      )}

      {/* Feet */}
      <path d="M46 108V114M52 108V114" stroke="#ff9600" strokeWidth="3" strokeLinecap="round" />
      <path d="M68 108V114M74 108V114" stroke="#ff9600" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
