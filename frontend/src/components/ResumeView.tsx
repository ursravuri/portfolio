import { Profile, Certification } from '../types';

interface ResumeViewProps {
  profile: Profile | null;
  certifications: Certification[];
}

export default function ResumeView({ profile, certifications }: ResumeViewProps) {
  if (!profile) return null;

  return (
    <div style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', lineHeight: 1.8 }}>
      {/* Header */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        paddingBottom: '2rem',
        marginBottom: '2rem',
      }}>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}>
          {profile.name}
        </h1>
        <div style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {profile.title} &middot; {profile.tagline}
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.7rem', color: 'var(--muted)' }}>
          <span><span style={{ color: 'var(--green)' }}>email:</span> {profile.email}</span>
          <span><span style={{ color: 'var(--green)' }}>phone:</span> {profile.phone}</span>
          <span><span style={{ color: 'var(--green)' }}>location:</span> {profile.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--green)' }}>// </span>Summary
        </h2>
        {profile.bio.map((paragraph, i) => (
          <p key={i} style={{ color: 'var(--text)', marginBottom: '0.8rem' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Experience */}
      {profile.experience.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--green)' }}>// </span>Experience
          </h2>
          {profile.experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '2rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.82rem' }}>{exp.role}</span>
                  <span style={{ color: 'var(--accent2)' }}> @ {exp.company}</span>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: '0.7rem' }}>{exp.duration}</span>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.65rem', marginBottom: '0.8rem' }}>
                {exp.location}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} style={{ color: 'var(--text)', marginBottom: '0.3rem', paddingLeft: '1rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>&rsaquo;</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--green)' }}>// </span>Skills
          </h2>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {profile.skills.map(skill => (
              <span key={skill.name} style={{
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: '3px',
              }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--green)' }}>// </span>Education
          </h2>
          {profile.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
              <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.8rem' }}>
                {edu.degree} in {edu.field}
              </div>
              <div style={{ color: 'var(--accent2)', fontSize: '0.72rem' }}>
                {edu.institution} &middot; {edu.location}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>
                Graduated {edu.year}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--green)' }}>// </span>Certifications
          </h2>
          {certifications.map(cert => (
            <div key={cert.id} style={{ marginBottom: '0.8rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>
              <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.78rem' }}>
                {cert.name}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.65rem' }}>
                {cert.issuer} &middot; {cert.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
