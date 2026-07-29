'use client';

import React, { useState } from 'react';
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
import {
  Loader2, ExternalLink, Link as LinkIcon,
  Send, ArrowLeft, User, BookOpen, Code, Briefcase, GraduationCap,
  Phone, Settings, LayoutTemplate, Eye, PanelLeft
} from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@shared/constants/routes';

const sections = [
  { id: 'hero',       label: 'Hero',       icon: User },
  { id: 'about',      label: 'About',      icon: BookOpen },
  { id: 'skills',     label: 'Skills',     icon: Code },
  { id: 'projects',   label: 'Projects',   icon: LayoutTemplate },
  { id: 'education',  label: 'Education',  icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'contact',    label: 'Contact',    icon: Phone },
  { id: 'settings',   label: 'Settings',   icon: Settings },
];

type MobileTab = 'sections' | 'editor' | 'preview';

export default function BuilderPage() {
  const queryClient = useQueryClient();
  const { portfolio, activeSection, setActiveSection, updatePortfolio } = usePortfolio();
  const { saveStatus } = useAutoSave(portfolio);
  const [mobileTab, setMobileTab] = useState<MobileTab>('editor');

  const publishMutation = useMutation({
    mutationFn: () => {
      if (!portfolio?._id) throw new Error('No portfolio ID');
      return portfolioService.publishPortfolio(portfolio._id);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['portfolio', 'me'], data);
    },
  });

  const handleCopyLink = () => {
    if (portfolio?.publishedUrl) {
      navigator.clipboard.writeText(portfolio.publishedUrl);
    }
  };

  const activeLabel = sections.find(s => s.id === activeSection)?.label ?? activeSection;

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':       return <HeroEditor />;
      case 'about':      return <AboutEditor />;
      case 'skills':     return <SkillsEditor />;
      case 'projects':   return <ProjectsEditor />;
      case 'education':  return <EducationEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'contact':    return <ContactEditor />;
      case 'settings':   return <SettingsEditor />;
      default:           return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] overflow-hidden">

      {/* ── Top Bar ───────────────────────────────────────────────── */}
      <header className="shrink-0 h-11 border-b flex items-center justify-between px-4 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="h-7 px-2 text-muted-foreground hover:text-foreground">
            <Link href={FRONTEND_ROUTES.DASHBOARD}>
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Back</span>
            </Link>
          </Button>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm font-semibold tracking-tight text-foreground">Builder</span>
        </div>

        <div className="flex items-center gap-2">
          {portfolio?.isPublished ? (
            <>
              <Button variant="ghost" size="sm" className="h-7 px-2 sm:px-3 text-xs" onClick={handleCopyLink}>
                <LinkIcon className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Copy Link</span>
              </Button>
              <Button size="sm" className="h-7 px-2 sm:px-3 text-xs" onClick={() => window.open(`/p/${portfolio.slug}`, '_blank')}>
                <ExternalLink className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">View Live</span>
              </Button>
            </>
          ) : (
            <Button size="sm" className="h-7 px-3 text-xs" onClick={() => publishMutation.mutate()} disabled={publishMutation.isPending}>
              {publishMutation.isPending
                ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                : <Send className="w-3.5 h-3.5 mr-1.5" />}
              Publish
            </Button>
          )}
        </div>
      </header>

      {/* ── DESKTOP: Three-pane workspace ─────────────────────────── */}
      <div className="hidden md:flex flex-1 overflow-hidden">

        {/* Pane 1 — Section Navigator */}
        <aside className="w-[180px] shrink-0 border-r flex flex-col bg-muted/20">
          <div className="px-4 pt-4 pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Sections</p>
          </div>
          <nav className="flex-1 overflow-y-auto px-2.5 pb-3 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeSection === id
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium truncate">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Pane 2 — Section Editor */}
        <section className="w-[380px] shrink-0 border-r flex flex-col bg-muted/30">
          <div className="shrink-0 px-4 py-3 border-b flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground capitalize">{activeLabel}</h2>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Editor</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {renderEditor()}
          </div>
        </section>

        {/* Pane 3 — Live Preview */}
        <main className="flex-1 min-w-0 flex flex-col bg-muted/30 overflow-hidden">
          <div className="shrink-0 px-5 py-2.5 border-b flex items-center justify-between">
            <span className="text-sm font-extrabold tracking-tight text-foreground">Live Preview</span>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 font-bold text-foreground" title="Page Background Color">
                <span>Page Background:</span>
                <input
                  type="color"
                  value={portfolio?.themeSettings?.bgColor?.startsWith('#') ? portfolio.themeSettings.bgColor : '#F2EAE0'}
                  onChange={(e) => updatePortfolio({ themeSettings: { ...portfolio?.themeSettings, bgColor: e.target.value } })}
                  className="w-6 h-6 rounded-full border-2 border-black/20 cursor-pointer bg-transparent shadow-xs transition-transform hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-2 font-bold text-foreground" title="Card Surface Color">
                <span>Card Surface:</span>
                <input
                  type="color"
                  value={portfolio?.themeSettings?.cardBgColor?.startsWith('#') ? portfolio.themeSettings.cardBgColor : '#FFFFFF'}
                  onChange={(e) => updatePortfolio({ themeSettings: { ...portfolio?.themeSettings, cardBgColor: e.target.value } })}
                  className="w-6 h-6 rounded-full border-2 border-black/20 cursor-pointer bg-transparent shadow-xs transition-transform hover:scale-110"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-5xl mx-auto">
              <FullPortfolioPreview portfolio={portfolio} />
            </div>
          </div>
        </main>
      </div>

      {/* ── MOBILE: Single pane + bottom tab bar ──────────────────── */}
      <div className="flex md:hidden flex-col flex-1 overflow-hidden">

        {/* Pane content */}
        <div className="flex-1 overflow-hidden flex flex-col">

          {/* Sections tab */}
          {mobileTab === 'sections' && (
            <div className="flex-1 overflow-y-auto bg-muted/20">
              <div className="px-4 pt-4 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Sections</p>
              </div>
              <nav className="px-3 pb-4 space-y-1">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveSection(id as any); setMobileTab('editor'); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeSection === id
                        ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Editor tab */}
          {mobileTab === 'editor' && (
            <div className="flex-1 overflow-y-auto flex flex-col bg-muted/30">
              <div className="shrink-0 px-4 py-3 border-b flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground capitalize">{activeLabel}</h2>
                <button
                  onClick={() => setMobileTab('sections')}
                  className="text-xs text-primary font-medium px-2 py-1 rounded-md hover:bg-muted"
                >
                  Change section
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {renderEditor()}
              </div>
            </div>
          )}

          {/* Preview tab */}
          {mobileTab === 'preview' && (
            <div className="flex-1 overflow-y-auto flex flex-col bg-muted/30">
              <div className="shrink-0 px-4 py-2.5 border-b flex items-center justify-between">
                <span className="text-sm font-extrabold tracking-tight text-foreground">Live Preview</span>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span>BG:</span>
                    <input
                      type="color"
                      value={portfolio?.themeSettings?.bgColor?.startsWith('#') ? portfolio.themeSettings.bgColor : '#F2EAE0'}
                      onChange={(e) => updatePortfolio({ themeSettings: { ...portfolio?.themeSettings, bgColor: e.target.value } })}
                      className="w-6 h-6 rounded-full border-2 border-black/20 cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <span>Card:</span>
                    <input
                      type="color"
                      value={portfolio?.themeSettings?.cardBgColor?.startsWith('#') ? portfolio.themeSettings.cardBgColor : '#FFFFFF'}
                      onChange={(e) => updatePortfolio({ themeSettings: { ...portfolio?.themeSettings, cardBgColor: e.target.value } })}
                      className="w-6 h-6 rounded-full border-2 border-black/20 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                <FullPortfolioPreview portfolio={portfolio} />
              </div>
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <div className="shrink-0 h-14 border-t bg-background/95 backdrop-blur-sm flex items-center">
          {([
            { tab: 'sections' as MobileTab, icon: PanelLeft, label: 'Sections' },
            { tab: 'editor'   as MobileTab, icon: BookOpen,  label: 'Editor'   },
            { tab: 'preview'  as MobileTab, icon: Eye,       label: 'Preview'  },
          ] as const).map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
                mobileTab === tab ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
