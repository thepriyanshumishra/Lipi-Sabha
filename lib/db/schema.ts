import { pgTable, text, integer, boolean, timestamp, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const platformRoleEnum = pgEnum('platform_role_type', ['governance_admin', 'moderator', 'linguist_reviewer']);
export const projectStatusEnum = pgEnum('project_status', [
  'draft', 'submitted', 'under_review', 'changes_requested',
  'approved', 'active', 'paused', 'closed', 'rejected'
]);
export const projectScopeEnum = pgEnum('project_scope', ['word', 'phrase', 'both']);
export const reviewStatusEnum = pgEnum('review_status_type', ['reported', 'under_review', 'reviewed', 'disputed', 'retired']);
export const stimulusTypeEnum = pgEnum('stimulus_type', ['word', 'phrase']);
export const taskTypeEnum = pgEnum('task_type', [
  'script_match',
  'tile_reorder',
  'audio_discrimination',
  'variant_compare',
  'canvas_trace'
]);
export const xpEventTypeEnum = pgEnum('xp_event_type', [
  'quest_completion', 'reflection_bonus', 'variant_contribution', 'daily_streak'
]);
export const decisionOutcomeEnum = pgEnum('decision_outcome_type', [
  'decision_recorded', 'more_testing_needed', 'no_consensus', 'no_decision_yet'
]);

// 1. Profiles
export const profiles = pgTable('profiles', {
  userId: text('user_id').primaryKey(), // NextAuth or custom user ID
  displayName: text('display_name').notNull(),
  email: text('email'),
  avatarUrl: text('avatar_url'),
  preferredUiLocale: text('preferred_ui_locale').default('en'),
  broadVarietyLabel: text('broad_variety_label'), // Macro regional tag
  totalXp: integer('total_xp').notNull().default(0),
  currentStreak: integer('current_streak').notNull().default(0),
  longestStreak: integer('longest_streak').notNull().default(0),
  lastQuestCompletedAt: timestamp('last_quest_completed_at', { withTimezone: true }),
  streakFreezesAvailable: integer('streak_freezes_available').notNull().default(1),
  scribeRank: text('scribe_rank').notNull().default('Akshara Jigyasu'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 2. Platform Roles
export const platformRoles = pgTable('platform_roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.userId, { onDelete: 'cascade' }),
  role: platformRoleEnum('role').notNull(),
  grantedBy: text('granted_by').notNull().references(() => profiles.userId),
  grantedAt: timestamp('granted_at', { withTimezone: true }).defaultNow().notNull(),
  reason: text('reason').notNull(),
});

// 3. Language Projects
export const languageProjects = pgTable('language_projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  alternateNames: text('alternate_names').array().default([]),
  broadRegionLabel: text('broad_region_label'),
  problemStatement: text('problem_statement').notNull(),
  goal: text('goal').notNull(),
  scope: projectScopeEnum('scope').notNull().default('word'),
  proposerId: text('proposer_id').notNull().references(() => profiles.userId),
  status: projectStatusEnum('status').notNull().default('draft'),
  reviewedBy: text('reviewed_by').references(() => profiles.userId),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  reviewReason: text('review_reason'),
  communityProcessSummary: text('community_process_summary'),
  isSyntheticDemo: boolean('is_synthetic_demo').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 4. Orthography Profiles
export const orthographyProfiles = pgTable('orthography_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => languageProjects.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  scriptName: text('script_name').notNull(),
  conventionSummary: text('convention_summary').notNull(),
  rulesDocument: text('rules_document').notNull(),
  examples: jsonb('examples').default([]).notNull(),
  provenance: text('provenance').notNull(),
  reviewStatus: reviewStatusEnum('review_status').notNull().default('under_review'),
  reviewerId: text('reviewer_id').references(() => profiles.userId),
  reviewNotes: text('review_notes'),
  version: integer('version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 5. Stimuli & Variants
export const stimuli = pgTable('stimuli', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => languageProjects.id, { onDelete: 'cascade' }),
  stimulusType: stimulusTypeEnum('stimulus_type').notNull().default('word'),
  referenceForm: text('reference_form').notNull(),
  pronunciationNote: text('pronunciation_note'),
  audioAssetPath: text('audio_asset_path'),
  sourceDescription: text('source_description').notNull(),
  consentBasis: text('consent_basis').notNull(),
  attributionPreference: text('attribution_preference'),
  reviewStatus: reviewStatusEnum('review_status').notNull().default('under_review'),
  reviewerId: text('reviewer_id').references(() => profiles.userId),
  reviewNotes: text('review_notes'),
  createdBy: text('created_by').notNull().references(() => profiles.userId),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const stimulusVariants = pgTable('stimulus_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  stimulusId: uuid('stimulus_id').notNull().references(() => stimuli.id, { onDelete: 'cascade' }),
  orthographyProfileId: uuid('orthography_profile_id').notNull().references(() => orthographyProfiles.id, { onDelete: 'cascade' }),
  writtenForm: text('written_form').notNull(),
  pronunciationNote: text('pronunciation_note'),
  variantStatus: reviewStatusEnum('variant_status').notNull().default('reported'),
  sourceDescription: text('source_description').notNull(),
  contributedBy: text('contributed_by').references(() => profiles.userId),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// 6. Quests, Items, Attempts, Responses
export const quests = pgTable('quests', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => languageProjects.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  estimatedTimeMinutes: integer('estimated_time_minutes').notNull().default(3),
  xpReward: integer('xp_reward').notNull().default(10),
  isActive: boolean('is_active').notNull().default(true),
  publishedVersion: integer('published_version').notNull().default(1),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const questItems = pgTable('quest_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  questId: uuid('quest_id').notNull().references(() => quests.id, { onDelete: 'cascade' }),
  stimulusId: uuid('stimulus_id').notNull().references(() => stimuli.id, { onDelete: 'restrict' }),
  taskType: taskTypeEnum('task_type').notNull(),
  position: integer('position').notNull(),
  taskInstructions: text('task_instructions').notNull(),
  scoringCriteria: jsonb('scoring_criteria').default({}).notNull(),
  feedbackNotes: text('feedback_notes'),
});

export const questAttempts = pgTable('quest_attempts', {
  id: uuid('id').defaultRandom().primaryKey(),
  questId: uuid('quest_id').notNull().references(() => quests.id, { onDelete: 'restrict' }),
  userId: text('user_id').notNull().references(() => profiles.userId, { onDelete: 'cascade' }),
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  timeSpentSeconds: integer('time_spent_seconds'),
  consentVersion: text('consent_version').notNull().default('v1.0'),
});

export const responses = pgTable('responses', {
  id: uuid('id').defaultRandom().primaryKey(),
  attemptId: uuid('attempt_id').notNull().references(() => questAttempts.id, { onDelete: 'cascade' }),
  questItemId: uuid('quest_item_id').notNull().references(() => questItems.id, { onDelete: 'restrict' }),
  selectedVariantId: uuid('selected_variant_id').references(() => stimulusVariants.id),
  freeTextResponse: text('free_text_response'),
  isEvaluated: boolean('is_evaluated').notNull().default(false),
  evaluationResult: jsonb('evaluation_result').default({}),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
});

// 7. XP Ledger (Idempotent Gamification)
export const xpLedger = pgTable('xp_ledger', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => profiles.userId, { onDelete: 'cascade' }),
  eventType: xpEventTypeEnum('event_type').notNull(),
  referenceId: text('reference_id').notNull(),
  xpAmount: integer('xp_amount').notNull(),
  awardedAt: timestamp('awarded_at', { withTimezone: true }).defaultNow().notNull(),
});

// 8. Consultation Polls & Decisions
export const consultationPolls = pgTable('consultation_polls', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => languageProjects.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  methodDescription: text('method_description').notNull(),
  eligibleGroupDescription: text('eligible_group_description').notNull(),
  opensAt: timestamp('opens_at', { withTimezone: true }).notNull(),
  closesAt: timestamp('closes_at', { withTimezone: true }).notNull(),
  isAdvisory: boolean('is_advisory').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const pollOptions = pgTable('poll_options', {
  id: uuid('id').defaultRandom().primaryKey(),
  pollId: uuid('poll_id').notNull().references(() => consultationPolls.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  description: text('description'),
});

export const pollVotes = pgTable('poll_votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  pollId: uuid('poll_id').notNull().references(() => consultationPolls.id, { onDelete: 'cascade' }),
  optionId: uuid('option_id').notNull().references(() => pollOptions.id, { onDelete: 'restrict' }),
  userId: text('user_id').notNull().references(() => profiles.userId, { onDelete: 'cascade' }),
  votedAt: timestamp('voted_at', { withTimezone: true }).defaultNow().notNull(),
});

export const decisionRecords = pgTable('decision_records', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => languageProjects.id, { onDelete: 'cascade' }),
  outcome: decisionOutcomeEnum('outcome').notNull(),
  decisionMethod: text('decision_method').notNull(),
  participatingBodies: text('participating_bodies').notNull(),
  evidenceSummary: text('evidence_summary').notNull(),
  dissentAndLimitations: text('dissent_and_limitations').notNull(),
  nextReviewDate: timestamp('next_review_date', { withTimezone: true }),
  recordedBy: text('recorded_by').notNull().references(() => profiles.userId),
  recordedAt: timestamp('recorded_at', { withTimezone: true }).defaultNow().notNull(),
});

// 9. Audit Events
export const auditEvents = pgTable('audit_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorId: text('actor_id').notNull().references(() => profiles.userId),
  action: text('action').notNull(),
  targetType: text('target_type').notNull(),
  targetId: uuid('target_id').notNull(),
  priorState: jsonb('prior_state'),
  newState: jsonb('new_state'),
  reason: text('reason').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
