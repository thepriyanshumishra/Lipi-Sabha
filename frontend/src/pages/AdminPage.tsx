import { useState } from 'react';
import {
  Compass,
  Users,
  ShieldCheck,
  BarChart3,
  History,
  Plus,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { demoProjects, demoAuditEvents } from '@/data/demo';
import { useAuth } from '@/contexts/AuthContext';

export function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'users' | 'analytics' | 'audit'>('overview');

  // Project Creation modal/form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectLang, setNewProjectLang] = useState('');
  const [newProjectGov, setNewProjectGov] = useState('Consensus Deliberation');
  const [projectCreatedMsg, setProjectCreatedMsg] = useState('');

  const [projectsList, setProjectsList] = useState(demoProjects);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const created = {
      id: Date.now(),
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Community documentation workspace.',
      language_label: newProjectLang.trim() || 'Regional Variety',
      status: 'demo' as const,
      visibility: 'public' as const,
      governance_model: newProjectGov,
      writing_systems: [
        { id: 101, name: 'Initial Proposed Script', description: 'Working proposal', script_code: 'Latn' }
      ],
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };

    setProjectsList((prev) => [created, ...prev]);
    setProjectCreatedMsg(`Project "${created.name}" created successfully in demo space.`);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectLang('');
    setTimeout(() => setProjectCreatedMsg(''), 4000);
  };

  return (
    <div className="bg-neutral/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-purple bg-lilac px-3 py-0.5 rounded-full uppercase tracking-wider">
                Platform Operations
              </span>
              <span className="text-xs text-muted">Role: {user?.role || 'Admin'}</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink">
              Facilitator & Admin Studio
            </h1>
            <p className="text-xs sm:text-sm text-muted">
              Technical operations, project registration, reviewer calibration audits, and platform metrics.
            </p>
          </div>

          <div className="p-3 bg-yellow/20 rounded-2xl border border-yellow/50 text-[11px] text-yellow-dark max-w-sm">
            <strong>Governance Notice:</strong> Administrative tools support platform operations; they do not grant authority to rewrite community decisions.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Compass },
            { id: 'projects', label: 'Projects Management', icon: Layers },
            { id: 'users', label: 'Roles & Access', icon: Users },
            { id: 'analytics', label: 'Product Analytics', icon: BarChart3 },
            { id: 'audit', label: 'Audit Log', icon: History }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple text-white shadow-soft'
                    : 'bg-white border border-border text-muted hover:text-ink'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft border-t-4 border-t-purple">
                <span className="text-xs font-bold text-muted uppercase">Documented Projects</span>
                <p className="font-display font-bold text-3xl text-ink mt-2">{projectsList.length}</p>
                <span className="text-[10px] text-muted">3 Synthetic Demonstrations</span>
              </div>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft border-t-4 border-t-coral">
                <span className="text-xs font-bold text-muted uppercase">Active Contributors</span>
                <p className="font-display font-bold text-3xl text-ink mt-2">18</p>
                <span className="text-[10px] text-muted">Across 3 language varieties</span>
              </div>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft border-t-4 border-t-mint-dark">
                <span className="text-xs font-bold text-muted uppercase">Completed Reviews</span>
                <p className="font-display font-bold text-3xl text-ink mt-2">14</p>
                <span className="text-[10px] text-muted">100% with documented rationale</span>
              </div>
              <div className="bg-white rounded-2xl border border-border p-6 shadow-soft border-t-4 border-t-yellow-dark">
                <span className="text-xs font-bold text-muted uppercase">Open Consultations</span>
                <p className="font-display font-bold text-3xl text-ink mt-2">2</p>
                <span className="text-[10px] text-muted">Sabha proposals active</span>
              </div>
            </div>

            {/* Recent Audit Stream */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-bold text-ink">Recent Audit Trail</h3>
              <div className="space-y-2 text-xs">
                {demoAuditEvents.map((evt) => (
                  <div key={evt.id} className="p-3 rounded-xl bg-cream border border-border flex items-center justify-between">
                    <div>
                      <strong>{evt.actor_name}</strong> executed <code>{evt.action}</code> on <em>{evt.target_type} #{evt.target_id}</em>
                    </div>
                    <span className="text-muted text-[10px]">{new Date(evt.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {projectCreatedMsg && (
              <div className="p-4 rounded-xl bg-mint border border-mint-dark/30 text-mint-dark text-xs font-bold">
                {projectCreatedMsg}
              </div>
            )}

            {/* Create Project Form */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                <Plus size={18} className="text-purple" /> Register New Language Project
              </h3>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Project Name</label>
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g. Coastal Orthography Initiative"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-cream text-xs focus:outline-none focus:border-purple"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Language Label</label>
                    <input
                      type="text"
                      value={newProjectLang}
                      onChange={(e) => setNewProjectLang(e.target.value)}
                      placeholder="e.g. Coastal Variety"
                      className="w-full px-3 py-2 rounded-xl border border-border bg-cream text-xs focus:outline-none focus:border-purple"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">Governance Protocol</label>
                    <select
                      value={newProjectGov}
                      onChange={(e) => setNewProjectGov(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-border bg-cream text-xs focus:outline-none focus:border-purple"
                    >
                      <option value="Consensus Deliberation">Consensus Deliberation</option>
                      <option value="Council of Elders Review">Council of Elders Review</option>
                      <option value="Direct Community Vote">Direct Community Vote</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">Description</label>
                  <textarea
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    placeholder="Brief description of the orthographic scope and participating community..."
                    rows={2}
                    className="w-full p-3 rounded-xl border border-border bg-cream text-xs focus:outline-none focus:border-purple"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple text-white text-xs font-bold hover:bg-purple-hover transition-colors shadow-soft"
                >
                  Create Project Record
                </button>
              </form>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft">
              <div className="p-4 border-b border-border bg-neutral/30 font-bold text-xs text-ink">
                Active Projects Directory
              </div>
              <div className="divide-y divide-border text-xs">
                {projectsList.map((p) => (
                  <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-display font-bold text-ink text-sm">{p.name}</h4>
                      <p className="text-muted text-[11px]">{p.language_label} • {p.governance_model}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] bg-lilac text-purple">
                        {p.visibility}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] bg-yellow/40 text-yellow-dark">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft">
            <div className="p-4 border-b border-border bg-neutral/30 font-bold text-xs text-ink">
              User Access & Role Scopes
            </div>
            <div className="divide-y divide-border text-xs">
              {[
                { name: 'Aria', email: 'learner@demo.lipisabha.org', role: 'Learner', scope: 'General learning quests' },
                { name: 'Kavi', email: 'contributor@demo.lipisabha.org', role: 'Contributor', scope: 'Word submissions & drafts' },
                { name: 'Meera', email: 'reviewer@demo.lipisabha.org', role: 'Reviewer', scope: 'Orthography consistency' },
                { name: 'Rohan', email: 'facilitator@demo.lipisabha.org', role: 'Facilitator', scope: 'Sabha consultations' },
                { name: 'Admin', email: 'admin@demo.lipisabha.org', role: 'Platform Admin', scope: 'Technical configuration' }
              ].map((u, i) => (
                <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-ink">{u.name}</span>
                    <span className="text-muted ml-2">({u.email})</span>
                    <p className="text-[11px] text-muted mt-0.5">Assigned Scope: {u.scope}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-light text-purple self-start sm:self-center">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-ink mb-1">Product & Educational Analytics</h3>
              <p className="text-xs text-muted">
                Aggregated, non-invasive metrics designed to evaluate curriculum clarity and platform usability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-cream border border-border space-y-3">
                <span className="text-xs font-bold uppercase text-purple tracking-wider">Quest Completion Rate</span>
                <p className="text-xs text-muted">Proportion of enrolled learners completing initial introductory lessons:</p>
                <div className="w-full bg-neutral h-3 rounded-full overflow-hidden">
                  <div className="bg-mint-dark h-full" style={{ width: '78%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-muted">
                  <span>78% Completion</span>
                  <span>Target: &gt;70%</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-border space-y-3">
                <span className="text-xs font-bold uppercase text-purple tracking-wider">Review Turnaround Time</span>
                <p className="text-xs text-muted">Average duration from contributor submission to initial reviewer feedback:</p>
                <div className="w-full bg-neutral h-3 rounded-full overflow-hidden">
                  <div className="bg-purple h-full" style={{ width: '42%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-muted">
                  <span>3.2 Days Average</span>
                  <span>Goal: &lt; 5 Days</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral/50 border border-border text-[11px] text-muted">
              <strong>Limitation Disclaimer:</strong> Lipi Sabha never correlates quest completion or submission counts with language vitality or cultural survival.
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-soft">
            <div className="p-4 border-b border-border bg-neutral/30 font-bold text-xs text-ink">
              Chronological Audit Trail
            </div>
            <div className="divide-y divide-border text-xs">
              {demoAuditEvents.map((event) => (
                <div key={event.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-purple font-bold">[{event.action}]</span>
                    <span className="text-ink ml-2">by <strong>{event.actor_name}</strong></span>
                    <p className="text-muted text-[11px]">
                      Target: {event.target_type} ID #{event.target_id}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
