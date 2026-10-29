import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Award, Shield, Check, Save } from 'lucide-react';
import { demoBadges } from '@/data/demo';

export function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.display_name || 'Aria');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updated = { ...user, display_name: displayName };
      localStorage.setItem('lipisabha_demo_user', JSON.stringify(updated));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-purple-light text-purple flex items-center justify-center font-display text-2xl font-bold">
              {displayName.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-ink">{displayName}</h1>
              <p className="text-xs text-muted">{user?.email || 'learner@demo.lipisabha.org'}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-mint text-mint-dark">
                {user?.role || 'Learner'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 pt-4 border-t border-border">
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full max-w-md px-4 py-2.5 rounded-xl border border-border bg-cream text-ink text-sm focus:outline-none focus:border-purple"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple text-white text-xs font-semibold hover:bg-purple-hover transition-colors flex items-center gap-2 shadow-soft"
            >
              {saved ? <Check size={14} className="text-mint" /> : <Save size={14} />}
              {saved ? 'Saved Successfully' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Earned Badges Showcase */}
        <div className="bg-white rounded-3xl border border-border p-8 shadow-card space-y-4">
          <h2 className="font-display text-xl font-bold text-ink">My Earned Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {demoBadges.slice(0, 4).map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-cream border border-border text-center space-y-1">
                <span className="text-3xl block mb-1">{b.icon}</span>
                <h3 className="font-semibold text-xs text-ink">{b.name}</h3>
                <p className="text-[10px] text-muted">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
