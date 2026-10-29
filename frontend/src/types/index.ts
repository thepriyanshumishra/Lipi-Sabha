/* ========================================
   Lipi Sabha — Core TypeScript Types
   ======================================== */

// ---- User & Auth ----
export interface User {
  id: number;
  email: string;
  display_name: string;
  role: UserRole;
  avatar_url?: string;
  learning_xp: number;
  review_xp: number;
  created_at: string;
}

export type UserRole = 'visitor' | 'learner' | 'contributor' | 'reviewer' | 'specialist' | 'facilitator' | 'admin';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ---- Projects & Writing Systems ----
export interface Project {
  id: number;
  name: string;
  description: string;
  language_label: string;
  community_context?: string;
  status: 'demo' | 'proposed' | 'active' | 'archived';
  visibility: 'public' | 'restricted' | 'private';
  governance_model?: string;
  writing_systems: WritingSystem[];
  created_at: string;
  updated_at: string;
}

export interface WritingSystem {
  id: number;
  name: string;
  description: string;
  script_code?: string;
  metadata?: Record<string, unknown>;
}

export interface OrthographyVersion {
  id: number;
  project_id: number;
  writing_system_id: number;
  version_label: string;
  status: 'draft' | 'proposed' | 'active' | 'deprecated';
  documentation?: string;
  effective_date?: string;
}

export interface OrthographicRule {
  id: number;
  orthography_version_id: number;
  title: string;
  explanation: string;
  examples: RuleExample[];
  sources: string[];
  status: 'draft' | 'reviewed' | 'approved';
  known_limitations?: string;
}

export interface RuleExample {
  input: string;
  output: string;
  context?: string;
  explanation?: string;
}

// ---- Learning ----
export interface LearningQuest {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp_reward: number;
  lessons: LearningLesson[];
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress_percent: number;
  icon?: string;
}

export interface LearningLesson {
  id: number;
  quest_id: number;
  title: string;
  order: number;
  content: LessonContent;
  completed: boolean;
}

export type LessonContent = 
  | { type: 'text'; title: string; body: string }
  | { type: 'multiple_choice'; question: string; options: string[]; correct_index: number; explanation: string }
  | { type: 'match_rule'; prompt: string; rules: { rule: string; example: string }[]; correct_rule_index: number; explanation: string }
  | { type: 'compare'; title: string; convention_a: ConventionExample; convention_b: ConventionExample; question: string; explanation: string }
  | { type: 'spot_pattern'; title: string; examples: string[]; pattern: string; explanation: string };

export interface ConventionExample {
  name: string;
  example: string;
  rule: string;
  context?: string;
}

export interface LearningProgress {
  quest_id: number;
  current_lesson: number;
  total_lessons: number;
  completed: boolean;
  xp_earned: number;
  completed_at?: string;
}

// ---- Contributions ----
export type ContributionType = 
  | 'example_word' | 'example_sentence' | 'rule_suggestion' 
  | 'learning_material' | 'translation' | 'pronunciation'
  | 'accessibility_feedback' | 'documentation_correction' | 'question';

export type ContributionStatus = 
  | 'draft' | 'submitted' | 'under_review' | 'revision_requested'
  | 'specialist_review' | 'accepted' | 'approved_public'
  | 'rejected' | 'withdrawn' | 'archived';

export interface Contribution {
  id: number;
  contributor_id: number;
  project_id: number;
  project_name: string;
  contribution_type: ContributionType;
  content: string;
  language_variety?: string;
  writing_system?: string;
  orthography_version?: string;
  context?: string;
  source?: string;
  source_type?: string;
  notes?: string;
  visibility: 'private' | 'project' | 'public';
  status: ContributionStatus;
  reviewer_feedback?: string;
  created_at: string;
  updated_at: string;
}

// ---- Reviews ----
export type ReviewAction = 'approve' | 'request_revision' | 'escalate' | 'unable_to_assess';

export interface ReviewTask {
  id: number;
  contribution: Contribution;
  assigned_reviewer_id: number;
  status: 'assigned' | 'in_progress' | 'completed' | 'escalated';
  task_scope: string;
  assigned_at: string;
  due_date?: string;
  completed_at?: string;
}

export interface ReviewDecision {
  id: number;
  review_task_id: number;
  action: ReviewAction;
  rationale: string;
  rubric_results?: RubricResult[];
  created_at: string;
}

export interface RubricResult {
  criterion: string;
  assessment: 'meets' | 'partially_meets' | 'does_not_meet' | 'unable_to_assess';
  notes?: string;
}

export interface ReviewerQualification {
  id: number;
  user_id: number;
  project_id: number;
  domain: string;
  status: 'trainee' | 'calibrated' | 'qualified' | 'specialist';
  scope: string;
}

// ---- Community Sabha ----
export type ProposalStatus = 'draft' | 'open' | 'consultation' | 'voting' | 'closed' | 'decided' | 'deferred' | 'withdrawn';

export interface Proposal {
  id: number;
  project_id: number;
  project_name: string;
  title: string;
  scope: string;
  background: string;
  problem: string;
  options: ProposalOption[];
  evidence?: string;
  limitations?: string;
  questions?: string;
  process: string;
  status: ProposalStatus;
  author_display_name: string;
  timeline?: string;
  participation_count?: number;
  created_at: string;
  updated_at: string;
}

export interface ProposalOption {
  id: number;
  title: string;
  description: string;
  advantages?: string;
  disadvantages?: string;
}

export interface DecisionRecord {
  id: number;
  proposal_id: number;
  title: string;
  scope: string;
  process_used: string;
  outcome: 'accepted' | 'rejected' | 'deferred' | 'inconclusive' | 'withdrawn' | 'reopened';
  evidence_considered: string;
  limitations?: string;
  dissenting_views?: string;
  unresolved_issues?: string;
  decided_at: string;
}

// ---- Gamification ----
export type XPCategory = 'learning' | 'review' | 'contribution';

export interface XPEvent {
  id: number;
  category: XPCategory;
  amount: number;
  reason: string;
  created_at: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'contribution' | 'review';
  earned: boolean;
  earned_at?: string;
}

export interface GamificationProfile {
  learning_xp: number;
  review_xp: number;
  contribution_count: number;
  badges: Badge[];
  garden_stage: 'seed' | 'sprout' | 'growing' | 'bloom';
  weekly_activity: number[];
}

// ---- Notifications ----
export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  created_at: string;
}

// ---- Experiments ----
export interface Experiment {
  id: number;
  project_id: number;
  research_question: string;
  methodology: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  participant_count: number;
  created_at: string;
}

// ---- Admin ----
export interface AuditEvent {
  id: number;
  actor_name: string;
  action: string;
  target_type: string;
  target_id: number;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface AdminOverview {
  total_users: number;
  active_learners: number;
  total_contributions: number;
  pending_reviews: number;
  open_proposals: number;
  recent_activity: AuditEvent[];
}
