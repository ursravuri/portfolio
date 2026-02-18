import { useState, useEffect, useRef } from 'react';
import { Experience } from '../types';

interface ExperienceProps { experience: Experience[]; }

export default function ExperienceSection({ experience }: ExperienceProps) {
  const [active, setActive] = useState(0);
  const current = experience[active];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" style={{ padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div ref={sectionRef} className="reveal">
        <div style={{
          fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '4rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          Experience
          <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
        </div>

        <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 0 }}>
          {/* Tab nav */}
          <div className="exp-nav" style={{ position: 'sticky', top: '7rem', height: 'fit-content' }}>
            {experience.map((exp, i) => (
              <div
                key={exp.id}
                onClick={() => setActive(i)}
                style={{
                  display: 'block', padding: '1rem 1.5rem',
                  fontSize: '0.7rem', letterSpacing: '0.1em',
                  color: active === i ? 'var(--accent)' : 'var(--muted)',
                  cursor: 'pointer',
                  borderLeft: active === i ? '2px solid var(--accent)' : '2px solid var(--border)',
                  background: active === i ? 'rgba(79,184,212,0.04)' : 'transparent',
                  transition: 'all 0.2s', textTransform: 'uppercase', lineHeight: 1.6,
                }}
                onMouseEnter={e => { if (active !== i) { e.currentTarget.style.borderLeftColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'rgba(79,184,212,0.04)'; } }}
                onMouseLeave={e => { if (active !== i) { e.currentTarget.style.borderLeftColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {exp.company.includes('Florida') ? 'Florida Blue' : exp.company}
                <br />
                <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>
                  {exp.duration.split('—')[0]?.trim() || exp.duration.split('\u2014')[0]?.trim()}
                </span>
              </div>
            ))}
          </div>

          {/* Content panel */}
          {current && (
            <div style={{ padding: '0 0 0 3rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                {current.role.replace(/Engineer/i, '')}
                <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Engineer</em>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {current.company}
              </div>
              <div style={{
                display: 'inline-block', padding: '0.25rem 0.8rem',
                border: '1px solid var(--border)', fontSize: '0.65rem',
                color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '2rem',
              }}>
                {current.duration} &middot; {current.location}
              </div>

              <ul style={{ listStyle: 'none' }}>
                {current.responsibilities.map((r, i) => (
                  <li key={i} style={{
                    padding: '0.6rem 0', borderBottom: '1px solid var(--border)',
                    fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7,
                    display: 'flex', gap: '0.8rem', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                  >
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.05rem' }}>&rarr;</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience { padding: 7rem 1.5rem !important; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .exp-nav { display: flex !important; overflow-x: auto; margin-bottom: 2rem; position: static !important; }
          .exp-nav > div { flex-shrink: 0; }
          .exp-grid > div:last-child { padding: 0 !important; }
        }
      `}</style>
    </section>
  );
}
