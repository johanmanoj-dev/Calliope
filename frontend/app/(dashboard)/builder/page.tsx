'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useAutoSave } from '@/hooks/useAutoSave';
import { Button } from '@/components/ui/button';
import { FullPortfolioPreview } from '@/components/portfolio/PreviewComponents';
import { HeroEditor } from '@/components/portfolio/editors/HeroEditor';
import { AboutEditor } from '@/components/portfolio/editors/AboutEditor';
import { SkillsEditor } from '@/components/portfolio/editors/SkillsEditor';
import { ProjectsEditor } from '@/components/portfolio/editors/ProjectsEditor';
import { EducationEditor } from '@/components/portfolio/editors/EducationEditor';
import { ExperienceEditor } from '@/components/portfolio/editors/ExperienceEditor';
import { ContactEditor } from '@/components/portfolio/editors/ContactEditor';
import { SettingsEditor } from '@/components/portfolio/editors/SettingsEditor';
import { Check, Loader2, CloudOff } from 'lucide-react';

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
  const { saveStatus } = useAutoSave(portfolio);

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero': return <HeroEditor />;
      case 'about': return <AboutEditor />;
      case 'skills': return <SkillsEditor />;
      case 'projects': return <ProjectsEditor />;
      case 'education': return <EducationEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'contact': return <ContactEditor />;
      case 'settings': return <SettingsEditor />;
      default: return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden border rounded-xl bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r bg-slate-50/50 dark:bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between font-semibold">
          <span>Builder</span>
          <div className="flex items-center text-xs text-muted-foreground">
            {saveStatus === 'saving' && <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Saving</>}
            {saveStatus === 'saved' && <><Check className="w-3 h-3 mr-1 text-green-500" /> Saved</>}
            {saveStatus === 'error' && <><CloudOff className="w-3 h-3 mr-1 text-destructive" /> Error</>}
          </div>
        </div>
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

      {/* Editor Panel */}
      <section className="w-96 border-r bg-card flex flex-col">
        <div className="p-4 border-b font-semibold capitalize">{activeSection} Editor</div>
        <div className="flex-1 overflow-y-auto p-4">
          {renderEditor()}
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
