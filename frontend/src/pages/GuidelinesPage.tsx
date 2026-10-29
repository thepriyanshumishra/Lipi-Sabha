import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  HeartHandshake,
  Scale,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lock
} from 'lucide-react';

export function GuidelinesPage() {
  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Hero Header */}
        <div className="card-catchy p-8 sm:p-12 bg-gradient-to-br from-white via-white to-purple-light/15 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-mint/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="badge-catchy-purple">
              <Sparkles size={13} />
              Platform Ethical Framework
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black text-ink tracking-tight leading-[1.15]">
              Community Guidelines & Protocols
            </h1>
            <p className="text-muted text-sm sm:text-base leading-relaxed font-sans">
              These principles safeguard speaker dignity, protect minority languages from external imposition, and maintain strict academic and ethical standards for community orthography documentation.
            </p>
          </div>
        </div>

        {/* 1. Contribution Standards Card */}
        <div id="contributing" className="card-catchy p-8 bg-white space-y-6 hover:border-purple/40">
          <div className="flex items-center gap-3.5 border-b-2 border-border/70 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-lilac text-purple flex items-center justify-center font-bold text-xl shadow-soft">
              <FileText size={22} />
            </div>
            <div>
              <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-purple block">
                Standard 01
              </span>
              <h2 className="font-display text-2xl font-black text-ink">
                Contribution Integrity & Provenance
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">📜</span>
              <h4 className="font-display font-black text-sm text-ink">Verified Provenance</h4>
              <p className="text-xs text-muted leading-relaxed">
                Always state source origin (recorded speaker, archival text, or intuition). Never pass synthetic AI generations as authentic native speaker speech.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🎙️</span>
              <h4 className="font-display font-black text-sm text-ink">Respect for Dialects</h4>
              <p className="text-xs text-muted leading-relaxed">
                Regional pronunciation variants must never be labeled &ldquo;incorrect&rdquo;. Use descriptive dialect metadata tags to provide contextual framing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🛡️</span>
              <h4 className="font-display font-black text-sm text-ink">Zero Hate or Slurs</h4>
              <p className="text-xs text-muted leading-relaxed">
                Submissions containing harassment, hate speech, or defamatory slurs will be immediately quarantined, audited, and permanently removed.
              </p>
            </div>
          </div>

          {/* Quick Do vs Don't Sticker Ribbon */}
          <div className="p-4 rounded-2xl bg-neutral/40 border border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-mint-dark font-sans font-medium">
              <CheckCircle2 size={16} className="shrink-0 text-mint-dark" />
              <span><strong>DO:</strong> Document real-world speaker usage with regional context.</span>
            </div>
            <div className="flex items-center gap-2 text-danger font-sans font-medium">
              <XCircle size={16} className="shrink-0 text-danger" />
              <span><strong>DON&apos;T:</strong> Reject regional variants based on personal spelling taste.</span>
            </div>
          </div>
        </div>

        {/* 2. Review Studio Ethics Card */}
        <div id="reviews" className="card-catchy p-8 bg-white space-y-6 hover:border-mint-dark/40">
          <div className="flex items-center gap-3.5 border-b-2 border-border/70 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-mint text-mint-dark flex items-center justify-center font-bold text-xl shadow-soft">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-mint-dark block">
                Standard 02
              </span>
              <h2 className="font-display text-2xl font-black text-ink">
                Review Studio Ethics & Calibration
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">📏</span>
              <h4 className="font-display font-black text-sm text-ink">Rule-Based Evaluation</h4>
              <p className="text-xs text-muted leading-relaxed">
                Reviewers evaluate consistency against documented orthographic consensus rules, not subjective typographical preferences.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">✍️</span>
              <h4 className="font-display font-black text-sm text-ink">Mandatory Rationale</h4>
              <p className="text-xs text-muted leading-relaxed">
                Every review decision (acceptance, revision, or specialist escalation) requires a documented, accountable written rationale for the contributor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">⏱️</span>
              <h4 className="font-display font-black text-sm text-ink">No Competitive Speed</h4>
              <p className="text-xs text-muted leading-relaxed">
                Review XP rewards thoroughness and accurate escalations—never speed or superficial bulk reviews.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Consent, Ownership & Language Sovereignty */}
        <div id="consent" className="card-catchy p-8 bg-white space-y-6 hover:border-coral/40">
          <div className="flex items-center gap-3.5 border-b-2 border-border/70 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-coral-light text-coral flex items-center justify-center font-bold text-xl shadow-soft">
              <HeartHandshake size={22} />
            </div>
            <div>
              <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-coral block">
                Standard 03
              </span>
              <h2 className="font-display text-2xl font-black text-ink">
                Consent, Ownership & Language Sovereignty
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">👑</span>
              <h4 className="font-display font-black text-sm text-ink">Language Sovereignty</h4>
              <p className="text-xs text-muted leading-relaxed">
                Lipi Sabha asserts zero intellectual property or copyright over any community&apos;s language. The language belongs entirely to its native speakers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">↩️</span>
              <h4 className="font-display font-black text-sm text-ink">Right to Withdraw</h4>
              <p className="text-xs text-muted leading-relaxed">
                Contributors may request withdrawal of their submitted words, recordings, or rules at any point prior to formal publication.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🔒</span>
              <h4 className="font-display font-black text-sm text-ink">Granular Visibility</h4>
              <p className="text-xs text-muted leading-relaxed">
                Sensitive cultural terms can be restricted to verified project members, kept private, or made open for public learning.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Democratic Sabha Governance */}
        <div className="card-catchy p-8 bg-white space-y-6 hover:border-yellow-dark/40">
          <div className="flex items-center gap-3.5 border-b-2 border-border/70 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow text-yellow-dark flex items-center justify-center font-bold text-xl shadow-soft">
              <Scale size={22} />
            </div>
            <div>
              <span className="text-[10px] font-display font-extrabold uppercase tracking-wider text-yellow-dark block">
                Standard 04
              </span>
              <h2 className="font-display text-2xl font-black text-ink">
                Sabha Deliberation & Democratic Consensus
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🤝</span>
              <h4 className="font-display font-black text-sm text-ink">Consensus Over Dictation</h4>
              <p className="text-xs text-muted leading-relaxed">
                No external organization or algorithm may impose a script on a community. Formal votes operate strictly within community charters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🗣️</span>
              <h4 className="font-display font-black text-sm text-ink">One Speaker, One Voice</h4>
              <p className="text-xs text-muted leading-relaxed">
                XP rank, reviewer badges, or platform longevity never inflate voting influence. Every speaker has equal weight in community determinations.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-border/80 space-y-1.5">
              <span className="text-lg">🌿</span>
              <h4 className="font-display font-black text-sm text-ink">Coexisting Standards</h4>
              <p className="text-xs text-muted leading-relaxed">
                When agreement is impossible, Lipi Sabha preserves dual standards rather than disenfranchising minority orthographic traditions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 rounded-3xl bg-white border-2 border-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft">
          <div>
            <h3 className="font-display text-lg font-black text-ink">Have questions regarding community governance?</h3>
            <p className="text-xs text-muted">Join the active deliberations in the Community Sabha.</p>
          </div>
          <Link
            to="/sabha"
            className="btn-chunky-purple px-6 py-3 text-xs inline-flex items-center gap-2 whitespace-nowrap shadow-soft"
          >
            Visit Community Sabha
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
