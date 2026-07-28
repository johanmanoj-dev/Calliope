import React from 'react';
import type { IPortfolio } from '@shared/types/portfolio';
import { FileText, MapPin, ExternalLink, Link2, Globe, Code2 } from 'lucide-react';

interface PreviewProps {
  portfolio: IPortfolio | null;
}

function getFieldStyle(fieldStyles: Record<string, any> | undefined, fieldKey: string, fallbackColor: string) {
  const fs = fieldStyles?.[fieldKey];
  if (!fs) return { color: fallbackColor };
  return {
    color: fs.color || fallbackColor,
    fontFamily: fs.fontFamily || undefined,
    fontWeight: fs.isBold ? ('bold' as const) : undefined,
  };
}

export function HeroPreview({ hero, accentColor, textColor, fieldStyles }: { hero: IPortfolio['hero']; accentColor: string; textColor: string; fieldStyles?: Record<string, any> }) {
  return (
    <div className="py-16 text-center border-b border-black/5" style={{ color: textColor }}>
      {hero?.photoUrl && (
        <img src={hero.photoUrl} alt="Profile" className="w-28 h-28 rounded-full mx-auto mb-5 object-cover ring-4 ring-black/5 shadow-md" />
      )}
      <h1
        className="text-3xl sm:text-4xl font-extrabold tracking-tight transition-all"
        style={getFieldStyle(fieldStyles, 'hero.name', textColor)}
      >
        {hero?.name || 'Your Name'}
      </h1>
      <h2
        className="text-lg font-semibold mt-1.5 opacity-90 transition-all"
        style={getFieldStyle(fieldStyles, 'hero.title', accentColor)}
      >
        {hero?.title || 'Your Title'}
      </h2>
      <p
        className="mt-3.5 max-w-xl mx-auto text-sm leading-relaxed px-6 transition-all"
        style={getFieldStyle(fieldStyles, 'hero.introduction', textColor)}
      >
        {hero?.introduction || 'Write a short introduction about yourself here.'}
      </p>
      <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
        {hero?.location && (
          <span className="flex items-center gap-1 text-xs opacity-75">
            <MapPin className="w-3.5 h-3.5" /> {hero.location}
          </span>
        )}
        {hero?.resumeUrl && (
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full text-white shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: fieldStyles?.['hero.resumeButton']?.color || accentColor }}
          >
            <FileText className="w-3.5 h-3.5" /> View Resume
          </a>
        )}
      </div>
    </div>
  );
}

export function AboutPreview({ about, accentColor, textColor, fieldStyles }: { about: IPortfolio['about']; accentColor: string; textColor: string; fieldStyles?: Record<string, any> }) {
  if (!about?.biography && !about?.personalIntro && !about?.careerInterests && !about?.professionalGoals && !about?.areasOfExpertise) {
    return (
      <div className="py-10 border-b border-black/5 px-8" style={{ color: textColor }}>
        <h3 className="text-xl font-bold mb-2">About Me</h3>
        <p className="text-sm opacity-60">Your about section goes here.</p>
      </div>
    );
  }
  return (
    <div className="py-10 border-b border-black/5 px-4 sm:px-8 space-y-5" style={{ color: textColor }}>
      <h3 className="text-xl font-bold tracking-tight">About Me</h3>
      {about?.biography && (
        <p
          className="whitespace-pre-wrap leading-relaxed text-sm transition-all"
          style={getFieldStyle(fieldStyles, 'about.biography', textColor)}
        >
          {about.biography}
        </p>
      )}
      {about?.personalIntro && (
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: accentColor }}>Personal Intro</h4>
          <p
            className="whitespace-pre-wrap leading-relaxed text-sm transition-all"
            style={getFieldStyle(fieldStyles, 'about.personalIntro', textColor)}
          >
            {about.personalIntro}
          </p>
        </div>
      )}
      {about?.areasOfExpertise && (
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: accentColor }}>Areas of Expertise</h4>
          <p
            className="whitespace-pre-wrap leading-relaxed text-sm transition-all"
            style={getFieldStyle(fieldStyles, 'about.areasOfExpertise', textColor)}
          >
            {about.areasOfExpertise}
          </p>
        </div>
      )}
      {about?.careerInterests && (
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: accentColor }}>Career Interests</h4>
          <p className="whitespace-pre-wrap leading-relaxed text-sm opacity-90">{about.careerInterests}</p>
        </div>
      )}
      {about?.professionalGoals && (
        <div>
          <h4 className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: accentColor }}>Professional Goals</h4>
          <p className="whitespace-pre-wrap leading-relaxed text-sm opacity-90">{about.professionalGoals}</p>
        </div>
      )}
    </div>
  );
}

export function SkillsPreview({ skills, accentColor, textColor }: { skills: IPortfolio['skills']; accentColor: string; textColor: string }) {
  return (
    <div className="py-10 border-b border-black/5 px-4 sm:px-8" style={{ color: textColor }}>
      <h3 className="text-xl font-bold mb-4 tracking-tight">Skills</h3>
      <div className="flex flex-wrap gap-2.5">
        {skills && skills.length > 0 ? (
          skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-black/5 shadow-xs"
              style={{ backgroundColor: `${accentColor}12`, color: textColor }}
            >
              {skill.logoUrl && <img src={skill.logoUrl} alt={skill.name} className="w-4 h-4 object-contain" />}
              <span>{skill.name}</span>
            </div>
          ))
        ) : (
          <p className="text-xs opacity-60">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}

export function ProjectsPreview({ projects, accentColor, textColor }: { projects: IPortfolio['projects']; accentColor: string; textColor: string }) {
  return (
    <div className="py-10 border-b border-black/5 px-4 sm:px-8" style={{ color: textColor }}>
      <h3 className="text-xl font-bold mb-5 tracking-tight">Projects</h3>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <div key={i} className="border border-black/10 rounded-xl overflow-hidden shadow-sm bg-black/5 flex flex-col justify-between">
              {p.thumbnailUrl && <img src={p.thumbnailUrl} alt={p.title} className="w-full h-40 object-cover" />}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-base">{p.title}</h4>
                  <p className="text-xs mt-1.5 opacity-80 leading-relaxed">{p.description}</p>
                </div>
                <div>
                  {p.technologies && p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {p.technologies.map((t, ti) => (
                        <span key={ti} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/10 opacity-90">{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3 mt-3.5 pt-2 border-t border-black/5 text-xs font-semibold">
                    {p.sourceLink && (
                      <a href={p.sourceLink} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1" style={{ color: accentColor }}>
                        <ExternalLink className="w-3 h-3" /> Code
                      </a>
                    )}
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1" style={{ color: accentColor }}>
                        <ExternalLink className="w-3 h-3" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs opacity-60">No projects added yet.</p>
      )}
    </div>
  );
}

export function EducationPreview({ education, accentColor, textColor, fieldStyles }: { education: IPortfolio['education']; accentColor: string; textColor: string; fieldStyles?: Record<string, any> }) {
  if (!education || education.length === 0) return null;
  return (
    <div className="py-10 border-b border-black/5 px-4 sm:px-8" style={{ color: textColor }}>
      <h3 className="text-xl font-bold mb-5 tracking-tight">Education</h3>
      <div className="space-y-4">
        {education.map((edu, i) => {
          const borderColor = fieldStyles?.[`education.${i}.lineColor`]?.color || accentColor;
          return (
            <div key={i} className="pl-4 border-l-2" style={{ borderColor: borderColor }}>
              <h4 className="font-bold text-base">{edu.institution}</h4>
              <p className="text-xs opacity-80">{edu.degree}</p>
              <p className="text-[11px] opacity-60 mt-0.5">{edu.duration}</p>
              {edu.description && <p className="mt-1.5 text-xs leading-relaxed opacity-90">{edu.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ExperiencePreview({ experience, accentColor, textColor, fieldStyles }: { experience: IPortfolio['experience']; accentColor: string; textColor: string; fieldStyles?: Record<string, any> }) {
  if (!experience || experience.length === 0) return null;
  return (
    <div className="py-10 border-b border-black/5 px-4 sm:px-8" style={{ color: textColor }}>
      <h3 className="text-xl font-bold mb-5 tracking-tight">Experience</h3>
      <div className="space-y-4">
        {experience.map((exp, i) => {
          const borderColor = fieldStyles?.[`experience.${i}.lineColor`]?.color || accentColor;
          return (
            <div key={i} className="pl-4 border-l-2" style={{ borderColor: borderColor }}>
              <h4 className="font-bold text-base">{exp.position}</h4>
              <p className="text-xs opacity-80">{exp.organization}</p>
              <p className="text-[11px] opacity-60 mt-0.5">{exp.period}</p>
              {exp.description && <p className="mt-1.5 text-xs leading-relaxed opacity-90">{exp.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ContactPreview({ contact, accentColor, textColor, fieldStyles }: { contact: IPortfolio['contact']; accentColor: string; textColor: string; fieldStyles?: Record<string, any> }) {
  if (!contact) return null;
  const hasLinks = contact.email || contact.linkedin || contact.github || contact.website;
  if (!hasLinks) return null;

  return (
    <div className="py-10 px-4 sm:px-8" style={{ color: textColor }}>
      <h3 className="text-xl font-bold mb-4 tracking-tight">Contact</h3>
      <div className="flex flex-wrap gap-3 text-xs font-semibold">
        {contact.email && (
          <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:underline" style={{ color: fieldStyles?.['contact.email']?.color || accentColor }}>
            <Globe className="w-3.5 h-3.5" /> {contact.email}
          </a>
        )}
        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: fieldStyles?.['contact.linkedin']?.color || accentColor }}>
            <Link2 className="w-3.5 h-3.5" /> LinkedIn
          </a>
        )}
        {contact.github && (
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: fieldStyles?.['contact.github']?.color || accentColor }}>
            <Code2 className="w-3.5 h-3.5" /> GitHub
          </a>
        )}
        {contact.website && (
          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: fieldStyles?.['contact.website']?.color || accentColor }}>
            <Globe className="w-3.5 h-3.5" /> Website
          </a>
        )}
      </div>
    </div>
  );
}

export function FullPortfolioPreview({ portfolio }: PreviewProps) {
  if (!portfolio) {
    return <div className="p-8 text-center text-muted-foreground text-sm">Loading portfolio...</div>;
  }

  const ts = portfolio.themeSettings || {};
  const bgColor = ts.bgColor || '#F2EAE0';
  const cardBgColor = ts.cardBgColor || 'rgba(255, 255, 255, 0.92)';
  const textColor = ts.textColor || '#1E293B';
  const accentColor = ts.accentColor || '#7C3AED';
  const fontFamily = ts.fontFamily || 'Plus Jakarta Sans';
  const isBold = ts.isBoldText ?? false;

  return (
    <div
      className="w-full p-4 sm:p-8 rounded-2xl transition-all duration-300 min-h-[800px]"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`w-full max-w-5xl mx-auto rounded-2xl shadow-xl border border-black/10 overflow-hidden backdrop-blur-md transition-all duration-300 ${
          isBold ? 'font-bold' : ''
        }`}
        style={{
          backgroundColor: cardBgColor,
          color: textColor,
          fontFamily: fontFamily,
        }}
      >
        <HeroPreview hero={portfolio.hero} accentColor={accentColor} textColor={textColor} fieldStyles={ts.fieldStyles} />
        <AboutPreview about={portfolio.about} accentColor={accentColor} textColor={textColor} fieldStyles={ts.fieldStyles} />
        <SkillsPreview skills={portfolio.skills} accentColor={accentColor} textColor={textColor} />
        <ProjectsPreview projects={portfolio.projects} accentColor={accentColor} textColor={textColor} />
        <EducationPreview education={portfolio.education} accentColor={accentColor} textColor={textColor} fieldStyles={ts.fieldStyles} />
        <ExperiencePreview experience={portfolio.experience} accentColor={accentColor} textColor={textColor} fieldStyles={ts.fieldStyles} />
        <ContactPreview contact={portfolio.contact} accentColor={accentColor} textColor={textColor} fieldStyles={ts.fieldStyles} />
      </div>
    </div>
  );
}
