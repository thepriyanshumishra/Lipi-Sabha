import { Link } from 'react-router-dom';
import {
  PenTool,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  FileText,
  Volume2,
  Accessibility,
  CheckCircle2
} from 'lucide-react';

const contributionTypes = [
  { id: 'example_word', title: 'Example Word', desc: 'A verified word written in a project convention with provenance.', icon: PenTool },
  { id: 'example_sentence', title: 'Example Sentence', desc: 'A natural sentence illustrating word boundary and grammar rules.', icon: FileText },
  { id: 'rule_suggestion', title: 'Orthographic Rule Suggestion', desc: 'Propose a clarification for spelling vowels, consonants, or tone.', icon: ShieldCheck },
  { id: 'learning_material', title: 'Learning Material', desc: 'Educational exercises, visual mnemonics, or beginner vocabulary.', icon: BookOpen },
  { id: 'translation', title: 'Translation / Gloss', desc: 'Interlinear glosses, semantic translations, or cultural notes.', icon: HelpCircle },
  { id: 'accessibility_feedback', title: 'Accessibility Feedback', desc: 'Reports on font legibility, screen reader behavior, or keyboard ergonomics.', icon: Accessibility }
];

export function ContributePage() {
  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-12 shadow-card max-w-4xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-purple px-3 py-1 rounded-full bg-lilac inline-block">
            Community Documentation
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Contribute to Writing System Documentation
          </h1>
          <p className="text-muted text-base leading-relaxed">
            Your contributions help communities test, compare, and refine their orthographies. Every submission is reviewed by trained community reviewers using transparent rubrics.
          </p>

          <div className="pt-2">
            <Link
              to="/contribute/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple text-white font-medium text-sm hover:bg-purple-hover transition-colors shadow-soft"
            >
              Start New Contribution <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Contribution Types Grid */}
        <div>
          <h2 className="font-display text-2xl font-bold text-ink mb-2">What would you like to contribute?</h2>
          <p className="text-xs text-muted mb-6">Select a category to begin with the appropriate guideline and consent form.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributionTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Link
                  key={type.id}
                  to={`/contribute/new?type=${type.id}`}
                  className="bg-white rounded-2xl border border-border p-6 shadow-soft hover:border-purple/50 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-light text-purple flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink">{type.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{type.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-purple">
                    <span>Submit {type.title}</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Ethical Standards & Consent Notice */}
        <div className="bg-lilac/30 rounded-3xl border border-purple/20 p-8 shadow-card max-w-4xl space-y-4">
          <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
            <CheckCircle2 size={20} className="text-purple" />
            Our Consent & Ethics Standards
          </h3>
          <ul className="text-xs text-muted space-y-2 leading-relaxed">
            <li>• <strong>Provenance & Context:</strong> Disclose whether content is a personal creation, historical text, or synthetic demo.</li>
            <li>• <strong>Granular Visibility:</strong> You control whether data is internal to the project or approved for public learning materials.</li>
            <li>• <strong>Withdrawal Rights:</strong> You can withdraw or amend your submitted draft at any time prior to finalized publication.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
