'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, ArrowRight, ShieldCheck, Scroll } from 'lucide-react';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-[#070A12]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Monogram & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg border border-amber-500/60 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 flex items-center justify-center shadow-md shadow-amber-950/20 group-hover:border-amber-400 transition-colors">
            <span className="text-xl font-serif font-black text-amber-300 select-none">लि</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-lg text-slate-100 tracking-tight leading-none group-hover:text-amber-200 transition-colors">
              Lipi Sabha
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-amber-400/80 font-medium mt-1">
              THE SCRIBE ASSEMBLY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-slate-300">
          <Link href="/projects" className="hover:text-amber-300 transition-colors">
            Field Projects
          </Link>
          <Link href="/dashboard" className="hover:text-amber-300 transition-colors">
            Scribe Quests
          </Link>
          <a href="#scripts-traditions" className="hover:text-amber-300 transition-colors">
            Script Archives
          </a>
          <a href="#sovereign-ethics" className="hover:text-amber-300 transition-colors">
            Sovereign Governance
          </a>
        </nav>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Search Trigger */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
                <input
                  type="text"
                  placeholder="Search scripts, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-white text-xs focus:outline-none w-36"
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white ml-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
                aria-label="Search scripts"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Scribe Sign In */}
          <Link
            href="/login"
            className="px-3.5 py-2 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-xs font-semibold text-slate-200 hover:text-white transition-all"
          >
            Scribe Sign In
          </Link>

          {/* Join Assembly Primary Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E5A93C] hover:bg-[#F3BA52] text-slate-950 text-xs font-bold shadow-md shadow-amber-950/20 active:translate-y-0.5 transition-all"
          >
            <span>Join the Scribe Assembly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900/70 flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070A12] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Field Projects
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Scribe Quests
            </Link>
            <a
              href="#scripts-traditions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Script Archives
            </a>
            <a
              href="#sovereign-ethics"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-300"
            >
              Sovereign Governance
            </a>
          </nav>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-slate-800 text-xs font-semibold text-slate-200"
            >
              Scribe Sign In
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#E5A93C] text-slate-950 text-xs font-bold"
            >
              Join the Scribe Assembly &rarr;
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
