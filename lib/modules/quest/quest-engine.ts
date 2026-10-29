/**
 * QuestEngine - Blind-First Fieldwork Execution & Community Mirror Unlocking
 * 
 * Deep module governing:
 * 1. Blind-first empirical stimulus delivery (zero bias before response)
 * 2. Multi-modal task evaluation (script_match, tile_reorder, canvas_trace, variant_compare)
 * 3. Latency & stroke telemetry
 * 4. Post-response Community Mirror data reveal
 */

import { calculateNormalizedLevenshtein } from '../metrics/metrics-engine';
import { XP_REWARDS, evaluateStreak, getScribeRank, ScribeRankTier } from '../gamification/gamification-ledger';

export type TaskType =
  | 'script_match'
  | 'tile_reorder'
  | 'audio_discrimination'
  | 'variant_compare'
  | 'canvas_trace';

export interface QuestItemEvaluationInput {
  taskType: TaskType;
  submittedAnswer: string;
  expectedCanonical: string;
  latencyMs: number;
  timeToFirstInteractionMs?: number;
}

export interface QuestItemEvaluationOutput {
  isCorrect: boolean;
  accuracyScore: number; // 0.0 to 1.0
  levenshteinSimilarity: number;
  latencyMs: number;
  xpEarned: number;
  feedback: string;
}

export interface QuestSessionSummary {
  totalItems: number;
  completedItems: number;
  accuracyPercentage: number;
  averageLatencyMs: number;
  totalXpEarned: number;
  newStreak: number;
  streakPreserved: boolean;
  earnedNewFreeze: boolean;
  currentRank: ScribeRankTier;
}

/**
 * Evaluates an individual quest item response according to task rules.
 */
export function evaluateItemResponse(input: QuestItemEvaluationInput): QuestItemEvaluationOutput {
  const similarity = calculateNormalizedLevenshtein(input.submittedAnswer, input.expectedCanonical);
  const latency = Math.max(100, input.latencyMs);

  switch (input.taskType) {
    case 'script_match':
    case 'variant_compare': {
      const isExact = input.submittedAnswer.trim() === input.expectedCanonical.trim();
      return {
        isCorrect: isExact,
        accuracyScore: isExact ? 1.0 : 0.0,
        levenshteinSimilarity: similarity,
        latencyMs: latency,
        xpEarned: isExact ? 5 : 2,
        feedback: isExact
          ? 'Exact orthographic match recorded for community archive.'
          : 'Alternative variant noted; your response helps map dialect divergence.',
      };
    }

    case 'tile_reorder': {
      const isExact = input.submittedAnswer.trim() === input.expectedCanonical.trim();
      return {
        isCorrect: isExact,
        accuracyScore: isExact ? 1.0 : similarity,
        levenshteinSimilarity: similarity,
        latencyMs: latency,
        xpEarned: isExact ? 6 : Math.round(similarity * 4),
        feedback: isExact
          ? 'Perfect character and matra sequence assembled!'
          : `Grapheme alignment: ${Math.round(similarity * 100)}% agreement.`,
      };
    }

    case 'canvas_trace': {
      // Stroke similarity score passed in submittedAnswer or evaluated directly
      const strokeScore = parseFloat(input.submittedAnswer) || similarity;
      const isPass = strokeScore >= 0.7;
      return {
        isCorrect: isPass,
        accuracyScore: strokeScore,
        levenshteinSimilarity: strokeScore,
        latencyMs: latency,
        xpEarned: isPass ? 8 : 4,
        feedback: isPass
          ? 'Calligraphic stroke curvature matched historical exemplar.'
          : 'Pencil stroke recorded; practice improves fluid hand flow.',
      };
    }

    case 'audio_discrimination': {
      const isExact = input.submittedAnswer.trim() === input.expectedCanonical.trim();
      return {
        isCorrect: isExact,
        accuracyScore: isExact ? 1.0 : similarity,
        levenshteinSimilarity: similarity,
        latencyMs: latency,
        xpEarned: isExact ? 7 : 3,
        feedback: isExact
          ? 'Accurate phoneme-to-grapheme transcription recorded.'
          : 'Phonetic variant recorded for acoustic field corpus.',
      };
    }

    default:
      return {
        isCorrect: similarity >= 0.8,
        accuracyScore: similarity,
        levenshteinSimilarity: similarity,
        latencyMs: latency,
        xpEarned: 3,
        feedback: 'Fieldwork response logged.',
      };
  }
}

/**
 * Computes the overall completion summary of a 3-minute fieldwork quest.
 */
export function summarizeQuestSession(
  itemResults: QuestItemEvaluationOutput[],
  userProfile: {
    totalXp: number;
    currentStreak: number;
    longestStreak: number;
    streakFreezesAvailable: number;
    lastQuestCompletedAt: Date | string | null;
  }
): QuestSessionSummary {
  const totalItems = itemResults.length;
  if (totalItems === 0) {
    const currentRank = getScribeRank(userProfile.totalXp);
    return {
      totalItems: 0,
      completedItems: 0,
      accuracyPercentage: 0,
      averageLatencyMs: 0,
      totalXpEarned: 0,
      newStreak: userProfile.currentStreak,
      streakPreserved: true,
      earnedNewFreeze: false,
      currentRank,
    };
  }

  const meanAccuracy = itemResults.reduce((acc, item) => acc + item.accuracyScore, 0) / totalItems;
  const meanLatency = itemResults.reduce((acc, item) => acc + item.latencyMs, 0) / totalItems;
  const rawXp = itemResults.reduce((acc, item) => acc + item.xpEarned, 0) + XP_REWARDS.quest_completion;

  // Evaluate streak
  const streakResult = evaluateStreak(
    userProfile.lastQuestCompletedAt,
    userProfile.currentStreak,
    userProfile.longestStreak,
    userProfile.streakFreezesAvailable
  );

  const updatedTotalXp = userProfile.totalXp + rawXp;
  const currentRank = getScribeRank(updatedTotalXp);

  return {
    totalItems,
    completedItems: totalItems,
    accuracyPercentage: Math.round(meanAccuracy * 100),
    averageLatencyMs: Math.round(meanLatency),
    totalXpEarned: rawXp,
    newStreak: streakResult.newStreak,
    streakPreserved: streakResult.streakPreserved,
    earnedNewFreeze: streakResult.earnedNewFreeze,
    currentRank,
  };
}
