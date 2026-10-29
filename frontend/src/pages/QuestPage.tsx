import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { demoQuests } from '@/data/demo';
import { useAuth } from '@/contexts/AuthContext';

export function QuestPage() {
  const { questId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const quest = demoQuests.find((q) => q.id === Number(questId)) || demoQuests[0];
  const lessons = quest.lessons || [];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [patternRevealed, setPatternRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentLesson = lessons[currentLessonIndex];
  const isLastLesson = currentLessonIndex === lessons.length - 1;

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastLesson) {
      // Mark quest completed
      setIsCompleted(true);
      const raw = localStorage.getItem('lipisabha_learning_progress');
      const progress = raw ? JSON.parse(raw) : {};
      progress[quest.id] = {
        completed: true,
        completedAt: new Date().toISOString(),
        xpEarned: quest.xp_reward
      };
      localStorage.setItem('lipisabha_learning_progress', JSON.stringify(progress));
    } else {
      setCurrentLessonIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setPatternRevealed(false);
    }
  };

  if (!currentLesson && !isCompleted) {
    return (
      <div className="bg-cream min-h-screen py-16 text-center">
        <h2 className="font-display text-2xl font-bold mb-4">No lessons in this quest yet.</h2>
        <Link to="/learn" className="text-purple font-semibold hover:underline">
          Return to Learning Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation & Progress Bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> All Quests
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-purple bg-lilac px-3 py-1 rounded-full">
              +{quest.xp_reward} XP
            </span>
            <span className="text-xs font-mono text-muted">
              {isCompleted ? 'Finished' : `Lesson ${currentLessonIndex + 1} of ${lessons.length}`}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="w-full bg-neutral h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-purple h-full transition-all duration-300"
            style={{
              width: isCompleted
                ? '100%'
                : `${((currentLessonIndex + 1) / lessons.length) * 100}%`
            }}
          />
        </div>

        {/* Quest Card Container */}
        <AnimatePresence mode="wait">
          {isCompleted ? (
            /* Quest Completion Celebration */
            <motion.div
              key="completion"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl border border-border p-8 sm:p-12 text-center shadow-card space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-mint flex items-center justify-center text-4xl mx-auto shadow-soft">
                🌱
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-mint-dark font-bold">
                  Quest Accomplished
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                  Congratulations!
                </h1>
                <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                  You have completed <strong>{quest.title}</strong>. Your curiosity nurtures the Letter Garden and deepens your understanding of community writing diversity.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow/40 text-yellow-dark text-sm font-bold">
                <Award size={18} /> +{quest.xp_reward} Learning XP Earned!
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/learn"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors shadow-soft"
                >
                  Continue to Next Quest
                </Link>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentLessonIndex(0);
                    setSelectedOption(null);
                    setShowExplanation(false);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral text-ink text-sm font-semibold hover:bg-neutral/80 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={16} /> Review Lessons
                </button>
              </div>
            </motion.div>
          ) : (
            /* Interactive Lesson Screen */
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-card space-y-8"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple">
                  {quest.title}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-1">
                  {currentLesson.title}
                </h2>
              </div>

              {/* Lesson Type A: Text / Narrative */}
              {currentLesson.content.type === 'text' && (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none text-muted leading-relaxed whitespace-pre-line bg-cream p-6 rounded-2xl border border-border">
                    {currentLesson.content.body}
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
                    >
                      {isLastLesson ? 'Finish Quest' : 'Continue'} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Lesson Type B: Multiple Choice Question */}
              {currentLesson.content.type === 'multiple_choice' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-neutral/40 border border-border">
                    <p className="text-base font-medium text-ink">
                      {currentLesson.content.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {currentLesson.content.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === (currentLesson.content as any).correct_index;

                      let cardStyle = 'border-border bg-white hover:border-purple/50';
                      if (showExplanation) {
                        if (isCorrect) {
                          cardStyle = 'border-mint-dark bg-mint/50 text-ink';
                        } else if (isSelected) {
                          cardStyle = 'border-danger bg-danger-light text-danger';
                        }
                      } else if (isSelected) {
                        cardStyle = 'border-purple bg-purple-light';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showExplanation}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 ${cardStyle}`}
                        >
                          <span className="text-sm font-medium">{option}</span>
                          {showExplanation && isCorrect && (
                            <CheckCircle2 size={18} className="text-mint-dark flex-shrink-0 mt-0.5" />
                          )}
                          {showExplanation && isSelected && !isCorrect && (
                            <XCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className="p-5 rounded-2xl bg-lilac/50 border border-purple/20 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-purple uppercase tracking-wider">
                        <HelpCircle size={16} />
                        Linguistic Context
                      </div>
                      <p className="text-xs text-ink leading-relaxed">
                        {currentLesson.content.explanation}
                      </p>
                    </div>
                  )}

                  {showExplanation && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
                      >
                        {isLastLesson ? 'Complete Quest' : 'Next Lesson'} <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Type C: Match Rule */}
              {currentLesson.content.type === 'match_rule' && (
                <div className="space-y-6">
                  <p className="text-sm font-medium text-ink">
                    {currentLesson.content.prompt}
                  </p>

                  <div className="space-y-3">
                    {currentLesson.content.rules.map((item, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === (currentLesson.content as any).correct_rule_index;

                      let cardStyle = 'border-border bg-white hover:border-purple/50';
                      if (showExplanation) {
                        if (isCorrect) {
                          cardStyle = 'border-mint-dark bg-mint/50';
                        } else if (isSelected) {
                          cardStyle = 'border-danger bg-danger-light';
                        }
                      } else if (isSelected) {
                        cardStyle = 'border-purple bg-purple-light';
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showExplanation}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 ${cardStyle}`}
                        >
                          <div>
                            <p className="text-sm font-semibold text-ink">{item.rule}</p>
                            <p className="text-xs text-muted mt-0.5">Example: <code className="font-mono font-bold text-purple">{item.example}</code></p>
                          </div>
                          {showExplanation && isCorrect && <CheckCircle2 size={18} className="text-mint-dark" />}
                        </button>
                      );
                    })}
                  </div>

                  {showExplanation && (
                    <div className="p-5 rounded-2xl bg-lilac/50 border border-purple/20 space-y-2">
                      <span className="text-xs font-bold text-purple uppercase tracking-wider block">Explanation</span>
                      <p className="text-xs text-ink leading-relaxed">
                        {currentLesson.content.explanation}
                      </p>
                    </div>
                  )}

                  {showExplanation && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
                      >
                        {isLastLesson ? 'Finish Quest' : 'Continue'} <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Type D: Spot Pattern */}
              {currentLesson.content.type === 'spot_pattern' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-cream border border-border text-center space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      Inspect These Verified Examples
                    </span>
                    <div className="flex flex-wrap justify-center gap-3">
                      {currentLesson.content.examples.map((ex, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white border border-border text-base font-display font-bold text-ink shadow-soft">
                          {ex}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted">Can you identify the recurring orthographic principle?</p>
                  </div>

                  {!patternRevealed ? (
                    <button
                      onClick={() => setPatternRevealed(true)}
                      className="w-full py-3 rounded-xl bg-neutral hover:bg-neutral/80 text-ink text-sm font-semibold transition-colors"
                    >
                      Reveal Documented Pattern
                    </button>
                  ) : (
                    <div className="p-5 rounded-2xl bg-mint/50 border border-mint-dark/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-mint-dark uppercase tracking-wider">
                        <Sparkles size={16} /> Pattern Revealed
                      </div>
                      <p className="text-sm font-semibold text-ink">
                        {currentLesson.content.pattern}
                      </p>
                      <p className="text-xs text-muted leading-relaxed">
                        {currentLesson.content.explanation}
                      </p>
                    </div>
                  )}

                  {patternRevealed && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
                      >
                        {isLastLesson ? 'Complete Quest' : 'Next Lesson'} <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
