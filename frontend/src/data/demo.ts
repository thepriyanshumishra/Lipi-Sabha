/* ========================================
   Lipi Sabha — Demo Data
   
   IMPORTANT: All data in this file is synthetic
   demonstration content. None of it represents
   real community decisions, endorsements, or
   authentic linguistic examples.
   ======================================== */

import type {
  Project, WritingSystem, OrthographyVersion, OrthographicRule,
  LearningQuest, LearningLesson, Contribution, ReviewTask,
  Proposal, DecisionRecord, Badge, Notification, AuditEvent,
  GamificationProfile
} from '@/types';

// ---- Projects ----
export const demoProjects: Project[] = [
  {
    id: 1,
    name: 'Tundra Script Project',
    description: 'A synthetic demonstration project exploring different ways to write a fictional language variety called "Tundrani". This project exists to demonstrate platform features and does not represent any real language community.',
    language_label: 'Tundrani (Fictional Demo Language)',
    community_context: 'This is a fictional demonstration. No real community is represented.',
    status: 'demo',
    visibility: 'public',
    governance_model: 'Open consultation with community vote',
    writing_systems: [
      { id: 1, name: 'Latin-based', description: 'A Latin alphabet adaptation with diacritics for special sounds', script_code: 'Latn' },
      { id: 2, name: 'Modified Cyrillic', description: 'A Cyrillic-based writing system with additional characters', script_code: 'Cyrl' },
    ],
    created_at: '2026-01-15',
    updated_at: '2026-10-20',
  },
  {
    id: 2,
    name: 'River Valley Orthography',
    description: 'A synthetic project comparing two spelling conventions for a fictional language variety. Used to demonstrate the comparison and review features of the platform.',
    language_label: 'Nadivali (Fictional Demo Language)',
    community_context: 'Fictional demonstration only.',
    status: 'demo',
    visibility: 'public',
    governance_model: 'Consensus-oriented discussion',
    writing_systems: [
      { id: 3, name: 'Traditional Script', description: 'A traditional writing system with historical conventions', script_code: 'Deva' },
      { id: 4, name: 'Simplified Script', description: 'A modernized simplified version proposed for digital use', script_code: 'Deva' },
    ],
    created_at: '2026-03-01',
    updated_at: '2026-10-15',
  },
  {
    id: 3,
    name: 'Highland Consonants Study',
    description: 'A synthetic project examining consonant representation across three proposed spelling systems. Demonstrates the experimentation and research features.',
    language_label: 'Pahadi (Fictional Demo Language)',
    community_context: 'Fictional demonstration project for platform features.',
    status: 'demo',
    visibility: 'public',
    writing_systems: [
      { id: 5, name: 'Phonemic Spelling', description: 'Each phoneme gets one consistent letter', script_code: 'Latn' },
      { id: 6, name: 'Etymological Spelling', description: 'Preserves historical spelling patterns', script_code: 'Latn' },
      { id: 7, name: 'Practical Spelling', description: 'Optimized for keyboard accessibility', script_code: 'Latn' },
    ],
    created_at: '2026-05-10',
    updated_at: '2026-10-01',
  },
];

// ---- Orthography Versions ----
export const demoOrthographies: OrthographyVersion[] = [
  { id: 1, project_id: 1, writing_system_id: 1, version_label: 'Latin v1.0', status: 'active', documentation: 'Initial proposal with basic Latin alphabet and four diacritics.' },
  { id: 2, project_id: 1, writing_system_id: 2, version_label: 'Cyrillic v1.0', status: 'proposed', documentation: 'Proposal using modified Cyrillic characters.' },
  { id: 3, project_id: 2, writing_system_id: 3, version_label: 'Traditional v2.1', status: 'active', documentation: 'Traditional conventions with minor updates.' },
  { id: 4, project_id: 2, writing_system_id: 4, version_label: 'Simplified v1.0', status: 'proposed', documentation: 'Simplified version for digital communication.' },
];

// ---- Orthographic Rules ----
export const demoRules: OrthographicRule[] = [
  {
    id: 1, orthography_version_id: 1, title: 'Vowel Length Marking',
    explanation: 'Long vowels are marked with a macron (ā, ē, ī, ō, ū). Short vowels are unmarked.',
    examples: [
      { input: 'tala', output: 'tāla', context: 'Demonstrating long "a" sound', explanation: 'The first "a" is short, the second is long' },
    ],
    sources: ['Synthetic example for demonstration'], status: 'approved',
    known_limitations: 'This is a fictional rule for demonstration purposes only.',
  },
  {
    id: 2, orthography_version_id: 1, title: 'Consonant Clusters',
    explanation: 'Consonant clusters at the beginning of a word are written as pronounced. No silent letters are used.',
    examples: [
      { input: 'stra', output: 'stra', explanation: 'Cluster preserved as pronounced' },
    ],
    sources: ['Synthetic example for demonstration'], status: 'approved',
  },
  {
    id: 3, orthography_version_id: 3, title: 'Aspirated Consonants',
    explanation: 'Aspirated consonants are written with a following "h" character in the traditional convention.',
    examples: [
      { input: 'k + aspiration', output: 'kh', explanation: 'Aspiration marked with "h"' },
    ],
    sources: ['Synthetic example for demonstration'], status: 'reviewed',
  },
];

// ---- Learning Quests ----
export const demoQuests: LearningQuest[] = [
  {
    id: 1,
    title: 'First Writing System',
    description: 'Understand what a writing system is and why communities might have different ways to write the same language.',
    difficulty: 'beginner',
    xp_reward: 100,
    status: 'available',
    progress_percent: 0,
    icon: '✦',
    lessons: [
      {
        id: 1, quest_id: 1, title: 'What is a Writing System?', order: 1, completed: false,
        content: {
          type: 'text',
          title: 'What is a Writing System?',
          body: `A writing system is a way to visually represent language using symbols, marks, or characters.\n\nDifferent writing systems can represent the same language in very different ways. For example, some writing systems use one symbol per sound (alphabets), while others use one symbol per syllable (syllabaries), and others use symbols for whole words or concepts (logographic systems).\n\nA single language might have:\n• Multiple writing systems developed over time\n• Different spelling conventions within the same script\n• Regional variations in how sounds are written\n• Historical and modern forms\n\nUnderstanding these differences is the first step in exploring how communities make decisions about writing.`
        },
      },
      {
        id: 2, quest_id: 1, title: 'Why Do Differences Exist?', order: 2, completed: false,
        content: {
          type: 'multiple_choice',
          question: 'Which of the following is a valid reason why a language might have multiple writing systems?',
          options: [
            'The language was spoken in regions with different historical writing traditions',
            'One writing system is always objectively better than others',
            'Differences exist only because of spelling mistakes',
            'Languages naturally converge toward a single writing system'
          ],
          correct_index: 0,
          explanation: 'Languages often develop multiple writing systems because they are spoken across regions with different cultural and historical influences. Writing systems are shaped by identity, education, technology, and community preferences — not by a single "correct" answer.',
        },
      },
      {
        id: 3, quest_id: 1, title: 'The Community\'s Role', order: 3, completed: false,
        content: {
          type: 'text',
          title: 'Who Decides?',
          body: `A writing system is connected to identity, history, culture, accessibility, education, and community preferences.\n\nAn outsider should not decide which writing system a community must adopt.\n\nThe community must remain the decision-maker.\n\nLipi Sabha helps communities explore options, understand trade-offs, collect evidence, and make informed decisions — but the final choice always belongs to the community.`
        },
      },
      {
        id: 4, quest_id: 1, title: 'Check Your Understanding', order: 4, completed: false,
        content: {
          type: 'multiple_choice',
          question: 'According to Lipi Sabha\'s core principle, who should decide which writing system a community uses?',
          options: [
            'The community itself',
            'Language experts and linguists',
            'The platform administrators',
            'Whoever has the most data'
          ],
          correct_index: 0,
          explanation: 'Lipi Sabha\'s core principle is: "The community is the decision-maker, not just the dataset." While experts, data, and evidence can inform the discussion, the decision belongs to the community.',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Beyond the Familiar',
    description: 'Explore writing conventions that differ from what you know. Discover how the same sound can be written in different ways.',
    difficulty: 'beginner',
    xp_reward: 120,
    status: 'available',
    progress_percent: 0,
    icon: '◈',
    lessons: [
      {
        id: 5, quest_id: 2, title: 'Same Sound, Different Letters', order: 1, completed: false,
        content: {
          type: 'text',
          title: 'Same Sound, Different Letters',
          body: `Consider how the same sound can be written differently in different languages you might already know:\n\nThe "sh" sound:\n• English: "sh" (ship)\n• French: "ch" (chef)\n• German: "sch" (Schule)\n• Italian: "sc" before e/i (scena)\n\nNone of these is "wrong" — each convention developed within its own writing tradition.\n\nWhen a language doesn't yet have a widely agreed spelling convention, different communities may naturally develop different approaches.`
        },
      },
      {
        id: 6, quest_id: 2, title: 'Spot the Convention', order: 2, completed: false,
        content: {
          type: 'match_rule',
          prompt: 'In this synthetic example, which spelling convention is being used for the "ch" sound (as in "church")?',
          rules: [
            { rule: 'Convention A: Use "c" with a háček → č', example: 'čala' },
            { rule: 'Convention B: Use digraph "ch"', example: 'chala' },
            { rule: 'Convention C: Use a unique letter → ꞓ', example: 'ꞓala' },
          ],
          correct_rule_index: 1,
          explanation: 'The example "chala" uses Convention B — a digraph where two letters ("c" and "h") combine to represent one sound. This is common in many languages (English, Spanish, etc.). Each convention has trade-offs: digraphs are familiar but can be ambiguous, diacritics are precise but need special keyboards, and unique letters avoid ambiguity but require font support.',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Pattern Finder',
    description: 'Recognize documented orthographic patterns. Learn to see the rules behind how sounds become written symbols.',
    difficulty: 'beginner',
    xp_reward: 150,
    status: 'available',
    progress_percent: 0,
    icon: '◎',
    lessons: [
      {
        id: 7, quest_id: 3, title: 'Finding Patterns', order: 1, completed: false,
        content: {
          type: 'spot_pattern',
          title: 'Vowel Harmony Pattern',
          examples: ['tāla', 'mēra', 'kūna', 'pīla', 'dōra'],
          pattern: 'Long vowels are marked with a macron (horizontal line) above the vowel letter',
          explanation: 'In this synthetic convention, long vowels are distinguished from short vowels using a macron diacritic: ā, ē, ī, ō, ū. This is a common approach used in several real-world writing systems, including romanized Sanskrit and Māori.',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'The Art of Variation',
    description: 'Understand why different spellings can coexist and why variation is not automatically an error.',
    difficulty: 'intermediate',
    xp_reward: 180,
    status: 'available',
    progress_percent: 0,
    icon: '❋',
    lessons: [],
  },
  {
    id: 5,
    title: 'Compare with Care',
    description: 'Learn how to compare writing conventions fairly, without declaring a universal winner.',
    difficulty: 'intermediate',
    xp_reward: 200,
    status: 'available',
    progress_percent: 0,
    icon: '⬡',
    lessons: [],
  },
  {
    id: 6,
    title: 'Evidence and Uncertainty',
    description: 'Understand sources, confidence levels, limitations, and ambiguity in linguistic documentation.',
    difficulty: 'advanced',
    xp_reward: 250,
    status: 'available',
    progress_percent: 0,
    icon: '◆',
    lessons: [],
  },
];

// ---- Contributions ----
export const demoContributions: Contribution[] = [
  {
    id: 1, contributor_id: 2, project_id: 1, project_name: 'Tundra Script Project',
    contribution_type: 'example_word', content: 'tāla (synthetic example)',
    language_variety: 'Tundrani', writing_system: 'Latin-based', orthography_version: 'Latin v1.0',
    context: 'Demonstration of long vowel marking', source: 'Synthetic data',
    source_type: 'demo', visibility: 'project', status: 'submitted',
    created_at: '2026-10-15', updated_at: '2026-10-15',
  },
  {
    id: 2, contributor_id: 2, project_id: 1, project_name: 'Tundra Script Project',
    contribution_type: 'rule_suggestion', content: 'Suggested rule: Double consonants should indicate gemination',
    language_variety: 'Tundrani', writing_system: 'Latin-based', orthography_version: 'Latin v1.0',
    context: 'Consonant length distinction', source: 'Synthetic suggestion',
    visibility: 'project', status: 'under_review',
    created_at: '2026-10-10', updated_at: '2026-10-18',
  },
  {
    id: 3, contributor_id: 2, project_id: 2, project_name: 'River Valley Orthography',
    contribution_type: 'example_sentence', content: 'Nadi ke kinare ek sundar phool khila',
    language_variety: 'Nadivali', writing_system: 'Traditional Script',
    context: 'Basic sentence structure demo', source: 'Synthetic',
    visibility: 'public', status: 'accepted',
    reviewer_feedback: 'Synthetic example accepted for demonstration purposes.',
    created_at: '2026-09-20', updated_at: '2026-10-01',
  },
];

// ---- Review Tasks ----
export const demoReviewTasks: ReviewTask[] = [
  {
    id: 1,
    contribution: demoContributions[0],
    assigned_reviewer_id: 3,
    status: 'assigned',
    task_scope: 'Verify spelling convention consistency',
    assigned_at: '2026-10-16',
  },
  {
    id: 2,
    contribution: demoContributions[1],
    assigned_reviewer_id: 3,
    status: 'in_progress',
    task_scope: 'Evaluate rule clarity and completeness',
    assigned_at: '2026-10-19',
  },
];

// ---- Proposals ----
export const demoProposals: Proposal[] = [
  {
    id: 1,
    project_id: 1,
    project_name: 'Tundra Script Project',
    title: 'Vowel Length Representation Method',
    scope: 'Deciding between macrons and double vowels for marking long vowels in the Latin-based writing system',
    background: 'The current Latin-based orthography uses macrons (ā, ē, ī) to mark long vowels. An alternative proposal suggests using double vowels (aa, ee, ii) instead, which may be easier to type on standard keyboards.',
    problem: 'Community members have expressed different preferences for how long vowels should be represented. Both methods have trade-offs regarding readability, keyboard accessibility, and visual clarity.',
    options: [
      { id: 1, title: 'Macron System', description: 'Continue using macrons (ā, ē, ī, ō, ū) for long vowels', advantages: 'Visually compact, widely used in linguistics', disadvantages: 'Requires special keyboard input' },
      { id: 2, title: 'Double Vowel System', description: 'Use doubled vowels (aa, ee, ii, oo, uu) for long vowels', advantages: 'Easy to type on any keyboard', disadvantages: 'Can make words appear longer, potential ambiguity with actual double vowels' },
      { id: 3, title: 'Mixed Approach', description: 'Allow both systems with a recommendation', advantages: 'Maximum flexibility', disadvantages: 'Less consistency in written materials' },
    ],
    evidence: 'Preliminary feedback from 12 demo participants (synthetic data). This is not real community evidence.',
    limitations: 'This is a demonstration proposal. No real community has been consulted.',
    process: 'Open consultation followed by community discussion',
    status: 'open',
    author_display_name: 'Rohan (Demo Facilitator)',
    timeline: 'Open for discussion — no real deadline (demo)',
    created_at: '2026-10-01',
    updated_at: '2026-10-20',
  },
  {
    id: 2,
    project_id: 2,
    project_name: 'River Valley Orthography',
    title: 'Simplification of Aspirated Consonant Markers',
    scope: 'Evaluating whether to simplify the traditional aspiration marks in digital writing',
    background: 'Traditional writing uses special marks for aspirated consonants. A simplified version has been proposed for digital communication.',
    problem: 'Digital input of traditional aspiration marks is difficult. But simplification may lose important phonetic distinctions.',
    options: [
      { id: 4, title: 'Preserve Traditional', description: 'Keep the traditional aspiration marks', advantages: 'Maintains phonetic precision', disadvantages: 'Difficult digital input' },
      { id: 5, title: 'Simplified Digital', description: 'Use simplified markers for digital text', advantages: 'Easier typing', disadvantages: 'May lose distinctions' },
    ],
    process: 'Community consultation',
    status: 'consultation',
    author_display_name: 'System (Demo)',
    created_at: '2026-09-15',
    updated_at: '2026-10-10',
  },
];

// ---- Decision Records ----
export const demoDecisions: DecisionRecord[] = [
  {
    id: 1,
    proposal_id: 0,
    title: 'Adoption of Latin Script Base for Tundra Project',
    scope: 'Tundra Script Project — primary script selection',
    process_used: 'Community consultation with consensus discussion (synthetic demo)',
    outcome: 'accepted',
    evidence_considered: 'Synthetic demonstration data only. No real evidence was used.',
    limitations: 'This is a synthetic demonstration decision. It does not represent any actual community decision.',
    dissenting_views: 'Some participants preferred a Cyrillic-based approach due to regional familiarity. These perspectives are documented and respected.',
    unresolved_issues: 'The choice of diacritics vs. digraphs for special sounds remains under discussion.',
    decided_at: '2026-06-01',
  },
];

// ---- Badges ----
export const demoBadges: Badge[] = [
  { id: 1, name: 'First Discovery', description: 'Completed your first lesson', icon: '🌱', category: 'learning', earned: false },
  { id: 2, name: 'Pattern Finder', description: 'Successfully identified 5 orthographic patterns', icon: '🔍', category: 'learning', earned: false },
  { id: 3, name: 'Curious Explorer', description: 'Explored 3 different writing systems', icon: '🧭', category: 'learning', earned: false },
  { id: 4, name: 'Careful Reader', description: 'Read explanations for every answer', icon: '📖', category: 'learning', earned: false },
  { id: 5, name: 'Consistent Learner', description: 'Practiced for 5 days', icon: '⭐', category: 'learning', earned: false },
  { id: 6, name: 'First Contribution', description: 'Made your first contribution', icon: '✍️', category: 'contribution', earned: false },
  { id: 7, name: 'Documentation Helper', description: 'Contributed to project documentation', icon: '📝', category: 'contribution', earned: false },
  { id: 8, name: 'Calibration Completed', description: 'Completed reviewer calibration', icon: '⚖️', category: 'review', earned: false },
  { id: 9, name: 'Thoughtful Escalation', description: 'Appropriately escalated a difficult case', icon: '🔔', category: 'review', earned: false },
  { id: 10, name: 'Evidence-Based Reviewer', description: 'Consistently provided documented rationale', icon: '🏅', category: 'review', earned: false },
];

// ---- Notifications ----
export const demoNotifications: Notification[] = [
  { id: 1, type: 'contribution', title: 'Contribution Received', message: 'Your word example "tāla" has been submitted for review.', read: false, link: '/contributions/1', created_at: '2026-10-15T10:00:00Z' },
  { id: 2, type: 'review', title: 'Review Assigned', message: 'A new review task has been assigned to you.', read: false, link: '/review/1', created_at: '2026-10-16T08:00:00Z' },
  { id: 3, type: 'proposal', title: 'New Proposal', message: 'A new proposal "Vowel Length Representation" is open for discussion.', read: true, link: '/sabha/proposals/1', created_at: '2026-10-01T12:00:00Z' },
];

// ---- Gamification Profile ----
export const demoGamificationProfile: GamificationProfile = {
  learning_xp: 450,
  review_xp: 0,
  contribution_count: 3,
  badges: demoBadges.slice(0, 2).map(b => ({ ...b, earned: true, earned_at: '2026-10-10' })),
  garden_stage: 'sprout',
  weekly_activity: [2, 3, 1, 4, 2, 0, 1],
};

// ---- Audit Events ----
export const demoAuditEvents: AuditEvent[] = [
  { id: 1, actor_name: 'Rohan (Demo)', action: 'project.created', target_type: 'Project', target_id: 1, created_at: '2026-01-15T09:00:00Z' },
  { id: 2, actor_name: 'Kavi (Demo)', action: 'contribution.submitted', target_type: 'Contribution', target_id: 1, created_at: '2026-10-15T10:00:00Z' },
  { id: 3, actor_name: 'Meera (Demo)', action: 'review.started', target_type: 'ReviewTask', target_id: 1, created_at: '2026-10-16T08:00:00Z' },
  { id: 4, actor_name: 'Rohan (Demo)', action: 'proposal.created', target_type: 'Proposal', target_id: 1, created_at: '2026-10-01T12:00:00Z' },
  { id: 5, actor_name: 'System', action: 'decision.published', target_type: 'DecisionRecord', target_id: 1, created_at: '2026-06-01T15:00:00Z' },
];
