import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  BookOpen,
  FlaskConical,
  Users,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

// 1. User Experience: Two Dedicated Pages (Learn Tree & Script Studio)
const userNavLinks = [
  { to: '/', label: 'ज्ञान वृक्ष (Learn Tree)', icon: BookOpen },
  { to: '/lab', label: 'प्रयोग शाला (Test & Verify)', icon: FlaskConical },
];

// 2. Reviewer Experience: Dedicated Evidence & Evaluation Workflow
const reviewerNavLinks = [
  { to: '/review', label: 'Review Queue', icon: ShieldCheck },
  { to: '/sabha', label: 'Sabha Decisions', icon: Users },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout, activeWorkspace, setActiveWorkspace, isReviewer } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentNavLinks = isReviewer && activeWorkspace === 'reviewer' ? reviewerNavLinks : userNavLinks;

  const handleSwitchWorkspace = (mode: 'user' | 'reviewer') => {
    setActiveWorkspace(mode);
    if (mode === 'reviewer') {
      navigate('/review');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream/90 dark:bg-neutral/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-18">
          {/* Logo / Brand with Gita Manuscript Feel */}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Lipi Sabha home">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xl border border-border shadow-soft group-hover:scale-105 transition-transform ${
              isReviewer && activeWorkspace === 'reviewer'
                ? 'bg-mint-dark text-white'
                : 'bg-purple text-white'
            }`}>
              {isReviewer && activeWorkspace === 'reviewer' ? '⚖️' : 'ल'}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black text-ink tracking-tight leading-none">
                Lipi Sabha
              </span>
              <span className="text-[10px] font-serif italic text-purple mt-0.5 font-bold">
                {isReviewer && activeWorkspace === 'reviewer' ? (
                  <span className="text-mint-dark font-extrabold flex items-center gap-1">
                    [ ⚖ Reviewer Studio ]
                  </span>
                ) : (
                  'Sacred & Living Orthographies'
                )}
              </span>
            </div>
          </Link>

          {/* Desktop Center: Two Minimal Header Options */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Unobtrusive Workspace Switcher for Authorized Reviewers */}
            {isReviewer && (
              <div className="flex items-center p-1 rounded-2xl bg-neutral/60 border border-border shadow-soft">
                <button
                  type="button"
                  onClick={() => handleSwitchWorkspace('user')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                    activeWorkspace === 'user'
                      ? 'bg-purple text-white shadow-soft'
                      : 'text-muted hover:text-ink'
                  }`}
                  title="Switch to User discovery experience"
                >
                  <span>🌱</span>
                  <span>User Space</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchWorkspace('reviewer')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-display font-extrabold transition-all cursor-pointer ${
                    activeWorkspace === 'reviewer'
                      ? 'bg-mint-dark text-white shadow-soft'
                      : 'text-muted hover:text-ink'
                  }`}
                  title="Switch to Reviewer evaluation workspace"
                >
                  <span>⚖️</span>
                  <span>Reviewer Space</span>
                </button>
              </div>
            )}

            {/* The 2 Core Navigation Links */}
            <div className="flex items-center gap-1.5 bg-neutral/80 p-1.5 rounded-2xl border border-border shadow-soft">
              {currentNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.to === '/'
                    ? location.pathname === '/' || location.pathname === '/learn'
                    : location.pathname.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-display font-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple text-white shadow-soft -translate-y-0.5'
                        : 'text-ink hover:text-purple hover:bg-white/80 dark:hover:bg-neutral'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-purple'} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Right: Contextual Auth / Profile + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Desktop Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-border/80 hover:border-purple/50 flex items-center justify-center text-ink shadow-soft transition-all cursor-pointer"
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-yellow-dark" />
              ) : (
                <Moon size={17} className="text-purple" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* User Garden Stage Pill */}
                {activeWorkspace === 'user' ? (
                  <Link
                    to="/learn"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mint border border-mint-dark/20 shadow-soft text-xs font-mono font-bold text-mint-dark hover:scale-102 transition-all"
                    title="Your Progress Garden"
                  >
                    <span className="text-base">🌱</span>
                    <span>{user?.learning_xp || 0} XP</span>
                  </Link>
                ) : (
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mint/50 border border-mint-dark/20 shadow-soft text-xs font-mono font-bold text-mint-dark"
                    title="Audited Review XP"
                  >
                    <ShieldCheck size={14} />
                    <span>{user?.review_xp || 650} XP</span>
                  </div>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-border/80 hover:border-purple shadow-soft transition-all cursor-pointer"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple text-white font-mono font-black flex items-center justify-center text-xs">
                      {user?.display_name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs font-display font-black text-ink max-w-[120px] truncate">
                      {user?.display_name}
                    </span>
                    <ChevronDown size={14} className="text-muted" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border-2 border-border shadow-elevated py-2 z-50"
                        role="menu"
                      >
                        <div className="px-4 py-2 border-b border-border">
                          <p className="text-xs font-display font-bold text-ink">{user?.display_name}</p>
                          <p className="text-[11px] text-muted truncate">{user?.email}</p>
                          <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-lilac text-purple">
                            {isReviewer ? 'Reviewer & Community Member' : 'Community Member'}
                          </span>
                        </div>

                        {/* Quick Workspace Switch inside menu */}
                        {isReviewer && (
                          <div className="px-3 py-2 border-b border-border">
                            <span className="text-[10px] font-display font-bold uppercase tracking-wider text-muted block mb-1.5">
                              Current Space
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              <button
                                onClick={() => { handleSwitchWorkspace('user'); setUserMenuOpen(false); }}
                                className={`px-2 py-1.5 rounded-lg text-xs font-display font-bold text-center transition-all ${
                                  activeWorkspace === 'user' ? 'bg-purple text-white' : 'bg-cream text-muted hover:text-ink'
                                }`}
                              >
                                User
                              </button>
                              <button
                                onClick={() => { handleSwitchWorkspace('reviewer'); setUserMenuOpen(false); }}
                                className={`px-2 py-1.5 rounded-lg text-xs font-display font-bold text-center transition-all ${
                                  activeWorkspace === 'reviewer' ? 'bg-mint-dark text-white' : 'bg-cream text-muted hover:text-ink'
                                }`}
                              >
                                Reviewer
                              </button>
                            </div>
                          </div>
                        )}

                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-ink hover:bg-neutral transition-colors"
                          role="menuitem"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <UserIcon size={14} /> My Learning Journal
                        </Link>
                        <Link
                          to="/contributions"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-ink hover:bg-neutral transition-colors"
                          role="menuitem"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <BookOpen size={14} /> My Submissions
                        </Link>

                        <div className="border-t border-border mt-1 pt-1">
                          <button
                            onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-danger hover:bg-danger-light transition-colors w-full text-left cursor-pointer"
                            role="menuitem"
                          >
                            <LogOut size={14} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/sign-in"
                  className="px-4 py-2 rounded-xl text-xs font-display font-extrabold text-muted hover:text-ink transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/learn"
                  className="btn-chunky-purple px-5 py-2 text-xs inline-flex items-center gap-1.5"
                >
                  <Sparkles size={14} />
                  Start Exploring
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-ink bg-neutral border border-border"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t-2 border-border overflow-hidden py-4 space-y-3"
            >
              {/* Workspace Switcher in Mobile Drawer */}
              {isReviewer && (
                <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white border border-border">
                  <button
                    onClick={() => { handleSwitchWorkspace('user'); setMobileOpen(false); }}
                    className={`py-2 text-xs font-display font-extrabold rounded-xl transition-all ${
                      activeWorkspace === 'user' ? 'bg-purple text-white shadow-soft' : 'text-muted'
                    }`}
                  >
                    🌱 User Space
                  </button>
                  <button
                    onClick={() => { handleSwitchWorkspace('reviewer'); setMobileOpen(false); }}
                    className={`py-2 text-xs font-display font-extrabold rounded-xl transition-all ${
                      activeWorkspace === 'reviewer' ? 'bg-mint-dark text-white shadow-soft' : 'text-muted'
                    }`}
                  >
                    ⚖️ Reviewer Space
                  </button>
                </div>
              )}

              {/* Mobile Navigation Links */}
              {currentNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.to === '/'
                    ? location.pathname === '/' || location.pathname === '/learn'
                    : location.pathname.startsWith(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-display font-black transition-all text-left w-full cursor-pointer ${
                      isActive ? 'bg-purple text-white shadow-soft' : 'text-ink hover:text-purple hover:bg-neutral'
                    }`}
                  >
                    <Icon size={18} className={isActive ? 'text-white' : 'text-purple'} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Theme Toggle Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border-2 border-border bg-white text-xs font-display font-black text-ink shadow-soft cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun size={16} className="text-yellow-dark" />
                    ) : (
                      <Moon size={16} className="text-purple" />
                    )}
                    <span>Theme: {theme === 'dark' ? 'Dark Velvet' : 'Warm Cream'}</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-lg bg-neutral text-muted">
                    {theme === 'dark' ? 'Night' : 'Day'}
                  </span>
                </button>
              </div>

              <div className="border-t border-border pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-ink hover:bg-neutral"
                    >
                      <UserIcon size={16} /> My Learning Journal
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-danger hover:bg-danger-light w-full text-left"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      to="/auth/sign-in"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-xl border-2 border-border font-display font-bold text-xs text-ink"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/learn"
                      onClick={() => setMobileOpen(false)}
                      className="btn-chunky-purple w-full text-center py-3 text-xs"
                    >
                      Start Exploring Freely
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
