export interface ISkill {
  name: string;
  logoUrl: string;
}

export interface IProject {
  _id?: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  technologies: string[];
  sourceLink?: string;
  liveLink?: string;
}

export interface IEducation {
  _id?: string;
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface IExperience {
  _id?: string;
  organization: string;
  position: string;
  period: string;
  description?: string;
}

export interface IHero {
  photoUrl?: string;
  name: string;
  title: string;
  introduction: string;
  location?: string;
  resumeUrl?: string;
}

export interface IAbout {
  personalIntro?: string;
  careerInterests?: string;
  professionalGoals?: string;
  areasOfExpertise?: string;
  biography?: string;
}

export interface IContact {
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  other?: string[];
}

export interface IThemeSettings {
  bgColor?: string;
  cardBgColor?: string;
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
  isBoldText?: boolean;
}

export interface IPortfolio {
  _id: string;
  ownerId: string;
  hero: IHero;
  about: IAbout;
  skills: ISkill[];
  projects: IProject[];
  education: IEducation[];
  experience: IExperience[];
  contact: IContact;
  socialLinks: string[];
  themeSettings?: IThemeSettings;
  slug?: string;
  isPublished: boolean;
  publishedUrl?: string;
  createdAt: string;
  updatedAt: string;
}
