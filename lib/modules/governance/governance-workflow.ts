/**
 * GovernanceWorkflow - Proposal Lifecycle FSM & Sovereign Audit
 * 
 * Enforces community sovereignty invariants:
 * 1. Finite State Machine for language orthography proposals
 * 2. Immutable audit trails for all state transitions
 * 3. Role-based authority validation (proposer, reviewer, elder/admin)
 * 4. Sovereign consultation voting rules (1 person = 1 vote)
 */

export type ProjectLifecycleStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'changes_requested'
  | 'approved'
  | 'active'
  | 'paused'
  | 'closed'
  | 'rejected';

export type UserPlatformRole = 'governance_admin' | 'moderator' | 'linguist_reviewer' | 'scribe';

export interface TransitionContext {
  actorId: string;
  actorRole: UserPlatformRole;
  isProposer: boolean;
  reason: string;
}

export interface TransitionValidationResult {
  allowed: boolean;
  priorStatus: ProjectLifecycleStatus;
  targetStatus: ProjectLifecycleStatus;
  rejectionReason?: string;
  auditPayload?: {
    action: string;
    priorState: { status: ProjectLifecycleStatus };
    newState: { status: ProjectLifecycleStatus };
    reason: string;
    timestamp: string;
  };
}

/**
 * Valid state transitions mapping:
 * Key: current status -> Array of valid target statuses
 */
const VALID_TRANSITIONS: Record<ProjectLifecycleStatus, readonly ProjectLifecycleStatus[]> = {
  draft: ['submitted'],
  submitted: ['under_review', 'draft'],
  under_review: ['changes_requested', 'approved', 'rejected'],
  changes_requested: ['submitted', 'draft'],
  approved: ['active', 'paused'],
  active: ['paused', 'closed'],
  paused: ['active', 'closed'],
  closed: ['active'], // Reopening requires administrative consensus
  rejected: ['draft'], // Allow proposer to revise and re-attempt
};

/**
 * Validates whether an actor has authority to transition a project's lifecycle.
 */
export function validateStateTransition(
  currentStatus: ProjectLifecycleStatus,
  targetStatus: ProjectLifecycleStatus,
  context: TransitionContext
): TransitionValidationResult {
  // 1. Check if the transition path is mathematically valid
  const validTargets = VALID_TRANSITIONS[currentStatus];
  if (!validTargets || !validTargets.includes(targetStatus)) {
    return {
      allowed: false,
      priorStatus: currentStatus,
      targetStatus,
      rejectionReason: `Illegal state transition from '${currentStatus}' to '${targetStatus}'.`,
    };
  }

  // 2. Validate role authorization
  if (targetStatus === 'submitted') {
    if (!context.isProposer && context.actorRole !== 'governance_admin') {
      return {
        allowed: false,
        priorStatus: currentStatus,
        targetStatus,
        rejectionReason: 'Only the project proposer or a governance administrator can submit a proposal.',
      };
    }
  }

  if (targetStatus === 'under_review') {
    if (!['linguist_reviewer', 'governance_admin', 'moderator'].includes(context.actorRole)) {
      return {
        allowed: false,
        priorStatus: currentStatus,
        targetStatus,
        rejectionReason: 'Only qualified linguistic reviewers or administrators may move a proposal to review.',
      };
    }
  }

  if (['approved', 'rejected', 'changes_requested'].includes(targetStatus)) {
    if (!['linguist_reviewer', 'governance_admin'].includes(context.actorRole)) {
      return {
        allowed: false,
        priorStatus: currentStatus,
        targetStatus,
        rejectionReason: 'Review decisions require linguistic reviewer or governance administrator credentials.',
      };
    }
    if (!context.reason || context.reason.trim().length < 10) {
      return {
        allowed: false,
        priorStatus: currentStatus,
        targetStatus,
        rejectionReason: 'A substantive justification (minimum 10 characters) is required for audit integrity.',
      };
    }
  }

  if (['active', 'paused', 'closed'].includes(targetStatus)) {
    if (context.actorRole !== 'governance_admin') {
      return {
        allowed: false,
        priorStatus: currentStatus,
        targetStatus,
        rejectionReason: 'Publishing, pausing, or closing a project requires governance administrator authorization.',
      };
    }
  }

  return {
    allowed: true,
    priorStatus: currentStatus,
    targetStatus,
    auditPayload: {
      action: `PROJECT_STATUS_TRANSITION_${currentStatus.toUpperCase()}_TO_${targetStatus.toUpperCase()}`,
      priorState: { status: currentStatus },
      newState: { status: targetStatus },
      reason: context.reason.trim(),
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Validates consultation voting eligibility.
 * Guarantees that each community member has equal voice (1 vote per user).
 */
export function validateConsultationVote(
  userId: string,
  pollId: string,
  existingVoterIds: Set<string>,
  pollStatus: { opensAt: Date; closesAt: Date; isActive: boolean }
): { eligible: boolean; error?: string } {
  const now = new Date();

  if (!pollStatus.isActive) {
    return { eligible: false, error: 'This consultation poll is currently inactive or closed.' };
  }

  if (now < pollStatus.opensAt) {
    return { eligible: false, error: 'This consultation poll has not opened yet.' };
  }

  if (now > pollStatus.closesAt) {
    return { eligible: false, error: 'This consultation poll has closed.' };
  }

  if (existingVoterIds.has(userId)) {
    return { eligible: false, error: 'You have already recorded your vote in this consultation.' };
  }

  return { eligible: true };
}
