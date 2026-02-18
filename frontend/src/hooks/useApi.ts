import axios from 'axios';
import { Profile, ContactForm, ContactResponse, SkillsGrouped, Certification, BlogPost } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const profileApi = {
  getProfile: (): Promise<Profile> =>
    api.get<Profile>('/api/profile/').then(r => r.data),

  getSummary: () =>
    api.get('/api/profile/summary').then(r => r.data),

  getSkills: (): Promise<SkillsGrouped> =>
    api.get<SkillsGrouped>('/api/profile/skills').then(r => r.data),

  getExperience: () =>
    api.get('/api/profile/experience').then(r => r.data),
};

export const contactApi = {
  send: (form: ContactForm): Promise<ContactResponse> =>
    api.post<ContactResponse>('/api/contact/', form).then(r => r.data),
};

export const certificationsApi = {
  getAll: (): Promise<Certification[]> =>
    api.get<Certification[]>('/api/certifications/').then(r => r.data),
};

export const blogApi = {
  getPosts: (): Promise<BlogPost[]> =>
    api.get<BlogPost[]>('/api/blog/').then(r => r.data),

  getPost: (slug: string): Promise<BlogPost> =>
    api.get<BlogPost>(`/api/blog/${slug}`).then(r => r.data),
};
