'use client';

import React, { useState } from 'react';
import { Volume2, CheckCircle, HelpCircle, X, Sparkles } from 'lucide-react';
import { ProgressBar } from '@/components/ui/progress-bar';
import { TactileButton } from '@/components/ui/tactile-button';
import { MascotBubble } from '@/components/ui/mascot-bubble';
import { ScriptTileCard } from '@/components/quest/script-tile-card';
import { CanvasTrace } from '@/components/quest/canvas-trace';
import { VictoryModal } from '@/components/quest/victory-modal';
import { CommunityMirrorCard, type MirrorOption } from '@/components/quest/community-mirror-card';

export interface QuestTask {
  id: string;
  type: 'script_match' | 'tile_reorder' | 'audio_discrimination' | 'variant_compare' | 'canvas_trace';
  instruction: string;
  hint?: string;
  options?: Array<{
    id: string;
    glyph: string;
    label: string;
    transliteration?: string;
  }>;
  audioPronunciation?: string;
  guideGlyph?: string;
  mirrorData?: {
    totalSample: number;
    options: MirrorOption[];
  };
  explanation: string;
}

export interface QuestRunnerProps {
  questTitle: string;
  tasks: QuestTask[];
  onComplete?: (results: Record<string, string>) => void;
  onExit?: () => void;
}

export function QuestRunner({ questTitle, tasks, onComplete, onExit }: QuestRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showMirror, setShowMirror] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentTask = tasks[currentIndex];
  const isLastTask = currentIndex === tasks.length - 1;

  // Web Audio acoustic clicks & chimes
  const playSound = (type: 'tap' | 'correct' | 'fanfare') => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'tap') {
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } else if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.09); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.18); // G5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // AudioContext not allowed before user interaction
    }
  };

  const handleSelect = (id: string) => {
    if (checked) return;
    playSound('tap');
    setSelectedAnswer(id);
  };

  const handleCheck = () => {
    if (!selectedAnswer && currentTask.type !== 'canvas_trace') return;
    playSound('correct');
    setChecked(true);
    setAnswers((prev) => ({
      ...prev,
      [currentTask.id]: selectedAnswer || 'completed',
    }));

    if (currentTask.type === 'variant_compare') {
      setShowMirror(true);
    }
  };

  const handleNext = () => {
    if (isLastTask) {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(answers);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setChecked(false);
      setShowMirror(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Top Navigation & Quest Progress Bar */}
      <header className="max-w-2xl w-full mx-auto px-4 py-4 flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          className="p-2 text-[#94a3b8] hover:text-[#1e1b2e] rounded-full hover:bg-[#f1f5f9] transition-colors"
          title="Exit Quest"
        >
          <X className="w-6 h-6" />
        </button>

        <ProgressBar current={currentIndex + (checked ? 1 : 0)} total={tasks.length} className="flex-1" variant="mint" />

        <div className="flex items-center gap-1.5 text-xs font-black text-[#b45309] bg-[#fef3c7] border border-[#fde68a] px-3 py-1.5 rounded-full">
          <Sparkles className="w-4 h-4 fill-current text-[#f59e0b]" />
          <span>+10 XP</span>
        </div>
      </header>

      {/* Main Quest Interaction Stage */}
      <main className="max-w-xl w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center">
        {/* Gaju Scribe Elephant Mascot Speech Bubble */}
        <MascotBubble
          mood={checked ? 'happy' : currentTask.type === 'canvas_trace' ? 'writing' : 'idle'}
          message={currentTask.instruction}
          subtitle={currentTask.hint}
          className="mb-8"
        />

        {/* Task Form 1: Script Match & Audio Choice Cards */}
        {(currentTask.type === 'script_match' || currentTask.type === 'audio_discrimination') && currentTask.options && (
          <div className="grid grid-cols-2 gap-4">
            {currentTask.options.map((opt) => (
              <ScriptTileCard
                key={opt.id}
                glyph={opt.glyph}
                transliteration={opt.transliteration}
                scriptLabel={opt.label}
                selected={selectedAnswer === opt.id}
                onSelect={() => handleSelect(opt.id)}
                disabled={checked}
              />
            ))}
          </div>
        )}

        {/* Task Form 2: Blind-First Variant Comparison */}
        {currentTask.type === 'variant_compare' && currentTask.options && (
          <div className="space-y-4">
            {!showMirror ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTask.options.map((opt) => (
                  <ScriptTileCard
                    key={opt.id}
                    glyph={opt.glyph}
                    scriptLabel={opt.label}
                    transliteration={opt.transliteration}
                    selected={selectedAnswer === opt.id}
                    onSelect={() => handleSelect(opt.id)}
                    disabled={checked}
                  />
                ))}
              </div>
            ) : (
              currentTask.mirrorData && (
                <CommunityMirrorCard
                  questionTitle={currentTask.instruction}
                  totalSample={currentTask.mirrorData.totalSample}
                  options={currentTask.mirrorData.options.map((m) => ({
                    ...m,
                    isSelectedByUser: m.glyph === currentTask.options?.find((o) => o.id === selectedAnswer)?.glyph,
                  }))}
                />
              )
            )}
          </div>
        )}

        {/* Task Form 3: Canvas Character Tracing */}
        {currentTask.type === 'canvas_trace' && (
          <CanvasTrace
            guideGlyph={currentTask.guideGlyph || 'क'}
            guideSubtext="Trace the letter stroke following the historic manuscript contour"
            onTraceComplete={() => {
              setSelectedAnswer('drawn');
              handleCheck();
            }}
          />
        )}
      </main>

      {/* Sticky Bottom Action Drawer */}
      <footer
        className={`w-full border-t-2 py-5 px-4 transition-colors duration-200 ${
          checked
            ? 'bg-[#ecfdf5] border-[#a7f3d0]'
            : 'bg-white border-[#e2e8f0]'
        }`}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          {checked ? (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#10b981] text-white rounded-full shadow-sm">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-[#059669]">
                  {currentTask.type === 'variant_compare' ? 'Observation Logged!' : 'Nicely Done!'}
                </p>
                <p className="text-xs font-semibold text-[#1e1b2e]">
                  {currentTask.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs font-bold text-[#64748b] hidden md:block">
              Select an answer to continue
            </div>
          )}

          <div>
            {!checked ? (
              <TactileButton
                variant="primary"
                size="lg"
                disabled={!selectedAnswer && currentTask.type !== 'canvas_trace'}
                onClick={handleCheck}
              >
                Check Answer
              </TactileButton>
            ) : (
              <TactileButton variant="primary" size="lg" onClick={handleNext}>
                {isLastTask ? 'Complete Quest' : 'Continue'}
              </TactileButton>
            )}
          </div>
        </div>
      </footer>

      {/* Victory Celebration Modal on Final Task Completion */}
      {isCompleted && (
        <VictoryModal
          xpEarned={10}
          streakDays={5}
          onContinue={() => {
            if (onExit) onExit();
          }}
          onViewMirror={() => {
            if (onExit) onExit();
          }}
        />
      )}
    </div>
  );
}
