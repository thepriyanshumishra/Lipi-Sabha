import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PenTool,
  Clock,
  ArrowRight,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { demoContributions } from '@/data/demo';

export function ContributionsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Combine demo contributions with localStorage submissions
  const allContributions = useMemo(() => {
    const raw = localStorage.getItem('lipisabha_user_contributions');
    const userSubmitted = raw ? JSON.parse(raw) : [];
    return [...userSubmitted, ...demoContributions];
  }, []);

  const filtered = useMemo(() => {
    if (filterStatus === 'all') return allContributions;
    return allContributions.filter((c) => c.status === filterStatus);
  }, [allContributions, filterStatus]);

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">My Contributions</h1>
            <p className="text-xs sm:text-sm text-muted">
              Track the status of your submitted writing samples, words, and orthographic rule proposals.
            </p>
          </div>
          <Link
            to="/contribute/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple text-white text-xs font-semibold hover:bg-purple-hover transition-colors shadow-soft"
          >
            <Plus size={16} /> New Contribution
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'submitted', 'under_review', 'accepted', 'revision_requested'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                filterStatus === status
                  ? 'bg-purple text-white shadow-soft'
                  : 'bg-white border border-border text-muted hover:text-ink'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Contributions List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl border border-border p-12 text-center space-y-3">
              <PenTool size={32} className="text-muted mx-auto" />
              <h3 className="font-display text-lg font-bold text-ink">No contributions in this filter</h3>
              <p className="text-xs text-muted">Share your linguistic insights or sample vocabulary to help communities.</p>
              <Link to="/contribute/new" className="inline-block text-xs font-semibold text-purple hover:underline">
                Create First Submission
              </Link>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-border p-6 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple/30 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-purple bg-lilac px-2.5 py-0.5 rounded-full capitalize">
                      {item.contribution_type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold text-ink">{item.project_name}</span>
                    <span className="text-[10px] text-muted">
                      • {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="font-display text-lg font-bold text-ink">{item.content}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-muted">
                    {item.language_variety && <span>Variety: <strong>{item.language_variety}</strong></span>}
                    {item.writing_system && <span>System: <strong>{item.writing_system}</strong></span>}
                    <span>Visibility: <strong className="capitalize">{item.visibility}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      item.status === 'accepted'
                        ? 'bg-mint text-mint-dark'
                        : item.status === 'under_review'
                        ? 'bg-yellow/40 text-yellow-dark'
                        : item.status === 'revision_requested'
                        ? 'bg-coral-light text-coral'
                        : 'bg-sky/40 text-sky-dark'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                  <Link
                    to={`/contributions/${item.id}`}
                    className="p-2 rounded-lg bg-neutral hover:bg-neutral/80 text-ink transition-colors"
                    aria-label="View Details"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
