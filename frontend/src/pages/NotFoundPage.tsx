import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 | Anil Kumar Ravuri';
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      fontFamily: 'var(--mono)',
    }}>
      <div style={{ color: 'var(--red)', fontSize: '4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        404
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
        <span style={{ color: 'var(--red)' }}>error:</span> path not found in $PATH
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '0.7rem', marginBottom: '2rem' }}>
        <span style={{ color: 'var(--green)' }}>anil</span>
        <span style={{ color: 'var(--muted)' }}>@portfolio</span>
        <span style={{ color: 'var(--accent)' }}> ~ </span>
        <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>&#x2588;</span>
      </div>
      <Link to="/" style={{
        color: 'var(--accent)',
        textDecoration: 'none',
        fontSize: '0.75rem',
        padding: '0.6rem 1.5rem',
        border: '1px solid var(--accent)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
      >
        $ cd ~/home
      </Link>
    </section>
  );
}
