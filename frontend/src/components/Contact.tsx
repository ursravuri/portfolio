import { useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: '7rem 3rem', borderTop: '1px solid var(--border)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(79,184,212,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{
          fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '1.5rem',
        }}>
          Get In Touch
        </div>

        <h2 className="reveal" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900, lineHeight: 1, marginBottom: '2rem',
        }}>
          Let's <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Connect</em>
        </h2>

        <p className="reveal" style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '3rem' }}>
          Open to new opportunities, collaborations, or a conversation about API security and enterprise integration.
        </p>

        <div className="reveal" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:anilkumar80459@gmail.com" style={{
            padding: '0.9rem 2rem', background: 'var(--accent)', borderColor: 'var(--accent)',
            border: '1px solid var(--accent)', fontSize: '0.72rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--bg)', textDecoration: 'none', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; }}
          >
            Send Email
          </a>
          <a href="tel:5102987126" style={{
            padding: '0.9rem 2rem', border: '1px solid var(--border)',
            fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--text)', textDecoration: 'none', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            (510) 298-7126
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact { padding: 7rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
