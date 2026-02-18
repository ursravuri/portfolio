export default function Loader() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, fontFamily: 'var(--mono)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40, height: 40, border: '2px solid var(--border)',
          borderTop: '2px solid var(--accent)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 1.5rem',
        }} />
        <div style={{ color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.2em' }}>
          <span style={{ color: 'var(--green)' }}>$</span> loading profile<span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </div>
      </div>
    </div>
  );
}
