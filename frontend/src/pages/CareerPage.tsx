import { useState, useEffect, useMemo, useRef } from 'react';
import { Profile, SkillsGrouped, Certification } from '../types';
import { profileApi, certificationsApi } from '../hooks/useApi';
import ExperienceSection from '../components/Experience';
import SkillsSection from '../components/Skills';
import EducationSection from '../components/Education';
import CertificationCard from '../components/CertificationCard';

interface CareerPageProps {
  profile: Profile | null;
}

export default function CareerPage({ profile }: CareerPageProps) {
  const [skillsGrouped, setSkillsGrouped] = useState<SkillsGrouped>({});
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Career | Anil Kumar Ravuri';
  }, []);

  useEffect(() => {
    profileApi.getSkills().then(setSkillsGrouped).catch(() => {});
    certificationsApi.getAll().then(setCertifications).catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (certRef.current) {
      certRef.current.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
    return () => observer.disconnect();
  }, [certifications]);

  const skills = useMemo(() => {
    if (Object.keys(skillsGrouped).length > 0) return skillsGrouped;
    if (!profile) return {};
    const grouped: SkillsGrouped = {};
    profile.skills.forEach(s => {
      grouped[s.category] = grouped[s.category] || [];
      grouped[s.category].push(s.name);
    });
    return grouped;
  }, [skillsGrouped, profile]);

  return (
    <div style={{ paddingTop: '5rem' }}>
      {profile?.experience && profile.experience.length > 0 && (
        <ExperienceSection experience={profile.experience} />
      )}
      {Object.keys(skills).length > 0 && (
        <SkillsSection skills={skills} />
      )}
      {profile?.education && profile.education.length > 0 && (
        <EducationSection education={profile.education} />
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section ref={certRef} style={{ padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
          <div className="reveal" style={{
            fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '3rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            Certifications
            <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
          </div>
          <div className="reveal" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px', background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {certifications.map(cert => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
