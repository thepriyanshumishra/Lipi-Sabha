import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, User as UserIcon, ArrowRight, Lock, Mail } from 'lucide-react';

export function SignInPage() {
  const { login, setActiveWorkspace } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // If reviewer email, switch to reviewer workspace by default and redirect to review
      if (email.toLowerCase().includes('reviewer')) {
        setActiveWorkspace('reviewer');
        navigate('/review');
      } else {
        setActiveWorkspace('user');
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (targetEmail: string, isReviewerTarget: boolean) => {
    setEmail(targetEmail);
    setPassword('demo1234');
    if (isReviewerTarget) {
      setActiveWorkspace('reviewer');
    } else {
      setActiveWorkspace('user');
    }
  };

  return (
    <div className="bg-cream min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-7 bg-white p-8 sm:p-10 rounded-3xl border-2 border-border shadow-card">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple text-white flex items-center justify-center font-display font-extrabold text-2xl mx-auto shadow-soft border-b-4 border-purple-hover">
            ल
          </div>
          <h1 className="font-display text-3xl font-black text-ink tracking-tight">
            Welcome to Lipi Sabha
          </h1>
          <p className="text-xs sm:text-sm text-muted max-w-xs mx-auto">
            Discover writing systems, continue learning quests, or access the community review studio.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-danger-light border border-danger/30 text-danger text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-display font-bold text-ink mb-1.5 flex items-center gap-1.5">
              <Mail size={13} className="text-muted" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-cream text-ink text-sm font-sans focus:outline-none focus:border-purple transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-display font-bold text-ink mb-1.5 flex items-center gap-1.5">
              <Lock size={13} className="text-muted" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-cream text-ink text-sm font-sans focus:outline-none focus:border-purple transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl btn-chunky-purple text-sm font-display font-black flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? 'Entering...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center text-xs text-muted">
          Don&apos;t have an account yet?{' '}
          <Link to="/auth/sign-up" className="text-purple font-display font-bold hover:underline">
            Join the community
          </Link>
        </div>

        {/* Minimal, elegant test account helpers for the TWO experiences */}
        <div className="pt-5 border-t border-border/80">
          <span className="text-[11px] font-display font-extrabold uppercase tracking-wider text-muted block mb-2.5 text-center">
            Quick Demo Sign-In
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickFill('learner@demo.lipisabha.org', false)}
              className="p-2.5 rounded-xl border border-border bg-cream/60 hover:bg-white hover:border-purple/50 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-ink">
                <UserIcon size={13} className="text-purple" />
                User Space
              </div>
              <p className="text-[10px] text-muted truncate mt-0.5">learner@demo.lipisabha.org</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('reviewer@demo.lipisabha.org', true)}
              className="p-2.5 rounded-xl border border-border bg-cream/60 hover:bg-white hover:border-mint-dark/50 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-display font-extrabold text-ink">
                <ShieldCheck size={13} className="text-mint-dark" />
                Reviewer Space
              </div>
              <p className="text-[10px] text-muted truncate mt-0.5">reviewer@demo.lipisabha.org</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
