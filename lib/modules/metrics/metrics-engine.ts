/**
 * MetricsEngine - Orthographic Agreement, Legibility & Privacy Suppression
 * 
 * Deep module for computing empirical fieldwork metrics across script variants:
 * 1. Unicode-aware Normalized Levenshtein similarity
 * 2. Cohort agreement & consensus classification
 * 3. k-Anonymity privacy suppression (N < 5 guard)
 * 4. Empirical Script Legibility Index (0-100)
 */

export interface ScriptComparisonMetric {
  variantId: string;
  variantLabel: string;
  scriptName: string;
  sampleCount: number;
  agreementRate: number; // 0.0 to 1.0
  medianLatencyMs: number;
  consensusClassification: 'strong_consensus' | 'divided_consensus' | 'high_variance';
}

export interface DemographicCohortSlice {
  cohortKey: string; // e.g. "age_18_25", "vidarbha_dialect"
  cohortLabel: string;
  respondentCount: number;
  isSuppressed: boolean;
  suppressionReason?: string;
  dominantVariantId?: string;
  dominantAgreementRate?: number;
}

export interface LegibilityIndexResult {
  score: number; // 0 - 100
  accuracyWeight: number;
  speedWeight: number;
  meanLatencyMs: number;
  accuracyRate: number;
  confidenceInterval: [number, number];
}

/**
 * Splits Unicode string accurately into grapheme clusters.
 * Essential for Indic scripts where consonants combine with matras (diacritics).
 */
export function toGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), s => s.segment);
  }
  return Array.from(text);
}

/**
 * Calculates normalized Levenshtein similarity between two grapheme sequences.
 * Output range: 0.0 (totally dissimilar) to 1.0 (exact character match).
 */
export function calculateNormalizedLevenshtein(a: string, b: string): number {
  const gA = toGraphemes(a.trim());
  const gB = toGraphemes(b.trim());

  const lenA = gA.length;
  const lenB = gB.length;

  if (lenA === 0 && lenB === 0) return 1.0;
  if (lenA === 0 || lenB === 0) return 0.0;

  // Initialize Levenshtein matrix
  const matrix: number[][] = Array.from({ length: lenA + 1 }, () =>
    new Array<number>(lenB + 1).fill(0)
  );

  for (let i = 0; i <= lenA; i++) matrix[i][0] = i;
  for (let j = 0; j <= lenB; j++) matrix[0][j] = j;

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = gA[i - 1] === gB[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // deletion
        matrix[i][j - 1] + 1,      // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const rawDistance = matrix[lenA][lenB];
  const maxLen = Math.max(lenA, lenB);
  const similarity = 1.0 - rawDistance / maxLen;
  return Math.max(0.0, Math.min(1.0, similarity));
}

/**
 * Evaluates agreement across multiple candidate script variants.
 */
export function evaluateScriptAgreement(
  records: Array<{ variantId: string; variantLabel: string; scriptName: string; isMatch: boolean; latencyMs: number }>
): ScriptComparisonMetric[] {
  if (records.length === 0) return [];

  // Group by variantId
  const groups = new Map<string, typeof records>();
  for (const r of records) {
    const existing = groups.get(r.variantId) || [];
    existing.push(r);
    groups.set(r.variantId, existing);
  }

  const results: ScriptComparisonMetric[] = [];

  for (const [variantId, list] of groups.entries()) {
    const total = list.length;
    const matches = list.filter(item => item.isMatch).length;
    const agreementRate = total > 0 ? matches / total : 0;

    const latencies = list.map(l => l.latencyMs).sort((a, b) => a - b);
    const medianLatencyMs = latencies.length > 0
      ? latencies[Math.floor(latencies.length / 2)]
      : 0;

    let consensusClassification: ScriptComparisonMetric['consensusClassification'] = 'high_variance';
    if (agreementRate >= 0.75) {
      consensusClassification = 'strong_consensus';
    } else if (agreementRate >= 0.40) {
      consensusClassification = 'divided_consensus';
    }

    results.push({
      variantId,
      variantLabel: list[0].variantLabel,
      scriptName: list[0].scriptName,
      sampleCount: total,
      agreementRate: Math.round(agreementRate * 100) / 100,
      medianLatencyMs,
      consensusClassification,
    });
  }

  return results.sort((a, b) => b.agreementRate - a.agreementRate);
}

/**
 * Invariant: Privacy Protection (N < 5 Cohort Suppression).
 * Suppresses demographic cohort slices with fewer than 5 respondents
 * to prevent de-anonymization and linguistic profiling of minority dialect speakers.
 */
export const MIN_ANONYMITY_THRESHOLD = 5;

export function enforcePrivacySuppression(
  cohorts: Array<{
    cohortKey: string;
    cohortLabel: string;
    respondentCount: number;
    dominantVariantId?: string;
    dominantAgreementRate?: number;
  }>
): DemographicCohortSlice[] {
  return cohorts.map(cohort => {
    if (cohort.respondentCount < MIN_ANONYMITY_THRESHOLD) {
      return {
        cohortKey: cohort.cohortKey,
        cohortLabel: cohort.cohortLabel,
        respondentCount: cohort.respondentCount,
        isSuppressed: true,
        suppressionReason: `Preserved privacy: fewer than ${MIN_ANONYMITY_THRESHOLD} community responses.`,
        dominantVariantId: undefined,
        dominantAgreementRate: undefined,
      };
    }

    return {
      cohortKey: cohort.cohortKey,
      cohortLabel: cohort.cohortLabel,
      respondentCount: cohort.respondentCount,
      isSuppressed: false,
      dominantVariantId: cohort.dominantVariantId,
      dominantAgreementRate: cohort.dominantAgreementRate,
    };
  });
}

/**
 * Computes the empirical Script Legibility Index (SLI) on a 0-100 scale.
 * Combines character recognition accuracy (70% weight) and response fluency / reading speed (30% weight).
 */
export function computeScriptLegibilityIndex(
  samples: Array<{ accuracyScore: number; latencyMs: number }>
): LegibilityIndexResult {
  if (samples.length === 0) {
    return {
      score: 0,
      accuracyWeight: 0.7,
      speedWeight: 0.3,
      meanLatencyMs: 0,
      accuracyRate: 0,
      confidenceInterval: [0, 0],
    };
  }

  const n = samples.length;
  const meanAccuracy = samples.reduce((acc, s) => acc + s.accuracyScore, 0) / n;
  const meanLatency = samples.reduce((acc, s) => acc + s.latencyMs, 0) / n;

  // Speed scoring: Optimal baseline is 1200ms; latency > 5000ms scales down to 0
  const baselineLatency = 1200;
  const maxPenaltyLatency = 5000;
  let speedScore = 1.0;
  if (meanLatency > baselineLatency) {
    const penalty = (meanLatency - baselineLatency) / (maxPenaltyLatency - baselineLatency);
    speedScore = Math.max(0.1, 1.0 - Math.min(1.0, penalty));
  }

  const accuracyWeight = 0.7;
  const speedWeight = 0.3;
  const compositeScore = (meanAccuracy * accuracyWeight + speedScore * speedWeight) * 100;
  const finalScore = Math.round(compositeScore * 10) / 10;

  // 95% Confidence Interval for accuracy
  const variance = samples.reduce((acc, s) => acc + Math.pow(s.accuracyScore - meanAccuracy, 2), 0) / (n > 1 ? n - 1 : 1);
  const stdError = Math.sqrt(variance / n);
  const zScore = 1.96;
  const lowerCI = Math.max(0, Math.round((meanAccuracy - zScore * stdError) * 1000) / 10);
  const upperCI = Math.min(100, Math.round((meanAccuracy + zScore * stdError) * 1000) / 10);

  return {
    score: finalScore,
    accuracyWeight,
    speedWeight,
    meanLatencyMs: Math.round(meanLatency),
    accuracyRate: Math.round(meanAccuracy * 1000) / 1000,
    confidenceInterval: [lowerCI, upperCI],
  };
}
