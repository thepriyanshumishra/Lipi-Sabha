import React from 'react';
import { SiteHeader } from '@/components/landing/site-header';
import { HeroSection } from '@/components/landing/hero-section';
import { TelemetryStrip } from '@/components/landing/telemetry-strip';
import { FieldworkArchitecture } from '@/components/landing/fieldwork-architecture';
import { ScriptShowcase } from '@/components/landing/script-showcase';
import { ActiveFieldStudies } from '@/components/landing/active-field-studies';
import { EthicsCharter } from '@/components/landing/ethics-charter';
import { SiteFooter } from '@/components/landing/site-footer';

export const metadata = {
  title: 'Lipi Sabha — The Scribe Assembly | Script Fieldwork & Research',
  description: 'A collaborative platform to document, compare and preserve the written heritage of our languages.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Section A: Global Navigation */}
      <SiteHeader />

      {/* Main Continuous Homepage Stream */}
      <main className="flex-1">
        {/* Section B: Hero with Decipherment Sandbox */}
        <HeroSection />

        {/* Section C: Fieldwork Telemetry */}
        <TelemetryStrip />

        {/* Section D: Empirical Fieldwork Architecture (Warm Parchment) */}
        <FieldworkArchitecture />

        {/* Section E: Scripts & Writing Traditions (Dark Ink Showcase) */}
        <ScriptShowcase />

        {/* Section F: Active Field Studies (Warm Parchment) */}
        <ActiveFieldStudies />

        {/* Section G: Sovereign Ethics Charter */}
        <EthicsCharter />
      </main>

      {/* Section H: Site Footer */}
      <SiteFooter />
    </div>
  );
}
