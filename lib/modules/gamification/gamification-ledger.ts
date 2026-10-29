/**
 * GamificationLedger - Idempotent XP Accounting, Scribe Ranks & Ink Saver Streaks
 * 
 * Implements Duolingo-style high-engagement tactile gamification tailored
 * for ethical epigraphy and linguistic fieldwork.
 */

export type GamificationAction =
  | 'quest_completion'
  | 'reflection_bonus'
  | 'variant_contribution'
  | 'daily_streak';

export interface ScribeRankTier {
  name: string;
  hindiTitle: string;
  minXp: number;
  badgeIcon: string;
  description: string;
}

export const SCRIBE_RANKS: readonly ScribeRankTier[] = [
  {
    name: 'Akshara Jigyasu',
    hindiTitle: 'अक्षर जिज्ञासु (Novice Copyist)',
    minXp: 0,
    badgeIcon: 'Scroll',
    description: 'Beginning your journey into historic scripts and epigraphy.'
  },
  {
    name: 'Patra Lekhak',
    hindiTitle: 'पत्र लेखक (Manuscript Scribe)',
    minXp: 150,
    badgeIcon: 'Feather',
    description: 'Proficient in transcribing standard archival documents.'
  },
  {
    name: 'Lipi Shodharthi',
    hindiTitle: 'लिपि शोधार्थी (Epigraphy Fieldworker)',
    minXp: 500,
    badgeIcon: 'Compass',
    description: 'Active field participant recording community orthographic variants.'
  },
  {
    name: 'Mahamahopadhyaya',
    hindiTitle: 'महामहोपाध्याय (Master Epigrapher)',
    minXp: 1500,
    badgeIcon: 'Award',
    description: 'Expert reviewer capable of cross-referencing multi-century paleography.'
  },
  {
    name: 'Sabha Pramukh',
    hindiTitle: 'सभा प्रमुख (Chief Archivist)',
    minXp: 4000,
    badgeIcon: 'Crown',
    description: 'Sovereign guardian of script heritage and orthographic consensus.'
  }
] as const;

export interface StreakEvaluationResult {
  newStreak: number;
  longestStreak: number;
  freezesRemaining: number;
  freezeConsumed: boolean;
  streakPreserved: boolean;
  earnedNewFreeze: boolean;
  message: string;
}

/**
 * Calculates Scribe Rank based on cumulative XP.
 */
export function getScribeRank(xp: number): ScribeRankTier {
  for (let i = SCRIBE_RANKS.length - 1; i >= 0; i--) {
    if (xp >= SCRIBE_RANKS[i].minXp) {
      return SCRIBE_RANKS[i];
    }
  }
  return SCRIBE_RANKS[0];
}

/**
 * Calculates progress percentage toward next Scribe Rank tier.
 */
export function getRankProgress(xp: number): {
  currentRank: ScribeRankTier;
  nextRank: ScribeRankTier | null;
  progressPercent: number;
  xpNeededForNext: number;
} {
  const currentRank = getScribeRank(xp);
  const currentIndex = SCRIBE_RANKS.findIndex(r => r.name === currentRank.name);
  const nextRank = currentIndex < SCRIBE_RANKS.length - 1 ? SCRIBE_RANKS[currentIndex + 1] : null;

  if (!nextRank) {
    return {
      currentRank,
      nextRank: null,
      progressPercent: 100,
      xpNeededForNext: 0,
    };
  }

  const range = nextRank.minXp - currentRank.minXp;
  const currentInTier = Math.max(0, xp - currentRank.minXp);
  const progressPercent = Math.min(100, Math.floor((currentInTier / range) * 100));
  const xpNeededForNext = Math.max(0, nextRank.minXp - xp);

  return {
    currentRank,
    nextRank,
    progressPercent,
    xpNeededForNext,
  };
}

/**
 * Evaluates streak status and Ink Saver (streak freeze) protection.
 *
 * @param lastActivityAt Previous quest completion timestamp or null
 * @param currentStreak Current recorded streak count
 * @param longestStreak User's all-time longest streak
 * @param freezesAvailable Current available Ink Savers
 * @param now Current evaluation date (default: Date.now())
 */
export function evaluateStreak(
  lastActivityAt: Date | string | null,
  currentStreak: number,
  longestStreak: number,
  freezesAvailable: number,
  now: Date = new Date()
): StreakEvaluationResult {
  if (!lastActivityAt) {
    // First activity ever
    return {
      newStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
      freezesRemaining: freezesAvailable,
      freezeConsumed: false,
      streakPreserved: false,
      earnedNewFreeze: false,
      message: 'Welcome to Lipi Sabha! Day 1 streak ignited.',
    };
  }

  const lastDate = new Date(lastActivityAt);
  // Normalize dates to midnight UTC to prevent time-of-day jitter
  const nowDateMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const lastDateMidnight = Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth(), lastDate.getUTCDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = Math.floor((nowDateMidnight - lastDateMidnight) / msPerDay);

  if (dayDifference === 0) {
    // Already contributed today!
    return {
      newStreak: currentStreak,
      longestStreak,
      freezesRemaining: freezesAvailable,
      freezeConsumed: false,
      streakPreserved: true,
      earnedNewFreeze: false,
      message: 'Active streak already marked for today! Keep the flame alive.',
    };
  }

  if (dayDifference === 1) {
    // Consecutive next-day contribution!
    const newStreak = currentStreak + 1;
    const earnedFreeze = newStreak % 7 === 0 && freezesAvailable < 2;
    const updatedFreezes = earnedFreeze ? freezesAvailable + 1 : freezesAvailable;

    return {
      newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      freezesRemaining: updatedFreezes,
      freezeConsumed: false,
      streakPreserved: true,
      earnedNewFreeze: earnedFreeze,
      message: `Outstanding! Your streak is now ${newStreak} days.`,
    };
  }

  if (dayDifference === 2 && freezesAvailable > 0) {
    // Missed 1 day, but saved by Ink Saver!
    const newStreak = currentStreak + 1;
    return {
      newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
      freezesRemaining: freezesAvailable - 1,
      freezeConsumed: true,
      streakPreserved: true,
      earnedNewFreeze: false,
      message: 'Your Ink Saver activated yesterday! Streak preserved.',
    };
  }

  // Missed more than 1 day or no freezes left -> Reset streak
  return {
    newStreak: 1,
    longestStreak,
    freezesRemaining: freezesAvailable,
    freezeConsumed: false,
    streakPreserved: false,
    earnedNewFreeze: false,
    message: 'Streak reset. The scribal tradition begins anew today!',
  };
}

/**
 * Standard XP allocations for platform actions.
 */
export const XP_REWARDS: Record<GamificationAction, number> = {
  quest_completion: 15,
  reflection_bonus: 5,
  variant_contribution: 25,
  daily_streak: 5,
};
