'use client';

import React from 'react';
import { Landmark, Scroll, Compass, Award } from 'lucide-react';

export function TelemetryStrip() {
  const metrics = [
    {
      icon: <Landmark className="w-5 h-5 text-amber-400" />,
      value: '1,482',
      label: 'Active Scribes',
    },
    {
      icon: <Scroll className="w-5 h-5 text-amber-400" />,
      value: '12,560',
      label: 'Fieldwork Quests Completed',
    },
    {
      icon: <Compass className="w-5 h-5 text-amber-400" />,
      value: '37',
      label: 'Scripts in Focus',
    },
    {
      icon: <Award className="w-5 h-5 text-amber-400" />,
      value: '18',
      label: 'Orthographic Consensus Studies',
    },
  ];

  return (
    <div className="w-full bg-[#080B12] border-t border-b border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Demo Data Tag Badge */}
        <div className="flex-shrink-0">
          <span className="px-2.5 py-1 rounded border border-slate-800 bg-slate-900/60 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            DEMO DATA
          </span>
        </div>

        {/* 4 Stat Columns with Dividers */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          {metrics.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3.5 ${
                index > 0 ? 'lg:pl-8' : ''
              } ${index % 2 !== 0 ? 'pt-4 lg:pt-0' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center flex-shrink-0 shadow-inner">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs text-slate-400 font-medium leading-none mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
