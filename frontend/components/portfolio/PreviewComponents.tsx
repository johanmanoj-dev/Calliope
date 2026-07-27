import React from 'react';
import type { IPortfolio } from '@shared/types/portfolio';

export function HeroPreview({ hero }: { hero: IPortfolio['hero'] }) {
  return (
    <div className="py-20 text-center border-b">
      {hero?.photoUrl && <img src={hero.photoUrl} alt="Hero" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />}
      <h1 className="text-4xl font-bold">{hero?.name || 'Your Name'}</h1>
      <h2 className="text-xl text-muted-foreground mt-2">{hero?.title || 'Your Title'}</h2>
      <p className="mt-4 max-w-2xl mx-auto">{hero?.introduction || 'Write a short introduction about yourself here.'}</p>
      {hero?.location && <p className="mt-2 text-sm text-muted-foreground">{hero.location}</p>}
    </div>
  );
}

export function AboutPreview({ about }: { about: IPortfolio['about'] }) {
  return (
    <div className="py-12 border-b px-6">
      <h3 className="text-2xl font-bold mb-4">About Me</h3>
      <p className="whitespace-pre-wrap">{about?.biography || 'Your biography goes here.'}</p>
    </div>
  );
}

export function SkillsPreview({ skills }: { skills: IPortfolio['skills'] }) {
  return (
    <div className="py-12 border-b px-6">
      <h3 className="text-2xl font-bold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-4">
        {skills && skills.length > 0 ? (
          skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
              {skill.logoUrl && <img src={skill.logoUrl} alt={skill.name} className="w-5 h-5" />}
              <span className="text-sm font-medium">{skill.name}</span>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}

export function ProjectsPreview({ projects }: { projects: IPortfolio['projects'] }) {
  return (
    <div className="py-12 border-b px-6">
      <h3 className="text-2xl font-bold mb-4">Projects</h3>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              {p.thumbnailUrl && <img src={p.thumbnailUrl} alt={p.title} className="w-full h-40 object-cover" />}
              <div className="p-4">
                <h4 className="font-bold">{p.title}</h4>
                <p className="text-sm mt-2">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No projects added yet.</p>
      )}
    </div>
  );
}

export function FullPortfolioPreview({ portfolio }: { portfolio: IPortfolio | null }) {
  if (!portfolio) {
    return <div className="p-8 text-center text-muted-foreground">Loading preview...</div>;
  }
  return (
    <div className="w-full bg-background shadow-sm border rounded-md overflow-hidden min-h-[800px]">
      <HeroPreview hero={portfolio.hero} />
      <AboutPreview about={portfolio.about} />
      <SkillsPreview skills={portfolio.skills} />
      <ProjectsPreview projects={portfolio.projects} />
      <div className="p-6 text-center text-sm text-muted-foreground">More sections coming in Phase 6...</div>
    </div>
  );
}
