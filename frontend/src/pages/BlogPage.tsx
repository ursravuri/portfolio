import { useState, useEffect, useMemo } from 'react';
import { blogApi } from '../hooks/useApi';
import { BlogPost } from '../types';
import BlogCard from '../components/BlogCard';

const CATEGORIES = ['All', 'API Management', 'Security', 'Middleware', 'Enterprise Architecture', 'Observability'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Blog | Anil Kumar Ravuri';
  }, []);

  useEffect(() => {
    blogApi.getPosts()
      .then(setPosts)
      .catch(() => setError('Failed to load blog posts'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '1rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              Blog
              <span style={{ flex: 1, height: 1, background: 'var(--border)', maxWidth: '5rem' }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              Articles & <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Insights</em>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '1rem', fontFamily: 'var(--mono)', maxWidth: '560px', lineHeight: 1.8 }}>
              Technical writing on API management, middleware, security, and enterprise architecture. Practical insights for architects and senior engineers.
            </p>
          </div>

          {/* Category filter */}
          {posts.length > 0 && (
            <div style={{
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem',
              paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)',
            }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                    color: activeCategory === cat ? 'var(--bg)' : 'var(--muted)',
                    border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.65rem',
                    fontFamily: 'var(--mono)',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.color = 'var(--muted)';
                    }
                  }}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span style={{
                      marginLeft: '0.4rem', opacity: 0.6, fontSize: '0.58rem',
                    }}>
                      ({posts.filter(p => p.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

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

          {!loading && !error && filtered.length === 0 && (
            <div style={{
              color: 'var(--muted)', fontSize: '0.78rem', fontFamily: 'var(--mono)',
              padding: '3rem 2rem', textAlign: 'center',
              border: '1px solid var(--border)', background: 'var(--surface)',
            }}>
              No articles in this category yet.
            </div>
          )}

          {filtered.length > 0 && (
            <>
              <div style={{
                fontSize: '0.65rem', color: 'var(--muted)', fontFamily: 'var(--mono)',
                marginBottom: '1rem',
              }}>
                {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1px',
                background: 'var(--border)',
                border: '1px solid var(--border)',
              }}>
                {filtered.map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
