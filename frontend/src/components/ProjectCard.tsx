import { GitHubRepo } from '../types';

interface ProjectCardProps {
  repo: GitHubRepo;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
};

export default function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        padding: '2rem',
        transition: 'background 0.2s',
        position: 'relative',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--surface)')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--green)', letterSpacing: '0.1em', fontFamily: 'var(--mono)' }}>
          <span style={{ color: 'var(--purple)' }}>import</span>{' '}
          <span style={{ color: 'var(--accent)' }}>{repo.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          {repo.stargazers_count > 0 && <span>&#9733; {repo.stargazers_count}</span>}
          {repo.forks_count > 0 && <span>&#9906; {repo.forks_count}</span>}
        </div>
      </div>

      <p style={{
        color: 'var(--muted)',
        fontSize: '0.78rem',
        lineHeight: 1.7,
        marginBottom: '1.2rem',
        fontFamily: 'var(--mono)',
        minHeight: '2.5em',
      }}>
        {repo.description || 'No description available'}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {repo.topics.slice(0, 5).map(topic => (
            <span key={topic} style={{
              fontSize: '0.6rem',
              padding: '0.2rem 0.5rem',
              background: 'rgba(88,166,255,0.1)',
              color: 'var(--accent)',
              borderRadius: '3px',
              fontFamily: 'var(--mono)',
            }}>
              {topic}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {repo.language && (
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', display: 'inline-block',
              background: LANGUAGE_COLORS[repo.language] || 'var(--accent2)',
            }} />
            <span style={{ color: 'var(--muted)' }}>{repo.language}</span>
          </span>
        )}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--accent)', fontSize: '0.7rem', textDecoration: 'none', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
          >
            ./source
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--green)', fontSize: '0.7rem', textDecoration: 'none', fontFamily: 'var(--mono)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--green)')}
            >
              ./live_demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
