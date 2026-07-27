'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { FullPortfolioPreview } from '@/components/portfolio/PreviewComponents';

const sections = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Settings' },
];

export default function BuilderPage() {
  const { portfolio, activeSection, setActiveSection } = usePortfolio();

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden border rounded-xl bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-slate-50/50 dark:bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b font-semibold">Builder</div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === sec.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Editor Panel (Placeholder for Phase 6) */}
      <section className="w-80 border-r bg-card flex flex-col">
        <div className="p-4 border-b font-semibold capitalize">{activeSection} Editor</div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-muted-foreground">
            Editor form for <strong>{activeSection}</strong> will be implemented in Phase 6.
          </p>
        </div>
      </section>

      {/* Live Preview Pane */}
      <main className="flex-1 bg-slate-100 dark:bg-slate-950 overflow-y-auto p-4 md:p-8 flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live Preview</h2>
            <Button variant="outline" size="sm" onClick={() => window.open(`/p/${portfolio?.slug}`, '_blank')}>
              View Public Page
            </Button>
          </div>
          
          <FullPortfolioPreview portfolio={portfolio} />
        </div>
      </main>
    </div>
  );
}
