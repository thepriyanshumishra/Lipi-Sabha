/**
 * Lipi Sabha - Central Asset Manifest
 * 
 * Defines all visual image assets, backgrounds, textures, and manuscript specimens.
 * When real image files are created and placed in `/public/images/`,
 * the `ImagePlaceholder` component will automatically display them without layout shifts.
 */

export interface AssetMetadata {
  id: string;
  fileName: string;
  title: string;
  description: string;
  section: 'global' | 'hero' | 'fieldwork' | 'scripts' | 'projects' | 'ethics' | 'footer';
  aspectRatio: string; // e.g. "16/9", "4/3", "1/1", "21/9", "none"
  width: number;
  height: number;
  isBackground: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  historicalContext?: string;
  isAvailable?: boolean;
}

export const ASSET_MANIFEST: Record<string, AssetMetadata> = {
  // 1. Global & Background Atmospheres
  'bg-global-ink-texture': {
    id: 'bg-global-ink-texture',
    fileName: 'bg-global-ink-texture.webp',
    title: 'Global Ink & Paper Grain Texture',
    description: 'Subtle wet calligraphic ink texture with micro-paper fiber grain for full-page dark backgrounds.',
    section: 'global',
    aspectRatio: '16/9',
    width: 1920,
    height: 1080,
    isBackground: true,
    objectFit: 'cover',
  },
  'bg-hero-archive-atmosphere': {
    id: 'bg-hero-archive-atmosphere',
    fileName: 'bg-hero-archive-atmosphere.webp',
    title: 'Hero Archive Atmospheric Backdrop',
    description: 'Low-contrast archival library atmosphere with warm amber sidelight and soft focus bookshelves.',
    section: 'hero',
    aspectRatio: '21/9',
    width: 1920,
    height: 900,
    isBackground: true,
    objectFit: 'cover',
  },
  'bg-script-showcase-texture': {
    id: 'bg-script-showcase-texture',
    fileName: 'bg-script-showcase-texture.webp',
    title: 'Script Showcase Archival Ground',
    description: 'Dark carbon-ink texture with faint weathered parchment watermark for the scripts section.',
    section: 'scripts',
    aspectRatio: '16/9',
    width: 1920,
    height: 800,
    isBackground: true,
    objectFit: 'cover',
  },
  'bg-ethics-landscape': {
    id: 'bg-ethics-landscape',
    fileName: 'bg-ethics-landscape.webp',
    title: 'Ethics Charter Archival Panorama',
    description: 'Ancient Himalayan rock edicts and mist-covered mountain valleys representing community longevity.',
    section: 'ethics',
    aspectRatio: '21/9',
    width: 1920,
    height: 700,
    isBackground: true,
    objectFit: 'cover',
  },
  'ethics-charter-background': {
    id: 'ethics-charter-background',
    fileName: 'bg-ethics-landscape.webp',
    title: 'Ethics Charter Background (Alias)',
    description: 'Ancient rock inscriptions and mountain panorama behind the sovereign charter statement.',
    section: 'ethics',
    aspectRatio: '21/9',
    width: 1920,
    height: 700,
    isBackground: true,
    objectFit: 'cover',
  },
  'bg-footer-archive-texture': {
    id: 'bg-footer-archive-texture',
    fileName: 'bg-footer-archive-texture.webp',
    title: 'Footer Scribe Dark Texture',
    description: 'Fine charcoal texture with subtle woodblock impression marks for the site footer.',
    section: 'footer',
    aspectRatio: '16/9',
    width: 1920,
    height: 400,
    isBackground: true,
    objectFit: 'cover',
  },

  // 2. Hero Section
  'hero-modi-manuscript-specimen': {
    id: 'hero-modi-manuscript-specimen',
    fileName: 'hero-modi-manuscript-specimen.webp',
    title: 'Marathi Modi Manuscript Specimen',
    description: 'High-resolution archival photograph of an 18th-century Maratha administrative document in flowing Modi cursive script.',
    section: 'hero',
    aspectRatio: '4/3',
    width: 780,
    height: 585,
    isBackground: false,
    objectFit: 'cover',
    historicalContext: 'Maharashtra, c. 1760 CE',
    isAvailable: true,
  },
  'hero-community-member-strip': {
    id: 'hero-community-member-strip',
    fileName: 'hero-community-member-strip.webp',
    title: 'Fieldwork Scribes Portrait Strip',
    description: 'Overlapping photographic portraits of linguistic researchers, indigenous elders, and young field scribes.',
    section: 'hero',
    aspectRatio: '4/1',
    width: 180,
    height: 44,
    isBackground: false,
    objectFit: 'cover',
  },

  // 3. Fieldwork Architecture
  'fieldwork-blind-first-quest': {
    id: 'fieldwork-blind-first-quest',
    fileName: 'fieldwork-blind-first-quest.webp',
    title: 'Step 1: Blind-First Micro-Quest Specimen',
    description: 'Historic manuscript snippet showing a reed pen (kalam) resting beside fresh iron-gall ink decipherment lines.',
    section: 'fieldwork',
    aspectRatio: '16/10',
    width: 520,
    height: 325,
    isBackground: false,
    objectFit: 'cover',
  },
  'fieldwork-community-mirror': {
    id: 'fieldwork-community-mirror',
    fileName: 'fieldwork-community-mirror.webp',
    title: 'Step 2: Community Mirror Telemetry Graphic',
    description: 'Bar chart visualization with N ≥ 5 privacy bracket highlighting cohort consensus without de-anonymization.',
    section: 'fieldwork',
    aspectRatio: '16/10',
    width: 520,
    height: 325,
    isBackground: false,
    objectFit: 'cover',
  },
  'fieldwork-sovereign-governance': {
    id: 'fieldwork-sovereign-governance',
    fileName: 'fieldwork-sovereign-governance.webp',
    title: 'Step 3: Sovereign Governance Deliberation',
    description: 'Community elders, native speakers, and field linguists gathered around an orthography consensus manuscript table.',
    section: 'fieldwork',
    aspectRatio: '16/10',
    width: 520,
    height: 325,
    isBackground: false,
    objectFit: 'cover',
  },

  // 4. Scripts & Writing Traditions Showcase
  'script-specimen-modi': {
    id: 'script-specimen-modi',
    fileName: 'script-specimen-modi.webp',
    title: 'Modi Script Specimen',
    description: 'Continuous cursive Modi administrative record with unbroken shirorekha and looped character joins.',
    section: 'scripts',
    aspectRatio: '4/3',
    width: 480,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
    historicalContext: 'Maharashtra · 17th–20th century use',
  },
  'script-specimen-sharada': {
    id: 'script-specimen-sharada',
    fileName: 'script-specimen-sharada.webp',
    title: 'Sharada Script Specimen',
    description: 'Ancestral Kashmiri Sharada birch-bark manuscript showing classical Rajatarangini calligraphy.',
    section: 'scripts',
    aspectRatio: '4/3',
    width: 480,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
    historicalContext: 'Kashmir · from c. 8th century',
  },
  'script-specimen-ol-chiki': {
    id: 'script-specimen-ol-chiki',
    fileName: 'script-specimen-ol-chiki.webp',
    title: 'Ol Chiki Typography Specimen',
    description: 'Complete phonetic matrix of 30 Ol Chiki glyphs created by Guru Gomke Pt. Raghunath Murmu.',
    section: 'scripts',
    aspectRatio: '4/3',
    width: 480,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
    historicalContext: 'Santhali · developed 1925',
  },
  'script-specimen-brahmi': {
    id: 'script-specimen-brahmi',
    fileName: 'script-specimen-brahmi.webp',
    title: 'Ashokan Brahmi Epigraph Specimen',
    description: 'Carved sandstone epigraph depicting 3rd-century BCE Mauryan Brahmi rock edict letters.',
    section: 'scripts',
    aspectRatio: '4/3',
    width: 480,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
    historicalContext: 'South Asia · ancient inscription tradition',
  },

  // 5. Active Field Studies
  'project-image-modi-paleography': {
    id: 'project-image-modi-paleography',
    fileName: 'project-image-modi-paleography.webp',
    title: 'Maharashtra Modi Paleography Study',
    description: 'Archival Maratha revenue document being analyzed for character ligatures and digital legibility.',
    section: 'projects',
    aspectRatio: '16/10',
    width: 580,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
  },
  'project-image-sharada-manuscript': {
    id: 'project-image-sharada-manuscript',
    fileName: 'project-image-sharada-manuscript.webp',
    title: 'Kashmir Sharada Manuscript Fieldwork',
    description: 'Carefully preserved birch-bark codex with diacritic vowel annotations in historic Sharada.',
    section: 'projects',
    aspectRatio: '16/10',
    width: 580,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
  },
  'project-image-santhali-mapping': {
    id: 'project-image-santhali-mapping',
    fileName: 'project-image-santhali-mapping.webp',
    title: 'Santhali Phonological Mapping',
    description: 'Field researchers hands annotating Ol Chiki orthographic phonetic charts with community members.',
    section: 'projects',
    aspectRatio: '16/10',
    width: 580,
    height: 360,
    isBackground: false,
    objectFit: 'cover',
  },

  // 6. Sovereign Ethics Charter
  'ethics-community-seal': {
    id: 'ethics-community-seal',
    fileName: 'ethics-community-seal.webp',
    title: 'Sovereign Community Seal Emblem',
    description: 'Circular gold seal emblem bearing "COMMUNITY DECIDES · ALWAYS DECIDES" and three-leaf botanical sprout motif.',
    section: 'ethics',
    aspectRatio: '1/1',
    width: 400,
    height: 400,
    isBackground: false,
    objectFit: 'contain',
  },
};
