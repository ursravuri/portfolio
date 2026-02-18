import { useEffect, useRef } from 'react';
import { Education } from '../types';

interface EducationProps { education: Education[]; }

export default function EducationSection({ education }: EducationProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (labelRef.current) observer.observe(labelRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" style={{ padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div ref={labelRef} className="reveal" style={{
        fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: '3rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        Education
        <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
      </div>

      <div ref={gridRef} className="reveal" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '1px', background: 'var(--border)', border: '1px solid var(--border)',
      }}>
        {education.map((edu, i) => (
          <div key={i} style={{
            background: 'var(--bg)', padding: '3rem 2.5rem',
            transition: 'background 0.2s', position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--surface)')}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg)')}
          >
            {/* Top accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), transparent)' }} />

            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {edu.degree} in <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{edu.field}</em>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent2)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
              {edu.institution} &mdash; {edu.location}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Graduated {edu.year}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #education { padding: 7rem 1.5rem !important; }
          #education .reveal:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
