import { Profile } from '../types';

interface HeroProps { profile: Profile | null; }

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      padding: '3rem 3rem 6rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background gradients */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 70% 55% at 90% 10%, rgba(79,184,212,0.09) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 5% 90%, rgba(240,160,74,0.06) 0%, transparent 70%)
        `,
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(79,184,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,184,212,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 70% 80% at 70% 30%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 70% 30%, black 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Tag */}
        <div style={{
          fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1.2rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          opacity: 0, animation: 'fadeUp 0.8s 0.2s forwards',
        }}>
          <span style={{ width: '2rem', height: 1, background: 'var(--accent)' }} />
          {profile?.available ? 'Open to New Opportunities' : 'Currently Employed'}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
          fontWeight: 900, lineHeight: 0.93,
          marginBottom: '1rem',
          opacity: 0, animation: 'fadeUp 0.8s 0.35s forwards',
        }}>
          {profile?.name.split(' ').slice(0, 2).join(' ') || 'Anil Kumar'}
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
            {profile?.name.split(' ').slice(2).join(' ') || 'Ravuri'}
          </em>
        </h1>

        {/* Title */}
        <p style={{
          fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
          color: 'var(--muted)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '3rem',
          opacity: 0, animation: 'fadeUp 0.8s 0.5s forwards',
        }}>
          {profile?.title} &nbsp;&middot;&nbsp; {profile?.tagline}
        </p>

        {/* Bottom section */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          opacity: 0, animation: 'fadeUp 0.8s 0.65s forwards',
          flexWrap: 'wrap', gap: '2rem',
        }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)', maxWidth: 380, lineHeight: 1.9 }}>
            7+ years of hands-on expertise securing enterprise web services and RESTful APIs — from DataPower appliance administration to full API lifecycle management with IBM API Connect.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', textAlign: 'right' }}>
            <a href={`tel:${profile?.phone?.replace(/\D/g, '')}`} style={{
              fontSize: '0.72rem', color: 'var(--muted)', textDecoration: 'none',
              letterSpacing: '0.05em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {profile?.phone}
            </a>
            <a href={`mailto:${profile?.email}`} style={{
              fontSize: '0.72rem', color: 'var(--muted)', textDecoration: 'none',
              letterSpacing: '0.05em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {profile?.email}
            </a>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
              {profile?.location}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        color: 'var(--muted)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
        opacity: 0, animation: 'fadeUp 0.8s 1s forwards',
      }}>
        <div style={{ width: 1, height: '3rem', background: 'linear-gradient(to bottom, var(--accent), transparent)', animation: 'pulse 2s ease-in-out infinite' }} />
        Scroll
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero { padding: 3rem 1.5rem 6rem !important; }
        }
      `}</style>
    </section>
  );
}
