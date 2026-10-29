'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'writing';

export interface MascotProps extends React.SVGProps<SVGSVGElement> {
  mood?: MascotMood;
  size?: number;
}

/**
 * Gaju (गजू) — The Scribe Baby Elephant Mascot of Lipi Sabha
 * Inspired by India's legendary scribe heritage (tradition of the stylus/kalam).
 * A charming, chubby, slate-blue baby elephant with big expressive eyes,
 * a curved trunk holding a bamboo kalam, and playful scholar glasses.
 */
export function Mascot({ mood = 'idle', size = 100, className, ...props }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('select-none transition-transform duration-200', className)}
      {...props}
    >
      {/* Soft Ground Shadow */}
      <ellipse cx="70" cy="128" rx="42" ry="7" fill="#1e1b2e" fillOpacity="0.08" />

      {/* Back Big Rounded Ears */}
      {/* Left Ear */}
      <path
        d="M38 52C20 48 8 62 12 82C15 98 32 100 42 94"
        fill="#94a3b8"
        stroke="#1e1b2e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M34 58C22 56 16 68 18 80C20 90 30 92 38 88"
        fill="#fbcfe8"
        fillOpacity="0.6"
      />

      {/* Right Ear */}
      <path
        d="M102 52C120 48 132 62 128 82C125 98 108 100 98 94"
        fill="#94a3b8"
        stroke="#1e1b2e"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M106 58C118 56 124 68 122 80C120 90 110 92 102 88"
        fill="#fbcfe8"
        fillOpacity="0.6"
      />

      {/* Chubby Body */}
      <path
        d="M44 80C42 104 52 124 70 124C88 124 98 104 96 80C96 74 44 74 44 80Z"
        fill="#cbd5e1"
        stroke="#1e1b2e"
        strokeWidth="3.5"
      />

      {/* Scribe Scarf / Kurta Accent Collar (Golden Amber) */}
      <path
        d="M48 84C62 94 78 94 92 84C88 100 78 104 70 104C62 104 52 100 48 84Z"
        fill="#f59e0b"
        stroke="#1e1b2e"
        strokeWidth="2.5"
      />

      {/* Round Head */}
      <circle
        cx="70"
        cy="58"
        r="34"
        fill="#cbd5e1"
        stroke="#1e1b2e"
        strokeWidth="3.5"
      />

      {/* Cute Head Tuft / Top Knot */}
      <path
        d="M66 24C68 18 70 14 74 12C74 18 72 22 70 24"
        stroke="#1e1b2e"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Cheeks Blush */}
      <ellipse cx="45" cy="68" rx="6" ry="4" fill="#f43f5e" fillOpacity="0.3" />
      <ellipse cx="95" cy="68" rx="6" ry="4" fill="#f43f5e" fillOpacity="0.3" />

      {/* Scholar Glasses (Deep Royal Indigo) */}
      <circle cx="53" cy="56" r="11" stroke="#5d5fef" strokeWidth="3" fill="white" />
      <circle cx="87" cy="56" r="11" stroke="#5d5fef" strokeWidth="3" fill="white" />
      <path d="M64 56H76" stroke="#5d5fef" strokeWidth="3" strokeLinecap="round" />

      {/* Eyes based on mood */}
      {mood === 'happy' ? (
        // Playful joy closed eyes (^ ^)
        <>
          <path d="M48 58C50 52 56 52 58 58" stroke="#1e1b2e" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M82 58C84 52 90 52 92 58" stroke="#1e1b2e" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        // Big curious round pupils
        <>
          <circle cx="55" cy="56" r="5" fill="#1e1b2e" />
          <circle cx="85" cy="56" r="5" fill="#1e1b2e" />
          <circle cx="53.5" cy="54" r="1.8" fill="white" />
          <circle cx="83.5" cy="54" r="1.8" fill="white" />
        </>
      )}

      {/* Little White Tusks */}
      <path d="M54 74C52 78 50 82 46 83C48 80 50 77 52 73" fill="white" stroke="#1e1b2e" strokeWidth="2" />
      <path d="M86 74C88 78 90 82 94 83C92 80 90 77 88 73" fill="white" stroke="#1e1b2e" strokeWidth="2" />

      {/* Trunk Variations */}
      {mood === 'happy' ? (
        // Trunk raised high in cheerful celebration!
        <>
          <path
            d="M64 68C64 82 76 86 80 78C84 70 82 60 88 56C92 52 98 56 94 62C88 72 82 90 64 88C56 86 58 74 62 68"
            fill="#cbd5e1"
            stroke="#1e1b2e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Confetti sparkle above trunk */}
          <path d="M102 44L105 38L108 44L114 47L108 50L105 56L102 50L96 47L102 44Z" fill="#f59e0b" />
        </>
      ) : mood === 'thinking' ? (
        // Trunk touching chin pensively
        <>
          <path
            d="M64 68C62 80 66 94 74 94C82 94 84 86 86 78C88 74 86 70 82 72C78 74 76 82 70 80C66 78 66 72 66 68"
            fill="#cbd5e1"
            stroke="#1e1b2e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </>
      ) : (
        // Idle & Writing: Trunk curled holding the bamboo reed stylus (kalam)
        <>
          <path
            d="M64 68C62 82 66 98 76 98C84 98 86 88 88 82C90 76 88 74 84 76C80 78 78 86 72 84C68 82 66 74 66 68"
            fill="#cbd5e1"
            stroke="#1e1b2e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bamboo Reed Kalam (Stylus) held in trunk */}
          <g transform="rotate(-35 84 84)">
            <rect x="80" y="76" width="6" height="26" rx="2" fill="#d97706" stroke="#1e1b2e" strokeWidth="2" />
            <polygon points="80,102 86,102 83,109" fill="#1e1b2e" />
          </g>
        </>
      )}

      {/* Chubby Front Feet */}
      <rect x="52" y="112" width="12" height="13" rx="6" fill="#cbd5e1" stroke="#1e1b2e" strokeWidth="3" />
      <rect x="76" y="112" width="12" height="13" rx="6" fill="#cbd5e1" stroke="#1e1b2e" strokeWidth="3" />
      {/* Toenails */}
      <circle cx="56" cy="122" r="1.8" fill="white" />
      <circle cx="60" cy="122" r="1.8" fill="white" />
      <circle cx="80" cy="122" r="1.8" fill="white" />
      <circle cx="84" cy="122" r="1.8" fill="white" />
    </svg>
  );
}
