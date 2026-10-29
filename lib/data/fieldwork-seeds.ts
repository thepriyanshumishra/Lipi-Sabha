/**
 * Comprehensive Seed & Reference Data for Lipi Sabha
 * Includes verified epigraphic stimuli, orthography profiles, and community mirror statistics.
 */

export interface SeedProject {
  id: string;
  slug: string;
  name: string;
  hindiName: string;
  region: string;
  status: 'active' | 'under_review' | 'community_consultation' | 'approved' | 'draft';
  scope: 'word' | 'phrase' | 'both';
  problemStatement: string;
  goal: string;
  summary: string;
  proposer: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  totalParticipants: number;
  totalQuestsCompleted: number;
  candidateOrthographies: Array<{
    id: string;
    scriptName: string;
    nativeLabel: string;
    historicalEra: string;
    description: string;
    sampleGlyph: string;
    isPrimaryHistoric: boolean;
    legibilityScore: number;
    agreementRate: number;
  }>;
  communityMirror: {
    totalResponses: number;
    consensusStatus: 'strong_consensus' | 'divided_consensus' | 'exploratory';
    distribution: Array<{
      variantName: string;
      percentage: number;
      sampleCount: number;
    }>;
    cohorts: Array<{
      cohortKey: string;
      cohortLabel: string;
      respondentCount: number;
      isSuppressed: boolean;
      suppressionNote?: string;
      preferredVariant?: string;
    }>;
  };
  consultationPoll?: {
    id: string;
    title: string;
    description: string;
    isAdvisory: boolean;
    quorumRequired: number;
    currentVotes: number;
    opensAt: string;
    closesAt: string;
    options: Array<{
      id: string;
      label: string;
      description: string;
      votes: number;
    }>;
  };
  sampleStimuli: Array<{
    id: string;
    referenceWord: string;
    phoneticIpa: string;
    englishMeaning: string;
    variants: Array<{
      orthographyId: string;
      scriptName: string;
      writtenForm: string;
      calligraphicNotes: string;
    }>;
  }>;
}

export const SEED_PROJECTS: SeedProject[] = [
  {
    id: 'proj_marathi_modi_01',
    slug: 'marathi-modi-devanagari',
    name: 'Marathi Orthography & Modi Paleography Study',
    hindiName: 'मराठी मोडी व देवनागरी तुलनात्मक शोध प्रकल्प',
    region: 'Maharashtra & Western Deccan',
    status: 'active',
    scope: 'both',
    problemStatement:
      'Modi (मोडी) was the rapid cursive administrative script of Maharashtra from the Yadava period (12th century) through Chhatrapati Shivaji Maharaj’s Maratha Empire until the mid-20th century. Over 500,000 historic documents remain untranscribed because modernized Marathi education exclusively teaches Devanagari (Balbodh). This fieldwork tests whether native Marathi speakers can rapidly acquire cursive Modi ligatures through gamified micro-quests without formal paleographic training.',
    goal: 'Build an empirical legibility baseline for 100 core Marathi morphemes and train a new generation of community scribes to transcribe historical Maratha archives.',
    summary: 'Empirical comparison of cursive Modi ligatures versus standard Devanagari Balbodh across 1,420 field responses.',
    proposer: {
      name: 'Dr. Vasundhara Shinde',
      role: 'Head of Epigraphy, Pune Historical Archives',
      avatarUrl: '/avatars/vasundhara.png',
    },
    totalParticipants: 428,
    totalQuestsCompleted: 1420,
    candidateOrthographies: [
      {
        id: 'ortho_modi',
        scriptName: 'Modi (मोडी लिपी)',
        nativeLabel: '𑘦𑘻𑘚𑘲 𑘩𑘱𑘢𑘲',
        historicalEra: '12th c. – 20th c. CE',
        description: 'Rapid, unbroken cursive script designed for swift ink pen administrative records with continuous topline and loop ligatures.',
        sampleGlyph: '𑘦𑘻𑘚𑘲',
        isPrimaryHistoric: true,
        legibilityScore: 78.4,
        agreementRate: 0.74,
      },
      {
        id: 'ortho_devanagari',
        scriptName: 'Devanagari Balbodh (देवनागरी बाळबोध)',
        nativeLabel: 'देवनागरी बाळबोध',
        historicalEra: '19th c. – Present',
        description: 'Standard modern print orthography with individual character shirorekha (headstrokes) and detached glyphs.',
        sampleGlyph: 'मोडी',
        isPrimaryHistoric: false,
        legibilityScore: 96.2,
        agreementRate: 0.98,
      },
    ],
    communityMirror: {
      totalResponses: 1420,
      consensusStatus: 'divided_consensus',
      distribution: [
        { variantName: 'Devanagari Balbodh', percentage: 61, sampleCount: 866 },
        { variantName: 'Modi Cursive', percentage: 39, sampleCount: 554 },
      ],
      cohorts: [
        {
          cohortKey: 'pune_urban_literate',
          cohortLabel: 'Pune / Mumbai Urban Speakers (Age 20-35)',
          respondentCount: 284,
          isSuppressed: false,
          preferredVariant: 'Devanagari Balbodh (72%)',
        },
        {
          cohortKey: 'marathwada_heritage',
          cohortLabel: 'Marathwada Historic Researchers & Scribes',
          respondentCount: 89,
          isSuppressed: false,
          preferredVariant: 'Modi Cursive (68%)',
        },
        {
          cohortKey: 'konkan_elder_lineage',
          cohortLabel: 'Konkan Traditional Lineage Scholars',
          respondentCount: 4,
          isSuppressed: true,
          suppressionNote: 'Preserved privacy: cohort contains fewer than 5 respondents (N = 4).',
        },
      ],
    },
    consultationPoll: {
      id: 'poll_modi_dual_standard',
      title: 'Should Maharashtra State School Curriculum introduce a Modi Script Epigraphy Elective?',
      description:
        'Sovereign community consultation to provide an empirical recommendation to historical councils and academic boards.',
      isAdvisory: true,
      quorumRequired: 500,
      currentVotes: 382,
      opensAt: '2026-10-01T00:00:00Z',
      closesAt: '2026-11-30T23:59:59Z',
      options: [
        {
          id: 'opt_1',
          label: 'Adopt Elective Module for 8th Grade History',
          description: 'Introduce 15 hours of Modi decipherment into Maharashtra state curriculum.',
          votes: 247,
        },
        {
          id: 'opt_2',
          label: 'Maintain Extracurricular Archive Certification Only',
          description: 'Keep Modi study within university archives and community workshops.',
          votes: 112,
        },
        {
          id: 'opt_3',
          label: 'Needs Further Pedagogical Field Testing',
          description: 'Collect more quest telemetry across rural schools before policy recommendations.',
          votes: 23,
        },
      ],
    },
    sampleStimuli: [
      {
        id: 'stim_1',
        referenceWord: 'नमस्कार',
        phoneticIpa: '/n̪əməskaːɾ/',
        englishMeaning: 'Greeting / Reverence',
        variants: [
          {
            orthographyId: 'ortho_modi',
            scriptName: 'Modi',
            writtenForm: '𑘡𑘦𑘭𑘿𑘎𑘰𑘨',
            calligraphicNotes: 'Curved na with connected ma loop and continuous horizontal topline.',
          },
          {
            orthographyId: 'ortho_devanagari',
            scriptName: 'Devanagari',
            writtenForm: 'नमस्कार',
            calligraphicNotes: 'Standard Balbodh form with conjunct ska.',
          },
        ],
      },
      {
        id: 'stim_2',
        referenceWord: 'स्वराज्य',
        phoneticIpa: '/sʋəɾaːd͡ʑjə/',
        englishMeaning: 'Self-Rule / Sovereign Commonwealth',
        variants: [
          {
            orthographyId: 'ortho_modi',
            scriptName: 'Modi',
            writtenForm: '𑘭𑘿𑘪𑘨𑘰𑘕𑘿𑘧',
            calligraphicNotes: 'Historical seal of Chhatrapati Shivaji Maharaj rajmudra transcription.',
          },
          {
            orthographyId: 'ortho_devanagari',
            scriptName: 'Devanagari',
            writtenForm: 'स्वराज्य',
            calligraphicNotes: 'Balbodh conjunct sva and jya.',
          },
        ],
      },
    ],
  },
  {
    id: 'proj_kashmiri_sharada_02',
    slug: 'kashmiri-sharada-devanagari',
    name: 'Kashmiri Writing Systems & Sharada Script Fieldwork',
    hindiName: 'कश्मीरी शारदा व देवनागरी लिपि अन्वेषण',
    region: 'Kashmir Valley & Himalayan Diaspora',
    status: 'community_consultation',
    scope: 'both',
    problemStatement:
      'Kashmiri (कॉशुर) possesses a rich tripartite script heritage: the ancestral Sharada (शारदा) script dating from the 8th century CE, the Perso-Arabic Nastaliq script, and modern diacritic Devanagari. Modern Kashmiri writers encounter significant orthographic ambiguity regarding short vowels, central unrounded vowels [ɨ, ɨː], and palatalized consonants. This project documents community reading comprehension and subjective orthographic comfort across these systems.',
    goal: 'Quantify readability, phonological precision, and generational sentiment for Kashmiri script representations.',
    summary: 'Evaluating phonetic fidelity and decipherment speed across Sharada and extended Devanagari for Kashmiri literature.',
    proposer: {
      name: 'Pandit Ramesh Kaul',
      role: 'Sharada Script Society & Himalayan Manuscript Trust',
      avatarUrl: '/avatars/kaul.png',
    },
    totalParticipants: 312,
    totalQuestsCompleted: 894,
    candidateOrthographies: [
      {
        id: 'ortho_sharada',
        scriptName: 'Sharada (शारदा लिपी)',
        nativeLabel: '𑆯𑆳𑆫𑆢𑆳 𑆬𑆴𑆥𑆵',
        historicalEra: '8th c. – 18th c. CE',
        description: 'Ancestral Kashmiri brahmic script used in Rajatarangini manuscripts and classical literature.',
        sampleGlyph: '𑆯𑆳𑆫𑆢𑆳',
        isPrimaryHistoric: true,
        legibilityScore: 64.1,
        agreementRate: 0.61,
      },
      {
        id: 'ortho_kashmiri_devanagari',
        scriptName: 'Extended Kashmiri Devanagari',
        nativeLabel: 'कश्मीरी देवनागरी',
        historicalEra: '20th c. – Present',
        description: 'Devanagari augmented with special diacritics for Kashmiri central vowels (e.g. ॳ, ॴ, ॲ).',
        sampleGlyph: 'कॉशुर',
        isPrimaryHistoric: false,
        legibilityScore: 89.3,
        agreementRate: 0.88,
      },
    ],
    communityMirror: {
      totalResponses: 894,
      consensusStatus: 'divided_consensus',
      distribution: [
        { variantName: 'Extended Devanagari', percentage: 54, sampleCount: 483 },
        { variantName: 'Sharada Script', percentage: 46, sampleCount: 411 },
      ],
      cohorts: [
        {
          cohortKey: 'valley_youth',
          cohortLabel: 'Kashmir Valley Native Speakers (Age 18-28)',
          respondentCount: 162,
          isSuppressed: false,
          preferredVariant: 'Extended Devanagari (58%)',
        },
        {
          cohortKey: 'diaspora_elders',
          cohortLabel: 'Diaspora Heritage Scholars (Age 55+)',
          respondentCount: 147,
          isSuppressed: false,
          preferredVariant: 'Sharada Script (62%)',
        },
        {
          cohortKey: 'ladakh_border_dialect',
          cohortLabel: 'Dras / Kargil Border Kashmiri Speakers',
          respondentCount: 3,
          isSuppressed: true,
          suppressionNote: 'Preserved privacy: cohort contains fewer than 5 respondents (N = 3).',
        },
      ],
    },
    consultationPoll: {
      id: 'poll_kashmiri_standards',
      title: 'Should official Kashmiri digital archives support dual Sharada-Devanagari rendering?',
      description: 'Consultation with Kashmiri writers, scholars, and youth on open digital repository standards.',
      isAdvisory: false,
      quorumRequired: 300,
      currentVotes: 312,
      opensAt: '2026-09-15T00:00:00Z',
      closesAt: '2026-11-15T23:59:59Z',
      options: [
        {
          id: 'opt_k1',
          label: 'Full Dual Orthography Support with 1-Click Toggle',
          description: 'Every digitized Kashmiri text rendered simultaneously in Sharada and Devanagari.',
          votes: 218,
        },
        {
          id: 'opt_k2',
          label: 'Primary Extended Devanagari with Sharada Tooltips',
          description: 'Prioritize modern readability while maintaining glyph tooltips.',
          votes: 79,
        },
        {
          id: 'opt_k3',
          label: 'Maintain Separate Isolated Collections',
          description: 'Keep historical Sharada codices distinct from modern phonetic texts.',
          votes: 15,
        },
      ],
    },
    sampleStimuli: [
      {
        id: 'stim_k1',
        referenceWord: 'कॉशुर',
        phoneticIpa: '/kəːʃur/',
        englishMeaning: 'Kashmiri language/people',
        variants: [
          {
            orthographyId: 'ortho_sharada',
            scriptName: 'Sharada',
            writtenForm: '𑆑𑆳𑆯𑆶𑆫',
            calligraphicNotes: 'Classical rounded loop ka with sha ligature.',
          },
          {
            orthographyId: 'ortho_kashmiri_devanagari',
            scriptName: 'Devanagari',
            writtenForm: 'कॉशुर',
            calligraphicNotes: 'Standardized crescent vowel diacritic.',
          },
        ],
      },
    ],
  },
  {
    id: 'proj_santhali_olchiki_03',
    slug: 'santhali-olchiki-bengali',
    name: 'Santhali Orthographic Fieldwork: Ol Chiki & Regional Scripts',
    hindiName: 'संथाली ओल चिकी व क्षेत्रीय लिपि तुलना',
    region: 'Jharkhand, Odisha & West Bengal',
    status: 'active',
    scope: 'word',
    problemStatement:
      'Santhali is spoken by over 7.6 million people across eastern India. Before 1925, Santhali lacked a unified native script and was transcribed into Bengali, Odia, Latin, or Devanagari—none of which correctly accommodated the unreleased final consonants and nasal vowel glides of Austroasiatic phonetics. In 1925, Guru Gomke Pt. Raghunath Murmu invented the Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ) script specifically tailored to Santhali phonetics. This study benchmarks recognition speed across multigenerational readers.',
    goal: 'Track phonological transcription accuracy and keyboard input fluency across Ol Chiki and regional approximations.',
    summary: 'Evaluating phonological precision of Ol Chiki compared to historical Bengali and Devanagari transcriptions.',
    proposer: {
      name: 'Suniram Murmu',
      role: 'All India Santhali Writers Association',
      avatarUrl: '/avatars/suniram.png',
    },
    totalParticipants: 540,
    totalQuestsCompleted: 1840,
    candidateOrthographies: [
      {
        id: 'ortho_olchiki',
        scriptName: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
        nativeLabel: 'ᱚᱞ ᱪᱤᱠᱤ',
        historicalEra: '1925 – Present',
        description: 'Indigenous phonetic alphabet designed directly from natural Santhali physical gestures and sounds.',
        sampleGlyph: 'ᱚᱞ',
        isPrimaryHistoric: true,
        legibilityScore: 92.5,
        agreementRate: 0.94,
      },
      {
        id: 'ortho_santhali_bengali',
        scriptName: 'Bengali Adaptation',
        nativeLabel: 'সাঁওতালি বাংলা লিপি',
        historicalEra: '19th c. – Present',
        description: 'Historical regional adaptation using Bengali characters with subscript virama markings.',
        sampleGlyph: 'অল',
        isPrimaryHistoric: false,
        legibilityScore: 71.0,
        agreementRate: 0.69,
      },
    ],
    communityMirror: {
      totalResponses: 1840,
      consensusStatus: 'strong_consensus',
      distribution: [
        { variantName: 'Ol Chiki', percentage: 84, sampleCount: 1545 },
        { variantName: 'Bengali Adaptation', percentage: 16, sampleCount: 295 },
      ],
      cohorts: [
        {
          cohortKey: 'odisha_mayurbhanj',
          cohortLabel: 'Mayurbhanj Core Region (Jharkhand / Odisha)',
          respondentCount: 340,
          isSuppressed: false,
          preferredVariant: 'Ol Chiki (94%)',
        },
        {
          cohortKey: 'bengal_border_elders',
          cohortLabel: 'West Bengal Cross-Border Readers (Age 50+)',
          respondentCount: 196,
          isSuppressed: false,
          preferredVariant: 'Ol Chiki (67%) / Bengali (33%)',
        },
        {
          cohortKey: 'tea_gardens_assam',
          cohortLabel: 'Assam Tea Garden Diaspora Community',
          respondentCount: 4,
          isSuppressed: true,
          suppressionNote: 'Preserved privacy: cohort contains fewer than 5 respondents (N = 4).',
        },
      ],
    },
    sampleStimuli: [
      {
        id: 'stim_s1',
        referenceWord: 'ᱚᱞ (Ol)',
        phoneticIpa: '/ɔl/',
        englishMeaning: 'To write / Scripture',
        variants: [
          {
            orthographyId: 'ortho_olchiki',
            scriptName: 'Ol Chiki',
            writtenForm: 'ᱚᱞ',
            calligraphicNotes: 'Standard letterform representing writing gesture.',
          },
          {
            orthographyId: 'ortho_santhali_bengali',
            scriptName: 'Bengali Adaptation',
            writtenForm: 'অল',
            calligraphicNotes: 'Bengali short vowel approximation.',
          },
        ],
      },
    ],
  },
];
