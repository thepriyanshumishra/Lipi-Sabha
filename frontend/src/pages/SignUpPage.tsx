import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await register(email, password, displayName);
      navigate('/dashboard');
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
            Create an account to cultivate your Progress Garden, explore orthographies, and contribute.
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
              placeholder="e.g. Suman"
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

          <div className="p-3 bg-neutral/50 rounded-xl border border-border text-[11px] text-muted">
            By creating an account, you respect our core principle: &quot;The community is the decision-maker, not just the dataset.&quot;
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple text-white font-semibold text-sm hover:bg-purple-hover transition-colors shadow-soft"
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
