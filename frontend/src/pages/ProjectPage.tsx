import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass,
  BookOpen,
  ArrowLeft,
  Layers,
  FileText,
  Users,
  ShieldAlert,
  Share2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { demoProjects, demoOrthographies, demoRules } from '@/data/demo';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'systems' | 'rules' | 'community'>('overview');

  const project = demoProjects.find((p) => p.id === Number(projectId)) || demoProjects[0];

  const projectOrthographies = demoOrthographies.filter((o) => o.project_id === project.id);
  const projectRules = demoRules.filter((r) =>
    projectOrthographies.some((o) => o.id === r.orthography_version_id)
  );

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </div>

        {/* Synthetic Demo Banner */}
        <div className="mb-8 p-4 rounded-xl bg-yellow/30 border border-yellow/60 flex items-start gap-3">
          <ShieldAlert size={20} className="text-yellow-dark flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-ink leading-relaxed">
            <strong>Demonstration Notice:</strong> This is a synthetic demonstration project designed for testing platform capabilities. It does not represent an actual community endorsement, political boundary, or certified linguistic standard.
          </div>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-card mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-light text-purple">
                  {project.language_label}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral text-ink border border-border">
                  Governance: {project.governance_model || 'Community Consensus'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-mint text-mint-dark">
                  Public Documentation
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-3">
                {project.name}
              </h1>
              <p className="text-muted text-base max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/contribute/new?projectId=${project.id}`}
                className="px-5 py-2.5 rounded-xl bg-purple text-white font-medium text-sm hover:bg-purple-hover transition-colors shadow-soft"
              >
                Submit Contribution
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-t border-border mt-8 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple text-white shadow-soft'
                  : 'text-muted hover:text-ink hover:bg-neutral'
              }`}
            >
              Overview & Context
            </button>
            <button
              onClick={() => setActiveTab('systems')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'systems'
                  ? 'bg-purple text-white shadow-soft'
                  : 'text-muted hover:text-ink hover:bg-neutral'
              }`}
            >
              Writing Systems ({project.writing_systems.length})
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'rules'
                  ? 'bg-purple text-white shadow-soft'
                  : 'text-muted hover:text-ink hover:bg-neutral'
              }`}
            >
              Documented Rules ({projectRules.length})
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'community'
                  ? 'bg-purple text-white shadow-soft'
                  : 'text-muted hover:text-ink hover:bg-neutral'
              }`}
            >
              Governance & Sabha
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-ink mb-4">Community Context</h2>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {project.community_context ||
                    'Community context outlines regional traditions, historical education policies, and the social contexts in which multiple orthographies developed.'}
                </p>
                <div className="p-4 rounded-xl bg-neutral/60 border border-border text-xs text-muted space-y-2">
                  <p className="font-semibold text-ink">Important Governance Principle:</p>
                  <p>
                    Decisions about this writing system are never automated by algorithms or determined by external researcher preferences. The community retains sole authority.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft">
                <h2 className="font-display text-xl font-bold text-ink mb-4">Current Orthographic Status</h2>
                <div className="space-y-4">
                  {projectOrthographies.map((orth) => (
                    <div key={orth.id} className="p-4 rounded-xl bg-cream border border-border flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm text-ink">{orth.version_label}</h3>
                        <p className="text-xs text-muted">{orth.documentation}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider bg-lilac text-purple">
                        {orth.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft">
                <h3 className="font-display text-lg font-bold text-ink mb-4">Project Summary</h3>
                <dl className="space-y-3 text-xs">
                  <div>
                    <dt className="text-muted">Language Identifier</dt>
                    <dd className="font-semibold text-ink">{project.language_label}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Available Scripts</dt>
                    <dd className="font-semibold text-ink">{project.writing_systems.map((s) => s.name).join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Documentation Created</dt>
                    <dd className="font-semibold text-ink">{project.created_at}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Latest Update</dt>
                    <dd className="font-semibold text-ink">{project.updated_at}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-lilac/30 rounded-2xl border border-purple/20 p-6 shadow-soft text-center space-y-3">
                <h3 className="font-display font-bold text-ink">Try In Writing Lab</h3>
                <p className="text-xs text-muted">Test typing and compare documented rules directly in our interactive sandbox.</p>
                <Link
                  to="/lab"
                  className="inline-block w-full py-2.5 rounded-xl bg-purple text-white text-xs font-semibold hover:bg-purple-hover transition-colors"
                >
                  Open in Lab
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'systems' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.writing_systems.map((ws) => (
              <div key={ws.id} className="bg-white rounded-2xl border border-border p-6 shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-purple bg-lilac px-2.5 py-1 rounded">
                      {ws.script_code || 'Script'}
                    </span>
                    <span className="text-xs text-muted">ISO 15924 Compliant</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink mb-2">{ws.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{ws.description}</p>
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    to="/lab"
                    className="text-xs font-semibold text-purple flex items-center gap-1 hover:underline"
                  >
                    Compare in Writing Lab <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="space-y-6">
            {projectRules.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-8 text-center text-muted">
                No formal rules recorded yet for this project.
              </div>
            ) : (
              projectRules.map((rule) => (
                <div key={rule.id} className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-ink">{rule.title}</h3>
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-mint text-mint-dark capitalize">
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{rule.explanation}</p>
                  
                  {rule.examples && rule.examples.length > 0 && (
                    <div className="bg-cream rounded-xl p-4 border border-border space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted">Documented Example</span>
                      {rule.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-4 text-sm">
                          <code className="bg-white px-2 py-1 rounded border border-border text-ink font-mono">{ex.input}</code>
                          <span className="text-muted">➔</span>
                          <code className="bg-purple-light text-purple px-2 py-1 rounded border border-purple/20 font-bold">{ex.output}</code>
                          {ex.explanation && <span className="text-xs text-muted italic">({ex.explanation})</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {rule.known_limitations && (
                    <p className="text-xs text-yellow-dark bg-yellow/20 p-3 rounded-lg border border-yellow/40">
                      <strong>Known Limitation:</strong> {rule.known_limitations}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="bg-white rounded-2xl border border-border p-8 shadow-soft text-center max-w-2xl mx-auto space-y-4">
            <Users size={32} className="text-purple mx-auto" />
            <h2 className="font-display text-2xl font-bold text-ink">Community Sabha Integration</h2>
            <p className="text-sm text-muted leading-relaxed">
              Active consultations and decision records for {project.name} take place in the community forum.
            </p>
            <Link
              to="/sabha"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple text-white text-sm font-semibold hover:bg-purple-hover transition-colors shadow-soft"
            >
              Go to Community Sabha
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
