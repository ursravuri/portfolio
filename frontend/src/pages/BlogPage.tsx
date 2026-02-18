import { useState, useEffect } from 'react';
import { blogApi } from '../hooks/useApi';
import { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Blog | Anil Kumar Ravuri';
  }, []);

  useEffect(() => {
    blogApi.getPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load blog posts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
              <span style={{ color: 'var(--green)' }}>// </span>04. blog
            </span>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginTop: '0.5rem',
            }}>
              Articles & <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Insights</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '1rem', fontFamily: 'var(--mono)', maxWidth: '500px', lineHeight: 1.8 }}>
              Technical writing on API management, middleware, and enterprise architecture.
            </p>
          </div>

          {loading && (
            <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontFamily: 'var(--mono)', padding: '2rem 0' }}>
              <span style={{ color: 'var(--green)' }}>$</span> loading posts...
              <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>&#x2588;</span>
            </div>
          )}

          {error && (
            <div style={{ color: 'var(--red)', fontSize: '0.75rem', fontFamily: 'var(--mono)', padding: '2rem 0' }}>
              <span style={{ color: 'var(--red)' }}>error:</span> {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div style={{
              color: 'var(--muted)', fontSize: '0.78rem', fontFamily: 'var(--mono)',
              padding: '3rem 2rem', textAlign: 'center',
              border: '1px solid var(--border)', background: 'var(--surface)',
            }}>
              <div style={{ marginBottom: '0.5rem' }}>No posts yet.</div>
              <span style={{ color: 'var(--green)' }}>$</span> echo "Coming soon..."
            </div>
          )}

          {posts.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
            }}>
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
