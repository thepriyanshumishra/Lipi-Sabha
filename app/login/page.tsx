'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { TactileButton } from '@/components/ui/tactile-button';
import { TactileCard } from '@/components/ui/tactile-card';
import { Sparkles, ShieldCheck, Compass, ArrowRight, BookOpen, Scroll, CheckCircle2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [isLoading, setIsLoading] = useState(false);
  const [demoName, setDemoName] = useState('Priyanshu Mishra');
  const [demoEmail, setDemoEmail] = useState('priyanshu@lipisabha.org');
  const [demoRole, setDemoRole] = useState<'scribe' | 'reviewer'>('scribe');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl });
    } catch (err) {
      console.error('Google sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        name: demoName,
        email: demoEmail,
        callbackUrl,
      });

      if (result?.ok) {
        router.push(callbackUrl);
      } else {
        alert('Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Credentials sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-serif font-black text-amber-300">लि</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black tracking-tight text-white text-lg">Lipi Sabha</span>
              <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase bg-indigo-950/80 border border-indigo-700/50 px-1.5 py-0.5 rounded">
                ASSEMBLY
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Sovereign Script Fieldwork & Gamified Research</p>
          </div>
        </Link>
        <Link href="/" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
          Return to home &rarr;
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <TactileCard variant="default" className="bg-slate-900/90 border-slate-800 p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient Accent Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold mb-3">
                  <Scroll className="w-3.5 h-3.5 text-amber-400" />
                  Scribe Authentication
                </div>
                <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
                  Enter the Scribe Assembly
                </h1>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Sign in to participate in fieldwork quests, maintain your learning streak, and contribute to living orthographic archives.
                </p>
              </div>

              {/* Direct Google OAuth */}
              <div className="space-y-3 mb-6">
                <TactileButton
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 border-slate-300 shadow-sm font-semibold"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </TactileButton>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                    Or Instant Field Scribe Access
                  </span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>
              </div>

              {/* Instant Scribe Credentials Form */}
              <form onSubmit={handleDemoSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Scribe Display Name
                  </label>
                  <input
                    type="text"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Assembly Email
                  </label>
                  <input
                    type="email"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDemoRole('scribe');
                      setDemoName('Priyanshu Mishra');
                      setDemoEmail('scribe@lipisabha.org');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      demoRole === 'scribe'
                        ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-indigo-400" />
                      Field Scribe
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Learner & fieldwork contributor</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDemoRole('reviewer');
                      setDemoName('Dr. Vasundhara Shinde');
                      setDemoEmail('reviewer@lipisabha.org');
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      demoRole === 'reviewer'
                        ? 'border-amber-500 bg-amber-950/60 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Linguist Elder
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Reviewer & governance admin</div>
                  </button>
                </div>

                <TactileButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Accessing Assembly...' : 'Enter Scribe Workspace'}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </TactileButton>
              </form>

              {/* Ethics Footer */}
              <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 font-medium mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Sovereign Linguistic Trust
                </div>
                Your contributions directly empower open orthographic preservation. Individual cohort responses are privacy-protected under <span className="font-mono text-slate-400">N &ge; 5</span> suppression.
              </div>
            </div>
          </TactileCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/50 px-6 py-3 text-center text-xs text-slate-600">
        Lipi Sabha &copy; 2026. Dedicated to the living scripts and epigraphic heritage of India and the world.
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070A12] flex items-center justify-center text-slate-400 text-xs font-mono">Loading Scribe Assembly...</div>}>
      <LoginForm />
    </Suspense>
  );
}
