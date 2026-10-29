import { describe, it, expect } from 'vitest';
import {
  calculateNormalizedLevenshtein,
  enforcePrivacySuppression,
  computeScriptLegibilityIndex,
} from '../metrics/metrics-engine';
import {
  evaluateStreak,
  getScribeRank,
  getRankProgress,
} from '../gamification/gamification-ledger';
import {
  validateStateTransition,
  validateConsultationVote,
} from '../governance/governance-workflow';
import {
  evaluateItemResponse,
  summarizeQuestSession,
} from '../quest/quest-engine';

describe('MetricsEngine', () => {
  it('computes 1.0 for identical strings and handles Indic Unicode graphemes', () => {
    expect(calculateNormalizedLevenshtein('नमस्कार', 'नमस्कार')).toBe(1.0);
    expect(calculateNormalizedLevenshtein('𑘦𑘻𑘚𑘲', '𑘦𑘻𑘚𑘲')).toBe(1.0); // Modi script
  });

  it('computes fractional similarity for minor orthographic deviations', () => {
    const similarity = calculateNormalizedLevenshtein('मराठी', 'मराठि');
    expect(similarity).toBeGreaterThan(0.6);
    expect(similarity).toBeLessThan(1.0);
  });

  it('enforces privacy suppression when cohort N < 5', () => {
    const cohorts = [
      { cohortKey: 'c1', cohortLabel: 'Konkan Rural', respondentCount: 3, dominantVariantId: 'modi_1', dominantAgreementRate: 0.8 },
      { cohortKey: 'c2', cohortLabel: 'Pune Urban', respondentCount: 14, dominantVariantId: 'dev_1', dominantAgreementRate: 0.92 },
    ];
    const result = enforcePrivacySuppression(cohorts);

    expect(result[0].isSuppressed).toBe(true);
    expect(result[0].dominantVariantId).toBeUndefined();
    expect(result[0].suppressionReason).toContain('fewer than 5');

    expect(result[1].isSuppressed).toBe(false);
    expect(result[1].dominantVariantId).toBe('dev_1');
  });

  it('computes script legibility index combining speed and accuracy', () => {
    const samples = [
      { accuracyScore: 1.0, latencyMs: 1100 },
      { accuracyScore: 0.9, latencyMs: 1400 },
      { accuracyScore: 0.95, latencyMs: 1250 },
    ];
    const index = computeScriptLegibilityIndex(samples);
    expect(index.score).toBeGreaterThan(80);
    expect(index.accuracyRate).toBeGreaterThan(0.9);
  });
});

describe('GamificationLedger', () => {
  it('correctly maps XP to Scribe Ranks', () => {
    expect(getScribeRank(0).name).toBe('Akshara Jigyasu');
    expect(getScribeRank(200).name).toBe('Patra Lekhak');
    expect(getScribeRank(800).name).toBe('Lipi Shodharthi');
    expect(getScribeRank(2000).name).toBe('Mahamahopadhyaya');
    expect(getScribeRank(5000).name).toBe('Sabha Pramukh');
  });

  it('calculates rank progress percentage', () => {
    const progress = getRankProgress(75); // Halfway through tier 1 (0 to 150)
    expect(progress.currentRank.name).toBe('Akshara Jigyasu');
    expect(progress.progressPercent).toBe(50);
    expect(progress.xpNeededForNext).toBe(75);
  });

  it('handles consecutive day streak increments', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = evaluateStreak(yesterday, 3, 5, 1);
    expect(result.newStreak).toBe(4);
    expect(result.freezeConsumed).toBe(false);
  });

  it('consumes Ink Saver when 1 day was missed and preserves streak', () => {
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const result = evaluateStreak(twoDaysAgo, 5, 10, 1);
    expect(result.newStreak).toBe(6);
    expect(result.freezeConsumed).toBe(true);
    expect(result.freezesRemaining).toBe(0);
    expect(result.streakPreserved).toBe(true);
  });

  it('resets streak to 1 when missed more than 1 day with no freezes left', () => {
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const result = evaluateStreak(threeDaysAgo, 12, 12, 0);
    expect(result.newStreak).toBe(1);
    expect(result.streakPreserved).toBe(false);
  });
});

describe('GovernanceWorkflow', () => {
  it('blocks unauthorized state transition from draft to approved directly', () => {
    const result = validateStateTransition('draft', 'approved', {
      actorId: 'user_1',
      actorRole: 'scribe',
      isProposer: true,
      reason: 'Bypass review',
    });
    expect(result.allowed).toBe(false);
    expect(result.rejectionReason).toContain('Illegal state transition');
  });

  it('allows proposer to submit draft for review', () => {
    const result = validateStateTransition('draft', 'submitted', {
      actorId: 'proposer_1',
      actorRole: 'scribe',
      isProposer: true,
      reason: 'Initial submission of Modi orthography field study',
    });
    expect(result.allowed).toBe(true);
    expect(result.auditPayload?.action).toBe('PROJECT_STATUS_TRANSITION_DRAFT_TO_SUBMITTED');
  });

  it('enforces 1 person 1 vote in sovereign consultation voting', () => {
    const voters = new Set(['user_1', 'user_2']);
    const pollStatus = {
      opensAt: new Date(Date.now() - 10000),
      closesAt: new Date(Date.now() + 100000),
      isActive: true,
    };

    const duplicateVote = validateConsultationVote('user_1', 'poll_1', voters, pollStatus);
    expect(duplicateVote.eligible).toBe(false);
    expect(duplicateVote.error).toContain('already recorded your vote');

    const freshVote = validateConsultationVote('user_3', 'poll_1', voters, pollStatus);
    expect(freshVote.eligible).toBe(true);
  });
});

describe('QuestEngine', () => {
  it('evaluates script_match and awards accuracy score', () => {
    const match = evaluateItemResponse({
      taskType: 'script_match',
      submittedAnswer: '𑘦𑘻𑘚𑘲',
      expectedCanonical: '𑘦𑘻𑘚𑘲',
      latencyMs: 1200,
    });
    expect(match.isCorrect).toBe(true);
    expect(match.accuracyScore).toBe(1.0);
    expect(match.xpEarned).toBe(5);
  });

  it('summarizes a multi-item quest session and returns rank', () => {
    const items = [
      { isCorrect: true, accuracyScore: 1.0, levenshteinSimilarity: 1.0, latencyMs: 1200, xpEarned: 5, feedback: 'OK' },
      { isCorrect: true, accuracyScore: 1.0, levenshteinSimilarity: 1.0, latencyMs: 1500, xpEarned: 6, feedback: 'OK' },
    ];
    const summary = summarizeQuestSession(items, {
      totalXp: 140,
      currentStreak: 2,
      longestStreak: 2,
      streakFreezesAvailable: 1,
      lastQuestCompletedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    });

    expect(summary.completedItems).toBe(2);
    expect(summary.accuracyPercentage).toBe(100);
    expect(summary.newStreak).toBe(3);
    // 140 XP + 11 item XP + 15 completion XP = 166 XP -> Crosses 150 threshold to Patra Lekhak!
    expect(summary.currentRank.name).toBe('Patra Lekhak');
  });
});
