import { useEffect, useRef } from 'react';
import { SkillsGrouped } from '../types';

interface SkillsProps { skills: SkillsGrouped; }

export default function SkillsSection({ skills }: SkillsProps) {
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
    <section id="skills" style={{ padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
      <div ref={labelRef} className="reveal" style={{
        fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'var(--accent)', marginBottom: '3rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        Technical Skills
        <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
      </div>

      <div ref={gridRef} className="reveal" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1px', background: 'var(--border)', border: '1px solid var(--border)',
      }}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} style={{
            background: 'var(--bg)', padding: '2rem', transition: 'background 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--surface)')}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg)')}
          >
            <div style={{
              fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '1.2rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ width: '1.2rem', height: 1, background: 'var(--accent)' }} />
              {category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {items.map(skill => (
                <span key={skill} style={{
                  padding: '0.3rem 0.7rem', border: '1px solid var(--border)',
                  fontSize: '0.66rem', color: 'var(--muted)', letterSpacing: '0.05em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills { padding: 7rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
