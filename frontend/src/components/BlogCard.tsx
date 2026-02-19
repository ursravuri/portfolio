import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        background: 'var(--bg)',
        padding: '2rem',
        transition: 'background 0.2s',
        textDecoration: 'none',
        display: 'block',
        fontFamily: 'var(--mono)',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--surface)')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg)')}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--bg)', background: 'var(--accent)',
          padding: '0.15rem 0.5rem', borderRadius: '2px', fontWeight: 600,
        }}>
          {post.category}
        </span>
        <span style={{ fontSize: '0.6rem', color: 'var(--accent2)' }}>
          {post.read_time} min read
        </span>
      </div>

      <h3 style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.8rem', lineHeight: 1.5, fontWeight: 600 }}>
        {post.title}
      </h3>

      <p style={{ color: 'var(--muted)', fontSize: '0.75rem', lineHeight: 1.7, marginBottom: '1rem' }}>
        {post.excerpt}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
          {post.date}
        </span>
        <span style={{ color: 'var(--accent)', fontSize: '0.65rem' }}>
          Read article &rarr;
        </span>
      </div>
    </Link>
  );
}
