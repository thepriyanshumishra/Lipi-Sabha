'use client';

import React from 'react';
import Link from 'next/link';
import { Feather } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="bg-[#05070D] text-slate-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-900">
          {/* Brand & Purpose Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg border border-amber-500/60 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 flex items-center justify-center shadow-md shadow-amber-950/20 group-hover:border-amber-400 transition-colors">
                <span className="text-lg font-serif font-black text-amber-300">लि</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-base text-slate-100 tracking-tight leading-none group-hover:text-amber-200 transition-colors">
                  Lipi Sabha
                </span>
                <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-amber-400/80 font-medium mt-1">
                  THE SCRIBE ASSEMBLY
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A global community for script research, linguistic fieldwork and language sovereignty.
            </p>

            <p className="text-xs font-serif italic text-amber-400/90 font-medium">
              Evidence, not authority.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {['youtube', 'x', 'instagram', 'facebook'].map((net) => (
                <span
                  key={net}
                  className="w-7 h-7 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer text-xs font-mono uppercase"
                  title={net}
                >
                  {net[0]}
                </span>
              ))}
            </div>
          </div>

          {/* 1. Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projects" className="hover:text-amber-300 transition-colors">
                  Field Projects
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-300 transition-colors">
                  Scribe Quests
                </Link>
              </li>
              <li>
                <a href="#scripts-traditions" className="hover:text-amber-300 transition-colors">
                  Script Archives
                </a>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-300 transition-colors">
                  Research Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* 2. Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#scripts-traditions" className="hover:text-amber-300 transition-colors">
                  Epigraphy Guidelines
                </a>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-300 transition-colors">
                  Transcription Tools
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-300 transition-colors">
                  Learning Materials
                </Link>
              </li>
              <li>
                <a href="#scripts-traditions" className="hover:text-amber-300 transition-colors">
                  Glossary
                </a>
              </li>
              <li>
                <Link href="/coordinator/new-project" className="hover:text-amber-300 transition-colors">
                  For Educators
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sovereign-ethics" className="hover:text-amber-300 transition-colors">
                  Sovereign Governance
                </a>
              </li>
              <li>
                <a href="#sovereign-ethics" className="hover:text-amber-300 transition-colors">
                  Community Principles
                </a>
              </li>
              <li>
                <Link href="/coordinator/new-project" className="hover:text-amber-300 transition-colors">
                  Contribute a Project
                </Link>
              </li>
              <li>
                <Link href="/admin/proposals" className="hover:text-amber-300 transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. About */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
              About
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sovereign-ethics" className="hover:text-amber-300 transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-300 transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-300 transition-colors">
                  Research Credits
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>&copy; 2026 Lipi Sabha. All rights reserved.</div>
          <div className="flex items-center gap-2 font-serif italic text-slate-400">
            <span>Languages live through people.</span>
            <span className="text-amber-400 not-italic font-sans">Let us write futures together.</span>
            <span className="text-amber-400 not-italic">🪶</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
