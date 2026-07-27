import mongoose, { Schema, Document } from 'mongoose';
import type { IPortfolio, IProject, IHero, IAbout, ISkill, IEducation, IExperience, IContact } from '@shared/types/portfolio';

export interface IPortfolioDocument extends Omit<IPortfolio, '_id'>, Document {}

const HeroSchema = new Schema<IHero>({
  photoUrl: { type: String, default: '' },
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  introduction: { type: String, default: '' },
  location: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
});

const AboutSchema = new Schema<IAbout>({
  personalIntro: { type: String, default: '' },
  careerInterests: { type: String, default: '' },
  professionalGoals: { type: String, default: '' },
  areasOfExpertise: { type: String, default: '' },
  biography: { type: String, default: '' },
});

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
});

const ProjectSchema = new Schema<IProject>({
  thumbnailUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  sourceLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
});

const EducationSchema = new Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, default: '' },
});

const ExperienceSchema = new Schema<IExperience>({
  organization: { type: String, required: true },
  position: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, default: '' },
});

const ContactSchema = new Schema<IContact>({
  email: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  website: { type: String, default: '' },
  other: [{ type: String }],
});

const PortfolioSchema = new Schema<IPortfolioDocument>(
  {
    ownerId: { type: String, required: true, unique: true }, // Links to User.googleId or User._id
    hero: { type: HeroSchema, default: () => ({}) },
    about: { type: AboutSchema, default: () => ({}) },
    skills: { type: [SkillSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    contact: { type: ContactSchema, default: () => ({}) },
    socialLinks: { type: [String], default: [] },
    slug: { type: String, sparse: true, unique: true },
    isPublished: { type: Boolean, default: false },
    publishedUrl: { type: String },
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model<IPortfolioDocument>('Portfolio', PortfolioSchema);
