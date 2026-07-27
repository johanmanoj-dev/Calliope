import type { IPortfolio } from '../types/portfolio';

export const DEFAULT_PORTFOLIO: Omit<IPortfolio, '_id' | 'ownerId' | 'createdAt' | 'updatedAt'> = {
  hero: {
    name: '',
    title: '',
    introduction: '',
  },
  about: {},
  skills: [],
  projects: [],
  education: [],
  experience: [],
  contact: {},
  socialLinks: [],
  isPublished: false,
};

export const AUTO_SAVE_DELAY_MS = 1000; // 1 second debounce
export const MAX_PROJECTS = 20;
export const MAX_SKILLS = 50;
export const MAX_EDUCATION_ENTRIES = 10;
export const MAX_EXPERIENCE_ENTRIES = 10;
