export interface Skill {
  name: string;
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  technologies: string[];
  responsibilities: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: number;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  email: string;
  phone: string;
  location: string;
  available: boolean;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export type SkillsGrouped = Record<string, string[]>;

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential_id: string | null;
  credential_url: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  read_time: number;
}
