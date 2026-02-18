import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi } from '../hooks/useApi';
import { BlogPost } from '../types';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    blogApi.getPost(slug)
      .then(data => {
        setPost(data);
        document.title = `${data.title} | Anil Kumar Ravuri`;
      })
      .catch(() => setError('Post not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: '8rem', textAlign: 'center', fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.75rem' }}>
        <span style={{ color: 'var(--green)' }}>$</span> loading post...
        <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>&#x2588;</span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ paddingTop: '8rem', textAlign: 'center', fontFamily: 'var(--mono)' }}>
        <div style={{ color: 'var(--red)', fontSize: '0.8rem', marginBottom: '1rem' }}>
          error: {error || 'Post not found'}
        </div>
        <Link to="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.75rem' }}>
          $ cd ../blog
        </Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '5rem' }}>
      <article style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Back link */}
          <Link to="/blog" style={{
            color: 'var(--accent)', textDecoration: 'none', fontSize: '0.7rem',
            fontFamily: 'var(--mono)', marginBottom: '2rem', display: 'inline-block',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
          >
            &larr; $ cd ../blog
          </Link>

          {/* Meta */}
          <div style={{
            display: 'flex', gap: '1.5rem', alignItems: 'center',
            marginBottom: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.65rem',
          }}>
            <span style={{ color: 'var(--muted)' }}>{post.date}</span>
            <span style={{ color: 'var(--accent2)' }}>{post.read_time} min read</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            {post.title}
          </h1>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.6rem',
                padding: '0.2rem 0.5rem',
                background: 'rgba(88,166,255,0.1)',
                color: 'var(--accent)',
                borderRadius: '3px',
                fontFamily: 'var(--mono)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.82rem',
            lineHeight: 1.9,
            color: 'var(--text)',
          }}>
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i} style={{ marginBottom: '1.5rem', color: 'var(--text)' }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer separator */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '2rem',
            marginTop: '3rem',
          }}>
            <Link to="/blog" style={{
              color: 'var(--accent)', textDecoration: 'none', fontSize: '0.72rem',
              fontFamily: 'var(--mono)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
            >
              &larr; ./all_posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
