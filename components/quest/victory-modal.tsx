'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Star, ArrowRight } from 'lucide-react';
import { Mascot } from '@/components/ui/mascot';
import { TactileButton } from '@/components/ui/tactile-button';

export interface VictoryModalProps {
  xpEarned?: number;
  streakDays?: number;
  onContinue: () => void;
  onViewMirror?: () => void;
}

export function VictoryModal({
  xpEarned = 10,
  streakDays = 5,
  onContinue,
  onViewMirror,
}: VictoryModalProps) {
  useEffect(() => {
    // Duolingo celebratory multi-burst confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() - 0.2 },
        colors: ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#d7ffb8'],
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-2 border-[#e5e5e5] rounded-3xl p-8 shadow-[0_8px_0_#e5e5e5] text-center">
        {/* Scribe Mascot Victory Dance */}
        <div className="flex justify-center -mt-16 mb-2">
          <div className="p-3 bg-white border-2 border-[#e5e5e5] rounded-full shadow-md animate-bounce-subtle">
            <Mascot mood="happy" size={110} />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-[#58cc02] tracking-tight uppercase mt-2">
          Quest Complete!
        </h2>
        <p className="text-sm font-semibold text-[#777777] mt-1">
          You uncovered valuable orthographic insights today!
        </p>

        {/* Telemetry Stat Cards */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="bg-[#fff9e6] border-2 border-[#ffe899] rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#ffc800] mb-1">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-black text-[#4b4b4b]">+{xpEarned}</span>
            </div>
            <span className="text-xs font-bold text-[#b38600] uppercase tracking-wider">XP Earned</span>
          </div>

          <div className="bg-[#fff0f0] border-2 border-[#ffd6d6] rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#ff4b4b] mb-1">
              <Flame className="w-6 h-6 fill-current animate-pulse" />
              <span className="text-2xl font-black text-[#4b4b4b]">{streakDays}</span>
            </div>
            <span className="text-xs font-bold text-[#d63f3f] uppercase tracking-wider">Day Streak</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onViewMirror && (
            <TactileButton variant="action" size="lg" fullWidth onClick={onViewMirror}>
              <span>View Community Mirror</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </TactileButton>
          )}

          <TactileButton variant="secondary" size="md" fullWidth onClick={onContinue}>
            Return to Scribe Dashboard
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
