import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Eye,
  Info
} from 'lucide-react';
import { demoProjects } from '@/data/demo';
import { useAuth } from '@/contexts/AuthContext';

export function NewContributionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const initialType = searchParams.get('type') || 'example_word';
  const initialProjectId = Number(searchParams.get('projectId')) || demoProjects[0].id;

  const [step, setStep] = useState(1);
  const [projectId, setProjectId] = useState<number>(initialProjectId);
  const [contributionType, setContributionType] = useState(initialType);
  const [guidelinesRead, setGuidelinesRead] = useState(false);
  const [content, setContent] = useState('');
  const [languageVariety, setLanguageVariety] = useState('Standard Variety');
  const [writingSystem, setWritingSystem] = useState('Latin-based');
  const [context, setContext] = useState('');
  const [source, setSource] = useState('Personal documentation / Speaker reflection');
  const [sourceType, setSourceType] = useState('spoken');
  const [visibility, setVisibility] = useState<'private' | 'project' | 'public'>('project');
  const [consentConfirmed, setConsentConfirmed] = useState(false);

  const selectedProject = demoProjects.find((p) => p.id === projectId) || demoProjects[0];

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !consentConfirmed) return;

    const newContribution = {
      id: Date.now(),
      contributor_id: user?.id || 999,
      project_id: projectId,
      project_name: selectedProject.name,
      contribution_type: contributionType,
      content: content.trim(),
      language_variety: languageVariety,
      writing_system: writingSystem,
      context,
      source,
      source_type: sourceType,
      visibility,
      status: 'submitted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store in localStorage
    const raw = localStorage.getItem('lipisabha_user_contributions');
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift(newContribution);
    localStorage.setItem('lipisabha_user_contributions', JSON.stringify(existing));

    navigate(`/contributions/${newContribution.id}`);
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <div>
          <Link
            to="/contribute"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
          >
            <ArrowLeft size={16} /> Back to Categories
          </Link>
        </div>

        {/* Multi-Step Header Indicator */}
        <div className="bg-white rounded-3xl border border-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-muted">
            <span className="text-purple uppercase tracking-wider font-bold">Step {step} of 4</span>
            <span>
              {step === 1 && 'Select Project & Type'}
              {step === 2 && 'Review Guidelines'}
              {step === 3 && 'Enter Content & Provenance'}
              {step === 4 && 'Consent & Confirmation'}
            </span>
          </div>

          <div className="w-full bg-neutral h-2 rounded-full overflow-hidden">
            <div
              className="bg-purple h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: PROJECT & TYPE */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Select Project and Category</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Language Project</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
                >
                  {demoProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.language_label})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Contribution Category</label>
                <select
                  value={contributionType}
                  onChange={(e) => setContributionType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
                >
                  <option value="example_word">Example Word</option>
                  <option value="example_sentence">Example Sentence</option>
                  <option value="rule_suggestion">Orthographic Rule Suggestion</option>
                  <option value="learning_material">Learning Material / Lesson Suggestion</option>
                  <option value="translation">Translation / Semantic Note</option>
                  <option value="accessibility_feedback">Accessibility / Input Feedback</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
              >
                Continue to Guidelines <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: GUIDELINES CONFIRMATION */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Community Guidelines & Protocols</h2>

            <div className="p-5 rounded-2xl bg-cream border border-border text-xs text-muted space-y-3 leading-relaxed">
              <p>
                <strong>1. Transparent Provenance:</strong> Always disclose where the submitted words or sentences originate. Fabricating examples or presenting synthetic placeholders as genuine speaker speech undermines community trust.
              </p>
              <p>
                <strong>2. Variation is Welcomed:</strong> Regional differences in pronunciation or spelling are not errors. You will have space to describe dialectal context.
              </p>
              <p>
                <strong>3. Review without Prejudice:</strong> Community reviewers evaluate submissions against documented conventions, not personal preference.
              </p>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-border bg-neutral/30 cursor-pointer">
              <input
                type="checkbox"
                checked={guidelinesRead}
                onChange={(e) => setGuidelinesRead(e.target.checked)}
                className="mt-0.5 text-purple focus:ring-purple rounded"
              />
              <span className="text-xs text-ink font-medium leading-relaxed">
                I understand these community guidelines and confirm that my contribution respects regional speakers and documented protocols.
              </span>
            </label>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-neutral text-ink text-xs font-semibold hover:bg-neutral/80"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!guidelinesRead}
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors disabled:opacity-40 flex items-center gap-2 shadow-soft"
              >
                Proceed to Content <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTENT & PROVENANCE */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Content & Provenance</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">
                  Content / Text Sample <span className="text-danger">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the word, sentence, or rule suggestion..."
                  rows={4}
                  className="w-full p-4 rounded-xl border border-border bg-cream text-ink font-display text-base focus:outline-none focus:border-purple"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Language Variety</label>
                  <input
                    type="text"
                    value={languageVariety}
                    onChange={(e) => setLanguageVariety(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1.5">Writing System</label>
                  <input
                    type="text"
                    value={writingSystem}
                    onChange={(e) => setWritingSystem(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Context & Usage Notes</label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Explain when this word is used, meaning, or special phonetic properties..."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-border bg-cream text-ink text-xs focus:outline-none focus:border-purple"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1.5">Source / Origin</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-neutral text-ink text-xs font-semibold hover:bg-neutral/80"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!content.trim()}
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors disabled:opacity-40 flex items-center gap-2 shadow-soft"
              >
                Review & Consent <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: VISIBILITY & CONSENT */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
            <h2 className="font-display text-2xl font-bold text-ink">Visibility Settings & Consent</h2>

            <div className="space-y-4">
              <span className="text-xs font-semibold text-ink block">Permitted Visibility</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'private', label: 'Private Draft', desc: 'Visible only to you for testing' },
                  { id: 'project', label: 'Project Review', desc: 'Visible to project reviewers and facilitators' },
                  { id: 'public', label: 'Public Resource', desc: 'Approved for public learning quests if accepted' }
                ].map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setVisibility(v.id as any)}
                    className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                      visibility === v.id
                        ? 'border-purple bg-purple-light/40 font-semibold'
                        : 'border-border bg-cream'
                    }`}
                  >
                    <p className="text-xs font-bold text-ink">{v.label}</p>
                    <p className="text-[10px] text-muted leading-tight">{v.desc}</p>
                  </button>
                ))}
              </div>

              {/* Summary Review */}
              <div className="p-4 rounded-xl bg-cream border border-border text-xs space-y-2">
                <p><strong>Project:</strong> {selectedProject.name}</p>
                <p><strong>Sample Content:</strong> <code className="font-mono text-purple">{content}</code></p>
                <p><strong>Variety:</strong> {languageVariety} | <strong>System:</strong> {writingSystem}</p>
              </div>

              <label className="flex items-start gap-3 p-4 rounded-xl border border-border bg-neutral/30 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => setConsentConfirmed(e.target.checked)}
                  className="mt-0.5 text-purple focus:ring-purple rounded"
                />
                <span className="text-xs text-ink font-medium leading-relaxed">
                  I grant permission for this contribution to be reviewed and stored under the selected visibility setting. I understand I retain the right to request withdrawal under community policy.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-neutral text-ink text-xs font-semibold hover:bg-neutral/80"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!consentConfirmed}
                className="px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors disabled:opacity-40 shadow-soft"
              >
                Submit Contribution
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
