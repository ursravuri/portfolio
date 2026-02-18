import { Certification } from '../types';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        padding: '2rem',
        transition: 'background 0.2s',
        fontFamily: 'var(--mono)',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--surface)')}
      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'var(--bg)')}
    >
      <div style={{ fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>
        <span style={{ color: 'var(--purple)' }}>import</span>{' '}
        <span style={{ color: 'var(--accent2)' }}>Certificate</span>{' '}
        <span style={{ color: 'var(--purple)' }}>from</span>{' '}
        <span style={{ color: 'var(--green)' }}>'{certification.issuer}'</span>
      </div>

      <h3 style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.8rem', lineHeight: 1.5, fontWeight: 500 }}>
        {certification.name}
      </h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem' }}>
        <span style={{ color: 'var(--muted)' }}>
          <span style={{ color: 'var(--green)' }}>issued:</span> {certification.date}
        </span>
        {certification.credential_url && (
          <a
            href={certification.credential_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
          >
            ./verify
          </a>
        )}
      </div>

      {certification.credential_id && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.6rem', color: 'var(--muted)' }}>
          id: {certification.credential_id}
        </div>
      )}
    </div>
  );
}
