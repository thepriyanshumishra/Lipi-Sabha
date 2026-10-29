import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Compass,
  Star,
  Play
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { demoQuests, demoBadges } from '@/data/demo';

export function LearnPage() {
  const { user, isAuthenticated } = useAuth();

  // Retrieve user progress from localStorage
  const storedProgressRaw = localStorage.getItem('lipisabha_learning_progress');
  const userProgress = storedProgressRaw ? JSON.parse(storedProgressRaw) : {};

  const currentLearningXP = user?.learning_xp || 0;
  const completedCount = Object.values(userProgress).filter((p: any) => p.completed).length;

  // The 4 Garden Evolution Stages
  const getGardenStage = (xp: number) => {
    if (xp < 100) return { name: 'Acorn Seed', icon: '🌰', desc: 'Your personal curiosity has taken root.' };
    if (xp < 300) return { name: 'Tender Sprout', icon: '🌱', desc: 'First leaves of understanding are emerging.' };
    if (xp < 600) return { name: 'Branching Vine', icon: '🌿', desc: 'Growing familiarity across diverse writing conventions.' };
    return { name: 'Flourishing Blossom', icon: '🌸', desc: 'A rich garden of linguistic and orthographic appreciation.' };
  };

  const garden = getGardenStage(currentLearningXP);

  // Discovery Path Node sequence (Winding Journey)
  const pathNodes = [
    { id: 1, title: 'Meet a Writing System', subtitle: 'What is a script and why do choices exist?', icon: '✦', level: 1, available: true },
    { id: 2, title: 'Pattern Finder', subtitle: 'Spotting vowel markers and spelling rules', icon: '🔍', level: 2, available: true },
    { id: 3, title: 'Sound & Symbol', subtitle: 'How speech sounds connect to written shapes', icon: '🗣️', level: 3, available: completedCount >= 1 || currentLearningXP >= 100 },
    { id: 4, title: 'The Rule Explorer', subtitle: 'Testing diacritics and word boundaries', icon: '⚖️', level: 4, available: completedCount >= 2 || currentLearningXP >= 200 },
    { id: 5, title: 'Beyond the Familiar', subtitle: 'Discovering indigenous and regional abugidas', icon: '🌺', level: 5, available: completedCount >= 3 || currentLearningXP >= 300 }
  ];

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* ========================================================
            HERO CARD: PERSONAL PROGRESS GARDEN STAGE
            ======================================================== */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-mint/50 border-2 border-mint-dark/30 flex items-center justify-center text-5xl shadow-soft">
              {garden.icon}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-mint-dark">
                Personal Progress Garden
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-ink">
                {garden.name}
              </h1>
              <p className="text-xs font-sans text-muted leading-relaxed">
                {garden.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="px-5 py-3 rounded-2xl bg-yellow/40 border-2 border-yellow/60 text-center">
              <span className="text-[10px] font-display font-extrabold text-yellow-dark uppercase block">Personal XP</span>
              <span className="font-display text-xl font-black text-ink">+{currentLearningXP}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-purple-light border-2 border-purple/20 text-center">
              <span className="text-[10px] font-display font-extrabold text-purple uppercase block">Milestones</span>
              <span className="font-display text-xl font-black text-purple">{completedCount} / 5</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            THE WINDING DISCOVERY TRAIL (LEARNING PATH)
            ======================================================== */}
        <div className="space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h2 className="font-display text-3xl font-black text-ink">The Discovery Trail</h2>
            <p className="text-xs font-sans text-muted">
              Step through nodes along the path. Each step unpacks a real orthographic pattern.
            </p>
          </div>

          {/* Winding Path Layout */}
          <div className="relative py-8 flex flex-col items-center space-y-8">
            {/* Visual connecting trail spine */}
            <div className="absolute top-8 bottom-8 w-2 bg-neutral border-l border-r border-border rounded-full -z-0" />

            {pathNodes.map((node, index) => {
              const isCompleted = userProgress[node.id]?.completed;
              const isAvailable = node.available || isCompleted;

              // Alternating zig-zag offset for storybook feel
              const offsetClass = index % 2 === 0 ? 'md:-translate-x-16' : 'md:translate-x-16';

              return (
                <div
                  key={node.id}
                  className={`relative z-10 flex flex-col items-center transition-all ${offsetClass}`}
                >
                  {isAvailable ? (
                    <Link
                      to={`/learn/${node.id}`}
                      className="group flex flex-col items-center"
                      aria-label={`Open Quest: ${node.title}`}
                    >
                      {/* Chunky Circular Interactive Node */}
                      <div
                        className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl border-2 transition-all shadow-card ${
                          isCompleted
                            ? 'bg-mint border-mint-dark text-mint-dark border-b-4 hover:scale-105'
                            : 'bg-purple text-white border-purple border-b-4 border-b-purple-hover hover:scale-110'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={36} /> : <span>{node.icon}</span>}
                      </div>

                      {/* Node Label Capsule */}
                      <div className="mt-3 px-4 py-2 rounded-2xl bg-white border-2 border-border shadow-soft text-center max-w-[220px] group-hover:border-purple transition-colors">
                        <span className="text-[10px] font-mono font-bold text-purple uppercase block">
                          Level {node.level}
                        </span>
                        <h3 className="font-display text-sm font-extrabold text-ink leading-tight">
                          {node.title}
                        </h3>
                        <p className="text-[10px] text-muted font-sans mt-0.5 line-clamp-1">
                          {node.subtitle}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center opacity-60 cursor-not-allowed">
                      <div className="w-20 h-20 rounded-3xl bg-neutral border-2 border-border flex items-center justify-center text-2xl text-muted">
                        <Lock size={26} />
                      </div>
                      <div className="mt-3 px-4 py-2 rounded-2xl bg-white/70 border border-border text-center max-w-[220px]">
                        <span className="text-[10px] font-mono text-muted block">Locked</span>
                        <h4 className="font-display text-xs font-bold text-muted">{node.title}</h4>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            COMPANION DISCOVERY MILESTONES
            ======================================================== */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-black text-ink">Personal Learning Badges</h3>
            <span className="text-xs font-sans text-muted">Earned through self-paced curiosity</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {demoBadges.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-2xl bg-cream border-2 border-border flex flex-col items-center text-center space-y-1.5"
              >
                <span className="text-3xl">{badge.icon}</span>
                <h4 className="font-display text-xs font-extrabold text-ink">{badge.name}</h4>
                <p className="text-[10px] font-sans text-muted leading-tight">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
