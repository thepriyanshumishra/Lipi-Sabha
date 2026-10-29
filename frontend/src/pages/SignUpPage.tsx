import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, User as UserIcon } from 'lucide-react';

export function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'learner' | 'reviewer'>('learner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName || !email) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(email, password, displayName, role);
      if (role === 'reviewer') {
        navigate('/review');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-card">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple text-white flex items-center justify-center font-bold text-lg mx-auto shadow-soft">
            ल
          </div>
          <h2 className="font-display text-3xl font-bold text-ink">Join Lipi Sabha</h2>
          <p className="text-xs text-muted">
            Create an authentic persona to ask doubts, verify orthographies, and shape community standards.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-danger-light border border-danger/30 text-danger text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Vikram Sharma, Dr. Anand"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
              required
            />
          </div>

          {/* Role Choice */}
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Join Community As:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('learner')}
                className={`p-2.5 rounded-xl border text-xs font-display font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  role === 'learner'
                    ? 'bg-purple text-white border-purple shadow-soft'
                    : 'bg-cream border-border text-ink'
                }`}
              >
                <span>🌱 Community Learner</span>
                <span className="text-[10px] opacity-80">Ask doubts & vote</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('reviewer')}
                className={`p-2.5 rounded-xl border text-xs font-display font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  role === 'reviewer'
                    ? 'bg-mint-dark text-white border-mint-dark shadow-soft'
                    : 'bg-cream border-border text-ink'
                }`}
              >
                <span>⚖️ Lipi Reviewer</span>
                <span className="text-[10px] opacity-80">Verify & calibrate</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-neutral/50 rounded-xl border border-border text-[11px] text-muted">
            By creating an account, you respect our core principle: &quot;The community is the decision-maker, not just the dataset.&quot;
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple text-white font-semibold text-sm hover:bg-purple-hover transition-colors shadow-soft cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-xs text-muted">
          Already have an account?{' '}
          <Link to="/auth/sign-in" className="text-purple font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
