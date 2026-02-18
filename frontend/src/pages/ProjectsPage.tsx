import { useEffect } from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const { repos, loading, error } = useGitHubRepos();

  useEffect(() => {
    document.title = 'Projects | Anil Kumar Ravuri';
  }, []);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{ padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
        <div style={{
          fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: '2.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          Projects
          <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 700, lineHeight: 1.15, marginBottom: '1rem',
        }}>
          Open <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Source</em>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginBottom: '3rem', maxWidth: 500, lineHeight: 1.9 }}>
          Public repositories from GitHub. A collection of projects, experiments, and tools.
        </p>

        {loading && (
          <div style={{ color: 'var(--muted)', fontSize: '0.75rem', padding: '2rem 0' }}>
            Loading repositories...
          </div>
        )}

        {error && (
          <div style={{ color: 'var(--red)', fontSize: '0.75rem', padding: '2rem 0' }}>
            {error}
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div style={{ color: 'var(--muted)', fontSize: '0.75rem', padding: '2rem 0' }}>
            No repositories found.
          </div>
        )}

        {repos.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1px', background: 'var(--border)', border: '1px solid var(--border)',
          }}>
            {repos.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          section { padding: 7rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
