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
        colors: ['#5d5fef', '#f59e0b', '#06b6d4', '#10b981', '#f43f5e'],
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white border-2 border-[#e2e8f0] rounded-3xl p-8 shadow-[0_8px_0_#e2e8f0] text-center">
        {/* Gaju The Scribe Elephant Celebration */}
        <div className="flex justify-center -mt-20 mb-2">
          <div className="p-3 bg-white border-2 border-[#e2e8f0] rounded-full shadow-md animate-bounce-subtle">
            <Mascot mood="happy" size={120} />
          </div>
        </div>

        <h2 className="text-3xl font-black text-[#5d5fef] tracking-tight uppercase mt-2">
          Quest Complete!
        </h2>
        <p className="text-sm font-semibold text-[#64748b] mt-1">
          Gaju added valuable orthographic observations to your scroll today!
        </p>

        {/* Telemetry Stat Cards */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="bg-[#fffbeb] border-2 border-[#fef3c7] rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#f59e0b] mb-1">
              <Star className="w-6 h-6 fill-current" />
              <span className="text-2xl font-black text-[#1e1b2e]">+{xpEarned}</span>
            </div>
            <span className="text-xs font-bold text-[#b45309] uppercase tracking-wider">XP Earned</span>
          </div>

          <div className="bg-[#fff1f2] border-2 border-[#ffe4e6] rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#f43f5e] mb-1">
              <Flame className="w-6 h-6 fill-current animate-pulse" />
              <span className="text-2xl font-black text-[#1e1b2e]">{streakDays}</span>
            </div>
            <span className="text-xs font-bold text-[#e11d48] uppercase tracking-wider">Day Streak</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {onViewMirror && (
            <TactileButton variant="primary" size="lg" fullWidth onClick={onViewMirror}>
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
