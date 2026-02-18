import { useState, useEffect } from 'react';
import { Profile, Certification } from '../types';
import { certificationsApi } from '../hooks/useApi';
import ResumeView from '../components/ResumeView';

interface ResumePageProps {
  profile: Profile | null;
}

export default function ResumePage({ profile }: ResumePageProps) {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    document.title = 'Resume | Anil Kumar Ravuri';
  }, []);

  useEffect(() => {
    certificationsApi.getAll().then(setCertifications).catch(() => {});
  }, []);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
              <span style={{ color: 'var(--green)' }}>// </span>05. resume
            </span>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginTop: '0.5rem',
            }}>
              Curriculum <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Vitae</em>
            </h2>
          </div>

          {/* Action buttons */}
          <div style={{
            display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap',
            fontFamily: 'var(--mono)',
          }} className="no-print">
            <button
              onClick={() => window.print()}
              style={{
                padding: '0.7rem 1.5rem',
                background: 'var(--accent)',
                color: 'var(--bg)',
                border: 'none',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                fontFamily: 'var(--mono)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.outline = '1px solid var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; e.currentTarget.style.outline = 'none'; }}
            >
              $ print resume
            </button>
            <a
              href="/resume/Anil_Kumar_Ravuri_Resume.pdf"
              download
              style={{
                padding: '0.7rem 1.5rem',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                textDecoration: 'none',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                fontFamily: 'var(--mono)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              $ download resume.pdf
            </a>
          </div>

          {/* Resume content */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: 'clamp(2rem, 4vw, 3rem)',
          }}>
            <ResumeView profile={profile} certifications={certifications} />
          </div>
        </div>
      </section>
    </div>
  );
}
