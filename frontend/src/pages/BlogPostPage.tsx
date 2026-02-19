import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi } from '../hooks/useApi';
import { BlogPost } from '../types';

function renderInline(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let lastIndex = 0;
  let match;
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={keyIdx++} style={{ color: 'var(--text)', fontWeight: 600 }}>{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={keyIdx++} style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{match[3]}</em>);
    } else if (match[4]) {
      parts.push(
        <code key={keyIdx++} style={{
          background: 'var(--surface)', padding: '0.15rem 0.4rem',
          borderRadius: '3px', fontSize: '0.78rem', fontFamily: 'var(--mono)',
          color: 'var(--accent)',
        }}>
          {match[4]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

function renderMarkdown(content: string) {
  const blocks: JSX.Element[] = [];
  const lines = content.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <div key={blocks.length} style={{ margin: '1.5rem 0' }}>
          {lang && (
            <div style={{
              fontSize: '0.6rem', color: 'var(--accent)', padding: '0.4rem 1rem',
              background: 'rgba(79,184,212,0.08)', borderBottom: '1px solid var(--border)',
              fontFamily: 'var(--mono)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {lang}
            </div>
          )}
          <pre style={{
            background: 'var(--surface)', padding: '1.2rem 1rem', overflowX: 'auto',
            fontSize: '0.72rem', lineHeight: 1.7, fontFamily: 'var(--mono)',
            border: '1px solid var(--border)', borderTop: lang ? 'none' : '1px solid var(--border)',
            color: 'var(--text)', margin: 0,
          }}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableRows.push(lines[i]);
        i++;
      }
      const headerCells = tableRows[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const dataRows = tableRows.slice(2);
      blocks.push(
        <div key={blocks.length} style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'var(--mono)' }}>
            <thead>
              <tr>
                {headerCells.map((cell, j) => (
                  <th key={j} style={{
                    textAlign: 'left', padding: '0.6rem 0.8rem',
                    borderBottom: '2px solid var(--accent)', color: 'var(--accent)',
                    fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em',
                  }}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, j) => {
                const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
                return (
                  <tr key={j}>
                    {cells.map((cell, k) => (
                      <td key={k} style={{
                        padding: '0.5rem 0.8rem', borderBottom: '1px solid var(--border)', color: 'var(--text)',
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.trim() === '') { i++; continue; }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={blocks.length} style={{
          fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 700,
          marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--text)',
          borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem',
        }}>
          {line.slice(3)}
        </h2>
      );
      i++; continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={blocks.length} style={{
          fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 600,
          marginTop: '2rem', marginBottom: '0.8rem', color: 'var(--accent)',
        }}>
          {line.slice(4)}
        </h3>
      );
      i++; continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      blocks.push(
        <ol key={blocks.length} style={{ paddingLeft: '1.2rem', margin: '1rem 0', lineHeight: 1.9, fontSize: '0.82rem', color: 'var(--text)' }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: '0.4rem' }}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <ul key={blocks.length} style={{
          paddingLeft: '1.2rem', margin: '1rem 0', lineHeight: 1.9,
          fontSize: '0.82rem', listStyleType: "'\\2192  '", color: 'var(--text)',
        }}>
          {items.map((item, j) => (
            <li key={j} style={{ marginBottom: '0.4rem', paddingLeft: '0.3rem' }}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    blocks.push(
      <p key={blocks.length} style={{ marginBottom: '1.2rem', lineHeight: 1.9, color: 'var(--text)', fontSize: '0.82rem' }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return blocks;
}

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
          &larr; Back to all articles
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
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <Link to="/blog" style={{
            color: 'var(--accent)', textDecoration: 'none', fontSize: '0.7rem',
            fontFamily: 'var(--mono)', marginBottom: '2rem', display: 'inline-block',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
          >
            &larr; Back to all articles
          </Link>

          <div style={{
            display: 'inline-block', fontSize: '0.6rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--accent)',
            padding: '0.2rem 0.6rem', borderRadius: '2px', fontFamily: 'var(--mono)',
            marginBottom: '1rem', fontWeight: 600, marginLeft: '1rem',
          }}>
            {post.category}
          </div>

          <div style={{
            display: 'flex', gap: '1.5rem', alignItems: 'center',
            marginBottom: '1.5rem', fontFamily: 'var(--mono)', fontSize: '0.65rem',
          }}>
            <span style={{ color: 'var(--muted)' }}>{post.date}</span>
            <span style={{ color: 'var(--accent2)' }}>{post.read_time} min read</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, lineHeight: 1.2, marginBottom: '1.5rem',
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.6rem', padding: '0.2rem 0.5rem',
                background: 'rgba(79,184,212,0.1)', color: 'var(--accent)',
                borderRadius: '3px', fontFamily: 'var(--mono)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--mono)' }}>
            {renderMarkdown(post.content)}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', marginTop: '3rem' }}>
            <Link to="/blog" style={{
              color: 'var(--accent)', textDecoration: 'none', fontSize: '0.72rem',
              fontFamily: 'var(--mono)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
            >
              &larr; All articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
