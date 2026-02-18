import { Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';

function Footer() {
  return (
    <footer style={{
      padding: '2rem 3rem',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
        &copy; 2025 Anil Kumar Ravuri
      </span>
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        style={{
          fontSize: '0.65rem', color: 'var(--muted)', textDecoration: 'none',
          letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
      >
        &uarr; Back to Top
      </Link>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
