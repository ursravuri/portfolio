import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { path: '/', label: 'About' },
  { path: '/career', label: 'Career' },
  { path: '/projects', label: 'Projects' },
  { path: '/blog', label: 'Blog' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1.4rem 3rem',
      background: scrolled ? 'rgba(8,12,16,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <NavLink to="/" style={{
        textDecoration: 'none',
        fontFamily: 'var(--serif)',
        fontSize: '1rem',
        color: 'var(--accent)',
        letterSpacing: '0.05em',
      }}>
        AKR
      </NavLink>

      <div style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent)' : 'var(--muted)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              transition: 'color 0.2s',
            })}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => {
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
              if (!isActive) e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none', background: 'none', border: 'none',
          color: 'var(--accent)', fontSize: '1.4rem', cursor: 'pointer',
          fontFamily: 'var(--mono)',
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        {menuOpen ? '\u2715' : '\u2630'}
      </button>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface)', borderBottom: '1px solid var(--border)',
          padding: '1.5rem 3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem',
        }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
