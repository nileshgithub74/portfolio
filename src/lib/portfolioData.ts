import portfolioConfig from '@/data/portfolio-config.json';

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  resumeUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  certificateUrl: string;
  icon: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  projects: Project[];
  certificates: Certificate[];
}

export function getPortfolioData(): PortfolioData {
  return portfolioConfig as PortfolioData;
}

export function getPersonalInfo(): PersonalInfo {
  return portfolioConfig.personal as PersonalInfo;
}

export function getSocialLinks(): SocialLink[] {
  return portfolioConfig.socialLinks as SocialLink[];
}

export function getProjects(): Project[] {
  return portfolioConfig.projects as Project[];
}

export function getCertificates(): Certificate[] {
  return portfolioConfig.certificates as Certificate[];
}
