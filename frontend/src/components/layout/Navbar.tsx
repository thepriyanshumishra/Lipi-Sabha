import { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  Check
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLipi } from '@/contexts/LipiContext';
import { UserSwitcherModal } from '@/components/UserSwitcherModal';
import { LeaderboardModal } from '@/components/LeaderboardModal';
import { playAcousticChime } from '@/utils/audio';

// 1. User Experience: Two Dedicated Pages (Learn Tree & Script Studio)
const userNavLinks = [
  { to: '/', label: 'ज्ञान वृक्ष (Learn Tree)', icon: BookOpen },
  { to: '/lab', label: 'प्रयोग शाला (Test & Verify)', icon: FlaskConical },
];

// 2. Reviewer Experience: Dedicated Evidence & Evaluation Workflow (No Prayog Shala)
const reviewerNavLinks = [
  { to: '/review', label: 'Review Queue & Tree Editor', icon: ShieldCheck },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [lipiDropdownOpen, setLipiDropdownOpen] = useState(false);
  const [userSwitcherOpen, setUserSwitcherOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState<'learners' | 'reviewers'>('learners');
  const lipiMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout, activeWorkspace, setActiveWorkspace, isReviewer } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activeLipi, setLipiId, allLipis } = useLipi();
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

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (lipiMenuRef.current && !lipiMenuRef.current.contains(event.target as Node)) {
        setLipiDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 dark:bg-neutral/95 backdrop-blur-md border-b-[1.5px] border-border select-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-18 gap-2 sm:gap-4">
          
          {/* Logo / Brand with Dynamic Lipi Glyph */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Lipi Sabha home">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-xl border-[1.5px] border-[#78350F]/20 dark:border-amber-900/40 shadow-soft group-hover:scale-105 transition-transform ${
              isReviewer && activeWorkspace === 'reviewer'
                ? 'bg-mint-dark text-white'
                : 'bg-[#B45309] text-white shadow-amber-900/20'
            }`}>
              {isReviewer && activeWorkspace === 'reviewer' ? '⚖️' : activeLipi.symbol}
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black text-ink tracking-tight leading-none">
                Lipi Sabha
              </span>
              <span className="text-[10px] font-serif italic text-purple mt-0.5 font-bold truncate max-w-[170px] sm:max-w-none">
                {isReviewer && activeWorkspace === 'reviewer' ? (
                  <span className="text-mint-dark font-extrabold flex items-center gap-1">
                    [ ⚖ Reviewer Studio ]
                  </span>
                ) : (
                  `${activeLipi.nameNative} • ${activeLipi.nameEnglish}`
                )}
              </span>
            </div>
          </Link>

          {/* Desktop Center: Two Minimal Header Options */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Unobtrusive Workspace Switcher for Authorized Reviewers */}
            {isReviewer && (
              <div className="flex items-center p-1 rounded-2xl bg-neutral/60 border-[1.5px] border-border shadow-soft">
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
            <div className="flex items-center gap-1.5 bg-neutral/80 p-1.5 rounded-2xl border-[1.5px] border-border shadow-soft">
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

          {/* Desktop Right: Contextual Auth / Profile + Theme Toggle + Lipi Selector Dropdown */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Desktop Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border/80 hover:border-purple/50 flex items-center justify-center text-ink shadow-soft transition-all cursor-pointer"
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
                {/* Live Real-time XP Pill - Contextual for Learner vs Reviewer */}
                {isReviewer ? (
                  <button
                    type="button"
                    onClick={() => {
                      setLeaderboardTab('reviewers');
                      setLeaderboardOpen(true);
                      playAcousticChime(620, 0.25);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-[1.5px] border-[#78350F]/40 shadow-soft text-xs font-mono font-bold text-[#78350F] dark:text-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                    title="Click to view Specialist Reviewer Leaderboard 🏆"
                  >
                    <ShieldCheck size={14} className="text-[#B45309] group-hover:rotate-12 transition-transform" />
                    <span>{user?.review_xp || 650} Review XP</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setLeaderboardTab('learners');
                      setLeaderboardOpen(true);
                      playAcousticChime(560, 0.25);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-mint border-[1.5px] border-mint-dark/30 shadow-soft text-xs font-mono font-bold text-mint-dark hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                    title="Click to view Sovereign Community Leaderboard 🏆"
                  >
                    <span className="text-base group-hover:rotate-12 transition-transform">🌱</span>
                    <span>{user?.learning_xp || 0} XP</span>
                  </button>
                )}

                {/* Profile Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setLipiDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border-[1.5px] border-border/80 hover:border-purple shadow-soft transition-all cursor-pointer"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple text-white font-mono font-black flex items-center justify-center text-xs">
                      {user?.display_name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs font-display font-black text-ink max-w-[100px] truncate">
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
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border-[1.5px] border-border shadow-elevated py-2 z-50"
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

                        <div className="px-2 py-1 border-b border-border">
                          <button
                            type="button"
                            onClick={() => {
                              setUserSwitcherOpen(true);
                              setUserMenuOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#78350F] dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors w-full text-left cursor-pointer"
                          >
                            <Users size={14} className="text-[#B45309]" />
                            <span>Switch / Create Persona...</span>
                          </button>
                        </div>

                        <div className="px-2 py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-ink hover:bg-neutral transition-colors"
                          >
                            <UserIcon size={14} className="text-muted" />
                            <span>My Learning Journal</span>
                          </Link>
                          <button
                            onClick={() => { logout(); setUserMenuOpen(false); navigate('/'); }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-danger hover:bg-danger-light w-full text-left transition-colors cursor-pointer"
                          >
                            <LogOut size={14} />
                            <span>Sign Out</span>
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
                  className="px-3 py-1.5 rounded-xl border-[1.5px] border-border hover:border-purple text-xs font-display font-bold text-ink hover:text-purple transition-all"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* ========================================================
                LIPI SELECTOR DROPDOWN (Circled in Red by User)
                Switches the entire active writing system across both
                ज्ञान वृक्ष (Learn Tree) and प्रयोग शाला (Test & Verify)
                ======================================================== */}
            <div className="relative" ref={lipiMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setLipiDropdownOpen(!lipiDropdownOpen);
                  setUserMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFDF8] dark:bg-slate-800 border-[1.5px] border-[#78350F]/25 dark:border-amber-900/40 hover:border-[#78350F]/60 shadow-soft transition-all cursor-pointer group"
                aria-label="Select Writing System (Lipi)"
                aria-expanded={lipiDropdownOpen}
                aria-haspopup="true"
                title="Select active script (Lipi)"
              >
                {/* Script Glyph Emblem */}
                <div className="w-6 h-6 rounded-lg bg-[#78350F]/10 dark:bg-amber-950/60 border border-[#78350F]/20 flex items-center justify-center font-serif font-black text-xs text-[#78350F] dark:text-amber-300 group-hover:scale-105 transition-transform">
                  {activeLipi.symbol}
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-[#78350F]/70 dark:text-amber-400/80">
                    Lipi
                  </span>
                  <span className="text-xs font-display font-black text-ink leading-none">
                    {activeLipi.nameNative}
                  </span>
                </div>

                <ChevronDown
                  size={13}
                  className={`text-[#78350F]/70 dark:text-amber-400/80 transition-transform duration-200 ${
                    lipiDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {lipiDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 bg-[#FFFDF8] dark:bg-slate-900 rounded-2xl border-[1.5px] border-[#78350F]/25 dark:border-amber-900/40 shadow-elevated p-1.5 z-50 space-y-0.5"
                    role="menu"
                  >
                    {allLipis.map((lipi) => {
                      const isSelected = lipi.id === activeLipi.id;
                      return (
                        <button
                          key={lipi.id}
                          type="button"
                          onClick={() => {
                            setLipiId(lipi.id);
                            setLipiDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl transition-all flex items-center justify-between gap-2.5 cursor-pointer group ${
                            isSelected
                              ? 'bg-amber-100/70 dark:bg-amber-950/50 text-[#78350F] dark:text-amber-300 font-bold'
                              : 'hover:bg-neutral/80 dark:hover:bg-slate-800 text-ink'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-serif font-black text-sm shrink-0 transition-transform ${
                                isSelected
                                  ? 'bg-[#78350F] text-white shadow-soft'
                                  : 'bg-[#78350F]/10 dark:bg-amber-950/60 text-[#78350F] dark:text-amber-300 group-hover:scale-105'
                              }`}
                            >
                              {lipi.symbol}
                            </div>
                            <span className="font-display font-bold text-xs truncate">
                              {lipi.nameNative}{' '}
                              <span className="text-muted font-sans font-normal text-[11px]">
                                ({lipi.nameEnglish})
                              </span>
                            </span>
                          </div>

                          {isSelected && (
                            <Check size={14} className="text-[#78350F] dark:text-amber-400 shrink-0" strokeWidth={2.5} />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Mobile Right Controls: Lipi Badge + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Quick Lipi Button on mobile */}
            <button
              type="button"
              onClick={() => {
                const nextIdx = (allLipis.findIndex((l) => l.id === activeLipi.id) + 1) % allLipis.length;
                setLipiId(allLipis[nextIdx].id);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF8] dark:bg-slate-800 border-[1.5px] border-[#78350F]/30 text-xs font-serif font-bold text-[#78350F] dark:text-amber-300 shadow-soft"
              title="Tap to cycle active Lipi"
            >
              <span>{activeLipi.symbol}</span>
              <span className="text-[10px] font-mono font-semibold">{activeLipi.nameNative}</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl border-[1.5px] border-border text-ink hover:bg-neutral transition-colors cursor-pointer"
              aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t-[1.5px] border-border py-4 space-y-3"
            >
              {/* Mobile Lipi Selector Block */}
              <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border-[1.5px] border-[#78350F]/20 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#78350F] dark:text-amber-400 block">
                  Select Active Lipi (Writing System)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {allLipis.map((lipi) => {
                    const isSelected = lipi.id === activeLipi.id;
                    return (
                      <button
                        key={lipi.id}
                        type="button"
                        onClick={() => {
                          setLipiId(lipi.id);
                          setMobileOpen(false);
                        }}
                        className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-[#78350F] text-white shadow-soft font-bold'
                            : 'bg-white dark:bg-slate-800 border border-border text-ink'
                        }`}
                      >
                        <span className="text-sm font-serif font-black">{lipi.symbol}</span>
                        <span className="text-xs truncate">{lipi.nameNative}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Workspace Switcher inside mobile */}
              {isReviewer && (
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral/80 rounded-2xl border-[1.5px] border-border">
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
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border-[1.5px] border-border bg-white dark:bg-slate-800 text-xs font-display font-black text-ink shadow-soft cursor-pointer"
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

              <div className="border-t-[1.5px] border-border pt-3 mt-3">
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
                      className="w-full text-center py-2.5 rounded-xl border-[1.5px] border-border font-display font-bold text-xs text-ink"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* User Switcher & Instance Creator Modal */}
      <UserSwitcherModal
        isOpen={userSwitcherOpen}
        onClose={() => setUserSwitcherOpen(false)}
      />

      {/* Sovereign Community & Reviewer Leaderboard Modal */}
      <LeaderboardModal
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        defaultTab={leaderboardTab}
      />
    </header>
  );
}
