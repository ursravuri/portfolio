import { useEffect, useRef } from 'react';
import { Profile } from '../types';

interface AboutProps { profile: Profile | null; }

export default function About({ profile }: AboutProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{
      padding: '7rem 3rem',
      borderTop: '1px solid var(--border)',
      display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem', alignItems: 'start',
    }}>
      <div ref={leftRef} className="reveal">
        {/* Section label */}
        <div style={{
          fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '2.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          About Me
          <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem',
        }}>
          Engineering <em style={{ fontStyle: 'italic', color: 'var(--accent2)' }}>secure</em>
          <br />API ecosystems
        </h2>

        {profile?.bio.map((para, i) => (
          <p key={i} style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 2, marginBottom: '1rem' }}>
            {para}
          </p>
        ))}
      </div>

      <div ref={rightRef} className="reveal">
        {/* Core Competencies */}
        <div style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.2rem' }}>
          Core Competencies
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
          background: 'var(--border)', border: '1px solid var(--border)', marginBottom: '2.5rem',
        }}>
          {[
            'IBM DataPower Gateway', 'IBM API Connect (APIC)',
            'OAuth 2.0 / JWT / SAML', 'XSLT / GatewayScript',
            'SSL/TLS & PKI', 'OpenShift / Cloud Pak',
            'Splunk Monitoring', 'CI/CD & DevOps',
          ].map(skill => (
            <div key={skill} style={{
              padding: '0.8rem 1rem', background: 'var(--bg)',
              fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.06em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--bg)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--muted)'; }}
            >
              <span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>&rsaquo;</span>{skill}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[
            { num: '7+', label: 'Years Experience' },
            { num: 'v6\u201310', label: 'DataPower Versions' },
            { num: '8+', label: 'Years at Florida Blue' },
          ].map(stat => (
            <div key={stat.label} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '1rem' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about { grid-template-columns: 1fr !important; padding: 7rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
