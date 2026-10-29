import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Vote,
  Layers,
  ChevronRight,
  Sliders,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { demoProjects } from '@/data/demo';

// Interactive Card State metadata for hands-on discovery
interface ProjectCardState {
  scriptIndex: number;
}

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<'all' | 'multiple_scripts' | 'vowel_length' | 'keyboards'>('all');

  // Interactive script toggling state for each project card
  const [cardScriptSelections, setCardScriptSelections] = useState<Record<number, number>>({
    1: 0, // Tundra: 0 = Latin ā, 1 = Cyrillic аа
    2: 0, // River Valley: 0 = Traditional, 1 = Simplified
    3: 0, // Highland: 0 = Phonemic, 1 = Practical QWERTY
  });

  // Filter projects by search and curated topic
  const filteredProjects = useMemo(() => {
    return demoProjects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.language_label.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedTopic === 'multiple_scripts') {
        return p.writing_systems.length > 1;
      }
      if (selectedTopic === 'vowel_length') {
        return p.id === 1;
      }
      if (selectedTopic === 'keyboards') {
        return p.id === 3 || p.id === 2;
      }
      return true;
    });
  }, [searchQuery, selectedTopic]);

  // Project Interactive Sample Data for Direct Discovery
  const projectDilemmas: Record<number, {
    hook: string;
    dilemma: string;
    sampleWords: { label: string; text: string; subtext: string }[];
    tag: string;
    tagColor: 'purple' | 'mint' | 'coral' | 'yellow';
    stats: string;
  }> = {
    1: {
      hook: 'Vowel Length Representation',
      dilemma: 'Should long vowels use compact macrons (ā) or keyboard-friendly double letters (aa)?',
      sampleWords: [
        { label: 'Latin Macron', text: 'tāla mēra', subtext: 'Compact visual width, requires diacritic input' },
        { label: 'Cyrillic Digraph', text: 'таала меера', subtext: 'Familiar regional alphabet, standard keyboard' },
      ],
      tag: 'Sabha Vote Active',
      tagColor: 'purple',
      stats: '2 Scripts • 46 Words Documented',
    },
    2: {
      hook: 'Mobile Keyboard Optimization',
      dilemma: 'Simplifying complex historical conjuncts so young speakers can type rapidly on smartphones.',
      sampleWords: [
        { label: 'Traditional Conjunct', text: 'प्रस्थ वर्ण', subtext: 'Historical ligature conjuncts, complex input' },
        { label: 'Simplified Linear', text: 'परस्थ वरन', subtext: 'One-letter-one-key standard for mobile devices' },
      ],
      tag: 'Consensus Reached (78%)',
      tagColor: 'mint',
      stats: '2 Proposals • 14 Consensus Rules',
    },
    3: {
      hook: 'Phonetic vs Practical Spelling',
      dilemma: 'Balancing exact acoustic aspiration distinctions against standard English QWERTY keyboards.',
      sampleWords: [
        { label: 'Phonemic IPA', text: 'kʰala pʰat', subtext: 'Precise phonological contrast /kʰ/ vs /k/' },
        { label: 'Practical Digraph', text: 'khala phat', subtext: 'Instantly typeable with zero software installs' },
      ],
      tag: 'Community Deliberation',
      tagColor: 'coral',
      stats: '3 Proposals • 32 Audio Samples',
    },
  };

  const handleToggleScript = (projectId: number, index: number) => {
    setCardScriptSelections((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  const featured = demoProjects[0];
  const featuredActiveScript = cardScriptSelections[1] || 0;

  return (
    <div className="bg-cream min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ========================================================
            HERO: DIRECT, BEAUTIFUL DISCOVERY HEADER
            ======================================================== */}
        <div className="card-catchy p-8 sm:p-12 bg-gradient-to-br from-white via-white to-purple-light/20 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-mint/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-lilac/40 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-catchy-purple">
                <Sparkles size={13} />
                Living Script Explorer
              </span>
              <span className="text-xs font-display font-extrabold text-muted">
                3 Active Communities
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.15]">
              Choose a language. <br className="hidden sm:inline" />
              Discover how it chooses to write.
            </h1>

            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Writing systems are not rigid accidents—they are living choices. Explore the real dilemmas language communities face: diacritics vs double letters, historical scripts vs digital keyboards.
            </p>

            {/* Sleek Integrated Search & Quick Filter Bar */}
            <div className="pt-2 space-y-3">
              <div className="relative">
                <Search size={18} className="absolute left-4.5 top-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by language, script (Latin, Cyrillic, Devanagari), or spelling debate..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-border bg-white text-ink font-sans text-sm placeholder:text-muted/60 focus:outline-none focus:border-purple shadow-soft transition-all"
                />
              </div>

              {/* Catchy Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-display font-bold text-muted mr-1">Quick Filters:</span>
                {[
                  { id: 'all', label: 'All Projects (3)' },
                  { id: 'multiple_scripts', label: 'Multiple Scripts' },
                  { id: 'vowel_length', label: 'Vowel Length Debates' },
                  { id: 'keyboards', label: 'Keyboard Optimized' },
                ].map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                      selectedTopic === topic.id
                        ? 'btn-chunky-purple shadow-soft'
                        : 'bg-white border-2 border-border text-muted hover:text-ink hover:border-purple/30'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FEATURED INTERACTIVE SPOTLIGHT (Immediate "Aha!" Moment)
            ======================================================== */}
        {featured && searchQuery === '' && selectedTopic === 'all' && (
          <div className="card-catchy p-8 sm:p-10 bg-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: The Story & The Dilemma */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="badge-catchy-mint text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-mint-dark animate-pulse" />
                    Featured Spotlight
                  </span>
                  <span className="text-xs font-display font-bold text-muted">
                    {featured.language_label}
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-black text-ink tracking-tight">
                  {featured.name}
                </h2>

                <p className="text-sm font-sans text-muted leading-relaxed max-w-xl">
                  {projectDilemmas[1]?.dilemma}
                </p>

                {/* Direct Interactive Script Toggler */}
                <div className="pt-2 space-y-2">
                  <span className="text-[11px] font-display font-extrabold text-muted uppercase tracking-wider block">
                    Tap to switch orthography convention:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featured.writing_systems.map((ws, sIdx) => (
                      <button
                        key={ws.id}
                        type="button"
                        onClick={() => handleToggleScript(1, sIdx)}
                        className={`px-4 py-2 rounded-xl text-xs font-display font-black transition-all cursor-pointer ${
                          featuredActiveScript === sIdx
                            ? 'btn-chunky-purple shadow-soft'
                            : 'bg-neutral/50 border border-border/80 text-muted hover:text-ink'
                        }`}
                      >
                        {ws.name} ({sIdx === 0 ? 'ā' : 'аа'})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/projects/${featured.id}`}
                    className="btn-chunky-purple px-6 py-3 text-xs inline-flex items-center gap-2 shadow-soft"
                  >
                    Enter Project Story
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/lab"
                    className="btn-chunky-white px-5 py-3 text-xs inline-flex items-center gap-2"
                  >
                    <FlaskConical size={14} />
                    Open in Writing Lab
                  </Link>
                </div>
              </div>

              {/* Right Column: Live Interactive Word Swatch */}
              <div className="lg:col-span-5 bg-cream/90 backdrop-blur-sm rounded-3xl border-2 border-border p-7 text-center space-y-4 shadow-soft">
                <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-purple block">
                  Live Orthography Preview
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={featuredActiveScript}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-2"
                  >
                    <p className="font-display text-4xl sm:text-5xl font-black text-ink tracking-wide">
                      {projectDilemmas[1]?.sampleWords[featuredActiveScript]?.text || 'tāla'}
                    </p>
                    <p className="text-xs font-sans text-purple font-semibold">
                      {featured.writing_systems[featuredActiveScript]?.name}
                    </p>
                    <p className="text-[11px] text-muted max-w-xs mx-auto leading-relaxed">
                      {projectDilemmas[1]?.sampleWords[featuredActiveScript]?.subtext}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted font-display font-bold">
                  <span>Phoneme: /taːla/</span>
                  <span className="text-mint-dark">Community Vote Open</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PROJECTS DIRECTORY: CATCHY, INTERACTIVE, DIRECT CARDS
            ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-ink tracking-tight">
                Active Language Projects ({filteredProjects.length})
              </h2>
              <p className="text-xs text-muted mt-0.5">
                Click any script button on a card to see how its spelling transforms in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const info = projectDilemmas[p.id];
              const activeScriptIdx = cardScriptSelections[p.id] || 0;
              const currentSample = info?.sampleWords[activeScriptIdx] || { text: '...', subtext: '' };

              return (
                <div
                  key={p.id}
                  className="card-catchy p-7 bg-white flex flex-col justify-between space-y-5 hover:border-purple group"
                >
                  <div className="space-y-4">
                    {/* Top Status & Language Tag */}
                    <div className="flex items-center justify-between">
                      <span className={`badge-catchy-${info?.tagColor || 'purple'} text-[11px]`}>
                        {info?.tag || 'Community Project'}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-muted">
                        {p.language_label.split(' ')[0]}
                      </span>
                    </div>

                    {/* Project Title & Core Dilemma */}
                    <div>
                      <h3 className="font-display text-2xl font-black text-ink leading-snug group-hover:text-purple transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs font-display font-extrabold text-purple mt-0.5">
                        {info?.hook}
                      </p>
                    </div>

                    <p className="text-xs font-sans text-muted leading-relaxed">
                      {info?.dilemma || p.description}
                    </p>

                    {/* Interactive Script Switcher on the Card */}
                    <div className="p-4 rounded-2xl bg-neutral/50 border border-border/80 shadow-soft space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-extrabold uppercase text-muted">
                          [ INTERACTIVE DILEMMA ]
                        </span>
                        <span className="text-[10px] font-mono font-bold text-purple uppercase">
                          Click to compare
                        </span>
                      </div>

                      {/* Script Toggle Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {p.writing_systems.slice(0, 2).map((ws, sIdx) => (
                          <button
                            key={ws.id}
                            type="button"
                            onClick={() => handleToggleScript(p.id, sIdx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                              activeScriptIdx === sIdx
                                ? 'bg-purple text-white shadow-soft'
                                : 'bg-white border border-border/80 text-muted hover:text-ink'
                            }`}
                          >
                            {ws.name}
                          </button>
                        ))}
                      </div>

                      {/* Dynamic Word Output Render */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeScriptIdx}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          className="pt-2 border-t border-border/80"
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono font-bold text-muted uppercase mb-0.5">
                            <span>ORTHOGRAPHY // {p.writing_systems[activeScriptIdx]?.name}</span>
                            <span className="text-mint-dark">● ACTIVE</span>
                          </div>
                          <p className="font-display text-2xl font-black text-ink tracking-wide">
                            &ldquo;{currentSample.text}&rdquo;
                          </p>
                          <p className="text-[10px] text-muted leading-tight mt-1 font-sans">
                            {currentSample.subtext}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Card Footer: Metadata & Action CTA */}
                  <div className="pt-3 border-t border-border/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-muted font-bold">
                      {info?.stats || `${p.writing_systems.length} Systems`}
                    </span>

                    <Link
                      to={`/projects/${p.id}`}
                      className="btn-chunky-purple px-4 py-2 text-xs inline-flex items-center gap-1.5 shadow-soft"
                    >
                      Explore Project <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Assurance Note */}
        <div className="p-6 rounded-3xl bg-neutral/50 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="font-display font-black text-sm text-ink">
              🌱 Sovereign Decision-Making
            </h4>
            <p className="text-xs text-muted max-w-xl">
              &ldquo;The community is the decision-maker, not just the dataset.&rdquo; Every proposal is subject to open consultation and consensus in the Community Sabha.
            </p>
          </div>
          <Link
            to="/sabha"
            className="btn-chunky-white px-5 py-2.5 text-xs whitespace-nowrap shadow-soft shrink-0"
          >
            Visit Community Sabha →
          </Link>
        </div>

      </div>
    </div>
  );
}
