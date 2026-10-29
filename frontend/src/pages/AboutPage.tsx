import { Link } from 'react-router-dom';
import {
  Sparkles,
  Users,
  Scale,
  HeartHandshake,
  Eye,
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export function AboutPage() {
  const productQuestions = [
    'Who is authorized to establish a language project?',
    'How does a community define legitimate participation?',
    'How should disagreements be represented without silencing minority dialects?',
    'Who can authorize public release of linguistic materials?',
    'How are reviewer qualifications established without academic bias?',
    'How are conflicts of interest handled between competing orthography proposals?',
    'How are minority perspectives preserved in decision records?',
    'How are consent and withdrawal implemented when data has already been reviewed?',
    'What happens when community members disagree about the governance process itself?',
    'How can a formal decision be reconsidered as digital tools evolve?'
  ];

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Hero */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple px-3 py-1 rounded-full bg-lilac inline-block">
            Vision & Principles
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-tight">
            About Lipi Sabha
          </h1>
          <p className="text-lg text-muted leading-relaxed font-sans">
            Lipi Sabha — &ldquo;Let Communities Choose How to Write.&rdquo; An open platform dedicated to helping language communities explore writing systems on their own terms.
          </p>
        </div>

        {/* The Core Principle Callout */}
        <div className="p-8 rounded-3xl bg-white border-2 border-purple/30 shadow-card space-y-3">
          <span className="text-xs uppercase font-bold text-purple tracking-widest block">
            Our Immutable Core Principle
          </span>
          <p className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug">
            &ldquo;The community is the decision-maker, not just the dataset.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-muted leading-relaxed pt-2">
            A writing system is connected to identity, history, culture, accessibility, education, and community preferences. An outsider must not decide which writing system a community should adopt.
          </p>
        </div>

        {/* Six Foundational Commitments */}
        <div id="principles" className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink">Six Foundational Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <Users size={18} /> Community-Led Decisions
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Platform metrics and researcher experiments are informative tools; they never usurp community authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <FileCheck2 size={18} /> Transparent Evidence
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Clear distinction between technical performance, learning retention, reviewer assessments, and community votes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <Scale size={18} /> Respect for Dialectal Variation
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Differences in regional spelling or pronunciation are recognized as living cultural heritage, not errors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <HelpCircle size={18} /> Documented Uncertainty
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Ambiguity and incomplete datasets are recorded transparently instead of creating artificial standardization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <HeartHandshake size={18} /> Consent-First Submissions
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Contributors retain rights with granular visibility choices and accessible withdrawal procedures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-purple font-bold text-sm">
                <Eye size={18} /> Accessible Participation
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Built to WCAG 2.2 AA accessibility standards with support for users on basic devices and varied connectivity.
              </p>
            </div>
          </div>
        </div>

        {/* Important Product Questions (Spec Section 38) */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">
            Essential Questions We Keep Visible
          </h2>
          <p className="text-xs text-muted">
            Lipi Sabha operates transparently around these 10 core governance challenges:
          </p>

          <div className="space-y-2">
            {productQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-border text-xs text-ink flex items-start gap-3 shadow-soft"
              >
                <span className="font-mono font-bold text-purple">{idx + 1}.</span>
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <Link to="/guidelines" className="text-xs font-semibold text-purple hover:underline flex items-center gap-1">
            Read Community Guidelines <ArrowRight size={14} />
          </Link>
          <Link to="/explore" className="text-xs font-semibold text-ink hover:underline">
            Explore Writing Systems
          </Link>
        </div>
      </div>
    </div>
  );
}
