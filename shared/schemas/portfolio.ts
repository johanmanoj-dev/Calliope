import { z } from 'zod';

export const HeroSchema = z.object({
  photoUrl: z.string().url().optional().or(z.literal('')),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  introduction: z.string().min(1, 'Introduction is required'),
  location: z.string().optional(),
  resumeUrl: z.string().url().optional().or(z.literal('')),
});

export const AboutSchema = z.object({
  personalIntro: z.string().optional(),
  careerInterests: z.string().optional(),
  professionalGoals: z.string().optional(),
  areasOfExpertise: z.string().optional(),
  biography: z.string().optional(),
});

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  logoUrl: z.string().url().min(1, 'Logo URL is required'),
});

export const ProjectSchema = z.object({
  _id: z.string().optional(),
  thumbnailUrl: z.string().url().min(1, 'Thumbnail is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()),
  sourceLink: z.string().url().optional().or(z.literal('')),
  liveLink: z.string().url().optional().or(z.literal('')),
});

export const EducationSchema = z.object({
  _id: z.string().optional(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  duration: z.string().min(1, 'Duration is required'),
  description: z.string().optional(),
});

export const ExperienceSchema = z.object({
  _id: z.string().optional(),
  organization: z.string().min(1, 'Organization is required'),
  position: z.string().min(1, 'Position is required'),
  period: z.string().min(1, 'Period is required'),
  description: z.string().optional(),
});

export const ContactSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  other: z.array(z.string().url()).optional(),
});

export const PortfolioUpdateSchema = z.object({
  hero: HeroSchema.optional(),
  about: AboutSchema.optional(),
  skills: z.array(SkillSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  education: z.array(EducationSchema).optional(),
  experience: z.array(ExperienceSchema).optional(),
  contact: ContactSchema.optional(),
  socialLinks: z.array(z.string().url()).optional(),
});

export type PortfolioUpdateData = z.infer<typeof PortfolioUpdateSchema>;
